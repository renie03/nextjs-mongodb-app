"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdPublic } from "react-icons/md";
import ThemeToggle from "../shared/ThemeToggle";

const Topbar = () => {
  const pathname = usePathname();

  return (
    <div className="p-5 rounded-xl bg-bgSoft flex items-center justify-between mb-5">
      <h1 className="text-lg font-bold text-textSoft capitalize">
        {pathname.split("/").pop()}
      </h1>
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <Link
          href="/"
          className="hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-2 active:opacity-70 transition-all duration-200"
        >
          <MdPublic size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
