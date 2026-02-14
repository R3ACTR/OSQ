"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, BadgeCheck, Download } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const verifiedUsers = [
  {
  
    "name": "Gourav Suresh",
    "role": "Contributer",
    "github": "darkdevil3610",
    "linkedin": "gourav-suresh",
    "avatar": "https://github.com/darkdevil3610.png",
    "titleImage": "/Title/heartscriptcupid.png",
    "certificate":"https://drive.google.com/file/d/1LRx850rMHlHDrPtwI05u5s0ObAGElJjI/view?usp=sharing"
  },
  {
  
    "name": "Diya Thresia Daniel",
    "role": "Tech Volunteer",
    "github": "135790-diya",
    "avatar": "https://github.com/135790-diya.png",
    "linkedin": "diya-thresia-daniel",
    "titleImage": "/Title/dedication.png",
    "certificate":"https://drive.google.com/file/d/1d-ZYQ0gCQzkovu0Sa07w4p_RXv7CnugW/view"
  },
 
];

gsap.registerPlugin(ScrollTrigger);

export default function ExclusiveTitlesPage() {
  const [isLive, setIsLive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetDate = new Date("2026-02-15T00:00:00");
    if (new Date() >= targetDate) {
      setIsLive(true);
    }
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!isLive) return;
      // Title Animation
      gsap.from(".page-title", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
      
      gsap.from(".profile-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isLive]);

  return (
    <div ref={containerRef} className="min-h-screen bg-zinc-50 flex flex-col relative overflow-hidden">
      <Navbar />
      
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none" style={{ 
        backgroundImage: "radial-gradient(#a1a1aa 1px, transparent 1px)", 
        backgroundSize: "32px 32px" 
      }} />

      <main className="flex-grow pt-32 pb-20 relative z-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
            
           {!isLive ? (
             <div className="flex flex-col items-center justify-center py-20 min-h-[50vh]">
               <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-passero)] text-zinc-900 text-center drop-shadow-sm animate-pulse">
                 COMING <span className="text-[#bfff00] text-stroke-black" style={{ WebkitTextStroke: "1px black" }}>SOON</span>
               </h1>
               <p className="mt-6 text-xl md:text-2xl text-zinc-600 font-[family-name:var(--font-passero)] tracking-wider">
                 Revealing February 15th
               </p>
             </div>
           ) : (
             <>
               <h1 className="page-title text-4xl md:text-6xl font-[family-name:var(--font-passero)] text-zinc-900 mb-4 text-center drop-shadow-sm">
                 EXCLUSIVE <span className="text-[#bfff00] text-stroke-black" style={{ WebkitTextStroke: "1px black" }}>TITLES</span>
               </h1>
           <p className="page-title text-zinc-600 mb-16 text-center max-w-2xl text-lg">
             Honoring our verified contributors who have made exceptional contributions to the Open Source Quest.
           </p>

           <div className="flex flex-wrap justify-center gap-20 w-full">
             {verifiedUsers.map((user, index) => (
               <div 
                 key={index}
                 className="profile-item flex flex-col items-center text-center gap-6 group w-full md:w-[350px]"
               >
                  {/* Avatar */}
                  <div className="relative w-32 h-32 rounded-3xl border-4 border-black overflow-hidden bg-zinc-100 transition-transform duration-300 group-hover:scale-105">
                     <Image 
                       src={user.avatar} 
                       alt={user.name}
                       fill
                       className="object-cover"
                     />
                  </div>

                  {/* Name and Tag */}
                  <div className="flex flex-col items-center gap-2">
                     <h3 className="text-3xl font-[family-name:var(--font-passero)] text-zinc-900">{user.name}</h3>
                     <span className="bg-[#bfff00] text-black px-3 py-1 text-xs font-bold rounded-full border border-black flex items-center gap-1">
                        <BadgeCheck size={12} />
                        {user.role}
                     </span>
                  </div>

                  {/* Title Image (Smaller) */}
                  {user.titleImage && (
                    <div className="relative w-full h-32 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2">
                       <div className={`relative w-full h-full ${
                         user.titleImage.includes("dedication.png") ? "scale-100 md:scale-[1.8]" : "scale-100"
                       }`}>
                         <Image 
                           src={user.titleImage} 
                           alt={`${user.name}'s Title`}
                           fill
                           className="object-contain drop-shadow-lg"
                         />
                       </div>
                    </div>
                  )}

                  {/* Social Handles */}
                  <div className="flex items-center gap-4 mt-2">
                    <Link 
                       href={`https://github.com/${user.github}`}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="p-3 bg-black text-white rounded-full hover:bg-[#bfff00] hover:text-black transition-all duration-300 hover:scale-110 shadow-md"
                    >
                      <Github size={20} />
                    </Link>
                    {user.linkedin && (
                      <Link 
                         href={`https://linkedin.com/in/${user.linkedin}`}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="p-3 bg-[#0a66c2] text-white rounded-full hover:bg-black hover:text-white transition-all duration-300 hover:scale-110 shadow-md"
                      >
                        <Linkedin size={20} />
                      </Link>
                    )}
                    {user.certificate && (
                      <Link 
                         href={user.certificate}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="p-3 bg-green-600 text-white rounded-full hover:bg-black hover:text-white transition-all duration-300 hover:scale-110 shadow-md"
                         title="Download Certificate"
                      >
                        <Download size={20} />
                      </Link>
                    )}
                  </div>
               </div>
             ))}
           </div>
           
           {verifiedUsers.length === 0 && (
             <div className="text-center py-20">
               <p className="text-zinc-500 font-[family-name:var(--font-passero)] text-xl">No exclusive titles awarded yet.</p>
             </div>
           )}
           </>
           )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
