
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
          Puji Syukur
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="font-body text-base text-foreground max-w-xl mx-auto leading-relaxed"
        >
          Dengan penuh rasa syukur kehadirat Tuhan Yang Maha Esa, kami memohon doa restu 
          Bapak/Ibu/Saudara/i sekalian agar pernikahan kami, yang diselenggarakan pada:
          <br /><br />
          <strong>Selasa, 02 November 2027</strong>
          <br /><br />
          Dapat berjalan lancar sesuai harapan kami dan menjadi awal perjalanan keluarga
          yang sakinah, mawaddah, warahmah. Kehadiran dan doa restu Anda adalah
          anugerah terindah bagi kami.
        </motion.p>
      </div>
    </section>
  );
};

export default ThanksgivingSection;
