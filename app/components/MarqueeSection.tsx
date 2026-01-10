"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function MarqueeSection() {
  const row1 = ["GITHUB", "MERGE", "ISSUES", "FORK", "COMMIT", "PUSH"];
  const row2 = ["CODING", "BUILD", "DEPLOY", "DEBUG", "CREATE", "LEARN"];
  
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee 1 (Moves Left)
      gsap.to(row1Ref.current, {
        xPercent: -50,
        ease: "none",
        duration: 120,
        repeat: -1,
        force3D: true,
      });

      // Marquee 2 (Moves Right)
      gsap.fromTo(row2Ref.current, 
        { xPercent: -50 },
        {
          xPercent: 0,
          ease: "none",
          duration: 120,
          repeat: -1,
          force3D: true,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full py-20 flex flex-col gap-0 bg-white overflow-hidden relative z-20">
      {/* Marquee 1 */}
      <div className="relative w-[110%] -left-[5%] bg-zinc-950 py-6 border-y-4 border-black -rotate-2 shadow-2xl z-10">
        <div className="flex overflow-hidden">
          <div
            ref={row1Ref}
            className="flex flex-nowrap whitespace-nowrap will-change-transform [backface-visibility:hidden] transform-gpu"
          >
            {[...row1, ...row1, ...row1, ...row1].map((item, i) => (
              <span key={i} className="text-7xl md:text-9xl font-[family-name:var(--font-passero)] text-[#bfff00] mx-6 flex items-center gap-6">
                {item} <span className="text-zinc-600">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee 2 */}
      <div className="relative w-[110%] -left-[5%] bg-[#bfff00] py-6 border-y-4 border-black rotate-2 shadow-xl z-20 -mt-10">
        <div className="flex overflow-hidden">
          <div
            ref={row2Ref}
            className="flex flex-nowrap whitespace-nowrap will-change-transform [backface-visibility:hidden] transform-gpu"
          >
            {[...row2, ...row2, ...row2, ...row2].map((item, i) => (
              <span key={i} className="text-7xl md:text-9xl font-[family-name:var(--font-passero)] text-black mx-6 flex items-center gap-6">
                {item} <span className="text-black/20">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
