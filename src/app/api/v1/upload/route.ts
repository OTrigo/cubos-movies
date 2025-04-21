import { uploadFile } from "@actions/upload/uploadActions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const imageFile = formData?.get("image") as File;
    const bannerFile = formData?.get("banner") as File;

    if (!imageFile || !bannerFile) {
      return NextResponse.json(
        { error: "Couldn't get the files" },
        {
          status: 400,
        }
      );
    }

    const imageBuffer = Buffer?.from(await imageFile?.arrayBuffer());
    const bannerBuffer = Buffer?.from(await bannerFile?.arrayBuffer());

    const imageUrl = await uploadFile(
      imageBuffer,
      imageFile?.name,
      imageFile?.type
    );
    const bannerUrl = await uploadFile(
      bannerBuffer,
      bannerFile?.name,
      bannerFile?.type
    );

    if (!imageUrl || !bannerUrl)
      return NextResponse.json({ error: "No imageUrl or bannerUrl" });

    const data = {
      imageUrl,
      bannerUrl,
    };

    return NextResponse.json({ success: true, upload: data }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
