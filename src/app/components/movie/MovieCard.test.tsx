import { render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";
import { Movie } from "@prisma/client";

const mockMovie: Partial<Movie> = {
  id: "1dafda-214413dafad-1efdafadf",
  image: "https://example.com/poster.jpg",
  fullTitle: "The Matrix",
  tags: "action,sci-fi",
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("MovieCard component", () => {
  it("renders with full movie data", () => {
    render(<MovieCard movie={mockMovie as Movie} key={1} />);

    expect(screen.getByAltText("The Matrix")).toBeInTheDocument();
    expect(screen.getByText("The Matrix")).toBeInTheDocument();
    expect(screen.getByText("action,sci-fi")).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movie/1");
  });

  it("uses placeholder and fallback title when data is missing", () => {
    const partialMovie = {
      ...mockMovie,
      image: null,
      fullTitle: null ?? "No data",
      tags: null ?? "No Categories",
    };

    render(<MovieCard movie={partialMovie as Movie} key={1} />);

    expect(screen.getByAltText("Cubos Movies")).toBeInTheDocument();
    expect(screen.getByText("No data")).toBeInTheDocument();
    expect(screen.getByText("No Categories")).toBeInTheDocument();
  });
});
