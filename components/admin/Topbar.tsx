"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { MdPublic } from "react-icons/md";
import ThemeToggle from "../shared/ThemeToggle";

const Topbar = () => {
  const pathname = usePathname();

  return (
    <div className="p-5 rounded-xl bg-bgSoft flex items-center justify-between mb-5">
      <div className="text-textSoft font-bold capitalize">
        {pathname.split("/").pop()}
      </div>
      <div className="flex items-center gap-2">
        <div className="border border-borderColor rounded-lg p-1 pl-2 flex items-center gap-2 focus-within:ring-focusColor focus-within:ring-1">
          <FaSearch size={20} />
          <input className="ring-0" type="text" placeholder="Search..." />
        </div>
        <ThemeToggle />
        <Link
          href="/"
          className="hover:bg-black/10 dark:hover:bg-white/10 p-1 rounded-lg active:opacity-70 transition-all duration-200"
        >
          <MdPublic size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
