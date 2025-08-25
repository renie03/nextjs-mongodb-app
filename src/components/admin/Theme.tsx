"use client";

import useThemeStore from "@/lib/stores/useThemeStore";
import DarkModeToggle from "../common/DarkModeToggle";

const Theme = () => {
  const { darkMode } = useThemeStore();

  return (
    <div className="flex items-center justify-center md:justify-start gap-2">
      <span className="hidden md:block text-textSoft text-sm font-medium">
        {darkMode ? "Dark" : "Light"} Mode
      </span>
      <DarkModeToggle />
    </div>
  );
};
export default Theme;
