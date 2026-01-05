"use client";

import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Medal, Crown, Star } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface Contributor {
  rank: number;
  username: string;
  points: number;
  avatar: string;
  badges: string[];
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/leaderboard.json")
      .then((res) => res.json())
      .then((data) => {
        setLeaderboard(data.leaderboard || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch leaderboard:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Header Animation
      tl.from(".page-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      if (leaderboard.length > 0) {
        // Podium Animation
        tl.from(".podium-card", {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.2)",
        }, "-=0.5");

        // List Animation
        tl.fromTo(".leaderboard-row",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".leaderboard-list",
              start: "top 85%",
            }
          },
          "-=0.5"
        );
      } else {
        // Empty State Animation
        gsap.from(".coming-soon-content", {
          scale: 0.9,
          opacity: 0,
          duration: 1,
          delay: 0.3,
          ease: "back.out(1.7)",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [loading, leaderboard.length]);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col relative">
      <Navbar />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none" style={{ 
        backgroundImage: "radial-gradient(#a1a1aa 1px, transparent 1px)", 
        backgroundSize: "32px 32px" 
      }} />

      <main ref={containerRef} className="flex-grow pt-32 px-4 md:px-8 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="page-header text-center mb-10 space-y-4">
            <h1 className="text-6xl md:text-8xl font-[family-name:var(--font-passero)] tracking-wider">
              HALL OF <span className="text-[#bfff00] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] text-stroke-black" style={{ WebkitTextStroke: "1.5px black" }}>FAME</span>
            </h1>
            <p className="text-xl text-zinc-600 font-medium max-w-2xl mx-auto">
              Celebrating the top contributors driving open source forward.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : leaderboard.length === 0 ? (
            /* Empty State */
            <div className="coming-soon-content flex flex-col items-center justify-center py-20 text-center space-y-8 border-y border-zinc-200 bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm mt-10">
              <div className="relative">
                <Trophy size={80} className="text-zinc-300" />
                <div className="absolute -bottom-2 -right-2 bg-[#bfff00] text-black text-xs font-bold px-2 py-1 rounded-full border border-black">
                  SOON
                </div>
              </div>
              <div className="space-y-4 max-w-lg">
                <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-passero)] tracking-wide text-zinc-900">
                  RANKINGS INCOMING
                </h2>
                <p className="text-zinc-600 text-lg leading-relaxed">
                  The race hasn't started yet. Start contributing to see your name here!
                </p>
              </div>
              <button 
                className="px-8 py-3 bg-black text-white rounded-full font-[family-name:var(--font-passero)] tracking-wider hover:scale-105 hover:bg-[#bfff00] hover:text-black transition-all duration-300 shadow-lg"
                onClick={() => window.history.back()}
              >
                GO BACK HOME
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Podium Section (Top 3) */}
              <div className="flex flex-col md:flex-row justify-center items-end gap-6 md:gap-8 min-h-[400px] mb-16 pt-10">
                 {/* Rank 2 */}
                 {leaderboard[1] && (
                   <div className="podium-card order-2 md:order-1 w-full md:w-1/3 flex flex-col items-center">
                     <div className="relative mb-4 group">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-zinc-300 overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                          <Image src={leaderboard[1].avatar} alt={leaderboard[1].username} fill className="object-cover" />
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-zinc-300 text-black font-bold px-3 py-1 rounded-full text-sm shadow-md flex items-center gap-1">
                          <span className="font-[family-name:var(--font-passero)]">#2</span>
                        </div>
                     </div>
                     <div className="w-full bg-zinc-900 text-white rounded-t-2xl p-6 text-center h-[200px] flex flex-col justify-between border-t-4 border-zinc-300 shadow-xl relative overflow-hidden group">
                        <div className="relative z-10">
                          <h3 className="text-2xl font-[family-name:var(--font-passero)] tracking-wide truncate">{leaderboard[1].username}</h3>
                          <p className="text-zinc-400 font-mono mt-1">{leaderboard[1].points.toLocaleString()} PTS</p>
                        </div>
                        <div className="flex justify-center gap-1 flex-wrap relative z-10">
                           {leaderboard[1].badges.map(b => (
                             <span key={b} title={b} className="w-2 h-2 rounded-full bg-zinc-300" />
                           ))}
                        </div>
                        {/* Interactive Shine */}
                         <div className="absolute inset-0 bg-gradient-to-t from-zinc-800 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                     </div>
                   </div>
                 )}

                 {/* Rank 1 */}
                 {leaderboard[0] && (
                   <div className="podium-card order-1 md:order-2 w-full md:w-1/3 flex flex-col items-center z-10 -mt-10 md:mt-0">
                      <div className="relative mb-6">
                         <Crown className="w-12 h-12 text-[#bfff00] absolute -top-14 left-1/2 -translate-x-1/2 animate-bounce drop-shadow-md" />
                         <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#bfff00] overflow-hidden shadow-[0_0_30px_rgba(191,255,0,0.3)] group hover:scale-105 transition-transform duration-300 bg-black">
                            <Image src={leaderboard[0].avatar} alt={leaderboard[0].username} fill className="object-cover" />
                         </div>
                         <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#bfff00] text-black font-bold px-4 py-1 rounded-full text-lg shadow-lg flex items-center gap-1 border border-black">
                           <span className="font-[family-name:var(--font-passero)]">#1</span>
                         </div>
                      </div>
                      <div className="w-full bg-black text-white rounded-t-2xl p-8 text-center h-[240px] flex flex-col justify-between border-t-4 border-[#bfff00] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                         <div className="relative z-10">
                           <h3 className="text-3xl font-[family-name:var(--font-passero)] tracking-wide text-[#bfff00] truncate">{leaderboard[0].username}</h3>
                           <p className="text-white font-mono mt-2 text-xl font-bold">{leaderboard[0].points.toLocaleString()} PTS</p>
                         </div>
                         <div className="flex justify-center flex-wrap gap-2 relative z-10">
                            {leaderboard[0].badges.map(b => (
                              <span key={b} className="px-2 py-0.5 bg-[#bfff00]/20 border border-[#bfff00]/50 text-[#bfff00] text-[10px] uppercase font-bold rounded-full">
                                {b}
                              </span>
                            ))}
                         </div>
                         
                         {/* Shine Effect */}
                         <div className="absolute top-0 right-0 w-40 h-40 bg-[#bfff00]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                      </div>
                   </div>
                 )}

                 {/* Rank 3 */}
                 {leaderboard[2] && (
                   <div className="podium-card order-3 md:order-3 w-full md:w-1/3 flex flex-col items-center">
                     <div className="relative mb-4 group">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-amber-700 overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                           <Image src={leaderboard[2].avatar} alt={leaderboard[2].username} fill className="object-cover" />
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-700 text-white font-bold px-3 py-1 rounded-full text-sm shadow-md flex items-center gap-1">
                          <span className="font-[family-name:var(--font-passero)]">#3</span>
                        </div>
                     </div>
                     <div className="w-full bg-zinc-900 text-white rounded-t-2xl p-6 text-center h-[180px] flex flex-col justify-between border-t-4 border-amber-700 shadow-xl relative overflow-hidden group">
                        <div className="relative z-10">
                          <h3 className="text-2xl font-[family-name:var(--font-passero)] tracking-wide truncate">{leaderboard[2].username}</h3>
                          <p className="text-zinc-400 font-mono mt-1">{leaderboard[2].points.toLocaleString()} PTS</p>
                        </div>
                        <div className="flex justify-center gap-1 flex-wrap relative z-10">
                           {leaderboard[2].badges.map(b => (
                             <span key={b} title={b} className="w-2 h-2 rounded-full bg-amber-700" />
                           ))}
                        </div>
                         {/* Interactive Shine */}
                         <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                     </div>
                   </div>
                 )}
              </div>

              {/* Leaderboard List (Rest) */}
              <div className="leaderboard-list bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden">
                {leaderboard.slice(3).map((user, index) => (
                  <div 
                    key={user.username}
                    className="leaderboard-row flex items-center justify-between p-4 md:p-6 border-b border-zinc-100 last:border-none hover:bg-zinc-50 transition-colors duration-200 group"
                  >
                    <div className="flex items-center gap-4 md:gap-8">
                      <div className="font-mono text-zinc-400 font-bold w-8 text-center text-lg">{user.rank}</div>
                      
                      <div className="flex items-center gap-4">
                        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-100 overflow-hidden border border-zinc-200 group-hover:border-[#bfff00] transition-colors">
                           <Image src={user.avatar} alt={user.username} fill className="object-cover" />
                        </div>
                        <div>
                           <div className="font-[family-name:var(--font-passero)] text-xl tracking-wide group-hover:text-black transition-colors">{user.username}</div>
                           <div className="flex flex-wrap gap-2 mt-1 md:hidden">
                            {user.badges.map(b => (
                                <span key={b} className="text-[10px] px-1.5 py-0.5 bg-zinc-100 rounded text-zinc-500">{b}</span>
                             ))}
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                       <div className="hidden md:flex flex-wrap gap-2">
                         {user.badges.map(b => (
                            <span key={b} className="px-2 py-0.5 bg-zinc-100 border border-zinc-200 text-zinc-600 text-xs font-medium rounded-full">
                              {b}
                            </span>
                         ))}
                       </div>
                       <div className="font-mono font-bold text-lg md:text-xl min-w-[80px] text-right text-zinc-800">
                         {user.points.toLocaleString()}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
