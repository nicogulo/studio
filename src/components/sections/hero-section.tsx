
"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from 'react';

const HeroSection: React.FC = () => {
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to ensure scroll is re-enabled if component unmounts while locked
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLocked]);

  const handleUnlockScrollAndNavigate = () => {
    setIsLocked(false);
    const nextSection = document.getElementById('gallery'); // ID of the StoryGallerySection
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen text-center bg-background"
    >
      <Image
        src="https://images.unsplash.com/photo-1521334884684-d80222895322"
        alt="Elegant wedding couple"
        layout="fill"
        objectFit="cover"
        quality={80}
        className="opacity-50"
        priority
        data-ai-hint="wedding couple"
      />
      {/* <FloatingHearts /> */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 p-8 bg-background/70 backdrop-blur-md rounded-xl shadow-xl"
      >
        <h1 className="font-headline text-5xl md:text-7xl text-primary-foreground mb-4 flex items-center justify-center space-x-2 md:space-x-4">
          <span>Nico</span>
          <Heart className="w-8 h-8 md:w-12 md:h-12 text-primary fill-primary" />
          <span>Trio</span>
        </h1>
        <p className="font-body text-xl md:text-2xl text-primary-foreground/80 mb-8">
          Celebrating Our Forever
        </p>
        <Button
          size="lg"
          className="font-body text-lg bg-primary hover:bg-primary/80 text-primary-foreground rounded-full border border-primary-foreground/20 shadow-md transition-all hover:shadow-lg focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={handleUnlockScrollAndNavigate}
          aria-label="Buka Undangan dan lihat detail acara pernikahan"
        >
          Buka Undangan
        </Button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
