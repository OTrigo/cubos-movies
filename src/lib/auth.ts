import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { checkAdmin } from "./checkAdmin";

const JWT_SECRET = process.env.JWT_SECRET ?? "";

export const getUserIdFromToken = async ({
  isAdminReq,
}: {
  isAdminReq: boolean;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return;

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };
    if (!isAdminReq) return decodedToken.userId;

    return checkAdmin(decodedToken);
  } catch (err) {
    console.error(err);
    return;
  }
};
