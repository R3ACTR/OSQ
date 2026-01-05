"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Github, Linkedin, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/projects" },
  { name: "Leaderboard", href: "/leaderboard" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <motion.div
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
              <span className="font-[family-name:var(--font-passero)] tracking-wider transition-all duration-300 text-xl hidden md:block">
            
              </span>


            </Link>
          </div>

          {/* Desktop Navigation - Absolute Center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
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
              href="/register"
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
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-2xl md:hidden flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-mono font-bold text-xl tracking-tighter">R3ACTR</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-zinc-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-4xl font-[family-name:var(--font-passero)] tracking-wider text-zinc-900 hover:pl-4 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pb-8 space-y-6">
              <div className="h-px w-full bg-zinc-100" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
