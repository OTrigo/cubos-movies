"use client";
import { useTheme } from "@/contexts/ThemeContext";

import { createUser } from "@actions/user/userActions";
import { useState } from "react";
import { z } from "zod";
import Image from "next/image";
import Background from "@/assets/background.png";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();

  const { theme } = useTheme();

  const handleNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const UserLoginSchema = z.object({
      name: z.string().nonempty("Name is required."),
      email: z.string().email("Invalid email address."),
      password: z.string().nonempty("Password is required."),
      passwordConfirmation: z.string().nonempty("Password is required"),
    });

    const formData = new FormData(e.currentTarget);

    const validateFormData = UserLoginSchema.safeParse(
      Object.fromEntries(formData)
    );

    if (!validateFormData.success) {
      const errorMessages = validateFormData.error.errors.reduce(
        (accumulatedErrors, currentError) => {
          const fieldName = currentError.path[0];
          const errorMessage = currentError.message;

          accumulatedErrors[fieldName] = errorMessage;
          return accumulatedErrors;
        },
        {} as Record<string, string>
      );

      setErrors(errorMessages);
    }

    const data = {
      name: formData.get("email") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      passwordConfirmation: formData.get("password") as string,
    };

    if (data.password !== data.passwordConfirmation)
      setErrors({ error: "password must match" });

    setErrors({});

    const login = await createUser(data);

    if (!login) return;

    router.replace("/signIn");

    return;
  };

  return (
    <div className={`${theme} flex justify-center items-center w-full py-[281px] bg-[var(--bg-theme-1)]`}>
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

      <form
        className={`${theme} relative z-10 flex flex-col gap-4 w-fit bg-[var(--bg-theme-3)] p-4 rounded-1`}
        onSubmit={(e) => handleNewUser(e)}
      >
        <label className={`${theme} flex flex-col gap-2 h-[67px]`}>
          <span className={`${theme} text-white text-[12.8px] font-bold`}>Nome</span>
          <input
            className={`${theme} bg-[var(--bg-theme-2)] text-[#6F6D78] w-[380px] h-[44px] min-h-[44px] rounded-[4px] p-3 border border-solid`}
            type="name"
            name="name"
            placeholder="Digite seu nome"
          />
        </label>
        <label className={`${theme} flex flex-col gap-2 h-[67px]`}>
          <span className={`${theme} text-white text-[12.8px] font-bold`}>E-mail</span>
          <input
            className={`${theme} bg-[var(--bg-theme-2)] text-[#6F6D78] w-[380px] h-[44px] min-h-[44px] rounded-[4px] p-3 border border-solid`}
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
          />
        </label>
        {errors.email && <>Invalid Email</>}
        <label className={`${theme} flex flex-col gap-2 h-[67px]`}>
          <span className={`${theme} text-white text-[12.8px] font-bold`}>Senha</span>
          <input
            className={`${theme} bg-[var(--bg-theme-2)] text-[#6F6D78] w-[380px] h-[44px] min-h-[44px] rounded-[4px] p-3 border border-solid`}
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
        </label>
        <label className={`${theme} flex flex-col gap-2 h-[67px]`}>
          <span className={`${theme} text-white text-[12.8px] font-bold`}>
            Confirmação de senha
          </span>
          <input
            className={`${theme} bg-[var(--bg-theme-2)] text-[#6F6D78] w-[380px] h-[44px] min-h-[44px] rounded-[4px] p-3 border border-solid`}
            type="password"
            name="passwordConfirmation"
            placeholder="Digite sua senha novamente"
          />
        </label>
        {errors.password && <>Invalid Pass</>}
        <div className={`${theme} flex justify-end`}>
          <button className={`${theme} bg-[var(--bg-button-default)] !text-[var(--text-button-default)] disabled:text-[var(--text--button-disabled)] disabled:bg-[var(--bg-button-disabled)] hover:bg-[var(--bg-button-hover)] active:bg-[var(--bg-button-active)]] w-[110px] h-[44px] cursor-pointer`}>
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
