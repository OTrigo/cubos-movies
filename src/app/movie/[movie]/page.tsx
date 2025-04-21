"use client";

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
import SkeletonBlock from "@/app/components/ui/SkeletonBlock";

export default function MovieDetailsPage() {
  const { movie }: { movie: string } = useParams();
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showDrawer ? "hidden" : "auto";
  }, [showDrawer]);

  const { data, refetch, isLoading } = useMovie({ movieId: movie ?? "" });

  if (!data || "error" in data || isLoading)
    return (
      <div className="flex justify-center items-center w-full bg-[var(--bg-theme-1)] flex-col px-2 animate-pulse">
        <div className="absolute z-[10] top-[72px] w-full h-[564px] bg-gradient-to-b from-[#121113] via-[#1c1b1e77] to-[#121113]">
          <SkeletonBlock width="w-full" height="h-full" />
        </div>
        <div className="absolute z-[0] top-[72px] w-full max-h-[564px] bg-gray-800 opacity-30" />

        <div className="mt-[600px] w-full max-w-4xl px-4 space-y-6">
          <SkeletonBlock width="w-1/2" height="h-10" />
          <SkeletonBlock width="w-3/4" height="h-6" />
          <SkeletonBlock />
          <SkeletonBlock />
          <SkeletonBlock width="w-5/6" />
          <SkeletonBlock width="w-1/4" height="h-10" className="mt-4" />
        </div>

        <div className="mt-10 w-full max-w-4xl px-4 space-y-4">
          <SkeletonBlock width="w-1/3" height="h-6" />
          <SkeletonBlock height="h-48" />
        </div>
      </div>
    );

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
      <div className="flex justify-center items-center w-full bg-[var(--bg-theme-1)] flex-col px-2">
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

        <MovieDetails setShowDrawer={setShowDrawer} {...movieData} />
        <MovieTrailer title="Trailer" trailer={data?.trailer ?? ""} />
      </div>
    </>
  );
}
