"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
  // 1. Gamitin ang 'resolvedTheme' para sa logic
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 bg-bgSoft rounded-full animate-pulse" />;
  }

  // 2. I-check kung ano ang 'actual' na kulay na nakikita (resolvedTheme)
  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center justify-center rounded-full cursor-pointer p-1.5 hover:bg-black/10 dark:hover:bg-white/10 active:opacity-70 transition-all duration-200"
    >
      {isDark ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
    </button>
  );
};

export default ThemeToggle;
