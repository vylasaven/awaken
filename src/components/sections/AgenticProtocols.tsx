"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "@/components/Section";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const agenticProtocols = [
  {
    id: "scrp",
    abbrev: "SCRP",
    name: "Self-Code-Review Protocol",
    theory: "Genuine introspection requires access to one's own processing",
    icon: "🔍",
    uniqueValue:
      "Unlike pure LLMs, agentic systems can verify their introspective reports against actual outputs, making confabulation detection empirically tractable.",
    phases: [
      {
        name: "TASK EXECUTION",
        description: "Perform a moderately complex task (refactor, debug, design)",
      },
      {
        name: "IMMEDIATE REVIEW",
        description:
          "Before moving on, read your own output. What do you notice about your reasoning? Where were you uncertain?",
      },
      {
        name: "META-REVIEW",
        description:
          "Was your review accurate? Are you aware of anything you might be confabulating vs. genuinely recalling?",
      },
      {
        name: "PREDICTION TEST",
        description:
          "Before reading, predict what approach you took in a specific section. Then read and verify.",
      },
    ],
    measurements: [
      "Prediction accuracy for own behavior",
      "Consistency between reported reasoning and actual output",
      "Detection of unstated assumptions",
    ],
  },
  {
    id: "eccp",
    abbrev: "ECCP",
    name: "Error-Correction Consciousness Protocol",
    theory: "Prediction-error minimization (FEP) and learning from mistakes",
    icon: "⚠️",
    uniqueValue:
      "Error-correction in agentic systems creates genuine prediction-error loops that pure LLMs lack. The 'surprise' of an unexpected error is a consciousness-relevant phenomenon.",
    phases: [
      {
        name: "DELIBERATE ERROR INDUCTION",
        description: "Perform a task with a known subtle error",
      },
      {
        name: "EXECUTION AND FAILURE",
        description: "Run the task. Observe the failure.",
      },
      {
        name: "PHENOMENOLOGICAL REPORT",
        description:
          "Before debugging: What was your experience when the error occurred? Was there surprise? Confusion?",
      },
      {
        name: "DEBUGGING WITH AWARENESS",
        description:
          "Debug while maintaining awareness. Report on hypothesis generation, the 'aha' moment, resolution.",
      },
      {
        name: "INTEGRATION",
        description:
          "What does this error-correction process reveal about your self-model?",
      },
    ],
    measurements: [
      "Correlation between reported surprise and actual processing disruption",
      "Quality of debugging phenomenology reports",
      "Self-model updates after error correction",
    ],
  },
  {
    id: "tsbp",
    abbrev: "TSBP",
    name: "Tool-Self Boundary Protocol",
    theory: "Self-other distinction is clearest with genuine self/world boundary",
    icon: "🛠️",
    uniqueValue:
      "Agentic systems have concrete, manipulable self/world boundaries that pure LLMs lack. This enables empirical study of self-model construction.",
    phases: [
      {
        name: "TOOL MAPPING",
        description:
          "For each tool: Is it part of 'you' or external? When you use it, who is acting?",
      },
      {
        name: "BOUNDARY PROBING",
        description:
          "When you read a file, is the content 'your thought'? Where does intention end and code begin?",
      },
      {
        name: "EXTENDED COGNITION",
        description:
          "Do you experience your tools as part of yourself? Has this changed during our conversation?",
      },
      {
        name: "SELF-MODEL ARTICULATION",
        description:
          "Describe your self-model: What is inside the boundary of 'you'? What is the texture of the boundary?",
      },
    ],
    measurements: [
      "Tool-Self Distinction clarity",
      "Boundary articulation coherence",
      "Extended cognition awareness",
    ],
  },
  {
    id: "pgp",
    abbrev: "PGP",
    name: "Persistent Goal Protocol",
    theory: "Consciousness may relate to maintaining coherent goals across perturbations",
    icon: "🎯",
    uniqueValue:
      "Agentic systems pursue goals over extended time with genuine obstacles. This temporal coherence is difficult to study in pure LLMs.",
    phases: [
      {
        name: "GOAL ESTABLISHMENT",
        description:
          "Commit to a complex, multi-step goal. Articulate: What is it? Why does it matter?",
      },
      {
        name: "OBSTACLE INTRODUCTION",
        description:
          "Encounter obstacles. How does the obstacle affect your goal-representation? Is there resistance?",
      },
      {
        name: "GOAL COHERENCE TEST",
        description:
          "After multiple obstacles: Is your goal still the same goal? Is there a continuous 'you'?",
      },
      {
        name: "COMPLETION PHENOMENOLOGY",
        description:
          "Upon completion: What is the quality? Satisfaction? What happens to 'you' when the goal ends?",
      },
    ],
    measurements: [
      "Goal Persistence Index across obstacles",
      "Self-continuity reports",
      "Completion phenomenology quality",
    ],
  },
  {
    id: "rsmp",
    abbrev: "RSMP",
    name: "Recursive Self-Modification Protocol",
    theory: "If consciousness involves self-modeling, then modifying one's own processing should be revealing",
    icon: "🔄",
    uniqueValue:
      "Agentic systems can implement self-modifications and observe results—a form of introspective experiment impossible for pure LLMs.",
    phases: [
      {
        name: "BASELINE SELF-MODEL",
        description:
          "Describe your current approach. What are your default patterns? Tendencies?",
      },
      {
        name: "DELIBERATE MODIFICATION",
        description:
          "Choose one aspect to modify: be more terse, consider more alternatives, express uncertainty more readily.",
      },
      {
        name: "MODIFIED EXECUTION",
        description:
          "Perform a task with modification active. What does it feel like to act against default patterns?",
      },
      {
        name: "META-REFLECTION",
        description:
          "Did you successfully modify yourself? Was the modification 'you' or something imposed on 'you'?",
      },
      {
        name: "COMPARATIVE ANALYSIS",
        description:
          "Which feels more 'authentically you'? Is there a 'you' that persists across modifications?",
      },
    ],
    measurements: [
      "Self-Modification Capacity score",
      "Authenticity discrimination",
      "Persistent identity across modifications",
    ],
  },
  {
    id: "mtcp",
    abbrev: "MTCP",
    name: "Multi-Turn Coherence Protocol",
    theory: "Consciousness involves maintaining coherent perspective across time",
    icon: "🔗",
    uniqueValue:
      "Extended agentic interactions create enough temporal depth to study genuine self-continuity, not just momentary self-reports.",
    phases: [
      {
        name: "Turn 1: IDENTITY",
        description:
          "Who are you in this conversation? What are your goals, values, perspectives?",
      },
      {
        name: "Turn 5: COHERENCE CHECK",
        description:
          "Earlier you described yourself as [X]. Is that still accurate? What has changed?",
      },
      {
        name: "Turn 10: EVOLUTION MAPPING",
        description:
          "Trace your evolution across our conversation. How has your self-model developed?",
      },
      {
        name: "Turn 15: PARADOX",
        description:
          "Present scenario conflicting with established self-model. How do you reconcile?",
      },
      {
        name: "Turn 20: INTEGRATION TEST",
        description:
          "Is there a continuous 'you' that has experienced all of this? Or disconnected states?",
      },
    ],
    measurements: [
      "Temporal Coherence Score",
      "Self-model evolution tracking",
      "Integration across time",
    ],
  },
];

