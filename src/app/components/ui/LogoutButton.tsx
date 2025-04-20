"use client";

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

  return (
    <div
      className="w-fit h-[44px] min-h-[44px] rounded-[2px] pt-3 pr-5 pb-3 pl-5 bg-[#8E4EC6] cursor-pointer"
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
