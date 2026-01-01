"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { Anton, Open_Sans } from "next/font/google";
import { IconCode, IconUsers, IconRocket } from "@tabler/icons-react";

const anton = Anton({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

interface Project {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  technologies: string[];
  contributors: number;
  status: string;
  color: string;
}

function Page() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/projects.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        return response.json();
      })
      .then(data => {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'advanced':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

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
              AVAILABLE PROJECTS
              <div className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-2 md:h-3 bg-[#b2de21] -z-10"></div>
            </h1>
            <p className="text-black/60 text-base md:text-xl max-w-2xl mx-auto font-medium mt-4 md:mt-6">
              Choose from our curated list of open-source projects. <br className="hidden md:block"/>
              Start contributing and make an impact!
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="w-full flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-[#b2de21] mx-auto mb-4"></div>
                <p className={`${openSans.className} text-black text-lg`}>Loading projects...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="w-full flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <p className={`${openSans.className} text-red-600 text-lg`}>Error: {error}</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && projects.length === 0 && (
            <div className="w-full flex items-center justify-center min-h-[400px]">
              <div className="text-center bg-white rounded-3xl border-4 border-black p-12 md:p-16">
                <div className="mb-6">
                  <span className="text-6xl md:text-8xl">🚀</span>
                </div>
                <h2 className={`${anton.className} text-3xl md:text-5xl text-black mb-4 uppercase tracking-wider`}>
                  Projects Coming Soon
                </h2>
                <p className={`${openSans.className} text-black/60 text-base md:text-lg max-w-md mx-auto`}>
                  We&apos;re preparing exciting projects for you. <br className="hidden md:block"/>
                  Check back soon to start contributing!
                </p>
              </div>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && projects.length > 0 && (
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 md:px-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl md:rounded-3xl border-2 md:border-4 border-black hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-r ${project.color} p-4 md:p-6`}>
                    <div className="flex items-start justify-between mb-2">
                      <IconCode size={32} className="text-white" />
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(project.difficulty)} text-white`}>
                        {project.difficulty}
                      </span>
                    </div>
                    <h3 className={`${anton.className} text-2xl md:text-3xl text-white uppercase tracking-wide`}>
                      {project.title}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-6">
                    <p className={`${openSans.className} text-black/70 text-sm md:text-base mb-4`}>
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-4">
                      <h4 className={`${openSans.className} font-bold text-xs text-black/50 mb-2 uppercase`}>
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className={`${openSans.className} px-2 py-1 bg-gray-100 border border-black rounded-lg text-xs font-semibold text-black`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contributors */}
                    <div className="flex items-center gap-2 text-black/60">
                      <IconUsers size={18} />
                      <span className={`${openSans.className} text-sm`}>
                        {project.contributors} contributors
                      </span>
                    </div>

                    {/* CTA Button */}
                    <button className={`mt-4 w-full px-4 py-2.5 bg-black text-[#b2de21] text-sm ${openSans.className} font-bold rounded-xl hover:bg-[#b2de21] hover:text-black transition-all duration-300 border-2 border-black flex items-center justify-center gap-2`}>
                      <IconRocket size={18} />
                      Start Contributing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
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
