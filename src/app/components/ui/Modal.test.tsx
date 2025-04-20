import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Modal from "./Modal";
import { handleMovieForm } from "@/utils/handleMovieForm";

jest.mock("@/lib/icons", () => ({
  Close: jest.fn(() => <svg>close icon</svg>),
}));

jest.mock("../movie/MovieFiltersModal", () => ({
  MovieFiltersModal: jest.fn(() => <div>MovieFiltersModal</div>),
}));

jest.mock("../movie/MovieForm", () => ({
  MovieForm: jest.fn(() => <form>MovieForm</form>),
}));

jest.mock("@/utils/handleMovieForm", () => ({
  handleMovieForm: jest.fn(),
}));

describe("Modal", () => {
  let mockOnClose: jest.Mock;
  let mockRefetch: jest.Mock;
  let mockSetFilters: jest.Mock;

  beforeEach(() => {
    mockOnClose = jest.fn();
    mockRefetch = jest.fn();
    mockSetFilters = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render modal with filters variant", () => {
    render(
      <Modal
        show={true}
        variant="filter"
        title="Filter Movies"
        onClose={mockOnClose}
        setFilters={mockSetFilters}
        refetch={mockRefetch}
      />
    );

    expect(screen.getByText("Filter Movies")).toBeInTheDocument();
    expect(screen.getByText("MovieFiltersModal")).toBeInTheDocument();
  });

  it("should render modal with form variant", () => {
    render(
      <Modal
        show={true}
        variant="form"
        title="Add Movie"
        onClose={mockOnClose}
        setFilters={mockSetFilters}
        refetch={mockRefetch}
      />
    );

    expect(screen.getByText("Add Movie")).toBeInTheDocument();
    expect(screen.getByText("MovieForm")).toBeInTheDocument();
  });

  it("should close modal when overlay is clicked", () => {
    render(
      <Modal
        show={true}
        variant="form"
        title="Add Movie"
        onClose={mockOnClose}
        setFilters={mockSetFilters}
        refetch={mockRefetch}
      />
    );

    const overlay = screen.getByTestId("overlay");
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should close modal when close button is clicked", () => {
    render(
      <Modal
        show={true}
        variant="form"
        title="Add Movie"
        onClose={mockOnClose}
        setFilters={mockSetFilters}
        refetch={mockRefetch}
      />
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should add 'overflow-hidden' to body when modal is shown", () => {
    const { rerender } = render(
      <Modal
        show={true}
        variant="filter"
        title="Filter Movies"
        onClose={mockOnClose}
        setFilters={mockSetFilters}
        refetch={mockRefetch}
      />
    );

    expect(document.body.classList.contains("overflow-hidden")).toBe(true);

    rerender(
      <Modal
        show={false}
        variant="filter"
        title="Filter Movies"
        onClose={mockOnClose}
        setFilters={mockSetFilters}
        refetch={mockRefetch}
      />
    );

    expect(document.body.classList.contains("overflow-hidden")).toBe(false);
  });

  it("should call handleMovieForm, refetch, and close modal when form is submitted", async () => {
    render(
      <Modal
        show={true}
        variant="form"
        title="Add Movie"
        onClose={mockOnClose}
        setFilters={mockSetFilters}
        refetch={mockRefetch}
      />
    );

    const submitButton = screen.getByText("MovieForm");
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(handleMovieForm).toHaveBeenCalled();
      expect(mockRefetch).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
