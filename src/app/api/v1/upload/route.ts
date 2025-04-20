import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const uploadFile = async (file: Buffer, name: string, type: string) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: name,
    Body: file,
    ContentType: type,
  };

  console.log({ params });

  try {
    const command = new PutObjectCommand(params);
    const response = await s3.send(command);

    console.log({ response });

    if (!response) return { error: "Couldn't upload the file" };

    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${name}`;
  } catch (error) {
    return { error };
  }
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const imageFile = formData?.get("image") as File;
    const bannerFile = formData?.get("banner") as File;

    console.log();

    if (!imageFile || !bannerFile)
      return NextResponse.json(
        { error: "Couldn't get the files" },
        {
          status: 400,
        }
      );

    console.info({ imageFile, bannerFile });

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

    console.log({ imageUrl, bannerUrl });

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
