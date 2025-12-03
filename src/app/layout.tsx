import type { Metadata } from "next";
import { Jua } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { MainHeader } from "@/components/header";

const jua = Jua({
  variable: "--font-jua",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio of my own projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jua.variable} antialiased `}>
        <Providers>
          <MainHeader />
          <div className="mx-auto max-w-[1080px] w-full min-h-screen relative">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
