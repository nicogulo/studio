"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FloatingHearts from "@/components/floating-hearts";

const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen text-center text-white bg-gradient-to-br from-pink-200 via-rose-100 to-beige-100"
    >
      <Image
        src="https://images.unsplash.com/photo-1521432631746-da205579f9e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
        alt="Romantic floral background"
        layout="fill"
        objectFit="cover"
        quality={80}
        className="opacity-40"
        priority
        data-ai-hint="wedding floral"
      />
      <FloatingHearts />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 p-8 bg-background/50 backdrop-blur-sm rounded-xl shadow-2xl"
      >
        <h1 className="font-headline text-5xl md:text-7xl text-primary-foreground mb-4 flex items-center justify-center space-x-2 md:space-x-4">
          <span>Nico</span>
          <Heart className="w-8 h-8 md:w-12 md:h-12 text-primary fill-primary" />
          <span>Trio</span>
        </h1>
        <p className="font-body text-xl md:text-2xl text-primary-foreground/80 mb-8">
          Together Forever Starts Here
        </p>
        <Link href="#gallery" passHref>
          <Button
            size="lg"
            className="font-body text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg transition-transform transform hover:scale-105"
            aria-label="Scroll to Our Story gallery"
          >
            See Our Story
          </Button>
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
