"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  showValue?: boolean;
  valueFormatter?: (value: number) => string;
  variant?: "cyan" | "gold" | "purple";
}

const variantStyles = {
  cyan: {
    thumb: "border-awareness-cyan bg-awareness-cyan",
    track: "bg-awareness-cyan",
  },
  gold: {
    thumb: "border-consciousness-gold bg-consciousness-gold",
    track: "bg-consciousness-gold",
  },
  purple: {
    thumb: "border-integration-purple bg-integration-purple",
    track: "bg-integration-purple",
  },
};

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      label,
      showValue = true,
      valueFormatter = (v) => v.toString(),
      variant = "cyan",
      value,
      min = 0,
      max = 100,
      ...props
    },
    ref
  ) => {
    const numericValue = typeof value === "number" ? value : parseFloat(value as string) || 0;
    const numericMin = typeof min === "number" ? min : parseFloat(min as string) || 0;
    const numericMax = typeof max === "number" ? max : parseFloat(max as string) || 100;
    const percentage = ((numericValue - numericMin) / (numericMax - numericMin)) * 100;

    return (
      <div className={cn("w-full", className)}>
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-2">
            {label && (
              <label className="text-sm text-text-secondary">{label}</label>
            )}
            {showValue && (
              <span className="text-sm font-medium text-text-primary tabular-nums">
                {valueFormatter(numericValue)}
              </span>
            )}
          </div>
        )}
        <div className="relative h-6 flex items-center">
          {/* Track background */}
          <div className="absolute inset-x-0 h-2 bg-white/10 rounded-full" />

          {/* Filled track */}
          <div
            className={cn(
              "absolute left-0 h-2 rounded-full transition-all",
              variantStyles[variant].track
            )}
            style={{ width: `${percentage}%` }}
          />

          {/* Native range input */}
          <input
            ref={ref}
            type="range"
            value={value}
            min={min}
            max={max}
            className={cn(
              "absolute inset-0 w-full h-2 opacity-0 cursor-pointer z-10",
              "[&::-webkit-slider-thumb]:appearance-none",
              "[&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5",
              "[&::-webkit-slider-thumb]:rounded-full",
              "[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5",
              "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
            )}
            {...props}
          />

          {/* Visual thumb */}
          <div
            className={cn(
              "absolute w-5 h-5 rounded-full border-2 shadow-lg",
              "transform -translate-x-1/2 pointer-events-none",
              "transition-transform hover:scale-110",
              variantStyles[variant].thumb
            )}
            style={{ left: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export default Slider;
