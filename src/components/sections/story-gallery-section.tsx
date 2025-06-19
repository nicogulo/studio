
"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/lightbox";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1525206809752-65312b959c88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjb3VwbGUlMjBsYXVnaGluZ3xlbnwwfHx8fDE3NTAyNjc2Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Nico and Trio sharing a laugh",
    caption: "How We Met",
    hint: "couple laughing"
  },
  {
    src: "https://images.unsplash.com/photo-1601239538638-e3d0e7bf6c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjb3VwbGUlMjBwcm9wb3NhbHxlbnwwfHx8fDE3NTAyNjc2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "The proposal moment",
    caption: "The Proposal",
    hint: "couple proposal"
  },
  {
    src: "https://images.unsplash.com/photo-1541268944410-5b020609992d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxjb3VwbGUlMjB0cmF2ZWx8ZW58MHx8fHwxNzUwMjY3Njc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "A memorable vacation",
    caption: "Our Adventures",
    hint: "couple travel"
  },
  {
    src: "https://images.unsplash.com/photo-1600038937815-57cbbba6ba7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8aGFwcHklMjBjb3VwbGV8ZW58MHx8fHwxNzUwMjY3Njc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Candid moment of joy",
    caption: "Everyday Joy",
    hint: "happy couple"
  },
  {
    src: "https://images.unsplash.com/photo-1655490162630-175929877280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBjZWxlYnJhdGlvbnxlbnwwfHx8fDE3NTAyNjc2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Celebrating an anniversary together",
    caption: "Milestones",
    hint: "couple celebration"
  },
  {
    src: "https://images.unsplash.com/photo-1645563838122-cbc43ec4e81f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBmdXR1cmV8ZW58MHx8fHwxNzUwMjY3Njc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Looking towards the future, happy together",
    caption: "Our Journey Together",
    hint: "couple future"
  },
];

const StoryGallerySection: React.FC = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState<string>("");

  const openLightbox = (src: string, alt: string) => {
    setLightboxImage(src);
    setLightboxAlt(alt);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxAlt("");
  };

  return (
    <section id="gallery" className="py-16 bg-background">
      <div className="px-4"> {/* Outer padding for the section title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-headline text-3xl text-primary-foreground text-center mb-10"
        >
          Our Story
        </motion.h2>
        
        <div className="columns-1 sm:columns-2 gap-4 md:gap-6 max-w-xl mx-auto [column-fill:_balance]">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
              className="break-inside-avoid mb-4 md:mb-6 block" // mb for vertical spacing between items in the flow
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card rounded-lg w-full">
                <CardContent 
                  className="p-0 relative group cursor-pointer" 
                  onClick={() => openLightbox(item.src, item.alt)}
                  aria-label={`View image: ${item.caption}`}
                >
                  <div className="relative w-full aspect-[4/3]"> {/* Aspect ratio for image container */}
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" // More refined sizes
                      className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-lg"
                      data-ai-hint={item.hint}
                      priority={index < 2} // Prioritize loading first few images
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300 rounded-t-lg" />
                  </div>
                </CardContent>
                <CardFooter className="p-3 bg-card-foreground/5">
                  <p className="text-xs font-body text-muted-foreground text-center w-full">{item.caption}</p>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <Lightbox imageUrl={lightboxImage} altText={lightboxAlt} onClose={closeLightbox} />
    </section>
  );
};

export default StoryGallerySection;
