import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieTrailer from "./MovieTrailer";

describe("MovieTrailer", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renderiza o título do filme corretamente", () => {
    render(<MovieTrailer title="Inception" />);
    
    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  test("renderiza um iframe quando o trailer contém 'youtube'", () => {
    const youtubeUrl = "https://www.youtube.com/embed/8hP9D6kZseM";
    render(<MovieTrailer trailer={youtubeUrl} title="Inception" />);
    
    const iframe = screen.getByTitle("");
    expect(iframe).toBeInTheDocument();
    expect(iframe.tagName).toBe("IFRAME");
    expect(iframe).toHaveAttribute("src", youtubeUrl);
    expect(iframe).toHaveAttribute("width", "100%");
    expect(iframe).toHaveAttribute("height", "556");
  });

  test("renderiza mensagem de erro quando o trailer não contém 'youtube'", () => {
    const nonYoutubeUrl = "https://vimeo.com/123456789";
    render(<MovieTrailer trailer={nonYoutubeUrl} title="Inception" />);
    
    expect(screen.getByText("Não foi possível carregar o trailer.")).toBeInTheDocument();
    expect(screen.queryByRole("iframe")).not.toBeInTheDocument();
  });

  test("renderiza mensagem de erro quando o trailer é undefined", () => {
    render(<MovieTrailer title="Inception" />);
    
    expect(screen.getByText("Não foi possível carregar o trailer.")).toBeInTheDocument();
    expect(screen.queryByRole("iframe")).not.toBeInTheDocument();
  });

  test("renderiza o componente com todas as classes CSS esperadas", () => {
    const { container } = render(<MovieTrailer title="Inception" />);
    
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass("relative");
    expect(mainDiv).toHaveClass("flex");
    expect(mainDiv).toHaveClass("flex-col");
    expect(mainDiv).toHaveClass("w-full");
    expect(mainDiv).toHaveClass("bg-[#121113]");
    expect(mainDiv).toHaveClass("rounded-xl");
    expect(mainDiv).toHaveClass("shadow-xl");
    expect(mainDiv).toHaveClass("overflow-hidden");
  });

  test("renderiza o título com as classes de estilo corretas", () => {
    render(<MovieTrailer title="Inception" />);
    
    const titleElement = screen.getByText("Inception");
    expect(titleElement).toHaveClass("text-3xl");
    expect(titleElement).toHaveClass("font-bold");
  });
  
  test("renderiza mensagem de erro com estilos corretos quando não há trailer válido", () => {
    render(<MovieTrailer title="Inception" />);
    
    const errorContainer = screen.getByText("Não foi possível carregar o trailer.").parentElement;
    expect(errorContainer).toHaveClass("flex");
    expect(errorContainer).toHaveClass("justify-center");
    expect(errorContainer).toHaveClass("items-center");
    
    const errorMessage = screen.getByText("Não foi possível carregar o trailer.");
    expect(errorMessage).toHaveClass("text-lg");
    expect(errorMessage).toHaveClass("text-white");
  });
});