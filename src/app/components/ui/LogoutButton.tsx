"use client";

import { useUser } from "@/hooks/useUser";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const { refetch } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    logout();
    await refetch();
    router.replace("/signIn");
  };

  return (
    <div
      className="w-[90px] h-[44px] min-h-[44px] rounded-[2px] pt-3 pr-5 pb-3 pl-5 bg-[#8E4EC6] cursor-pointer"
      onClick={handleLogout}
    >
      Logout
    </div>
  );
};

export default LogoutButton;
