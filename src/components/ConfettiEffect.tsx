"use client";

import { useEffect, useRef } from "react";

interface ConfettiPiece {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  shape: "rect" | "circle" | "heart";
  opacity: number;
}

interface ConfettiEffectProps {
  active: boolean;
}

export default function ConfettiEffect({ active }: ConfettiEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const piecesRef = useRef<ConfettiPiece[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      "#fda4af",
      "#fecdd3",
      "#fb7185",
      "#f8fafc",
      "#ffffff",
      "#f43f5e",
      "#ffb6c1",
      "#ff69b4",
    ];

    piecesRef.current = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      size: Math.random() * 8 + 4,
      speedX: (Math.random() - 0.5) * 4,
      speedY: Math.random() * 4 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: (["rect", "circle", "heart"] as const)[
        Math.floor(Math.random() * 3)
      ],
      opacity: 1,
    }));

    const drawHeart = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x, y + size / 4);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
      ctx.bezierCurveTo(
        x - size / 2,
        y + size / 2,
        x,
        y + (size * 3) / 4,
        x,
        y + size
      );
      ctx.bezierCurveTo(
        x,
        y + (size * 3) / 4,
        x + size / 2,
        y + size / 2,
        x + size / 2,
        y + size / 4
      );
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allGone = true;

      piecesRef.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.speedY += 0.05; // gravity

        if (p.y < canvas.height + 50) allGone = false;

        if (p.y > canvas.height - 100) {
          p.opacity = Math.max(0, p.opacity - 0.02);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          drawHeart(ctx, -p.size / 2, -p.size / 2, p.size);
          ctx.fill();
        }

        ctx.restore();
      });

      if (!allGone) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
      aria-hidden="true"
    />
  );
}
