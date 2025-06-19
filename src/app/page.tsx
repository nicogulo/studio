
"use client";

import { useState } from 'react';
import HeroSection from "@/components/sections/hero-section";
import ThanksgivingSection from "@/components/sections/thanksgiving-section";
import StoryGallerySection from "@/components/sections/story-gallery-section";
import PhotoGallerySection from "@/components/sections/photo-gallery-section"; // New import
import CountdownTimerSection from "@/components/sections/countdown-timer-section";
import WeddingDetailsSection from "@/components/sections/wedding-details-section";
import AttireSuggestionsSection from "@/components/sections/attire-suggestions-section";
import RsvpSection from "@/components/sections/rsvp-section";
import FooterSection from "@/components/sections/footer-section";
import FloralDivider from "@/components/floral-divider";

export default function HomePage() {
  const [isScrollLocked, setIsScrollLocked] = useState(true);

  const handleUnlockScrollAndNavigate = () => {
    setIsScrollLocked(false);

    requestAnimationFrame(() => {
      setTimeout(() => {
        const targetSection = document.getElementById("thanksgiving"); // Updated target
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
        <HeroSection onUnlockScrollAndNavigate={handleUnlockScrollAndNavigate} />
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
            <RsvpSection />
            <FooterSection />
          </>
        )}
      </main>
    </div>
  );
}
