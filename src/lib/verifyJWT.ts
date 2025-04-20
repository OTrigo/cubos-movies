import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET) as User;
    return decoded;
  } catch (err) {
    return err;
  }
}
