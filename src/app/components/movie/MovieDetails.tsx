"use client";

import { useMovie } from "@/hooks/useMovie";
import Tags from "../movieDetails/Tags";
import ContentBlock from "../ui/ContentBlock";
import { deleteMovie } from "@actions/movie/movieActions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "../ui/CircularProgress";
import Placeholder from "@public/assets/placeholder.png";
import Image from "next/image";

const MovieDetails = ({ ...props }) => {
  const {
    id = null,
    rating = null,
    votes = null,
    releaseDate = null,
    durationTime = null,
    language = null,
    budget = null,
    revenue = null,
    friendlyTitle = null,
    fullTitle = null,
    image = null,
    profit = null,
    status = null,
    tags = null,
    sinopsys = null,
    banner = null,
    phrase = null,
    setShowDrawer = () => {},
  } = props;

  const { data, isLoading, error } = useMovie({ movieId: id });

  const router = useRouter();

  useEffect(() => {
    if (!data && error && !isLoading) router.replace("/");
  }, [data, error, isLoading, router]);

  const ratingMetrics = [
    { propertyName: "Votos", data: votes },
    { propertyName: "Popularidade", data: rating },
  ];

  const moneyInfo = [
    { propertyName: "Orçamento", data: budget },
    { propertyName: "Receita", data: revenue },
    { propertyName: "Lucro", data: profit },
  ];

  const metadataGroup = [
    { propertyName: "Lançamento", data: releaseDate },
    { propertyName: "Duração", data: durationTime },
    { propertyName: "Situação", data: status },
    { propertyName: "Lançamento", data: language },
  ];

  const handleDeleteMovie = () => {
    deleteMovie({ movieId: id });
    router.replace("/");
  };

  const handleEditMovie = () => {
    setShowDrawer(true);
  };

  return (
    <div className="relative flex flex-col w-full max-w-full m-8 bg-[#121113] text-white p-6 gap-6 rounded-xl shadow-xl z-10 overflow-hidden">
      <div
        className="absolute z-[1] w-full h-full"
        style={{
          background:
            "linear-gradient(180deg, #121113 0%, rgba(18, 17, 19, 0.46) 49.48%, #121113 100%)",
        }}
      />
      <Image
        src={banner ?? Placeholder}
        alt={`${banner} Banner`}
        className="invisible absolute z-0 object-cover md:h-full md:max-h-[90%] w-full md:aspect-[1448/603] md:visible"
      />
      <div className="flex flex-col relative z-10 gap-4">
        <div className="flex relative md:flex-row flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold">{friendlyTitle ?? "No data"}</h1>
            <p className="text-sm text-gray-400">
              Título original: {fullTitle ?? "No data"}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-[#B744F708] text-white px-3 py-1 rounded cursor-pointer"
              onClick={handleDeleteMovie}
            >
              Deletar
            </button>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded cursor-pointer"
              onClick={handleEditMovie}
            >
              Editar
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row  gap-4">
          <Image
            src={`${image ?? Placeholder}`}
            alt={`${friendlyTitle ?? "A movie"} Poster`}
            className="w-[374px] rounded-lg object-cover"
          />
          <div className="flex flex-grow flex-col gap-4 flex-1">
            <div className="flex md:flex-row flex-col justify-between md:h-[98px]">
              <p className="flex justify-center items-center italic text-gray-300 h-full">
                {phrase ?? "No data"}
              </p>
              <div className="flex gap-4 items-center">
                {ratingMetrics?.map((metric, id) => (
                  <div
                    className="bg-[#23222575] px-2 py-1 rounded backdrop-blur-[4px]"
                    key={id}
                  >
                    <p className="text-[#B5B2BC]">{metric.propertyName}</p>
                    <p className="text-lg font-bold text-white">
                      {metric?.data ?? "No data"}
                    </p>
                  </div>
                ))}

                <CircularProgress progress={rating ?? 0} />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 rounded-[4px]">
              <div className="flex flex-col flex-grow gap-2 min-w-1/2">
                <ContentBlock
                  description={`${sinopsys ?? "No data"}`}
                  title="Sinopse"
                  className="h-[416px] w-full p-4 backdrop-blur-[4px]"
                />
                <Tags tags={tags ?? "No data"} />
              </div>
              <div className="flex flex-grow flex-col w-full h-full items-end gap-4 text-sm text-gray-300">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs w-full">
                  {metadataGroup?.map((metadata, id) => (
                    <div
                      className="w-full h-[72px] rounded-[4px] bg-[#23222575] flex justify-between p-4 flex-col backdrop-blur-[4px]"
                      key={id}
                    >
                      <p className="text-gray-400 text-[12px]">
                        {metadata?.propertyName ?? "Property"}
                      </p>
                      <p className="font-bold text-[14px]">
                        {metadata?.data ?? "No data"}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 w-full">
                  {moneyInfo?.map((info, id) => (
                    <div
                      className="bg-[#23222575] w-full flex justify-between p-4 flex-col backdrop-blur-[4px]"
                      key={id}
                    >
                      <p className="text-[#B5B2BC] text-[12px]">
                        {info?.propertyName ?? "PropertyName"}
                      </p>
                      <p className="text-[#EEEEF0] text-[14px] font-bold">
                        {info?.data ?? "No data"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
