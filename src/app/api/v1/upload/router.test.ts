import { POST, s3 } from "./route";
import { NextRequest } from "next/server";

beforeAll(() => {
  process.env.AWS_BUCKET_NAME = "test-bucket";
  process.env.AWS_BUCKET_REGION = "us-east-1";
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("POST /api/v1/upload", () => {
  it("returns 400 when image or banner is missing", async () => {
    const req = {
      formData: async () => ({
        get: () => null,
      }),
    } as unknown as NextRequest;

    const res = await POST(req);
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body).toEqual({ error: "Couldn't get the files" });
  });

  it("uploads both files and returns 201 with their URLs", async () => {
    const sendSpy = jest.spyOn(s3, "send").mockResolvedValue({} as never);
    const dummyBuffer = new ArrayBuffer(4);
    const imageFile = {
      name: "img.png",
      type: "image/png",
      arrayBuffer: async () => dummyBuffer,
    };
    const bannerFile = {
      name: "bnr.png",
      type: "image/png",
      arrayBuffer: async () => dummyBuffer,
    };

    const req = {
      formData: async () => ({
        get: (key: string) =>
          key === "image" ? imageFile : key === "banner" ? bannerFile : null,
      }),
    } as unknown as NextRequest;

    const res = await POST(req);
    expect(sendSpy).toHaveBeenCalledTimes(2);
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body).toEqual({
      success: true,
      upload: {
        imageUrl: `https://test-bucket.s3.us-east-1.amazonaws.com/img.png`,
        bannerUrl: `https://test-bucket.s3.us-east-1.amazonaws.com/bnr.png`,
      },
    });
  });
});
