"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LeaderboardInfo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Animate title
    gsap.fromTo(
      ".leaderboard-title",
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
      id="leaderboard-info" 
      ref={containerRef} 
      className="w-full relative z-20 py-24 md:py-32 px-4 md:px-8 bg-white"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <h2 className="leaderboard-title text-5xl md:text-6xl font-[family-name:var(--font-passero)] text-center mb-16 tracking-wider leading-tight">
          CONTRIBUTE MORE.<br/>
          <span className="text-[#bfff00] drop-shadow-sm stroke-black" style={{ WebkitTextStroke: "1px black" }}>EARN REWARDS.</span><br/>
          SHINE ON THE LEADERBOARD.
        </h2>

        <div className="space-y-8 text-lg md:text-xl leading-relaxed text-zinc-800 font-[family-name:var(--font-passero)] tracking-wide">
          <p ref={addToRefs} className="opacity-0">
            Open Source Quest rewards consistent effort, quality contributions, and responsible collaboration.
          </p>

          <p ref={addToRefs} className="opacity-0">
            As you contribute to repositories, your activity is tracked through GitHub-based signals such as pull requests, issue resolution, and contribution consistency. Progress is reflected on the live leaderboard, offering transparent insights into repository activity and individual performance.
          </p>

          <div ref={(el) => { if(el) addToRefs(el as any) }} className="opacity-0 border-l-4 border-[#bfff00] pl-6 py-2 bg-zinc-50">
            <p className="mb-4 font-bold">Weekly highlights recognize contributors who demonstrate:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Meaningful and well-structured contributions</li>
              <li>Consistency over time</li>
              <li>Collaboration and review participation</li>
            </ul>
          </div>

          <p ref={addToRefs} className="opacity-0">
            The leaderboard is designed to motivate learning, not competition. Final recognitions are mentor-reviewed to ensure fairness and quality.
          </p>
        </div>
      </div>
    </section>
  );
}
