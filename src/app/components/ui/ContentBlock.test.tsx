import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContentBlock from "./ContentBlock";

describe("ContentBlock", () => {
  test("renderiza o componente com título e descrição fornecidos", () => {
    render(
      <ContentBlock title="Meu Título" description="Minha descrição de teste" />
    );

    expect(screen.getByText("Meu Título")).toBeInTheDocument();
    expect(screen.getByText("Minha descrição de teste")).toBeInTheDocument();
  });

  test("aplica classes CSS padrão ao contêiner", () => {
    const { container } = render(
      <ContentBlock title="Título de Teste" description="Descrição de teste" />
    );

    const divElement = container.firstChild;
    expect(divElement).toHaveClass("flex");
    expect(divElement).toHaveClass("flex-col");
    expect(divElement).toHaveClass("bg-[var(--bg-theme-3-opacity)]");
  });

  test("aplica classes CSS adicionais quando fornecidas", () => {
    const { container } = render(
      <ContentBlock
        title="Título"
        description="Descrição"
        className="p-4 rounded-md"
      />
    );

    const divElement = container.firstChild;
    expect(divElement).toHaveClass("flex");
    expect(divElement).toHaveClass("flex-col");
    expect(divElement).toHaveClass("bg-[var(--bg-theme-3-opacity)]");
    expect(divElement).toHaveClass("p-4");
    expect(divElement).toHaveClass("rounded-md");
  });

  test("aplica classes CSS corretas ao elemento de descrição", () => {
    render(<ContentBlock title="Título" description="Descrição de teste" />);

    const descriptionElement = screen.getByText("Descrição de teste");
    expect(descriptionElement).toHaveClass("font-montserrat");
    expect(descriptionElement).toHaveClass("font-normal");
    expect(descriptionElement).toHaveClass("text-base");
    expect(descriptionElement).toHaveClass("leading-none");
    expect(descriptionElement).toHaveClass("tracking-normal");
  });

  test("renderiza título padrão quando title é null", () => {
    render(<ContentBlock title={undefined} description="Descrição de teste" />);

    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  test("renderiza descrição padrão quando description é null", () => {
    render(<ContentBlock title="Título de Teste" description={undefined} />);

    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  test("aceita um id como prop opcional", () => {
    const { container } = render(
      <ContentBlock
        title="Título"
        description="Descrição"
        id="block-test-123"
      />
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  test("renderiza corretamente quando title e description são strings vazias", () => {
    render(<ContentBlock title="" description="" />);

    const paragraphs = screen.getAllByText("");
    expect(paragraphs).toHaveLength(2);
  });
});
