import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext"; // ajuste o path se necessário
import TanstackProvider from "@/contexts/TanstackProvider";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";

const interFont = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const MontserratFont = Montserrat({
  variable: "--font-montserrat",
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
      <TanstackProvider>
        <ThemeProvider>
          <body
            className={`${MontserratFont.variable} antialiased`}
          >
            <Header />
            {children}
            <Footer />
          </body>
        </ThemeProvider>
      </TanstackProvider>
    </html>
  );
}
