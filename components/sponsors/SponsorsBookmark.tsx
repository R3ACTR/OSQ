"use client";

import React, { useState } from "react";
import { Anton, Open_Sans } from "next/font/google";
import { IconHeartHandshake, IconX, IconChevronLeft } from "@tabler/icons-react";
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

const SPONSORS = [
  { name: "IEEE SB SBCE", logo: "/partners/ieee.png" },
  { name: "Artificial Intelligence", logo: "/partners/ai.png" },
  { name: "SBCE", logo: "/partners/sbce.png" },
  { name: "Dept of CSE", logo: "/partners/cse.png" },
  { name: "IEDC", logo: "/partners/IEDC Logo-Photoroom.png" },
];

export default function SponsorsBookmark() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bookmark Tab (Right Side) - Absolute to Hero Container */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className={`
            absolute -right-4 md:-right-14 top-1/2 -translate-y-1/2 z-40 cursor-pointer
            group transition-all duration-300 ease-in-out
            hover:-translate-x-2
            hidden md:block
          `}
        >
          <div className="bg-black text-[#b2de21] py-8 px-2 pl-3 rounded-l-xl shadow-[-4px_4px_0px_0px_rgba(0,0,0,0.5)] border-2 border-r-0 border-[#b2de21] flex flex-col items-center gap-4">
            <IconHeartHandshake size={24} stroke={2} />
            <span
              className={`${anton.className} text-lg uppercase tracking-wider whitespace-nowrap`}
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              Our Sponsors
            </span>
          </div>
          
          {/* Hover tooltip effect */}
          <div className="absolute top-1/2 right-full -translate-y-1/2 mr-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded">
            View Sponsors
          </div>
        </div>
      )}

      {/* Overlay Backdrop - Fixed to Viewport */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar (Opens from Right) - Fixed to Viewport */}
      <div
        className={`
          fixed top-0 right-0 h-screen w-80 bg-white z-[101] shadow-2xl
          transform transition-transform duration-300 ease-in-out border-l-4 border-black
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          hidden md:flex flex-col
        `}
      >
        {/* Header */}
        <div className="bg-black text-[#b2de21] p-6 flex justify-between items-center">
            <button 
                onClick={() => setIsOpen(false)}
                className="hover:-rotate-90 transition-transform duration-300 text-white hover:text-[#b2de21]"
            >
                <IconX size={24} />
            </button>
            <h2 className={`${anton.className} text-2xl uppercase tracking-wider flex items-center gap-2`}>
                Sponsors
                <IconHeartHandshake size={24} />
            </h2>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <p className={`${openSans.className} text-sm text-center text-gray-500 mb-2`}>
                Made possible by our amazing partners
            </p>
            
            {SPONSORS.map((sponsor, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-gray-100 hover:border-black hover:bg-gray-50 transition-all group text-center"
              >
                <div className="h-16 flex items-center justify-center w-full">
                    <div className="relative w-full h-full">
                         <Image 
                            src={sponsor.logo} 
                            alt={sponsor.name}
                            fill
                            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                    </div>
                </div>
                <p className={`${openSans.className} font-bold text-sm text-black mt-2`}>
                    {sponsor.name}
                </p>
              </div>
            ))}
            
            <div className="mt-8 p-4 bg-[#b2de21]/10 rounded-xl border border-[#b2de21] text-center">
                <p className={`${openSans.className} text-sm font-bold mb-2`}>Want to sponsor us?</p>
                <a href="/sponsor" className="inline-block bg-black text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#b2de21] hover:text-black transition-colors">
                    BECOME A PARTNER
                </a>
            </div>
        </div>

        {/* Footer Link */}
        <div className="p-4 border-t-2 border-black bg-gray-50">
          <a
            href="https://drive.google.com/file/d/12tjlcRXqguUuy0nxeOHTpB5-IzQV87k1/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-[#b2de21] hover:text-black transition-colors border-2 border-transparent hover:border-black"
          >
            <IconChevronLeft size={18} />
            <span className={openSans.className}>View Sponsorship Deck</span>
          </a>
        </div>
      </div>
    </>
  );
}
