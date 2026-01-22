"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/projects" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "Participants", href: "/participants" },
  { name: "Verify ID", href: "https://osq-id.r3actr.work/" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  // Mobile Menu Animation
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      
      const links = mobileMenuRef.current.querySelectorAll('.mobile-link');
      gsap.fromTo(links,
        { x: -20, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.4, 
          stagger: 0.1, 
          delay: 0.1 
        }
      );
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex flex-col"
      >
        <style jsx global>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 60s linear infinite;
            display: inline-block;
            white-space: nowrap;
          }
        `}</style>
        
        {/* Marquee Banner */}
        <div className="bg-[#bfff00] w-full overflow-hidden border-b-2 border-black z-30">
          <Link href="https://forms.gle/h4Ln52ad4hr98gMdA" target="_blank" className="animate-marquee hover:underline decoration-black decoration-2">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-black font-bold font-[family-name:var(--font-passero)] tracking-wider mx-8 text-sm md:text-base">
                 PARTICIPANT REGISTRATION IS NOW OPEN  •  JOIN THE EVENT  •  REGISTER NOW  • 
              </span>
            ))}
          </Link>
        </div>

        <div
          className={`relative flex items-center justify-between px-6 md:px-12 w-full h-20 transition-all duration-500 ${
            isScrolled 
              ? "bg-white/90 backdrop-blur-xl border-b border-zinc-100 shadow-sm" 
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo Section */}
          <div className="flex items-center gap-4 z-20">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative w-14 h-14 md:w-20 md:h-20 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/r3actr.png"
                  alt="R3ACTR"
                  fill
                  className="object-contain brightness-0"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Absolute Center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="relative px-6 py-2 group border border-zinc-200 rounded-full hover:border-black hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-all duration-300"
              >
                <span className="relative z-10 text-lg font-[family-name:var(--font-passero)] tracking-wider text-zinc-600 transition-colors duration-300 group-hover:text-black">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 z-20">
            <Link 
              href="https://forms.gle/h4Ln52ad4hr98gMdA"
              target="_blank"
              className="hidden md:flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full font-[family-name:var(--font-passero)] text-lg tracking-wider transition-all duration-300 hover:bg-zinc-800 hover:shadow-[0_0_10px_rgba(0,0,0,0.1)]"
            >
              <span>REGISTER</span>
              <ArrowRight size={18} />
            </Link>

            <button
              className="md:hidden p-2 text-zinc-800"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-2xl md:hidden flex flex-col p-6"
        >
          <div className="flex justify-end items-center mb-12">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 bg-zinc-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <div key={link.name} className="mobile-link">
                <Link
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-4xl font-[family-name:var(--font-passero)] tracking-wider text-zinc-900 hover:pl-4 transition-all duration-300"
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </nav>

          <div className="mt-auto pb-8 space-y-6">
            <div className="h-px w-full bg-zinc-100" />
          </div>
        </div>
      )}
    </>
  );
}

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-full transition-all duration-200"
  >
    {icon}
  </a>
);
