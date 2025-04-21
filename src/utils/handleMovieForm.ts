import { createMovie, editMovie } from "@actions/movie/movieActions";
import { Movie } from "@prisma/client";
import { normalizeValue } from "./normalizeData";

export const handleMovieForm = async (
  e: React.FormEvent<HTMLFormElement>,
  isEdit = false,
  movieId?: string
) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const images = new FormData();

  images.append("image", formData.get("image") as File);
  images.append("banner", formData.get("banner") as File);

  try {
    const uploadFile = await fetch("/api/v1/upload", {
      method: "POST",
      body: images,
    });

    const uploadData = uploadFile.ok && (await uploadFile?.json());

    const imageUrl = uploadData?.upload?.imageUrl;
    const bannerUrl = uploadData?.upload?.bannerUrl;

    const baseData = {
      friendlyTitle: normalizeValue(formData.get("friendlyTitle")),
      fullTitle: normalizeValue(formData.get("fullTitle")),
      sinopsys: normalizeValue(formData.get("sinopsys")),
      releaseDate: normalizeValue(formData.get("releaseDate")),
      durationTime: Number(formData.get("durationTime")),
      status: normalizeValue(formData.get("status")),
      language: normalizeValue(formData.get("language")),
      budget: Number(formData.get("budget")),
      revenue: Number(formData.get("revenue")),
      profit: Number(formData.get("profit")),
      tags: normalizeValue(formData.get("tags")),
      rating: Number(formData.get("rating")),
      trailer: normalizeValue(formData.get("trailer")),
      votes: normalizeValue(formData.get("votes")),
      phrase: normalizeValue(formData.get("phrase")),
    };

    const data = {
      ...baseData,
      ...(imageUrl && { image: imageUrl as string }),
      ...(bannerUrl && { banner: bannerUrl as string }),
    } as Partial<Movie>;

    const movie = isEdit
      ? movieId && (await editMovie({ data, movieId }))
      : await createMovie({ ...data } as Partial<Movie>);

    if (!movie) {
      console.error("Couldn't create movie");
    }
  } catch (error) {
    console.error(error);
  }
};
