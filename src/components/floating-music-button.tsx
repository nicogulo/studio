
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, Volume1, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import type {FC} from 'react';

interface FloatingMusicButtonProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  volume: number;
  onVolumeChange: (newVolume: number) => void;
}

const FloatingMusicButton: FC<FloatingMusicButtonProps> = ({ 
  isPlaying, 
  onTogglePlay,
  volume,
  onVolumeChange
}) => {

  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-5 w-5 text-primary" />;
    if (volume < 0.5) return <Volume1 className="h-5 w-5 text-primary" />;
    return <Volume2 className="h-5 w-5 text-primary" />;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-4 right-4 z-50 sm:bottom-5 sm:right-5"
    >
      <Card className="p-2 flex items-center space-x-2 bg-background/80 hover:bg-background/95 border-primary/20 text-primary backdrop-blur-sm rounded-xl shadow-xl">
        <Button
          onClick={onTogglePlay}
          variant="ghost"
          size="icon"
          className="text-primary hover:bg-primary/10 hover:text-primary rounded-full w-10 h-10"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        <div className="flex items-center space-x-1.5 pr-1">
          <VolumeIcon />
          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            className="w-20 sm:w-24"
            onValueChange={(value) => onVolumeChange(value[0] / 100)}
            aria-label="Volume control"
          />
        </div>
      </Card>
    </motion.div>
  );
};

export default FloatingMusicButton;
