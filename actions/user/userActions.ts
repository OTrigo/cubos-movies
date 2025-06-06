/* eslint-disable @typescript-eslint/ban-ts-comment */
"use server";

import { prisma } from "@/lib/prisma";
import { getUserIdFromToken } from "../../src/lib/auth";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { sendEmail } from "@/lib/sendEmail";
import { sendConfirmationEmail } from "@actions/email/emailActions";
import { User } from "@prisma/client";

type CreateUserProps = {
  email: string;
  password: string;
  name: string;
};

interface UserCredentials {
  emailOrName: string;
  password: string;
}

const JWT_SECRET = process.env.JWT_SECRET!;

const createUserSession = async (user: User) => {
  const token = jwt.sign(
    { id: user?.id, email: user?.email, verified: user?.verified },
    JWT_SECRET
  );

  const cookieStore = await cookies();

  const cookieName = "session-token";

  cookieStore.set({
    name: cookieName,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60 * 24 * 3,
    path: "/",
  });

  return { success: true };
};

export const getUserByCredentials = async ({
  emailOrName,
  password,
}: UserCredentials) => {
  const query = emailOrName.includes("@")
    ? { email: emailOrName }
    : { name: emailOrName };

  try {
    const user = await prisma.user.findUnique({
      //@ts-expect-error
      where: query,
    });

    if (!user || !user.password) return { error: "No user" };

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) return { error: "Invalid Password" };

    const session = await createUserSession(user);

    if (!session) return { error: "Couldn't create session" };

    return { session };
  } catch (err) {
    console.error(err);
    return { error: "Couldn't log in" };
  }
};

export const getUserByToken = async () => {
  const userInfo = await getUserIdFromToken();

  if (!userInfo?.userId) return;

  const user = await prisma.user.findUnique({
    where: {
      id: userInfo?.userId ?? "",
    },
  });

  return user;
};

export const isVerifiedUser = async () => {
  const user = await getUserByToken();

  if (user) return user?.verified;
};

export const createUser = async ({
  email,
  password,
  name,
}: CreateUserProps) => {
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password: encryptedPassword,
        name,
      },
    });

    if (!newUser) return { error: "Couldn't create user" };

    const token = randomBytes(32).toString("hex");
    const recordToken = await prisma.emailVerificationToken.create({
      data: {
        token,
        userId: "3b78e2f4-d694-4b40-9a55-ef2b8cd7795a",
        expiresAt: 15,
        used: false,
      },
    });

    if (!recordToken) return { error: "Couldn't create a token" };

    const sentEmail = await sendEmail({
      email,
      token,
      variation: "validation",
    });

    if (!sentEmail) return { createdUser: true, sentEmail: false };
    return { createdUser: true, sentEmail: true };
  } catch (err) {
    console.error(err);
    return { error: "Couldn't create user" };
  }
};

export const validateUser = async ({ token }: { token: string }) => {
  try {
    const isValidToken = await prisma.emailVerificationToken.findFirst({
      where: { token },
    });
    const user = await prisma.user.findUnique({
      where: { id: isValidToken?.userId },
    });

    if (!isValidToken) return { error: "Invalid token" };

    if (isValidToken.used) return { error: "Token already used" };

    const updatedUser = await Promise.all([
      await prisma.user.update({
        where: { id: user?.id },
        data: { verified: true },
      }),
      await prisma.emailVerificationToken.update({
        where: { id: isValidToken?.id },
        data: { used: true },
      }),
    ]);

    if (!updatedUser) return { error: "Couldn't update user" };

    const sentEmail = await sendConfirmationEmail({
      email: updatedUser?.[0]?.email,
      token
    });

    if (!sentEmail) return { error: "Couldn't send confirmation email" };

    const session = await createUserSession(updatedUser?.[0]);
    if (!session) return { error: "Couldn't create session" };

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error(error);
    return { error: "Couldn't validate user" };
  }
};

export const sendNewPasswordEmail = async ({ email }: { email: string }) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return { error: "User not found" };

    const token = randomBytes(32).toString("hex");
    const recordToken = await prisma.emailVerificationToken.create({
      data: {
        token,
        userId: user?.id,
        expiresAt: 15,
      },
    });

    if (!recordToken) return { error: "Couldn't create a token" };

    const sentEmail = await sendEmail({
      email,
      token,
      variation: "forgottenPassword",
    });

    if (!sentEmail) return { error: "Couldn't send email" };

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Couldn't send email" };
  }
};

export const updatePassword = async ({
  token,
  password,
}: {
  token: string;
  password: string;
}) => {
  const isValidToken = await prisma.emailVerificationToken.findFirst({
    where: { token },
  });

  if (!isValidToken) return { error: "Invalid token" };
  if (isValidToken.used) return { error: "Token already used" };

  const encryptedPassword = await bcrypt.hash(password, 10);

  const updatedUser = await Promise.all([
    await prisma.user.update({
      where: { id: isValidToken.userId },
      data: { password: encryptedPassword },
    }),
    await prisma.emailVerificationToken.update({
      where: { id: isValidToken.id },
      data: { used: true },
    }),
  ]);

  if (!updatedUser) return { error: "Couldn't update user" };

  return { success: true };
};
