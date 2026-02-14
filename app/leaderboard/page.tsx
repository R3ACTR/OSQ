"use client";

import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Trophy, Medal, Crown, Star, GitPullRequest, GitCommit, MessageSquare, Github, Linkedin, Link as LinkIcon, RotateCw, Download, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useValentineEvent } from "../hooks/useValentineEvent";

interface Contributor {
  id: string; // Unique identifier
  rank: number;
  username: string;
  points: number;
  avatar: string;
  badges: string[];
  prs: number;
  commits: number;
  reviews: number;
  github?: string;
  linkedin?: string;
}

export default function LeaderboardPage() {
  const { isEventActive, timeRemaining, nextEventLabel } = useValentineEvent();
  const [leaderboard, setLeaderboard] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://osq-config-api.sreehari14shr.workers.dev", { cache: "no-store" });
      const data = await res.json();
      
      // Helper to find key case-insensitively
      const getValue = ((obj: any, key: string) => {
         const foundKey = Object.keys(obj).find(k => k.toLowerCase() === key.toLowerCase());
         return foundKey ? obj[foundKey] : undefined;
      });

      // Filter participants and sort by score descending
      const sortedData = data
        .filter((user: any) => user.Role === "participants" && (getValue(user, "score") || 0) > 0)
        .sort((a: any, b: any) => (getValue(b, "score") || 0) - (getValue(a, "score") || 0));

      const formattedLeaderboard = sortedData.map((user: any, index: number) => {
        let avatarUrl = user.AvatarUrl;
        if (!avatarUrl && user.GitHub) {
           const parts = user.GitHub.replace(/\/$/, "").split("/");
           const username = parts[parts.length - 1];
           if (username) avatarUrl = `https://github.com/${username}.png`;
        }
        if (!avatarUrl) avatarUrl = "https://avatars.githubusercontent.com/u/0?v=4";

        // Generate a unique ID
        const uniqueId = user.UniqueTag || user.Email || user.GitHub || `${user.FullName}-${index}`;

        const points = getValue(user, "score") || 0;

        return {
          id: uniqueId,
          rank: index + 1,
          username: user.FullName || "Anonymous",
          points,
          avatar: avatarUrl,
          badges: [], // API doesn't provide badges yet
          prs: Number(getValue(user, "prs")) || 0,
          commits: Number(getValue(user, "commits")) || 0,
          reviews: Number(getValue(user, "reviews")) || 0,
          github: getValue(user, "github"),
          linkedin: getValue(user, "linkedin")
        };
      });

      setLeaderboard(formattedLeaderboard);
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isEventActive]);

  const handleRefresh = () => {
    fetchData();
  };

  const handleExportPDF = async () => {
    try {
      const jsPDF = (await import("jspdf")).default;
      const autoTable = (await import("jspdf-autotable")).default;

      const doc = new jsPDF();
      
      // Title
      doc.setFontSize(20);
      doc.text("OSQ Hall of Fame Leaderboard", 14, 22);
      
      // Date
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

      // Table Data
      const tableData = leaderboard.map(user => [
        user.rank,
        user.username,
        user.points.toLocaleString(),
        user.prs,
        user.commits,
        user.reviews
      ]);

      // Generate Table
      autoTable(doc, {
        startY: 35,
        head: [['Rank', 'Contributor', 'Points', 'PRs', 'Commits', 'Reviews']],
        body: tableData,
        theme: 'grid',
        headStyles: { 
          fillColor: [0, 0, 0], 
          textColor: [191, 255, 0],
          fontStyle: 'bold'
        },
        styles: { 
          fontSize: 10,
          cellPadding: 3
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        }
      });

      doc.save("osq-leaderboard.pdf");
    } catch (error) {
      console.error("Failed to export PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 40, 
        damping: 15,
        mass: 1 
      } 
    }
  };

  const podiumVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 50, 
        damping: 15,
        mass: 1.2
      } 
    }
  };

  return (
    <div className={`min-h-screen flex flex-col relative transition-colors duration-500 ${isEventActive ? 'bg-pink-50' : 'bg-zinc-50'}`}>
      <Navbar />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none" style={{ 
        backgroundImage: "radial-gradient(#a1a1aa 1px, transparent 1px)", 
        backgroundSize: "32px 32px" 
      }} />

      <main className="flex-grow pt-32 px-4 md:px-8 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="page-header text-center mb-28 space-y-4"
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-[family-name:var(--font-passero)] tracking-wider px-2">
              HALL OF <span className={`drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] text-stroke-black transition-colors duration-500 ${isEventActive ? 'text-pink-500' : 'text-[#bfff00]'}`} style={{ WebkitTextStroke: "1px black" }}>FAME</span>
            </h1>
            
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <button 
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-zinc-200 rounded-full hover:border-black hover:bg-zinc-50 transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm"
              >
                <div className={`${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`}>
                  <RotateCw size={16} />
                </div>
                <span>{loading ? 'Refreshing...' : 'Refresh Board'}</span>
              </button>
              
              <button 
                onClick={handleExportPDF}
                disabled={loading || leaderboard.length === 0}
                className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white rounded-full hover:bg-black hover:scale-105 transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <Download size={16} />
                 <span>Export to PDF</span>
              </button>
            </div>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : leaderboard.length === 0 ? (
            /* Empty State */
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="coming-soon-content flex flex-col items-center justify-center py-20 text-center space-y-8 border-y border-zinc-200 bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm mt-10 mx-4"
            >
              <div className="relative">
                <Trophy size={60} className="text-zinc-300 md:w-20 md:h-20" />
                <div className="absolute -bottom-2 -right-2 bg-[#bfff00] text-black text-[10px] md:text-xs font-bold px-2 py-1 rounded-full border border-black">
                  SOON
                </div>
              </div>
              <div className="space-y-4 max-w-lg px-4">
                <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-passero)] tracking-wide text-zinc-900">
                  RANKINGS INCOMING
                </h2>
                <p className="text-zinc-600 text-base md:text-lg leading-relaxed">
                  The race hasn't started yet. Start contributing to see your name here!
                </p>
              </div>
              <button 
                className="px-6 py-3 md:px-8 md:py-3 bg-black text-white rounded-full font-[family-name:var(--font-passero)] tracking-wider hover:scale-105 hover:bg-[#bfff00] hover:text-black transition-all duration-300 shadow-lg text-sm md:text-base"
                onClick={() => window.history.back()}
              >
                GO BACK HOME
              </button>
            </motion.div>
          ) : (
            <motion.div 
              className="space-y-12"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {/* Podium Section (Top 3) */}
              <div className="flex flex-col md:flex-row justify-center items-end gap-10 md:gap-8 min-h-auto md:min-h-[400px] mb-16 pt-10">
                 {/* Rank 2 */}
                 {leaderboard[1] && (
                   <motion.div variants={podiumVariants} className="podium-card order-2 md:order-1 w-full md:w-1/3 flex flex-col items-center">
                     <div className="relative mb-4 group">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-zinc-300 overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300 transform-gpu isolation-isolate">
                          <Image src={leaderboard[1].avatar} alt={leaderboard[1].username} fill className="object-cover" />
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-zinc-300 text-black font-bold px-3 py-1 rounded-full text-sm shadow-md flex items-center gap-1">
                          <span className="font-[family-name:var(--font-passero)]">#2</span>
                        </div>
                     </div>
                     <div className="w-full max-w-[320px] md:max-w-none bg-zinc-900 text-white rounded-2xl md:rounded-t-2xl md:rounded-b-none p-6 text-center h-auto md:h-[200px] flex flex-col justify-between border-t-4 border-zinc-300 shadow-xl relative overflow-hidden group">
                        <div className="relative z-10 w-full flex flex-col items-center h-full justify-between gap-4 md:gap-0">
                          <div>
                            <h3 className="text-2xl font-[family-name:var(--font-passero)] tracking-wide truncate max-w-[200px]">{leaderboard[1].username}</h3>
                            <p className="text-zinc-400 font-mono mt-1 mb-2">{leaderboard[1].points.toLocaleString()} PTS</p>
                            <div className="flex justify-center gap-3 text-xs text-zinc-400 mb-2">
                              <div className="flex items-center gap-1" title="Pull Requests"><GitPullRequest size={12}/> {leaderboard[1].prs ?? 0}</div>
                              <div className="flex items-center gap-1" title="Commits"><GitCommit size={12}/> {leaderboard[1].commits ?? 0}</div>
                            </div>
                          </div>
                          
                          <div className="flex justify-center gap-3 mt-auto">
                            {leaderboard[1].github && leaderboard[1].github !== "Nil" && (
                              <Link href={leaderboard[1].github} target="_blank" className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 hover:scale-110 transition-all text-white">
                                <Github size={16} />
                              </Link>
                            )}
                            {leaderboard[1].linkedin && leaderboard[1].linkedin !== "Nil" && (
                              <Link href={leaderboard[1].linkedin} target="_blank" className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 hover:scale-110 transition-all text-[#0077b5]">
                                <Linkedin size={16} />
                              </Link>
                            )}
                          </div>
                        </div>

                        {/* Interactive Shine */}
                         <div className="absolute inset-0 bg-gradient-to-t from-zinc-800 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
                     </div>
                   </motion.div>
                 )}

                 {/* Rank 1 */}
                 {leaderboard[0] && (
                   <motion.div variants={podiumVariants} className="podium-card order-1 md:order-2 w-full md:w-1/3 flex flex-col items-center z-10 mt-0 md:-mt-10">
                      <div className="relative mb-6">
                         <Crown className="w-12 h-12 text-[#bfff00] absolute -top-14 left-1/2 -translate-x-1/2 animate-bounce drop-shadow-md" />
                         <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#bfff00] overflow-hidden shadow-[0_0_30px_rgba(191,255,0,0.3)] group hover:scale-105 transition-transform duration-300 bg-black transform-gpu isolation-isolate">
                            <Image src={leaderboard[0].avatar} alt={leaderboard[0].username} fill className="object-cover" />
                         </div>
                         <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#bfff00] text-black font-bold px-4 py-1 rounded-full text-lg shadow-lg flex items-center gap-1 border border-black">
                           <span className="font-[family-name:var(--font-passero)]">#1</span>
                         </div>
                      </div>
                      <div className="w-full max-w-[320px] md:max-w-none bg-black text-white rounded-2xl md:rounded-t-2xl md:rounded-b-none p-8 text-center h-auto md:h-[280px] flex flex-col justify-between border-t-4 border-[#bfff00] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                         <div className="relative z-10 w-full flex flex-col items-center h-full justify-between gap-4 md:gap-0">
                           <div>
                              <h3 className={`text-3xl font-[family-name:var(--font-passero)] tracking-wide truncate max-w-[220px] ${isEventActive ? 'text-pink-500' : 'text-[#bfff00]'}`}>{leaderboard[0].username}</h3>
                              <p className="text-white font-mono mt-2 text-xl font-bold mb-3">{leaderboard[0].points.toLocaleString()} PTS</p>
                              <div className="flex justify-center gap-3 text-sm text-zinc-300 mb-2">
                                <div className={`flex items-center gap-1 ${isEventActive ? 'text-pink-500' : 'text-[#bfff00]'}`} title="Pull Requests"><GitPullRequest size={14}/> {leaderboard[0].prs ?? 0}</div>
                                <div className={`flex items-center gap-1 ${isEventActive ? 'text-pink-500' : 'text-[#bfff00]'}`} title="Commits"><GitCommit size={14}/> {leaderboard[0].commits ?? 0}</div>
                              </div>
                           </div>

                           <div className="flex justify-center gap-3 mt-auto">
                            {leaderboard[0].github && leaderboard[0].github !== "Nil" && (
                              <Link href={leaderboard[0].github} target="_blank" className={`p-2 bg-zinc-900 border border-zinc-800 rounded-full hover:text-black hover:border-black hover:scale-110 transition-all text-white ${isEventActive ? 'hover:bg-pink-500' : 'hover:bg-[#bfff00]'}`}>
                                <Github size={20} />
                              </Link>
                            )}
                            {leaderboard[0].linkedin && leaderboard[0].linkedin !== "Nil" && (
                              <Link href={leaderboard[0].linkedin} target="_blank" className="p-2 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] hover:scale-110 transition-all text-[#0077b5]">
                                <Linkedin size={20} />
                              </Link>
                            )}
                           </div>
                         </div>
                         
                         {/* Shine Effect */}
                         <div className="absolute top-0 right-0 w-40 h-40 bg-[#bfff00]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                      </div>
                   </motion.div>
                 )}

                 {/* Rank 3 */}
                 {leaderboard[2] && (
                   <motion.div variants={podiumVariants} className="podium-card order-3 md:order-3 w-full md:w-1/3 flex flex-col items-center">
                     <div className="relative mb-4 group">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-amber-700 overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300 transform-gpu isolation-isolate">
                           <Image src={leaderboard[2].avatar} alt={leaderboard[2].username} fill className="object-cover" />
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-700 text-white font-bold px-3 py-1 rounded-full text-sm shadow-md flex items-center gap-1">
                          <span className="font-[family-name:var(--font-passero)]">#3</span>
                        </div>
                     </div>
                     <div className="w-full max-w-[320px] md:max-w-none bg-zinc-900 text-white rounded-2xl md:rounded-t-2xl md:rounded-b-none p-6 text-center h-auto md:h-[200px] flex flex-col justify-between border-t-4 border-amber-700 shadow-xl relative overflow-hidden group">
                        <div className="relative z-10 w-full flex flex-col items-center h-full justify-between gap-4 md:gap-0">
                          <div>
                            <h3 className="text-2xl font-[family-name:var(--font-passero)] tracking-wide truncate max-w-[200px]">{leaderboard[2].username}</h3>
                            <p className="text-zinc-400 font-mono mt-1 mb-2">{leaderboard[2].points.toLocaleString()} PTS</p>
                            <div className="flex justify-center gap-3 text-xs text-zinc-400 mb-2">
                              <div className="flex items-center gap-1" title="Pull Requests"><GitPullRequest size={12}/> {leaderboard[2].prs ?? 0}</div>
                              <div className="flex items-center gap-1" title="Commits"><GitCommit size={12}/> {leaderboard[2].commits ?? 0}</div>
                            </div>
                          </div>

                          <div className="flex justify-center gap-3 mt-auto">
                            {leaderboard[2].github && leaderboard[2].github !== "Nil" && (
                              <Link href={leaderboard[2].github} target="_blank" className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 hover:scale-110 transition-all text-white">
                                <Github size={16} />
                              </Link>
                            )}
                            {leaderboard[2].linkedin && leaderboard[2].linkedin !== "Nil" && (
                              <Link href={leaderboard[2].linkedin} target="_blank" className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 hover:scale-110 transition-all text-[#0077b5]">
                                <Linkedin size={16} />
                              </Link>
                            )}
                          </div>
                        </div>

                         {/* Interactive Shine */}
                         <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
                     </div>
                   </motion.div>
                 )}
              </div>

              {/* Leaderboard List (Rest) */}
              <div className="leaderboard-list bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden">
                {leaderboard.slice(3).map((user, index) => (
                  <motion.div 
                    variants={itemVariants}
                    key={user.id}
                    className="leaderboard-row flex items-center justify-between p-4 md:p-6 border-b border-zinc-100 last:border-none hover:bg-zinc-50 transition-colors duration-200 group"
                  >
                    <div className="flex items-center gap-4 md:gap-8 overflow-hidden">
                      <div className="font-mono text-zinc-400 font-bold w-8 text-center text-lg shrink-0">{user.rank}</div>
                      
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-100 overflow-hidden border border-zinc-200 transition-colors shrink-0 ${isEventActive ? 'group-hover:border-pink-500' : 'group-hover:border-[#bfff00]'}`}>
                           <Image src={user.avatar} alt={user.username} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                           <div className="font-[family-name:var(--font-passero)] text-xl tracking-wide group-hover:text-black transition-colors truncate">{user.username}</div>
                           <div className="flex gap-3 text-xs text-zinc-400 mt-1 items-center">
                              <span className="flex items-center gap-1 md:hidden"><GitPullRequest size={12}/> {user.prs ?? 0}</span>
                              <span className="flex items-center gap-1 md:hidden mr-2"><GitCommit size={12}/> {user.commits ?? 0}</span>
                              
                              <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                                {user.github && user.github !== "Nil" && (
                                  <Link href={user.github} target="_blank" className="text-zinc-400 hover:text-black hover:scale-110 transition-all">
                                    <Github size={14} />
                                  </Link>
                                )}
                                {user.linkedin && user.linkedin !== "Nil" && (
                                  <Link href={user.linkedin} target="_blank" className="text-zinc-400 hover:text-[#0077b5] hover:scale-110 transition-all">
                                    <Linkedin size={14} />
                                  </Link>
                                )}
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 pl-4 shrink-0">
                       <div className="hidden md:flex items-center gap-6 mr-4">
                          <div className="flex flex-col items-center" title="Pull Requests">
                            <span className="text-xs text-zinc-400 uppercase font-bold text-[10px]">PRs</span>
                            <span className="font-mono font-bold text-zinc-700 flex items-center gap-1">
                              <GitPullRequest size={14} className="text-purple-500" /> {user.prs ?? 0}
                            </span>
                          </div>
                          <div className="flex flex-col items-center" title="Commits">
                            <span className="text-xs text-zinc-400 uppercase font-bold text-[10px]">Commits</span>
                            <span className="font-mono font-bold text-zinc-700 flex items-center gap-1">
                              <GitCommit size={14} className="text-blue-500" /> {user.commits ?? 0}
                            </span>
                          </div>
                       </div>
                       <div className="font-mono font-bold text-lg md:text-xl min-w-[80px] text-right text-zinc-800">
                         {user.points.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">PTS</span>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
