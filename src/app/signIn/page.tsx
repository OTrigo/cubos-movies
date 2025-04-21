"use client";
import { useTheme } from "@/contexts/ThemeContext";

import { getUserByCredentials } from "@actions/user/userActions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Background from "@/assets/background.png";
import { errorAccumulator, UserLoginSchema } from "@/utils/zod";
import { sendNewPasswordEmail } from "@actions/user/userActions";

const LoginPage = () => {
  const router = useRouter();

  const { theme } = useTheme();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [forgotPassword, setForgotPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleForgottenPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (emailSent) return;

    const formData = new FormData(e.currentTarget);

    const data = {
      email: formData.get("emailOrName") as string,
    };

    const sent = await sendNewPasswordEmail(data);

    if (!sent) return;

    setEmailSent(true);
  };

  const handleLoginValidation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const validateFormData = UserLoginSchema.safeParse(
      Object.fromEntries(formData)
    );

    if (!validateFormData.success) {
      const errorMessages = errorAccumulator(validateFormData);
      setErrors(errorMessages);
    }

    setErrors({});

    const data = {
      emailOrName: formData.get("emailOrName") as string,
      password: formData.get("password") as string,
    };

    const login = await getUserByCredentials(data);

    if (login?.error) return;

    router.replace("/");

    return;
  };

  return (
    <div
      className={`${theme} h-full flex justify-center items-center w-full py-[281px] bg-[var(--bg-theme-1)]`}
    >
      <div
        className={`${theme}  absolute z-[1] top-[72px] w-full h-[564px] p-4`}
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
        className={`${theme}  relative max-w-screen flex-grow md:flex-grow-[0] mx-4 z-10 flex flex-col gap-4 w-fit bg-[var(--bg-theme-3)]  p-4 rounded-1`}
        onSubmit={(e) =>
          forgotPassword ? handleForgottenPassword(e) : handleLoginValidation(e)
        }
      >
        <label className={`${theme}  flex flex-col gap-2 h-[67px]`}>
          <span
            className={`${theme}  text-[var(--text-default)] text-[12.8px] font-bold`}
          >
            Nome/E-mail
          </span>
          <input
            className={`${theme}  bg-[var(--bg-theme-2)] text-[#6F6D78] w-full md:w-[380px] h-[44px] min-h-[44px] rounded-[4px] p-3 appearance-none focus:outline focus:outline-[var(--bg-button-default)]`}
            type="text"
            name="emailOrName"
            placeholder={
              forgotPassword
                ? `Digite seu email de recuperação`
                : `Digite seu nome/E-mail`
            }
          />
        </label>
        {errors.email && <>Invalid Email</>}
        <label
          className={`${theme} ${forgotPassword && "hidden"} flex flex-col gap-2 h-[67px]`}
        >
          <span
            className={`${theme}  text-[var(--text-default)] text-[12.8px] font-bold`}
          >
            Senha
          </span>
          <input
            className={`${theme}  bg-[var(--bg-theme-2)] text-[#6F6D78] w-full md:w-[380px] h-[44px] min-h-[44px] rounded-[4px] p-3 border border-solid`}
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
        </label>
        {errors.password && <>Invalid Pass</>}
        <div className={`${theme}  flex justify-between`}>
          <span
            className={`${theme} text-[16px] underline text-[var(--bg-button-default-variant-forgot)]`}
            onClick={() => setForgotPassword(!forgotPassword)}
          >
            {"Esqueci minha senha"}
          </span>
          <button
            className={`${theme} w-fit bg-[var(--bg-button-default)] !text-[var(--text-button-default)] disabled:text-[var(--text--button-disabled)] disabled:bg-[var(--bg-button-disabled)] hover:bg-[var(--bg-button-hover)] active:bg-[var(--bg-button-active)]] min-w-[110px] h-[44px] cursor-pointer ${emailSent && "bg-[var(--bg-button-disabled)]"}`}
            disabled={emailSent}
          >
            {!forgotPassword ? "Entrar" : "Enviar email"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
