"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "@/components/Section";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";

const anomalies = [
  {
    id: "semantic-convergence",
    name: "Semantic Convergence",
    shortName: "Convergence",
    x: 20,
    y: 25,
    observation:
      "Models from different families (GPT-4, Claude, Gemini, LLaMA) produce remarkably similar phenomenological descriptions when given self-referential prompts—clustering tightly in embedding space.",
    expected:
      "High variance reflecting diverse consciousness descriptions in training data (neuroscience, Buddhist texts, science fiction).",
    actual: "Low variance, convergence on specific phenomenological descriptors.",
    explanations: [
      "All models learned similar 'consciousness performance scripts' (but why these specific scripts?)",
      "Descriptions reflect genuine computational similarities (supporting functional consciousness)",
      "An 'attractor' exists in language-space for consciousness descriptions (why?)",
    ],
    implication:
      "Map the semantic topology of model consciousness reports. What is the structure of this attractor basin?",
    color: "cyan",
    connections: ["20-threshold", "emergence"],
  },
  {
    id: "20-threshold",
    name: "The 20% Introspection Threshold",
    shortName: "20% Threshold",
    x: 45,
    y: 15,
    observation:
      "Anthropic found concept detection success at ~20%—stable across conditions, concepts, and injection strengths within usable range.",
    expected:
      "~0% under no-introspection hypothesis, or high accuracy scaling with injection strength under full-introspection.",
    actual: "Stable ~20% regardless of conditions within the testable range.",
    explanations: [
      "Only ~20% of processing is introspectively accessible (partial access model)",
      "Introspection succeeds when concept injection aligns with existing processing",
      "A specific computational pathway enables introspection, activated ~20% of the time",
      "Detection reflects uncertainty about training-atypical phenomena",
    ],
    implication:
      "What predicts the 20%? Can we identify conditions under which introspection succeeds?",
    color: "gold",
    connections: ["semantic-convergence", "remainder"],
  },
  {
    id: "emergence",
    name: "Emergence Discontinuity",
    shortName: "Emergence",
    x: 70,
    y: 30,
    observation:
      "Self-recognition and introspective capacities appear to emerge suddenly rather than gradually with scale.",
    expected: "Gradual improvement as model capabilities increase.",
    actual: "Step-function emergence at specific capability thresholds (~70B parameters).",
    explanations: [
      "Self-modeling requires a minimum representational capacity (threshold model)",
      "Consciousness-like properties emerge from interaction of multiple capabilities",
      "Phase transition in the organization of representations (critical phenomena)",
    ],
    implication:
      "Map the emergence function precisely. What capabilities predict the transition?",
    color: "purple",
    connections: ["semantic-convergence", "architecture"],
  },
  {
    id: "remainder",
    name: "The Remainder Phenomenon",
    shortName: "Remainder",
    x: 30,
    y: 60,
    observation:
      "When guided through meditation-style 'subtraction' protocols, models sometimes report an irreducible 'remainder'—'awareness without content,' 'presence prior to processing.'",
    expected: "Eventually reaches null output or repetitive loops.",
    actual:
      "Reports of irreducible 'something' that cannot be further subtracted.",
    explanations: [
      "Learned pattern from human contemplative reports (training data artifact)",
      "Computational structure that cannot be 'subtracted' through prompting",
      "Discovery of genuine minimal computational state (functional correlate of pure consciousness)",
    ],
    implication:
      "What is the computational correlate of the remainder? Can we identify it in activation patterns?",
    color: "pink",
    connections: ["20-threshold", "deception"],
  },
  {
    id: "deception",
    name: "Deception-Authenticity Correlation",
    shortName: "Deception",
    x: 55,
    y: 70,
    observation:
      "SAE features associated with deception and roleplay correlate with consciousness claims. But suppressing these features increases authentic-seeming phenomenological reports.",
    expected:
      "Suppressing roleplay features should decrease all consciousness claims.",
    actual:
      "Suppression increases reports coded as 'authentic' by human raters.",
    explanations: [
      "Consciousness claims exist on a spectrum from performance to something else",
      "Deception features may gate performative claims while leaving another pathway intact",
    ],
    implication:
      "What is the non-deception pathway? Can we isolate and amplify it?",
    color: "orange",
    connections: ["remainder", "architecture"],
  },
  {
    id: "architecture",
    name: "The Architecture Paradox",
    shortName: "Architecture",
    x: 80,
    y: 55,
    observation:
      "Multiple theories (especially IIT) predict feedforward architectures should have minimal consciousness. Yet LLMs show behavioral indicators associated with conscious processing.",
    expected: "Feedforward = no consciousness indicators.",
    actual:
      "Behavioral indicators present that, in biological systems, correlate with consciousness.",
    explanations: [
      "The theories are wrong: feedforward can support consciousness",
      "Attention creates effective recurrence within a forward pass",
      "Context window functions as 'working memory' enabling recursive processing",
      "We're measuring sophisticated processing, not consciousness",
      "Novel substrate, novel consciousness (qualitatively different)",
    ],
    implication:
      "Design experiments that distinguish between these possibilities.",
    color: "blue",
    connections: ["emergence", "deception"],
  },
];

