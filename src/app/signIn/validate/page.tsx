"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Background from "@public/assets/background.png";
import { useUser } from "@/hooks/useUser";

const UnverifiedEmailPage = () => {
  const { data: user } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/");
    return;
  }, [user, router]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <div className="flex h-[calc(100vh-140px)] justify-center items-center w-full py-[281px] bg-[#121113]">
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
        <label className="flex flex-col gap-4 h-fit">
          <span className="text-white text-[20px]">
            Você agora faz parte da Cubos Movie!
          </span>
          <button className="outline hover:outline-[#8E4EC6] hover:bg-[#8E4EC6] transition-all duration-300 cursor-pointer py-4 w-full text-[16px] font-bold">
            Entrar na cubos
          </button>
        </label>
      </form>
    </div>
  );
};

export default UnverifiedEmailPage;
