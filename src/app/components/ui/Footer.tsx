"use client";
import { useTheme } from "@/contexts/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer
      className={`${theme}  flex justify-center items-center h-[80px] md:h-[68px]  w-full p-6 bg-[var(--bg-theme-1)] border-t border-[var(--border-color)]`}
    >
      <span
        className={`${theme}  text-[var(--bg-theme-11)] text-[16px] text-center`}
      >
        2025 © Todos os direitos reservados a <b>Cubos Movies</b>
      </span>
    </footer>
  );
};

export default Footer;
