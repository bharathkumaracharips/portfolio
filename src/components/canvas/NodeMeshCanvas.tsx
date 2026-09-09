"use client";

import { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
  type: "validator" | "full_node" | "rpc";
  brightness: number;
}

interface Packet {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  color: string;
  size: number;
  trailLength: number;
  history: { x: number; y: number }[];
}

interface DataRain {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  char: string;
  life: number;
}

const HEX_CHARS = "0123456789ABCDEF";

export function NodeMeshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas?.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Build nodes
    const nodeCount = Math.min(Math.floor(width / 25), 70);
    const nodes: Node[] = Array.from({ length: nodeCount }, () => {
      const typeRand = Math.random();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: typeRand > 0.85 ? 4.5 : typeRand > 0.55 ? 3.2 : 2.0,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.04,
        type: typeRand > 0.85 ? "validator" : typeRand > 0.55 ? "rpc" : "full_node",
        brightness: 0.6 + Math.random() * 0.4,
      };
    });

    const packets: Packet[] = [];
    const packetColors = ["#00f0ff", "#00ff9d", "#8a2be2", "#00f0ff", "#00f0ff"];
    const dataRain: DataRain[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.3 + Math.random() * 0.7,
      opacity: 0.1 + Math.random() * 0.3,
      char: HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)],
      life: Math.random() * 100,
    }));

    const spawnPacket = () => {
      if (nodes.length < 2) return;
      const from = Math.floor(Math.random() * nodes.length);
      let to = Math.floor(Math.random() * nodes.length);
      while (to === from) to = Math.floor(Math.random() * nodes.length);
      packets.push({
        fromIndex: from,
        toIndex: to,
        progress: 0,
        speed: 0.008 + Math.random() * 0.015,
        color: packetColors[Math.floor(Math.random() * packetColors.length)],
        size: 2 + Math.random() * 3,
        trailLength: 12,
        history: [],
      });
    };

    const packetInterval = setInterval(spawnPacket, 300);

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Moving data rain characters
      for (const drop of dataRain) {
        drop.y += drop.speed;
        drop.life++;
        if (drop.y > height || drop.life > 200) {
          drop.y = -20;
          drop.x = Math.random() * width;
          drop.char = HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
          drop.life = 0;
        }
        if (frame % 30 === 0) drop.char = HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
        ctx.font = "10px monospace";
        ctx.fillStyle = `rgba(0, 240, 255, ${drop.opacity * 0.5})`;
        ctx.fillText(drop.char, drop.x, drop.y);
      }

      // Move nodes and draw links
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = m.x - n.x;
          const dy = m.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.35 * n.brightness;
            const grad = ctx.createLinearGradient(n.x, n.y, m.x, m.y);
            grad.addColorStop(0, `rgba(0, 240, 255, ${alpha})`);
            grad.addColorStop(1, `rgba(138, 43, 226, ${alpha * 0.5})`);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Packets with glowing trails
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.progress += p.speed;
        if (p.progress >= 1) { packets.splice(i, 1); continue; }

        const nA = nodes[p.fromIndex];
        const nB = nodes[p.toIndex];
        if (!nA || !nB) continue;

        const cx = nA.x + (nB.x - nA.x) * p.progress;
        const cy = nA.y + (nB.y - nA.y) * p.progress;

        p.history.unshift({ x: cx, y: cy });
        if (p.history.length > p.trailLength) p.history.pop();

        // Draw trail
        for (let t = 1; t < p.history.length; t++) {
          const tAlpha = (1 - t / p.trailLength) * 0.8;
          ctx.beginPath();
          ctx.moveTo(p.history[t - 1].x, p.history[t - 1].y);
          ctx.lineTo(p.history[t].x, p.history[t].y);
          ctx.strokeStyle = p.color.replace(")", `, ${tAlpha})`).replace("rgb", "rgba");
          ctx.lineWidth = (1 - t / p.trailLength) * 3;
          ctx.stroke();
        }

        // Draw head
        ctx.beginPath();
        ctx.arc(cx, cy, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw nodes
      for (const n of nodes) {
        const glow = n.radius + Math.sin(n.pulse) * 2.5;
        const color = n.type === "validator" ? "#00f0ff" : n.type === "rpc" ? "#00ff9d" : "#8a2be2";

        const safeGlow = Math.max(0.5, glow);

        // Pulse ring for validators
        if (n.type === "validator") {
          const ringR = Math.max(0.5, safeGlow * (3 + Math.sin(n.pulse) * 1));
          ctx.beginPath();
          ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 + Math.abs(Math.sin(n.pulse)) * 0.1})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Node core
        const gradR = Math.max(0.5, safeGlow);
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, gradR);
        grad.addColorStop(0, color);
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(n.x, n.y, gradR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.shadowColor = color;
        ctx.shadowBlur = n.type === "validator" ? 18 : 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(packetInterval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.75 }}
    />
  );
}
