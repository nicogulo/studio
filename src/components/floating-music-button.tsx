
"use client";

import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

interface FloatingMusicButtonProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const FloatingMusicButton: React.FC<FloatingMusicButtonProps> = ({ isPlaying, onTogglePlay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-5 right-5 z-50"
    >
      <Button
        onClick={onTogglePlay}
        variant="outline"
        size="icon"
        className="bg-background/80 hover:bg-background/95 border-primary/30 text-primary hover:text-primary rounded-full w-12 h-12 shadow-lg backdrop-blur-sm"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
      </Button>
    </motion.div>
  );
};

export default FloatingMusicButton;
