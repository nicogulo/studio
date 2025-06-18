"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps {
  imageUrl: string | null;
  altText: string;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ imageUrl, altText, onClose }) => {
  if (!imageUrl) return null;

  return (
    <AnimatePresence>
      {imageUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-image"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }} // Adjusted initial scale
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }} // Adjusted spring
            className="relative max-w-3xl max-h-[90vh] bg-background rounded-lg shadow-2xl overflow-hidden" // Ensure rounded-lg
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              id="lightbox-image"
              src={imageUrl}
              alt={altText}
              width={1200}
              height={800}
              className="object-contain w-full h-full max-h-[80vh] rounded-lg" // Added rounded-lg to image itself
              data-ai-hint="couple photo"
            />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 text-foreground bg-background/60 hover:bg-background/90 rounded-full transition-colors" // Adjusted colors for better theme fit
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