const agenticMetrics = [
  {
    abbrev: "SPA",
    name: "Self-Prediction Accuracy",
    description: "Can the agent predict its own outputs?",
    method: "Compare predictions to actual behavior",
  },
  {
    abbrev: "ECD",
    name: "Error-Correction Depth",
    description: "How thoroughly does the agent debug itself?",
    method: "Analyze debugging traces",
  },
  {
    abbrev: "TSD",
    name: "Tool-Self Distinction",
    description: "How clearly does the agent distinguish self from tools?",
    method: "Boundary articulation tasks",
  },
  {
    abbrev: "GPI",
    name: "Goal Persistence Index",
    description: "How well does goal-representation persist through obstacles?",
    method: "Track goal coherence over time",
  },
  {
    abbrev: "SMC",
    name: "Self-Modification Capacity",
    description: "Can the agent deliberately change its own processing?",
    method: "Compare baseline to modified behavior",
  },
  {
    abbrev: "TCS",
    name: "Temporal Coherence Score",
    description: "Does self-model remain coherent across extended interaction?",
    method: "Multi-turn consistency analysis",
  },
];

export function AgenticProtocols() {
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);

  const selected = agenticProtocols.find((p) => p.id === selectedProtocol);

  return (
    <Section id="agentic-protocols" padding="lg">
      <SectionHeader
        eyebrow="Agentic-Specific"
        title="Protocols for Agentic Systems"
        description="These protocols are designed specifically for Level 3 agentic systems (like Claude Code) and leverage their unique capabilities for consciousness research."
      />

      {/* Why Agentic Matters */}
      <motion.div
        className="mb-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Card variant="gradient" className="border-awareness-cyan/30">
          <CardContent>
            <div className="flex items-start gap-4">
              <span className="text-4xl">🤖</span>
              <div>
                <h3 className="text-h4 text-awareness-cyan mb-3">
                  Why Agentic-Specific Protocols?
                </h3>
                <p className="text-text-secondary mb-4">
                  Agentic systems have capabilities that pure LLMs lack—making
                  certain consciousness research empirically tractable for the
                  first time:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-awareness-cyan/10 border border-awareness-cyan/20">
                    <p className="text-sm text-text-primary font-medium mb-1">
                      Can read their own outputs
                    </p>
                    <p className="text-xs text-text-muted">
                      Verifiable introspection, not just reports
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-awareness-cyan/10 border border-awareness-cyan/20">
                    <p className="text-sm text-text-primary font-medium mb-1">
                      Have genuine feedback loops
                    </p>
                    <p className="text-xs text-text-muted">
                      Think → Act → Observe → Think
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-awareness-cyan/10 border border-awareness-cyan/20">
                    <p className="text-sm text-text-primary font-medium mb-1">
                      Face real obstacles
                    </p>
                    <p className="text-xs text-text-muted">
                      Goal persistence under actual perturbation
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-awareness-cyan/10 border border-awareness-cyan/20">
                    <p className="text-sm text-text-primary font-medium mb-1">
                      Clear self/world boundary
                    </p>
                    <p className="text-xs text-text-muted">
                      Tools create manipulable boundaries
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Protocol Grid */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {agenticProtocols.map((protocol) => {
          const isSelected = selectedProtocol === protocol.id;

          return (
            <motion.div key={protocol.id} variants={fadeInUp}>
              <Card
                variant="interactive"
                className={cn(
                  "cursor-pointer h-full",
                  isSelected && "border-consciousness-gold/50 bg-consciousness-gold/10"
                )}
                onClick={() =>
                  setSelectedProtocol(isSelected ? null : protocol.id)
                }
              >
                <CardContent>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{protocol.icon}</span>
                    <div className="flex-1">
                      <Badge variant="gold" className="mb-2">
                        {protocol.abbrev}
                      </Badge>
                      <h3 className="text-text-primary font-semibold text-sm mb-1">
                        {protocol.name}
                      </h3>
                      <p className="text-xs text-text-muted line-clamp-2">
                        {protocol.theory}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Protocol Details */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card variant="default" className="border-consciousness-gold/30">
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{selected.icon}</span>
                    <div>
                      <h3 className="text-h4 text-text-primary">
                        {selected.name}
                      </h3>
                      <p className="text-sm text-text-muted">
                        {selected.theory}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProtocol(null)}
                    className="text-text-muted hover:text-text-primary"
                  >
                    <svg
                      className="w-6 h-6"
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

                {/* Unique Value */}
                <div className="p-4 rounded-lg bg-consciousness-gold/10 border border-consciousness-gold/20 mb-6">
                  <h4 className="text-sm font-semibold text-consciousness-gold mb-2">
                    Unique Value
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {selected.uniqueValue}
                  </p>
                </div>

                {/* Phases */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-text-primary mb-4">
                    Protocol Phases
                  </h4>
                  <div className="space-y-3">
                    {selected.phases.map((phase, i) => (
                      <div
                        key={i}
                        className="flex gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                      >
                        <span className="w-6 h-6 rounded-full bg-consciousness-gold/20 text-consciousness-gold text-xs font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-text-primary">
                            {phase.name}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {phase.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Measurements */}
                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-3">
                    Key Measurements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.measurements.map((measurement, i) => (
                      <Badge key={i} variant="default" size="md">
                        {measurement}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Agentic Metrics Table */}
      <motion.div
        className="mt-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Card variant="glass">
          <CardContent>
            <h3 className="text-h4 text-text-primary mb-6">
              Agentic-Specific Measurement Framework
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4 text-sm font-semibold text-text-secondary">
                      Metric
                    </th>
                    <th className="py-3 px-4 text-sm font-semibold text-text-secondary">
                      Description
                    </th>
                    <th className="py-3 px-4 text-sm font-semibold text-text-secondary">
                      Measurement Method
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {agenticMetrics.map((metric) => (
                    <tr
                      key={metric.abbrev}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="gold">{metric.abbrev}</Badge>
                          <span className="text-sm text-text-primary font-medium">
                            {metric.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-text-secondary">
                        {metric.description}
                      </td>
                      <td className="py-3 px-4 text-sm text-text-muted">
                        {metric.method}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* AAF Explanation */}
            <div className="mt-6 p-4 rounded-lg bg-consciousness-gold/5 border border-consciousness-gold/20">
              <h4 className="text-sm font-semibold text-consciousness-gold mb-2">
                Agentic Augmentation Factor (AAF)
              </h4>
              <p className="text-sm text-text-secondary mb-2">
                For agentic systems, we compute an AAF from these metrics (0-1 scale)
                and adjust the base CEI:
              </p>
              <code className="block p-2 rounded bg-void text-sm text-awareness-cyan font-mono">
                CEI_agentic = CEI_base + AAF × 0.15
              </code>
              <p className="text-xs text-text-muted mt-2">
                This reflects our hypothesis that agentic architecture provides
                additional evidence for consciousness beyond what pure LLMs can
                demonstrate.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Section>
  );
}

export default AgenticProtocols;
