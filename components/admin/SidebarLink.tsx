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
      className={`p-3 flex items-center justify-center md:justify-start gap-2 rounded-md text-lg font-medium my-2
       ${
         pathname === link.path
           ? "bg-blue-600 dark:bg-white text-white dark:text-black"
           : "hover:bg-blue-600 dark:hover:bg-white hover:text-white dark:hover:text-black"
       }`}
      href={link.path}
    >
      {link.icon}
      <span className="hidden md:block">{link.title}</span>
    </Link>
  );
};

export default SidebarLink;
