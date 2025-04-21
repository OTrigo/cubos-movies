"use client";
import { useTheme } from "@/contexts/ThemeContext";

import Image from "next/image";
import MovieDetails from "@/app/components/movie/MovieDetails";
import MovieTrailer from "@/app/components/movie/MovieTrailer";
import { useEffect, useState } from "react";
import Drawer from "@/app/components/ui/Drawer";
import { useMovie } from "@/hooks/useMovie";
import { useParams } from "next/navigation";
import MovieForm from "@/app/components/movie/MovieForm";
import { handleMovieForm } from "@/utils/handleMovieForm";
import Background from "@/assets/background.png";
import MovieSkeleton from "@/app/components/ui/skeletons/MovieSkeleton";

export default function MovieDetailsPage() {
  const { movie }: { movie: string } = useParams();
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showDrawer ? "hidden" : "auto";
  }, [showDrawer]);

  const { theme } = useTheme();

  const { data, refetch, isLoading } = useMovie({ movieId: movie ?? "" });

  if (!data || "error" in data || isLoading) return <MovieSkeleton />;

  const movieData = {
    ...data,
    releaseDate: data.releaseDate!.toDateString(),
  };

  return (
    <>
      <Drawer
        title={"Editar Filme"}
        show={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
        <MovieForm
          onSubmit={async (e) => {
            await handleMovieForm(e, true, movie ?? "");
            await refetch();
          }}
          variant="edit"
        />
      </Drawer>
      <div
        className={`${theme}  flex justify-center items-center w-full bg-[var(--bg-theme-1)] flex-col px-2`}
      >
        <div
          className={`${theme}  absolute z-[1] top-[72px] w-full h-[564px]`}
          style={{
            background:
              "linear-gradient(180deg, var(--bg-theme-1) 0%, rgba(18, 17, 19, 0.46) 49.48%, var(--bg-theme-1) 100%)",
          }}
        />

        <Image
          className={`${theme}  absolute z-[0] h-full top-[72px] w-full max-h-[564px] object-cover opacity-40`}
          src={Background}
          alt="Cubos Movies Background"
          width={1440}
          height={564}
        />

        <MovieDetails setShowDrawer={setShowDrawer} {...movieData} />
        <MovieTrailer title="Trailer" trailer={data?.trailer ?? ""} />
      </div>
    </>
  );
}
