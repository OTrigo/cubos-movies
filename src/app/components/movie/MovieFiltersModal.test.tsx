import { render, screen, fireEvent } from "@testing-library/react";
import { MovieFiltersModal } from "./MovieFiltersModal";

describe("MovieFiltersModal", () => {
  const setup = () => {
    const setFilters = jest.fn();
    const onClose = jest.fn();
    const refetch = jest.fn();

    render(
      <MovieFiltersModal
        setFilters={setFilters}
        onClose={onClose}
        refetch={refetch}
      />
    );

    return { setFilters, onClose, refetch };
  };

  it("renders all input fields", () => {
    setup();

    expect(screen.getByLabelText("Gênero:")).toBeInTheDocument();
    expect(screen.getByLabelText("Idioma:")).toBeInTheDocument();
    expect(screen.getByLabelText("Nota mínima:")).toBeInTheDocument();
    expect(screen.getByLabelText("Status:")).toBeInTheDocument();
    expect(screen.getByLabelText("Lançado entre:")).toBeInTheDocument();
  });

  it("submits selected filters correctly", () => {
    const { setFilters, onClose, refetch } = setup();

    fireEvent.change(screen.getByLabelText("Gênero:"), {
      target: { value: "Ação" },
    });

    fireEvent.change(screen.getByLabelText("Idioma:"), {
      target: { value: "pt" },
    });

    fireEvent.change(screen.getByLabelText("Nota mínima:"), {
      target: { value: "7.5" },
    });

    fireEvent.change(screen.getByLabelText("Status:"), {
      target: { value: "released" },
    });

    const [fromInput, toInput] = screen.getAllByLabelText("Lançado entre:");
    fireEvent.change(fromInput, { target: { value: "2020-01-01" } });
    fireEvent.change(toInput, { target: { value: "2023-01-01" } });

    fireEvent.click(screen.getByRole("button", { name: /aplicar filtros/i }));

    expect(setFilters).toHaveBeenCalledWith({
      genre: "Ação",
      language: "pt",
      minRating: 7.5,
      status: "released",
      releaseFrom: "2020-01-01",
      releaseTo: "2023-01-01",
    });

    expect(onClose).toHaveBeenCalled();
    expect(refetch).toHaveBeenCalled();
  });

  it("ignores empty fields and still calls callbacks", () => {
    const { setFilters, onClose, refetch } = setup();

    fireEvent.click(screen.getByRole("button", { name: /aplicar filtros/i }));

    expect(setFilters).toHaveBeenCalledWith({});
    expect(onClose).toHaveBeenCalled();
    expect(refetch).toHaveBeenCalled();
  });

  it("accepts 0 as valid input in minRating", () => {
    const { setFilters } = setup();

    fireEvent.change(screen.getByLabelText("Nota mínima:"), {
      target: { value: "0" },
    });

    fireEvent.click(screen.getByRole("button", { name: /aplicar filtros/i }));

    expect(setFilters).toHaveBeenCalledWith({ minRating: 0 });
  });
});
