"use client";

import React, { useEffect, useRef } from "react";

export interface GradientWaveProps {
  className?: string;
  colors?: string[];
  speed?: number;
  waveCount?: number;
  amplitude?: number;
  interactive?: boolean;
}

export function GradientWave({
  className = "",
  colors = [
    "#38bdf8", // Sky blue 400
    "#0ea5e9", // Sky blue 500
    "#7dd3fc", // Sky blue 300
    "#bae6fd", // Sky blue 200
    "#ffffff", // Highlight white
  ],
  speed = 0.006,
  waveCount = 4,
  amplitude = 50,
  interactive = true,
}: GradientWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseRef.current.targetX = Math.max(0, Math.min(1, x));
      mouseRef.current.targetY = Math.max(0, Math.min(1, y));
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Smooth mouse lerping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      time += speed;

      ctx.clearRect(0, 0, width, height);

      // 1. Base Gradient Background (Sky blue radiant wash)
      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, "#7dd3fc");
      bgGradient.addColorStop(0.35, "#38bdf8");
      bgGradient.addColorStop(0.7, "#60a5fa");
      bgGradient.addColorStop(1, "#bae6fd");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Ambient luminous soft glow influenced by mouse
      const glowX = width * (0.3 + mouseRef.current.x * 0.4);
      const glowY = height * (0.2 + mouseRef.current.y * 0.3);
      const ambientGlow = ctx.createRadialGradient(
        glowX,
        glowY,
        width * 0.05,
        glowX,
        glowY,
        width * 0.75
      );
      ambientGlow.addColorStop(0, "rgba(255, 255, 255, 0.45)");
      ambientGlow.addColorStop(0.5, "rgba(186, 230, 253, 0.2)");
      ambientGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // 3. Multi-layer Organic Gradient Waves
      const count = Math.max(2, waveCount);
      for (let i = 0; i < count; i++) {
        const progress = i / (count - 1);
        const waveBaseY = height * (0.38 + progress * 0.38);
        const waveAmp = amplitude * (0.8 + Math.sin(time + i) * 0.25);
        const freq = 0.0018 + i * 0.0006;
        const phase = time * (0.8 + i * 0.4) + i * 2.1;
        const mouseShift = (mouseRef.current.x - 0.5) * 60 * (1 - progress);

        ctx.beginPath();
        ctx.moveTo(0, height);

        const step = 8;
        for (let x = 0; x <= width + step; x += step) {
          const nx = x + mouseShift;
          const y =
            waveBaseY +
            Math.sin(nx * freq + phase) * waveAmp +
            Math.cos(nx * freq * 0.65 - phase * 0.7) * (waveAmp * 0.45) +
            Math.sin(nx * 0.004 + time * 0.5) * (waveAmp * 0.2);

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Wave Fill Gradient
        const waveGrad = ctx.createLinearGradient(0, waveBaseY - waveAmp, width, height);
        const c1 = colors[i % colors.length] || colors[0];
        const c2 = colors[(i + 1) % colors.length] || colors[1];
        const alpha = 0.55 + progress * 0.35;

        waveGrad.addColorStop(0, hexToRgba(c1, alpha * 0.75));
        waveGrad.addColorStop(0.5, hexToRgba(c2, alpha));
        waveGrad.addColorStop(1, hexToRgba(colors[colors.length - 1] || "#ffffff", alpha * 0.9));

        ctx.fillStyle = waveGrad;
        ctx.fill();

        // Subtle crest light highlight
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.25 + progress * 0.45})`;
        ctx.stroke();
      }

      // 4. Foreground luminous curved rolling wave ribbon (matching preview)
      drawForegroundRibbon(ctx, width, height, time, mouseRef.current);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [colors, speed, waveCount, amplitude, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none -z-0 ${className}`}
      style={{ display: "block" }}
    />
  );
}

function drawForegroundRibbon(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  mouse: { x: number; y: number }
) {
  const ribbonY = height * 0.78 + Math.sin(time * 0.7) * 20 - (mouse.y - 0.5) * 30;
  
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(0, ribbonY + 40);

  // Bezier smooth organic crest
  const cp1x = width * 0.25 + Math.cos(time * 0.5) * 40;
  const cp1y = ribbonY - 80 + Math.sin(time * 0.8) * 30;
  const cp2x = width * 0.65 + Math.sin(time * 0.6) * 50;
  const cp2y = ribbonY - 40 - Math.cos(time * 0.5) * 25;
  const endX = width;
  const endY = ribbonY + 20;

  ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
  ctx.lineTo(width, height);
  ctx.closePath();

  const ribbonGrad = ctx.createLinearGradient(0, ribbonY - 80, width, height);
  ribbonGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
  ribbonGrad.addColorStop(0.35, "rgba(186, 230, 253, 0.85)");
  ribbonGrad.addColorStop(0.7, "rgba(56, 189, 248, 0.75)");
  ribbonGrad.addColorStop(1, "rgba(2, 132, 199, 0.65)");

  ctx.fillStyle = ribbonGrad;
  ctx.fill();

  // Highlight along crest
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
  ctx.stroke();
}

function hexToRgba(hex: string, alpha: number): string {
  if (hex.startsWith("rgba")) return hex;
  let cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(cleanHex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default GradientWave;
