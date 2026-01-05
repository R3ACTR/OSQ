"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Rocket, Heart, Target } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function SponsorPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Hero Animation
      tl.from(".sponsor-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      .from(".sponsor-desc", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.6")
      .from(".deck-btn", {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      }, "-=0.4");

      // Cards Animation
      gsap.from(".benefit-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".benefits-grid",
          start: "top 80%",
        }
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
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          
          <div className="sponsor-title space-y-2 mb-8">
            <h2 className="text-xl md:text-2xl font-[family-name:var(--font-passero)] text-[#bfff00] tracking-widest uppercase drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] text-stroke-black" style={{ WebkitTextStroke: "0.5px black" }}>
              PARTNER WITH US
            </h2>
            <h1 className="text-6xl md:text-8xl font-[family-name:var(--font-passero)] leading-none text-zinc-900">
              FUEL THE <br/><span className="text-black">REVOLUTION</span>
            </h1>
          </div>

          <p className="sponsor-desc text-lg md:text-xl text-zinc-600 max-w-2xl leading-relaxed mb-12">
            Join us in shaping the future of open source. Connect with passionate developers, showcase your brand, and drive innovation.
          </p>

          <div className="deck-btn relative group">
            <a 
              href="https://drive.google.com/file/d/12tjlcRXqguUuy0nxeOHTpB5-IzQV87k1/view"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-4 bg-black text-white px-10 py-5 rounded-full font-[family-name:var(--font-passero)] text-2xl tracking-wider shadow-[8px_8px_0px_0px_rgba(191,255,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(191,255,0,1)] hover:-translate-y-1 hover:bg-zinc-900 transition-all duration-300 border-2 border-black"
            >
              <span>DOWNLOAD DECK</span>
              <Download className="w-6 h-6 animate-bounce" />
            </a>
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-[#bfff00]/40 blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          <div className="benefits-grid grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full">
            <BenefitCard 
              icon={<Rocket className="w-10 h-10 text-[#bfff00]" />}
              title="Brand Exposure"
              description="Showcase your brand to thousands of developers and tech enthusiasts."
            />
            <BenefitCard 
              icon={<Target className="w-10 h-10 text-[#bfff00]" />}
              title="Talent Access"
              description="Connect with top-tier talent and potential hires from our community."
            />
            <BenefitCard 
              icon={<Heart className="w-10 h-10 text-[#bfff00]" />}
              title="Community Impact"
              description="Support the open source ecosystem and help students learn and grow."
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="benefit-card bg-black text-white p-8 rounded-3xl border border-zinc-800 hover:border-[#bfff00] transition-colors duration-300 flex flex-col items-center text-center space-y-4 group shadow-xl">
    <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-700 group-hover:bg-[#bfff00]/20 group-hover:border-[#bfff00] transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-2xl font-[family-name:var(--font-passero)] tracking-wide">{title}</h3>
    <p className="text-zinc-400 leading-relaxed font-light">{description}</p>
  </div>
);
