"use client";

import { useTheme } from "@/contexts/ThemeContext";
import SkeletonBlock from "../SkeletonBlock";

const MovieSkeleton = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`${theme}  flex justify-center items-center w-full bg-[var(--bg-theme-1)] flex-col px-2 animate-pulse`}
    >
      <div
        className={`${theme}  absolute z-[10] top-[72px] w-full h-[564px] bg-gradient-to-b from-[var(--bg-theme-1)] via-[#1c1b1e77] to-[var(--bg-theme-1)]`}
      >
        <SkeletonBlock width="w-full" height="h-full" />
      </div>
      <div
        className={`${theme}  absolute z-[0] top-[72px] w-full max-h-[564px] bg-gray-800 opacity-30`}
      />

      <div className={`${theme}  mt-[600px] w-full max-w-4xl px-4 space-y-6`}>
        <SkeletonBlock width="w-1/2" height="h-10" />
        <SkeletonBlock width="w-3/4" height="h-6" />
        <SkeletonBlock />
        <SkeletonBlock />
        <SkeletonBlock width="w-5/6" />
        <SkeletonBlock
          width="w-1/4"
          height="h-10"
          className={`${theme}  mt-4`}
        />
      </div>

      <div className={`${theme}  mt-10 w-full max-w-4xl px-4 space-y-4`}>
        <SkeletonBlock width="w-1/3" height="h-6" />
        <SkeletonBlock height="h-48" />
      </div>
    </div>
  );
};

export default MovieSkeleton;
