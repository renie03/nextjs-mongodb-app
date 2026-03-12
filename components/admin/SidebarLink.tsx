"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarLinkType = {
  title: string;
  path: string;
  icon: ReactNode;
};

const SidebarLink = ({ link }: { link: SidebarLinkType }) => {
  const pathname = usePathname();

  return (
    <Link
      href={link.path}
      className={`p-3 flex items-center justify-center md:justify-start gap-2 rounded-md text-lg font-medium my-2
       ${
         pathname === link.path
           ? "bg-gray-800 dark:bg-white text-white dark:text-black"
           : "hover:bg-gray-800 dark:hover:bg-white hover:text-white dark:hover:text-black"
       }`}
    >
      {link.icon}
      <span className="hidden md:block">{link.title}</span>
    </Link>
  );
};

export default SidebarLink;
