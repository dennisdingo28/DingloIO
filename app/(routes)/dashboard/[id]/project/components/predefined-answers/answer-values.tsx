"use client";

import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { PredefinedAnswer } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

interface AnswerValuesProps {
  answer: PredefinedAnswer;
  projectId: string;
}

export const AnswerValues = ({ answer, projectId }: AnswerValuesProps) => {
    const [answerData, setAnswerData] = useState<PredefinedAnswer>(answer);
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(()=>{
        setAnswerData(answer);
        setEdit(false);
    },[answer]);

    useEffect(()=>{
        if(answerData.answer !== answer.answer || answerData.question !== answer.question)
            setEdit(true);
        else setEdit(false);
    },[answerData]);

    const queryClient = useQueryClient();


    const {mutate: editPredefinedAnswer, isPending} = useMutation({
        mutationFn: async(id: string)=>{
            const res = await axios.patch(`/api/project/${projectId}/answers/${id}`,{question: answerData.question, answer: answerData.answer});
            return res.data;
        },
        onSuccess:()=>{
            toast.success("Item was successfully updated!");
        },
        onError:(err)=>{
            toast.error("Something went wrong. Please try again later.");  
        },
        onMutate:(variable)=>{
            queryClient.setQueryData(["predAnswers"],(old: PredefinedAnswer[])=>{
                return old?.map(answ=>{
                    return {
                        ...answ,
                        question: answ.id===variable ? answerData.question: answ.question,
                        answer: answ.id===variable ? answerData.answer: answ.answer,
                    }
                });
            });

        },
        onSettled:()=>{
            queryClient.invalidateQueries({queryKey:["predAnswers"]});
            setEdit(false);
        },
    });

    return (
    <div  className="flex items-center">
      <Input
        value={answerData.question}
        onChange={(e)=>setAnswerData(prev=>{
            return {
                ...prev,
                question:e.target.value,
            }
        })}
        className="rounded-none bg-[#f3f4f6] text-[#747881] rounded-l-md placeholder:text-center px-2"
        placeholder="Question"
      />
      <Input
        value={answerData.answer}
        onChange={(e)=>setAnswerData(prev=>{
            return {
                ...prev,
                answer:e.target.value,
            }
        })}
        className="rounded-none bg-[#f3f4f6] text-[#747881] rounded-r-md placeholder:text-center px-2"
        placeholder="Answer to repond"
      />
        {edit ? (
            <Check onClick={()=>editPredefinedAnswer(answer.id)} role="button" className="text-green-500 w-10 h-10 cursor-pointer hover:text-green-600 duration-150" />
        ):null}
    </div>
  );
};
