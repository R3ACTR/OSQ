import { useState, useEffect } from 'react';

export const useValentineEvent = () => {
  const [isEventActive, setIsEventActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [nextEventLabel, setNextEventLabel] = useState('');

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      
      const eventStart = new Date('2026-02-21T00:00:00+05:30');
      const eventEnd = new Date('2026-02-22T23:59:59+05:30');

      if (now >= eventStart && now <= eventEnd) {
        setIsEventActive(true);
        setNextEventLabel('EPOQ 2X BOOST ENDS IN');
        const diff = eventEnd.getTime() - now.getTime();
        setTimeRemaining(formatTime(diff));
      } else if (now < eventStart) {
        setIsEventActive(false);
        setNextEventLabel('EPOQ 2X BOOST');
        const diff = eventStart.getTime() - now.getTime();
        setTimeRemaining(formatTime(diff));
      } else {
        setIsEventActive(false);
        setNextEventLabel('EVENT ENDED');
        setTimeRemaining('0d : 00h : 00m : 00s');
      }
    };

    const formatTime = (ms: number) => {
      if (ms < 0) return '0d : 00h : 00m : 00s';
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
