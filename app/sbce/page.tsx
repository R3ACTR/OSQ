"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowLeft, Globe, MapPin, GraduationCap, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function SBCEPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Header Animation
      tl.from(".sbce-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      .from(".sbce-image", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      }, "-=0.5")
      .from(".sbce-desc", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.5");


    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      <Navbar />
      
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{
        backgroundImage: "radial-gradient(#e4e4e7 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />

      <main className="flex-grow pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-black mb-12 transition-colors group">
            <div className="p-2 rounded-full bg-zinc-100 group-hover:bg-[#bfff00] transition-colors">
              <ArrowLeft size={20} className="text-black" />
            </div>
            <span className="font-[family-name:var(--font-passero)] tracking-wide">BACK TO HOME</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="sbce-header space-y-4">
                <div className="inline-block px-4 py-1 bg-black text-[#bfff00] rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                  Educational Partner
                </div>
                <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-passero)] leading-[0.9]">
                  SREE BUDDHA<br/>
                  <span className="text-zinc-400">COLLEGE OF</span><br/>
                  ENGINEERING
                </h1>
              </div>

              <div className="sbce-desc space-y-6 text-lg text-zinc-600 leading-relaxed max-w-xl">
                <p>
                  Affiliated with <span className="text-black font-semibold">APJ Abdul Kalam Technological University</span>, SBCE excels in technical education, guided by the teachings of Lord Buddha.
                </p>
                <p>
                  The institution nurtures aspiring technocrats and strives to be a model for the world, fostering innovation and ethical values in every student.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Badge icon={<GraduationCap size={16} />} text="NAAC Accredited" />
                  <Badge icon={<MapPin size={16} />} text="Pattoor, Alappuzha" />
                  <Badge icon={<Users size={16} />} text="NBA Accredited Depts" />
                </div>

                <a 
                  href="https://sbce.ac.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-[family-name:var(--font-passero)] text-xl tracking-wider hover:bg-[#bfff00] hover:text-black transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-[#bfff00]/30 hover:-translate-y-1 mt-6"
                >
                  <span>VISIT WEBSITE</span>
                  <Globe size={20} />
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="sbce-image relative">
              <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden border-4 border-black bg-zinc-100">
                <Image
                  src="https://sbce.ac.in/assets/images/profile_pic.png"
                  alt="SBCE Campus"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#bfff00]/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>

          {/* Cards Section */}
          {/* Stats / Info Section - Redesigned */}
          <div className="mt-24 space-y-16">
            
            {/* Vision Section */}
            <div className="vision-card flex flex-col md:flex-row gap-8 md:gap-16 items-start border-b border-zinc-200 pb-16">
              <div className="flex-shrink-0 w-24 h-24 bg-black text-[#bfff00] rounded-3xl flex items-center justify-center">
                 <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-5xl font-[family-name:var(--font-passero)] text-black">OUR VISION</h2>
                <p className="text-zinc-800 text-xl leading-relaxed max-w-2xl">
                  To create professionally competent engineers with human values and social commitment.
                </p>
              </div>
            </div>

            {/* Mission Section */}
            <div className="mission-card flex flex-col md:flex-row gap-8 md:gap-16 items-start">
               <div className="flex-shrink-0 w-24 h-24 bg-zinc-100 text-black rounded-3xl flex items-center justify-center">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
               </div>
               
               <div className="space-y-6">
                <h2 className="text-5xl font-[family-name:var(--font-passero)] text-black">OUR MISSION</h2>
                <ul className="space-y-4 text-zinc-800 text-lg leading-relaxed max-w-2xl">
                  <li className="flex items-start gap-4">
                    <span className="mt-2.5 w-2 h-2 rounded-full bg-black flex-shrink-0" />
                    <span>Offer well balanced curriculum with student-centric approach.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-2.5 w-2 h-2 rounded-full bg-black flex-shrink-0" />
                    <span>Encourage students to participate in innovation, lifelong learning and research.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-2.5 w-2 h-2 rounded-full bg-black flex-shrink-0" />
                    <span>Impart ethical and human values focusing on rural needs and sustainability.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const Badge = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-full text-sm font-medium text-zinc-600">
    {icon}
    <span>{text}</span>
  </div>
);
