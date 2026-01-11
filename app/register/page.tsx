"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ticket, Calendar, Bell } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function RegisterPage() {
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
        <div className="max-w-4xl mx-auto flex flex-col items-center">
            
           <h1 className="page-title text-4xl md:text-6xl font-[family-name:var(--font-passero)] text-zinc-900 mb-12 text-center drop-shadow-sm">
             ACTIVE <span className="text-[#bfff00] text-stroke-black" style={{ WebkitTextStroke: "1px black" }}>OPENINGS</span>
           </h1>

           <div className="w-full max-w-md">
             <div className="opening-card bg-white p-6 rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-[#bfff00] rounded-xl border-2 border-black group-hover:bg-[#a6de00] transition-colors">
                    <Ticket className="w-6 h-6 text-black" />
                  </div>
                  <span className="bg-black text-[#bfff00] px-3 py-1 text-xs font-bold rounded-full border border-black">
                    OPEN
                  </span>
                </div>
                
                <h3 className="text-2xl font-[family-name:var(--font-passero)] mb-3">VOLUNTEERS</h3>
                <p className="text-zinc-600 mb-8 text-sm leading-relaxed font-medium">
                  We are looking for passionate individuals to join our core team and help organize the event.
                </p>

                <a 
                   href="https://forms.gle/x4CLFSWL1FQMCBMK8"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="block w-full text-center bg-black text-white py-4 rounded-xl font-bold font-[family-name:var(--font-passero)] tracking-wider hover:bg-zinc-800 transition-colors text-lg"
                >
                  APPLY NOW
                </a>
             </div>
           </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
