"use client";
import React from "react";

export default function LearnGithubSection() {
  return (
    <section className="w-full bg-white py-24 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Decor - Subtle Grid */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{
        backgroundImage: "radial-gradient(#e4e4e7 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />

      <div className="max-w-5xl w-full flex flex-col items-center relative z-10">
        
        {/* Text Content */}
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-5xl md:text-7xl font-[family-name:var(--font-passero)] text-black leading-[1.1]">
            DON'T KNOW <span className="text-[#bfff00] inline-block transform hover:scale-105 transition-transform duration-300 drop-shadow-sm" style={{ WebkitTextStroke: "2px black" }}>GITHUB?</span>
          </h2>
          <p className="text-xl md:text-2xl text-zinc-600 font-light tracking-wide max-w-2xl mx-auto font-[family-name:var(--font-passero)]">
            Learn it today and take part in the competition.
          </p>
        </div>

        {/* Video Wrapper */}
        <div className="relative w-full max-w-4xl group">
          {/* Shadow Effect */}
          <div className="absolute -inset-2 bg-black rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur-sm"></div>
          
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border-4 border-black shadow-2xl z-10">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/S7XpTAnSDL4?si=pHTbVLJaU3lKE6DA"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
