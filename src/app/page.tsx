
"use client";

import { useState, useEffect, useRef } from 'react';
import HeroSection from "@/components/sections/hero-section";
import StoryGallerySection from "@/components/sections/story-gallery-section";
import CountdownTimerSection from "@/components/sections/countdown-timer-section";
import WeddingDetailsSection from "@/components/sections/wedding-details-section";
import AttireSuggestionsSection from "@/components/sections/attire-suggestions-section";
import RsvpSection from "@/components/sections/rsvp-section";
import FooterSection from "@/components/sections/footer-section";
import FloralDivider from "@/components/floral-divider";

export default function HomePage() {
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const mainContentRef = useRef<HTMLElement>(null);

  const handleUnlockScrollAndNavigate = () => {
    setIsScrollLocked(false);

    // Ensure DOM update (overflow style change) before trying to scroll
    requestAnimationFrame(() => {
      // A small delay can help ensure the browser has processed the style change
      setTimeout(() => {
        const detailsSection = document.getElementById("wedding-details");
        if (detailsSection && mainContentRef.current) {
          // Scroll the main container to the top of the detailsSection
          mainContentRef.current.scrollTo({
            top: detailsSection.offsetTop,
            behavior: 'smooth'
          });
        } else if (detailsSection) {
          // Fallback if ref isn't immediately available or for some edge cases
          // This scrolls the window, which is not ideal if mainContentRef is the intended scroll container
          // but given mainContentRef is the primary scroll area, its .scrollTo is preferred.
          detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50); // 50ms delay, adjust if needed
    });
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden bg-gray-800 p-0 sm:p-4 md:p-6">
      <main
        ref={mainContentRef}
        className={`
          relative w-full max-w-[28.125rem] h-full bg-background shadow-2xl 
          ${isScrollLocked ? 'overflow-y-hidden' : 'overflow-y-auto'}
          transition-all duration-300 ease-in-out
        `}
        style={{ WebkitOverflowScrolling: 'touch' }} 
      >
        <HeroSection onUnlockScrollAndNavigate={handleUnlockScrollAndNavigate} />
        <StoryGallerySection />
        <FloralDivider />
        <CountdownTimerSection />
        <FloralDivider />
        <WeddingDetailsSection />
        <FloralDivider />
        <AttireSuggestionsSection />
        <FloralDivider />
        <RsvpSection />
        <FooterSection />
      </main>
    </div>
  );
}
