"use client"

import { toast } from "@/components/ui/use-toast"
import { copyText } from "@/lib/utils"
import { Copy } from "lucide-react"

export const NPMPackage = ()=>{
    return (
        <div onClick={()=>{
            copyText("npm install dinglo-io")
            toast({toastType:"SUCCESS", title:"Successfully copied  "})
        }} className="cursor-pointer font-roboto tracking-[6px] p-1 rounded-md flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 duration-150">
            npm install dinglo-io
            <div>
                <Copy className="w-4 h-4"/>
            </div>
        </div>
    )
}