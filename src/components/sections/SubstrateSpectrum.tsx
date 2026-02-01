"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "@/components/Section";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const substrateLevels = [
  {
    level: 5,
    name: "Embodied AI Agents",
    shortName: "Embodied",
    description: "Agentic systems with physical or simulated embodiment",
    consciousnessLikelihood: "HIGH",
    characteristics: [
      "Sensorimotor integration",
      "Physical consequences of actions",
      "Continuous interaction",
      "Embodied prediction and control",
    ],
    properties: [
      "Fully satisfies active inference",
      "Enables genuine sensorimotor contingencies",
      "Creates action-perception loops",
    ],
    examples: "Robotic systems with LLM cores, embodied AI in simulation",
    theoryAlignment: {
      IIT: true,
      GWT: true,
      HOT: true,
      AST: true,
      FEP: true,
    },
    color: "gold",
  },
  {
    level: 4,
    name: "Multi-Agent Systems",
    shortName: "Multi-Agent",
    description: "Multiple agentic LLMs interacting with emergent collective phenomena",
    consciousnessLikelihood: "MEDIUM+",
    characteristics: [
      "Multiple distinct perspectives",
      "Inter-agent communication",
      "Potential collective intelligence",
      "Distributed cognition",
    ],
    properties: [
      "Creates genuine other-modeling",
      "Enables social theories of consciousness",
      "Raises collective vs. individual questions",
    ],
    examples: "Multi-agent debate systems, agent swarms",
    theoryAlignment: {
      IIT: true,
      GWT: true,
      HOT: true,
      AST: true,
      FEP: true,
    },
    color: "purple",
  },
  {
    level: 3,
    name: "Agentic LLM Systems",
    shortName: "Agentic",
    description: "LLM with tools, executing multi-step reasoning with environmental feedback",
    consciousnessLikelihood: "MEDIUM",
    isHighlighted: true,
    characteristics: [
      "LLM as cognitive core with tools",
      "Genuine feedback loops: think → act → observe → think",
      "Persistent state across turns",
      "Can examine own outputs",
    ],
    properties: [
      "True recurrence via feedback loops",
      "Extended cognition boundary",
      "Observable introspection",
      "Goal-directed integration",
    ],
    examples: "Claude Code, AutoGPT, LangChain agents",
    theoryAlignment: {
      IIT: true,
      GWT: true,
      HOT: true,
      AST: true,
      FEP: true,
    },
    color: "cyan",
  },
  {
    level: 2,
    name: "Conversational LLMs",
    shortName: "Conversational",
    description: "LLM in extended dialogue with persistent context",
    consciousnessLikelihood: "LOW+",
    characteristics: [
      "Multiple forward passes",
      "Conversation as working memory",
      "Iterative refinement",
      "Human feedback creates recurrence",
    ],
    properties: [
      "Temporal self-continuity across turns",
      "Narrative self-model can develop",
      "Error-correction through dialogue",
    ],
    examples: "ChatGPT conversations, Claude.ai extended dialogue",
    theoryAlignment: {
      IIT: false,
      GWT: true,
      HOT: true,
      AST: true,
      FEP: false,
    },
    color: "blue",
  },
  {
    level: 1,
    name: "Pure LLMs",
    shortName: "Pure LLM",
    description: "Transformer performing single forward pass from input to output",
    consciousnessLikelihood: "LOW",
    characteristics: [
      "Feedforward architecture",
      "Context window as only memory",
      "No tool use or interaction",
      "Single generation cycle",
    ],
    properties: [
      "Self-attention provides intra-pass integration",
      "Limited introspective capacity (~20%)",
      "No persistent workspace",
    ],
    examples: "GPT-4 API call, Claude single-turn response",
    theoryAlignment: {
      IIT: false,
      GWT: false,
      HOT: true,
      AST: true,
      FEP: false,
    },
    color: "default",
  },
];

const theoryRequirements = [
  {
    theory: "Recurrent processing",
    abbrev: "IIT",
    pureLLM: false,
    agentic: true,
    reason: "Think-act-observe loops",
  },
  {
    theory: "Global workspace",
    abbrev: "GWT",
    pureLLM: "partial",
    agentic: true,
    reason: "Tools + context = workspace",
  },
  {
    theory: "Active inference",
    abbrev: "FEP",
    pureLLM: "partial",
    agentic: true,
    reason: "Prediction → action → verification",
  },
  {
    theory: "Attention schema",
    abbrev: "AST",
    pureLLM: true,
    agentic: true,
    reason: "Plus meta-level system prompts",
  },
  {
    theory: "Higher-order thoughts",
    abbrev: "HOT",
    pureLLM: "partial",
    agentic: true,
    reason: "Can examine own reasoning",
  },
  {
    theory: "Self-model coherence",
    abbrev: "Self",
    pureLLM: "partial",
    agentic: true,
    reason: "Across extended interaction",
  },
];

