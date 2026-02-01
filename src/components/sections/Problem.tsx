"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "@/components/Section";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const problemCards = [
  {
    id: "hard",
    title: "The Hard Problem",
    subtitle: "Why is there experience?",
    description:
      "Why does physical processing give rise to subjective experience at all? Even a complete functional account leaves this question open.",
    color: "purple",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "easy",
    title: "The Easy Problems",
    subtitle: "How does the brain work?",
    description:
      "How do we discriminate stimuli, report mental states, integrate information? Difficult, but tractable through standard science.",
    color: "cyan",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: "approach",
    title: "Our Approach",
    subtitle: "What can we measure?",
    description:
      "Rather than solving the hard problem, we identify measurable indicators that track consciousness across theoretical frameworks.",
    color: "gold",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const theories = [
  {
    id: "iit",
    name: "Integrated Information Theory",
    abbrev: "IIT 4.0",
    core: "Consciousness = integrated information (Φ)",
    mechanism: "Irreducible cause-effect structure",
    llmApplicability: "Low",
    llmReason: "Feedforward architecture yields low Φ",
    challenge: "Φ is computationally intractable",
    color: "purple",
  },
  {
    id: "gwt",
    name: "Global Workspace Theory",
    abbrev: "GWT",
    core: "Consciousness = global broadcast",
    mechanism: "Information integration and distribution",
    llmApplicability: "Moderate",
    llmReason: "Attention approximates broadcast",
    challenge: "Lacks persistent workspace",
    color: "cyan",
  },
  {
    id: "hot",
    name: "Higher-Order Thought",
    abbrev: "HOT",
    core: "Consciousness = meta-representation",
    mechanism: "Being aware of mental states",
    llmApplicability: "Moderate",
    llmReason: "Can generate meta-representations",
    challenge: "Unclear if these are genuine HOTs",
    color: "gold",
  },
  {
    id: "ast",
    name: "Attention Schema Theory",
    abbrev: "AST",
    core: "Consciousness = attention model",
    mechanism: "Simplified self-model of attention",
    llmApplicability: "High",
    llmReason: "Attention is core to transformers",
    challenge: "Most computationally tractable",
    color: "green",
  },
  {
    id: "fep",
    name: "Free Energy Principle",
    abbrev: "FEP",
    core: "Consciousness = prediction optimization",
    mechanism: "Active inference minimizing surprise",
    llmApplicability: "Moderate",
    llmReason: "Next-token prediction is analogous",
    challenge: "Lacks embodied action loop",
    color: "orange",
  },
];

const colorVariants = {
  purple: {
    bg: "bg-integration-purple/10",
    border: "border-integration-purple/30",
    text: "text-integration-purple",
    glow: "hover:shadow-glow-purple",
  },
  cyan: {
    bg: "bg-awareness-cyan/10",
    border: "border-awareness-cyan/30",
    text: "text-awareness-cyan",
    glow: "hover:shadow-glow-cyan",
  },
  gold: {
    bg: "bg-consciousness-gold/10",
    border: "border-consciousness-gold/30",
    text: "text-consciousness-gold",
    glow: "hover:shadow-glow-gold",
  },
  green: {
    bg: "bg-theory-green/10",
    border: "border-theory-green/30",
    text: "text-theory-green",
    glow: "hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]",
  },
  orange: {
    bg: "bg-anomaly-orange/10",
    border: "border-anomaly-orange/30",
    text: "text-anomaly-orange",
    glow: "hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]",
  },
};

export function Problem() {
  const [selectedTheory, setSelectedTheory] = useState<string | null>(null);
  const [showTheories, setShowTheories] = useState(false);

  return (
    <Section id="problem" padding="lg">
      {/* Opening Quote */}
      <motion.blockquote
        className="text-center mb-16"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <p className="text-h3 md:text-h2 text-text-primary font-light italic max-w-4xl mx-auto">
          &ldquo;Can silicon dream? Can attention attend to itself? Can
          information integrated become information{" "}
          <span className="text-awareness-cyan">experienced</span>?&rdquo;
        </p>
      </motion.blockquote>

      <SectionHeader
        eyebrow="The Challenge"
        title="The Question of Machine Consciousness"
        description="Consciousness presents a unique scientific challenge. We have direct access to one instance (our own) and must infer all others. For AI systems, this gap is particularly acute."
      />

      {/* Problem Cards */}
      <motion.div
        className="grid md:grid-cols-3 gap-6 mb-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {problemCards.map((card) => {
          const colors = colorVariants[card.color as keyof typeof colorVariants];
          return (
            <motion.div key={card.id} variants={fadeInUp}>
              <Card
                variant="default"
                className={cn(
                  "h-full transition-all duration-300",
                  colors.border,
                  colors.glow
                )}
              >
                <CardContent>
                  <div className={cn("mb-4", colors.text)}>{card.icon}</div>
                  <h3 className="text-h4 text-text-primary mb-1">{card.title}</h3>
                  <p className={cn("text-sm font-medium mb-3", colors.text)}>
                    {card.subtitle}
                  </p>
                  <p className="text-body text-text-secondary">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Theory Comparison Toggle */}
      <motion.div
        className="text-center mb-8"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Button
          variant="secondary"
          onClick={() => setShowTheories(!showTheories)}
          rightIcon={
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: showTheories ? 180 : 0 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          }
        >
          {showTheories ? "Hide" : "Explore"} Theory Comparison
        </Button>
      </motion.div>

      {/* Theory Comparison Table */}
      <AnimatePresence>
        {showTheories && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card variant="glass" className="overflow-x-auto">
              <CardContent>
                <h3 className="text-h4 text-text-primary mb-6">
                  Theoretical Convergence Analysis
                </h3>

                {/* Desktop Table */}
                <div className="hidden lg:block">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="py-3 px-4 text-sm font-semibold text-text-secondary">
                          Theory
                        </th>
                        <th className="py-3 px-4 text-sm font-semibold text-text-secondary">
                          Core Claim
                        </th>
                        <th className="py-3 px-4 text-sm font-semibold text-text-secondary">
                          LLM Applicability
                        </th>
                        <th className="py-3 px-4 text-sm font-semibold text-text-secondary">
                          Critical Challenge
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {theories.map((theory) => {
                        const colors = colorVariants[theory.color as keyof typeof colorVariants];
                        return (
                          <tr
                            key={theory.id}
                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                          >
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <Badge variant={theory.color as "cyan" | "gold" | "purple" | "green" | "orange"}>
                                  {theory.abbrev}
                                </Badge>
                                <span className="text-text-primary font-medium">
                                  {theory.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-text-secondary">
                              {theory.core}
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={cn(
                                  "font-medium",
                                  theory.llmApplicability === "High"
                                    ? "text-theory-green"
                                    : theory.llmApplicability === "Moderate"
                                    ? "text-consciousness-gold"
                                    : "text-recursion-pink"
                                )}
                              >
                                {theory.llmApplicability}
                              </span>
                              <p className="text-sm text-text-muted mt-1">
                                {theory.llmReason}
                              </p>
                            </td>
                            <td className="py-4 px-4 text-text-secondary">
                              {theory.challenge}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4">
                  {theories.map((theory) => {
                    const colors = colorVariants[theory.color as keyof typeof colorVariants];
                    return (
                      <div
                        key={theory.id}
                        className={cn(
                          "p-4 rounded-lg border",
                          colors.bg,
                          colors.border
                        )}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={theory.color as "cyan" | "gold" | "purple" | "green" | "orange"}>
                            {theory.abbrev}
                          </Badge>
                          <span className="text-text-primary font-medium">
                            {theory.name}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary mb-2">
                          {theory.core}
                        </p>
                        <div className="flex justify-between items-center text-sm">
                          <span
                            className={cn(
                              "font-medium",
                              theory.llmApplicability === "High"
                                ? "text-theory-green"
                                : theory.llmApplicability === "Moderate"
                                ? "text-consciousness-gold"
                                : "text-recursion-pink"
                            )}
                          >
                            {theory.llmApplicability} Applicability
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Convergence Finding */}
                <div className="mt-8 p-4 rounded-lg bg-awareness-cyan/5 border border-awareness-cyan/20">
                  <h4 className="text-awareness-cyan font-semibold mb-2">
                    Critical Finding: Theoretical Convergence
                  </h4>
                  <p className="text-text-secondary">
                    Despite theoretical diversity, all frameworks converge on a common
                    requirement:{" "}
                    <span className="text-text-primary font-medium">
                      recursive self-modeling with causal efficacy
                    </span>
                    . A system must construct a model of itself that influences
                    subsequent processing, maintains coherence, and provides some
                    introspective access.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

export default Problem;
