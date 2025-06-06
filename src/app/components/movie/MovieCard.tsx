import { Movie } from "@prisma/client";
import Image from "next/image";

import Placeholder from "@/assets/plcaceholder.png";

const MovieCard = ({ movie }: { movie: Movie; key: number }) => {
  const imagePath = movie?.image ?? Placeholder;

  return (
    <a
      href={`/movie/${movie?.id ?? 0}`}
      className="flex w-full justify-center items-center"
    >
      <div className="relative w-[183px] h-[281px] md:w-[235px] md:h-[355px] flex justify-center">
        <Image
          src={imagePath}
          className="bg-gray-600 object-cover w-full h-full"
          alt={movie?.fullTitle ?? "Cubos Movies"}
          width={183}
          height={281}
        />
        <div
          className="flex flex-col justify-end absolute bottom-0 p-4 h-[50%] w-full"
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 50%, #000000 100%)`,
          }}
        >
          <div className="text-white text-wrap text-[16px] uppercase">
            {movie?.fullTitle ?? "No data"}
          </div>
          <div className="text-wrap text-[#B4B4B4] text-[12.8px] font-normal truncate">
            {movie?.tags ?? "No Categories"}
          </div>
        </div>
      </div>
    </a>
  );
};

export default MovieCard;
