import { createMovie, editMovie } from "@actions/movie/movieActions";

export const handleMovieForm = async (
  e: React.FormEvent<HTMLFormElement>,
  isEdit = false,
  movieId?: string
) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  console.log({ formData });

  const images = new FormData();

  images.append("image", formData.get("image") as File);
  images.append("banner", formData.get("banner") as File);

  console.log({ images: images.get("image") });

  try {
    const uploadFile = await fetch("/api/v1/upload", {
      method: "POST",
      body: images,
    });

    const uploadData = await uploadFile.json();

    console.log({ uploadData });

    const imageUrl = uploadData?.upload?.imageUrl as string;
    const bannerUrl = uploadData?.upload?.bannerUrl as string;

    const baseData = {
      friendlyTitle: formData.get("friendlyTitle") as string,
      fullTitle: formData.get("fullTitle") as string,
      sinopsys: formData.get("sinopsys") as string,
      releaseDate:
        (formData.get("releaseDate") as string) || new Date().toISOString(),
      durationTime: Number(formData.get("durationTime")),
      status: formData.get("status") as string,
      language: formData.get("language") as string,
      budget: Number(formData.get("budget")),
      revenue: Number(formData.get("revenue")),
      profit: Number(formData.get("profit")),
      tags: formData.get("tags") as string,
      rating: Number(formData.get("rating")),
      trailer: formData.get("trailer") as string,
      votes: formData.get("votes") as string,
      phrase: formData.get("phrase") as string,
    };

    const data = {
      ...baseData,
      ...(imageUrl ? { image: imageUrl as string } : {}),
      ...(bannerUrl ? { banner: bannerUrl as string } : {}),
    };

    const movie = isEdit
      ? movieId && (await editMovie({ data, movieId }))
      : await createMovie({ ...data });

    if (!movie) {
      console.error("Couldn't create movie");
    }
  } catch (error) {
    console.error(error);
  }
};
