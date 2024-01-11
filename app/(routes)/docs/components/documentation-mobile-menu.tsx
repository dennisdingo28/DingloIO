"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { DocumentationTypes } from "../constants"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const DocumentationMobileMenu = () => {
    const pathname = usePathname();
    console.log("mobiole", pathname);
    
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="flex lg:hidden flex-col gap-10 bg-[#0b0b0d]">
        {DocumentationTypes.map((doc, idx)=>(
            <div key={idx}>
                <p className="font-bold text-[1.2em]">{doc.title}</p>
                <div className="mt-4 space-y-6">
                    {doc.links.map((subLink, idx)=>(
                        <div>
                            <p className="font-bold">{subLink.title}</p>
                            <div className="mt-2 flex flex-col gap-4">
                                {subLink.links.map((child,idx)=>(
                                    <Link key={idx} href={child.link} className={`${pathname===child.link ? "text-softBlue":null} cursor-pointer hover:text-softBlue duration-100`}>{child.title}</Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
        <SheetFooter>
          
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
