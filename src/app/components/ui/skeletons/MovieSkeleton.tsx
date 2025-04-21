import SkeletonBlock from "../SkeletonBlock";

const MovieSkeleton = () => {
  return (
    <div className="flex justify-center items-center w-full bg-[#121113] flex-col px-2 animate-pulse">
      <div className="absolute z-[10] top-[72px] w-full h-[564px] bg-gradient-to-b from-[#121113] via-[#1c1b1e77] to-[#121113]">
        <SkeletonBlock width="w-full" height="h-full" />
      </div>
      <div className="absolute z-[0] top-[72px] w-full max-h-[564px] bg-gray-800 opacity-30" />

      <div className="mt-[600px] w-full max-w-4xl px-4 space-y-6">
        <SkeletonBlock width="w-1/2" height="h-10" />
        <SkeletonBlock width="w-3/4" height="h-6" />
        <SkeletonBlock />
        <SkeletonBlock />
        <SkeletonBlock width="w-5/6" />
        <SkeletonBlock width="w-1/4" height="h-10" className="mt-4" />
      </div>

      <div className="mt-10 w-full max-w-4xl px-4 space-y-4">
        <SkeletonBlock width="w-1/3" height="h-6" />
        <SkeletonBlock height="h-48" />
      </div>
    </div>
  );
};

export default MovieSkeleton;
