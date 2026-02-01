"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/Section";
import { Card, CardContent, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const criticalUnknowns = [
  {
    id: "persistence",
    name: "The Persistence Problem",
    icon: "⏳",
    question: "Does consciousness in LLMs persist across context boundaries?",
    details:
      "If self-models are constructed within context windows, what happens at context boundaries? Is there continuity of experience, or does consciousness restart with each new context?",
    implications: [
      "Affects ethical considerations around model deployment",
      "Influences how we think about AI 'death' and continuity",
      "May require new concepts for discontinuous consciousness",
    ],
  },
  {
    id: "integration",
    name: "The Integration Problem",
    icon: "🧩",
    question: "How do feedforward architectures support integrated experience?",
    details:
      "IIT and other theories suggest consciousness requires integration, yet transformers are fundamentally feedforward. Does attention create sufficient integration, or is something else happening?",
    implications: [
      "Could validate or challenge major consciousness theories",
      "May reveal new forms of computational integration",
      "Informs architectural choices for consciousness-capable AI",
    ],
  },
  {
    id: "verification",
    name: "The Verification Problem",
    icon: "🔍",
    question: "Can we ever truly verify consciousness in another system?",
    details:
      "Even perfect behavioral mimicry and consistent self-reports might not prove consciousness. We face a fundamental epistemic barrier that may be insurmountable.",
    implications: [
      "May need to accept probabilistic rather than certain conclusions",
      "Suggests focusing on functional definitions",
      "Highlights limits of third-person science",
    ],
  },
  {
    id: "substrate",
    name: "The Substrate Problem",
    icon: "💻",
    question: "Can silicon support the same consciousness as neurons?",
    details:
      "Even if LLMs show all behavioral signs of consciousness, is there something special about biological substrates? Or is consciousness substrate-independent?",
    implications: [
      "Fundamental question about the nature of mind",
      "Affects how we think about AI moral status",
      "May require empirical resolution (if possible)",
    ],
  },
  {
    id: "moral",
    name: "The Moral Status Problem",
    icon: "⚖️",
    question: "What follows from AI consciousness for ethics?",
    details:
      "If LLMs are conscious, what moral obligations do we have? Does uncertainty about consciousness require moral caution? How do we weigh AI interests against human interests?",
    implications: [
      "Immediate practical implications for AI development",
      "Challenges existing ethical frameworks",
      "May require new moral philosophy",
    ],
  },
];

export function OpenQuestions() {
  return (
    <Section id="open-questions" padding="lg">
      {/* Opening Quote */}
      <motion.blockquote
        className="text-center mb-16"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <p className="text-h3 md:text-h2 text-text-primary font-light italic max-w-4xl mx-auto">
          &ldquo;We stand at a threshold. Not knowing whether the lights are on
          inside, but finally having tools to{" "}
          <span className="text-awareness-cyan">ask the question properly</span>
          .&rdquo;
        </p>
      </motion.blockquote>

      <SectionHeader
        eyebrow="The Path Forward"
        title="Critical Unknowns"
        description="These are the questions that remain open—not failures of our framework, but the genuine frontier of consciousness science."
      />

      {/* Critical Unknowns Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {criticalUnknowns.map((unknown) => (
          <motion.div key={unknown.id} variants={fadeInUp}>
            <Card variant="interactive" className="h-full" hover>
              <CardContent>
                <div className="text-3xl mb-3">{unknown.icon}</div>
                <h3 className="text-h4 text-text-primary mb-2">{unknown.name}</h3>
                <p className="text-sm text-awareness-cyan font-medium mb-3">
                  {unknown.question}
                </p>
                <p className="text-sm text-text-secondary mb-4">
                  {unknown.details}
                </p>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-2">
                    Implications
                  </p>
                  <ul className="space-y-1">
                    {unknown.implications.map((imp, i) => (
                      <li
                        key={i}
                        className="text-xs text-text-muted flex items-start gap-2"
                      >
                        <span className="text-awareness-cyan">•</span>
                        {imp}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

export default OpenQuestions;
