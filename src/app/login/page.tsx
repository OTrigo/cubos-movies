"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { getUserByCredentials } from "@actions/userActions";
import { useState } from "react";
import { z } from "zod";

const Login = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { toggleTheme } = useTheme();

  const handleLoginValidation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const UserLoginSchema = z.object({
      email: z.string().email("Invalid email address."),
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
    }

    setErrors({});

    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const login = await getUserByCredentials(data);

    if (!login) return;

    console.log("Logged In");

    return;
  };

  return (
    <>
      <form
        className="flex flex-col gap-2 max-w-[100px]"
        onSubmit={handleLoginValidation}
      >
        <input
          className="bg-white text-[#222]"
          type="email"
          name="email"
        ></input>
        {errors.email && <>Invalid Email</>}
        <input
          className="bg-white text-[#222]"
          type="password"
          name="password"
        ></input>
        {errors.password && <>Invalid Pass</>}
        <button className="bg-blue-500 w-40 h-40" onClick={() => {}}>
          Entrar
        </button>
      </form>
      <button className="bg-red-500 w-40 h-40" onClick={toggleTheme}></button>
    </>
  );
};

export default Login;
