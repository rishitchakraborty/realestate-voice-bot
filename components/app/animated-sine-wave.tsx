"use client";

import React, { useEffect, useRef } from "react";

interface SineWaveProps {
  className?: string;
  speed?: number;
  amplitude?: number;
  frequency?: number;
  color?: string;
}

export function AnimatedSineWave({
  className = "absolute bottom-0 left-0 right-0 h-14 w-full overflow-hidden pointer-events-none z-0",
  speed = 0.035,
  amplitude = 16,
  frequency = 0.01,
  color = "rgba(30, 64, 175, 0.88)",
}: SineWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const resizeCanvas = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
        canvas.height = canvas.parentElement.clientHeight || 56;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // Draw primary animated sine wave fill
      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let x = 0; x <= width; x += 2) {
        // Sine wave formula: y = offset + amplitude * sin(x * frequency + phase)
        const y = height * 0.45 + amplitude * Math.sin(x * frequency + phase);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.fill();

      // Draw secondary layered translucent sine wave for organic liquid wave depth
      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let x = 0; x <= width; x += 2) {
        const y =
          height * 0.52 +
          amplitude * 0.65 * Math.sin(x * frequency * 1.35 - phase * 0.85);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      ctx.fillStyle = "rgba(59, 130, 246, 0.55)";
      ctx.fill();

      phase += speed;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, amplitude, frequency, color]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="h-full w-full block" />
    </div>
  );
}
