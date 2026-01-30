"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const events = [
    { date: "11 JAN", title: "Call for Volunteers", active: true },
    { date: "13 JAN", title: "Website Goes Live", active: true },
    { date: "14 JAN", title: "Contributor Reg Open", active: true },
    { date: "20 JAN", title: "Selected Contributors Get Email", active: false },
    { date: "31 JAN", title: "Repo Selection", active: false },
    { date: "2 Feb", title: "Offline Git Class for SBCE Students", active: false },
    { date: "1 FEB", title: "OSQ Begins", active: false },
    { date: "28 FEB", title: "OSQ Ends", active: false },
    { date: "5 MAR", title: "Winner Announcement", active: false },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Desktop Animations
        const items = gsap.utils.toArray(".timeline-item");
        items.forEach((item: any, i) => {
          gsap.fromTo(item,
            { 
              opacity: 0, 
              y: 50,
              x: i % 2 === 0 ? -50 : 50
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "bottom 60%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile Animations (Lighter)
        const items = gsap.utils.toArray(".timeline-item");
        items.forEach((item: any) => {
          gsap.fromTo(item,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      });

      // Line animation (Global but optimized)
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-zinc-950 py-32 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Title */}
        <h2 className="text-6xl md:text-8xl font-[family-name:var(--font-passero)] text-[#bfff00] mb-24 text-center">
          TIMELINE
        </h2>

        {/* Timeline Container */}
        <div className="relative w-full max-w-4xl flex flex-col">
          
          {/* Central Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2 h-full z-0">
             <div ref={lineRef} className="w-full h-full bg-[#bfff00]/30 shadow-[0_0_15px_#bfff00] rounded-full origin-top" />
          </div>

          {/* Events */}
          <div className="flex flex-col gap-12 md:gap-24 relative z-10 pl-6 md:pl-0">
            {events.map((event, index) => (
              <div 
                key={index}
                className={`timeline-item flex w-full md:items-center ${
                  index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                } relative`}
              >
                {/* Desktop : Layout Flip */}
                <div className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 w-full md:w-1/2 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                }`}>
                  
                  {/* Dot */}
                  <div className="absolute left-[8px] md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-[#bfff00] bg-zinc-950 shadow-[0_0_10px_#bfff00] shrink-0 z-20" />

                  {/* Content */}
                  <div className={`ml-8 md:ml-0 p-4 md:p-8 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl md:max-w-md w-[85%] md:w-full hover:border-[#bfff00]/50 transition-colors duration-300 group ${
                     index % 2 === 0 ? "text-left md:text-right" : "text-left"
                  }`}>
                    <span className="block text-[#bfff00] font-mono text-lg md:text-2xl font-bold mb-1 md:mb-2 tracking-wider">
                      {event.date}
                    </span>
                    <h3 className="text-white font-[family-name:var(--font-passero)] text-xl md:text-4xl leading-tight group-hover:text-[#bfff00] transition-colors duration-300">
                      {event.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
