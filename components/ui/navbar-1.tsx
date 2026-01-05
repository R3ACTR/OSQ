"use client" 

import * as React from "react"
import { useState, useRef, useLayoutEffect, useEffect } from "react"
import { Menu, X } from "lucide-react"
import gsap from "gsap"

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  // Initial Entrance Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Logo Animation
      gsap.from(logoRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)" 
      });

      // Nav Items Stagger
      if (navItemsRef.current) {
        const items = navItemsRef.current.children;
        gsap.from(items, {
          y: -10,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.2
        });
      }

      // CTA Button
      gsap.from(ctaRef.current, {
        x: 20,
        opacity: 0,
        duration: 0.5,
        delay: 0.4
      });

    });
    return () => ctx.revert();
  }, []);

  // Mobile Menu Animation
  useEffect(() => {
    const menu = menuRef.current;
    if (isOpen && menu) {
      const ctx = gsap.context(() => {
        gsap.fromTo(menu, 
          { x: "100%" },
          { x: 0, duration: 0.3, ease: "power3.out" }
        );
        
        const links = menu.querySelectorAll('.mobile-link');
        gsap.fromTo(links,
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, delay: 0.1 }
        );

        const cta = menu.querySelector('.mobile-cta');
        gsap.fromTo(cta,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, delay: 0.4 }
        );
      }, menuRef);
      return () => ctx.revert();
    }
  }, [isOpen]);

  return (
    <div className="flex justify-center w-full py-6 px-4">
      <div className="flex items-center justify-between px-6 py-3 bg-white rounded-full shadow-lg w-full max-w-3xl relative z-10 border border-zinc-200/50">
        <div className="flex items-center">
          <div
            ref={logoRef}
            className="w-8 h-8 mr-6 hover:rotate-12 transition-transform duration-300"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="url(#paint0_linear)" />
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF9966" />
                  <stop offset="1" stopColor="#FF5E62" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
          {/* Desktop Navigation */}
          <nav ref={navItemsRef} className="hidden md:flex items-center space-x-8">
            {["Home", "Pricing", "Docs", "Projects"].map((item) => (
              <div
                key={item}
                className="hover:scale-105 transition-transform duration-200"
              >
                <a href="#" className="text-sm text-gray-900 hover:text-gray-600 transition-colors font-medium">
                  {item}
                </a>
              </div>
            ))}
          </nav>

        {/* Desktop CTA Button */}
        <div
          ref={ctaRef}
          className="hidden md:block hover:scale-105 transition-transform duration-200"
        >
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-2 text-sm text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden flex items-center active:scale-95 transition-transform" onClick={toggleMenu}>
          <Menu className="h-6 w-6 text-gray-900" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 bg-white z-50 pt-24 px-6 md:hidden"
        >
          <button
            className="absolute top-6 right-6 p-2 active:scale-95 transition-transform"
            onClick={toggleMenu}
          >
            <X className="h-6 w-6 text-gray-900" />
          </button>
          <div className="flex flex-col space-y-6">
            {["Home", "Pricing", "Docs", "Projects"].map((item) => (
              <div
                key={item}
                className="mobile-link"
              >
                <a href="#" className="text-base text-gray-900 font-medium" onClick={toggleMenu}>
                  {item}
                </a>
              </div>
            ))}

            <div className="pt-6 mobile-cta">
              <a
                href="#"
                className="inline-flex items-center justify-center w-full px-5 py-3 text-base text-white bg-black rounded-full hover:bg-gray-800 transition-colors "
                onClick={toggleMenu}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { Navbar1 }
