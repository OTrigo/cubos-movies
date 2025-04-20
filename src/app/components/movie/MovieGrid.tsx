import { Movie } from "@prisma/client";
import MovieCard from "./MovieCard";

const MovieGrid = ({ movies }: { movies?: Movie[] }) => {
  return (
    <div className="grid md:min-w-1/2 w-full grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 h-full p-6 bg-[#EBEAF814] z-10 md:w-fit md:min-h-[600px]">
      {movies?.length === 0 && (
        <div className="flex col-span-2 md:col-span-5 justify-center items-center w-full h-full text-center">
          <p className="text-white text-2xl">Nenhum filme encontrado</p>
        </div>
      )}
      {movies?.map((movie, id) => <MovieCard movie={movie} key={id} />)}
    </div>
  );
};

export default MovieGrid;
