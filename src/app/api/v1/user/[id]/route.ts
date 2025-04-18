import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { type NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = request.headers.get("Authorization");
  const { id } = await params;

  if (!auth || auth !== process.env.JWT_SECRET)
    return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });

  if (!id) return;

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user)
      return NextResponse.json(
        { error: "This user doesn't exist" },
        { status: 400 }
      );

    const deleteUser = await prisma.user.delete({ where: { id } });
    if (!deleteUser)
      return NextResponse.json(
        { error: "Couldn't delete this user" },
        { status: 500 }
      );

    return NextResponse.json({ data: deleteUser }, { status: 200 });
  } catch (err) {
    console.error(err);
  }

  return NextResponse.json({ data: "Everything ok." }, { status: 200 });
}
