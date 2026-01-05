"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Animate title
    gsap.fromTo(
      ".about-title",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );

    // Animate paragraphs
    textRefs.current.forEach((para, index) => {
      if (!para) return;
      
      gsap.fromTo(
        para,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2 + (index * 0.1),
          ease: "power2.out",
          scrollTrigger: {
            trigger: para,
            start: "top 85%",
          },
        }
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const addToRefs = (el: HTMLParagraphElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section 
      id="about" 
      ref={containerRef} 
      className="w-full relative z-20 py-24 md:py-32 px-4 md:px-8 bg-white"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <h2 className="about-title text-5xl md:text-7xl font-[family-name:var(--font-passero)] text-center mb-16 tracking-wider">
          WHAT IS <span className="text-[#bfff00] drop-shadow-sm stroke-black" style={{ WebkitTextStroke: "1px black" }}>OSQ</span>?
        </h2>

        <div className="space-y-8 text-lg md:text-xl leading-relaxed text-zinc-800 font-[family-name:var(--font-passero)] tracking-wide">

          <p ref={addToRefs} className="opacity-0">
            Open Source Quest is a structured, month-long open-source contribution program designed to help students gain real-world experience with professional software development workflows.
          </p>

          <p ref={addToRefs} className="opacity-0">
            participants work individually on curated, domain-specific github repositories under guided mentorship. the program focuses on understanding how real open-source projects function—through issues, pull requests, reviews, and consistent contributions—rather than competitive coding or short-term hackathons.
          </p>

          <p ref={addToRefs} className="opacity-0">
            the initiative is beginner-friendly and inclusive, welcoming students from all branches and academic years. contributions are not limited to writing code alone; participants may also work on documentation, testing, research, and project maintenance, reflecting how modern software teams operate.
          </p>

          <p ref={addToRefs} className="opacity-0">
            by combining mentorship, structured tasks, and transparent progress tracking, open source quest aims to transform learners into confident, responsible open-source contributors while fostering a sustainable technical culture within the campus.
          </p>
        </div>
      </div>
    </section>
  );
}
