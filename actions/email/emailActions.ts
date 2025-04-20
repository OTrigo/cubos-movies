import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/sendEmail";
import { randomBytes } from "crypto";

export const sendValidationEmail = async ({ email }: { email: string }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.verified) return;

  const token = randomBytes(32).toString("hex");

  console.log({ token, user: user.id });

  const recordToken = await prisma.emailVerificationToken.create({
    data: { token, userId: user.id, expiresAt: 15 },
  });

  console.log({ recordToken });

  if (!recordToken) return { error: "Couldn't generate a token" };

  const sentEmail = await sendEmail({ email, token, variation: "validation" });
  if (!sentEmail) return { error: "Couldn't sent an email" };

  return { success: true };
};

export const sendConfirmationEmail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const sentEmail = await sendEmail({
    email,
    token,
    variation: "confirmation",
  });
  if (!sentEmail) return { error: "Couldn't sent an email" };

  return { success: true };
};
