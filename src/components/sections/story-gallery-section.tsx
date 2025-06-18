
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
    src: "https://placehold.co/600x400.png",
    alt: "Nico and Trio sharing a laugh",
    caption: "How We Met",
    hint: "couple laughing"
  },
  {
    src: "https://placehold.co/400x600.png",
    alt: "The proposal moment",
    caption: "The Proposal",
    hint: "couple proposal"
  },
  {
    src: "https://placehold.co/600x450.png",
    alt: "A memorable vacation",
    caption: "Our Adventures",
    hint: "couple travel"
  },
  {
    src: "https://placehold.co/500x700.png",
    alt: "Candid moment of joy",
    caption: "Everyday Joy",
    hint: "happy couple"
  },
  {
    src: "https://placehold.co/700x500.png",
    alt: "Celebrating an anniversary together",
    caption: "Milestones",
    hint: "couple celebration"
  },
  {
    src: "https://placehold.co/600x600.png",
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
    <section id="gallery" className="py-20 md:py-32 bg-background"> {/* Increased padding */}
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-headline text-4xl md:text-5xl text-primary-foreground text-center mb-16" // Increased margin-bottom
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
                      <div className="relative w-full h-80"> {/* Fixed height for image container */}
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: "cover" }}
                          className="group-hover:scale-105 transition-transform duration-300 rounded-t-lg"
                          data-ai-hint={item.hint}
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300 rounded-t-lg" />
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 bg-card-foreground/5 mt-auto">
                      <p className="text-sm font-body text-muted-foreground text-center w-full">{item.caption}</p>
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
