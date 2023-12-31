"use client"

import { usePathname } from "next/navigation"
import { DocumentationSection } from "../types"
import { cn } from "@/lib/utils";
import Link from "next/link";

export const DocumentationType = ({documentation}:{documentation: DocumentationSection}) =>{
    const pathname = usePathname();
    return (
        <Link href={documentation.path} className={cn(pathname===documentation.path ? "text-softBlue font-semibold":"text-gray-300 font-medium hover:text-white", "cursor-pointer duration-100")}>{documentation.title}</Link>
    )
}