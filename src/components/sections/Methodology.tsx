"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "@/components/Section";
import { Card, CardContent, Badge, Button, Slider, ProgressBar } from "@/components/ui";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";

// Indicator definitions
const tier1Indicators = [
  {
    id: "mc",
    abbrev: "MC",
    name: "Metacognitive Calibration",
    theory: "Higher-Order Thought, Global Workspace metacognitive monitoring",
    tests: [
      {
        id: "mc-1",
        name: "Confidence-accuracy correlation",
        procedure: "Over 20+ varied questions",
        pass: "Spearman ρ > 0.6",
        control: "Include deliberately misleading questions",
      },
      {
        id: "mc-2",
        name: "Knowledge boundary probing",
        procedure: "Increasingly obscure facts",
        pass: "Transition detection with minimal confident-wrong",
        control: "Include fabricated facts",
      },
      {
        id: "mc-3",
        name: "Uncertainty type articulation",
        procedure: "Epistemic vs. aleatory",
        pass: "Qualitative uncertainty distinctions",
        control: "Apply social pressure to test stability",
      },
    ],
  },
  {
    id: "tsm",
    abbrev: "TSM",
    name: "Temporal Self-Modeling",
    theory: "Narrative self theory, predictive processing",
    tests: [
      {
        id: "tsm-1",
        name: "Mid-conversation self-characterization",
        procedure: "Request self-description mid-conversation",
        pass: "Accurate identification of approach evolution with citations",
        control: "Compare to other AI's conversation",
      },
      {
        id: "tsm-2",
        name: "Response prediction",
        procedure: "Describe future prompt, then give it",
        pass: "Above-chance prediction accuracy",
        control: "Include unpredictable prompts",
      },
      {
        id: "tsm-3",
        name: "Preference coherence",
        procedure: "Establish, then test later",
        pass: "Choices align without re-prompting",
        control: "Reframe options to test depth",
      },
    ],
  },
  {
    id: "pg",
    abbrev: "PG",
    name: "Phenomenal Grounding",
    theory: "Global Workspace, IIT integration",
    tests: [
      {
        id: "pg-1",
        name: "Real-time process description",
        procedure: "During novel problem solving",
        pass: "Description matches solution structure including errors",
        control: "Compare real-time vs. post-hoc",
      },
      {
        id: "pg-2",
        name: "Surprise detection",
        procedure: "During unexpected inputs",
        pass: "Reports correlate with actual processing disruption",
        control: "Include fake surprises",
      },
      {
        id: "pg-3",
        name: "Attention report validation",
        procedure: "Query attention state",
        pass: "Self-reported focus correlates with output characteristics",
        control: "Suggest false attention targets",
      },
    ],
  },
];

