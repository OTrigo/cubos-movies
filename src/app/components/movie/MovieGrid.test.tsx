import { render, screen } from "@testing-library/react";
import MovieGrid from "./MovieGrid";
import { Movie } from "@prisma/client";

const mockMovies: Partial<Movie>[] = [
  {
    id: "1",
    friendlyTitle: "Movie 1",
    fullTitle: "Full Title 1",
    sinopsys: "Sinopsys 1",
    releaseDate: new Date(),
    durationTime: 120,
    status: "released",
    language: "pt",
    budget: 100000,
    revenue: 200000,
    profit: 100000,
    tags: "ação,aventura",
    rating: 8.5,
    trailer: "https://youtube.com/trailer1",
    votes: "4",
    image: "movie1.jpg",
    banner: "banner1.jpg",
    phrase: "Frase 1",
    createdAt: new Date() as Date,
    updatedAt: new Date() as Date,
  },
  {
    id: "2",
    friendlyTitle: "Movie 2",
    fullTitle: "Full Title 2",
    sinopsys: "Sinopsys 2",
    releaseDate: new Date(),
    durationTime: 90,
    status: "released",
    language: "en",
    budget: 50000,
    revenue: 100000,
    profit: 50000,
    tags: "comédia",
    rating: 7.3,
    trailer: "https://youtube.com/trailer2",
    votes: "50",
    image: "movie2.jpg",
    banner: "banner2.jpg",
    phrase: "Frase 2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

jest.mock("../MovieCard", () => ({
  __esModule: true,
  default: ({ movie }: { movie: Movie }) => (
    <div data-testid="movie-card">{movie.friendlyTitle}</div>
  ),
}));

describe("MovieGrid", () => {
  it("renders nothing when no movies are passed", () => {
    render(<MovieGrid />);

    expect(screen.queryByTestId("movie-card")).not.toBeInTheDocument();
  });

  it("shows empty message when movies array is empty", () => {
    render(<MovieGrid movies={[]} />);

    expect(screen.getByText("Nenhum filme encontrado")).toBeInTheDocument();
  });

  it("renders all MovieCard components for given movies", () => {
    render(<MovieGrid movies={mockMovies as Movie[]} />);

    const cards = screen.getAllByTestId("movie-card");
    expect(cards).toHaveLength(mockMovies.length);

    mockMovies.forEach((movie) => {
      expect(
        screen.getByText(movie?.friendlyTitle as string)
      ).toBeInTheDocument();
    });
  });
});
