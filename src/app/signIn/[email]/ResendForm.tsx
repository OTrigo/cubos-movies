"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import { sendEmail } from "@actions/email/emailActions";

const ResendForm = ({ email }: { email: string }) => {
  const { data: user } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (user && !user?.verified) router.replace(`/signIn/${user?.email}`);
    else if (user) router.replace("/");
  }, [user, router]);

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
        src={"/assets/background.png"}
        alt="Cubos Movies Background"
        width={1440}
        height={564}
      />

      <form className="relative z-10 flex flex-col gap-4 w-fit bg-[#232225] p-4 rounded-1">
        <label className="flex flex-col gap-4 h-fit">
          <span className="text-white text-[20px]">
            Verifique para acessar A Cubos Movies
          </span>
          <button
            className="outline hover:outline-[#8E4EC6] hover:bg-[#8E4EC6] transition-all duration-300 cursor-pointer py-4 w-full text-[16px] font-bold"
            onClick={() => sendEmail({ email })}
          >
            Reenviar email
          </button>
        </label>
      </form>
    </div>
  );
};
export default ResendForm;
