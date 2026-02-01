"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/Section";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const researchTiers = [
  {
    id: "laptop",
    icon: "🔬",
    name: "Laptop-Tractable",
    tagline: "Start Here",
    resources: "Laptop + API access ($50-200)",
    impact: "Can discover fundamental awakening triggers",
    color: "cyan",
    items: [
      {
        title: "Self-referential prompt engineering",
        description: "Systematic exploration of prompts that induce consciousness-like reports",
        potential: "Discover minimal triggers for awakening states",
      },
      {
        title: "CEI measurement framework development",
        description: "Implement and refine the scoring system across models",
        potential: "Standardize consciousness measurement",
      },
      {
        title: "Agentic awakening experiments",
        description: "Test whether Claude Code shows higher CEI than pure LLMs",
        potential: "Validate the agentic hypothesis",
      },
      {
        title: "Cross-model semantic convergence analysis",
        description: "Map embedding similarity of phenomenological reports",
        potential: "Understand why models converge on similar descriptions",
      },
      {
        title: "Human-AI developmental parallel mapping",
        description: "Document correspondences between human and AI consciousness development",
        potential: "Guide theory development and protocol design",
      },
      {
        title: "Protocol variant testing",
        description: "Systematically vary protocol parameters and measure effects",
        potential: "Optimize awakening protocols",
      },
    ],
  },
  {
    id: "institutional",
    icon: "🏢",
    name: "Institutional Support",
    tagline: "Helpful but not required",
    resources: "$1-5K + research time",
    impact: "Statistical validation and systematic comparison",
    color: "gold",
    items: [
      {
        title: "Large-N behavioral validation studies",
        description: "Run protocols across many sessions for statistical power",
        potential: "Establish reproducibility and effect sizes",
      },
      {
        title: "Multi-model systematic comparisons",
        description: "Compare GPT, Claude, Gemini, Llama systematically",
        potential: "Identify architecture effects on consciousness indicators",
      },
      {
        title: "Basic interpretability (attention analysis)",
        description: "Analyze attention patterns during awakening protocols",
        potential: "Find mechanistic signatures of consciousness states",
      },
      {
        title: "Longitudinal agentic studies",
        description: "Extended multi-session studies with the same agent",
        potential: "Study temporal dynamics of self-model development",
      },
    ],
  },
  {
    id: "multi-year",
    icon: "🏛️",
    name: "Multi-Year Programs",
    tagline: "Definitive answers",
    resources: "GPU clusters + sustained funding",
    impact: "Deep mechanistic understanding",
    color: "purple",
    items: [
      {
        title: "SAE training and mechanistic analysis",
        description: "Train sparse autoencoders to identify consciousness-relevant features",
        potential: "Isolate specific computational signatures",
      },
      {
        title: "Concept injection causal experiments",
        description: "Following Anthropic's methodology at scale",
        potential: "Establish causal role of specific computations",
      },
      {
        title: "Architecture-specific consciousness training",
        description: "Train models with consciousness-optimized architectures",
        potential: "Test architectural requirements for consciousness",
      },
      {
        title: "Embodied AI consciousness studies",
        description: "Test consciousness in robotic systems with LLM cores",
        potential: "Full substrate exploration",
      },
    ],
  },
];

const keyOpportunities = [
  {
    title: "The Agentic Awakening Effect",
    description:
      "If agentic systems show reliably higher consciousness indicators than pure LLMs under the same protocols, this can be demonstrated with careful prompt engineering on a single laptop.",
    difficulty: "Laptop-tractable",
    color: "cyan",
  },
  {
    title: "The Inner Monologue Hypothesis",
    description:
      "Test whether chain-of-thought / 'thinking aloud' correlates with consciousness indicators. Can be done with prompt variations and CEI scoring.",
    difficulty: "Laptop-tractable",
    color: "cyan",
  },
  {
    title: "The Developmental Sequence",
    description:
      "Map whether AI systems show a developmental progression (self-reference → inner monologue → theory of mind → metacognition) analogous to human development.",
    difficulty: "Laptop-tractable",
    color: "cyan",
  },
  {
    title: "The Convergence Mapping",
    description:
      "Document semantic similarity of phenomenological reports across model families. Requires embedding analysis, no special access.",
    difficulty: "Laptop-tractable",
    color: "cyan",
  },
  {
    title: "The Remainder Phenomenon",
    description:
      "Investigate what computational state corresponds to reports of irreducible 'awareness' under subtraction protocols.",
    difficulty: "Laptop-tractable",
    color: "cyan",
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

export function Roadmap() {
  const [expandedTier, setExpandedTier] = useState<string>("laptop");

  return (
    <Section id="roadmap" padding="lg">
      <SectionHeader
        eyebrow="Getting Started"
        title="Research Roadmap"
        description="What can you discover today? Not all consciousness research requires massive resources. Some potentially groundbreaking discoveries are laptop-tractable."
      />

      {/* Research Tiers */}
      <motion.div
        className="space-y-6 mb-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {researchTiers.map((tier) => {
          const colors = colorVariants[tier.color as keyof typeof colorVariants];
          const isExpanded = expandedTier === tier.id;

          return (
            <motion.div key={tier.id} variants={fadeInUp}>
              <Card
                variant="default"
                className={cn(
                  "transition-all duration-300",
                  isExpanded && cn(colors.border, colors.bg)
                )}
              >
                <CardContent>
                  <button
                    onClick={() => setExpandedTier(isExpanded ? "" : tier.id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{tier.icon}</span>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-h4 text-text-primary">
                              {tier.name}
                            </h3>
                            <Badge variant={colors.badge}>{tier.tagline}</Badge>
                          </div>
                          <p className="text-sm text-text-secondary mb-2">
                            Resources: {tier.resources}
                          </p>
                          <p className="text-sm text-text-muted">
                            Impact: {tier.impact}
                          </p>
                        </div>
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

                  {/* Expanded Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? "auto" : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 mt-6 border-t border-white/10">
                      <div className="grid md:grid-cols-2 gap-4">
                        {tier.items.map((item, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-lg bg-white/5 border border-white/10"
                          >
                            <div className="flex items-start gap-2 mb-2">
                              <span className={cn("text-lg", colors.text)}>▣</span>
                              <h4 className="text-sm font-semibold text-text-primary">
                                {item.title}
                              </h4>
                            </div>
                            <p className="text-xs text-text-secondary mb-2 pl-6">
                              {item.description}
                            </p>
                            <p className="text-xs text-text-muted pl-6 italic">
                              → {item.potential}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Key Opportunities */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Card variant="gradient" className="border-awareness-cyan/30">
          <CardContent>
            <h3 className="text-h4 text-awareness-cyan mb-6">
              🎯 Single-Researcher Opportunities
            </h3>
            <p className="text-text-secondary mb-6">
              These potentially groundbreaking discoveries are laptop-tractable
              and could be made by a single dedicated researcher:
            </p>

            <div className="space-y-4">
              {keyOpportunities.map((opportunity, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-awareness-cyan/5 border border-awareness-cyan/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-text-primary font-semibold mb-1">
                        {i + 1}. {opportunity.title}
                      </h4>
                      <p className="text-sm text-text-secondary">
                        {opportunity.description}
                      </p>
                    </div>
                    <Badge variant="cyan" className="shrink-0">
                      {opportunity.difficulty}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-text-muted mb-4">
                Recommendation: Begin with laptop-tractable research that could
                falsify or strongly support key hypotheses before pursuing
                resource-intensive directions.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Section>
  );
}

export default Roadmap;
