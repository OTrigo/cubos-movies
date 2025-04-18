import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const auth = request.headers.get("Authorization");
  if (!auth || auth !== process.env.JWT_SECRET)
    return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });
  return NextResponse.json({ data: "Everything ok." }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const auth = request.headers.get("Authorization");
  const newAdminUser = await request.json();

  if (!auth || auth !== process.env.JWT_SECRET)
    return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });

  if (!newAdminUser)
    return NextResponse.json(
      { error: "Bad Request, the body doesn't follow the user schema" },
      { status: 400 }
    );

  try {
    const encryptedPassword = await bcrypt.hash(newAdminUser?.password, 10);

    if (!encryptedPassword)
      return NextResponse.json(
        { data: "Couldn't hash the password" },
        { status: 500 }
      );

    const newUser = await prisma.user.create({
      data: {
        ...newAdminUser,
        verified: true,
        password: encryptedPassword,
      },
    });

    if (!newUser)
      return NextResponse.json(
        { data: "The user couldn't be created" },
        { status: 400 }
      );

    return NextResponse.json({ data: newUser }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ data: err }, { status: 400 });
  }
}
