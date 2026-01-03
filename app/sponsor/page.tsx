"use client";
import React from "react";
import Navbar from "./navbar";
import { Anton, Open_Sans } from "next/font/google";
import { IconMail, IconDownload } from "@tabler/icons-react";
import Image from "next/image";


const anton = Anton({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function SponsorPage() {
  return (
    <section
      style={{ cursor: 'url("/icons/cursor.png"), auto' }}
      className="min-h-screen w-full bg-white text-black overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <Navbar />

        {/* Hero Section */}
        <div className="mt-10 md:mt-20 flex flex-col items-center text-center px-4">
          <div className="w-full max-w-[150px] mb-10 overflow-hidden">
            <Image 
              src="/sponser.png" 
              width={1200} 
              height={600} 
              className="object-contain w-full h-auto rounded-3xl" 
              alt="Sponsor Header" 
            />
          </div>
          <div className="mb-4 inline-block px-4 py-1.5 rounded-full border-2 border-black bg-[#b2de21] text-black text-xs md:text-sm font-bold tracking-widest uppercase">
            Partner With Excellence
          </div>
          <h1 className={`${anton.className} text-5xl md:text-9xl text-black tracking-tighter mb-6 relative inline-block z-10`}>
            BECOME A <br className="md:hidden" />
            <span className="relative">
              SPONSOR
              <div className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-3 md:h-6 bg-[#b2de21] -z-10 rotate-[-1deg]"></div>
            </span>
          </h1>
          <p className={`${openSans.className} text-black/70 text-base md:text-xl max-w-3xl mx-auto font-medium mt-4 md:mt-8 leading-relaxed`}>
            Join us in empowering the next generation of innovators. Sponsoring our hackathon connects your brand with over <span className="text-black font-bold">500+ developers</span>, designers, and tech enthusiasts.
          </p>
          
          <div className="mt-8 md:mt-12 flex flex-col md:flex-row gap-4 md:gap-6">
            <a href="mailto:contact@r3actr.com" className="px-8 py-3 bg-black text-white text-lg font-bold rounded-full hover:bg-[#b2de21] hover:text-black transition-all duration-300 border-2 border-black flex items-center justify-center gap-2">
                <IconMail size={20} />
                Contact Us
            </a>
            <a 
              href="https://drive.google.com/file/d/12tjlcRXqguUuy0nxeOHTpB5-IzQV87k1/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-black text-lg font-bold rounded-full hover:bg-black/5 transition-all duration-300 border-2 border-black flex items-center justify-center gap-2"
            >
                <IconDownload size={20} />
                Download Deck
            </a>
          </div>
        </div>




      </div>
    </section>
  );
}
