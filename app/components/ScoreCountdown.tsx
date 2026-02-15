"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Zap, Heart } from 'lucide-react';
import { useValentineEvent } from '../hooks/useValentineEvent';

const ScoreCountdown = () => {
  // Use the shared hook for consistent timing
  const { isEventActive, timeRemaining, nextEventLabel } = useValentineEvent();
  // We need to wait for client-side hydration to avoid mismatches
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.9 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 md:bottom-6 md:left-6 md:translate-x-0 z-[100] pointer-events-auto w-max max-w-[90vw]"
      >
        <div className={`
          relative overflow-hidden rounded-full border px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-md shadow-2xl flex items-center gap-2 md:gap-3 transition-colors duration-500 z-10
          ${isEventActive 
            ? 'bg-zinc-100/90 border-zinc-300 shadow-zinc-200/50' 
            : 'bg-zinc-50/90 border-zinc-200 shadow-zinc-200/30'}
        `}>
          {/* Animated Background Gradient for Active State - Softer shimmer */}
          {isEventActive && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" 
                 style={{ backgroundSize: '200% 100%' }} />
          )}

          <div className="relative z-10 flex items-center gap-2 md:gap-3">
            <div className={`flex items-center gap-1.5 md:gap-2 border-r pr-2 md:pr-3 ${isEventActive ? 'border-zinc-300/50' : 'border-zinc-200/50'}`}>
              {isEventActive ? (
                <Heart className="text-zinc-500 animate-pulse w-3 h-3 md:w-4 md:h-4 fill-zinc-500" />
              ) : (
                <Timer className="text-zinc-400 w-3 h-3 md:w-4 md:h-4" />
              )}
              <span className={`text-[10px] md:text-xs font-bold font-[family-name:var(--font-passero)] tracking-wider whitespace-nowrap ${isEventActive ? 'text-zinc-600' : 'text-zinc-500'}`}>
                {isEventActive ? '2X LOVE BOOST' : nextEventLabel}
              </span>
            </div>

            <div className={`flex items-center gap-0.5 md:gap-1 font-mono text-xs md:text-sm font-bold ${isEventActive ? 'text-zinc-600' : 'text-zinc-500'}`}>
               <span>{timeRemaining}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScoreCountdown;
