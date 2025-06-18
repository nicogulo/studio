"use client";

import { motion } from "framer-motion";
import FloralDivider from "@/components/floral-divider";
import { Heart } from "lucide-react";

const FooterSection: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-secondary/20 text-center">
      <div className="container mx-auto px-4">
        <FloralDivider className="mb-6" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-headline text-2xl md:text-3xl text-primary-foreground mb-4">
            With love, Nico & Trio
          </p>
          <p className="font-body text-lg text-accent-foreground mb-6 flex items-center justify-center">
            #NicoTrioWedding <Heart className="w-5 h-5 ml-2 text-primary fill-primary" />
          </p>
          <p className="font-body text-sm text-muted-foreground">
            &copy; {currentYear} Forever & Always. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
