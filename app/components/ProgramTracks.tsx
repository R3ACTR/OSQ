"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProgramTracks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.from(".track-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      gsap.from(".common-section", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".common-section",
          start: "top 80%",
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white py-24 px-6 md:px-12 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-transparent z-0 pointer-events-none" 
         style={{
          backgroundImage: "radial-gradient(#e4e4e7 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#bfff00]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-5xl md:text-7xl font-[family-name:var(--font-passero)] text-black">
            PROGRAM <span className="text-[#bfff00] drop-shadow-sm" style={{ WebkitTextStroke: "2px black" }}>TRACKS</span>
          </h2>
          <p className="text-xl md:text-2xl text-zinc-600 font-light max-w-3xl mx-auto font-[family-name:var(--font-passero)] tracking-wide">
            Open Source Quest offers two contribution tracks designed to support learners at different experience levels.
            Both tracks follow real open-source workflows, with guidance from mentors.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* Foundation Track */}
          <div className="track-card bg-white border-4 border-black rounded-3xl p-8 md:p-10 relative group overflow-hidden">
             
            <div className="flex items-center gap-4 mb-6">
              <span className="w-6 h-6 rounded-full bg-green-500 block"></span>
              <h3 className="text-3xl md:text-4xl font-[family-name:var(--font-passero)] text-black">Foundation Track</h3>
            </div>
            
            <p className="text-[#10b981] font-bold font-mono text-lg mb-6 tracking-wide bg-green-50 inline-block px-3 py-1 rounded-lg border border-green-200">For Beginners</p>
            <p className="text-zinc-600 text-lg mb-8 font-medium">
              A guided track for participants who are new to open source and GitHub. Participants complete milestone-based tasks that introduce core open-source concepts step by step.
            </p>

            <div className="space-y-4 mb-8">
              <h4 className="text-black font-bold text-lg font-[family-name:var(--font-passero)] tracking-wide">What you'll do:</h4>
              <ul className="space-y-2 text-zinc-600 font-medium">
                <li className="flex items-start gap-3"><span className="text-black font-bold mt-1">✓</span> Learn Git & GitHub fundamentals</li>
                <li className="flex items-start gap-3"><span className="text-black font-bold mt-1">✓</span> Work on beginner-friendly issues</li>
                <li className="flex items-start gap-3"><span className="text-black font-bold mt-1">✓</span> Improve documentation and small features</li>
                <li className="flex items-start gap-3"><span className="text-black font-bold mt-1">✓</span> Submit structured pull requests</li>
                <li className="flex items-start gap-3"><span className="text-black font-bold mt-1">✓</span> Understand reviews and collaboration</li>
              </ul>
            </div>

            <p className="text-sm font-mono text-zinc-500 pt-6 border-t-2 border-zinc-100">
              Best for: First-time contributors and learners building confidence.
            </p>
          </div>

          {/* Advanced Track */}
          <div className="track-card bg-white border-4 border-black rounded-3xl p-8 md:p-10 relative group overflow-hidden">

            <div className="flex items-center gap-4 mb-6">
              <span className="w-6 h-6 rounded-full bg-blue-500 block"></span>
              <h3 className="text-3xl md:text-4xl font-[family-name:var(--font-passero)] text-black">Advanced Track</h3>
            </div>
            
            <p className="text-blue-600 font-bold font-mono text-lg mb-6 tracking-wide bg-blue-50 inline-block px-3 py-1 rounded-lg border border-blue-200">For Experienced Contributors</p>
            <p className="text-zinc-600 text-lg mb-8 font-medium">
              A self-driven track focused on real-world projects and meaningful improvements. Participants independently explore assigned repositories and contribute through professional pull requests.
            </p>

            <div className="space-y-4 mb-8">
              <h4 className="text-black font-bold text-lg font-[family-name:var(--font-passero)] tracking-wide">What you'll do:</h4>
              <ul className="space-y-2 text-zinc-600 font-medium">
                <li className="flex items-start gap-3"><span className="text-black font-bold mt-1">✓</span> Analyze existing codebases</li>
                <li className="flex items-start gap-3"><span className="text-black font-bold mt-1">✓</span> Identify bugs, improvements, or feature gaps</li>
                <li className="flex items-start gap-3"><span className="text-black font-bold mt-1">✓</span> Implement enhancements or refactors</li>
                <li className="flex items-start gap-3"><span className="text-black font-bold mt-1">✓</span> Create detailed pull requests with rationale</li>
                <li className="flex items-start gap-3"><span className="text-black font-bold mt-1">✓</span> Respond to mentor and reviewer feedback</li>
              </ul>
            </div>

            <p className="text-sm font-mono text-zinc-500 pt-6 border-t-2 border-zinc-100">
              Best for: Participants comfortable with GitHub seeking real-world experience.
            </p>
          </div>

        </div>

        {/* Common Section */}
        <div className="common-section bg-zinc-50 rounded-2xl p-8 border-2 border-zinc-200 text-center max-w-4xl mx-auto mb-16 shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="M7 21h10"></path><path d="M12 3v18"></path><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path></svg>
            <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-passero)] text-black">Common to Both Tracks</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {["Individual participation", "Mentor guidance available", "Contributions via GitHub", "Focus on quality & learning"].map((item, i) => (
              <span key={i} className="px-4 py-2 bg-white rounded-full border-2 border-black text-black font-bold text-sm md:text-base font-mono shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all duration-200 cursor-default">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Micro Tagline */}
        <div className="text-center">
          <p className="text-2xl md:text-4xl font-[family-name:var(--font-passero)] text-black opacity-80 animate-pulse">
            Two tracks. One goal — <span className="text-[#bfff00]" style={{ WebkitTextStroke: "1px black" }}>real open-source experience.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
