
"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  onUnlockScroll: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onUnlockScroll }) => {
  const handleScrollToDetails = () => {
    onUnlockScroll(); // Unlock scroll first

    requestAnimationFrame(() => {
      const scrollableViewport = document.querySelector(
        'div[data-radix-scroll-area-viewport="true"]'
      );
      const detailsSection = document.getElementById("wedding-details");

      if (detailsSection && scrollableViewport) {
        const scrollTop = scrollableViewport.scrollTop; // Current scroll position of the viewport
        const offsetTop = detailsSection.offsetTop; // Target element's offset from the top of the viewport
        
        // Calculate the target scroll position
        // Subtract a small offset to ensure the section title is visible (e.g., 10% of viewport height)
        const scrollTarget = offsetTop + scrollTop - (scrollableViewport.clientHeight * 0.1);
        
        scrollableViewport.scrollTo({
          top: scrollTarget, 
          behavior: "smooth",
        });
      } else if (detailsSection) {
        // Fallback for environments where scrollableViewport might not be found immediately
        // or if the scroll area isn't the direct parent.
         detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen text-center text-white"
    >
      <Image
        src="https://images.unsplash.com/photo-1563808599481-34a342e44508?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjb3VwbGUlMjB3ZWRkaW5nfGVufDB8fHx8MTc1MDI2ODI1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Nico and Trio"
        layout="fill"
        objectFit="cover"
        quality={80}
        className="z-0"
        priority
        data-ai-hint="couple rooftop"
      />
      <div className="absolute inset-0 bg-black/50 z-1" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 flex h-screen w-full flex-col items-center justify-between px-6 py-6"
      >
        <div className="flex flex-col items-center">
          <p className="font-body text-xs uppercase tracking-wider text-white/90 sm:text-sm">
            The Wedding of
          </p>
          <h1 className="font-headline text-4xl text-white sm:text-5xl">
            Nico & Trio
          </h1>
          <p className="font-body text-sm text-white/80 sm:text-base">
            Tuesday, 02 November 2027
          </p>
        </div>
        
        <div className="w-full max-w-xs">
          <Button
            size="lg"
            className="font-body w-full rounded-lg border border-white/40 bg-white/20 py-2.5 text-sm text-white shadow-lg backdrop-blur-sm transition-all hover:bg-white/30 hover:shadow-xl focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/50 sm:py-3 sm:text-base"
            onClick={handleScrollToDetails}
            aria-label="Buka Undangan dan lihat detail pernikahan"
          >
            <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Buka Undangan
          </Button>
          <p className="mt-2 font-body text-[10px] italic text-white/70 sm:mt-3 sm:text-xs">
            *Mohon maaf apabila ada kesalahan penulisan nama/gelar
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
