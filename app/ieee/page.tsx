"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Globe, Zap, Users, Lightbulb, Target } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function IEEEPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Hero Animation
      tl.from(".ieee-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      .from(".ieee-intro", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.6");

      // Mission Animation
      gsap.fromTo(".mission-section", 
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".mission-section",
            start: "top 80%",
          }
        }
      );

      // Vision Animation
      gsap.fromTo(".vision-section", 
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".vision-section",
            start: "top 80%",
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-zinc-50 flex flex-col relative overflow-hidden">
      <Navbar />
      
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none" style={{ 
        backgroundImage: "radial-gradient(#a1a1aa 1px, transparent 1px)", 
        backgroundSize: "32px 32px" 
      }} />

      <main className="flex-grow pt-32 pb-20 relative z-10 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-black mb-12 transition-colors group">
            <div className="p-2 rounded-full bg-zinc-200 group-hover:bg-[#bfff00] transition-colors">
              <ArrowLeft size={20} className="text-black" />
            </div>
            <span className="font-[family-name:var(--font-passero)] tracking-wide">BACK TO HOME</span>
          </Link>

          {/* Header Section */}
          <div className="text-center mb-24 space-y-8">
            <div className="ieee-title">
               <span className="inline-block px-4 py-1.5 bg-[#00629B] text-white rounded-full text-sm font-bold tracking-widest uppercase mb-6 shadow-lg">
                  Student Branch
               </span>
               <h1 className="text-6xl md:text-8xl font-[family-name:var(--font-passero)] leading-[0.9] text-zinc-900 drop-shadow-sm">
                 IEEE SB SBCE
               </h1>
            </div>
            
            <p className="ieee-intro text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto leading-relaxed">
              The IEEE Student Branch SBCE is a dynamic community of students committed to advancing technology for humanity. As part of IEEE, the world’s largest technical professional organization, our student branch serves as a platform for learning, innovation, and professional development.
            </p>
          </div>

          {/* Content Grid */}
            {/* Mission Section - Redesigned */}
            <div className="mission-section flex flex-col md:flex-row gap-8 md:gap-16 items-start border-b border-zinc-200 pb-16">
               <div className="flex-shrink-0 w-24 h-24 bg-[#00629B]/10 rounded-3xl flex items-center justify-center text-[#00629B]">
                  <Target size={48} />
               </div>
               
               <div className="space-y-6">
                 <h2 className="text-5xl font-[family-name:var(--font-passero)] text-black">OUR MISSION</h2>
                 <div className="space-y-6 text-zinc-800 text-lg leading-relaxed max-w-2xl">
                   <p>
                     We bring together students from diverse engineering and technology disciplines who share a common interest in exploring emerging technologies, strengthening technical skills, and developing solutions that create real-world impact.
                   </p>
                   <p>
                     Through workshops, technical events, collaborations, and initiatives, IEEE SB SBCE fosters a culture of knowledge sharing, leadership, and continuous learning.
                   </p>
                 </div>
               </div>
            </div>

            {/* Vision Section - Redesigned */}
            <div className="vision-section flex flex-col md:flex-row gap-8 md:gap-16 items-start pt-8">
               <div className="flex-shrink-0 w-24 h-24 bg-black/5 rounded-3xl flex items-center justify-center text-black">
                  <Lightbulb size={48} />
               </div>
               
               <div className="space-y-6">
                 <h2 className="text-5xl font-[family-name:var(--font-passero)] text-black">OUR VISION</h2>
                 <div className="space-y-6 text-zinc-800 text-lg leading-relaxed max-w-2xl">
                   <p>
                     Our vision is to inspire and empower students to excel in the fields of engineering, technology, and science while contributing meaningfully to society through innovative, ethical, and sustainable solutions.
                   </p>
                   <p>
                     We aim to cultivate a vibrant ecosystem where technical excellence meets social responsibility, nurturing future leaders who are capable of addressing global challenges.
                   </p>
                   <p>
                     By promoting collaborative learning, hands-on experience, and industry-relevant exposure, IEEE SB SBCE strives to bridge the gap between academic knowledge and real-world application.
                   </p>
                 </div>
               </div>
            </div>

           {/* Stats / Extras Row */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <StatBadge icon={<Users size={20} />} label="Vibrant Community" delay={0} />
              <StatBadge icon={<Zap size={20} />} label="Technical Events" delay={0.1} />
              <StatBadge icon={<Globe size={20} />} label="Global Network" delay={0.2} />
              <StatBadge icon={<Target size={20} />} label="Professional Growth" delay={0.3} />
           </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

const StatBadge = ({ icon, label, delay }: { icon: React.ReactNode; label: string, delay: number }) => (
  <div className="flex flex-col items-center justify-center p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm hover:shadow-md hover:border-[#00629B]/30 hover:-translate-y-1 transition-all duration-300 group">
    <div className="text-zinc-400 group-hover:text-[#00629B] transition-colors mb-2">
      {icon}
    </div>
    <span className="text-sm font-bold text-center text-zinc-600 group-hover:text-black">{label}</span>
  </div>
);
