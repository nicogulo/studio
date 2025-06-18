"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/lightbox";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
    hint: "marriage proposal"
  },
  {
    src: "https://placehold.co/600x450.png",
    alt: "A memorable vacation",
    caption: "Our Adventures",
    hint: "couple travel"
  },
  {
    src: "https://placehold.co/500x700.png",
    alt: "Candid moment",
    caption: "Everyday Joy",
    hint: "happy couple"
  },
  {
    src: "https://placehold.co/700x500.png",
    alt: "Celebrating an anniversary",
    caption: "Milestones",
    hint: "couple celebration"
  },
  {
    src: "https://placehold.co/600x600.png",
    alt: "Looking towards the future",
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
    <section id="gallery" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="font-headline text-4xl md:text-5xl text-primary-foreground text-center mb-12"
        >
          Our Story
        </motion.h2>
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
                <CardContent className="p-0">
                  <button
                    onClick={() => openLightbox(item.src, item.alt)}
                    className="block w-full aspect-w-1 aspect-h-1 relative group"
                    aria-label={`View image: ${item.caption}`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={600}
                      height={item.src.includes('400x600') || item.src.includes('500x700') ? 600 : 400}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint={item.hint}
                    />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                  </button>
                </CardContent>
                <CardFooter className="p-4 bg-card-foreground/5">
                  <p className="text-sm font-body text-muted-foreground text-center w-full">{item.caption}</p>
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
