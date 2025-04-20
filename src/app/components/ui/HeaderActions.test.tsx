import { render, screen } from "@testing-library/react";
import HeaderActions from "./HeaderActions";

describe("HeaderActions", () => {
  test("renders ThemeSwitcher and LogoutButton components", () => {
    render(<HeaderActions />);

    expect(screen.getByText(/ThemeSwitcher Component/i)).toBeInTheDocument();
    expect(screen.getByText(/LogoutButton Component/i)).toBeInTheDocument();
  });

  test("renders the container div with correct class names", () => {
    render(<HeaderActions />);

    const headerActions = screen.getByRole("contentinfo");
    expect(headerActions).toHaveClass("flex gap-2");
  });
});
