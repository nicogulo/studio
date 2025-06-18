"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimerSection: React.FC = () => {
  const weddingDate = new Date("2025-12-20T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft | null => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };
    
    setTimeLeft(calculateTimeLeft()); // Initial calculation client-side

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  if (!timeLeft) {
    // Render placeholder or loading state to avoid hydration mismatch
    return (
      <section className="py-16 md:py-24 bg-secondary/30 text-center">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="font-headline text-4xl md:text-5xl text-primary-foreground mb-2"
          >
            Counting Down To Our Big Day
          </motion.h2>
          <div className="flex justify-center space-x-2 sm:space-x-4 md:space-x-8 mt-8">
            {[ 'Days', 'Hours', 'Minutes', 'Seconds'].map((unit) => (
                <div key={unit} className="p-3 md:p-6 bg-background/70 rounded-lg shadow-lg w-20 h-20 md:w-32 md:h-32 flex flex-col justify-center items-center">
                  <span className="font-headline text-2xl md:text-5xl text-primary animate-pulse">--</span>
                  <span className="font-body text-xs md:text-sm text-primary-foreground/80 uppercase">{unit}</span>
                </div>
              ))}
          </div>
        </div>
      </section>
    );
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary/30 text-center">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="font-headline text-4xl md:text-5xl text-primary-foreground mb-2"
        >
          Counting Down To Our Big Day
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-body text-lg text-primary-foreground/80 mb-12"
        >
          December 20, 2025
        </motion.p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="p-4 md:p-6 bg-background/70 rounded-xl shadow-xl w-28 h-28 md:w-36 md:h-36 flex flex-col justify-center items-center glow"
            >
              <span className="font-headline text-3xl md:text-6xl text-primary">
                {unit.value < 10 ? `0${unit.value}` : unit.value}
              </span>
              <span className="font-body text-sm md:text-base text-primary-foreground/80 uppercase mt-1">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownTimerSection;
