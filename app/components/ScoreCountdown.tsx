"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Zap } from 'lucide-react';

const ScoreCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isActive: boolean;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // 1. Get current time in IST explicitly
      // Using toLocaleString with Asia/Kolkata timezone to get accurate components
      const now = new Date();
      const istString = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
      const currentIST = new Date(istString);
      
      // Get current day index in IST (0=Sun, 1=Mon, ..., 6=Sat)
      const dayIndex = currentIST.getDay();
      
      // Active on Saturday (6) and Sunday (0)
      const isActive = dayIndex === 6 || dayIndex === 0;

      // 2. Determine Target Date (IST)
      // We start with currentIST and manipulate it to find the deadline
      let targetIST = new Date(currentIST);
      targetIST.setHours(0, 0, 0, 0); // Reset to start of day 00:00:00

      if (isActive) {
        // If active, countdown to Next Monday 00:00:00 (End of Sunday)
        let daysToAdd = 0;
        if (dayIndex === 6) { 
           // Saturday: Next Monday is +2 days (Sat->Sun->Mon)
           daysToAdd = 2;
        } else if (dayIndex === 0) {
           // Sunday: Next Monday is +1 day (Sun->Mon)
           daysToAdd = 1;
        }
        targetIST.setDate(targetIST.getDate() + daysToAdd);
      } else {
        // If inactive, countdown to Next Saturday 00:00:00
        // Mon(1)->Sat(6): +5 days
        // Tue(2)->Sat(6): +4 days
        // ...
        // Fri(5)->Sat(6): +1 day
        const daysToAdd = 6 - dayIndex;
        targetIST.setDate(targetIST.getDate() + daysToAdd);
      }
      
      // 3. Calculate Difference
      // Since currentIST and targetIST are both constructed from local-relative strings 
      // treated as local time objects, their difference in milliseconds is accurate relative duration.
      const difference = targetIST.getTime() - currentIST.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isActive
        };
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isActive };
      }
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Initial call
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

  // Avoid hydration mismatch by not rendering until client-side calculation is done
  if (!timeLeft) return null;

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 md:bottom-6 md:left-6 md:translate-x-0 z-[100] pointer-events-auto w-max max-w-[90vw]"
      >
        <div className={`
          relative overflow-hidden rounded-full border px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-md shadow-2xl flex items-center gap-2 md:gap-3
          ${timeLeft.isActive 
            ? 'bg-zinc-900/95 border-[#bfff00]/50 shadow-[#bfff00]/20' 
            : 'bg-white/90 border-zinc-200 shadow-zinc-300'}
        `}>
          {/* Animated Background Gradient for Active State */}
          {timeLeft.isActive && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#bfff00]/10 to-transparent animate-shimmer" 
                 style={{ backgroundSize: '200% 100%' }} />
          )}

          <div className="relative z-10 flex items-center gap-2 md:gap-3">
            <div className="flex items-center gap-1.5 md:gap-2 border-r border-zinc-700/30 pr-2 md:pr-3">
              {timeLeft.isActive ? (
                <Zap className="text-[#bfff00] animate-pulse w-3 h-3 md:w-4 md:h-4" fill="#bfff00" />
              ) : (
                <Timer className="text-zinc-500 w-3 h-3 md:w-4 md:h-4" />
              )}
              <span className={`text-[10px] md:text-xs font-bold font-[family-name:var(--font-passero)] tracking-wider whitespace-nowrap ${timeLeft.isActive ? 'text-[#bfff00]' : 'text-zinc-600'}`}>
                {timeLeft.isActive ? '2X BOOST' : 'NEXT EVENT'}
              </span>
            </div>

            <div className={`flex items-center gap-0.5 md:gap-1 font-mono text-xs md:text-sm font-bold ${timeLeft.isActive ? 'text-white' : 'text-zinc-800'}`}>
              <span>{String(timeLeft.days)}d</span>
              <span className="opacity-50">:</span>
              <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span className="opacity-50">:</span>
              <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span className="opacity-50">:</span>
              <span className={`${timeLeft.isActive ? 'text-[#bfff00]' : 'text-zinc-500'}`}>
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScoreCountdown;
