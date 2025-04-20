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

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "3d",
    });

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
    const recordToken = prisma.emailVerificationToken.create({
      data: { token, userId: newUser.id, expiresAt: 15 },
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

export const validateUser = async ({
  token,
  email,
}: {
  token: string;
  email: string;
}) => {
  const user = await prisma.user.findUnique({ where: { email } });
  const isValidToken = await prisma.emailVerificationToken.findFirst({
    where: { token, userId: user?.id },
  });

  console.log({ user, isValidToken });

  if (!user || !isValidToken) return { error: "Invalid token" };

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { verified: true },
  });

  if (!updatedUser) return { error: "Couldn't update user" };

  const sentEmail = await sendConfirmationEmail({ email, token });

  if (!sentEmail) return { error: "Couldn't send confirmation email" };

  return { success: true, data: updatedUser };
};
