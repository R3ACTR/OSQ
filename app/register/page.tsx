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
      // Entrance Animation
      gsap.from(".register-content", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      });

      gsap.from(".floating-icon", {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.5,
        ease: "power2.out",
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

      <main className="flex-grow pt-24 md:pt-32 pb-10 md:pb-20 relative z-10 flex flex-col items-center justify-center px-4">
        <div className="register-content max-w-2xl w-full bg-white/50 backdrop-blur-sm p-8 py-12 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-zinc-200 text-center shadow-2xl relative mx-auto mt-8 md:mt-0">
           
           {/* Floating Icons Decoration */}
           <div className="absolute -top-4 -left-2 md:-top-6 md:-left-6 bg-black text-[#bfff00] p-3 md:p-4 rounded-2xl md:rounded-3xl floating-icon shadow-lg transform -rotate-12 scale-75 md:scale-100">
             <Ticket size={32} />
           </div>
           <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 bg-[#bfff00] text-black p-3 md:p-4 rounded-2xl md:rounded-3xl floating-icon shadow-lg transform rotate-12 scale-75 md:scale-100">
             <Calendar size={32} />
           </div>

           <div className="space-y-4 md:space-y-6">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-100 rounded-full text-zinc-500 font-bold text-xs md:text-sm tracking-widest uppercase mb-2 md:mb-4">
                <span className="w-2 h-2 bg-[#bfff00] rounded-full animate-pulse"/>
                Coming Soon
             </div>

             <h1 className="text-4xl sm:text-5xl md:text-7xl font-[family-name:var(--font-passero)] leading-none text-zinc-900">
               REGISTRATION<br/>
               <span className="text-zinc-400">IS CLOSED</span>
             </h1>

             <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-md mx-auto px-2">
               We are preparing something extraordinary. The gates will open soon for the next cohort of innovators.
             </p>

             <div className="pt-8">
               <p className="mt-4 text-sm text-zinc-400">
                 Check back later for updates.
               </p>
             </div>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
