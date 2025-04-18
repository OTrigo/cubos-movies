import { prisma } from "@/lib/prisma";
import { sendValidationEmail } from "@/lib/sendValidationEmail";
import { randomBytes } from "crypto";

export const sendEmail = async ({ email }: { email: string }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.verified) return;

  const token = randomBytes(32).toString("hex");
  const recordToken = prisma.emailVerificationToken.create({
    data: { token, userId: user.id, expiresAt: 15 },
  });

  if (!recordToken) return { error: "Couldn't generate a token" };

  const sentEmail = await sendValidationEmail({ email, token });
  if (!sentEmail) return { error: "Couldn't sent an email" };

  return { success: true };
};
