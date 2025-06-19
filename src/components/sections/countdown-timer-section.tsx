
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
    
    setTimeLeft(calculateTimeLeft()); // Initial calculation

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // weddingDate is constant

  const loadingState = (
    <section className="py-16 bg-secondary/20 text-center">
      <div className="px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-headline text-3xl text-primary-foreground mb-4"
        >
          Counting Down
        </motion.h2>
        <div className="flex justify-center space-x-2 mt-8">
          {[ 'Days', 'Hours', 'Minutes', 'Seconds'].map((unit) => (
              <div key={unit} className="p-3 bg-background/80 rounded-lg shadow-md w-16 h-16 flex flex-col justify-center items-center">
                <span className="font-headline text-xl text-primary animate-pulse">--</span>
                <span className="font-body text-xs text-muted-foreground uppercase">{unit}</span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );

  if (!timeLeft) {
    return loadingState;
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-16 bg-secondary/20 text-center">
      <div className="px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-headline text-3xl text-primary-foreground mb-3"
        >
          Counting Down
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="font-body text-base text-muted-foreground mb-8"
        >
          To Our Special Day: December 20, 2025
        </motion.p>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
          {timeUnits.map((unit, index) => (
            <motion.div // Outer div for initial reveal
              key={unit.label}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.07, ease: "easeOut" }}
              // Base shadow can be applied here, or rely purely on animated shadow
              className="bg-background/90 rounded-xl w-full sm:w-24 h-24 flex flex-col justify-center items-center overflow-hidden"
            >
              <motion.div // Inner div for continuous glow and subtle pulse
                animate={{
                  scale: [1, 1.015, 1], // Subtle scale pulse
                  boxShadow: [ // Glow effect using primary color (HSL 8, 48%, 80%)
                    "inset 0 0 0px hsla(8, 48%, 80%, 0.0)",
                    "inset 0 0 12px hsla(8, 48%, 80%, 0.6)",
                    "inset 0 0 0px hsla(8, 48%, 80%, 0.0)",
                  ]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5, 
                  ease: "easeInOut",
                  delay: index * 0.25 // Stagger the start of the loops
                }}
                className="w-full h-full flex flex-col justify-center items-center p-3 rounded-xl" 
              >
                <span className="font-headline text-2xl sm:text-3xl text-primary">
                  {unit.value < 10 ? `0${unit.value}` : unit.value}
                </span>
                <span className="font-body text-xs sm:text-sm text-muted-foreground uppercase mt-1">
                  {unit.label}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownTimerSection;
