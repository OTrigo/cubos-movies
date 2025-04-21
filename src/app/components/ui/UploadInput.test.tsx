import { render, screen } from "@testing-library/react";
import { UploadInput } from "./UploadInput";

describe("UploadInput", () => {
  it("renders the label text", () => {
    render(<UploadInput label="Upload Image" name="image" />);
    expect(screen.getByText("Upload Image")).toBeInTheDocument();
  });

  it("renders an input of type file with the correct name and accept attributes", () => {
    const { container } = render(<UploadInput label="Avatar" name="avatar" />);
    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.name).toBe("avatar");
    expect(input.accept).toBe("image/*");
  });

  it("applies the correct className to the input", () => {
    const { container } = render(<UploadInput label="Foto" name="foto" />);
    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    expect(input).toHaveClass(
      "mb-2",
      "block",
      "w-full",
      "text-[var(--text-default)]"
    );
  });

  it("does not crash when no files are selected", () => {
    render(<UploadInput label="Banner" name="banner" />);
    const input = screen?.getByLabelText("Banner", {
      selector: "input",
    }) as HTMLInputElement;
    if (input?.files) expect(input.files).toHaveLength(0);
  });
});
