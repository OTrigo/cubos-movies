import { Close } from "@/lib/icons";

const Drawer = ({
  children,
  title,
  onClose,
  show,
}: {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  show: boolean;
}) => {
  
  return (
    <>
      {show && (
        <div
          className="flex justify-end w-screen max-h-full bg-[#ffffff25] backdrop-blur-[8px] z-30 fixed top-0 left-0"
          onClick={onClose}
        >
          <div
            className="relative w-full max-h-full md:max-w-[565px] bg-[#232225] z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="flex justify-between items-center p-4 text-[24px]">
              <span>{title ?? "Teste"}</span>
              <button
                className="cursor-pointer"
                onClick={() => {
                  onClose();
                }}
              >
                <Close />
              </button>
            </p>
            <div className="flex h-[calc(100%-68px)] flex-col justify-between gap-2 p-4 text-[24px]">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Drawer;
