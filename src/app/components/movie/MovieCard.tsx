import { Movie } from "@prisma/client";
import Image from "next/image";

const MovieCard = ({ movie }: { movie: Movie; key: number }) => {
  return (
    <a
      href={`/movie/${movie?.id ?? 0}`}
      className="flex w-full justify-center items-center"
    >
      <div className="relative w-[183px] h-[281px] md:w-[235px] md:h-[355px] flex justify-center">
        <Image
          src={movie?.image ?? '/assets/placeholder.png'}
          className="bg-red-300 object-cover w-full h-full"
          alt={movie?.fullTitle ?? "Cubos Movies"}
        />
        <div
          className="flex flex-col justify-end absolute bottom-0 p-4 h-[50%] w-full"
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 50%, #000000 100%)`,
          }}
        >
          <div className="text-white text-[16px] uppercase">
            {movie?.fullTitle ?? "No data"}
          </div>
          <div className="text-[#B4B4B4] text-[12.8px] font-normal">
            {movie?.tags ?? "No Categories"}
          </div>
        </div>
      </div>
    </a>
  );
};

export default MovieCard;
