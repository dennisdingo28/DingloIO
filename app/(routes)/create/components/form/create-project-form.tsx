"use client"

import { FormInput } from "@/components/forms/form-input"
import { FormSubmit } from "@/components/forms/form-submit"
import { User, Shield, ShieldCheck } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation"
import { InfoText } from "@/components/info-text"
import { ProjectRequest, ProjectValidator } from "@/validators/project"

export const CreateProjectForm = () =>{
    const router = useRouter();

    const [showErrors, setShowErrors] = useState<boolean>(false);

    const {handleSubmit ,register, formState:{errors}, setValue} = useForm<ProjectRequest>({
        resolver:zodResolver(ProjectValidator),
    });


    const {mutate: createProject, isPending} = useMutation({
        mutationFn:async (project: ProjectRequest) =>{
            const res = await axios.post("/api/project",project);

            return res.data;
        },
        onSuccess:(data)=>{
            router.push("/dashboard");
            toast.success(data.msg);
            setTimeout(()=>{
                router.push("/dashboard");
                resetForm();
            },2500);
        },
        onError:(error)=>{
            if(error instanceof AxiosError)
            toast.error(error.response?.data || "Something went wrong. Please try again later.")
            else toast.error("Something went wrong. Please try again later.");
        }
    });
    //Form error handling
    useEffect(()=>{
        if(errors && Object.keys(errors).length>0){
            setShowErrors(true);
            setTimeout(()=>{
                setShowErrors(false)
            },3000);
        }
    },[errors]);

    function resetForm(){
        setValue("projectName","");
        setValue("projectPassword","");
        setValue("projectConfirmPassword","");
    }

    return (
        <div>
            <h1 className="font-bold text-[1.15em] xss:text-[1.19em] xs:text-[1.25em] xsMd:text-[1.4em] xsBig:text-[1.45em] sm:tet-[1.5em] md:text-[2em] lg:text-[2.5em]">Your <InfoText>users</InfoText> are waiting for <InfoText>you</InfoText> !</h1>
            <form className="mt-4" onSubmit={handleSubmit((data)=>{
                createProject(data);
            })}>
                <div className="flex flex-col gap-2">
                    <FormInput register={register} registerName={"projectName"} id="username" errorMessage={showErrors ? errors.projectName?.message:undefined} icon={<User className="w-5 h-5 text-softBlue"/>} placeholder="project name" className="border-none px-2"/>
                    <FormInput register={register} registerName={"projectPassword"} id="password" errorMessage={showErrors ? errors.projectPassword?.message:undefined} icon={<Shield className="w-5 h-5 text-softBlue"/>} placeholder="password" className="border-none px-2"/>
                    <FormInput register={register} registerName={"projectConfirmPassword"} id="confirmPassword" errorMessage={showErrors ? errors.projectConfirmPassword?.message:undefined} icon={<ShieldCheck className="w-5 h-5 text-softBlue"/>} placeholder="confirm password" className="border-none px-2"/>
                </div>
                <FormSubmit className="mt-5" isLoading={isPending} label="Create project"/>
            </form>
        </div>
    )
}