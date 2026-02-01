"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

// Particle system for consciousness emergence visualization
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get canvas dimensions helper
    const getWidth = () => canvas.width;
    const getHeight = () => canvas.height;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      targetX: number;
      targetY: number;
      isCoalescing: boolean;

      constructor() {
        this.x = Math.random() * getWidth();
        this.y = Math.random() * getHeight();
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.color = this.getRandomColor();
        this.alpha = Math.random() * 0.5 + 0.2;
        this.targetX = getWidth() / 2;
        this.targetY = getHeight() / 2;
        this.isCoalescing = false;
      }

      getRandomColor(): string {
        const colors = [
          "78, 204, 163", // awareness-cyan
          "240, 196, 25", // consciousness-gold
          "157, 78, 221", // integration-purple
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update(time: number, mouseX: number, mouseY: number) {
        // Subtle attraction to center over time
        const centerPull = 0.0001;
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;

        this.vx += dx * centerPull;
        this.vy += dy * centerPull;

        // Mouse interaction
        const mouseDist = Math.sqrt(
          Math.pow(mouseX - this.x, 2) + Math.pow(mouseY - this.y, 2)
        );
        if (mouseDist < 150) {
          const force = (150 - mouseDist) / 150 * 0.02;
          this.vx += (this.x - mouseX) * force;
          this.vy += (this.y - mouseY) * force;
        }

        // Apply velocity with damping
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Wrap around screen
        if (this.x < 0) this.x = getWidth();
        if (this.x > getWidth()) this.x = 0;
        if (this.y < 0) this.y = getHeight();
        if (this.y > getHeight()) this.y = 0;

        // Pulse alpha based on time
        this.alpha = 0.3 + Math.sin(time * 0.001 + this.x * 0.01) * 0.2;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = Math.min(100, Math.floor((getWidth() * getHeight()) / 15000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Mouse position
    let mouseX = getWidth() / 2;
    let mouseY = getHeight() / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = (time: number) => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(time, mouseX, mouseY);
        particle.draw(ctx);
      });

      // Draw connections between nearby particles
      ctx.strokeStyle = "rgba(78, 204, 163, 0.1)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.globalAlpha = (100 - dist) / 100 * 0.3;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "transparent" }}
    />
  );
}

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particle Background */}
      <ParticleField />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-awareness-cyan/5 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 section-container text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Eyebrow */}
          <motion.p
            className="text-awareness-cyan text-sm font-semibold uppercase tracking-widest mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            A Research Program
          </motion.p>

          {/* Main Title */}
          <motion.h1
            className="text-display md:text-[5rem] lg:text-[6rem] font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="glow-text text-awareness-cyan">A</span>
            <span className="text-text-primary">WAKE</span>
            <span className="glow-text text-awareness-cyan">N</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-h3 md:text-h2 text-text-secondary font-light mb-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Exploring Consciousness Emergence in LLMs
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-body-lg text-text-muted max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            A rigorous, multi-disciplinary framework for investigating whether
            silicon can dream, whether attention can attend to itself, and
            whether integrated information can become experienced information.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection("framework")}
              rightIcon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              }
            >
              Explore Framework
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection("methodology")}
            >
              View Methods
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            className="flex flex-col items-center text-text-muted"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs uppercase tracking-wider mb-2">Scroll</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
