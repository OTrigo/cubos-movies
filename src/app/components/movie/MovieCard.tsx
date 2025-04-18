const MovieCard = ({ movie }: { movie: any; key: number }) => {
  console.log(movie);
  return (
    <div className="relative w-[235px] h-[355px] flex bg-red-500">
      <div
        className="flex flex-col justify-end absolute bottom-0 p-4 h-[50%] w-full"
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 50%, #000000 100%)`,
        }}
      >
        <div className="text-white text-[16px] uppercase">Nome do filme</div>
        <div className="text-[#B4B4B4] text-[12.8px] font-normal">Tags</div>
      </div>
    </div>
  );
};

export default MovieCard;
