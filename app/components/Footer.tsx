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
          <SocialLink href="https://discord.gg/EtBWjECQ4E" icon={<DiscordIcon size={32} />} label="Discord" />
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

const DiscordIcon = ({ size = 24 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 127.14 96.36" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.82,105.82,0,0,0,126.6,80.22c2.36-24.44-3.11-48.55-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
  </svg>
);
