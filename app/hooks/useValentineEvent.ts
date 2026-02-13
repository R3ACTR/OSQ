import { useState, useEffect } from 'react';

export const useValentineEvent = () => {
  const [isEventActive, setIsEventActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [nextEventLabel, setNextEventLabel] = useState('');

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Event start: Feb 14 00:00:00 (Local Time)
      const start = new Date(currentYear, 1, 14, 0, 0, 0); 
      // Event end: Feb 15 00:00:00 (Local Time)
      const end = new Date(currentYear, 1, 15, 0, 0, 0);

      // For testing purposes, if we are past the event in the current year, check next year? 
      // User prompt says "14th feb 12 am to 15th feb 12 am". Assuming current upcoming Feb 14.
      // Current date is 2026-02-13. So upcoming is 2026-02-14.

      if (now >= start && now < end) {
        setIsEventActive(true);
        setNextEventLabel('EVENT ENDS IN');
        const diff = end.getTime() - now.getTime();
        setTimeRemaining(formatTime(diff));
      } else if (now < start) {
        setIsEventActive(false);
        setNextEventLabel('NEXT EVENT');
        const diff = start.getTime() - now.getTime();
        setTimeRemaining(formatTime(diff));
      } else {
        // Event passed for this year
        setIsEventActive(false);
        setNextEventLabel('NEXT EVENT');
        // Calculate time to next year's event
        const nextYearStart = new Date(currentYear + 1, 1, 14, 0, 0, 0);
        const diff = nextYearStart.getTime() - now.getTime();
        setTimeRemaining(formatTime(diff));
      }
    };

    const formatTime = (ms: number) => {
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));
      const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((ms % (1000 * 60)) / 1000);
      return `${days}d : ${hours.toString().padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m : ${seconds.toString().padStart(2, '0')}s`;
    };

    const timer = setInterval(checkTime, 1000);
    checkTime(); // Initial check

    return () => clearInterval(timer);
  }, []);

  return { isEventActive, timeRemaining, nextEventLabel };
};
