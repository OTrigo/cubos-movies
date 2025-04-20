"use client";

import { createUser } from "@actions/user/userActions";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import Background from "@/assets/background.png";

const LoginPage = () => {
  const { data: user, isLoading, error } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/");
    return;
  }, [isLoading, error, user, router]);

  const [errors, setErrors] = useState<Record<string, string>>({});

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

    router.replace("/");

    return;
  };

  return (
    <div className="flex justify-center items-center w-full py-[281px] bg-[#121113]">
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

      <form
        className="relative z-10 flex flex-col gap-4 w-fit bg-[#232225] p-4 rounded-1"
        onSubmit={(e) => handleNewUser(e)}
      >
        <label className="flex flex-col gap-2 h-[67px]">
          <span className="text-white text-[12.8px]">Nome</span>
          <input
            className="bg-[#1A191B] text-[#6F6D78] w-[380px] h-[44px] min-h-[44px] rounded-[4px] p-3 border border-solid"
            type="name"
            name="name"
            placeholder="Digite seu nome"
          />
        </label>
        <label className="flex flex-col gap-2 h-[67px]">
          <span className="text-white text-[12.8px]">E-mail</span>
          <input
            className="bg-[#1A191B] text-[#6F6D78] w-[380px] h-[44px] min-h-[44px] rounded-[4px] p-3 border border-solid"
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
          />
        </label>
        {errors.email && <>Invalid Email</>}
        <label className="flex flex-col gap-2 h-[67px]">
          <span className="text-white text-[12.8px]">Senha</span>
          <input
            className="bg-[#1A191B] text-[#6F6D78] w-[380px] h-[44px] min-h-[44px] rounded-[4px] p-3 border border-solid"
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
        </label>
        <label className="flex flex-col gap-2 h-[67px]">
          <span className="text-white text-[12.8px]">Confirmação de senha</span>
          <input
            className="bg-[#1A191B] text-[#6F6D78] w-[380px] h-[44px] min-h-[44px] rounded-[4px] p-3 border border-solid"
            type="password"
            name="passwordConfirmation"
            placeholder="Digite sua senha novamente"
          />
        </label>
        {errors.password && <>Invalid Pass</>}
        <div className="flex justify-end">
          <button className="bg-[#8E4EC6] w-[110px] h-[44px] cursor-pointer">
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
