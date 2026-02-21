"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Medal, Award, Gift } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function PrizesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.from(".page-title", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
      
      gsap.from(".prize-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-zinc-50 flex flex-col relative overflow-hidden">
      <Navbar />
      
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none" style={{ 
        backgroundImage: "radial-gradient(#a1a1aa 1px, transparent 1px)", 
        backgroundSize: "32px 32px" 
      }} />

      <main className="flex-grow pt-32 pb-20 relative z-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
            
          <h1 className="page-title text-5xl md:text-7xl font-[family-name:var(--font-passero)] text-zinc-900 mb-4 text-center drop-shadow-sm uppercase">
            OSQ <span className="text-[#bfff00] text-stroke-black" style={{ WebkitTextStroke: "1px black" }}>PRIZES</span>
          </h1>
          <p className="page-title text-zinc-600 mb-16 text-center max-w-2xl text-lg md:text-xl font-[family-name:var(--font-passero)] tracking-wider">
            Celebrating the amazing contributions of our open source community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
            
            {/* Top 3 Card */}
            <div className="prize-card flex flex-col items-center text-center p-8 bg-black text-white rounded-[2rem] border-4 border-[#bfff00] shadow-xl group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#bfff00] rounded-bl-full opacity-10 group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className="w-20 h-20 bg-[#bfff00] text-black rounded-full flex items-center justify-center mb-6 shadow-lg z-10 border-2 border-transparent group-hover:border-white transition-colors">
                <Trophy size={40} />
              </div>
              
              <h2 className="text-3xl font-[family-name:var(--font-passero)] mb-2 z-10 text-[#bfff00]">TOP 3</h2>
              <p className="text-zinc-400 font-[family-name:var(--font-passero)] text-sm mb-6 z-10">THE ELITE HACKERS</p>
              
              <ul className="flex flex-col gap-4 text-left w-full z-10 font-sans mt-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#bfff00] mt-1"><Award size={20} /></span>
                  <span className="text-zinc-200">Exclusive Physical Certificates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#bfff00] mt-1"><Gift size={20} /></span>
                  <span className="text-zinc-200">.xyz Domain Name*<br/><span className="text-xs text-zinc-400">(worth $15 for 1 year)</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#bfff00] mt-1"><Gift size={20} /></span>
                  <span className="text-zinc-200">Exclusive OSQ Swags*</span>
                </li>
              </ul>
            </div>

            {/* Title Holders Card */}
            <div className="prize-card flex flex-col items-center text-center p-8 bg-white text-black rounded-[2rem] border-4 border-black shadow-xl group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-100 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className="w-20 h-20 bg-black text-[#bfff00] rounded-full flex items-center justify-center mb-6 shadow-lg z-10 border-2 border-transparent group-hover:border-black transition-colors">
                <Medal size={40} />
              </div>
              
              <h2 className="text-3xl font-[family-name:var(--font-passero)] mb-2 z-10">TITLE HOLDERS</h2>
              <p className="text-zinc-500 font-[family-name:var(--font-passero)] text-sm mb-6 z-10">VERIFIED CONTRIBUTORS</p>
              
              <ul className="flex flex-col gap-4 text-left w-full z-10 font-sans mt-4">
                <li className="flex items-start gap-3">
                  <span className="text-black mt-1"><Award size={20} /></span>
                  <span className="text-zinc-800">Exclusive Digital Certificates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-black mt-1"><Gift size={20} /></span>
                  <span className="text-zinc-800">.xyz Domain Name*<br/><span className="text-xs text-zinc-500">(worth $15 for 1 year)</span></span>
                </li>
              </ul>
            </div>

            {/* Score > 100 Card */}
            <div className="prize-card flex flex-col items-center text-center p-8 bg-[#bfff00] text-black rounded-[2rem] border-4 border-black shadow-xl group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-bl-full opacity-20 group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center mb-6 shadow-lg z-10 border-2 border-transparent group-hover:border-black transition-colors">
                <Award size={40} />
              </div>
              
              <h2 className="text-3xl font-[family-name:var(--font-passero)] mb-2 z-10">SCORE &gt; 100</h2>
              <p className="text-zinc-700 font-[family-name:var(--font-passero)] text-sm mb-6 z-10">ACTIVE PARTICIPANTS</p>
              
              <ul className="flex flex-col gap-4 text-left w-full z-10 font-sans mt-4">
                <li className="flex items-start gap-3">
                  <span className="text-black mt-1"><Award size={20} /></span>
                  <span className="text-zinc-900 font-medium">Official OSQ Participant Certificate</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Disclaimer Note */}
          <div className="mt-16 text-center text-xs text-zinc-500 max-w-3xl mx-auto font-sans">
            * The .xyz domain name and OSQ swags are generously provided by our external sponsors. Please note that OSQ is not responsible for the fulfillment, maintenance, or any issues related to these sponsored prizes.
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
