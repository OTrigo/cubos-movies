"use client";

import { useMovie } from "@/hooks/useMovie";
import Tags from "../movieDetails/Tags";
import ContentBlock from "../ui/ContentBlock";
import { deleteMovie } from "@actions/movie/movieActions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "../ui/CircularProgress";
import Image from "next/image";
import Background from "@/assets/background.png";
import MovieDetailsActions from "./MovieDetailsActions";

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
    <div className="relative flex flex-col w-full max-w-full lg:m-8 bg-[var(--bg-theme-1)] text-white p-4 lg:p-6 gap-6 rounded-xl shadow-xl z-10 overflow-hidden justify-center items-center">
      <div className="w-fit lg:w-full">
        <div
          className="absolute z-[1] w-full h-full"
          style={{
            background:
              "linear-gradient(180deg, #121113 0%, rgba(18, 17, 19, 0.46) 49.48%, #121113 100%)",
          }}
        />
        <Image
          src={banner ?? Background}
          alt={`${banner} Banner`}
          className="invisible absolute z-0 object-cover lg:h-full lg:max-h-[90%] w-full lg:aspect-[1448/603] lg:visible"
          width={1440}
          height={564}
        />
        <div className="flex flex-col relative z-10 gap-4">
          <MovieDetailsActions
            friendlyTitle={friendlyTitle}
            fullTitle={fullTitle}
            handleDeleteMovie={handleDeleteMovie}
            handleEditMovie={handleEditMovie}
            isMobile={false}
          />
          <div className="flex flex-col w-full lg:flex-row gap-4 justify-center items-center">
            <Image
              src={`${image ?? "/assets/placeholder.png"}`}
              alt={`${friendlyTitle ?? "A movie"} Poster`}
              className="w-[374px] h-[582px] rounded-lg object-cover"
              width={374}
              height={582}
            />
            <MovieDetailsActions
              friendlyTitle={friendlyTitle}
              fullTitle={fullTitle}
              handleDeleteMovie={handleDeleteMovie}
              handleEditMovie={handleEditMovie}
              isMobile={true}
              additionalClass="!w-full !flex-col-reverse"
            />
            <div className="flex flex-grow flex-col gap-4 flex-1 w-full">
              <div className="flex flex-col-reverse md:flex-col lg:flex-row justify-between lg:h-[98px]">
                <p className="flex justify-center items-center italic text-gray-300 h-full">
                  {phrase ?? "No data"}
                </p>
                <div className="flex gap-4 items-center">
                  {ratingMetrics?.map((metric, id) => (
                    <div
                      className="bg-[#23222575] px-3 py-3 rounded backdrop-blur-[4px]"
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
    </div>
  );
};

export default MovieDetails;
