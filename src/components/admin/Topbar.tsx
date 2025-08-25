"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { MdPublic } from "react-icons/md";

const Topbar = () => {
  const pathname = usePathname();

  return (
    <div className="p-5 rounded-xl bg-bgSoft flex items-center justify-between mb-5">
      <div className="text-textSoft font-bold capitalize">
        {pathname.split("/").pop()}
      </div>
      <div className="flex items-center gap-5">
        <div className="border border-borderColor rounded-lg p-1 pl-2 flex items-center gap-2 focus-within:ring-text focus-within:ring-1">
          <FaSearch />
          <input className="outline-none" type="text" placeholder="Search..." />
        </div>
        <Link href="/" className="flex items-center gap-1">
          <MdPublic size={18} />
          <span className="hidden lg:block text-sm text-textSoft">
            View Site
          </span>
        </Link>
      </div>
    </div>
  );
};
export default Topbar;
