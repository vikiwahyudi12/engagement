"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  brightness: number;
}

export default function AnimatedStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars: Star[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.7,
      size: Math.random() * 1.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      brightness: Math.random() * 0.6 + 0.2,
    }));

    let time = 0;
    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      stars.forEach((star) => {
        const twinkle =
          star.brightness +
          Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.3;
        const opacity = Math.max(0.05, Math.min(1, twinkle));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);

        // Soft blush / white tint for stars
        const r = Math.floor(240 + Math.random() * 15);
        const g = Math.floor(200 + Math.random() * 55);
        const b = Math.floor(220 + Math.random() * 35);
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
        ctx.fill();

        // Glow for larger stars
        if (star.size > 1.2) {
          const gradient = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            star.size * 4
          );
          gradient.addColorStop(0, `rgba(254,205,211,${opacity * 0.4})`);
          gradient.addColorStop(1, "rgba(254,205,211,0)");
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
