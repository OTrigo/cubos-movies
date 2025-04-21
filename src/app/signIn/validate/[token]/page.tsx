"use client";

import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import { validateUser } from "@actions/user/userActions";
import { useParams } from "next/navigation";
import Background from "@/assets/background.png";

const UnverifiedEmailPage = () => {
  const { data: user, refetch } = useUser();

  const token = useParams().token as string;

  const confirmAccount = async () => {
    if (!user) return;
    await validateUser({
      email: user.email,
      token: token ?? "",
    });
    await refetch();
  };

  return (
    <div className="flex h-[calc(100vh-140px)] justify-center items-center w-full py-[281px] bg-[var(--bg-theme-1)]">
      <div
        className="absolute z-[1] top-[72px] w-full h-[564px]"
        style={{
          background:
            "linear-gradient(180deg, #121113 0%, rgba(18, 17, 19, 0.46) 49.48%, #121113 100%)",
        }}
      />

      <Image
        className="absolute z-[0] h-full top-[72px] w-full max-h-[564px] object-cover opacity-40"
        src={Background}
        alt="Cubos Movies Background"
        width={1440}
        height={564}
      />

      <form className="relative z-10 flex flex-col gap-4 w-fit bg-[#232225] p-4 rounded-1">
        <label className="flex flex-col gap-4 h-fit">
          <span className="text-white text-[20px]">
            Você agora faz parte da Cubos Movie!
          </span>
          <button
            className="outline hover:outline-[#8E4EC6] hover:bg-[#8E4EC6] transition-all duration-300 cursor-pointer py-4 w-full text-[16px] font-bold"
            onClick={(e) => {
              e.preventDefault();
              confirmAccount();
            }}
          >
            Entrar na cubos
          </button>
        </label>
      </form>
    </div>
  );
};

export default UnverifiedEmailPage;
