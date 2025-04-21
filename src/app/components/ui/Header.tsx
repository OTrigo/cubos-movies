"use client";
import { useTheme } from "@/contexts/ThemeContext";

import Logo from "./Logo";
import HeaderActions from "@/app/components/ui/HeaderActions";

const Header = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`${theme} relative flex w-full min-h-[76px] justify-between border-b border-b-[#F1E6FD19] items-center bg-transparent md:bg-[var(--bg-theme-1)] px-4 z-30`}
    >
      <Logo />
      <HeaderActions />
    </div>
  );
};

export default Header;
