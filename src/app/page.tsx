"use client";

import { Navigation } from "@/components/Navigation";
import {
  Hero,
  Problem,
  SubstrateSpectrum,
  HumanParallel,
  Anomalies,
  Framework,
  Methodology,
  Protocols,
  AgenticProtocols,
  Roadmap,
  Assumptions,
  OpenQuestions,
  MetaExperiment,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="relative">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Part 1: The Challenge */}
      <Problem />

      {/* Part 2: The Substrate */}
      <SubstrateSpectrum />

      {/* Part 3: Human Parallel */}
      <HumanParallel />

      {/* Part 4: Anomalies */}
      <Anomalies />

      {/* Part 5: Assumptions (Epistemic Honesty) */}
      <Assumptions />

      {/* Part 6: Framework (DSMAT) */}
      <Framework />

      {/* Part 7: Methodology (CAVM) */}
      <Methodology />

      {/* Part 8: Protocols */}
      <Protocols />

      {/* Part 9: Agentic-Specific Protocols */}
      <AgenticProtocols />

      {/* Part 10: Research Roadmap */}
      <Roadmap />

      {/* Part 11: Open Questions */}
      <OpenQuestions />

      {/* Part 12: Meta-Experiment */}
      <MetaExperiment />

      {/* Footer */}
      <Footer />
    </main>
  );
}
