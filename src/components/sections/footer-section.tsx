
"use client";

import { motion } from "framer-motion";
import FloralDivider from "@/components/floral-divider";
import { Heart } from "lucide-react";
import { useEffect, useState } from 'react';

const FooterSection: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);


  return (
    <footer className="py-16 bg-secondary/10 text-center">
      <div className="px-4">
        <FloralDivider className="mb-8" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="font-headline text-2xl text-primary-foreground mb-4">
            With love, Frans & Nadia
          </p>
          <p className="font-body text-base text-accent-foreground mb-6 flex items-center justify-center">
            #FransNadiaWedding <Heart className="w-5 h-5 ml-2 text-primary fill-primary" />
          </p>
          {currentYear !== null ? (
            <p className="font-body text-sm text-muted-foreground">
              &copy; {currentYear} Forever & Always. All rights reserved.
            </p>
          ) : (
            <p className="font-body text-sm text-muted-foreground animate-pulse">
              &copy; Loading year... Forever & Always. All rights reserved.
            </p>
          )}
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
