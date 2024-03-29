"use client"

import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useSocket } from "@/hooks/useSocket";


interface AgentImageProps{
    agentImage: string;
    projectId: string;
}

export const AgentImage = ({agentImage, projectId}: AgentImageProps) =>{
    const {socket} = useSocket();
    const [currentImage, setCurrentImage] = useState<string>(agentImage);

    const {mutate: updateProject, isPending} = useMutation({
        mutationFn: async(imageUrl: string)=>{
            const res = await axios.patch(`/api/project/${projectId}`,{agentImage: imageUrl});
            
            return res;
        },
        onSuccess:()=>{
            socket?.emit("DingloServer-AgentChange")
            toast.success("Profile image was successfully updated!");
        },
        onError:()=>{
            setCurrentImage(agentImage);
            toast.error("Something went wrong while uploading. Please try again later.");
        },
        onMutate:(variable)=>{
            setCurrentImage(variable);
        }
      });

    return (
        <CldUploadWidget uploadPreset="h7trytjb" onUpload={(result: any)=>updateProject(result.info.secure_url)}>
            {({open})=>{
                const onClick = () => {
                    open();
                  };

                return (
                    <Image onClick={onClick} src={currentImage} width={180} height={180} className="w-[180px] h-[180px] rounded-full object-cover cursor-pointer" alt="agent-image"/>
                )
            }}
        </CldUploadWidget>
    )
}