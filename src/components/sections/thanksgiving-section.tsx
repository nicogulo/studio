
"use client";

import { motion } from "framer-motion";
import React from 'react';

const ThanksgivingSection: React.FC = () => {
  return (
    <section id="thanksgiving" className="py-16 bg-background text-center">
      <div className="px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-headline text-3xl text-primary-foreground mb-6"
        >
          With Gratitude
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="font-body text-base text-foreground max-w-xl mx-auto leading-relaxed"
        >
          With heartfelt gratitude to God Almighty, we humbly request your prayers and blessings 
          for our wedding, which will be held on:
          <br /><br />
          <strong>Tuesday, November 02, 2027</strong>
          <br /><br />
          We pray that our union proceeds smoothly and marks the beginning of a family life 
          filled with peace, love, and mercy. Your presence and blessings 
          are the most precious gift to us.
        </motion.p>
      </div>
    </section>
  );
};

export default ThanksgivingSection;
