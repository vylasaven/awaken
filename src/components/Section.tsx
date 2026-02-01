"use client";

import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  fullWidth?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "py-section-sm",
  md: "py-section",
  lg: "py-32",
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      title,
      subtitle,
      children,
      className,
      containerClassName,
      fullWidth = false,
      padding = "md",
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn("relative", paddingStyles[padding], className)}
        {...props}
      >
        <div
          className={cn(
            fullWidth ? "w-full" : "section-container",
            containerClassName
          )}
        >
          {(title || subtitle) && (
            <motion.div
              className="mb-12"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {title && (
                <h2 className="text-h2 text-text-primary mb-4">{title}</h2>
              )}
              {subtitle && (
                <p className="text-body-lg text-text-secondary max-w-prose">
                  {subtitle}
                </p>
              )}
              <div className="divider mt-6" />
            </motion.div>
          )}
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = "Section";

// Section header component for more complex headers
interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {eyebrow && (
        <span className="text-awareness-cyan text-sm font-semibold uppercase tracking-wider mb-2 block">
          {eyebrow}
        </span>
      )}
      <h2 className="text-h2 text-text-primary mb-4">{title}</h2>
      {description && (
        <p
          className={cn(
            "text-body-lg text-text-secondary",
            align === "center" ? "max-w-2xl mx-auto" : "max-w-prose"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default Section;
