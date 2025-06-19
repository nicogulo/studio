
"use client";

import { useState } from "react";
import HeroSection from "@/components/sections/hero-section";
import StoryGallerySection from "@/components/sections/story-gallery-section";
import CountdownTimerSection from "@/components/sections/countdown-timer-section";
import WeddingDetailsSection from "@/components/sections/wedding-details-section";
import AttireSuggestionsSection from "@/components/sections/attire-suggestions-section";
import RsvpSection from "@/components/sections/rsvp-section";
import FooterSection from "@/components/sections/footer-section";
import FloralDivider from "@/components/floral-divider";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function HomePage() {
  const [isScrollLocked, setIsScrollLocked] = useState(true);

  const handleUnlockScroll = () => {
    setIsScrollLocked(false);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center overflow-hidden bg-gray-800 p-2 sm:p-4">
      <main className="relative h-full w-full max-w-sm sm:max-w-md bg-background shadow-2xl">
        <ScrollArea 
          className="h-full"
          viewportClassName={isScrollLocked ? 'overflow-y-hidden' : ''}
        >
          <div className="flex flex-col">
            <HeroSection onUnlockScroll={handleUnlockScroll} />
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
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