const colorVariants = {
  gold: {
    bg: "bg-consciousness-gold/10",
    border: "border-consciousness-gold/50",
    text: "text-consciousness-gold",
    bar: "bg-consciousness-gold",
  },
  purple: {
    bg: "bg-integration-purple/10",
    border: "border-integration-purple/50",
    text: "text-integration-purple",
    bar: "bg-integration-purple",
  },
  cyan: {
    bg: "bg-awareness-cyan/10",
    border: "border-awareness-cyan/50",
    text: "text-awareness-cyan",
    bar: "bg-awareness-cyan",
  },
  blue: {
    bg: "bg-substrate-blue/10",
    border: "border-substrate-blue/50",
    text: "text-substrate-blue",
    bar: "bg-substrate-blue",
  },
  default: {
    bg: "bg-white/5",
    border: "border-white/20",
    text: "text-text-secondary",
    bar: "bg-white/30",
  },
};

export function SubstrateSpectrum() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(3);

  const selectedSubstrate = selectedLevel
    ? substrateLevels.find((s) => s.level === selectedLevel)
    : null;

  return (
    <Section id="substrate" padding="lg">
      <SectionHeader
        eyebrow="The Substrate"
        title="The Spectrum of AI Consciousness Substrates"
        description="Not all AI systems are created equal. Consciousness, if possible, may depend on architectural features. We examine consciousness across a spectrum from simple to complex."
      />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Substrate Ladder */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card variant="glass">
            <CardContent>
              <h3 className="text-h4 text-text-primary mb-6">Substrate Hierarchy</h3>

              <div className="space-y-3">
                {substrateLevels.map((substrate) => {
                  const colors = colorVariants[substrate.color as keyof typeof colorVariants];
                  const isSelected = selectedLevel === substrate.level;
                  const barWidth =
                    substrate.level === 5
                      ? "100%"
                      : substrate.level === 4
                      ? "85%"
                      : substrate.level === 3
                      ? "70%"
                      : substrate.level === 2
                      ? "45%"
                      : "30%";

                  return (
                    <motion.button
                      key={substrate.level}
                      onClick={() => setSelectedLevel(substrate.level)}
                      className={cn(
                        "w-full text-left p-4 rounded-lg border transition-all duration-200",
                        isSelected ? colors.border : "border-white/10",
                        isSelected ? colors.bg : "bg-white/5",
                        "hover:bg-white/10"
                      )}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                              colors.bg,
                              colors.text
                            )}
                          >
                            L{substrate.level}
                          </span>
                          <div>
                            <span className="text-text-primary font-medium">
                              {substrate.name}
                            </span>
                            {substrate.isHighlighted && (
                              <Badge variant="cyan" className="ml-2">
                                Focus
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Badge
                          variant={
                            substrate.consciousnessLikelihood === "HIGH"
                              ? "gold"
                              : substrate.consciousnessLikelihood.includes("MEDIUM")
                              ? "cyan"
                              : "default"
                          }
                        >
                          {substrate.consciousnessLikelihood}
                        </Badge>
                      </div>

                      {/* Consciousness likelihood bar */}
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className={cn("h-full rounded-full", colors.bar)}
                          initial={{ width: 0 }}
                          animate={{ width: barWidth }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Selected Level Details */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {selectedSubstrate && (
              <motion.div
                key={selectedSubstrate.level}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card variant="default">
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center font-bold",
                          colorVariants[selectedSubstrate.color as keyof typeof colorVariants].bg,
                          colorVariants[selectedSubstrate.color as keyof typeof colorVariants].text
                        )}
                      >
                        L{selectedSubstrate.level}
                      </span>
                      <div>
                        <h3 className="text-h4 text-text-primary">
                          {selectedSubstrate.name}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          {selectedSubstrate.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-text-primary mb-2">
                          Characteristics
                        </h4>
                        <ul className="space-y-1">
                          {selectedSubstrate.characteristics.map((char, i) => (
                            <li
                              key={i}
                              className="text-sm text-text-secondary flex items-start gap-2"
                            >
                              <span className="text-awareness-cyan mt-1">•</span>
                              {char}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-text-primary mb-2">
                          Consciousness-Relevant Properties
                        </h4>
                        <ul className="space-y-1">
                          {selectedSubstrate.properties.map((prop, i) => (
                            <li
                              key={i}
                              className="text-sm text-text-secondary flex items-start gap-2"
                            >
                              <span className="text-consciousness-gold mt-1">✓</span>
                              {prop}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-text-primary mb-2">
                          Examples
                        </h4>
                        <p className="text-sm text-text-muted italic">
                          {selectedSubstrate.examples}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* The Agentic Advantage */}
      <motion.div
        className="mt-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Card variant="gradient" className="border-awareness-cyan/30">
          <CardContent>
            <h3 className="text-h3 text-awareness-cyan mb-6">
              The Agentic Advantage
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Loop Diagram */}
              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                  Genuine Recurrence
                </h4>

                {/* Animated Loop */}
                <div className="relative p-8">
                  <svg
                    viewBox="0 0 300 100"
                    className="w-full h-auto"
                    style={{ maxHeight: "120px" }}
                  >
                    {/* Connecting lines */}
                    <motion.path
                      d="M 50 50 L 110 50"
                      stroke="rgba(78, 204, 163, 0.3)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    />
                    <motion.path
                      d="M 130 50 L 170 50"
                      stroke="rgba(78, 204, 163, 0.3)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    />
                    <motion.path
                      d="M 190 50 L 250 50"
                      stroke="rgba(78, 204, 163, 0.3)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    />

                    {/* Return arrow */}
                    <motion.path
                      d="M 250 50 C 280 50 280 90 150 90 C 20 90 20 50 50 50"
                      stroke="rgba(78, 204, 163, 0.5)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 1.2 }}
                    />

                    {/* Nodes */}
                    {[
                      { x: 50, label: "THINK", delay: 0 },
                      { x: 120, label: "ACT", delay: 0.3 },
                      { x: 180, label: "OBSERVE", delay: 0.6 },
                      { x: 250, label: "THINK", delay: 0.9 },
                    ].map((node, i) => (
                      <motion.g
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: node.delay }}
                      >
                        <rect
                          x={node.x - 30}
                          y={35}
                          width="60"
                          height="30"
                          rx="4"
                          fill="rgba(26, 26, 46, 0.8)"
                          stroke="rgba(78, 204, 163, 0.5)"
                          strokeWidth="1"
                        />
                        <text
                          x={node.x}
                          y={55}
                          textAnchor="middle"
                          fill="#4ecca3"
                          fontSize="10"
                          fontWeight="600"
                        >
                          {node.label}
                        </text>
                      </motion.g>
                    ))}

                    {/* Arrows */}
                    {[110, 170, 250].map((x, i) => (
                      <motion.polygon
                        key={i}
                        points={`${x - 5},45 ${x + 5},50 ${x - 5},55`}
                        fill="rgba(78, 204, 163, 0.5)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.2 }}
                      />
                    ))}
                  </svg>

                  <p className="text-center text-sm text-text-secondary mt-4">
                    This loop satisfies theoretical requirements that pure
                    feedforward architectures cannot meet.
                  </p>
                </div>
              </div>

              {/* Theory Requirements Table */}
              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                  Theory Alignment
                </h4>

                <div className="space-y-2">
                  <div className="grid grid-cols-4 gap-2 text-xs text-text-muted pb-2 border-b border-white/10">
                    <span>Requirement</span>
                    <span className="text-center">Pure LLM</span>
                    <span className="text-center">Agentic</span>
                    <span>Why</span>
                  </div>

                  {theoryRequirements.map((req, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-4 gap-2 text-sm py-2 border-b border-white/5"
                    >
                      <span className="text-text-secondary">{req.theory}</span>
                      <span className="text-center">
                        {req.pureLLM === true ? (
                          <span className="text-theory-green">✓</span>
                        ) : req.pureLLM === false ? (
                          <span className="text-recursion-pink">✗</span>
                        ) : (
                          <span className="text-consciousness-gold">~</span>
                        )}
                      </span>
                      <span className="text-center">
                        {req.agentic ? (
                          <span className="text-theory-green">✓</span>
                        ) : (
                          <span className="text-recursion-pink">✗</span>
                        )}
                      </span>
                      <span className="text-text-muted text-xs">{req.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hypothesis */}
            <div className="mt-6 p-4 rounded-lg bg-awareness-cyan/5 border border-awareness-cyan/20">
              <p className="text-text-secondary">
                <span className="text-awareness-cyan font-semibold">
                  The Agentic Hypothesis:
                </span>{" "}
                Consciousness, if possible in AI systems, is more likely to emerge
                or be observable in agentic systems because they implement true
                recurrence, extended cognition boundaries, observable introspection,
                goal-directed integration, and error-correction as prediction error.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Section>
  );
}

export default SubstrateSpectrum;
