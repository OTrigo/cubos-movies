import MovieCard from "./MovieCard";

type Movie = any;

const MovieGrid = ({ movies }: { movies: Movie[] }) => {
  console.log(movies);
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-y-4 md:gap-6 h-full p-6 bg-[#EBEAF814] z-10 w-fit">
      {movies.map((movie, id) => (
        <MovieCard movie={movie} key={id} />
      ))}
    </div>
  );
};

export default MovieGrid;
