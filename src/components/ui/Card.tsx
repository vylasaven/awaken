"use client";

import { forwardRef, ReactNode, HTMLAttributes } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  variant?: "default" | "interactive" | "glass" | "gradient";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  glow?: "none" | "cyan" | "gold" | "purple";
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const variantStyles = {
  default: cn(
    "bg-twilight/30 backdrop-blur-sm",
    "border border-white/5"
  ),
  interactive: cn(
    "bg-twilight/30 backdrop-blur-sm",
    "border border-white/5",
    "cursor-pointer",
    "hover:border-awareness-cyan/30 hover:bg-twilight/50"
  ),
  glass: cn(
    "bg-white/5 backdrop-blur-md",
    "border border-white/10"
  ),
  gradient: cn(
    "bg-gradient-to-br from-twilight/50 to-midnight/50",
    "backdrop-blur-sm",
    "border border-white/5"
  ),
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const glowStyles = {
  none: "",
  cyan: "shadow-glow-cyan",
  gold: "shadow-glow-gold",
  purple: "shadow-glow-purple",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      padding = "md",
      hover = false,
      glow = "none",
      children,
      onClick,
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-xl",
          "shadow-card",
          "transition-all duration-300",
          variantStyles[variant],
          paddingStyles[padding],
          hover && "hover:shadow-card-hover hover:-translate-y-1",
          glowStyles[glow],
          className
        )}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        whileHover={
          variant === "interactive"
            ? { scale: 1.01, transition: { duration: 0.2 } }
            : undefined
        }
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

// Card Header component
export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 mb-4", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// Card Title component
export const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-h4 text-text-primary font-semibold", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// Card Description component
export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-body text-text-secondary", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// Card Content component
export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardContent.displayName = "CardContent";

// Card Footer component
export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center mt-4 pt-4 border-t border-white/5", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export default Card;
