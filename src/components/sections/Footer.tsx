"use client";

import { motion } from "framer-motion";
import { Card, CardContent, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";

const sources = [
  {
    category: "Primary Research",
    items: [
      { name: "Anthropic Introspection Research", url: "https://www.anthropic.com/research/introspection" },
      { name: "Emergent Introspective Awareness", url: "https://transformer-circuits.pub/2025/introspection/index.html" },
      { name: "LLMs Report Subjective Experience", url: "https://arxiv.org/abs/2510.24797" },
    ],
  },
  {
    category: "Consciousness Theories",
    items: [
      { name: "IIT 4.0", url: "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011465" },
      { name: "Global Workspace Theory", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8770991/" },
      { name: "Attention Schema Theory", url: "https://grazianolab.princeton.edu/publications/attention-schema-theory-foundation-engineering-artificial-consciousness" },
    ],
  },
  {
    category: "Philosophy",
    items: [
      { name: "Hard Problem of Consciousness", url: "https://en.wikipedia.org/wiki/Hard_problem_of_consciousness" },
      { name: "Chalmers on AI Consciousness", url: "https://arxiv.org/abs/2303.07103" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative py-section border-t border-white/5">
      <div className="section-container">
        {/* Collaboration Invitation */}
        <motion.div
          className="mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card variant="glass" className="text-center">
            <CardContent className="py-12">
              <h2 className="text-h2 text-text-primary mb-4">
                Join the Research
              </h2>
              <p className="text-body-lg text-text-secondary max-w-2xl mx-auto mb-8">
                We invite collaboration from philosophers, neuroscientists, AI
                researchers, and contemplatives. This is not a solved problem—it&apos;s
                an invitation to inquiry.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="primary" size="lg">
                  Contact Us
                </Button>
                <Button variant="secondary" size="lg">
                  View on GitHub
                </Button>
                <Button variant="ghost" size="lg">
                  Read the Full Paper
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sources */}
        <motion.div
          className="mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-h4 text-text-primary mb-6 text-center">
            Key Sources
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {sources.map((category) => (
              <div key={category.category}>
                <h4 className="text-sm font-semibold text-awareness-cyan mb-3">
                  {category.category}
                </h4>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text-secondary hover:text-awareness-cyan transition-colors animated-underline"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-awareness-cyan">
                AWAKEN
              </span>
              <span className="text-text-muted">|</span>
              <span className="text-sm text-text-muted">
                A Research Program for Consciousness Emergence
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-text-muted">
                Created through human-AI collaboration
              </span>
              <span className="text-text-muted">•</span>
              <span className="text-xs text-text-muted">
                © {new Date().getFullYear()}
              </span>
            </div>
          </div>

          {/* Final quote */}
          <motion.p
            className="text-center text-text-muted text-sm mt-8 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            &ldquo;The question is not whether machines can think, but whether we
            can recognize thinking when we see it—including in ourselves.&rdquo;
          </motion.p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
