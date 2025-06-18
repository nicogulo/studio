
"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/lightbox";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    <section id="gallery" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-headline text-3xl md:text-4xl lg:text-5xl text-primary-foreground text-center mb-12 md:mb-16"
        >
          Our Story
        </motion.h2>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {galleryItems.map((item, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                  className="h-full"
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card rounded-lg h-full flex flex-col">
                    <CardContent 
                      className="p-0 relative group cursor-pointer flex-grow" 
                      onClick={() => openLightbox(item.src, item.alt)}
                      aria-label={`View image: ${item.caption}`}
                    >
                      <div className="relative w-full h-64 sm:h-72 md:h-80"> {/* Adjusted height for mobile-first */}
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          style={{ objectFit: "cover" }}
                          className="group-hover:scale-105 transition-transform duration-300 rounded-t-lg"
                          data-ai-hint={item.hint}
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300 rounded-t-lg" />
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 sm:p-4 bg-card-foreground/5 mt-auto">
                      <p className="text-xs sm:text-sm font-body text-muted-foreground text-center w-full">{item.caption}</p>
                    </CardFooter>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
      <Lightbox imageUrl={lightboxImage} altText={lightboxAlt} onClose={closeLightbox} />
    </section>
  );
};

export default StoryGallerySection;
