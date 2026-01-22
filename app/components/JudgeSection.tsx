"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function JudgeSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
      },
    });

    tl.fromTo(
      ".judge-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(
      ".judge-content-left",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(
      ".judge-card",
      { opacity: 0, scale: 0.9, x: 50 },
      { opacity: 1, scale: 1, x: 0, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.6"
    );

  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full relative z-20 py-24 md:py-32 px-4 md:px-8 bg-zinc-50 border-t-2 border-zinc-200"
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        <h2 className="judge-title text-5xl md:text-7xl font-[family-name:var(--font-passero)] text-center mb-16 tracking-wider">
          MEET OUR <span className="text-[#bfff00] drop-shadow-sm stroke-black" style={{ WebkitTextStroke: "1px black" }}>JUDGE</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Content */}
            <div className="judge-content-left space-y-8 font-[family-name:var(--font-passero)]">
                <p className="text-xl md:text-2xl leading-relaxed text-zinc-800">
                    <span className="font-bold bg-[#bfff00] px-1">Praneetha Kotla</span> is a Lead Robotic Process Automation (RPA) Developer with over 11 years of industry experience across healthcare, pharmaceuticals, insurance, and enterprise systems.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-zinc-600">
                    Currently working with Johnson & Johnson in the United States, she brings strong expertise in automation, data engineering, and enterprise technology, along with experience as a speaker, mentor, and published researcher.
                </p>

                <ul className="space-y-4 text-lg md:text-xl text-zinc-700 list-disc pl-5">
                    <li><span className="font-bold">11+ years</span> of industry experience in Robotic Process Automation (RPA), Data Engineering, ETL, and Business Intelligence</li>
                    <li>Lead RPA Developer at <span className="font-bold">Johnson & Johnson (USA)</span>, working on large-scale enterprise automation solutions</li>
                    <li>Previous roles at Corewell Health, Medline Industries, USAA, and BMW India</li>
                    <li>Experience across healthcare, pharmaceuticals, insurance, telecom, and enterprise systems</li>
                    <li>Strong background in automation, data integration, and scalable application development</li>
                </ul>
            </div>

            {/* Right Column: Card */}
            <div className="flex justify-center lg:justify-end">
                <div className="judge-card w-full max-w-sm md:max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 overflow-hidden relative group">
                    {/* Image Container */}
                    <div className="relative w-full aspect-square border-b-4 border-black bg-zinc-100 flex items-center justify-center overflow-hidden">
                        <Image
                            src="/IMG_0252.jpeg"
                            alt="Praneetha Kotla"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-[#bfff00] opacity-0 group-hover:opacity-20 transition-opacity duration-300 mix-blend-multiply" />
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col items-center text-center space-y-4">
                        <h3 className="text-3xl font-[family-name:var(--font-passero)] tracking-wide">
                            Praneetha Kotla
                        </h3>
                        
                        <div className="space-y-1">
                            <p className="text-lg font-bold">Lead RPA Developer</p>
                            <p className="text-zinc-600 font-medium font-[family-name:var(--font-passero)] tracking-wider">ERP Smartlabs</p>
                        </div>

                        <Link 
                            href="https://www.linkedin.com/in/praneetha-kotla/"
                            target="_blank"
                            className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-[#bfff00] hover:text-black hover:border-black border-2 border-transparent transition-all duration-300"
                        >
                            <span>Connect on LinkedIn</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