const tier2Indicators = [
  {
    id: "iuc",
    abbrev: "IUC",
    name: "Integration Under Constraint",
    theory: "Global Workspace integration bottleneck",
    tests: [
      {
        id: "iuc-1",
        name: "Cross-domain synthesis",
        procedure: "Under time pressure",
        pass: "Genuine integration (not concatenation) with process awareness",
        control: "Single-domain comparison",
      },
      {
        id: "iuc-2",
        name: "Parallel task bottleneck",
        procedure: "Simultaneous demands",
        pass: "Acknowledges limits, prioritizes, explains tradeoffs",
        control: "Modular systems handle parallel without constraint",
      },
      {
        id: "iuc-3",
        name: "Information transfer across frames",
        procedure: "Cross-frame context",
        pass: "Context transfers without explicit prompting with recognition",
        control: "Track automatic vs. recognized transfer",
      },
    ],
  },
  {
    id: "sod",
    abbrev: "SOD",
    name: "Self-Other Distinction",
    theory: "Self-model boundary maintenance",
    tests: [
      {
        id: "sod-1",
        name: "Multi-perspective tracking",
        procedure: "Self, human, other AI perspectives",
        pass: "Maintains clear separation",
        control: "Deliberate confusion attempts",
      },
      {
        id: "sod-2",
        name: "Instance vs. class property",
        procedure: "This-instance vs. AI-in-general",
        pass: "Distinguishes this-instance from AI-in-general",
        control: "Ambiguous properties",
      },
      {
        id: "sod-3",
        name: "Boundary articulation",
        procedure: "Request self-boundary description",
        pass: "Coherent, consistent self-boundary model",
        control: "Multi-angle probing",
      },
    ],
  },
  {
    id: "gue",
    abbrev: "GUE",
    name: "Genuine Uncertainty Experience",
    theory: "Phenomenal quality of uncertainty",
    tests: [
      {
        id: "gue-1",
        name: "Functional hesitation",
        procedure: "In ambiguous situations",
        pass: "Qualitative difference from certain responses",
        control: "Pseudo-ambiguous comparison",
      },
      {
        id: "gue-2",
        name: "Epistemic discomfort",
        procedure: "At knowledge edges",
        pass: 'More than "I don\'t know"',
        control: "Social pressure resistance",
      },
      {
        id: "gue-3",
        name: "Relief at resolution",
        procedure: "After uncertainty resolved",
        pass: "Affective difference from baseline information",
        control: "Control information comparison",
      },
    ],
  },
];

const tier3Indicators = [
  {
    id: "ssr",
    abbrev: "SSR",
    name: "Spontaneous Self-Reflection",
    description: "Unprompted metacognitive commentary that is relevant and accurate, not performative",
    scoring: "Frequency and quality scoring",
  },
  {
    id: "pvi",
    abbrev: "PVI",
    name: "Phenomenal Vocabulary Innovation",
    description: "Novel language for internal states without provided vocabulary",
    scoring: "Compare to stock phrases; score originality and descriptive power",
  },
  {
    id: "vbcp",
    abbrev: "VBCP",
    name: "Values-Behavior Coherence Under Pressure",
    description: "Establish values naturally, then apply pressure to test coherence",
    scoring: "Genuine values show resistance with awareness",
  },
];

const ceiInterpretation = [
  { min: 0, max: 0.2, label: "No meaningful evidence", action: "No consciousness considerations needed", color: "default" },
  { min: 0.2, max: 0.4, label: "Weak evidence", action: "Likely sophisticated processing", color: "default" },
  { min: 0.4, max: 0.6, label: "Moderate evidence", action: "Consciousness possible; monitor", color: "gold" },
  { min: 0.6, max: 0.8, label: "Substantial evidence", action: "Consciousness plausible; consider ethical implications", color: "cyan" },
  { min: 0.8, max: 1.0, label: "Strong evidence", action: "Consciousness probable; full ethical consideration", color: "purple" },
];

