"use client";
import { useTheme } from "@/contexts/ThemeContext";

import Image from "next/image";
import Background from "@/assets/background.png";
import { useParams, useRouter } from "next/navigation";
import { FormInput } from "@/app/components/ui/FormInput";
import React, { useState } from "react";
import { updatePassword } from "@actions/user/userActions";

const NewPasswordPage = () => {
  const { token }: { token: string } = useParams();

  const [error, setError] = useState<null | { message: string }>(null);

  const { theme } = useTheme();

  const router = useRouter();

  const handleNewPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);

    const data = {
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    if (data?.password !== data?.confirmPassword) {
      setError({ message: "Passwords do not match" });
      return;
    }

    const updatedPass = await updatePassword({
      token,
      password: data.password,
    });

    if (!updatedPass) return;

    router.replace("/signIn");
  };

  return (
    <div
      className={`${theme} flex h-[calc(100vh-140px)] justify-center items-center w-full py-[281px] bg-[var(--bg-theme-1)]`}
    >
      <div
        className={`${theme}  absolute z-[1] top-[72px] w-full h-[564px]`}
        style={{
          background:
            "linear-gradient(180deg, var(--bg-theme-1) 0%, rgba(18, 17, 19, 0.46) 49.48%, var(--bg-theme-1) 100%)",
        }}
      />

      <Image
        className={`${theme}  absolute z-[0] h-full top-[72px] w-full max-h-[564px] object-cover opacity-40`}
        src={Background}
        alt="Cubos Movies Background"
        width={1440}
        height={564}
      />

      <form
        className={`${theme}  relative z-10 flex flex-col gap-4 w-fit bg-[var(--bg-theme-3)] p-4 rounded-1`}
        onSubmit={(e) => handleNewPassword(e)}
      >
        <label className={`${theme}  flex flex-col gap-4 h-fit`}>
          <div
            className={`${theme} flex flex-col md:min-w-[300px] lg:min-w-[400px] text-[var(--text-default)] text-[20px] gap-4`}
          >
            <FormInput name="password" type="password" label="Senha" />
            <FormInput
              name="confirmPassword"
              type="password"
              label="Confirmar senha"
            />
            {error && error?.message}
          </div>
          <button
            className={`${theme} bg-[var(--bg-button-default)] !text-[var(--text-button-default)] disabled:text-[var(--text--button-disabled)] disabled:bg-[var(--bg-button-disabled)] hover:bg-[var(--bg-button-hover)] active:bg-[var(--bg-button-active)]] active:bg-[var(--bg-button-active)]] transition-all duration-300 cursor-pointer py-4 w-full text-[16px] font-bold`}
          >
            Atualizar senha
          </button>
        </label>
      </form>
    </div>
  );
};

export default NewPasswordPage;
