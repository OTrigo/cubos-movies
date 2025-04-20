"use client";
import { getUserByCredentials } from "@actions/user/userActions";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Background from "@public/assets/background.png";
import { useUser } from "@/hooks/useUser";

const LoginPage = () => {
  const { data: user, isLoading } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/");
    return;
  }, [user, router, isLoading]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLoginValidation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const UserLoginSchema = z.object({
      emailOrName: z.string().nonempty("Name or Email is required."),
      password: z.string().nonempty("Password is required."),
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
      console.error({ errorMessages });
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
        onSubmit={(e) => handleLoginValidation(e)}
      >
        <label className="flex flex-col gap-2 h-[67px]">
          <span className="text-white text-[12.8px]">Nome/E-mail</span>
          <input
            className="bg-[#1A191B] text-[#6F6D78] w-[380px] h-[44px] min-h-[44px] rounded-[4px] p-3 border border-solid"
            type="text"
            name="emailOrName"
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
        {errors.password && <>Invalid Pass</>}
        <div className="flex justify-between">
          <span>Esqueceu sua senha?</span>
          <button className="bg-[#8E4EC6] w-[110px] h-[44px] cursor-pointer">
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
