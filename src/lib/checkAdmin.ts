"use server";

import { prisma } from "./prisma";

export const checkAdmin = async ({ userId = "" }: { userId: string }) => {
  if (!checkAdmin) return false;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user?.isAdmin;
};
