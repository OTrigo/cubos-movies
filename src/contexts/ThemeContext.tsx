"use client";

import { createContext, useState, useContext, useEffect } from "react";

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
  const [theme, setTheme] = useState<Theme>("dark"); // valor inicial padrão

  // Lê o cookie e define a classe no HTML quando o componente monta
  useEffect(() => {
    const cookieMatch = document.cookie.match(/theme=(light|dark)/);
    const savedTheme = cookieMatch?.[1] as Theme | undefined;

    const finalTheme = savedTheme ?? "dark";
    setTheme(finalTheme);

    // Aplica no <html>
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(finalTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
