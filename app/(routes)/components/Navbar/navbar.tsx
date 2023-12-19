import { AuthButton } from "@/components/auth-button";
import { Logo } from "@/components/logo";
import { ThemeToggler } from "@/components/theme-toggler";
import { navbarLinks } from "@/constants/navbarLinks";
import { NavLink } from "./nav-link";
import { HamburgerMenu } from "./hamburger-menu";
import { MobileNav } from "./mobile-nav";
import { getAuthSession } from "@/lib/authOptions";

export const Navbar = async() => {
  const session = await getAuthSession();

  return (
    <div>
      <nav className="flex items-center justify-between py-3">
        <Logo />
        <div>
          <HamburgerMenu />
          {/* Desktop Navigation */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              {session && session.user ? (
                <div className="flex items-center gap-3">
                  {navbarLinks.map((navLink, index) => (
                    <NavLink key={index} navLink={navLink} />
                  ))}
                </div>
              ) : (
                <div className="xsBig:flex items-center gap-2 hidden">
                  <AuthButton />
                </div>
              )}
            </div>
            <div className="hidden md:block">
              <ThemeToggler />
            </div>
          </div>
        </div>
      </nav>
      <MobileNav />
    </div>
  );
};