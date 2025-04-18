import ThemeSwitcher from "@/app/components/ui/ThemeSwitcher";
import LogoutButton from "./LogoutButton";

const HeaderActions = () => {
  return (
    <div className="flex gap-2">
      <ThemeSwitcher />
      <LogoutButton />
    </div>
  );
};

export default HeaderActions;
