import { render, screen, fireEvent } from "@testing-library/react";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "@/contexts/ThemeContext";

jest.mock("@/contexts/ThemeContext", () => ({
  useTheme: jest.fn(),
}));

jest.mock("@/lib/icons", () => ({
  Sun: () => <span>sun icon</span>,
  Moon: () => <span>moon icon</span>,
}));

describe("ThemeSwitcher", () => {
  let mockToggle: jest.Mock;

  beforeEach(() => {
    mockToggle = jest.fn();
  });

  it("renders Sun icon when theme is light", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      toggleTheme: mockToggle,
    });
    render(<ThemeSwitcher />);
    expect(screen.getByText("sun icon")).toBeInTheDocument();
  });

  it("renders Moon icon when theme is dark", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "dark",
      toggleTheme: mockToggle,
    });
    render(<ThemeSwitcher />);
    expect(screen.getByText("moon icon")).toBeInTheDocument();
  });

  it("calls toggleTheme when clicked", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      toggleTheme: mockToggle,
    });
    render(<ThemeSwitcher />);
    fireEvent.click(screen.getByText("sun icon").parentElement!);
    expect(mockToggle).toHaveBeenCalled();
  });

  it("has the correct class names", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      toggleTheme: mockToggle,
    });
    const { container } = render(<ThemeSwitcher />);
    expect(container.firstChild).toHaveClass(
      "h-[44px]",
      "rounded-[2px]",
      "gap-3",
      "pt-3",
      "pr-5",
      "pb-3",
      "pl-5",
      "bg-[#B744F708]"
    );
  });
});
