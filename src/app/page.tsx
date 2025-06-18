import HeroSection from "@/components/sections/hero-section";
import StoryGallerySection from "@/components/sections/story-gallery-section";
import CountdownTimerSection from "@/components/sections/countdown-timer-section";
import WeddingDetailsSection from "@/components/sections/wedding-details-section";
import AttireSuggestionsSection from "@/components/sections/attire-suggestions-section";
import RsvpSection from "@/components/sections/rsvp-section";
import FooterSection from "@/components/sections/footer-section";
import FloralDivider from "@/components/floral-divider";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
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
    </main>
  );
}
