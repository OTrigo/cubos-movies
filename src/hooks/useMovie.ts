import {
  EditFilterProps,
  getMovieById,
  getMovieBySearch,
  getMovies,
} from "@actions/movie/movieActions";
import { useQuery } from "@tanstack/react-query";

const useMovieSearch = ({
  search = undefined,
  filters = {},
  pagination = 0,
}: {
  search?: string;
  filters?: EditFilterProps;
  pagination?: number;
}) => {
  return useQuery({
    queryKey: ["movie"],
    queryFn: async () => {
      const movie = search
        ? await getMovieBySearch({ search, filters, pagination })
        : await getMovies({ filters, pagination });
      if (!movie) throw new Error("Usuário não autenticado");
      return movie;
    },
  });
};

const useMovie = ({ movieId }: { movieId?: string }) => {
  return useQuery({
    queryKey: ["movie"],
    queryFn: async () => {
      if (!movieId) return;
      const movie = await getMovieById(movieId);
      if (!movie) throw new Error("Usuário não autenticado");
      return movie;
    },
    refetchOnMount: true,
    retry: 1,
    refetchOnWindowFocus: true,
  });
};

export { useMovieSearch, useMovie };
