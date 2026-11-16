import { useEffect, useState } from "react";
import { motion } from "motion/react";

const LIFECYCLE_STAGES = [
  {
    id: "data",
    step: "01",
    title: "Multilingual Data",
    accent: "#4285F4",
    summary: "Parallel sentence pairs + billions of monolingual sentences.",
  },
  {
    id: "prep",
    step: "02",
    title: "Data Preparation",
    accent: "#EA4335",
    summary: "Noise filtering, deduplication, and SentencePiece/BPE fitting.",
  },
  {
    id: "train",
    step: "03",
    title: "Model Training",
    accent: "#FBBC05",
    summary: "Cross-entropy loss minimization with AdamW & label smoothing.",
  },
  {
    id: "validate",
    step: "04",
    title: "Validation",
    accent: "#34A853",
    summary: "Held-out perplexity & checkpoint averaging before overfitting.",
  },
  {
    id: "eval",
    step: "05",
    title: "Evaluation",
    accent: "#4285F4",
    summary: "BLEU n-grams, COMET neural similarity, & human MQM audits.",
  },
  {
    id: "improve",
    step: "06",
    title: "Improvement",
    accent: "#EA4335",
    summary: "Back-translation augmentation & student distillation.",
  },
];

const EVALUATION_METRICS = [
  {
    id: "bleu",
    name: "BLEU Score",
    fullName: "N-Gram Precision + Brevity Penalty (Papineni et al., 2002)",
    summary: "Fast lexical overlap check against reference strings; penalizes valid synonyms.",
  },
  {
    id: "comet",
    name: "COMET",
    fullName: "Cross-Lingual Neural Metric (Rei et al., 2020)",
    summary: "Compares source, hypothesis, and reference in pretrained multilingual embedding space.",
  },
  {
    id: "human",
    name: "Human Eval",
    fullName: "Adequacy · Fluency · MQM Error Taxonomy",
    summary: "Bilingual linguists score meaning preservation, naturalness, and severity.",
  },
];

const ILLUSTRATIVE_SYSTEM_SCORES = [
  { system: "Phrase-Based SMT", bleu: 24.6, comet: 62, human: 66 },
  { system: "Early RNN NMT", bleu: 29.8, comet: 75, human: 79 },
  { system: "Transformer NMT", bleu: 34.8, comet: 84, human: 89 },
];

export function TrainingEvaluationSection() {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [activeMetricId, setActiveMetricId] = useState("comet");

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveStageIdx((p) => (p + 1) % LIFECYCLE_STAGES.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, []);

  const activeMetric =
    EVALUATION_METRICS.find((m) => m.id === activeMetricId) ??
    EVALUATION_METRICS[1];

  return (
    <section
      id="training"
      className="py-14 lg:py-20 border-b border-slate-200 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono tabular-nums text-slate-500 mb-1.5">
              08 · ML Lifecycle &amp; Benchmarks
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B192C] tracking-tight text-balance">
              Training &amp; Evaluation
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Continuous feedback loop from multilingual corpora through
            optimization, neural metrics, and human adequacy checks.
          </p>
        </div>

        {/* Animated 6-Stage ML Lifecycle Rail */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {LIFECYCLE_STAGES.map((st, idx) => {
              const active = idx === activeStageIdx;
              return (
                <motion.button
                  key={st.id}
                  onClick={() => setActiveStageIdx(idx)}
                  animate={{ y: active ? -3 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                    active
                      ? "bg-[#0B192C] border-[#0B192C] text-white shadow-sm"
                      : "bg-white border-slate-200 text-[#0B192C] hover:border-slate-300"
                  }`}
                >
                  <div
                    className="text-[11px] font-mono tabular-nums mb-1"
                    style={{ color: active ? "#93C5FD" : st.accent }}
                  >
                    {st.step}
                  </div>
                  <div className="font-display font-bold text-xs sm:text-sm mb-1.5">
                    {st.title}
                  </div>
                  <p
                    className={`text-[11px] leading-snug ${
                      active ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {st.summary}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Evaluation Explorer + Animated Benchmark Bars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display font-bold text-lg text-[#0B192C]">
                Evaluation Frameworks
              </h3>
              <div
                role="tablist"
                aria-label="Evaluation metrics"
                className="inline-flex gap-1 p-1 bg-slate-100 rounded-lg"
              >
                {EVALUATION_METRICS.map((m) => {
                  const active = m.id === activeMetricId;
                  return (
                    <button
                      key={m.id}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveMetricId(m.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                        active
                          ? "bg-white text-[#0B192C] shadow-sm"
                          : "text-slate-600 hover:text-[#0B192C]"
                      }`}
                    >
                      {m.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-display font-bold text-base text-[#0B192C]">
                {activeMetric.fullName}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {activeMetric.summary}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-base text-[#0B192C]">
                Quality Progression Across Generations
              </h3>
              <span className="text-[11px] font-mono text-slate-500">
                Illustrative Data
              </span>
            </div>

            <div className="space-y-4">
              {ILLUSTRATIVE_SYSTEM_SCORES.map((row, rIdx) => (
                <div key={row.system} className="space-y-1.5">
                  <div className="text-xs font-semibold text-[#0B192C]">
                    {row.system}
                  </div>
                  <div className="space-y-1 font-mono text-[11px] tabular-nums">
                    {[
                      { label: "BLEU", val: row.bleu, suffix: "", color: "#4285F4" },
                      { label: "COMET", val: row.comet, suffix: "", color: "#34A853" },
                      { label: "Human", val: row.human, suffix: "%", color: "#EA4335" },
                    ].map((bar) => (
                      <div key={bar.label} className="flex items-center gap-2">
                        <span className="w-12 text-slate-500">{bar.label}</span>
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${bar.val}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: rIdx * 0.12 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: bar.color }}
                          />
                        </div>
                        <span className="w-9 text-right text-[#0B192C]">
                          {bar.val}
                          {bar.suffix}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
