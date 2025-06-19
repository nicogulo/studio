
"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/lightbox";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const galleryPhotos = [
  { src: "https://images.unsplash.com/photo-1541089404510-5c9a779841fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxjb3VwbGUlMjBqb3lmdWx8ZW58MHx8fHwxNzUwMzAzOTQxfDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Joyful couple moment", hint: "couple joyful", aspect: "aspect-[4/3]" },
  { src: "https://images.unsplash.com/photo-1633460730540-e4029e619db8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjb3VwbGUlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTAzMDM5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Elegant couple portrait", hint: "couple portrait", aspect: "aspect-[2/3]" },
  { src: "https://images.unsplash.com/photo-1743642890366-e4c73155e452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjb3VwbGUlMjBjYW5kaWR8ZW58MHx8fHwxNzUwMzAzOTQxfDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Candid couple interaction", hint: "couple candid", aspect: "aspect-square" },
  { src: "https://images.unsplash.com/photo-1554230682-30659cacfe74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBzY2VuaWN8ZW58MHx8fHwxNzUwMzAzOTQxfDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Couple in a scenic location", hint: "couple scenic", aspect: "aspect-[16/10]" },
  { src: "https://images.unsplash.com/photo-1542338492-41740e01673f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxjb3VwbGUlMjBodWd8ZW58MHx8fHwxNzUwMzAzOTQxfDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Couple sharing a hug", hint: "couple hug", aspect: "aspect-[3/4]" },
  { src: "https://images.unsplash.com/photo-1707980517803-695d1c252c64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxjb3VwbGUlMjBzbWlsZXxlbnwwfHx8fDE3NTAzMDM5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Couple smiling together", hint: "couple smile", aspect: "aspect-[7/5]" },
  { src: "https://images.unsplash.com/photo-1625378986062-1ef8dfa94050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjb3VwbGUlMjByZWxheGVkfGVufDB8fHx8MTc1MDMwMzk0MXww&ixlib=rb-4.1.0&q=80&w=1080", alt: "Relaxed couple photo", hint: "couple relaxed", aspect: "aspect-square" },
  { src: "https://images.unsplash.com/photo-1636990536251-e1ddbab413af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxjb3VwbGUlMjBzdHlsaXNofGVufDB8fHx8MTc1MDMwMzk0MXww&ixlib=rb-4.1.0&q=80&w=1080", alt: "Stylish couple pose", hint: "couple stylish", aspect: "aspect-[4/5]" },
];

const PhotoGallerySection: React.FC = () => {
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
    <section id="photo-gallery" className="py-16 bg-secondary/10">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-headline text-3xl text-primary-foreground text-center mb-12 sm:mb-16"
        >
          Captured Moments
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {galleryPhotos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              className={`${photo.aspect} ${(index % 5 === 0 || index % 5 === 3) && galleryPhotos.length > 3 ? 'sm:col-span-1' : 'sm:col-span-1'}`} // Example of varied span for larger screens
            >
              <Card
                className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-card rounded-lg w-full h-full cursor-pointer group"
                onClick={() => openLightbox(photo.src, photo.alt)}
                aria-label={`View image: ${photo.alt}`}
              >
                <CardContent className="p-0 relative w-full h-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
                    data-ai-hint={photo.hint}
                    priority={index < 4} 
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300 rounded-lg" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <Lightbox imageUrl={lightboxImage} altText={lightboxAlt} onClose={closeLightbox} />
    </section>
  );
};

export default PhotoGallerySection;

