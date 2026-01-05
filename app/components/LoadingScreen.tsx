"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const comp = useRef(null);
  const [isComplete, setIsComplete] = useState(false);

  useLayoutEffect(() => {
    // Check if we already loaded this session
    const hasLoaded = sessionStorage.getItem("r3actr_loaded");
    
    // If you want it ONLY on very first visit, uncomment this:
    // if (hasLoaded) {
    //   setIsComplete(true);
    //   return;
    // }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true);
          sessionStorage.setItem("r3actr_loaded", "true");
        }
      });

      // Initial state
      tl.set(".loader-text", { yPercent: 100, opacity: 0 });
      tl.set(".loader-bar", { scaleX: 0, transformOrigin: "left" });

      // Animation sequence
      tl.to(".loader-text", {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.1
      })
      .to(".loader-bar", {
        scaleX: 1,
        duration: 1.5,
        ease: "expo.inOut"
      })
      .to(".loader-text", {
        yPercent: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      })
      .to(".loader-bar", {
        height: "100vh",
        duration: 0.5,
        ease: "power2.inOut"
      }, "-=0.1")
      .to(".loading-container", {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut"
      });

    }, comp);

    return () => ctx.revert();
  }, []);

  if (isComplete) return null;

  return (
    <div ref={comp} className="loading-container fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white">
      <div className="overflow-hidden mb-8">
        <h1 className="loader-text text-6xl md:text-9xl font-[family-name:var(--font-passero)] tracking-widest">
          OSQ
        </h1>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-2 bg-white loader-bar" />
    </div>
  );
}
