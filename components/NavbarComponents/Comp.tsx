"use client";

import React from "react";
import { Anton, Open_Sans } from "next/font/google";
import Link from "next/link";

export const anton = Anton({
  weight: ["400"],
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
});

export const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
});

function Comp({ homeRef, aboutRef, workRef, onItemClick, isMobile }: any) {
  const scrollTo = (ref: any) => {
    if (ref?.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      onItemClick?.(); // 👈 close mobile menu if provided
    }
  };

  const btn = isMobile
    ? "px-6 py-6 text-5xl leading-none rounded-full " +
      "text-[#b2de21] bg-black hover:scale-105 hover:bg-[#b2de21] " +
      "hover:text-black active:scale-95 transition-all duration-300 font-black w-[60vw] tracking-tighter shadow-2xl"
    : "px-4 py-2 md:px-6 md:py-2 text-sm md:text-base rounded-full " +
      "text-[#b2de21] bg-black hover:scale-[102%] hover:bg-[#b2de21] " +
      "hover:text-black active:scale-95 transition-all duration-300";

  return (
    <div
      className={`${anton.className}
      flex flex-col ${isMobile ? '' : 'md:flex-row'}
      items-center justify-center
      ${isMobile ? 'gap-10' : 'gap-8 md:gap-16'}`}
    >
      <button
        onClick={() => scrollTo(homeRef)}
        style={{ cursor: 'url("/icons/cursor.png"), auto' }}
        className={btn}
      >
        HOME
      </button>

      <button
        onClick={() => scrollTo(aboutRef)}
        style={{ cursor: 'url("/icons/cursor.png"), auto' }}
        className={btn}
      >
        ABOUT
      </button>

      <button
        onClick={() => scrollTo(workRef)}
        style={{ cursor: 'url("/icons/cursor.png"), auto' }}
        className={btn}
      >
        WORK
      </button>

      <Link href="/contact" onClick={onItemClick}>
        <button
          style={{ cursor: 'url("/icons/cursor.png"), auto' }}
          className={btn}
        >
          CONTACT
        </button>
      </Link>
    </div>
  );
}

export default Comp;
