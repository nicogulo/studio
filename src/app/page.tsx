
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

// IMPORTANT: The URL below is a direct link from googlevideo.com. 
// These links can be temporary, may expire, or might not work for all users.
// For a reliable solution, please host your own audio file (e.g., MP3) and use its direct link.
// Ensure you have the necessary rights/licenses for any music used.
const MUSIC_URL = "https://rr4---sn-npoe7nss.googlevideo.com/videoplayback?expire=1750347836&ei=3NtTaKy_MJyk9fgP8Nba4Q0&ip=213.55.92.49&id=o-APJrQATdANPAr6FEm-JWbvBwCSMwSQWmXA9NzHT6jijj&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AY1jyLPPo9fb2xBlFODLT0ZaNYG9H61MvDCnhfYIaC3YoKkXliE9MSb0UhegehO-Jr5bg4OoU8MQFYdP&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=yISfHp_HdLLjqdG1Q_IvHwgQ&rqh=1&gir=yes&clen=4398170&dur=253.941&lmt=1733673442819003&keepalive=yes&lmw=1&fexp=24350590,24350737,24350827,24350961,24351173,24351316,24351318,24351528,24351759,24351907,24352011,24352022,24352102,24352188,24352236,24352321,24352394,24352396,51466643,51466698&c=TVHTML5&sefc=1&txp=5532434&n=zjRN5JcVOS7JrA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgN2uWFdY8Ec3kvuYIw0NFUziGbuDhZ0U_BdhzPK_YQDcCIDfz18OkCL7goKNbBE6npe5n_cr9qES5ZBTWv_j6xVww&rm=sn-xuj-5qq67s,sn-hju67l&rrc=79,104&req_id=82b45b4cbfc2a3ee&cmsv=e&rms=rdu,au&redirect_counter=2&cms_redirect=yes&ipbypass=yes&met=1750326270,&mh=Yx&mip=114.122.40.29&mm=29&mn=sn-npoe7nss&ms=rdu&mt=1750325858&mv=m&mvi=4&pl=23&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=APaTxxMwRQIhAMdGSUTU1qUHwit5k5IOR116S_CLIJwhx1WXYZiqoGhyAiAXtbjbGRPvlqhszQScqxhmFeSwQyB5JB1uFwhNzy2pUw%3D%3D"; 

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
