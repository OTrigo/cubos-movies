"use client";

import Image from "next/image";
import Background from "@public/assets/background.png";
import MovieDetails from "@/app/components/movie/MovieDetails";
import MovieTrailer from "@/app/components/movie/MovieTrailer";
import { useState } from "react";
import Drawer from "@/app/components/ui/Drawer";
import { useMovie } from "@/hooks/useMovie";
import { useParams } from "next/navigation";
import MovieForm from "@/app/components/movie/MovieForm";
import { handleMovieForm } from "@/utils/handleMovieForm";

export default function MovieDetailsPage() {
  const { movie }: { movie: string } = useParams();
  const [showDrawer, setShowDrawer] = useState(false);

  const { data, refetch } = useMovie({ movieId: movie ?? "" });

  if (!data || "error" in data) return <div>Loading...</div>;

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
      <div className="flex justify-center items-center w-full bg-[#121113] flex-col px-2">
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
