"use server";

import { prisma } from "@/lib/prisma";
import { getUserIdFromToken } from "../src/lib/auth";

interface UserCredentials {
  email: string;
  password: string;
}

export const getUserByCredentials = async ({
  email,
  password,
}: UserCredentials) => {
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });

    return getUser;
  } catch (err) {
    console.error(err);
    return;
  }
};

export const getUserById = async () => {
  const userId = await getUserIdFromToken({ isAdminReq: false });
  if (!userId) return;
  const user = await prisma.user.findMany({
    where: {
      id: userId,
    },
  });

  return user;
};

export const createUser = async ({ email, password }: UserCredentials) => {
  const checkAdmin = await getUserIdFromToken({ isAdminReq: true });

  const newUser = await prisma.user.create({
    data: {
      email,
      password,
    },
  });

  console.log(newUser);
};

export const getUsers = async () => {
  return [];
};
