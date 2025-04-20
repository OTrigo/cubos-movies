import { GET, POST } from "./route";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      create: jest.fn(),
    },
  },
}));

jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
}));

const createMockRequest = (auth: string | null, body?: unknown) => {
  return {
    headers: {
      get: () => auth,
    },
    json: async () => body,
  } as unknown as NextRequest;
};

describe("admin-user API", () => {
  const envBackup = process.env;

  beforeAll(() => {
    process.env.JWT_SECRET = "test-secret";
  });

  afterAll(() => {
    process.env = envBackup;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/v1/admin-user", () => {
    it("deve retornar 401 se o token for inválido", async () => {
      const req = createMockRequest("invalid-token");
      const res = await GET(req);
      const json = await res.json();

      expect(res.status).toBe(401);
      expect(json).toEqual({ error: "Unauthorized User" });
    });

    it("deve retornar 200 se o token for válido", async () => {
      const req = createMockRequest("test-secret");
      const res = await GET(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json).toEqual({ data: "Everything ok." });
    });
  });

  describe("POST /api/v1/admin-user", () => {
    it("deve retornar 401 se o token estiver ausente", async () => {
      const req = createMockRequest(null);
      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(401);
      expect(json).toEqual({ error: "Unauthorized User" });
    });

    it("deve retornar 400 se não for enviado body", async () => {
      const req = createMockRequest("test-secret", null);
      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json).toEqual({
        error: "Bad Request, the body doesn't follow the user schema",
      });
    });

    it("deve retornar 500 se a senha não for criptografada", async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue(null);

      const req = createMockRequest("test-secret", { password: "123" });
      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(500);
      expect(json).toEqual({ data: "Couldn't hash the password" });
    });

    it("deve retornar 400 se o usuário não for criado", async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashed");
      (prisma.user.create as jest.Mock).mockResolvedValue(null);

      const req = createMockRequest("test-secret", {
        email: "test@test.com",
        password: "123",
      });

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json).toEqual({ data: "The user couldn't be created" });
    });

    it("deve criar usuário e retornar 201", async () => {
      const mockUser = {
        id: "1",
        email: "test@test.com",
        verified: true,
      };

      (bcrypt.hash as jest.Mock).mockResolvedValue("hashed");
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const req = createMockRequest("test-secret", {
        email: "test@test.com",
        password: "123",
      });

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(201);
      expect(json).toEqual({ data: mockUser });
    });
  });
});
