import { MessagesControl } from "./messages-control";
import { ConnectionsControl } from "./connections-control";
import { ConversationWithMessages } from "@/types";
import db from "@/lib/db";

interface MessagesContainerProps{
    projectId: string;
    conversation: ConversationWithMessages;
}

export const MessagesContainer = async ({projectId, conversation}: MessagesContainerProps) =>{
    const allConversations = await db.conversation.findMany({
      where:{
          projectId,
      },
  });

    return (
        <div>
            <MessagesControl projectId={projectId} conversation={conversation} allConversations={allConversations}/>
            {/* <div className="mt-16">
              <ConnectionsControl connections={connections} projectId={projectId}/>
            </div> */}
        </div>
    )
}