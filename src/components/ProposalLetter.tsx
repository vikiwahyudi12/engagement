"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const paragraphs = [
  `Melamarmu bagiku bukan sekadar rangkaian kata romantis, tetapi sebuah keputusan besar untuk berjalan bersama dalam waktu yang panjang. Ketika aku meminta kamu menjadi pasangan hidupku, itu berarti aku siap menerima seluruh tentangmu, baik kekurangan maupun kelebihanmu, lalu tumbuh bersama melewati setiap fase kehidupan. Karena cinta yang sebenarnya bukan hanya tentang rasa nyaman saat bahagia, tetapi tentang tetap memilih satu sama lain bahkan ketika keadaan sedang tidak baik-baik saja.`,
  `Ketika aku berharap kamu menjadi ibu dari anak-anakku, itu bukan hanya karena aku mencintaimu, tetapi karena aku percaya padamu. Aku membayangkan kita membesarkan mereka bersama, mengajarkan banyak hal sederhana yang mungkin akan mereka ingat seumur hidup. Tentang bagaimana menghargai orang lain, bagaimana tetap kuat saat hidup tidak berjalan sesuai harapan, dan bagaimana cinta seharusnya dijaga, bukan ditinggalkan. Dari cara kita saling menggenggam di masa sulit, mereka akan belajar bahwa keluarga bukan tentang siapa yang paling sempurna, tetapi tentang siapa yang tetap bertahan dan tidak saling meninggalkan ketika keadaan sedang hancur-hancurnya.`,
  `Pada akhirnya, melamarmu adalah tentang menemukan seseorang yang ingin tetap kupilih sampai kapan pun. Aku tidak ingin mencintaimu hanya pada masa-masa indah, tetapi juga saat hidup terasa berat, saat dunia berubah, dan saat usia perlahan membuat segalanya tidak lagi sama. Jika nanti rambut kita memutih dan langkah mulai melemah, aku tetap ingin pulang ke orang yang sama, yaitu kamu. Karena bagiku, cinta bukan tentang siapa yang datang paling sempurna, tetapi siapa yang tetap tinggal dan tidak pergi, bahkan setelah banyak alasan untuk menyerah.`,
];

function AnimatedParagraph({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay: index * 0.2, ease: "easeOut" }}
      className="font-[var(--font-poppins)] text-base leading-9 text-[#f5f0e8cc] md:text-lg md:leading-10"
    >
      {text}
    </motion.p>
  );
}

export default function ProposalLetter() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="letter" className="relative py-16 px-4 sm:py-28 sm:px-6">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(12,10,8,0.8) 20%, rgba(12,10,8,0.9) 50%, rgba(12,10,8,0.8) 80%, transparent 100%)",
          }}
        />
        {/* Gold blur orbs */}
        <div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full opacity-5 blur-3xl"
          style={{ background: "radial-gradient(circle, #c9a84c, transparent)" }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full opacity-5 blur-3xl"
          style={{ background: "radial-gradient(circle, #c9a84c, transparent)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-16 flex flex-col items-center gap-5 text-center"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
          <p className="font-[var(--font-poppins)] text-xs tracking-[0.4em] text-[#c9a84c88] uppercase">
            Surat dari Hati
          </p>
          <h2 className="font-[var(--font-playfair)] text-4xl font-semibold italic text-[#f5f0e8] md:text-5xl">
            Sebuah Lamaran
          </h2>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
        </motion.div>

        {/* Letter card */}
        <div className="relative rounded-3xl border border-[#c9a84c15] bg-[#0f0d0b]/80 p-6 backdrop-blur-sm sm:p-10 md:p-14"
          style={{
            boxShadow:
              "0 0 80px rgba(0,0,0,0.5), 0 0 40px rgba(201,168,76,0.04), inset 0 1px 0 rgba(201,168,76,0.08)",
          }}
        >
          {/* Corner accents */}
          {["top-0 left-0 rounded-tl-3xl", "top-0 right-0 rounded-tr-3xl", "bottom-0 left-0 rounded-bl-3xl", "bottom-0 right-0 rounded-br-3xl"].map(
            (pos, i) => (
              <div key={i} className={`absolute ${pos} h-12 w-12 overflow-hidden`}>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      i < 2
                        ? "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, transparent 60%)"
                        : "linear-gradient(315deg, rgba(201,168,76,0.15) 0%, transparent 60%)",
                  }}
                />
              </div>
            )
          )}

          {/* Opening quote mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 font-[var(--font-playfair)] text-7xl leading-none text-[#c9a84c15]"
          >
            &ldquo;
          </motion.div>

          {/* Paragraphs */}
          <div className="flex flex-col gap-8">
            {paragraphs.map((p, i) => (
              <AnimatedParagraph key={i} text={p} index={i} />
            ))}
          </div>

          {/* Closing */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 flex flex-col items-end gap-2"
          >
            <div className="h-px w-16 bg-gradient-to-l from-[#c9a84c44] to-transparent" />
            <p className="font-[var(--font-playfair)] text-sm italic text-[#c9a84c88]">
              Dengan sepenuh hati,
            </p>
            <p className="font-[var(--font-playfair)] text-lg italic text-[#c9a84c]">
            Viki
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
