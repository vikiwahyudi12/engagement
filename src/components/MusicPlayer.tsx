"use client";

import { useEffect, useRef } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;

    // Try autoplay — browsers may block it until user interaction
    const tryPlay = () => {
      audio.play().catch(() => {
        // Blocked by browser policy; retry on first user interaction
        const onInteract = () => {
          audio.play().catch(() => {});
          document.removeEventListener("click", onInteract);
          document.removeEventListener("touchstart", onInteract);
          document.removeEventListener("keydown", onInteract);
        };
        document.addEventListener("click", onInteract, { once: true });
        document.addEventListener("touchstart", onInteract, { once: true });
        document.addEventListener("keydown", onInteract, { once: true });
      });
    };

    tryPlay();
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/melamarmu-lagu-fix.mp3"
      loop
      preload="auto"
      aria-hidden="true"
    />
  );
}
