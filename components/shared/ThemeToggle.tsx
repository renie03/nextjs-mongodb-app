"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 bg-bgSoft rounded-full animate-pulse" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-2 cursor-pointer active:opacity-70 transition-all duration-200"
    >
      {isDark ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
    </button>
  );
};

export default ThemeToggle;
