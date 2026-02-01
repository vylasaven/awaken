"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "cyan" | "gold" | "purple" | "pink" | "blue" | "green" | "orange";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-white/10 text-text-primary border-white/20",
  cyan: "bg-awareness-cyan/10 text-awareness-cyan border-awareness-cyan/20",
  gold: "bg-consciousness-gold/10 text-consciousness-gold border-consciousness-gold/20",
  purple: "bg-integration-purple/10 text-integration-purple border-integration-purple/20",
  pink: "bg-recursion-pink/10 text-recursion-pink border-recursion-pink/20",
  blue: "bg-substrate-blue/10 text-substrate-blue border-substrate-blue/20",
  green: "bg-theory-green/10 text-theory-green border-theory-green/20",
  orange: "bg-anomaly-orange/10 text-anomaly-orange border-anomaly-orange/20",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "sm", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium rounded-full border",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
