"use client";

import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Github, ExternalLink, Code2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: string;
  link: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://osq-projects-api.sreehari14shr.workers.dev/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".page-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      if (projects.length === 0) {
        // Coming Soon Animation
        gsap.from(".coming-soon-content", {
          scale: 0.9,
          opacity: 0,
          duration: 1,
          delay: 0.3,
          ease: "back.out(1.7)",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [loading, projects.length]);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col relative">
      <Navbar />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none" style={{ 
        backgroundImage: "radial-gradient(#a1a1aa 1px, transparent 1px)", 
        backgroundSize: "32px 32px" 
      }} />

      <main ref={containerRef} className="flex-grow pt-32 px-4 md:px-8 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="page-header text-center mb-20 space-y-4">
            <h1 className="text-6xl md:text-8xl font-[family-name:var(--font-passero)] tracking-wider">
              OUR <span className="text-[#bfff00] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] text-stroke-black" style={{ WebkitTextStroke: "1.5px black" }}>PROJECTS</span>
            </h1>
            <p className="text-xl text-zinc-600 font-medium max-w-2xl mx-auto">
              Explore the open-source initiatives driven by our community.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : projects.length === 0 ? (
            /* Empty State / Coming Soon */
            <div className="coming-soon-content flex flex-col items-center justify-center py-20 text-center space-y-8 border-y border-zinc-200 bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm">
              <div className="relative">
                <Code2 size={80} className="text-zinc-300" />
                <div className="absolute -bottom-2 -right-2 bg-[#bfff00] text-black text-xs font-bold px-2 py-1 rounded-full border border-black">
                  SOON
                </div>
              </div>
              <div className="space-y-4 max-w-lg">
                <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-passero)] tracking-wide text-zinc-900">
                  SOMETHING EPIC IS BREWING
                </h2>
                <p className="text-zinc-600 text-lg leading-relaxed">
                  Our team is currently curating a list of high-impact open source projects for you to contribute to. Stay tuned!
                </p>
              </div>
              <button 
                className="px-8 py-3 bg-black text-white rounded-full font-[family-name:var(--font-passero)] tracking-wider hover:scale-105 hover:bg-[#bfff00] hover:text-black transition-all duration-300 shadow-lg"
                onClick={() => window.history.back()}
              >
                GO BACK HOME
              </button>
            </div>
          ) : (
            /* Projects Grid */
            <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="project-card group relative bg-black border border-[#bfff00]/20 rounded-[2rem] overflow-hidden hover:border-[#bfff00] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(191,255,0,0.2)]"
                >
                  <div className="p-8 flex flex-col h-full relative z-10">
                    <div className="mb-8 flex justify-between items-start">
                      <div className="p-3 bg-zinc-900/80 rounded-2xl border border-zinc-800 text-[#bfff00] group-hover:bg-[#bfff00] group-hover:text-black transition-all duration-300">
                        <Code2 size={32} />
                      </div>
                      <div className="flex gap-2">
                         {project.link && (
                             <a href={project.link} target="_blank" rel="noreferrer" className="p-2 text-zinc-500 bg-zinc-900/50 hover:bg-[#bfff00] hover:text-black rounded-full transition-all duration-300">
                                 {project.link.includes('github.com') ? <Github size={20} /> : <ExternalLink size={20} />}
                             </a>
                         )}
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-[family-name:var(--font-passero)] mb-4 text-[#bfff00] tracking-wide drop-shadow-sm">
                      {project.title}
                    </h3>
                    
                    <p className="text-zinc-400 mb-8 line-clamp-3 flex-grow leading-relaxed font-light text-base">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-zinc-900/50">
                      {project.tech && project.tech.map((tag) => (
                        <span key={tag} className="px-4 py-1.5 bg-zinc-900 border border-zinc-800 text-xs font-bold rounded-full text-zinc-300 uppercase tracking-widest group-hover:border-[#bfff00]/50 group-hover:text-white transition-all duration-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Subtle Grain/Texture Overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
                  
                  {/* Hover Highlight */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#bfff00]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#bfff00]/10 transition-all duration-500" />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

