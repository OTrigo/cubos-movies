"use server";

import { getUserIdFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UUID } from "crypto";

export type FilterProps = {
  label: string;
  value: string;
};

export type EditFilterProps = {
  genre?: string;
  language?: string;
  minRating?: number;
  status?: string;
  releaseFrom?: string;
  releaseTo?: string;
};

type GetMovieProps = {
  pagination: number;
  filters: EditFilterProps;
};

interface MovieProps {
  id: UUID;
  friendlyTitle: string;
  fullTitle: string;
  sinopsys: string;
  releaseDate: string;
  durationTime: number;
  status: string;
  language: string;
  budget: number;
  revenue: number;
  profit: number;
  tags: string;
  rating: number;
  trailer: string;
  image: string;
  banner: string;
}

export const getMovies = async ({ filters, pagination }: GetMovieProps) => {
  try {
    const movies = await prisma.movie.findMany({
      take: 10,
      skip: (pagination ?? 0) * 10,
      where: {
        ...(filters?.genre && { tags: { contains: filters.genre } }),
        ...(filters?.language && { language: filters.language }),
        ...(filters?.status && { status: filters.status }),
        ...(filters?.minRating && { rating: { gte: filters.minRating } }),
        ...(filters?.releaseFrom &&
          filters?.releaseTo && {
            releaseDate: {
              gte: new Date(filters.releaseFrom),
              lte: new Date(filters.releaseTo),
            },
          }),
      },
    });

    if (!movies) return { error: "Couldn't search movies" };

    return { success: true, data: movies, total: movies.length };
  } catch (err) {
    console.error(err);
    return { error: "Couldn't search movies" };
  }
};

export const getMovieBySearch = async ({
  search,
  pagination,
  filters,
}: {
  search: string;
  pagination: number;
  filters: EditFilterProps;
}) => {
  try {
    const movies = await prisma.movie.findMany({
      take: 10,
      skip: (pagination ?? 0) * 10,
      where: {
        ...(filters?.genre && {
          tags: { contains: filters.genre, mode: "insensitive" },
        }),
        ...(filters?.language && {
          language: filters.language,
          mode: "insensitive",
        }),
        ...(filters?.status && { status: filters.status, mode: "insensitive" }),
        ...(filters?.minRating && {
          rating: { gte: filters.minRating },
          mode: "insensitive",
        }),
        ...(filters?.releaseFrom &&
          filters?.releaseTo && {
            releaseDate: {
              gte: new Date(filters.releaseFrom),
              lte: new Date(filters.releaseTo),
            },
            mode: "insensitive",
          }),
        OR: [
          {
            friendlyTitle: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            fullTitle: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            tags: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return { success: true, data: movies, total: movies.length };
  } catch (error) {
    return { error };
  }
};

export const createMovie = async (props: Partial<MovieProps>) => {
  const user = await getUserIdFromToken();

  const {
    budget = 0,
    durationTime = 0,
    friendlyTitle = "No data",
    fullTitle = "No data",
    image = "No data",
    language = "No data",
    profit = 0,
    rating = 0,
    releaseDate,
    revenue = 0,
    sinopsys = "No data",
    status = "No data",
    tags = "No data",
    trailer = "No data",
    banner = "No data",
  } = props;

  const release = new Date(releaseDate ?? "");

  try {
    const movie = await prisma.movie.create({
      data: {
        budget,
        durationTime,
        friendlyTitle,
        fullTitle,
        image,
        language,
        profit,
        rating,
        releaseDate: release,
        revenue,
        sinopsys,
        status,
        trailer,
        tags,
        banner,
        authorId: user?.userId ?? "",
      },
    });

    return { success: true, movie };
  } catch (error) {
    return { error };
  }
};

export const editMovie = async ({
  data,
  movieId,
}: {
  data: Record<string, unknown>;
  movieId: string;
}) => {
  try {
    const movie = prisma.movie.update({
      where: {
        id: movieId,
      },
      data: { ...data, releaseDate: new Date(data.releaseDate as string) },
    });

    return { success: true, data: movie };
  } catch (error) {
    return { error };
  }
};

export const getMovieById = async (movieId: string) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    console.log(movie);

    return movie;
  } catch (error) {
    return { error, data: null };
  }
};

export const deleteMovie = async ({ movieId }: { movieId: string }) => {
  try {
    const movie = prisma.movie.delete({
      where: {
        id: movieId,
      },
    });
    return { success: true, data: movie };
  } catch (error) {
    return { error };
  }
};