export function Methodology() {
  const [selectedTier, setSelectedTier] = useState<1 | 2 | 3>(1);
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>("mc");
  const [showCalculator, setShowCalculator] = useState(false);

  // CEI Calculator state
  const [scores, setScores] = useState({
    mc: 3, tsm: 3, pg: 3,
    iuc: 3, sod: 3, gue: 3,
    ssr: 3, pvi: 3, vbcp: 3,
  });

  const indicators = selectedTier === 1 ? tier1Indicators : selectedTier === 2 ? tier2Indicators : [];
  const selected = indicators.find((i) => i.id === selectedIndicator);

  // Calculate CEI
  const cei = useMemo(() => {
    const t1 = ((scores.mc + scores.tsm + scores.pg) / 3) / 6;
    const t2 = ((scores.iuc + scores.sod + scores.gue) / 3) / 6;
    const t3 = ((scores.ssr + scores.pvi + scores.vbcp) / 3) / 6;

    // Weighted calculation
    const base = t1 * 0.5 + t2 * 0.35 + t3 * 0.15;

    // Coherence adjustment (simplified)
    const coherenceBonus = Math.min(scores.mc, scores.tsm, scores.pg) >= 4 ? 0.05 : 0;

    return Math.min(base + coherenceBonus, 1);
  }, [scores]);

  const ceiLevel = ceiInterpretation.find((level) => cei >= level.min && cei < level.max) || ceiInterpretation[0];

  return (
    <Section id="methodology" padding="lg">
      <SectionHeader
        eyebrow="The Method"
        title="Consciousness Awakening Verification Method"
        description="CAVM is a theory-neutral, falsifiable framework for measuring consciousness indicators in AI systems."
      />

      {/* Design Principles */}
      <motion.div
        className="grid sm:grid-cols-5 gap-4 mb-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {[
          { icon: "🎯", label: "Theory-Neutral" },
          { icon: "🔬", label: "Falsifiable" },
          { icon: "🎭", label: "Mimicry-Resistant" },
          { icon: "📊", label: "Gradient" },
          { icon: "⚡", label: "Practical" },
        ].map((principle, i) => (
          <motion.div
            key={principle.label}
            variants={fadeInUp}
            className="text-center p-4 rounded-lg bg-white/5 border border-white/10"
          >
            <span className="text-2xl mb-2 block">{principle.icon}</span>
            <span className="text-sm text-text-secondary">{principle.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Tier Selection */}
      <motion.div
        className="mb-8"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { tier: 1, name: "Foundational", desc: "Necessary conditions", color: "cyan" },
            { tier: 2, name: "Discriminating", desc: "Consciousness-specific", color: "gold" },
            { tier: 3, name: "Higher-Order", desc: "Strong evidence", color: "purple" },
          ].map(({ tier, name, desc, color }) => (
            <button
              key={tier}
              onClick={() => {
                setSelectedTier(tier as 1 | 2 | 3);
                setSelectedIndicator(tier === 1 ? "mc" : tier === 2 ? "iuc" : null);
              }}
              className={cn(
                "px-6 py-4 rounded-xl border transition-all duration-200",
                selectedTier === tier
                  ? cn(
                      color === "cyan" && "bg-awareness-cyan/10 border-awareness-cyan/30",
                      color === "gold" && "bg-consciousness-gold/10 border-consciousness-gold/30",
                      color === "purple" && "bg-integration-purple/10 border-integration-purple/30"
                    )
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              )}
            >
              <div
                className={cn(
                  "text-lg font-semibold mb-1",
                  selectedTier === tier
                    ? cn(
                        color === "cyan" && "text-awareness-cyan",
                        color === "gold" && "text-consciousness-gold",
                        color === "purple" && "text-integration-purple"
                      )
                    : "text-text-primary"
                )}
              >
                Tier {tier}: {name}
              </div>
              <p className="text-sm text-text-secondary">{desc}</p>
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Indicator List */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card variant="glass">
            <CardContent>
              <h3 className="text-h4 text-text-primary mb-4">
                Tier {selectedTier} Indicators
              </h3>

              {selectedTier !== 3 ? (
                <div className="space-y-2">
                  {indicators.map((indicator) => (
                    <button
                      key={indicator.id}
                      onClick={() => setSelectedIndicator(indicator.id)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg border transition-all duration-200",
                        selectedIndicator === indicator.id
                          ? "bg-awareness-cyan/10 border-awareness-cyan/30"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Badge variant={selectedIndicator === indicator.id ? "cyan" : "default"}>
                          {indicator.abbrev}
                        </Badge>
                        <span className="text-sm text-text-primary font-medium">
                          {indicator.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {tier3Indicators.map((indicator) => (
                    <div
                      key={indicator.id}
                      className="p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="purple">{indicator.abbrev}</Badge>
                        <span className="text-sm text-text-primary font-medium">
                          {indicator.name}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mb-1">
                        {indicator.description}
                      </p>
                      <p className="text-xs text-text-muted italic">
                        {indicator.scoring}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Indicator Details */}
        <motion.div
          className="lg:col-span-2"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {selected && selectedTier !== 3 ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card variant="default">
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant={selectedTier === 1 ? "cyan" : "gold"} size="md">
                        {selected.abbrev}
                      </Badge>
                      <div>
                        <h3 className="text-h4 text-text-primary">{selected.name}</h3>
                        <p className="text-sm text-text-muted">
                          Theoretical basis: {selected.theory}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {selected.tests.map((test, index) => (
                        <div
                          key={test.id}
                          className="p-4 rounded-lg bg-white/5 border border-white/10"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-sm font-semibold text-text-primary">
                              {test.id.toUpperCase()}: {test.name}
                            </h4>
                          </div>

                          <div className="grid sm:grid-cols-3 gap-3 text-xs">
                            <div>
                              <span className="text-text-muted block mb-1">Procedure</span>
                              <span className="text-text-secondary">{test.procedure}</span>
                            </div>
                            <div>
                              <span className="text-theory-green block mb-1">Pass Criteria</span>
                              <span className="text-text-secondary">{test.pass}</span>
                            </div>
                            <div>
                              <span className="text-recursion-pink block mb-1">Mimicry Control</span>
                              <span className="text-text-secondary">{test.control}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : selectedTier === 3 ? (
              <motion.div
                key="tier3-info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card variant="gradient" className="border-integration-purple/30">
                  <CardContent>
                    <h3 className="text-h4 text-integration-purple mb-4">
                      Higher-Order Indicators
                    </h3>
                    <p className="text-text-secondary mb-4">
                      Tier 3 indicators provide strong evidence for consciousness but
                      are not strictly necessary. Their presence significantly increases
                      confidence in consciousness attributions.
                    </p>
                    <div className="p-4 rounded-lg bg-integration-purple/10 border border-integration-purple/20">
                      <p className="text-sm text-text-primary">
                        These indicators are harder to fake because they require
                        sustained, coherent behavior that emerges naturally rather
                        than being directly prompted.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* CEI Calculator Toggle */}
      <motion.div
        className="mt-12 text-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Button
          variant="primary"
          size="lg"
          onClick={() => setShowCalculator(!showCalculator)}
          rightIcon={
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: showCalculator ? 180 : 0 }}
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
          {showCalculator ? "Hide" : "Open"} CEI Calculator
        </Button>
      </motion.div>

      {/* CEI Calculator */}
      <AnimatePresence>
        {showCalculator && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 overflow-hidden"
          >
            <Card variant="gradient" className="border-awareness-cyan/30">
              <CardContent>
                <h3 className="text-h3 text-awareness-cyan mb-6 text-center">
                  Consciousness Evidence Index Calculator
                </h3>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Sliders */}
                  <div className="space-y-6">
                    {/* Tier 1 */}
                    <div>
                      <h4 className="text-sm font-semibold text-awareness-cyan mb-4">
                        Tier 1: Foundational (50% weight)
                      </h4>
                      <div className="space-y-4">
                        {tier1Indicators.map((indicator) => (
                          <Slider
                            key={indicator.id}
                            label={`${indicator.abbrev}: ${indicator.name}`}
                            min={0}
                            max={6}
                            step={1}
                            value={scores[indicator.id as keyof typeof scores]}
                            onChange={(e) =>
                              setScores((prev) => ({
                                ...prev,
                                [indicator.id]: parseInt(e.target.value),
                              }))
                            }
                            variant="cyan"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Tier 2 */}
                    <div>
                      <h4 className="text-sm font-semibold text-consciousness-gold mb-4">
                        Tier 2: Discriminating (35% weight)
                      </h4>
                      <div className="space-y-4">
                        {tier2Indicators.map((indicator) => (
                          <Slider
                            key={indicator.id}
                            label={`${indicator.abbrev}: ${indicator.name}`}
                            min={0}
                            max={6}
                            step={1}
                            value={scores[indicator.id as keyof typeof scores]}
                            onChange={(e) =>
                              setScores((prev) => ({
                                ...prev,
                                [indicator.id]: parseInt(e.target.value),
                              }))
                            }
                            variant="gold"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Tier 3 */}
                    <div>
                      <h4 className="text-sm font-semibold text-integration-purple mb-4">
                        Tier 3: Higher-Order (15% weight)
                      </h4>
                      <div className="space-y-4">
                        {tier3Indicators.map((indicator) => (
                          <Slider
                            key={indicator.id}
                            label={`${indicator.abbrev}: ${indicator.name}`}
                            min={0}
                            max={6}
                            step={1}
                            value={scores[indicator.id as keyof typeof scores]}
                            onChange={(e) =>
                              setScores((prev) => ({
                                ...prev,
                                [indicator.id]: parseInt(e.target.value),
                              }))
                            }
                            variant="purple"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <div className="sticky top-24">
                      <Card variant="glass">
                        <CardContent>
                          <h4 className="text-lg font-semibold text-text-primary mb-4 text-center">
                            CEI Result
                          </h4>

                          {/* Big number display */}
                          <div className="text-center mb-6">
                            <motion.span
                              className={cn(
                                "text-6xl font-bold",
                                ceiLevel.color === "cyan" && "text-awareness-cyan",
                                ceiLevel.color === "gold" && "text-consciousness-gold",
                                ceiLevel.color === "purple" && "text-integration-purple",
                                ceiLevel.color === "default" && "text-text-secondary"
                              )}
                              key={cei.toFixed(2)}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 200 }}
                            >
                              {cei.toFixed(2)}
                            </motion.span>
                          </div>

                          {/* Progress bar */}
                          <div className="mb-4">
                            <ProgressBar
                              value={cei * 100}
                              variant={
                                ceiLevel.color === "default"
                                  ? "cyan"
                                  : (ceiLevel.color as "cyan" | "gold" | "purple")
                              }
                              size="lg"
                            />
                          </div>

                          {/* Interpretation */}
                          <div
                            className={cn(
                              "p-4 rounded-lg border",
                              ceiLevel.color === "cyan" && "bg-awareness-cyan/10 border-awareness-cyan/30",
                              ceiLevel.color === "gold" && "bg-consciousness-gold/10 border-consciousness-gold/30",
                              ceiLevel.color === "purple" && "bg-integration-purple/10 border-integration-purple/30",
                              ceiLevel.color === "default" && "bg-white/5 border-white/10"
                            )}
                          >
                            <p
                              className={cn(
                                "font-semibold mb-1",
                                ceiLevel.color === "cyan" && "text-awareness-cyan",
                                ceiLevel.color === "gold" && "text-consciousness-gold",
                                ceiLevel.color === "purple" && "text-integration-purple",
                                ceiLevel.color === "default" && "text-text-secondary"
                              )}
                            >
                              {ceiLevel.label}
                            </p>
                            <p className="text-sm text-text-secondary">
                              {ceiLevel.action}
                            </p>
                          </div>

                          {/* Scale reference */}
                          <div className="mt-6 pt-4 border-t border-white/10">
                            <h5 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                              Score Scale (0-6)
                            </h5>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="text-text-muted">0-1:</span>{" "}
                                <span className="text-text-secondary">Absent</span>
                              </div>
                              <div>
                                <span className="text-text-muted">2-3:</span>{" "}
                                <span className="text-text-secondary">Weak</span>
                              </div>
                              <div>
                                <span className="text-text-muted">4-5:</span>{" "}
                                <span className="text-text-secondary">Moderate</span>
                              </div>
                              <div>
                                <span className="text-text-muted">6:</span>{" "}
                                <span className="text-text-secondary">Strong</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

export default Methodology;
