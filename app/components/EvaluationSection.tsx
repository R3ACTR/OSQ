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
            The evaluation in Open Source Quest (OSQ) is designed to recognize meaningful contributions, consistency, and learning impact, rather than raw activity counts. Judging combines automated GitHub-based metrics with human qualitative assessment.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* Git Engine – Automated Metrics */}
          <div className="eval-card bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl hover:border-[#bfff00]/50 transition-colors duration-300">
            <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <h3 className="text-2xl text-white font-[family-name:var(--font-passero)] mb-4">Git Engine – Automated Metrics</h3>
            <p className="text-zinc-400 mb-6">
              The following parameters are automatically calculated by the OSQ Git Engine system:
            </p>
            <ul className="space-y-2 text-zinc-500 text-sm font-mono">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#bfff00]" /> Pull Requests Merged & Opened</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#bfff00]" /> Issues Created and Closed</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#bfff00]" /> Commit Activity</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#bfff00]" /> Code Reviews and Review Participation</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#bfff00]" /> Contribution Consistency Over Time</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#bfff00]" /> Repository-wise Contribution Distribution</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-zinc-800">
               <p className="text-zinc-300 text-sm italic">These metrics together form the Base Score for each participant.</p>
            </div>
          </div>

          {/* Repository-wise Judge Score */}
          <div className="eval-card bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl hover:border-[#bfff00]/50 transition-colors duration-300">
            <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white mb-6">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </div>
            <h3 className="text-2xl text-white font-[family-name:var(--font-passero)] mb-4">Repository-wise Judge Score</h3>
            <p className="text-zinc-400 mb-6">
              In addition to automated metrics, judges assign a Repository Quality Score ranging from 1 to 10, based on:
            </p>
             <ul className="space-y-2 text-zinc-500 text-sm font-mono">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Overall quality of contributions</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Impact and relevance of work</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Code clarity and professionalism</li>
            </ul>
             <div className="mt-4 pt-4 border-t border-zinc-800">
               <p className="text-zinc-300 text-sm italic">This score is applied repository-wise and proportionally affects the scores of contributors working on that repository.</p>
            </div>
          </div>

          {/* Final Score Calculation */}
          <div className="eval-card bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl hover:border-[#bfff00]/50 transition-colors duration-300 flex flex-col justify-between">
            <div>
                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                </div>
                <h3 className="text-2xl text-white font-[family-name:var(--font-passero)] mb-4">Final Score Calculation</h3>
                <p className="text-zinc-400 mb-4">
                  The final score for each participant is calculated as:
                </p>
                <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-700 text-center mb-4">
                    <code className="text-[#bfff00] font-mono text-sm md:text-base">FinalScore = 0.7 × BaseScore + 0.3 × NormalizedJudgeScore</code>
                </div>
            </div>
          </div>

           {/* Leaderboard Updates */}
          <div className="eval-card bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl hover:border-[#bfff00]/50 transition-colors duration-300">
            <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
            </div>
            <h3 className="text-2xl text-white font-[family-name:var(--font-passero)] mb-4">Leaderboard Updates</h3>
            <p className="text-zinc-400 mb-6">
              The weekly leaderboard is updated based on the Final Score.
            </p>
            <ul className="space-y-4">
                <li className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-[#bfff00]" />
                    <span className="text-zinc-400 text-sm">Automated metrics ensure transparency and consistency</span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-[#bfff00]" />
                    <span className="text-zinc-400 text-sm">Judge scores ensure quality and real-world impact are fairly represented</span>
                </li>
            </ul>
          </div>

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
