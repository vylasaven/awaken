import { Variants } from "framer-motion";

/**
 * Animation variants for Framer Motion
 * Used throughout the AWAKEN site for consistent motion design
 */

// Fade in from below (used for section reveals)
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1], // Custom easing
    },
  },
};

// Fade in with scale
export const fadeInScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Simple fade in
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Stagger children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Fast stagger for lists
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Scale up animation (for cards on hover)
export const scaleOnHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tap: { scale: 0.98 },
};

// Glow pulse animation
export const glowPulse: Variants = {
  initial: {
    boxShadow: "0 0 0 rgba(78, 204, 163, 0)",
  },
  animate: {
    boxShadow: [
      "0 0 0 rgba(78, 204, 163, 0)",
      "0 0 20px rgba(78, 204, 163, 0.3)",
      "0 0 0 rgba(78, 204, 163, 0)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Draw line animation (for diagrams)
export const drawLine: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, ease: "easeInOut" },
      opacity: { duration: 0.3 },
    },
  },
};

// Rotate and fade (for loading states)
export const rotateIn: Variants = {
  hidden: {
    opacity: 0,
    rotate: -10,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Floating animation (for hero particles)
export const floating: Variants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Consciousness emergence (for hero)
export const consciousnessEmergence: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Modal/overlay animation
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2 },
  },
};

// Tab content animation
export const tabContent: Variants = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: 10,
    transition: { duration: 0.2 },
  },
};

// Progress bar animation
export const progressBar: Variants = {
  hidden: { scaleX: 0 },
  visible: (custom: number) => ({
    scaleX: custom,
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

// Counter/number animation spring config
export const numberSpring = {
  type: "spring",
  damping: 30,
  stiffness: 100,
};

// Viewport settings for scroll-triggered animations
export const defaultViewport = {
  once: true,
  margin: "-100px",
};

// Animation presets for common use cases
export const presets = {
  section: {
    variants: fadeInUp,
    initial: "hidden",
    whileInView: "visible",
    viewport: defaultViewport,
  },
  card: {
    variants: fadeInScale,
    initial: "hidden",
    whileInView: "visible",
    viewport: defaultViewport,
  },
  staggerParent: {
    variants: staggerContainer,
    initial: "hidden",
    whileInView: "visible",
    viewport: defaultViewport,
  },
  staggerChild: {
    variants: fadeInUp,
  },
};
