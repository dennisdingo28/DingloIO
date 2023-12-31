"use client"
import { navbarLinks } from "@/constants/navbarLinks";
import { useMenu } from "@/hooks/useMenu"
import { NavLink } from "./nav-link";
import { ThemeToggler } from "@/components/theme-toggler";
import { AuthButton } from "@/components/auth-button";
import { SignOut } from "@/components/sign-out";

interface MobileNavProps{
    profileImage: string;
    profileName: string;
    isAuthenticated: boolean
}

export const MobileNav = ({profileImage, profileName, isAuthenticated}: MobileNavProps) => {
    const isActive = useMenu(state=>state.isActive);

    if(!isActive) return null;

    return (
        <div className="lg:opacity-0 -z-10">
            <div className="shadow-[0px_0px_3px_2px_rgba(126,154,234)]"/>
            <div className="flex flex-wrap items-center justify-around pt-2">
                {navbarLinks.map((navLink, index)=>(
                    <NavLink key={index} navLink={navLink} className="max-w-fit hover:translate-y-0 after:bg-lightBlue"/>
                ))}
            </div>
            <div className="flex flex-col-reverse xs:flex-row items-center justify-center mt-3 gap-3">
                {isAuthenticated ? <SignOut profileImage={profileImage} profileName={profileName}/>:null}
                <ThemeToggler/>
                <AuthButton/>
            </div>
        </div>
    )
}