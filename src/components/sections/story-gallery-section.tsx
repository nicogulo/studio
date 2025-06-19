
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
    <section id="gallery" className="py-16 bg-secondary/10">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-headline text-3xl text-primary-foreground text-center mb-16 sm:mb-20"
        >
          Our Story
        </motion.h2>

        <div className="relative">
          {/* Central Timeline Line for desktop */}
          <div
            className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-primary/20 hidden sm:block"
            aria-hidden="true"
          ></div>

          {galleryItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="mb-12 sm:mb-16" 
            >
              <div className={`flex flex-col sm:items-stretch ${index % 2 !== 0 ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
                {/* Image Card Wrapper */}
                <div className="w-full sm:w-5/12 flex">
                  <Card
                    className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card rounded-lg w-full flex flex-col cursor-pointer group"
                    onClick={() => openLightbox(item.src, item.alt)}
                    aria-label={`View image: ${item.caption}`}
                  >
                    <CardContent className="p-0 relative aspect-[4/3]">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 639px) 90vw, (max-width: 1023px) 40vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-lg"
                        data-ai-hint={item.hint}
                        priority={index < 2}
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300 rounded-t-lg" />
                    </CardContent>
                    <CardFooter className="p-4 bg-card-foreground/5 mt-auto">
                      <p className="font-headline text-sm text-accent-foreground text-center w-full">{item.caption}</p>
                    </CardFooter>
                  </Card>
                </div>

                {/* Spacer & Timeline Dot (for desktop) */}
                <div className={`hidden sm:flex sm:w-2/12 relative items-center justify-center`}>
                  <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-primary rounded-full ring-4 ring-background shadow-md z-10"></div>
                </div>

                {/* Empty spacer for the other side on desktop */}
                <div className="hidden sm:block sm:w-5/12"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Lightbox imageUrl={lightboxImage} altText={lightboxAlt} onClose={closeLightbox} />
    </section>
  );
};

export default StoryGallerySection;
