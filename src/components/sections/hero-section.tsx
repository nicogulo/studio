
"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail } from "lucide-react"; // Changed from Heart to Mail
import Image from "next/image";

const HeroSection: React.FC = () => {
  const handleScrollToDetails = () => {
    const detailsSection = document.getElementById('details'); // Target '#details'
    if (detailsSection) {
      detailsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen text-center text-white" // Removed bg-background, will be covered by image
    >
      <Image
        src="https://placehold.co/1280x1920.png" // Placeholder for a couple image
        alt="Nico and Trio"
        layout="fill"
        objectFit="cover"
        quality={80}
        className="z-0" // Ensure image is in the background
        priority
        data-ai-hint="couple rooftop" // Hint for actual image
      />
      <div className="absolute inset-0 bg-black/50 z-1" /> 

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-between h-full w-full p-8 md:p-12" // Adjusted for new layout
      >
        {/* Spacer to push content appropriately */}
        <div className="flex-grow-[0.25]"></div>

        {/* Text Content Area */}
        <div className="flex flex-col items-center">
          <p className="font-headline text-sm md:text-base uppercase tracking-wider text-white/90 mb-2 md:mb-3">
            The Wedding of
          </p>
          <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-3 md:mb-4">
            Nico & Trio
          </h1>
          <p className="font-body text-base md:text-lg text-white/80 mb-10 md:mb-16">
            Tuesday, 02 November 2027
          </p>
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>
        
        {/* Button and Disclaimer Area */}
        <div className="w-full max-w-md">
          <Button
            size="lg"
            className="font-body text-base md:text-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full border border-white/40 shadow-lg transition-all hover:shadow-xl focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/50 w-full py-3"
            onClick={handleScrollToDetails}
            aria-label="Buka Undangan dan lihat detail pernikahan"
          >
            <Mail className="mr-2 h-5 w-5" />
            Buka Undangan
          </Button>
          <p className="font-body text-xs italic text-white/70 mt-3">
            *Mohon maaf apabila ada kesalahan penulisan nama/gelar
          </p>
        </div>
        <div className="pb-4"></div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
