"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { checkAdmin } from "./checkAdmin";

const JWT_SECRET = process.env.JWT_SECRET ?? "";

export const getUserIdFromToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session-token")?.value;

  if (!token) return;

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as { id: string };

    return {
      userId: decodedToken.id,
      isAdmin: checkAdmin({ userId: decodedToken?.id }),
    };
  } catch (err) {
    console.error({ error: err });
    return { error: err };
  }
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("session-token");
};
