"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "./components/About";
import MarqueeSection from "./components/MarqueeSection";
import LeaderboardInfo from "./components/LeaderboardInfo";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Hero Logo Animation
      tl.from(".hero-logo", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      })
      // Action Buttons Animation
      .from(".hero-btn", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      }, "-=0.6") // Overlap with logo animation
      // Trusted By Section Animation
      .from(".hero-trusted", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
      }, "-=0.4");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative flex min-h-screen w-full flex-col items-center justify-center bg-white overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none" style={{
        backgroundImage: "radial-gradient(#e4e4e7 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-[100] animate-bounce-slow hover:animate-none">
        <Link 
          href="/sbce" 
          className="relative block w-16 h-16 md:w-20 md:h-20 bg-white rounded-full p-2 shadow-2xl border-4 border-black hover:scale-110 transition-transform duration-300 overflow-hidden"
        >
          <Image
            src="/partners/sbce.png"
            alt="SBCE"
            fill
            className="object-contain p-2"
          />
        </Link>
      </div>

      <main className="relative z-10 flex flex-col items-center w-full min-h-screen pt-32 md:pt-40">
        <div className="w-full px-4 flex flex-col items-center">
            {/* Hero Logo */}
            <div className="hero-logo flex items-center justify-center w-full max-w-xl aspect-video relative">
              <Image
                src="/osqb.svg"
                alt="OSQB Logo"
                fill
                className="object-contain selection:bg-transparent"
                priority
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
              <div className="hero-btn">
                <Link 
                  href="/register"
                  className="inline-block px-12 py-4 bg-black text-white rounded-full font-[family-name:var(--font-passero)] text-2xl tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  REGISTER
                </Link>
              </div>

              <div className="hero-btn">
                <Link 
                  href="/sponsor"
                  className="inline-block px-12 py-4 bg-[#bfff00] text-black rounded-full font-[family-name:var(--font-passero)] text-2xl tracking-wider shadow-xl border-4 border-black hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  SPONSOR
                </Link>
              </div>
            </div>

            {/* Sponsor Section */}
            <div className="hero-trusted mt-20 flex flex-col items-center gap-10 pb-20">
              <span className="font-[family-name:var(--font-passero)] text-zinc-500 tracking-[0.3em] text-sm">PARTNERS</span>
              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 opacity-70 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
                 {[
                   { src: "/partners/sbce.png", alt: "SBCE", width: 80, href: "/sbce" },
                   { src: "/partners/ieee.png", alt: "IEEE", width: 100, href: "/ieee" },
                   { src: "/partners/IEDC Logo-Photoroom.png", alt: "IEDC", width: 100 },
                   { src: "/partners/cse.png", alt: "CSE", width: 60 },
                   { src: "/partners/ai.png", alt: "AI", width: 60 },
                 ].map((partner) => {
                   const content = (
                     <div className="relative h-10 w-auto flex items-center justify-center transition-transform hover:scale-110 duration-300">
                       <Image 
                         src={partner.src} 
                         alt={partner.alt} 
                         width={partner.width} 
                         height={40} 
                         className="object-contain h-full w-auto"
                       />
                     </div>
                   );

                   if (partner.href) {
                     return (
                       <Link key={partner.alt} href={partner.href}>
                         {content}
                       </Link>
                     );
                   }

                   return <div key={partner.alt}>{content}</div>;
                 })}
              </div>
            </div>
        </div>

        {/* Full Screen GIF Section */}
        <div className="w-full relative h-[400px] md:h-[600px] mt-10">
          <Image
            src="https://camo.githubusercontent.com/f63e22ea6f6b43ec238a4cd59f987675b38bf101effcd153812b26d6b6829174/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f7375706572666f6c696f2f696d6167652f75706c6f61642f76313632303638393937392f36383734373437303733336132663266363932653730363936653639366436373265363336663664326636663732363936373639366536313663373332663633333632663333333332663633333232663633333633333333363333323330363536343635333833323636333036353330363336353634333736343335333733303634363236353333363133313636333332653637363936365f796a756832732e676966"
            alt="Showcase"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        <About />

        <MarqueeSection />

        <LeaderboardInfo />
      </main>

      <Footer />
    </div>
  );
}




