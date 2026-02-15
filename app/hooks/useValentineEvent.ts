import { useState, useEffect } from 'react';

export const useValentineEvent = () => {
  const [isEventActive, setIsEventActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [nextEventLabel, setNextEventLabel] = useState('');

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      
      // Calculate next Saturday
      const nextSaturday = new Date(now);
      const dayOfWeek = now.getDay();
      const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
      
      // If today is Saturday, we want the next Saturday (7 days later), 
      // unless we want to show it as active on current Saturday?
      // Assuming "next boost" implies future countdown.
      const daysToAdd = daysUntilSaturday === 0 ? 7 : daysUntilSaturday;
      
      nextSaturday.setDate(now.getDate() + daysToAdd);
      nextSaturday.setHours(0, 0, 0, 0); // Midnight start of Saturday

      // For now, we'll keep it as a countdown to the start of the boost
      setIsEventActive(false);
      setNextEventLabel('NEXT BOOST');
      
      const diff = nextSaturday.getTime() - now.getTime();
      setTimeRemaining(formatTime(diff));
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
