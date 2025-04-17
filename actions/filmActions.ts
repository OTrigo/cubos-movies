import { UUID } from "crypto";

type GetMovieProps = {
  pagination: number;
  filters: string[];
};

interface MovieProps {
  id: UUID;
  friendlyTitle: string;
  fullTitle: string;
  sinopsys: string;
  releaseDate: Date;
  durationTime: number;
  status: string;
  language: string;
  budget: number;
  revenue: number;
  profit: number;
  tags: string[];
  rating: number;
  trailer: string;
  image: string;
}

const getMovies = async ({ pagination, filters }: GetMovieProps) => {
  return [];
};

const getMovieBySearch = async ({ search }: { search: string }) => {
  return [];
};

const createMovie = async ({}: MovieProps) => {};
