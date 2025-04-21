"use server";

import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/sendEmail";
import { formatEmail } from "@/utils/utils";
import { randomBytes } from "crypto";

export const sendValidationEmail = async ({ email }: { email: string }) => {
  const user = await prisma.user.findUnique({
    where: { email: formatEmail(email) },
  });

  if (!user || user.verified) return;

  const token = randomBytes(32).toString("hex");
  const tokensCreated = await prisma.emailVerificationToken.findMany({
    where: {
      userId: user.id,
    },
  });

  if (tokensCreated.length > 5) {
    return {
      error: "Couldn't generate a token because you have reached the limit (5)",
    };
  }

  const recordToken = await prisma.emailVerificationToken.create({
    data: { token, userId: user.id, expiresAt: 15 },
  });

  if (!recordToken) return { error: "Couldn't generate a token" };

  const sentEmail = await sendEmail({
    email: formatEmail(email),
    token,
    variation: "validation",
  });
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
