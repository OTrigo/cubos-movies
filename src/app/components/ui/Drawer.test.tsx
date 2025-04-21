import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Drawer from "./Drawer";

jest.mock("@/lib/icons", () => ({
  Close: () => <div data-testid="close-icon">X</div>,
}));

describe("Drawer", () => {
  const mockOnClose = jest.fn();
  const childrenContent = "Conteúdo do drawer";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("não renderiza nada quando show é false", () => {
    const { container } = render(
      <Drawer onClose={mockOnClose} show={false}>
        {childrenContent}
      </Drawer>
    );

    expect(container.firstChild).toBeNull();
  });

  test("renderiza o conteúdo quando show é true", () => {
    render(
      <Drawer onClose={mockOnClose} show={true}>
        {childrenContent}
      </Drawer>
    );

    expect(screen.getByText(childrenContent)).toBeInTheDocument();
  });

  test("renderiza o título fornecido", () => {
    const title = "Meu Drawer";
    render(
      <Drawer onClose={mockOnClose} show={true} title={title}>
        {childrenContent}
      </Drawer>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test("renderiza o título padrão quando title é undefined", () => {
    render(
      <Drawer onClose={mockOnClose} show={true} title={undefined}>
        {childrenContent}
      </Drawer>
    );

    expect(screen.getByText("Teste")).toBeInTheDocument();
  });

  test("chama onClose quando clica no botão de fechar", () => {
    render(
      <Drawer onClose={mockOnClose} show={true}>
        {childrenContent}
      </Drawer>
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("chama onClose quando clica no backdrop", () => {
    render(
      <Drawer onClose={mockOnClose} show={true}>
        {childrenContent}
      </Drawer>
    );

    const backdrop =
      screen.getByText(childrenContent)?.parentElement?.parentElement
        ?.parentElement;
    if (backdrop) fireEvent.click(backdrop);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("não chama onClose quando clica no conteúdo do drawer", () => {
    render(
      <Drawer onClose={mockOnClose} show={true}>
        {childrenContent}
      </Drawer>
    );

    const contentDiv =
      screen?.getByText(childrenContent)?.parentElement?.parentElement;
    if (contentDiv) fireEvent.click(contentDiv);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test("renderiza o componente Close", () => {
    render(
      <Drawer onClose={mockOnClose} show={true}>
        {childrenContent}
      </Drawer>
    );

    expect(screen.getByTestId("close-icon")).toBeInTheDocument();
  });

  test("aplica as classes CSS corretas ao contêiner principal", () => {
    render(
      <Drawer onClose={mockOnClose} show={true}>
        {childrenContent}
      </Drawer>
    );

    const mainContainer =
      screen?.getByText(childrenContent)?.parentElement?.parentElement
        ?.parentElement;
    expect(mainContainer).toHaveClass("flex");
    expect(mainContainer).toHaveClass("justify-end");
    expect(mainContainer).toHaveClass("w-screen");
    expect(mainContainer).toHaveClass("backdrop-blur-[8px]");
    expect(mainContainer).toHaveClass("z-30");
    expect(mainContainer).toHaveClass("fixed");
  });

  test("aplica as classes CSS corretas ao contêiner do conteúdo", () => {
    render(
      <Drawer onClose={mockOnClose} show={true}>
        {childrenContent}
      </Drawer>
    );

    const contentContainer =
      screen?.getByText(childrenContent)?.parentElement?.parentElement;
    expect(contentContainer).toHaveClass("relative");
    expect(contentContainer).toHaveClass("w-full");
    expect(contentContainer).toHaveClass("bg-[var(--bg-theme-3-opacity)]");
    expect(contentContainer).toHaveClass("z-50");
  });

  test("aplica as classes CSS corretas à área de conteúdo", () => {
    render(
      <Drawer onClose={mockOnClose} show={true}>
        {childrenContent}
      </Drawer>
    );

    const contentArea = screen.getByText(childrenContent).parentElement;
    expect(contentArea).toHaveClass("flex");
    expect(contentArea).toHaveClass("h-[calc(100%-68px)]");
    expect(contentArea).toHaveClass("flex-col");
    expect(contentArea).toHaveClass("overflow-y-scroll");
  });
});
