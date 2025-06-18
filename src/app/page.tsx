
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
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
      <main className="w-full max-w-sm sm:max-w-md bg-background shadow-2xl relative h-screen">
        <ScrollArea className="h-full">
          <div className="flex flex-col">
            <HeroSection />
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
