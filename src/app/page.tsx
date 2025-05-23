"use client";
import { useTheme } from "@/contexts/ThemeContext";

import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import MovieGrid from "./components/movie/MovieGrid";
import MoviePagination from "./components/movie/MoviePagination";
import MovieSearch from "./components/movie/MovieSearch";
import Modal from "./components/ui/Modal";
import { useEffect, useState } from "react";
import { useMovieSearch } from "@/hooks/useMovie";
import { EditFilterProps } from "@actions/movie/movieActions";
import { useRouter } from "next/navigation";
import Background from "@/assets/background.png";
import MovieSkeleton from "./components/ui/skeletons/MovieSkeleton";

const MoviesPage = () => {
  const { data: user, isLoading: isLoadingUser, error: errorUser } = useUser();

  const [filters, setFilters] = useState<EditFilterProps | undefined>(
    undefined
  );
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoadingUser && errorUser) {
      router.replace("/signIn");
    }
  }, [user, isLoadingUser, errorUser, router]);

  const {
    data: movies,
    isLoading: isLoadingMovie,
    error: errorMovie,
    refetch,
  } = useMovieSearch({
    search,
    filters,
    pagination,
  });

  const { theme } = useTheme();

  useEffect(() => {
    if (search || filters || pagination || pagination === 0) {
      refetch();
    }
  }, [search, filters, pagination, refetch]);

  const [showModal, setShowModal] = useState<{
    show: boolean;
    variant: "filter" | "add" | "";
  }>({
    show: false,
    variant: "",
  });

  if (isLoadingUser || isLoadingMovie || errorMovie) return <MovieSkeleton />;

  if (!user || errorUser) return <MovieSkeleton />;

  return (
    <div
      className={`${theme} min-h-screen flex flex-col justify-center items-center w-full bg-[var(--bg-theme-1)]`}
    >
      <Modal
        title={showModal.variant === "filter" ? "Filtros" : "Adicionar Filme"}
        show={showModal.show}
        variant={showModal.variant}
        onClose={() => setShowModal({ show: false, variant: "" })}
        setFilters={setFilters}
        refetch={refetch}
      />
      <MovieSearch
        setShowModal={setShowModal}
        setSearch={setSearch}
        pagination={pagination}
        refetch={refetch}
      />
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

      <MovieGrid movies={movies?.data ?? []} />
      <MoviePagination
        setPagination={setPagination}
        pagination={pagination}
        totalPages={Math.round((movies?.total ?? 0) / 10)}
      />
    </div>
  );
};

export default MoviesPage;
