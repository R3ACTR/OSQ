"use client";
import React from "react";
import Navbar from "./navbar";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";

function Page() {
  return (
    <section
      style={{ cursor: 'url("/icons/cursor.png"), auto' }}
      className="min-h-screen w-full bg-white text-black overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <Navbar />
        
        <div className="mt-10 flex flex-col items-center">
            {/* Title Section */}
            <div className="mb-8 md:mb-12 text-center px-4">
                <h1 className="text-4xl md:text-8xl font-black text-black tracking-tighter mb-4 relative inline-block">
                    LEADERBOARD
                    <div className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-2 md:h-3 bg-[#b2de21] -z-10"></div>
                </h1>
                <p className="text-black/60 text-base md:text-xl max-w-2xl mx-auto font-medium mt-4 md:mt-6">
                    Celebrate the top performers and contributors in our community. <br className="hidden md:block"/>
                    Compete, contribute, and climb the ranks!
                </p>
            </div>

            <LeaderboardTable />
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
        <div className="absolute top-[-5%] right-[-5%] w-[40vw] h-[40vw] bg-[#b2de21]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40vw] h-[40vw] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-[30%] left-[50%] w-[30vw] h-[30vw] bg-pink-500/5 rounded-full blur-[80px]" />
      </div>
    </section>
  );
}

export default Page;
