import { render, screen } from "@testing-library/react";
import Tags from "./Tags";

describe("Tags component", () => {
  it("deve renderizar o título 'Generos'", () => {
    render(<Tags tags="ação,aventura,comédia" />);
    expect(screen.getByText("Generos")).toBeInTheDocument();
  });

  it("deve renderizar cada tag como um span separado", () => {
    const tags = "ação,aventura,comédia";
    render(<Tags tags={tags} />);

    const tagList = tags.split(",");
    tagList.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });

    const spans = screen.getAllByText(/ação|aventura|comédia/);
    expect(spans.length).toBe(tagList.length);
  });

  it("deve não quebrar com string vazia", () => {
    render(<Tags tags="" />);
    expect(screen.getByText("Generos")).toBeInTheDocument();
  });

  it("deve lidar com undefined ou null", () => {
    render(<Tags tags={undefined} />);
    expect(screen.getByText("Generos")).toBeInTheDocument();
  });
});
