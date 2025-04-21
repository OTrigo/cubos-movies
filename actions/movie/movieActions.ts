"use server";

import { getUserIdFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createQuery } from "@/utils/createQuery";
import { Movie, Prisma } from "@prisma/client";

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
  minDuration?: number;
  maxDuration?: number;
};

export const getMoviesBySearch = async ({
  search,
  pagination,
  filters,
}: {
  search?: string;
  pagination: number;
  filters: EditFilterProps;
}) => {
  try {
    const whereClause: Prisma.MovieWhereInput = createQuery({
      search,
      filters,
    });

    const [movies, total] = await Promise.all([
      prisma.movie.findMany({
        take: 10,
        skip: (pagination ?? 0) * 10,
        where: whereClause,
      }),
      prisma.movie.count({
        where: whereClause,
      }),
    ]);

    return { success: true, data: movies, total };
  } catch (error) {
    return { error };
  }
};

export const createMovie = async (props: Partial<Movie>) => {
  const user = await getUserIdFromToken();

  const {
    budget = 0,
    durationTime = 0,
    friendlyTitle = "No data",
    fullTitle = "No data",
    image = undefined,
    language = "No data",
    profit = 0,
    rating = 0,
    releaseDate = undefined,
    revenue = 0,
    sinopsys = "No data",
    status = "No data",
    tags = "No data",
    trailer = "No data",
    banner = undefined,
    votes = "No data",
    phrase = "No data",
  } = props;

  const release = new Date(releaseDate ?? 0);

  try {
    const movie = await prisma.movie.create({
      data: {
        budget,
        durationTime,
        friendlyTitle,
        fullTitle,
        language,
        profit,
        rating,
        releaseDate: release,
        revenue,
        sinopsys,
        status,
        trailer,
        tags,
        votes,
        phrase,
        authorId: user?.userId ?? "",
        ...(banner && { banner }),
        ...(image && { image }),
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
  data: Partial<Movie>;
  movieId: string;
}) => {
  const filteredData: Partial<Movie> = Object.fromEntries(
    //eslint-disable-next-line
    Object.entries(data).filter(([_, value]) => {
      const isInvalid =
        value === undefined ||
        value === null ||
        value === "" ||
        (typeof value === "number" && isNaN(value));
      return !isInvalid;
    })
  );

  if (filteredData?.releaseDate) {
    filteredData.releaseDate = new Date(filteredData.releaseDate);
  }

  try {
    const movie = await prisma.movie.update({
      where: {
        id: movieId,
      },
      data: filteredData,
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
