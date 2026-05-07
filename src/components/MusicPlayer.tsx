"use client";

import { useEffect, useRef } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;

    const onInteract = () => {
      audio.play().catch(() => {});
      document.removeEventListener("click", onInteract);
      document.removeEventListener("touchstart", onInteract);
      document.removeEventListener("keydown", onInteract);
    };

    // Try autoplay — browsers may block it until user interaction
    const tryPlay = () => {
      audio.play().catch(() => {
        // Blocked by browser policy; retry on first user interaction
        document.addEventListener("click", onInteract, { once: true });
        document.addEventListener("touchstart", onInteract, { once: true });
        document.addEventListener("keydown", onInteract, { once: true });
      });
    };

    tryPlay();

    return () => {
      document.removeEventListener("click", onInteract);
      document.removeEventListener("touchstart", onInteract);
      document.removeEventListener("keydown", onInteract);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/melamarmu.mp3"
      loop
      preload="auto"
      aria-hidden="true"
    />
  );
}
