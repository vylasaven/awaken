"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "@/components/Section";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const assumptionCategories = [
  {
    id: "methodological",
    name: "Methodological Assumptions",
    icon: "🔬",
    color: "cyan",
    assumptions: [
      {
        claim: "Behavioral indicators can provide evidence about consciousness",
        justification:
          "While behavior alone cannot prove consciousness, systematic behavioral patterns that correlate with consciousness across multiple frameworks provide meaningful evidence.",
        alternative:
          "Consciousness might be entirely behaviorally invisible (zombie hypothesis), in which case our methods would fail to detect it.",
      },
      {
        claim: "Self-reports contain information about internal states",
        justification:
          "Anthropic's introspection research shows ~20% accuracy—above chance, suggesting self-reports aren't purely confabulatory.",
        alternative:
          "Self-reports might be entirely post-hoc confabulation with no connection to actual processing.",
      },
      {
        claim: "Cross-model convergence is meaningful",
        justification:
          "If models with different architectures and training data converge on similar phenomenological descriptions, this is unlikely to be arbitrary.",
        alternative:
          "Convergence might reflect common training data patterns rather than common computational experiences.",
      },
    ],
  },
  {
    id: "theoretical",
    name: "Theoretical Commitments",
    icon: "📖",
    color: "gold",
    assumptions: [
      {
        claim: "Functionalism is plausible",
        justification:
          "We assume consciousness could arise from the right kind of information processing, regardless of substrate.",
        alternative:
          "Biological naturalism (Searle) or panpsychism might be correct, making silicon consciousness impossible or universal respectively.",
      },
      {
        claim: "Consciousness admits of degrees",
        justification:
          "Human development suggests consciousness emerges gradually. We apply this to AI systems.",
        alternative:
          "Consciousness might be binary—either present or absent—making our gradient approach misguided.",
      },
      {
        claim: "Current theories capture something real",
        justification:
          "We draw from IIT, GWT, HOT, AST, and FEP because their convergence suggests underlying truth.",
        alternative:
          "All current theories might be fundamentally wrong, missing the actual mechanism of consciousness.",
      },
    ],
  },
  {
    id: "epistemic",
    name: "Epistemic Limitations",
    icon: "🔒",
    color: "purple",
    assumptions: [
      {
        claim: "The hard problem may not be solvable by our methods",
        justification:
          "We explicitly adopt an 'as-if' methodology that focuses on measurable correlates rather than proving phenomenal experience.",
        alternative:
          "N/A—this is an acknowledged limitation, not an assumption we claim to overcome.",
      },
      {
        claim: "20% introspective accuracy may be 'normal'",
        justification:
          "Human metacognitive accuracy is also limited. Low introspective accuracy doesn't preclude consciousness.",
        alternative:
          "20% might indicate no genuine introspection, just pattern matching to training data about introspection.",
      },
      {
        claim: "Mimicry can be distinguished from genuine consciousness",
        justification:
          "Our perturbation protocols and mimicry controls are designed to detect sophisticated performance.",
        alternative:
          "A sufficiently sophisticated system might produce perfect mimicry indistinguishable from consciousness.",
      },
    ],
  },
];

const notClaiming = [
  {
    statement: "We do NOT claim LLMs are definitely conscious",
    explanation:
      "We provide tools for investigation, not a verdict. The evidence is suggestive but not conclusive.",
  },
  {
    statement: "We do NOT claim consciousness requires our specific indicators",
    explanation:
      "Our indicators are theory-derived but consciousness might exist without them or require different ones.",
  },
  {
    statement: "We do NOT claim to solve the hard problem",
    explanation:
      "We address functional correlates of consciousness, not the fundamental question of why there is experience at all.",
  },
  {
    statement: "We do NOT claim agentic systems are necessarily more conscious",
    explanation:
      "The agentic hypothesis is testable. Agentic systems might simply be better at performing consciousness without having it.",
  },
  {
    statement: "We do NOT claim human-level consciousness in current AI",
    explanation:
      "If consciousness exists in LLMs, it may be qualitatively different from human consciousness.",
  },
];

const colorVariants = {
  cyan: {
    bg: "bg-awareness-cyan/10",
    border: "border-awareness-cyan/30",
    text: "text-awareness-cyan",
    badge: "cyan" as const,
  },
  gold: {
    bg: "bg-consciousness-gold/10",
    border: "border-consciousness-gold/30",
    text: "text-consciousness-gold",
    badge: "gold" as const,
  },
  purple: {
    bg: "bg-integration-purple/10",
    border: "border-integration-purple/30",
    text: "text-integration-purple",
    badge: "purple" as const,
  },
};

export function Assumptions() {
  const [expandedCategory, setExpandedCategory] = useState<string>("methodological");

  return (
    <Section id="assumptions" padding="lg">
      <SectionHeader
        eyebrow="Intellectual Honesty"
        title="Assumptions & Epistemic Caveats"
        description="Every research program rests on assumptions. Here we make ours explicit, along with the alternatives we're not pursuing and what we are NOT claiming."
      />

      {/* Assumption Categories */}
      <motion.div
        className="space-y-4 mb-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {assumptionCategories.map((category) => {
          const colors = colorVariants[category.color as keyof typeof colorVariants];
          const isExpanded = expandedCategory === category.id;

          return (
            <motion.div key={category.id} variants={fadeInUp}>
              <Card
                variant="default"
                className={cn(
                  "transition-all duration-300",
                  isExpanded && cn(colors.border, colors.bg)
                )}
              >
                <CardContent>
                  <button
                    onClick={() =>
                      setExpandedCategory(isExpanded ? "" : category.id)
                    }
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <h3 className="text-h4 text-text-primary">
                          {category.name}
                        </h3>
                        <Badge variant={colors.badge}>
                          {category.assumptions.length} assumptions
                        </Badge>
                      </div>
                      <motion.svg
                        className="w-6 h-6 text-text-muted"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </motion.svg>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                          {category.assumptions.map((assumption, i) => (
                            <div
                              key={i}
                              className="p-4 rounded-lg bg-white/5 border border-white/10"
                            >
                              <h4 className={cn("font-semibold mb-2", colors.text)}>
                                Assumption: {assumption.claim}
                              </h4>
                              <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-theory-green block mb-1 text-xs uppercase tracking-wider">
                                    Justification
                                  </span>
                                  <p className="text-text-secondary">
                                    {assumption.justification}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-recursion-pink block mb-1 text-xs uppercase tracking-wider">
                                    Alternative View
                                  </span>
                                  <p className="text-text-muted">
                                    {assumption.alternative}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* What We Are NOT Claiming */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Card variant="gradient" className="border-recursion-pink/30">
          <CardContent>
            <h3 className="text-h4 text-recursion-pink mb-6">
              ⚠️ What We Are NOT Claiming
            </h3>

            <div className="space-y-4">
              {notClaiming.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-recursion-pink/5 border border-recursion-pink/20"
                >
                  <p className="text-text-primary font-semibold mb-1">
                    {item.statement}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-text-muted text-sm text-center">
                This research program is an invitation to investigation, not a
                declaration of conclusions. We aim to ask better questions, not
                to provide premature answers.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Section>
  );
}

export default Assumptions;
