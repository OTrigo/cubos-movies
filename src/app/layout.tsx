import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext"; // ajuste o path se necessário

const interFont = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cubos Movies",
  description: "A movie web app built by Cubos Team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <ThemeProvider>
        <body className={`${interFont.variable} antialiased`}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
