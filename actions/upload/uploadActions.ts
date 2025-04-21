"use server";

import { getS3Client } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadFile = async (file: Buffer, name: string, type: string) => {
  if (!file || !name || !type || name.includes("undefined")) return;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: name,
    Body: file,
    ContentType: type,
  };

  const s3 = getS3Client();

  try {
    const command = new PutObjectCommand(params);
    const response = await s3.send(command);

    if (!response) return;

    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${name}`;
  } catch (error) {
    console.error(error);
    return;
  }
};
