"use client";

import { ReactNode, useEffect, useState } from "react";

const NavbarWrapper = ({ children }: { children: ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 ${
        isScrolled ? "bg-bg/80 backdrop-blur-2xl shadow-sm " : ""
      }`}
    >
      {children}
    </div>
  );
};

export default NavbarWrapper;
