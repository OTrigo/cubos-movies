"use client";
import { useTheme } from "@/contexts/ThemeContext";

import { Sun, Moon } from "@/lib/icons";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`${theme} h-[44px] rounded-[2px] gap-3 pt-3 pr-5 pb-3 pl-5 bg-[#B744F708] cursor-pointer`}
      onClick={toggleTheme}
    >
      {theme ? <Sun /> : <Moon />}
    </div>
  );
};

export default ThemeSwitcher;
