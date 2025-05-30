const Tags = ({ tags }: { tags?: string }) => {
  const tagsToMap = tags?.split(",");

  return (
    <div className="flex flex-col gap-2 mt-2 p-4 rounded-[4px] bg-[var(--bg-theme-3-opacity)] md:max-w-[325px]">
      <p>Generos</p>
      <p className="flex w-fit h-fit gap-2 justify-center items-center flex-wrap">
        {tagsToMap?.map((tag, id) => (
          <span
            className="flex min-h-[31px] text-[var(--text-button-secondary-default-variant)] bg-[var(--bg-button-secondary-hover)] ] justify-center items-center px-3 py-1 text-xs capitalize"
            key={id}
          >
            {tag}
          </span>
        ))}
      </p>
    </div>
  );
};

export default Tags;
