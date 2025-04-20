import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import LogoutButton from "./LogoutButton";
import { logout } from "@/lib/auth";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("@/hooks/useUser", () => ({
  useUser: jest.fn(),
}));

jest.mock("@/lib/auth", () => ({
  logout: jest.fn(),
}));

describe("LogoutButton", () => {
  let mockReplace: jest.Mock;
  let mockRefetch: jest.Mock;

  beforeEach(() => {
    mockReplace = jest.fn();
    mockRefetch = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    (useUser as jest.Mock).mockReturnValue({ refetch: mockRefetch });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render 'Cadastre-se' when on sign-in or sign-up page", () => {
    (usePathname as jest.Mock).mockReturnValue("/signIn");
    render(<LogoutButton />);
    expect(screen.getByText("Cadastre-se")).toBeInTheDocument();
  });

  it("should call signUp when clicking 'Cadastre-se' on sign-in or sign-up page", async () => {
    (usePathname as jest.Mock).mockReturnValue("/signIn");
    render(<LogoutButton />);
    
    const button = screen.getByText("Cadastre-se");
    fireEvent.click(button);

    expect(mockReplace).toHaveBeenCalledWith("/signUp");
  });

  it("should render 'Logout' when not on sign-in or sign-up page", () => {
    (usePathname as jest.Mock).mockReturnValue("/home");
    render(<LogoutButton />);
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("should call handleLogout when clicking 'Logout'", async () => {
    (usePathname as jest.Mock).mockReturnValue("/home");
    render(<LogoutButton />);
    
    const button = screen.getByText("Logout");
    fireEvent.click(button);

    await waitFor(() => {
      expect(logout).toHaveBeenCalled();
      expect(mockRefetch).toHaveBeenCalled();
      expect(mockReplace).toHaveBeenCalledWith("/signIn");
    });
  });
});
