
"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Image from "next/image";

const HeroSection: React.FC = () => {
  const handleScrollToDetails = () => {
    // When in ScrollArea, we need to target the scrollable element within it.
    // This is a common pattern for shadcn/ui ScrollArea.
    const scrollableViewport = document.querySelector(
      'div[data-radix-scroll-area-viewport="true"]'
    );
    const detailsSection = document.getElementById("details");

    if (detailsSection && scrollableViewport) {
      // Calculate offset relative to the scrollable viewport
      const scrollTop = scrollableViewport.scrollTop;
      const offsetTop = detailsSection.offsetTop;
      
      scrollableViewport.scrollTo({
        top: offsetTop + scrollTop - (scrollableViewport.clientHeight * 0.1), // Adjust offset if needed
        behavior: "smooth",
      });
    } else if (detailsSection) {
      // Fallback for direct scrolling if viewport not found (less likely with ScrollArea)
       detailsSection.scrollIntoView({ behavior: 'smooth' });
    }
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
        className="relative z-10 flex flex-col items-center justify-between h-full w-full p-6" 
      >
        {/* Removed top spacer div */}
        <div className="flex flex-col items-center">
          <p className="font-body text-xs sm:text-sm uppercase tracking-wider text-white/90 mb-2">
            The Wedding of
          </p>
          <h1 className="font-headline text-4xl sm:text-5xl text-white mb-3">
            Nico & Trio
          </h1>
          <p className="font-body text-sm sm:text-base text-white/80">
            Tuesday, 02 November 2027
          </p>
        </div>

        {/* Removed flex-grow spacer div */}
        
        <div className="w-full max-w-xs">
          <Button
            size="lg"
            className="font-body text-sm sm:text-base bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg border border-white/40 shadow-lg transition-all hover:shadow-xl focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/50 w-full py-2.5 sm:py-3"
            onClick={handleScrollToDetails}
            aria-label="Buka Undangan dan lihat detail pernikahan"
          >
            <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Buka Undangan
          </Button>
          <p className="font-body text-[10px] sm:text-xs italic text-white/70 mt-2 sm:mt-3">
            *Mohon maaf apabila ada kesalahan penulisan nama/gelar
          </p>
        </div>
        {/* Removed bottom padding div */}
      </motion.div>
    </section>
  );
};

export default HeroSection;
