"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0806]"
        >
          {/* Cinematic bars */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 0.8, delay: 2.2, ease: "easeInOut" }}
            className="absolute top-0 left-0 right-0 h-[12vh] origin-left bg-black"
          />
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 0.8, delay: 2.2, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 right-0 h-[12vh] origin-right bg-black"
          />

          {/* Center content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Gold ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="h-16 w-16 rounded-full border border-[#c9a84c33] border-t-[#c9a84c]"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.6, 1] }}
              transition={{ duration: 2, delay: 0.8, repeat: 1 }}
              className="font-[var(--font-playfair)] text-sm italic tracking-[0.3em] text-[#c9a84c88]"
            >
              memuat cerita...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
