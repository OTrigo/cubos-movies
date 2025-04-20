import { render, screen, fireEvent } from "@testing-library/react";
import MovieDetails from "./MovieDetails";
import { useRouter } from "next/navigation";
import { useMovie } from "@/hooks/useMovie";
import { deleteMovie } from "@actions/movie/movieActions";
import Image from "next/image";
import { ImgProps } from "next/dist/shared/lib/get-img-props";

jest.mock("@/hooks/useMovie", () => ({
  useMovie: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@actions/movie/movieActions", () => ({
  deleteMovie: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImgProps) => <Image {...props} alt={props.alt || "image"} />,
}));

describe("MovieDetails Component", () => {
  const mockRouterReplace = jest.fn();
  const mockSetShowDrawer = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace: mockRouterReplace });
    (useMovie as jest.Mock).mockReturnValue({
      data: true,
      isLoading: false,
      error: false,
    });
  });

  const defaultProps = {
    id: 1,
    rating: 9.1,
    votes: 10000,
    releaseDate: "1999-03-31",
    durationTime: "2h 16min",
    language: "English",
    budget: "$63M",
    revenue: "$466M",
    profit: "$403M",
    friendlyTitle: "Matrix",
    fullTitle: "The Matrix",
    image: "/matrix.jpg",
    banner: "/banner.jpg",
    phrase: "Welcome to the real world.",
    status: "Released",
    tags: "action,sci-fi",
    sinopsys: "A computer hacker learns about the true nature of reality.",
    setShowDrawer: mockSetShowDrawer,
  };

  it("renders movie details correctly", () => {
    render(<MovieDetails {...defaultProps} />);
    expect(screen.getByText("Matrix")).toBeInTheDocument();
    expect(screen.getByText("Título original: The Matrix")).toBeInTheDocument();
    expect(screen.getByText("Sinopse")).toBeInTheDocument();
    expect(screen.getByText("action,sci-fi")).toBeInTheDocument();
    expect(screen.getByText("Deletar")).toBeInTheDocument();
    expect(screen.getByText("Editar")).toBeInTheDocument();
  });

  it("calls setShowDrawer when Editar is clicked", () => {
    render(<MovieDetails {...defaultProps} />);
    fireEvent.click(screen.getByText("Editar"));
    expect(mockSetShowDrawer).toHaveBeenCalledWith(true);
  });

  it("calls deleteMovie and redirects when Deletar is clicked", () => {
    render(<MovieDetails {...defaultProps} />);
    fireEvent.click(screen.getByText("Deletar"));
    expect(deleteMovie).toHaveBeenCalledWith({ movieId: 1 });
    expect(mockRouterReplace).toHaveBeenCalledWith("/");
  });

  it("redirects when data is null and error is true", () => {
    (useMovie as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    render(<MovieDetails {...defaultProps} />);
    expect(mockRouterReplace).toHaveBeenCalledWith("/");
  });
});
