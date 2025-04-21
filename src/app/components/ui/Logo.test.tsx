import React from "react";
import { render, screen } from "@testing-library/react";
import Logo from "./Logo";

describe("Logo component", () => {
  it("should render the SVG correctly", () => {
    render(<Logo />);

    const svgElement = screen.getByTestId("logo-svg");
    expect(svgElement).toBeInTheDocument();

    const pathElements = screen.getAllByRole("img");
    expect(pathElements[0]).toHaveAttribute("fill", "var(--bg-theme-12)");
  });

  it("should match the snapshot", () => {
    const { asFragment } = render(<Logo />);
    expect(asFragment()).toMatchSnapshot();
  });
});
