import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  test("renders the header with correct class names", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass(
      "relative flex w-full md:h-[72px] justify-between items-center bg-[#12111380] px-4 z-30"
    );
  });
});
