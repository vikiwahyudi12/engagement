"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import ConfettiEffect from "./ConfettiEffect";

export default function FinalScreen() {
  const [answered, setAnswered] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number }[]>([]);

  const handleAnswer = () => {
    setAnswered(true);
    setConfetti(true);

    const newHearts = Array.from({ length: 18 }, (_, i) => ({
      id: Date.now() + i,
      x: 10 + Math.random() * 80,
      size: 16 + Math.random() * 20,
    }));
    setHearts(newHearts);

    setTimeout(() => setConfetti(false), 5000);
    setTimeout(() => setHearts([]), 4500);
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-5 text-center">
      <ConfettiEffect active={confetti} />

      {/* Floating hearts */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -600, scale: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3.5 + Math.random() * 1.5, ease: "easeOut" }}
            className="pointer-events-none fixed bottom-1/4 z-30 text-[#c9a84c]"
            style={{ left: `${h.x}%` }}
          >
            <Heart size={h.size} className="fill-current" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={
            answered
              ? { opacity: [0.08, 0.22, 0.14] }
              : { opacity: 0.07 }
          }
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(201,168,76,0.3) 0%, rgba(180,80,40,0.1) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 70%, rgba(201,168,76,0.04) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(201,168,76,0.04) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-7">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="h-px w-24 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-[var(--font-poppins)] text-[10px] tracking-[0.4em] text-[#c9a84c88] uppercase"
        >
          Pertanyaan Terpenting
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="font-[var(--font-playfair)] text-2xl font-semibold leading-snug text-[#f5f0e8] sm:text-3xl md:text-4xl"
        >
          <span className="italic">Anisaturrochmah</span>,
          <br />
          <span className="mt-2 block text-xl font-normal italic text-[#f5f0e8cc] sm:text-2xl md:text-3xl">
            maukah kamu menjalani hidup bersamaku?
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-8 bg-[#c9a84c44]" />
          <p className="font-[var(--font-poppins)] text-xs tracking-widest text-[#c9a84c88]">
            Ahmad Sayadi
          </p>
          <div className="h-px w-8 bg-[#c9a84c44]" />
        </motion.div>

        {/* Buttons / Response */}
        <AnimatePresence mode="wait">
          {!answered ? (
            <motion.div
              key="buttons"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="flex flex-col items-center gap-3 sm:flex-row"
            >
              <motion.button
                onClick={handleAnswer}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="pulse-glow relative overflow-hidden rounded-full border border-[#c9a84c66] bg-[#c9a84c15] px-10 py-4 font-[var(--font-poppins)] text-sm tracking-widest text-[#c9a84c] transition-all hover:border-[#c9a84caa] hover:bg-[#c9a84c25]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Iya <Heart size={13} className="fill-current" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a84c20] to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.button>

              <motion.button
                onClick={handleAnswer}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border border-[#f5f0e822] px-10 py-4 font-[var(--font-poppins)] text-sm tracking-widest text-[#f5f0e877] transition-all hover:border-[#c9a84c44] hover:text-[#c9a84c]"
              >
                Tentu iya
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="response"
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="flex flex-col items-center gap-5"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  filter: [
                    "drop-shadow(0 0 8px rgba(201,168,76,0.4))",
                    "drop-shadow(0 0 28px rgba(201,168,76,0.9))",
                    "drop-shadow(0 0 8px rgba(201,168,76,0.4))",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#c9a84c]"
              >
                <Heart size={44} className="fill-current" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.9 }}
                className="max-w-sm font-[var(--font-playfair)] text-lg italic leading-8 text-[#f5f0e8] sm:text-xl"
              >
                &ldquo;Mulai sekarang, bukan lagi tentang aku atau kamu. Tapi tentang kita. Terima kasih sudah menjadi rumah terbaik yang pernah aku temukan. Mulai hari ini, aku akan berusaha menjadi rumah terbaik untukmu, dalam segala keadaan dan sampai kapan pun.&rdquo;
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex items-center gap-3"
              >
                <div className="h-px w-8 bg-[#c9a84c44]" />
                <p className="font-[var(--font-poppins)] text-xs tracking-widest text-[#c9a84c88]">
                  Ahmad Sayadi
                </p>
                <div className="h-px w-8 bg-[#c9a84c44]" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="h-px w-24 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent"
        />
      </div>
    </div>
  );
}
