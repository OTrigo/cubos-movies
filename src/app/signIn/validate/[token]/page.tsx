"use client";
import { useTheme } from "@/contexts/ThemeContext";

import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import { validateUser } from "@actions/user/userActions";
import { useParams } from "next/navigation";
import Background from "@/assets/background.png";

const UnverifiedEmailPage = () => {
  const { data: user, refetch } = useUser();

  const { theme } = useTheme();

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
    <div className={`${theme} flex h-[calc(100vh-140px)] justify-center items-center w-full py-[281px] bg-[var(--bg-theme-1)]`}>
      <div
        className={`${theme} absolute z-[1] top-[72px] w-full h-[564px]`}
        style={{
          background:
            "linear-gradient(180deg, var(--bg-theme-1) 0%, rgba(18, 17, 19, 0.46) 49.48%, var(--bg-theme-1) 100%)",
        }}
      />

      <Image
        className={`${theme} absolute z-[0] h-full top-[72px] w-full max-h-[564px] object-cover opacity-40`}
        src={Background}
        alt="Cubos Movies Background"
        width={1440}
        height={564}
      />

      <form className={`${theme} relative z-10 flex flex-col gap-4 w-fit bg-[var(--bg-theme-3)] p-4 rounded-1`}>
        <label className={`${theme} flex flex-col gap-4 h-fit`}>
          <span className={`${theme} text-white text-[20px]`}>
            Você agora faz parte da Cubos Movie!
          </span>
          <button
            className={`${theme} outline hover:outline-[var(--bg-button-default)] !text-[var(--text-button-default)] disabled:text-[var(--text--button-disabled)] disabled:bg-[var(--bg-button-disabled)] hover:bg-[var(--bg-button-hover)] active:bg-[var(--bg-button-active)]] hover:bg-[var(--bg-button-default)] !text-[var(--text-button-default)] disabled:text-[var(--text--button-disabled)] disabled:bg-[var(--bg-button-disabled)] hover:bg-[var(--bg-button-hover)] active:bg-[var(--bg-button-active)]] transition-all duration-300 cursor-pointer py-4 w-full text-[16px] font-bold`}
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
