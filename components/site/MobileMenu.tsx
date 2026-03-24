"use client";

import { useEffect, useRef, useState } from "react";
import { Session } from "next-auth";
import { links } from "@/lib/constants";
import NavLink from "./NavLink";

const MobileMenu = ({ session }: { session: Session | null }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu when click outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="md:hidden flex items-center" ref={menuRef}>
      {/* MOBILE BUTTON */}
      <button
        className="w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 active:opacity-70 transition-all duration-200"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex flex-col gap-1.25">
          <div
            className={`h-0.75 w-6 bg-text origin-left ${open && "rotate-45"}`}
          />
          <div className={`h-0.75 w-6 bg-text ${open && "opacity-0"}`} />
          <div
            className={`h-0.75 w-6 bg-text origin-left ${open && "-rotate-45"}`}
          />
          {/* <div
            className={`h-0.75 w-6 rounded-md bg-text transition-all ease-in-out ${
              open && "opacity-0"
            }`}
          />
          <div
            className={`h-0.75 w-6 rounded-md bg-text origin-left transition-all ease-in-out ${
              open && "-rotate-45"
            }`}
          /> */}
        </div>
      </button>
      {/* MOBILE LINK LIST */}
      <div
        className={`fixed top-20 right-0 h-screen w-1/2 bg-bgSoft rounded-l-2xl flex flex-col items-center gap-2 p-5 transition-all ease-in-out z-40 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {links.map((link) => (
          <NavLink
            key={link.title}
            link={link}
            isMobile
            onClick={() => setOpen(false)}
          />
        ))}
        {session?.user?.isAdmin && (
          <NavLink
            link={{ title: "Dashboard", path: "/admin/dashboard" }}
            isMobile
            onClick={() => setOpen(false)}
          />
        )}
        {!session?.user && (
          <NavLink
            link={{ title: "Login", path: "/login" }}
            isMobile
            onClick={() => setOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
