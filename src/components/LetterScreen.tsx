"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";

interface Props {
  onNext: () => void;
}

const paragraphs = [
  `Melamarmu bagiku bukan sekadar rangkaian kata romantis, tetapi sebuah keputusan besar untuk berjalan bersama dalam waktu yang panjang. Ketika aku meminta kamu menjadi pasangan hidupku, itu berarti aku siap menerima seluruh tentangmu, baik kekurangan maupun kelebihanmu, lalu tumbuh bersama melewati setiap fase kehidupan. Karena cinta yang sebenarnya bukan hanya tentang rasa nyaman saat bahagia, tetapi tentang tetap memilih satu sama lain bahkan ketika keadaan sedang tidak baik-baik saja.`,
  `Ketika aku berharap kamu menjadi ibu dari anak-anakku, itu bukan hanya karena aku mencintaimu, tetapi karena aku percaya padamu. Aku membayangkan kita membesarkan mereka bersama, mengajarkan banyak hal sederhana yang mungkin akan mereka ingat seumur hidup. Tentang bagaimana menghargai orang lain, bagaimana tetap kuat saat hidup tidak berjalan sesuai harapan, dan bagaimana cinta seharusnya dijaga, bukan ditinggalkan. Dari cara kita saling menggenggam di masa sulit, mereka akan belajar bahwa keluarga bukan tentang siapa yang paling sempurna, tetapi tentang siapa yang tetap bertahan dan tidak saling meninggalkan ketika keadaan sedang hancur-hancurnya.`,
  `Pada akhirnya, melamarmu adalah tentang menemukan seseorang yang ingin tetap kupilih sampai kapan pun. Aku tidak ingin mencintaimu hanya pada masa-masa indah, tetapi juga saat hidup terasa berat, saat dunia berubah, dan saat usia perlahan membuat segalanya tidak lagi sama. Jika nanti rambut kita memutih dan langkah mulai melemah, aku tetap ingin pulang ke orang yang sama, yaitu kamu. Karena bagiku, cinta bukan tentang siapa yang datang paling sempurna, tetapi siapa yang tetap tinggal dan tidak pergi, bahkan setelah banyak alasan untuk menyerah.`,
];

export default function LetterScreen({ onNext }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    // Hide hint once user starts scrolling
    if (el.scrollTop > 20) setShowScrollHint(false);
    // Detect near bottom
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 24;
    setIsAtBottom(nearBottom);
  };

  // Auto-hide hint after 3s even without scroll
  useEffect(() => {
    const t = setTimeout(() => setShowScrollHint(false), 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-4 py-8">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(2,6,23,0.7) 20%, rgba(2,6,23,0.85) 50%, rgba(2,6,23,0.7) 80%, transparent 100%)",
          }}
        />
        <div
          className="absolute left-1/4 top-1/4 h-80 w-80 rounded-full opacity-5 blur-3xl"
          style={{ background: "radial-gradient(circle, #fda4af, transparent)" }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 h-56 w-56 rounded-full opacity-5 blur-3xl"
          style={{ background: "radial-gradient(circle, #fda4af, transparent)" }}
        />
      </div>

      <div className="relative z-10 flex h-full w-full max-w-2xl flex-col gap-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-shrink-0 flex-col items-center gap-2 pt-2"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#fda4af] to-transparent" />
          <p className="font-[var(--font-poppins)] text-[10px] tracking-[0.4em] text-[#fda4af88] uppercase">
            Surat dari Hati
          </p>
          <h2 className="font-[var(--font-playfair)] text-2xl font-semibold italic text-[#f8fafc] sm:text-3xl">
            Sebuah Lamaran
          </h2>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#fda4af] to-transparent" />
        </motion.div>

        {/* Letter card — scrollable internally */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-[#fda4af15] bg-[#0b1120]/80 backdrop-blur-sm"
          style={{
            boxShadow:
              "0 0 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(253,164,175,0.08)",
          }}
        >
          {/* Corner accents */}
          {[
            "top-0 left-0 rounded-tl-2xl",
            "top-0 right-0 rounded-tr-2xl",
            "bottom-0 left-0 rounded-bl-2xl",
            "bottom-0 right-0 rounded-br-2xl",
          ].map((pos, i) => (
            <div
              key={i}
              className={`pointer-events-none absolute ${pos} h-10 w-10 overflow-hidden`}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    i < 2
                      ? "linear-gradient(135deg, rgba(253,164,175,0.12) 0%, transparent 60%)"
                      : "linear-gradient(315deg, rgba(253,164,175,0.12) 0%, transparent 60%)",
                }}
              />
            </div>
          ))}

          {/* Scrollable content */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-full overflow-y-auto px-5 py-6 sm:px-8 sm:py-8"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="mb-4 font-[var(--font-playfair)] text-5xl leading-none text-[#fda4af12]">
              &ldquo;
            </div>

            <div className="flex flex-col gap-6">
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
                  className="font-[var(--font-poppins)] text-sm leading-8 text-[#f8fafcbb] sm:text-base sm:leading-9"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-8 flex flex-col items-end gap-1.5 pb-4"
            >
              <div className="h-px w-12 bg-gradient-to-l from-[#fda4af44] to-transparent" />
              <p className="font-[var(--font-playfair)] text-xs italic text-[#fda4af88]">
                Dengan sepenuh hati,
              </p>
              <p className="font-[var(--font-playfair)] text-base italic text-[#fda4af]">
              Viki
              </p>
            </motion.div>
          </div>

          {/* Bottom fade — hides when at bottom */}
          <AnimatePresence>
            {!isAtBottom && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 rounded-b-2xl"
                style={{
                  background:
                    "linear-gradient(to top, #0b1120 0%, rgba(4,8,26,0.85) 40%, transparent 100%)",
                }}
              />
            )}
          </AnimatePresence>

          {/* Scroll hint — bouncing arrow */}
          <AnimatePresence>
            {showScrollHint && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: [0, 5, 0] }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.8 },
                  y: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="pointer-events-none absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-0.5"
              >
                <p className="font-[var(--font-poppins)] text-[9px] tracking-widest text-[#fda4af66] uppercase">
                  geser
                </p>
                <ChevronDown size={14} className="text-[#fda4af66]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Next button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-shrink-0 justify-center pb-2"
        >
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className="pulse-glow relative flex items-center gap-2 overflow-hidden rounded-full border border-[#fda4af55] bg-[#fda4af0d] px-8 py-3.5 font-[var(--font-poppins)] text-sm tracking-widest text-[#fda4af] transition-all hover:border-[#fda4af99] hover:bg-[#fda4af1a]"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fda4af15] to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10">Lanjut ke Pertanyaan</span>
            <ChevronRight size={14} className="relative z-10" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
