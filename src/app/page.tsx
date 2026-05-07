"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import AnimatedStars from "@/components/AnimatedStars";
import FloatingParticles from "@/components/FloatingParticles";
import MusicPlayer from "@/components/MusicPlayer";
import HeroScreen from "@/components/HeroScreen";
import StoryScreen from "@/components/StoryScreen";
import LetterScreen from "@/components/LetterScreen";
import FinalScreen from "@/components/FinalScreen";

const SCREENS = ["hero", "story", "letter", "final"] as const;
type Screen = (typeof SCREENS)[number];

const variants = {
  enter: { opacity: 0, scale: 0.97 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
};

export default function Home() {
  const [screen, setScreen] = useState<Screen>("hero");

  const next = () => {
    const idx = SCREENS.indexOf(screen);
    if (idx < SCREENS.length - 1) setScreen(SCREENS[idx + 1]);
  };

  return (
    <>
      <LoadingScreen />
      <AnimatedStars />
      <FloatingParticles />
      <MusicPlayer />

      {/* Fullscreen container — no scroll */}
      <div className="fixed inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            {screen === "hero" && <HeroScreen onNext={next} />}
            {screen === "story" && <StoryScreen onNext={next} />}
            {screen === "letter" && <LetterScreen onNext={next} />}
            {screen === "final" && <FinalScreen />}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
