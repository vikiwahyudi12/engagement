"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import ConfettiEffect from "./ConfettiEffect";

export default function FinalProposal() {
  const [answered, setAnswered] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleAnswer = () => {
    setAnswered(true);
    setConfetti(true);

    // Spawn floating hearts
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: 20 + Math.random() * 60,
    }));
    setHearts(newHearts);

    // Stop confetti after 5s
    setTimeout(() => setConfetti(false), 5000);
    // Clear hearts after animation
    setTimeout(() => setHearts([]), 4000);
  };

  return (
    <section
      ref={sectionRef}
      id="final"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      {/* Confetti */}
      <ConfettiEffect active={confetti} />

      {/* Floating hearts */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -window.innerHeight * 0.8, scale: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 + Math.random() * 2, ease: "easeOut" }}
            className="pointer-events-none fixed bottom-1/4 z-30 text-[#c9a84c]"
            style={{ left: `${h.x}%` }}
          >
            <Heart size={20 + Math.random() * 20} className="fill-current" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Warm glow */}
        <motion.div
          animate={
            answered
              ? {
                  opacity: [0.1, 0.25, 0.15],
                  scale: [1, 1.2, 1.1],
                }
              : { opacity: 0.08 }
          }
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(201,168,76,0.3) 0%, rgba(180,80,40,0.1) 40%, transparent 70%)",
          }}
        />

        {/* Soft particles */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 70%, rgba(201,168,76,0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(201,168,76,0.05) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 max-w-2xl mx-auto">
        {/* Decorative top */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.5 }}
          className="h-px w-32 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-[var(--font-poppins)] text-xs tracking-[0.4em] text-[#c9a84c88] uppercase"
        >
          Pertanyaan Terpenting
        </motion.p>

        {/* Main question */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
          className="font-[var(--font-playfair)] text-3xl font-semibold leading-tight text-[#f5f0e8] sm:text-4xl md:text-5xl"
        >
          <span className="italic">[Nama Perempuan]</span>,
          <br />
          <span className="mt-2 block text-2xl font-normal italic text-[#f5f0e8cc] sm:text-3xl">
            maukah kamu menjalani hidup bersamaku?
          </span>
        </motion.h2>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-8 bg-[#c9a84c44]" />
          <p className="font-[var(--font-poppins)] text-sm tracking-widest text-[#c9a84c88]">
            Viki
          </p>
          <div className="h-px w-8 bg-[#c9a84c44]" />
        </motion.div>

        {/* Buttons or response */}
        <AnimatePresence mode="wait">
          {!answered ? (
            <motion.div
              key="buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="flex flex-col items-center gap-4 sm:flex-row"
            >
              <motion.button
                onClick={handleAnswer}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="pulse-glow group relative overflow-hidden rounded-full border border-[#c9a84c66] bg-[#c9a84c15] px-10 py-4 font-[var(--font-poppins)] text-sm tracking-widest text-[#c9a84c] transition-all hover:border-[#c9a84caa] hover:bg-[#c9a84c25]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Iya
                  <Heart size={14} className="fill-current" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a84c20] to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.button>

              <motion.button
                onClick={handleAnswer}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border border-[#f5f0e822] bg-transparent px-10 py-4 font-[var(--font-poppins)] text-sm tracking-widest text-[#f5f0e888] transition-all hover:border-[#c9a84c44] hover:text-[#c9a84c]"
              >
                Tentu iya
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="response"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center gap-6"
            >
              {/* Glowing heart */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  filter: [
                    "drop-shadow(0 0 10px rgba(201,168,76,0.4))",
                    "drop-shadow(0 0 30px rgba(201,168,76,0.8))",
                    "drop-shadow(0 0 10px rgba(201,168,76,0.4))",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#c9a84c]"
              >
                <Heart size={48} className="fill-current" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="max-w-md font-[var(--font-playfair)] text-xl italic leading-8 text-[#f5f0e8] md:text-2xl"
              >
                &ldquo;Terima kasih sudah menjadi rumah terbaik yang pernah aku
                temukan.&rdquo;
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="flex items-center gap-3"
              >
                <div className="h-px w-8 bg-[#c9a84c44]" />
                <p className="font-[var(--font-poppins)] text-xs tracking-widest text-[#c9a84c88]">
                  Viki
                </p>
                <div className="h-px w-8 bg-[#c9a84c44]" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 1.8 }}
          className="h-px w-32 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent"
        />

        {/* Closing note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="font-[var(--font-poppins)] text-xs tracking-widest text-[#f5f0e844]"
        >
          Dengan sepenuh cinta · Viki
        </motion.p>
      </div>
    </section>
  );
}
