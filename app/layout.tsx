import type { Metadata } from "next";
import { Geist, Geist_Mono, Passero_One } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const passero = Passero_One({
  weight: "400",
  variable: "--font-passero",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "R3ACTR - OSC",
  description: "Join R3ACTR - The Open Source Community for aspiring developers and innovators.",
};


import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${passero.variable} antialiased selection:bg-black selection:text-white`}
      >
        <LoadingScreen />
          <Navbar />
          {children}
      </body>
    </html>
  );
}





