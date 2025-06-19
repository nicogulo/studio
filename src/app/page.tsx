
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
import FloatingMusicButton from '@/components/floating-music-button'; // New import

// IMPORTANT: Replace this URL with your chosen royalty-free music track.
const MUSIC_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export default function HomePage() {
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMusicPlayerVisible, setIsMusicPlayerVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element ref once component is mounted
    if (typeof window !== "undefined") {
        audioRef.current = new Audio(MUSIC_URL);
        audioRef.current.loop = true; // Optional: loop the music
    }
  }, []);

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

  const handleUnlockScrollAndNavigate = () => {
    setIsScrollLocked(false);
    // Play music when invitation is opened
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
          />
        )}
      </main>
    </div>
  );
}
