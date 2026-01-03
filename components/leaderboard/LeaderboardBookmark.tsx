"use client";

import React, { useEffect, useState } from "react";
import { Anton, Open_Sans } from "next/font/google";
import { IconTrophy, IconX, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

const anton = Anton({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  avatar: string;
  contributions: number;
}

export default function LeaderboardBookmark() {
  const [isOpen, setIsOpen] = useState(false);
  const [top5, setTop5] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/leaderboard.json")
      .then((res) => res.json())
      .then((data) => {
        setTop5(data.leaderboard.slice(0, 5));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load leaderboard", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Bookmark Tab (Left Side) - Absolute to Hero Container */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className={`
            absolute -left-4 md:-left-14 top-1/2 -translate-y-1/2 z-40 cursor-pointer
            group transition-all duration-300 ease-in-out
            hover:translate-x-2
            hidden md:block
          `}
        >
          <div className="bg-black text-[#b2de21] py-8 px-2 pr-3 rounded-r-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] border-2 border-l-0 border-[#b2de21] flex flex-col items-center gap-4">
            <IconTrophy size={24} stroke={2} />
            <span
              className={`${anton.className} text-lg uppercase tracking-wider whitespace-nowrap`}
              style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
            >
              Top 5 Leaders
            </span>
          </div>
          
          {/* Hover tooltip effect */}
          <div className="absolute top-1/2 left-full -translate-y-1/2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded">
            View Leaderboard
          </div>
        </div>
      )}

      {/* Overlay Backdrop - Fixed to Viewport */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar (Opens from Left) - Fixed to Viewport */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-80 bg-white z-[101] shadow-2xl
          transform transition-transform duration-300 ease-in-out border-r-4 border-black
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          hidden md:flex flex-col
        `}
      >
        {/* Header */}
        <div className="bg-black text-[#b2de21] p-6 flex justify-between items-center">
          <h2 className={`${anton.className} text-2xl uppercase tracking-wider flex items-center gap-2`}>
            <IconTrophy size={24} />
            Leaders
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="hover:rotate-90 transition-transform duration-300 text-white hover:text-[#b2de21]"
          >
            <IconX size={24} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
             <div className="flex justify-center py-10">
               <div className="animate-spin rounded-full h-8 w-8 border-2 border-black border-t-[#b2de21]"></div>
             </div>
          ) : top5.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center h-full">
               <span className="text-4xl mb-4">🏆</span>
               <h3 className={`${anton.className} text-xl uppercase mb-2`}>Coming Soon</h3>
               <p className={`${openSans.className} text-sm text-gray-500`}>
                 Leaderboard updates are on the way. Stay tuned!
               </p>
            </div>
          ) : (
            top5.map((user, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-100 hover:border-black hover:bg-gray-50 transition-all group"
              >
                {/* Rank Badge */}
                <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-black shadow-sm
                    ${index === 0 ? "bg-yellow-400 text-black" : 
                      index === 1 ? "bg-gray-300 text-black" : 
                      index === 2 ? "bg-amber-600 text-white" : 
                      "bg-white text-black"}
                `}>
                  <span className={anton.className}>{user.rank}</span>
                </div>

                {/* Avatar */}
                <div className="text-xl">
                    {user.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className={`${openSans.className} font-bold text-sm truncate`}>
                    {user.name}
                  </p>
                  <p className={`${openSans.className} text-xs text-gray-500`}>
                    {user.score.toLocaleString()} pts
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Link */}
        <div className="p-4 border-t-2 border-black bg-gray-50">
          <Link 
            href="/leaderboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-[#b2de21] hover:text-black transition-colors border-2 border-transparent hover:border-black"
          >
            <span className={openSans.className}>View Full Leaderboard</span>
            <IconChevronRight size={18} />
          </Link>
        </div>
      </div>
    </>
  );
}
