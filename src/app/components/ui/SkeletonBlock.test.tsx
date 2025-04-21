import { render } from "@testing-library/react";
import SkeletonBlock from "./SkeletonBlock";

describe("SkeletonBlock", () => {
  it("renders with default props", () => {
    const { getByTestId } = render(<SkeletonBlock />);
    const block = getByTestId("skeleton-block");

    expect(block).toHaveClass("w-full");
    expect(block).toHaveClass("h-4");
    expect(block).toHaveClass("rounded-md");
    expect(block).toHaveClass("bg-gray-700");
    expect(block).toHaveClass("animate-pulse");
  });

  it("applies custom width and height", () => {
    const { getByTestId } = render(
      <SkeletonBlock width="w-1/2" height="h-8" />
    );
    const block = getByTestId("skeleton-block");

    expect(block).toHaveClass("w-1/2");
    expect(block).toHaveClass("h-8");
  });

  it("does not apply rounded class when rounded is false", () => {
    const { getByTestId } = render(<SkeletonBlock rounded={false} />);
    const block = getByTestId("skeleton-block");

    expect(block).not.toHaveClass("rounded-md");
  });

  it("applies custom className", () => {
    const { getByTestId } = render(
      <SkeletonBlock className="custom-class another-class" />
    );
    const block = getByTestId("skeleton-block");

    expect(block).toHaveClass("custom-class");
    expect(block).toHaveClass("another-class");
  });
});
