"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import ConfettiEffect from "./ConfettiEffect";
import { useName } from "./NameProvider";

export default function FinalScreen() {
  const [answered, setAnswered] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number }[]>([]);
  const [tidakPos, setTidakPos] = useState({ x: 0, y: 0 });
  const { partnerName, isNameSet } = useName();

  if (!isNameSet) {
    return null;
  }

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

  // Tombol "Tidak" lari saat dihover/diklik
  const runAway = useCallback(() => {
    const maxX = 120;
    const maxY = 80;
    setTidakPos({
      x: (Math.random() - 0.5) * maxX * 2,
      y: (Math.random() - 0.5) * maxY * 2,
    });
  }, []);

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
            className="pointer-events-none fixed bottom-1/4 z-30 text-[#fda4af]"
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
              "radial-gradient(ellipse at center, rgba(253,164,175,0.3) 0%, rgba(190,18,60,0.1) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 70%, rgba(253,164,175,0.04) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(253,164,175,0.04) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-7">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="h-px w-24 bg-gradient-to-r from-transparent via-[#fda4af] to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-[var(--font-poppins)] text-[10px] tracking-[0.4em] text-[#fda4af88] uppercase"
        >
          Pertanyaan Terpenting
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="font-[var(--font-playfair)] text-2xl font-semibold leading-snug text-[#f8fafc] sm:text-3xl md:text-4xl"
        >
          <span className="italic">{partnerName}</span>,
          <br />
          <span className="mt-2 block text-xl font-normal italic text-[#f8fafccc] sm:text-2xl md:text-3xl">
            maukah kamu menjalani hidup bersamaku?
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-8 bg-[#fda4af44]" />
          <p className="font-[var(--font-poppins)] text-xs tracking-widest text-[#fda4af88]">
            Viki
          </p>
          <div className="h-px w-8 bg-[#fda4af44]" />
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
              className="flex w-full max-w-xs flex-col items-center gap-3"
            >
              {/* Tombol Iya — posisi tetap */}
              <button
                onClick={handleAnswer}
                className="pulse-glow relative w-full overflow-hidden rounded-full border border-[#fda4af66] bg-[#fda4af15] py-4 font-[var(--font-poppins)] text-sm tracking-widest text-[#fda4af] transition-all active:scale-95 hover:border-[#fda4afaa] hover:bg-[#fda4af25]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Iya <Heart size={13} className="fill-current" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fda4af20] to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </button>

              {/* Tombol Tentu iya — posisi tetap */}
              <button
                onClick={handleAnswer}
                className="w-full rounded-full border border-[#f8fafc22] py-4 font-[var(--font-poppins)] text-sm tracking-widest text-[#f8fafc77] transition-all active:scale-95 hover:border-[#fda4af44] hover:text-[#fda4af]"
              >
                Tentu iya
              </button>

              {/* Tombol Tidak — lari saat dihover/diklik */}
              <div className="relative h-12 w-full">
                <motion.button
                  animate={{ x: tidakPos.x, y: tidakPos.y }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onHoverStart={runAway}
                  onTap={runAway}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-not-allowed rounded-full border border-[#f8fafc11] px-8 py-2.5 font-[var(--font-poppins)] text-xs tracking-widest text-[#f8fafc33]"
                >
                  Tidak
                </motion.button>
              </div>
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
                    "drop-shadow(0 0 8px rgba(253,164,175,0.4))",
                    "drop-shadow(0 0 28px rgba(253,164,175,0.9))",
                    "drop-shadow(0 0 8px rgba(253,164,175,0.4))",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#fda4af]"
              >
                <Heart size={44} className="fill-current" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.9 }}
                className="max-w-sm font-[var(--font-playfair)] text-lg italic leading-8 text-[#f8fafc] sm:text-xl"
              >
                Mulai sekarang, bukan lagi tentang aku atau kamu, tapi tentang kita. Terima kasih sudah menjadi rumah terbaik yang pernah aku temukan, dan mulai hari ini, izinkan aku menjaga, menemani, dan mencintaimu sampai kapan pun
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex items-center gap-3"
              >
                <div className="h-px w-8 bg-[#fda4af44]" />
                <p className="font-[var(--font-poppins)] text-xs tracking-widest text-[#fda4af88]">
                  Viki
                </p>
                <div className="h-px w-8 bg-[#fda4af44]" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="h-px w-24 bg-gradient-to-r from-transparent via-[#fda4af] to-transparent"
        />
      </div>
    </div>
  );
}
