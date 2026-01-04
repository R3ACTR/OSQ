import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Comp, { openSans } from "../NavbarComponents/Comp";
import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";
import gsap from "gsap";

function Navbar({homeRef, aboutRef, workRef}: any) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isClicked, setIsClicked] = React.useState(false);

  const handleAnimation = useCallback(() => {
    const tl = gsap.timeline();

    if (!isClicked) {
      tl.from(".bar", {
        opacity: 0,
        duration: 0.2,
        y: -100,
        ease: "back.out",
      }).to(".bar", {
        opacity: 1,
        duration: 0.2,
        y: 0,
        ease: "back.out",
      });
    } else {
      tl.to(".bar", {
        opacity: 0,
        duration: 0.6,
        y: -100,
        ease: "back.out",
      });
    }
  }, [isClicked]);

  useEffect(() => {
    handleAnimation();
  }, [handleAnimation]);

  const toggleMenu = () => {
    setIsClicked((prevState) => !prevState);
  };

  return (
    <>
      <nav className="md:mx-12 mx-2 mt-3 flex md:grid md:grid-cols-3 justify-between items-center select-none bg-white/10 backdrop-blur-md rounded-full px-6 py-2 border border-white/20">
        <Image 
          src="/r3actr.png" 
          width={160} 
          height={100} 
          className="md:w-[96px] md:h-[60px] h-[48px] w-[84px] md:justify-self-start object-contain" 
          alt="Logo" 
        />
        
        {/* Desktop Navigation */}
        <div className="bar md:block hidden md:justify-self-center">
          <Comp homeRef={homeRef} aboutRef={aboutRef} workRef={workRef} />
        </div>
        
        {/* Mobile Hamburger Menu Icon */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMenu}
            className="p-2 text-black"
            aria-label="Toggle menu"
          >
            <svg 
              className="w-8 h-8" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isClicked ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Social Icons */}
        <div className="hidden md:flex gap-4 items-center md:justify-self-end">
          <a href="https://www.linkedin.com/company/r3actr-innovations" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#b2de21] transition-colors duration-300">
            <IconBrandLinkedin size={32} stroke={1.5} />
          </a>
          <a href="https://github.com/R3ACTR" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#b2de21] transition-colors duration-300">
            <IconBrandGithub size={32} stroke={1.5} />
          </a>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-black z-[9999] overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
          isClicked 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        {/* Close button */}
        <button
          onClick={toggleMenu}
          className="absolute top-6 right-6 text-[#b2de21] p-2 hover:scale-110 transition-transform z-10"
          aria-label="Close menu"
        >
          <svg 
            className="w-8 h-8" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>

        {/* Mobile Menu Items - Centered Container */}
        <div className="h-full w-full flex items-center justify-center">
          <Comp 
            homeRef={homeRef} 
            aboutRef={aboutRef} 
            workRef={workRef} 
            onItemClick={toggleMenu}
            isMobile={true}
          />
        </div>
      </div>
    </>
  );
}

export default Navbar;