"use client";

import { createContext, useState, useContext } from "react";

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultValue =
    window !== undefined && window?.document?.cookie?.match("light")
      ? "light"
      : "dark";

  const [theme, setTheme] = useState<Theme>(defaultValue);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document?.documentElement?.classList?.remove("light", "dark");
    document?.documentElement?.classList?.add(newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
