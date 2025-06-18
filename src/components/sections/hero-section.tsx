
"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";

const HeroSection: React.FC = () => {
  const handleScrollToDetails = () => {
    const detailsSection = document.getElementById('details'); // ID of the WeddingDetailsSection
    if (detailsSection) {
      detailsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen text-center bg-background"
    >
      <Image
        src="https://images.unsplash.com/photo-1521334884684-d80222895322"
        alt="Elegant wedding floral background"
        layout="fill"
        objectFit="cover"
        quality={80}
        className="opacity-50"
        priority
        data-ai-hint="wedding floral"
      />
      {/* <FloatingHearts /> */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 p-8 md:p-12 bg-background/70 backdrop-blur-md rounded-xl shadow-xl max-w-lg md:max-w-2xl text-primary-foreground"
      >
        <p className="font-headline text-sm md:text-base uppercase tracking-wider text-primary-foreground/80 mb-2 md:mb-3">
          The Wedding of
        </p>
        <h1 className="font-headline text-5xl md:text-7xl text-primary-foreground mb-3 md:mb-4 flex items-center justify-center space-x-2 md:space-x-3">
          <span>Nico</span>
          <Heart className="w-7 h-7 md:w-10 md:h-10 text-primary fill-primary" />
          <span>Trio</span>
        </h1>
        <p className="font-body text-lg md:text-xl text-primary-foreground/70 mb-6 md:mb-8">
          December 20, 2025
        </p>
        <Button
          size="lg"
          className="font-body text-lg bg-primary hover:bg-primary/80 text-primary-foreground rounded-full border border-primary-foreground/20 shadow-md transition-all hover:shadow-lg focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={handleScrollToDetails}
          aria-label="Open Invitation and view wedding details"
        >
          Open Invitation
        </Button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
