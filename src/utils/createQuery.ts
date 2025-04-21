import { EditFilterProps } from "@actions/movie/movieActions";
import { Prisma } from "@prisma/client";

export const createQuery = ({
  filters,
  search,
}: {
  filters: EditFilterProps;
  search?: string;
}) => {
  const whereClause: Prisma.MovieWhereInput = {
    ...(filters?.genre && {
      tags: { contains: filters.genre, mode: "insensitive" },
    }),
    ...(filters?.language && {
      language: { equals: filters.language, mode: "insensitive" },
    }),
    ...(filters?.status && {
      status: { equals: filters.status, mode: "insensitive" },
    }),
    ...(filters?.minRating && {
      rating: { gte: filters.minRating },
    }),
    ...(filters?.minDuration &&
      filters?.maxDuration && {
        releaseDate: {
          gte: filters.minDuration,
          lte: filters.maxDuration,
        },
      }),
  };

  if (search) {
    whereClause.OR = [
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
    ];
  }

  return whereClause;
};
