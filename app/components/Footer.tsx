"use client";

import React from "react";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12 relative z-10">
        
        <div className="space-y-6">
          <h2 className="text-5xl md:text-8xl font-[family-name:var(--font-passero)] text-[#bfff00] tracking-wider">
            GET IN TOUCH
          </h2>
          <p className="text-xl md:text-2xl font-light text-zinc-400">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <a 
          href="mailto:r3actr@gmail.com"
          className="group flex items-center gap-4 text-3xl md:text-5xl font-[family-name:var(--font-passero)] hover:text-[#bfff00] transition-colors duration-300"
        >
          <Mail className="w-8 h-8 md:w-12 md:h-12 group-hover:scale-110 transition-transform duration-300" />
          <span>r3actr@gmail.com</span>
        </a>

        <div className="flex items-center gap-8 md:gap-12 mt-8">
          <SocialLink href="https://github.com/R3ACTR" icon={<Github size={32} />} label="GitHub" />
          <SocialLink href="https://linkedin.com/company/r3actr-innovations" icon={<Linkedin size={32} />} label="LinkedIn" />
          <SocialLink href="https://instagram.com" icon={<Instagram size={32} />} label="Instagram" />
        </div>

        <div className="mt-20 pt-8 border-t border-zinc-900 w-full flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm gap-4">
          <p>© {new Date().getFullYear()} R3ACTR Innovations. All rights reserved.</p>
          <p className="font-[family-name:var(--font-passero)]">OSQ 2026</p>
        </div>
      </div>


    </footer>
  );
}

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="p-4 bg-zinc-900 rounded-full hover:bg-[#bfff00] hover:text-black transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[#bfff00]/20"
  >
    {icon}
  </a>
);
