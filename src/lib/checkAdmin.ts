import { prisma } from "./prisma";

export const checkAdmin = ({ userId = "" }: { userId: string }) => {
  console.log(userId);
  if (!checkAdmin) return false;

  prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return;
};
