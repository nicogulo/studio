
"use client";

import { useState, useRef, useEffect } from 'react';
import HeroSection from "@/components/sections/hero-section";
import ThanksgivingSection from "@/components/sections/thanksgiving-section";
import StoryGallerySection from "@/components/sections/story-gallery-section";
import PhotoGallerySection from "@/components/sections/photo-gallery-section";
import CountdownTimerSection from "@/components/sections/countdown-timer-section";
import WeddingDetailsSection from "@/components/sections/wedding-details-section";
import AttireSuggestionsSection from "@/components/sections/attire-suggestions-section";
import GiftInformationSection from "@/components/sections/gift-information-section";
import RsvpSection from "@/components/sections/rsvp-section";
import FooterSection from "@/components/sections/footer-section";
import FloralDivider from "@/components/floral-divider";
import FloatingMusicButton from '@/components/floating-music-button';

// Music file 'song.webm' should be placed in the 'public' folder of your project.
// This allows it to be served directly, e.g., http://localhost:3000/song.webm
// Ensure you have the necessary rights/licenses for any music used.
const MUSIC_URL = "/song.webm"; 

export default function HomePage() {
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMusicPlayerVisible, setIsMusicPlayerVisible] = useState(false);
  const [volume, setVolume] = useState(0.5); // Volume range: 0.0 to 1.0
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
        audioRef.current = new Audio(MUSIC_URL);
        audioRef.current.loop = true;
        audioRef.current.volume = volume; 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
        setIsMusicPlayerVisible(true);
      }).catch(error => console.error("Error playing audio:", error));
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    }
  };

  const toggleMusic = () => {
    if (isPlayingMusic) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleUnlockScrollAndNavigate = () => {
    setIsScrollLocked(false);
    playMusic();

    requestAnimationFrame(() => {
      setTimeout(() => {
        const targetSection = document.getElementById("thanksgiving");
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); 
    });
  };

  return (
    <div 
      className={`
        flex items-center justify-center bg-gray-800
        ${isScrollLocked ? 'h-screen overflow-y-hidden' : 'min-h-screen overflow-y-auto'}
      `}
    >
      <main
        className={`
          relative w-full max-w-[28.125rem] bg-background shadow-2xl 
          transition-all duration-300 ease-in-out
          ${isScrollLocked ? 'h-full' : 'h-auto'} 
        `}
        style={{ WebkitOverflowScrolling: 'touch' }} 
      >
        <HeroSection 
          onUnlockScrollAndNavigate={handleUnlockScrollAndNavigate} 
        />
        {!isScrollLocked && (
          <>
            <ThanksgivingSection />
            <FloralDivider />
            <StoryGallerySection />
            <FloralDivider /> 
            <PhotoGallerySection /> 
            <FloralDivider />
            <CountdownTimerSection />
            <FloralDivider />
            <WeddingDetailsSection />
            <FloralDivider />
            <AttireSuggestionsSection />
            <FloralDivider />
            <GiftInformationSection /> 
            <FloralDivider />
            <RsvpSection />
            <FooterSection />
          </>
        )}
        {isMusicPlayerVisible && (
          <FloatingMusicButton
            isPlaying={isPlayingMusic}
            onTogglePlay={toggleMusic}
            volume={volume}
            onVolumeChange={handleVolumeChange}
          />
        )}
      </main>
    </div>
  );
}
