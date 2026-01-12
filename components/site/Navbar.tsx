import Link from "next/link";
import { auth } from "@/lib/auth";
import Search from "./Search";
import UserMenu from "./UserMenu";
import NavLink from "./NavLink";
import ThemeToggle from "../shared/ThemeToggle";
import { links } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

const Navbar = async () => {
  const session = await auth();
  // console.log(session);

  return (
    <div className="h-20 flex justify-between items-center sticky top-0 bg-bg z-50">
      <Link href="/" className="hidden lg:inline text-lg font-medium">
        Blog App
      </Link>
      <Search />
      <div className="flex items-center gap-2">
        <div className="mr-3">
          <ThemeToggle />
        </div>
        <div className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <NavLink key={link.title} link={link} />
          ))}
          {session?.user?.isAdmin && (
            <NavLink link={{ title: "Dashboard", path: "/admin/dashboard" }} />
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
  );
};

export default Navbar;
