import NavbarWrapper from "./NavbarWrapper";
import Link from "next/link";
import { auth } from "@/lib/auth";
import NavLink from "./NavLink";
import UserMenu from "./UserMenu";
import { links } from "@/lib/constants";
import ThemeToggle from "../shared/ThemeToggle";
import MobileMenu from "./MobileMenu";
import Search from "./Search";
import MobileSearch from "./MobileSearch";

const Navbar = async () => {
  const session = await auth();
  //   console.log(session);

  return (
    <NavbarWrapper>
      <div className="max-w-5xl xl:max-w-7xl 2xl:max-w-screen-2xl mx-auto px-5 h-20 flex justify-between items-center">
        <Link href="/" className="text-xl font-medium">
          Blog App
        </Link>
        <div className="hidden lg:block w-1/4 lg:w-1/3">
          <Search />
        </div>
        <div className="flex items-center gap-2">
          <MobileSearch />
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <NavLink key={link.title} link={link} />
            ))}
            {session?.user?.isAdmin && (
              <NavLink
                link={{ title: "Dashboard", path: "/admin/dashboard" }}
              />
            )}
          </div>
          {session?.user ? (
            <UserMenu session={session} />
          ) : (
            <div className="hidden md:block">
              <NavLink link={{ title: "Login", path: "/login" }} />
            </div>
          )}
          {/* MOBILE MENU */}
          <MobileMenu session={session} />
        </div>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
