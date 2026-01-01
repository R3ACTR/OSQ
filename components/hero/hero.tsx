"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { Anton, Open_Sans } from 'next/font/google';

export const anton = Anton({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin-ext', 'latin', 'vietnamese'],
  display: 'swap',
}) 

export const openSans = Open_Sans({
  weight: ["300","400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin-ext", "latin", "vietnamese"],
  display: "swap",
});


interface Props {
  homeRef: React.RefObject<HTMLElement>;
}

function Hero(props: Props) {
  const { homeRef } = props;
  const animationRef = useRef<null | gsap.core.Timeline>(null);

  useEffect(() => {
    const tl = gsap.timeline();







    tl.from(".hero-logo", {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: "power4.out",
    });

    tl.from(".partners-section", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power4.out",
    }, "<");



    tl.to(".hero-logo", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power4.out",
    }, "<");



    tl.to(".hero-buttons", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power4.out",
      delay: 0.1
    }, "-=0.3");

    tl.to(".partners-section", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power4.out",
      delay: 0.1
    }, "-=0.2");





    animationRef.current = tl;

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return (
    <section ref={homeRef} className="flex flex-col md:mt-52 mt-36 mb-20 md:mx-14 mx-4 relative">
      


      <div className="flex justify-center w-full mb-10 overflow-hidden">
        <Image src="/osqb.svg" width={800} height={400} className="object-contain md:w-[800px] md:h-[300px] w-[90%] h-auto hero-logo z-10 relative" alt="OSQ Logo" />
      </div>
      <div className="flex md:flex-row flex-col justify-center items-center gap-6 hero-buttons opacity-0">
         <Link href="/register">
            <button className={`px-8 py-3 rounded-full text-white bg-black hover:bg-[#b2de21] hover:text-black hover:scale-105 border-2 border-black transition-all duration-300 ${openSans.className} font-bold text-lg`}>
              REGISTER
            </button>
         </Link>
         <Link href="/sponsor">
            <button className={`px-8 py-3 rounded-full text-black bg-[#b2de21] hover:bg-black hover:text-[#b2de21] hover:scale-105 border-2 border-black transition-all duration-300 ${openSans.className} font-bold text-lg`}>
              SPONSOR
            </button>
         </Link>
      </div>
      
      <div className="flex flex-col items-center mt-16 gap-6 partners-section opacity-0">
         <p className={`text-gray-500 font-semibold tracking-widest ${openSans.className} text-sm`}>In Association With</p>
         <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Sponsor Logos */}
            {[
              "/partners/ieee.png",
              "/partners/ai.png",
              "/partners/sbce.png",
              "/partners/cse.png",
              "/partners/IEDC Logo-Photoroom.png"
            ].map((logo, i) => (
              <div key={i} className="h-16 w-32 flex items-center justify-center">
                <Image 
                  src={logo} 
                  width={150} 
                  height={80} 
                  className="object-contain w-full h-full" 
                  alt={`Sponsor ${i + 1}`} 
                />
              </div>
            ))}
         </div>
      </div>
      {/* <div className="md:mb-16 mb-6 flex flex-col">
        <div className={`heading1 md:text-[140px] text-[40px] md:leading-[140px] leading-[1] text-[#121212] ${anton.className} overflow-hidden`}>
          CREATIVE DESIGN AND
        </div>
        <div className={`heading2 md:text-[140px] text-[40px] md:leading-[140px] leading-[1] text-[#121212] ${anton.className} overflow-hidden`}>
          WEBSITE DEVELOPER.
        </div>
      </div> */}
      {/* <div className="flex flex-col w-fit">
        <p className={`subHeading font-medium ${openSans.className} md:text-2xl text-base mb-2 pr-5`}>
          CREATING DESIGNS <br /> THAT RESONATE.
        </p>
        <div className="base md:h-[2px] h-[1px] bg-black"></div>
      </div> */}
    </section>
  );
}

export default Hero;
