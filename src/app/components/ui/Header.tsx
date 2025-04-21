import Logo from "./Logo";
import HeaderActions from "@/app/components/ui/HeaderActions";

const Header = () => {
  return (
    <div className="relative flex w-full min-h-[76px] justify-between border-b border-b-[#F1E6FD19] items-center bg-transparent md:bg-[#12111380] px-4 z-30">
      <Logo />
      <HeaderActions />
    </div>
  );
};

export default Header;
