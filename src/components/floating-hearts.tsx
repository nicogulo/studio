"use client";

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeartItem {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<HeartItem[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: HeartItem[] = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 20 + 100, // Start below the screen
        size: Math.random() * 15 + 10,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 5,
      }));
      setHearts(newHearts);
    };

    generateHearts();
    const interval = setInterval(generateHearts, 10000); // Regenerate hearts periodically

    return () => clearInterval(interval);
  }, []);

  if (hearts.length === 0) {
    return null; // Don't render if hearts haven't been generated yet to avoid hydration mismatch
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 0, y: `${heart.y}vh`, x: `${heart.x}vw` }}
          animate={{ opacity: [0, 0.7, 0], y: [`${heart.y}vh`, '-20vh'] }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 5, // Staggered repeats
          }}
          style={{ position: 'absolute' }}
        >
          <Heart
            className="text-primary/50"
            fill="currentColor"
            size={heart.size}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
