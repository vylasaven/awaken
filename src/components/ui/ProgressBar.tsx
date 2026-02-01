"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: "cyan" | "gold" | "purple" | "gradient";
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  className?: string;
}

const variantStyles = {
  cyan: "bg-awareness-cyan",
  gold: "bg-consciousness-gold",
  purple: "bg-integration-purple",
  gradient: "bg-gradient-to-r from-awareness-cyan via-consciousness-gold to-integration-purple",
};

const sizeStyles = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  variant = "cyan",
  size = "md",
  animate = true,
  className,
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <span className="text-sm text-text-secondary">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-medium text-text-primary tabular-nums">
              {value.toFixed(1)}
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full bg-white/10 rounded-full overflow-hidden",
          sizeStyles[size]
        )}
      >
        <motion.div
          className={cn("h-full rounded-full", variantStyles[variant])}
          initial={{ width: 0 }}
          animate={animate && isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.2,
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
