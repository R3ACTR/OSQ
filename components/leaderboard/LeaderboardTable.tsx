"use client";

import React, { useEffect, useState } from "react";
import { Anton, Open_Sans } from "next/font/google";
import { IconTrophy, IconMedal, IconFlame } from "@tabler/icons-react";

export const anton = Anton({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const openSans = Open_Sans({
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

function LeaderboardTable() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/leaderboard.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }
        return response.json();
      })
      .then(data => {
        setLeaderboardData(data.leaderboard);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto p-2 md:p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-[#b2de21] mx-auto mb-4"></div>
          <p className={`${openSans.className} text-black text-lg`}>Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-5xl mx-auto p-2 md:p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className={`${openSans.className} text-red-600 text-lg`}>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!leaderboardData || leaderboardData.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto p-2 md:p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-12 md:p-16">
          <div className="mb-6">
            <span className="text-6xl md:text-8xl">🏆</span>
          </div>
          <h2 className={`${anton.className} text-3xl md:text-5xl text-black mb-4 uppercase tracking-wider`}>
            Leaderboard Will Launch Soon
          </h2>
          <p className={`${openSans.className} text-black/60 text-base md:text-lg max-w-md mx-auto`}>
            Stay tuned! The competition is about to begin. <br className="hidden md:block"/>
            Check back soon to see the top contributors.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-2 md:p-8">
      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8 md:mb-12">
        {/* 2nd Place */}
        <div className="flex flex-col items-center pt-8 md:pt-12">
          <div className="relative mb-2 md:mb-4">
            <div className="w-14 h-14 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center text-2xl md:text-4xl shadow-xl border-2 md:border-4 border-white">
              {leaderboardData[1]?.avatar}
            </div>
            <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-white rounded-full p-1 md:p-2 shadow-lg">
              <IconMedal size={16} className="text-gray-400 md:hidden" />
              <IconMedal size={24} className="text-gray-400 hidden md:block" />
            </div>
          </div>
          <h3 className={`${openSans.className} font-bold text-xs md:text-lg text-black mb-1 text-center px-1`}>
            {leaderboardData[1]?.name}
          </h3>
          <p className={`${anton.className} text-lg md:text-3xl text-gray-600`}>
            {leaderboardData[1]?.score.toLocaleString()}
          </p>
          <div className="mt-2 md:mt-4 bg-gradient-to-br from-gray-200 to-gray-400 rounded-t-2xl w-full h-16 md:h-32 flex items-center justify-center shadow-lg">
            <span className={`${anton.className} text-2xl md:text-5xl text-white`}>2</span>
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center">
          <div className="relative mb-2 md:mb-4">
            <div className="w-16 h-16 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-3xl md:text-5xl shadow-2xl border-2 md:border-4 border-white animate-pulse">
              {leaderboardData[0]?.avatar}
            </div>
            <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-white rounded-full p-1 md:p-2 shadow-lg">
              <IconTrophy size={18} className="text-yellow-500 md:hidden" />
              <IconTrophy size={28} className="text-yellow-500 hidden md:block" />
            </div>
          </div>
          <h3 className={`${openSans.className} font-bold text-sm md:text-xl text-black mb-1 text-center px-1`}>
            {leaderboardData[0]?.name}
          </h3>
          <p className={`${anton.className} text-xl md:text-4xl text-[#b2de21]`}>
            {leaderboardData[0]?.score.toLocaleString()}
          </p>
          <div className="mt-2 md:mt-4 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-t-2xl w-full h-20 md:h-40 flex items-center justify-center shadow-2xl">
            <span className={`${anton.className} text-3xl md:text-6xl text-white`}>1</span>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center pt-12 md:pt-16">
          <div className="relative mb-2 md:mb-4">
            <div className="w-14 h-14 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-2xl md:text-4xl shadow-xl border-2 md:border-4 border-white">
              {leaderboardData[2]?.avatar}
            </div>
            <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-white rounded-full p-1 md:p-2 shadow-lg">
              <IconMedal size={16} className="text-amber-700 md:hidden" />
              <IconMedal size={24} className="text-amber-700 hidden md:block" />
            </div>
          </div>
          <h3 className={`${openSans.className} font-bold text-xs md:text-lg text-black mb-1 text-center px-1`}>
            {leaderboardData[2]?.name}
          </h3>
          <p className={`${anton.className} text-lg md:text-3xl text-amber-700`}>
            {leaderboardData[2]?.score.toLocaleString()}
          </p>
          <div className="mt-2 md:mt-4 bg-gradient-to-br from-amber-600 to-amber-800 rounded-t-2xl w-full h-14 md:h-28 flex items-center justify-center shadow-lg">
            <span className={`${anton.className} text-2xl md:text-5xl text-white`}>3</span>
          </div>
        </div>
      </div>

      {/* Rest of the Rankings */}
      <div className="bg-white rounded-2xl md:rounded-3xl border-2 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        {/* Header */}
        <div className="bg-black p-3 md:p-6 text-white">
          <h2 className={`${anton.className} text-lg md:text-3xl uppercase tracking-wider flex items-center gap-2 md:gap-3`}>
            <IconFlame size={24} className="text-[#b2de21] md:hidden" />
            <IconFlame size={32} className="text-[#b2de21] hidden md:block" />
            Top Contributors
          </h2>
        </div>

        {/* Table Header - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-100 text-black/70 text-xs md:text-sm font-bold uppercase tracking-widest border-b-2 border-black">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-6 pl-4">User</div>
          <div className="col-span-4 text-right pr-4">Score</div>
        </div>

        {/* Rows */}
        <div className="flex flex-col">
          {leaderboardData.slice(3).map((user, index) => (
            <div
              key={index}
              className={`
                grid grid-cols-12 gap-2 md:gap-4 p-3 md:p-4 items-center 
                border-b-2 border-gray-200 last:border-0 
                hover:bg-[#b2de21]/10 transition-all duration-300
                md:hover:scale-[1.02] cursor-pointer
              `}
            >
              <div className="col-span-2 flex justify-center">
                <span className={`${anton.className} text-xl md:text-3xl text-black/50`}>
                  #{user.rank}
                </span>
              </div>
              <div className="col-span-7 md:col-span-6 flex items-center gap-2 md:gap-4 pl-2 md:pl-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#b2de21] to-[#8fb019] flex items-center justify-center text-lg md:text-2xl shadow-lg border-2 border-black flex-shrink-0">
                  {user.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <span className={`${openSans.className} font-bold text-black text-sm md:text-lg block truncate`}>
                    {user.name}
                  </span>
                  <span className={`${openSans.className} text-xs md:text-sm text-black/50`}>
                    {user.contributions} contributions
                  </span>
                </div>
              </div>
              <div className="col-span-3 md:col-span-4 text-right pr-2 md:pr-4">
                <span className={`${anton.className} text-black text-base md:text-2xl`}>
                  {user.score.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeaderboardTable;

