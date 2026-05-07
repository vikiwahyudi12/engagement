"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useName } from "./NameProvider";

interface Props {
  onNext: () => void;
}

const stories = [
  {
    chapter: "I",
    title: "Tentang Pertemuan",
    body: "Ada momen-momen dalam hidup yang tidak bisa dijelaskan dengan logika. Ketika pertama kali kita bertemu, ada sesuatu yang berbeda seperti semesta sedang berbisik pelan bahwa ini bukan kebetulan biasa.",
    quote: "Beberapa pertemuan tidak terjadi karena kebetulan.",
  },
  {
    chapter: "II",
    title: "Tentang Rasa Nyaman",
    body: "Bersamamu, aku tidak perlu menjadi siapa pun selain diriku sendiri. Kamu adalah ruang yang aman — tempat di mana aku bisa diam tanpa merasa sepi, dan berbicara tanpa takut disalahpahami.",
    quote: "Kenyamanan sejati adalah ketika kamu bisa menjadi dirimu sendiri.",
  },
  {
    chapter: "III",
    title: "Tentang Cinta yang Tumbuh Perlahan",
    body: "Cinta ini tidak datang seperti petir. Ia tumbuh perlahan, seperti bunga yang mekar di musim yang tepat. Meski kita tidak selalu bersama setiap hari, setiap percakapan, perhatian, dan kehadiranmu menambahkan satu lapisan lagi pada sesuatu yang sudah terasa sangat berharga.",
    quote: "Yang tumbuh perlahan, bertahan lebih lama.",
  },
  {
    chapter: "IV",
    title: "Tentang Harapan Masa Depan",
    body: "Aku membayangkan masa depan, dan kamu selalu ada di sana. Bukan sebagai pelengkap, tapi sebagai bagian yang tidak terpisahkan dari cerita yang ingin aku tulis bersama cerita yang panjang, hangat, dan penuh makna.",
    quote: "Masa depan terasa lebih indah ketika kamu ada di dalamnya.",
  },
];

export default function StoryScreen({ onNext }: Props) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const isLast = idx === stories.length - 1;
  const story = stories[idx];
  const { isNameSet } = useName();

  if (!isNameSet) {
    return null;
  }

  const goNext = () => {
    if (isLast) {
      onNext();
    } else {
      setDir(1);
      setIdx((i) => i + 1);
    }
  };

  const goPrev = () => {
    if (idx === 0) return;
    setDir(-1);
    setIdx((i) => i - 1);
  };

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-5 py-10">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(253,164,175,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#fda4af] to-transparent" />
          <p className="font-[var(--font-poppins)] text-[10px] tracking-[0.4em] text-[#fda4af88] uppercase">
            Kisah Kita
          </p>
        </motion.div>

        {/* Story card */}
        <div className="relative w-full overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={idx}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="w-full"
            >
              <div
                className="relative w-full rounded-2xl border border-[#fda4af15] bg-[#0f172a]/70 p-6 backdrop-blur-sm sm:p-8"
                style={{
                  boxShadow:
                    "0 4px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(253,164,175,0.06)",
                }}
              >
                {/* Corner accent */}
                <div className="absolute top-0 left-0 h-8 w-8 overflow-hidden rounded-tl-2xl">
                  <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-[#fda4af] to-transparent" />
                  <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-[#fda4af] to-transparent" />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-[var(--font-playfair)] text-4xl font-bold italic text-[#fda4af18]">
                      {story.chapter}
                    </span>
                    <p className="font-[var(--font-poppins)] text-[10px] tracking-[0.3em] text-[#fda4af88] uppercase">
                      Bab {story.chapter}
                    </p>
                  </div>

                  <h3 className="font-[var(--font-playfair)] text-xl font-semibold italic text-[#f8fafc] sm:text-2xl">
                    {story.title}
                  </h3>

                  <p className="font-[var(--font-poppins)] text-sm leading-7 text-[#f8fafcaa]">
                    {story.body}
                  </p>

                  <div className="mt-1 border-l-2 border-[#fda4af44] pl-4">
                    <p className="font-[var(--font-playfair)] text-sm italic text-[#fda4af]">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {stories.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDir(i > idx ? 1 : -1);
                setIdx(i);
              }}
              aria-label={`Bab ${i + 1}`}
              className="transition-all"
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  i === idx
                    ? "h-1.5 w-5 bg-[#fda4af]"
                    : "h-1.5 w-1.5 bg-[#fda4af33]"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex w-full items-center justify-between gap-4">
          {/* Prev */}
          <motion.button
            onClick={goPrev}
            whileTap={{ scale: 0.95 }}
            className={`rounded-full border px-5 py-2.5 font-[var(--font-poppins)] text-xs tracking-widest transition-all ${
              idx === 0
                ? "cursor-not-allowed border-[#fda4af11] text-[#fda4af22]"
                : "border-[#fda4af33] text-[#fda4af88] hover:border-[#fda4af66] hover:text-[#fda4af]"
            }`}
            disabled={idx === 0}
          >
            ← Kembali
          </motion.button>

          {/* Next / Lanjut */}
          <motion.button
            onClick={goNext}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className="pulse-glow relative flex items-center gap-2 overflow-hidden rounded-full border border-[#fda4af55] bg-[#fda4af0d] px-7 py-2.5 font-[var(--font-poppins)] text-sm tracking-widest text-[#fda4af] transition-all hover:border-[#fda4af99] hover:bg-[#fda4af1a]"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fda4af15] to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10">
              {isLast ? "Baca Suratnya" : "Selanjutnya"}
            </span>
            <ChevronRight size={14} className="relative z-10" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
