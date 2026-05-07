"use client";

import { useRef, useLayoutEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useName } from "./NameProvider";
interface StoryCard {
  chapter: string;
  title: string;
  body: string;
  quote: string;
  align: "left" | "right";
}

const stories: StoryCard[] = [
  {
    chapter: "I",
    title: "Tentang Pertemuan",
    body: "Ada momen-momen dalam hidup yang tidak bisa dijelaskan dengan logika. Ketika pertama kali kita bertemu, ada sesuatu yang berbeda seperti semesta sedang berbisik pelan bahwa ini bukan kebetulan biasa.",
    quote: "Beberapa pertemuan tidak terjadi karena kebetulan.",
    align: "left",
  },
  {
    chapter: "II",
    title: "Tentang Rasa Nyaman",
    body: "Bersamamu, aku tidak perlu menjadi siapa pun selain diriku sendiri. Kamu adalah ruang yang aman — tempat di mana aku bisa diam tanpa merasa sepi, dan berbicara tanpa takut disalahpahami.",
    quote: "Kenyamanan sejati adalah ketika kamu bisa menjadi dirimu sendiri.",
    align: "right",
  },
  {
    chapter: "III",
    title: "Tentang Cinta yang Tumbuh Perlahan",
    body: "Cinta ini tidak datang seperti petir. Ia tumbuh perlahan, seperti bunga yang mekar di musim yang tepat. Meski kita tidak selalu bersama setiap hari, setiap percakapan, perhatian, dan kehadiranmu menambahkan satu lapisan lagi pada sesuatu yang sudah terasa sangat berharga.",
    quote: "Yang tumbuh perlahan, bertahan lebih lama.",
    align: "left",
  },
  {
    chapter: "IV",
    title: "Tentang Harapan Masa Depan",
    body: "Aku membayangkan masa depan, dan kamu selalu ada di sana. Bukan sebagai pelengkap, tapi sebagai bagian yang tidak terpisahkan dari cerita yang ingin aku tulis bersama cerita yang panjang, hangat, dan penuh makna.",
    quote: "Masa depan terasa lebih indah ketika kamu ada di dalamnya.",
    align: "right",
  },
];

function StoryCard({ story, index }: { story: StoryCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isNameSet } = useName();

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.display = isNameSet ? 'flex' : 'none';
    }
  }, [isNameSet]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
      className={`flex flex-col gap-4 ${
        story.align === "right" ? "md:items-end md:text-right" : "md:items-start"
      }`}
    >
      {/* Chapter number */}
      <div className="flex items-center gap-4">
        {story.align === "right" && (
          <div className="hidden h-px flex-1 bg-gradient-to-l from-[#fda4af33] to-transparent md:block" />
        )}
        <span className="font-[var(--font-playfair)] text-5xl font-bold italic text-[#fda4af15]">
          {story.chapter}
        </span>
        {story.align === "left" && (
          <div className="hidden h-px flex-1 bg-gradient-to-r from-[#fda4af33] to-transparent md:block" />
        )}
      </div>

      {/* Card */}
      <div
        className={`relative w-full max-w-lg rounded-2xl border border-[#fda4af15] bg-[#0f172a]/60 p-5 backdrop-blur-sm sm:p-8 ${
          story.align === "right" ? "md:ml-auto" : ""
        }`}
        style={{
          boxShadow: "0 4px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(253,164,175,0.05)",
        }}
      >
        {/* Gold accent corner */}
        <div className="absolute top-0 left-0 h-8 w-8 overflow-hidden rounded-tl-2xl">
          <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-[#fda4af] to-transparent" />
          <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-[#fda4af] to-transparent" />
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-[var(--font-poppins)] text-xs tracking-[0.3em] text-[#fda4af88] uppercase">
            Bab {story.chapter}
          </p>
          <h3 className="font-[var(--font-playfair)] text-2xl font-semibold italic text-[#f8fafc]">
            {story.title}
          </h3>
          <p className="font-[var(--font-poppins)] text-sm leading-7 text-[#f8fafcaa]">
            {story.body}
          </p>

          {/* Quote */}
          <div className="mt-2 border-l-2 border-[#fda4af44] pl-4">
            <p className="font-[var(--font-playfair)] text-sm italic text-[#fda4af]">
              &ldquo;{story.quote}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function StorySection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });
  const { isNameSet } = useName();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.display = isNameSet ? 'block' : 'none';
    }
  }, [isNameSet]);

  return (
    <section ref={sectionRef} id="story" className="relative py-16 px-4 sm:py-24 sm:px-6">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(253,164,175,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-20 flex flex-col items-center gap-4 text-center"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#fda4af] to-transparent" />
          <p className="font-[var(--font-poppins)] text-xs tracking-[0.4em] text-[#fda4af88] uppercase">
            Kisah Kita
          </p>
          <h2 className="font-[var(--font-playfair)] text-4xl font-semibold italic text-[#f8fafc] md:text-5xl">
            Sebuah Perjalanan
          </h2>
          <p className="max-w-md font-[var(--font-poppins)] text-sm leading-7 text-[#f8fafcaa]">
            Setiap cerita besar dimulai dari momen-momen kecil yang terasa biasa,
            namun ternyata mengubah segalanya.
          </p>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#fda4af] to-transparent" />
        </motion.div>

        {/* Story cards */}
        <div className="flex flex-col gap-16">
          {stories.map((story, i) => (
            <StoryCard key={story.chapter} story={story} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
