"use client";
import { useTheme } from "@/contexts/ThemeContext";

import { useUser } from "@/hooks/useUser";
import { logout } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";

const LogoutButton = () => {
  const { refetch } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    logout();
    await refetch();
    router.replace("/signIn");
  };

  const signUp = () => {
    router.replace("/signUp");
  };

  const { theme } = useTheme();

  return (
    <div
      className={`${theme}  w-fit h-[44px] min-h-[44px] rounded-[2px] pt-3 pr-5 pb-3 pl-5 bg-[var(--bg-button-default)] !text-[var(--text-button-default)] disabled:text-[var(--text--button-disabled)] disabled:bg-[var(--bg-button-disabled)] hover:bg-[var(--bg-button-hover)] active:bg-[var(--bg-button-active)]] cursor-pointer`}
      onClick={
        pathname === "/signIn" || pathname === "/signUp" ? signUp : handleLogout
      }
    >
      {pathname === "/signIn" || pathname === "/signUp"
        ? "Cadastre-se"
        : "Logout"}
    </div>
  );
};

export default LogoutButton;
