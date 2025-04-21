import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./Footer";

describe("Footer", () => {
  test("renderiza o componente Footer", () => {
    render(<Footer />);

    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });

  test("exibe o texto de copyright correto", () => {
    render(<Footer />);

    expect(
      screen.getByText("2025 © Todos os direitos reservados a Cubos Movies")
    ).toBeInTheDocument();
  });

  test("aplica as classes CSS corretas ao elemento footer", () => {
    const { container } = render(<Footer />);

    const footer = container.firstChild;
    expect(footer).toHaveClass("flex");
    expect(footer).toHaveClass("justify-center");
    expect(footer).toHaveClass("items-center");
    expect(footer).toHaveClass("h-[68px]");
    expect(footer).toHaveClass("w-full");
    expect(footer).toHaveClass("p-6");
    expect(footer).toHaveClass("bg-[var(--bg-theme-1)]");
    expect(footer).toHaveClass("border-t");
    expect(footer).toHaveClass("border-[#F1E6FD19]");
  });

  test("aplica a classe de cor de texto correta ao texto de copyright", () => {
    render(<Footer />);

    const textElement = screen.getByText(
      "2025 © Todos os direitos reservados a Cubos Movies"
    );
    expect(textElement).toHaveClass("text-[#B5B2BC]");
  });

  test("o texto de copyright está dentro de um elemento span", () => {
    render(<Footer />);

    const textElement = screen.getByText(
      "2025 © Todos os direitos reservados a Cubos Movies"
    );
    expect(textElement.tagName).toBe("SPAN");
  });

  test("o footer tem a altura esperada", () => {
    const { container } = render(<Footer />);

    const footer = container.firstChild;
    expect(footer).toHaveClass("h-[68px]");
  });

  test("o footer ocupa a largura total", () => {
    const { container } = render(<Footer />);

    const footer = container.firstChild;
    expect(footer).toHaveClass("w-full");
  });
});
