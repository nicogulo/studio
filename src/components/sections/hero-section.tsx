
"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  onUnlockScroll: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onUnlockScroll }) => {
  const handleScrollToDetails = () => {
    onUnlockScroll(); // Meminta update state di parent untuk membuka kunci scroll

    // Menunda upaya scroll untuk memberi waktu DOM diperbarui setelah onUnlockScroll
    setTimeout(() => {
      const scrollableViewport = document.querySelector(
        'div[data-radix-scroll-area-viewport="true"]'
      ) as HTMLElement | null;
      const detailsSection = document.getElementById("wedding-details");

      if (!detailsSection) {
        console.error("HeroSection: Target section 'wedding-details' not found.");
        return;
      }

      if (!scrollableViewport) {
        console.error("HeroSection: Scrollable viewport 'div[data-radix-scroll-area-viewport=\"true\"]' not found. Falling back to scrollIntoView on target.");
        // Fallback: jika viewport spesifik tidak ditemukan, coba scrollIntoView generik
        detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      
      // Periksa apakah viewport benar-benar bisa di-scroll setelah dibuka kuncinya
      const viewportStyle = window.getComputedStyle(scrollableViewport);
      if (viewportStyle.overflowY === 'hidden') {
        console.warn("HeroSection: Viewport overflowY masih hidden. Scroll mungkin tidak bekerja.");
        // Jika masih hidden, mungkin perlu timeout lebih lama atau ada masalah propagasi state.
        // Untuk saat ini, lanjutkan dan lihat hasilnya.
      }
      
      const targetScrollPosition = detailsSection.offsetTop;

      scrollableViewport.scrollTo({
        top: targetScrollPosition,
        behavior: "smooth",
      });
    }, 100); // Timeout 100ms untuk memberi ruang napas bagi update DOM.
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen text-center text-white" // min-h-screen memastikan section mengambil tinggi penuh
    >
      <Image
        src="https://images.unsplash.com/photo-1563808599481-34a342e44508?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjb3VwbGUlMjB3ZWRkaW5nfGVufDB8fHx8MTc1MDI2ODI1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Nico and Trio"
        fill // Menggantikan layout="fill" objectFit="cover" dengan fill untuk Next 13+
        style={{ objectFit: "cover" }} // objectFit sekarang di style
        quality={80}
        className="z-0"
        priority
        data-ai-hint="couple rooftop"
      />
      <div className="absolute inset-0 bg-black/50 z-1" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 flex h-screen w-full flex-col items-center justify-between px-6 py-6" // h-screen untuk memastikan justify-between bekerja
      >
        {/* Konten Atas: Judul, Nama, Tanggal */}
        <div className="flex flex-col items-center text-center">
          <p className="font-body text-xs uppercase tracking-wider text-white/90 sm:text-sm">
            The Wedding of
          </p>
          <h1 className="font-headline text-4xl text-white sm:text-5xl mt-1 mb-2">
            Nico & Trio
          </h1>
          <p className="font-body text-sm text-white/80 sm:text-base">
            Tuesday, 02 November 2027
          </p>
        </div>
        
        {/* Konten Bawah: Tombol CTA dan Disclaimer */}
        <div className="w-full max-w-xs text-center">
          <Button
            size="lg"
            className="font-body w-full rounded-lg border border-white/40 bg-white/20 py-2.5 text-sm text-white shadow-lg backdrop-blur-sm transition-all hover:bg-white/30 hover:shadow-xl focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/50 sm:py-3 sm:text-base"
            onClick={handleScrollToDetails}
            aria-label="Buka Undangan dan lihat detail pernikahan"
          >
            <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Buka Undangan
          </Button>
          <p className="mt-2 font-body text-[10px] italic text-white/70 sm:mt-3 sm:text-xs">
            *Mohon maaf apabila ada kesalahan penulisan nama/gelar
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
