"use client";

import { revalidate } from "@/actions/revalidatePath";
import { useSocket } from "@/hooks/useSocket";
import { Conversation } from "@prisma/client";
import { useEffect, useState } from "react";
import { Instance } from "./instance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface MessagesHeaderProps {
  projectId: string;
  allConversations: Conversation[];
  conversationId: string | undefined;
}

export const MessagesHeader = ({
  allConversations,
  projectId,
  conversationId
}: MessagesHeaderProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const [selectedConv, setSelectedConv] = useState<Conversation | undefined>(undefined);


  const {data} = useQuery({
    queryKey:["connections"],
    queryFn: async()=>{
      const res = await axios.get(`/api/project/${projectId}/conversation`);

      return res.data as Conversation[];
    },
    initialData: allConversations,
  });

  const activeConnections = data.filter((conv) => conv.online);

  useEffect(() => {
    if (!socket) return;

    socket.on("DingloClient-NewConnection", (connectionId: string) => {
      queryClient.setQueryData(["connections"], (old: Conversation[])=>{
          const findConv = old.find((conv) => conv.connectionId === connectionId);
          if (!findConv && old && old.length>0)
            return [{ connectionId, projectId, online: true }, ...old];
          else if(!findConv) return [{ connectionId, projectId, online: true }];
            return old.map((conv) => {
              if (conv.connectionId === connectionId) {
                return { ...conv, online: true };
              }
              return conv;
            });
      })
      queryClient.invalidateQueries({queryKey:["connections"]});
    });

    socket.on("DingloClient-Disconnect", (connectionId: string) => {
      queryClient.setQueryData(["connections"], (old: Conversation[])=>{
          if(old && old.length>0 )
          return old.map((conv) => {
            if (conv.connectionId === connectionId) {
              return { ...conv, online: false };
            }
            return conv;
          });
      })
      queryClient.invalidateQueries({queryKey:["connections"]});
    });

    return () => {
      socket.off("DingloClient-NewConnection");
      socket.off("DingloClient-Disconnect");
    };
  }, [socket, data]);

  useEffect(()=>{
    // change the selected conversation
    if(conversationId){
      const targetConversation = data.find(conv=>conv.connectionId===conversationId);

      setSelectedConv(targetConversation);
    }
 
  },[conversationId]);


  return (
    <div>
      <p className="font-bold text-[1.5em] mb-4">
        Active connections &#40;{activeConnections.length}&#41;
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        {data.map((conv, idx) => (
          <Instance
            key={idx}
            selectedConv={selectedConv}
            setSelectedConv={setSelectedConv}
            convInstance={conv}
          />
        ))}
      </div>
    </div>
  );
};
