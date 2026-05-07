"use client";

import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { useName } from "./NameProvider";
import { useState } from "react";

interface HeroSectionProps {
  onOpen: () => void;
}

export default function HeroSection({ onOpen }: HeroSectionProps) {
  const { partnerName, setPartnerName, isNameSet, setIsNameSet } = useName();
  const [localName, setLocalName] = useState("");

  const handleOpen = () => {
    if (!isNameSet) {
      const nameToSet = localName.trim() || "Sayang";
      setPartnerName(nameToSet);
      setIsNameSet(true);
      document.title = `Untuk ${nameToSet} — Viki`;
    }

    onOpen();
    // Scroll setelah konten di-render (satu frame berikutnya)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById("story");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      });
    });
  };

  if (!isNameSet) {
    return (
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 text-center">
        {/* Background elements from original component */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0a0806]" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
            className="absolute bottom-0 left-0 right-0 h-1/2"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.08) 0%, rgba(180,100,50,0.04) 40%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-[var(--font-playfair)] text-3xl font-semibold text-[#f5f0e8] sm:text-4xl"
          >
            Untuk siapa pesan spesial ini?
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="w-full"
          >
            <input
              type="text"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
              placeholder="Tulis namanya di sini..."
              className="w-full rounded-full border border-[#c9a84c44] bg-[#12100e] px-6 py-4 text-center font-[var(--font-poppins)] text-base text-[#f5f0e8] placeholder-[#f5f0e855] transition-all focus:border-[#c9a84c88] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/50"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}>
            <motion.button onClick={handleOpen} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="pulse-glow group flex items-center gap-2 rounded-full border border-[#c9a84c55] bg-[#c9a84c0d] px-8 py-4 font-[var(--font-poppins)] text-sm tracking-widest text-[#c9a84c] transition-all hover:border-[#c9a84c99] hover:bg-[#c9a84c1a]">
              <span>Lanjutkan</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 text-center">
      {/* Background gradient layers */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0a0806]" />

        {/* City lights glow bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
          className="absolute bottom-0 left-0 right-0 h-1/2"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.08) 0%, rgba(180,100,50,0.04) 40%, transparent 70%)",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Animated gold orb */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(ellipse at 30% 40%, rgba(201,168,76,0.06) 0%, transparent 60%)",
              "radial-gradient(ellipse at 70% 60%, rgba(201,168,76,0.08) 0%, transparent 60%)",
              "radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.05) 0%, transparent 60%)",
              "radial-gradient(ellipse at 30% 40%, rgba(201,168,76,0.06) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
      </div>

      {/* Slow zoom texture */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(201,168,76,0.15) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(201,168,76,0.1) 0%, transparent 40%)
          `,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-6 px-2">
        {/* Decorative line top */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="h-px w-20 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-[var(--font-poppins)] text-[10px] tracking-[0.35em] text-[#c9a84c88] uppercase sm:text-xs"
        >
          Sebuah pesan dari hati
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.0, ease: "easeOut" }}
          className="font-[var(--font-playfair)] text-[1.75rem] font-semibold leading-snug tracking-wide text-[#f5f0e8] sm:text-4xl md:text-5xl lg:text-6xl"
        >
          Untuk{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="gold-shimmer italic"
          >
            {partnerName}
          </motion.span>
          ,
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="font-[var(--font-playfair)] text-lg font-normal italic leading-relaxed text-[#f5f0e8bb] sm:text-2xl md:text-3xl"
        >
          seseorang yang selalu ingin kujadikan tujuan pulang.
        </motion.p>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-8 bg-[#c9a84c44]" />
          <p className="font-[var(--font-poppins)] text-xs tracking-widest text-[#c9a84c88]">
            Viki
          </p>
          <div className="h-px w-8 bg-[#c9a84c44]" />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.2 }}
          className="mt-2"
        >
          <motion.button
            onClick={handleOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pulse-glow relative overflow-hidden rounded-full border border-[#c9a84c55] bg-[#c9a84c0d] px-8 py-4 font-[var(--font-poppins)] text-sm tracking-widest text-[#c9a84c] transition-all hover:border-[#c9a84c99] hover:bg-[#c9a84c1a] active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Buka Pesannya
              <Heart size={14} className="fill-current" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a84c15] to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.button>
        </motion.div>

        {/* Decorative line bottom */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 3.5 }}
          className="h-px w-20 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ delay: 4, duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-1">
          <div className="h-6 w-px bg-gradient-to-b from-transparent to-[#c9a84c66]" />
          <div className="h-1.5 w-1.5 rotate-45 border-b border-r border-[#c9a84c66]" />
        </div>
      </motion.div>
    </section>
  );
}
