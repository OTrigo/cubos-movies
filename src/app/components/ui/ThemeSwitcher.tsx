"use client";
import { useTheme } from "@/contexts/ThemeContext";

import { Sun, Moon } from "@/lib/icons";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`${theme}  h-[44px] rounded-[2px] gap-3 pt-3 pr-5 pb-3 pl-5 bg-[var(--bg-button-secondary-default)] hover:bg-[var(--bg-button-secondary-hover)] disabled:bg-[var(--bg-button-secondary-disabled)] active:bg-[var(--bg-button-secondary-active)] text-[var(--text-button-secondary-default)] disabled:text-[var(--text-button-secondary-disabled)]] cursor-pointer`}
      onClick={toggleTheme}
    >
      {theme ? <Sun /> : <Moon />}
    </div>
  );
};

export default ThemeSwitcher;
