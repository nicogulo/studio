
"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  onUnlockScrollAndNavigate: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  onUnlockScrollAndNavigate 
}) => {
  
  const handleCTAInteraction = () => {
    onUnlockScrollAndNavigate();
    // The actual scroll logic and music play request are now handled by onUnlockScrollAndNavigate in HomePage
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen text-center text-white"
    >
      <Image
        src="https://images.unsplash.com/photo-1563808599481-34a342e44508?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjb3VwbGUlMjB3ZWRkaW5nfGVufDB8fHx8MTc1MDI2ODI1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Frans and Nadia"
        fill 
        style={{ objectFit: "cover" }} 
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
        {/* Top Content: Title, Names, Date */}
        <div className="flex flex-col items-center text-center">
          <p className="font-body text-xs uppercase tracking-wider text-white/90 sm:text-sm">
            The Wedding of
          </p>
          <h1 className="font-headline text-4xl text-white sm:text-5xl mt-1 mb-2">
            Frans & Nadia
          </h1>
          <p className="font-body text-sm text-white/80 sm:text-base">
            Tuesday, November 02, 2027
          </p>
        </div>
        
        {/* Bottom Content: CTA Button and Disclaimer */}
        <div className="w-full max-w-xs text-center">
          <Button
            size="lg"
            className="font-body w-full rounded-lg border border-white/40 bg-white/20 py-2.5 text-sm text-white shadow-lg backdrop-blur-sm transition-all hover:bg-white/30 hover:shadow-xl focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/50 sm:py-3 sm:text-base"
            onClick={handleCTAInteraction}
            aria-label="Open Invitation and see wedding details"
          >
            <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Open Invitation
          </Button>
          <p className="mt-2 font-body text-[10px] italic text-white/70 sm:mt-3 sm:text-xs">
            *Please excuse any errors in names or titles.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
