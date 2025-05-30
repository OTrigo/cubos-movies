"use client";
import { useTheme } from "@/contexts/ThemeContext";

import { Close } from "@/lib/icons";
import { EditFilterProps } from "@actions/movie/movieActions";
import { Dispatch, SetStateAction, useEffect } from "react";
import { MovieFiltersModal } from "../movie/MovieFiltersModal";
import MovieForm from "../movie/MovieForm";
import { handleMovieForm } from "@/utils/handleMovieForm";

const Modal = ({
  show,
  variant,
  onClose,
  title,
  setFilters,
  refetch,
}: {
  show: boolean;
  variant: string;
  title: string;
  onClose: () => void;
  setFilters: Dispatch<SetStateAction<EditFilterProps | undefined>>;
  refetch: () => void;
}) => {
  const { theme } = useTheme();

  useEffect(() => {
    if (show) {
      document.body?.classList.add("overflow-hidden");
    } else {
      document.body?.classList.remove("overflow-hidden");
    }
  }, [show]);

  return (
    <>
      {show && (
        <div
          className={`${theme}  flex w-screen h-screen fixed  z-[9999] top-[0] backdrop-blur-[8px] ${variant === "filter" ? "justify-center" : "justify-end"} items-center`}
          id="overlay"
          onClick={onClose}
        >
          {variant === "filter" ? (
            <div
              className={`${theme}  flex w-fit flex-col h-fit bg-[var(--bg-theme-3)] text-[var(--bg-theme-11)] text-[16px] font-medium px-[24px] py-[16px]`}
              onClick={(e) => e.stopPropagation()}
            >
              <p
                className={`${theme}  flex w-full justify-between items-center`}
              >
                <span className={`${theme}  text-[20px]`} onClick={() => {}}>
                  {title}
                </span>
                <button onClick={onClose}>
                  <Close />
                </button>
              </p>
              <div className={`${theme}  flex w-full h-full flex-col`}>
                <MovieFiltersModal
                  setFilters={setFilters}
                  onClose={onClose}
                  refetch={refetch}
                />
              </div>
            </div>
          ) : (
            <div
              className={`${theme}  relative flex w-full md:w-[50%] flex-col h-screen bg-[var(--bg-theme-1)] text-[var(--bg-theme-11)] text-[16px] font-medium px-[24px] py-[16px]`}
              onClick={(e) => e.stopPropagation()}
            >
              <p
                className={`${theme}  flex w-full justify-between items-center`}
              >
                <span className={`${theme}  text-[20px]`} onClick={() => {}}>
                  {title}
                </span>
                <button
                  className={`${theme}  cursor-pointer`}
                  onClick={onClose}
                >
                  <Close />
                </button>
              </p>
              <MovieForm
                onSubmit={async (e) => {
                  await handleMovieForm(e);
                  refetch();
                  onClose();
                }}
                variant="add"
                onClose={onClose}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Modal;
