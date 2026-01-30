"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Rocket, Heart, Target } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const associateSponsors = [
  { src: "/partners/osen.png", alt: "OSEN", width: 120 },
];

const swagSponsors = [
  { src: "/partners/keploy.png", alt: "Keploy", width: 400, href: "https://keploy.io" },
];

const communitySponsors = [
  { src: "/partners/THE HELPER.png", alt: "The Helper", width: 100, href:"https://thehelpers.vercel.app/" },
];

const partners = [
  { src: "/partners/sbce.png", alt: "SBCE", width: 80, href: "/sbce" },
  { src: "/partners/ieee.png", alt: "IEEE", width: 100, href: "/ieee" },
  { src: "/partners/mulearn.png", alt: "Mulearn", width: 100, href: "https://mulearn.org/" },
  { src: "/partners/IEDC Logo-Photoroom.png", alt: "IEDC", width: 100 },
  { src: "/partners/cse.png", alt: "CSE", width: 60 },
  { src: "/partners/ai.png", alt: "AI", width: 60 },
];

export default function SponsorPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Sponsors Animation
      tl.from(".section-title", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      })
      .from(".sponsor-item", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.4");

      // Bottom Call to Action Animation
      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Benefits Stagger
      gsap.from(".benefit-card", {
        scrollTrigger: {
          trigger: ".benefits-grid",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });

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
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-12">
          
          <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-passero)] text-zinc-900 tracking-wider mb-8">
            FUEL OF THE REVOLUTION
          </h1>

          {/* Associate Sponsor */}
          <div className="w-full">
            <h3 className="section-title text-3xl md:text-4xl font-[family-name:var(--font-passero)] mb-4 text-[#bfff00] tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]" style={{ WebkitTextStroke: "1px black" }}>ASSOCIATE SPONSOR</h3>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {associateSponsors.map((partner) => (
                <SponsorItem key={partner.alt} partner={partner} size="large" />
              ))}
            </div>
          </div>

          {/* Top Tier Sponsors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
            {/* Swag Sponsor */}
            <div className="flex flex-col items-center">
              <h3 className="section-title text-3xl md:text-4xl font-[family-name:var(--font-passero)] mb-4 text-[#bfff00] tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]" style={{ WebkitTextStroke: "1px black" }}>SWAG SPONSOR</h3>
              <div className="flex flex-wrap justify-center items-center gap-12">
                {swagSponsors.map((partner) => (
                  <SponsorItem key={partner.alt} partner={partner} size="large" />
                ))}
              </div>
            </div>

            {/* Community Sponsor */}
            <div className="flex flex-col items-center border-t md:border-t-0 md:border-l border-zinc-300 pt-12 md:pt-0 md:pl-12">
              <h3 className="section-title text-3xl md:text-4xl font-[family-name:var(--font-passero)] mb-4 text-[#bfff00] tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]" style={{ WebkitTextStroke: "1px black" }}>COMMUNITY SPONSOR</h3>
              <div className="flex flex-wrap justify-center items-center gap-12">
                {communitySponsors.map((partner) => (
                  <SponsorItem key={partner.alt} partner={partner} size="medium" />
                ))}
              </div>
            </div>
          </div>

          {/* Partners */}
          <div className="w-full">
            <h3 className="section-title text-3xl md:text-4xl font-[family-name:var(--font-passero)] mb-4 text-[#bfff00] tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]" style={{ WebkitTextStroke: "1px black" }}>PARTNERS</h3>
            <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-8 md:gap-16">
              {partners.map((partner) => (
                <SponsorItem key={partner.alt} partner={partner} size="small" />
              ))}
            </div>
          </div>

          {/* Bottom Section - Call To Action */}
          <div className="cta-section w-full pt-20 border-t border-zinc-200">
            <div className="cta-content flex flex-col items-center">
              <div className="space-y-2 mb-8">
                <h2 className="text-xl md:text-2xl font-[family-name:var(--font-passero)] text-[#bfff00] tracking-widest uppercase drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] text-stroke-black" style={{ WebkitTextStroke: "0.5px black" }}>
                  PARTNER WITH US
                </h2>
                <h1 className="text-6xl md:text-8xl font-[family-name:var(--font-passero)] leading-none text-zinc-900">
                  FUEL THE <br/><span className="text-black">REVOLUTION</span>
                </h1>
              </div>

              <p className="text-lg md:text-xl text-zinc-600 max-w-2xl leading-relaxed mb-12">
                Join us in shaping the future of open source. Connect with passionate developers, showcase your brand, and drive innovation.
              </p>

              <div className="relative group mb-24">
                <a 
                  href="https://drive.google.com/file/d/12tjlcRXqguUuy0nxeOHTpB5-IzQV87k1/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 inline-flex items-center gap-4 bg-black text-white px-10 py-5 rounded-full font-[family-name:var(--font-passero)] text-2xl tracking-wider shadow-[8px_8px_0px_0px_rgba(191,255,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(191,255,0,1)] hover:-translate-y-1 hover:bg-zinc-900 transition-all duration-300 border-2 border-black"
                >
                  <span>DOWNLOAD DECK</span>
                  <Download className="w-6 h-6 animate-bounce" />
                </a>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-[#bfff00]/40 blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              <div className="benefits-grid grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                <BenefitCard 
                  icon={<Rocket className="w-10 h-10 text-[#bfff00]" />}
                  title="Brand Exposure"
                  description="Showcase your brand to thousands of developers and tech enthusiasts."
                />
                <BenefitCard 
                  icon={<Target className="w-10 h-10 text-[#bfff00]" />}
                  title="Talent Access"
                  description="Connect with top-tier talent and potential hires from our community."
                />
                <BenefitCard 
                  icon={<Heart className="w-10 h-10 text-[#bfff00]" />}
                  title="Community Impact"
                  description="Support the open source ecosystem and help students learn and grow."
                />
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

const SponsorItem = ({ partner, size = "medium" }: { partner: { src: string, alt: string, width?: number, href?: string }, size?: "small" | "medium" | "large" }) => {
  
  let heightClass = "h-16";
  if (size === "large") heightClass = "h-24 md:h-32";
  if (size === "medium") heightClass = "h-20 md:h-24";
  if (size === "small") heightClass = "h-14 md:h-16";

  const content = (
    <div className={`sponsor-item relative ${heightClass} w-auto flex items-center justify-center transition-transform hover:scale-110 duration-300`}>
      <Image 
        src={partner.src} 
        alt={partner.alt} 
        width={partner.width || 200} 
        height={100} 
        className="object-contain h-full w-auto"
      />
    </div>
  );

  if (partner.href) {
    return (
      <Link href={partner.href} target={partner.href.startsWith("http") ? "_blank" : undefined}>
        {content}
      </Link>
    );
  }

  return <div>{content}</div>;
}

const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="benefit-card bg-black text-white p-8 rounded-3xl border border-zinc-800 hover:border-[#bfff00] transition-colors duration-300 flex flex-col items-center text-center space-y-4 group shadow-xl">
    <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-700 group-hover:bg-[#bfff00]/20 group-hover:border-[#bfff00] transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-2xl font-[family-name:var(--font-passero)] tracking-wide">{title}</h3>
    <p className="text-zinc-400 leading-relaxed font-light">{description}</p>
  </div>
);
