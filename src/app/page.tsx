"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Background from "@public/assets/background.png";
import MovieGrid from "./components/movie/MovieGrid";
import MoviePagination from "./components/movie/MoviePagination";

const MoviesPage = () => {
  const { data: user, isLoading, error } = useUser();

  console.log(user, isLoading, error);

  const movies = [{}, {}, {}, {}, {}, {}] as any[];

  if (isLoading) return <p>...</p>;

  if (!user || error) return <>Redirect...</>;

  return (
    <div className="flex flex-col justify-center items-center w-full bg-[#121113]">
      <MovieSearch/>
      <div
        className="absolute z-[1] top-[72px] w-full h-[564px]"
        style={{
          background:
            "linear-gradient(180deg, #121113 0%, rgba(18, 17, 19, 0.46) 49.48%, #121113 100%)",
        }}
      />

      <Image
        className="absolute z-[0] h-full top-[72px] w-full max-h-[564px] object-cover opacity-40"
        src={Background}
        alt="Cubos Movies Background"
        width={1440}
        height={564}
      />

      <MovieGrid movies={movies} />
      <MoviePagination movies={movies} />
    </div>
  );
};

export default MoviesPage;
