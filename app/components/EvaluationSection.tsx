"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EvaluationSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const cards = gsap.utils.toArray(".eval-card");
      cards.forEach((card: any, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        });
      });

      gsap.from(".track-score-info", {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".track-score-info",
          start: "top 80%",
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-zinc-950 py-24 px-6 md:px-12 relative overflow-hidden border-t border-zinc-900">
      
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#bfff00]/30 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-passero)] text-white leading-tight">
            EVALUATION & <br/>
            <span className="text-[#bfff00]">GIT ENGINE SCORING</span>
          </h2>
          <p className="text-xl text-zinc-400 font-light max-w-3xl mx-auto">
            Open Source Quest follows a transparent, mentor-guided evaluation system supported by our internal contribution tracking platform.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* Git Engine */}
          <div className="eval-card bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl hover:border-[#bfff00]/50 transition-colors duration-300">
            <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <h3 className="text-2xl text-white font-[family-name:var(--font-passero)] mb-4">Contribution Tracking</h3>
            <p className="text-zinc-400 mb-6">
              <strong className="text-white">Git Engine</strong> is a live system that tracks participant activity across repositories in real time.
            </p>
            <ul className="space-y-2 text-zinc-500 text-sm font-mono">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#bfff00]" /> Pull requests opened & merged</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#bfff00]" /> Issues worked on & resolved</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#bfff00]" /> Commit activity & consistency</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#bfff00]" /> Review participation</li>
            </ul>
          </div>

          {/* Auto-Score */}
          <div className="eval-card bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl hover:border-[#bfff00]/50 transition-colors duration-300">
            <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white mb-6">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </div>
            <h3 className="text-2xl text-white font-[family-name:var(--font-passero)] mb-4">Auto-Score System</h3>
            <p className="text-zinc-400 mb-6">
              Generates an auto score based on contribution activity patterns to visualize progress.
            </p>
             <ul className="space-y-2 text-zinc-500 text-sm font-mono">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Visualize activity levels</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Encourage regular participation</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Detect inactivity early</li>
            </ul>
            <div className="mt-6 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-yellow-500 text-xs">The auto score reflects activity trends, not final rankings.</p>
            </div>
          </div>

          {/* Weekly Highlights */}
          <div className="eval-card bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl hover:border-[#bfff00]/50 transition-colors duration-300">
            <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
            </div>
            <h3 className="text-2xl text-white font-[family-name:var(--font-passero)] mb-4">Weekly Highlights</h3>
            <p className="text-zinc-400 mb-4">
              Mentors shortlist contributors based on impact, quality, and consistency at the end of each week.
            </p>
             <p className="text-zinc-500 text-sm border-l-2 border-zinc-700 pl-4 italic">
              "Designed to motivate learning, not create competitive pressure."
            </p>
          </div>

           {/* Final Recognition */}
          <div className="eval-card bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl hover:border-[#bfff00]/50 transition-colors duration-300">
            <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
            </div>
            <h3 className="text-2xl text-white font-[family-name:var(--font-passero)] mb-4">Final Recognition</h3>
            <p className="text-zinc-400 mb-6">
              Based on a holistic mentor review evaluating quality, consistency, and professional collaboration.
            </p>
            <div className="flex flex-wrap gap-2">
               {["Quality & Impact", "Consistency", "Learning Progress", "Communication"].map((tag, i) => (
                 <span key={i} className="px-3 py-1 bg-zinc-950 rounded-full border border-zinc-800 text-xs text-zinc-400">{tag}</span>
               ))}
            </div>
          </div>

        </div>

        {/* Tracks Info */}
        <div className="track-score-info flex flex-col md:flex-row gap-6 mb-16">
            <div className="flex-1 bg-[#10b981]/10 border border-[#10b981]/20 p-6 rounded-2xl">
              <h4 className="text-[#10b981] font-bold mb-2 flex items-center gap-2">
                 <span className="w-3 h-3 rounded-full bg-[#10b981]"></span>
                 Foundation Track
              </h4>
              <p className="text-zinc-400 text-sm">Emphasis on learning progress, milestone completion, and correct workflow usage.</p>
           </div>
           <div className="flex-1 bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl">
              <h4 className="text-blue-500 font-bold mb-2 flex items-center gap-2">
                 <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                 Advanced Track
              </h4>
              <p className="text-zinc-400 text-sm">Emphasis on independent problem identification, real-world improvements, and code quality.</p>
           </div>
        </div>

        {/* Transparency Note */}
        <div className="max-w-3xl mx-auto text-center bg-zinc-900 rounded-xl p-6 border border-zinc-800 mb-16">
          <p className="text-zinc-300 text-sm md:text-base">
            <span className="text-[#bfff00] font-bold">Important Note:</span> Git Engine is a monitoring and assistance tool. Final recognitions are mentor-reviewed to ensure fairness, quality, and learning outcomes.
          </p>
        </div>

        {/* Micro-line */}
        <div className="text-center opacity-60">
           <p className="font-[family-name:var(--font-passero)] text-zinc-500 tracking-[0.2em] text-sm uppercase">
             Track progress. Learn consistently. Earn recognition.
           </p>
        </div>

      </div>
    </section>
  );
}
