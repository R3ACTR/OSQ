import type { Metadata } from "next";
import { Geist, Geist_Mono, Passero_One } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL('https://osq.r3actr.work'),
  title: {
    default: "OSQ Onboard | R3ACTR - Open Source Quest",
    template: "%s | R3ACTR OSQ"
  },
  description: "Join OSQ (Open Source Quest) by R3ACTR - The ultimate Open Source Community for aspiring developers, innovators, and contributors. Start your journey today!",
  keywords: ["Open Source", "OSQ", "R3ACTR", "Coding Quest", "Hackathon", "Student Community", "Developer", "Programming", "Tech Events", "Kerala Tech", "Engineering"],
  authors: [{ name: "R3ACTR Team" }],
  creator: "R3ACTR",
  publisher: "R3ACTR",
  openGraph: {
    title: "OSQ OnBoard | R3ACTR - Open Source Quest",
    description: "Join OSQ (Open Source Quest) by R3ACTR - The ultimate Open Source Community for aspiring developers. Register now!",
    url: "https://osq.r3actr.work",
    siteName: "R3ACTR OSQ",
    images: [
      {
        url: "/r3actr.png", 
        width: 800,
        height: 600,
        alt: "R3ACTR OSQ Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OSQ OnBoard | R3ACTR",
    description: "Join OSQ (Open Source Quest) by R3ACTR. The ultimate community for open source enthusiasts.",
    images: ["/r3actr.png"], // Ideally this should be a wide banner, but using logo as fallback
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification=YOUR_VERIFICATION_CODE", // Placeholder as user didn't provide one, but good to have the field ready
  },
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
          <Analytics />
      </body>
    </html>
  );
}





