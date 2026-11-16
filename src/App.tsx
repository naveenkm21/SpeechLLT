/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MotionConfig } from "motion/react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { EvolutionSection } from "./components/EvolutionSection";
import { PipelineSection } from "./components/PipelineSection";
import { TransformerSection } from "./components/TransformerSection";
import { CoreComponentsSection } from "./components/CoreComponentsSection";
import { TranslationLabSection } from "./components/TranslationLabSection";
import { CaseStudySection } from "./components/CaseStudySection";
import { TrainingEvaluationSection } from "./components/TrainingEvaluationSection";
import { ChallengesFutureSection } from "./components/ChallengesFutureSection";
import { QuizReferencesSection } from "./components/QuizReferencesSection";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white text-slate-900">
        <Navbar />
        <main>
          <HeroSection />
          <EvolutionSection />
          <PipelineSection />
          <TransformerSection />
          <CoreComponentsSection />
          <TranslationLabSection />
          <CaseStudySection />
          <TrainingEvaluationSection />
          <ChallengesFutureSection />
          <QuizReferencesSection />
        </main>
      </div>
    </MotionConfig>
  );
}
