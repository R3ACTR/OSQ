import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OSQ",
  description: "Open Source Quest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{
        scrollbarWidth: "none",
        overflowX: "hidden",
        cursor: 'url("/icons/cursor.png"), auto',
      }}
    >
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
