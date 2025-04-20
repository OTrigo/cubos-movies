import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieSearch from "./MovieSearch";

describe("MovieSearch", () => {
  const mockSetShowModal = jest.fn();
  const mockSetSearch = jest.fn();
  const mockRefetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza o componente corretamente", () => {
    render(
      <MovieSearch
        setShowModal={mockSetShowModal}
        setSearch={mockSetSearch}
        pagination={1}
        refetch={mockRefetch}
      />
    );

    expect(
      screen.getByPlaceholderText("Pesquise por filmes")
    ).toBeInTheDocument();
    expect(screen.getByText("Filtros")).toBeInTheDocument();
    expect(screen.getByText("Adicionar Filme")).toBeInTheDocument();
  });

  test("campo de pesquisa chama setSearch quando alterado", () => {
    render(
      <MovieSearch
        setShowModal={mockSetShowModal}
        setSearch={mockSetSearch}
        pagination={1}
        refetch={mockRefetch}
      />
    );

    const searchInput = screen.getByPlaceholderText("Pesquise por filmes");
    fireEvent.change(searchInput, { target: { value: "Matrix" } });

    expect(mockSetSearch).toHaveBeenCalledWith("Matrix");
  });

  test("ícone de pesquisa chama setSearch e refetch quando clicado", () => {
    render(
      <MovieSearch
        setShowModal={mockSetShowModal}
        setSearch={mockSetSearch}
        pagination={1}
        refetch={mockRefetch}
      />
    );

    const searchInput = screen.getByPlaceholderText("Pesquise por filmes");
    fireEvent.change(searchInput, { target: { value: "Inception" } });

    const searchIcon = screen.getByRole("img", { hidden: true });
    fireEvent.click(searchIcon);

    expect(mockSetSearch).toHaveBeenCalledTimes(2);
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  test("botão 'Filtros' abre modal de filtros quando clicado", () => {
    render(
      <MovieSearch
        setShowModal={mockSetShowModal}
        setSearch={mockSetSearch}
        pagination={1}
        refetch={mockRefetch}
      />
    );

    const filtersButton = screen.getByText("Filtros");
    fireEvent.click(filtersButton);

    expect(mockSetShowModal).toHaveBeenCalledWith({
      show: true,
      variant: "filter",
    });
  });

  test("botão 'Adicionar Filme' abre modal de adição quando clicado", () => {
    render(
      <MovieSearch
        setShowModal={mockSetShowModal}
        setSearch={mockSetSearch}
        pagination={1}
        refetch={mockRefetch}
      />
    );

    const addButton = screen.getByText("Adicionar Filme");
    fireEvent.click(addButton);

    expect(mockSetShowModal).toHaveBeenCalledWith({
      show: true,
      variant: "add",
    });
  });

  test("o ícone de pesquisa deve obter o valor atual do input e chamar refetch", () => {
    const { container } = render(
      <MovieSearch
        setShowModal={mockSetShowModal}
        setSearch={mockSetSearch}
        pagination={1}
        refetch={mockRefetch}
      />
    );

    const searchInput = screen.getByPlaceholderText("Pesquise por filmes");

    fireEvent.change(searchInput, { target: { value: "Star Wars" } });

    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();

    if (svgElement) fireEvent.click(svgElement);

    expect(mockSetSearch).toHaveBeenCalledWith("Star Wars");
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  test("o input deve ser estilizado corretamente", () => {
    render(
      <MovieSearch
        setShowModal={mockSetShowModal}
        setSearch={mockSetSearch}
        pagination={1}
        refetch={mockRefetch}
      />
    );

    const searchInput = screen.getByPlaceholderText("Pesquise por filmes");

    expect(searchInput).toHaveClass("w-full");
    expect(searchInput).toHaveClass("!min-h-[44px]");
    expect(searchInput).toHaveClass("border-[#49474E]");
    expect(searchInput).toHaveClass("bg-[#1A191B]");
  });

  test("o componente deve usar o hook useRef corretamente", () => {
    render(
      <MovieSearch
        setShowModal={mockSetShowModal}
        setSearch={mockSetSearch}
        pagination={1}
        refetch={mockRefetch}
      />
    );

    const searchInput = screen.getByPlaceholderText("Pesquise por filmes");

    fireEvent.change(searchInput, { target: { value: "The Godfather" } });

    const svgElement = document.querySelector("svg");
    if (svgElement) fireEvent.click(svgElement);

    expect(mockSetSearch).toHaveBeenCalledWith("The Godfather");
  });
});
