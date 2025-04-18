/* eslint-disable @typescript-eslint/ban-ts-comment */
"use server";

import { prisma } from "@/lib/prisma";
import { getUserIdFromToken } from "../src/lib/auth";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { sendValidationEmail } from "@/lib/sendValidationEmail";

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

  console.log({ userInfo });

  if (!userInfo?.userId) return;

  console.log(userInfo);

  const user = await prisma.user.findUnique({
    where: {
      id: userInfo?.userId ?? "",
    },
  });

  console.log({ user });

  return user;
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
    const sentEmail = await sendValidationEmail({ email, token });

    if (!sentEmail) return { createdUser: true, sentEmail: false };
    return { createdUser: true, sentEmail: true };
  } catch (err) {
    console.error(err);
    return { error: "Couldn't create user" };
  }
};
