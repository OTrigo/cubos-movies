const ContentBlock = ({
  title,
  description,
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
  id?: string;
}) => {
  return (
    <div className={`flex flex-col bg-[#23222560] ${className}`}>
      <p>{title ?? "Title"}</p>
      <p className="font-montserrat font-normal text-base leading-none tracking-normal">
        {description ?? "Description"}
      </p>
    </div>
  );
};

export default ContentBlock;