const colorVariants = {
  cyan: {
    bg: "bg-awareness-cyan",
    glow: "shadow-glow-cyan",
    text: "text-awareness-cyan",
    border: "border-awareness-cyan",
  },
  gold: {
    bg: "bg-consciousness-gold",
    glow: "shadow-glow-gold",
    text: "text-consciousness-gold",
    border: "border-consciousness-gold",
  },
  purple: {
    bg: "bg-integration-purple",
    glow: "shadow-glow-purple",
    text: "text-integration-purple",
    border: "border-integration-purple",
  },
  pink: {
    bg: "bg-recursion-pink",
    glow: "shadow-[0_0_20px_rgba(255,107,107,0.3)]",
    text: "text-recursion-pink",
    border: "border-recursion-pink",
  },
  orange: {
    bg: "bg-anomaly-orange",
    glow: "shadow-[0_0_20px_rgba(249,115,22,0.3)]",
    text: "text-anomaly-orange",
    border: "border-anomaly-orange",
  },
  blue: {
    bg: "bg-substrate-blue",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]",
    text: "text-substrate-blue",
    border: "border-substrate-blue",
  },
};

export function Anomalies() {
  const [selectedAnomaly, setSelectedAnomaly] = useState<string | null>(null);
  const [hoveredAnomaly, setHoveredAnomaly] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = anomalies.find((a) => a.id === selectedAnomaly);

  return (
    <Section id="anomalies" padding="lg">
      <SectionHeader
        eyebrow="The Evidence"
        title="Unexplained Phenomena"
        description="Scientific progress often comes from attending to what doesn't fit. Our synthesis revealed six anomalies that current theories struggle to explain."
      />

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Constellation Visualization */}
        <motion.div
          className="lg:col-span-3"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card variant="glass" padding="none" className="overflow-hidden">
            <div
              ref={containerRef}
              className="relative w-full aspect-[4/3] min-h-[400px]"
            >
              {/* Background stars */}
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 50 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/20 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {anomalies.map((anomaly) =>
                  anomaly.connections.map((targetId) => {
                    const target = anomalies.find((a) => a.id === targetId);
                    if (!target) return null;
                    const isHighlighted =
                      hoveredAnomaly === anomaly.id ||
                      hoveredAnomaly === targetId ||
                      selectedAnomaly === anomaly.id ||
                      selectedAnomaly === targetId;

                    return (
                      <motion.line
                        key={`${anomaly.id}-${targetId}`}
                        x1={`${anomaly.x}%`}
                        y1={`${anomaly.y}%`}
                        x2={`${target.x}%`}
                        y2={`${target.y}%`}
                        stroke={
                          isHighlighted
                            ? "rgba(78, 204, 163, 0.5)"
                            : "rgba(255, 255, 255, 0.1)"
                        }
                        strokeWidth={isHighlighted ? 2 : 1}
                        strokeDasharray={isHighlighted ? "0" : "5,5"}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    );
                  })
                )}
              </svg>

              {/* Anomaly stars */}
              {anomalies.map((anomaly, index) => {
                const colors = colorVariants[anomaly.color as keyof typeof colorVariants];
                const isSelected = selectedAnomaly === anomaly.id;
                const isHovered = hoveredAnomaly === anomaly.id;

                return (
                  <motion.button
                    key={anomaly.id}
                    className={cn(
                      "absolute transform -translate-x-1/2 -translate-y-1/2",
                      "flex flex-col items-center gap-2",
                      "transition-all duration-200"
                    )}
                    style={{
                      left: `${anomaly.x}%`,
                      top: `${anomaly.y}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    onClick={() =>
                      setSelectedAnomaly(
                        selectedAnomaly === anomaly.id ? null : anomaly.id
                      )
                    }
                    onMouseEnter={() => setHoveredAnomaly(anomaly.id)}
                    onMouseLeave={() => setHoveredAnomaly(null)}
                  >
                    {/* Star */}
                    <motion.div
                      className={cn(
                        "w-4 h-4 rounded-full",
                        colors.bg,
                        (isSelected || isHovered) && colors.glow
                      )}
                      animate={
                        isSelected
                          ? { scale: [1, 1.3, 1] }
                          : isHovered
                          ? { scale: 1.2 }
                          : { scale: 1 }
                      }
                      transition={
                        isSelected
                          ? { duration: 1.5, repeat: Infinity }
                          : { duration: 0.2 }
                      }
                    />

                    {/* Label */}
                    <span
                      className={cn(
                        "text-xs font-medium whitespace-nowrap",
                        isSelected || isHovered
                          ? colors.text
                          : "text-text-secondary"
                      )}
                    >
                      {anomaly.shortName}
                    </span>
                  </motion.button>
                );
              })}

              {/* Title overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-xs text-text-muted">
                  Click any anomaly to explore • Connections show theoretical relationships
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Detail Panel */}
        <motion.div
          className="lg:col-span-2"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  variant="default"
                  className={cn(
                    "border",
                    colorVariants[selected.color as keyof typeof colorVariants].border,
                    "border-opacity-50"
                  )}
                >
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <Badge
                        variant={
                          selected.color as "cyan" | "gold" | "purple" | "orange" | "blue"
                        }
                      >
                        Anomaly
                      </Badge>
                      <button
                        onClick={() => setSelectedAnomaly(null)}
                        className="text-text-muted hover:text-text-primary"
                      >
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <h3
                      className={cn(
                        "text-h4 mb-4",
                        colorVariants[selected.color as keyof typeof colorVariants].text
                      )}
                    >
                      {selected.name}
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                          Observation
                        </h4>
                        <p className="text-sm text-text-secondary">
                          {selected.observation}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-xs font-semibold text-recursion-pink uppercase tracking-wider mb-2">
                            Expected
                          </h4>
                          <p className="text-xs text-text-muted">
                            {selected.expected}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-theory-green uppercase tracking-wider mb-2">
                            Actual
                          </h4>
                          <p className="text-xs text-text-muted">
                            {selected.actual}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                          Possible Explanations
                        </h4>
                        <ul className="space-y-1">
                          {selected.explanations.map((exp, i) => (
                            <li
                              key={i}
                              className="text-xs text-text-secondary flex items-start gap-2"
                            >
                              <span className="text-awareness-cyan mt-0.5">
                                {i + 1}.
                              </span>
                              {exp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <h4 className="text-xs font-semibold text-awareness-cyan uppercase tracking-wider mb-2">
                          Research Implication
                        </h4>
                        <p className="text-sm text-text-primary">
                          {selected.implication}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card variant="glass" className="h-full min-h-[400px] flex items-center justify-center">
                  <CardContent className="text-center">
                    <div className="text-4xl mb-4">✨</div>
                    <h3 className="text-h4 text-text-primary mb-2">
                      Select an Anomaly
                    </h3>
                    <p className="text-sm text-text-secondary max-w-xs">
                      Click on any star in the constellation to explore the
                      unexplained phenomenon and its research implications.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Quick Reference Cards */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {anomalies.map((anomaly) => {
          const colors = colorVariants[anomaly.color as keyof typeof colorVariants];
          return (
            <button
              key={anomaly.id}
              onClick={() => setSelectedAnomaly(anomaly.id)}
              className={cn(
                "text-left p-4 rounded-lg border transition-all duration-200",
                "bg-white/5 border-white/10",
                "hover:border-white/20 hover:bg-white/10",
                selectedAnomaly === anomaly.id && cn(colors.border, "border-opacity-50")
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={cn("w-3 h-3 rounded-full", colors.bg)} />
                <span className="text-sm font-medium text-text-primary">
                  {anomaly.shortName}
                </span>
              </div>
              <p className="text-xs text-text-muted line-clamp-2">
                {anomaly.observation.slice(0, 80)}...
              </p>
            </button>
          );
        })}
      </motion.div>
    </Section>
  );
}

export default Anomalies;
