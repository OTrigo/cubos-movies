import { DELETE } from "./route";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

const mockParams = { id: "user-id-123" };

const createMockRequest = (auth: string | null) =>
  new NextRequest("http://localhost/api/delete", {
    headers: auth ? { Authorization: auth } : {},
  });

describe("DELETE /api/user", () => {
  const envBackup = process.env;

  beforeAll(() => {
    process.env.JWT_SECRET = "secret-key";
  });

  afterAll(() => {
    process.env = envBackup;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar 401 se não tiver token de autorização", async () => {
    const req = createMockRequest(null);
    const res = await DELETE(req, { params: Promise.resolve(mockParams) });
    const json = await res?.json();

    expect(res?.status).toBe(401);
    expect(json).toEqual({ error: "Unauthorized User" });
  });

  it("deve retornar 401 se o token for inválido", async () => {
    const req = createMockRequest("wrong-token");
    const res = await DELETE(req, { params: Promise.resolve(mockParams) });
    const json = await res?.json();

    expect(res?.status).toBe(401);
    expect(json).toEqual({ error: "Unauthorized User" });
  });

  it("deve retornar 400 se o usuário não for encontrado", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const req = createMockRequest("secret-key");
    const res = await DELETE(req, { params: Promise.resolve(mockParams) });
    const json = await res?.json();

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: mockParams.id },
    });
    expect(res?.status).toBe(400);
    expect(json).toEqual({ error: "This user doesn't exist" });
  });

  it("deve retornar 500 se deletar o usuário falhar", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: mockParams.id,
    });
    (prisma.user.delete as jest.Mock).mockResolvedValue(null);

    const req = createMockRequest("secret-key");
    const res = await DELETE(req, { params: Promise.resolve(mockParams) });
    const json = await res?.json();

    expect(res?.status).toBe(500);
    expect(json).toEqual({ error: "Couldn't delete this user" });
  });

  it("deve deletar o usuário com sucesso e retornar 200", async () => {
    const mockUser = { id: mockParams.id, email: "test@example.com" };
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (prisma.user.delete as jest.Mock).mockResolvedValue(mockUser);

    const req = createMockRequest("secret-key");
    const res = await DELETE(req, { params: Promise.resolve(mockParams) });
    const json = await res?.json();

    expect(res?.status).toBe(200);
    expect(json).toEqual({ data: mockUser });
  });
});
