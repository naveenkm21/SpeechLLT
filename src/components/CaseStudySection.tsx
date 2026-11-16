import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GOOGLE_TRANSLATE_MODES } from "../data/mtData";

const HISTORICAL_MILESTONES = [
  {
    year: "2006",
    title: "SMT Launch",
    accent: "#FBBC05",
    detail: "Phrase-based statistical alignment on parallel UN/EU corpora.",
  },
  {
    year: "2016",
    title: "GNMT Neural Shift",
    accent: "#4285F4",
    detail: "8-layer LSTM seq2seq + attention cut errors 55%–85% (Wu et al.).",
  },
  {
    year: "2017–2020",
    title: "Transformer & Zero-Shot",
    accent: "#EA4335",
    detail: "Self-attention + shared multilingual manifolds (Johnson et al.).",
  },
  {
    year: "2022–2024",
    title: "240+ Languages",
    accent: "#34A853",
    detail: "Monolingual pretraining & back-translation scaled low-resource pairs.",
  },
];

export function CaseStudySection() {
  const [selectedModeId, setSelectedModeId] = useState("camera");
  const [activePulseIdx, setActivePulseIdx] = useState(0);

  const activeMode =
    GOOGLE_TRANSLATE_MODES.find((m) => m.id === selectedModeId) ??
    GOOGLE_TRANSLATE_MODES[0];

  useEffect(() => {
    const id = window.setInterval(() => {
      setActivePulseIdx((p) => (p + 1) % activeMode.inputPipeline.length);
    }, 1050);
    return () => window.clearInterval(id);
  }, [activeMode.inputPipeline.length]);

  return (
    <section
      id="case-study"
      className="py-14 lg:py-20 border-b border-slate-200 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono tabular-nums text-slate-500 mb-1.5">
              07 · Real-World Case Study
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B192C] tracking-tight text-balance">
              Google Translate: Multimodal NMT in Action
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Published Google Research milestones paired with live animated
            front-end input pipelines for Text, Voice, Camera, Docs, and
            Conversation.
          </p>
        </div>

        {/* Compact Historical Milestones Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {HISTORICAL_MILESTONES.map((m) => (
            <div
              key={m.year}
              className="bg-white border border-slate-200 rounded-xl p-4"
            >
              <div
                className="font-mono font-bold text-sm tabular-nums mb-1"
                style={{ color: m.accent }}
              >
                {m.year}
              </div>
              <h3 className="font-display font-bold text-sm text-[#0B192C] mb-1">
                {m.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {m.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Animated Multimodal Input Pipeline */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <h3 className="font-display font-bold text-lg text-[#0B192C]">
              Animated Input-Processing Modes
            </h3>

            <div
              role="tablist"
              aria-label="Google Translate input modes"
              className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-lg"
            >
              {GOOGLE_TRANSLATE_MODES.map((mode) => {
                const active = mode.id === selectedModeId;
                return (
                  <button
                    key={mode.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setSelectedModeId(mode.id);
                      setActivePulseIdx(0);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? "bg-white text-[#0B192C] shadow-sm"
                        : "text-slate-600 hover:text-[#0B192C]"
                    }`}
                  >
                    {mode.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-5">
            {activeMode.inputPipeline.map((step, idx) => {
              const isHot = idx === activePulseIdx;
              const isNmt = step.includes("NMT");
              return (
                <motion.div
                  key={step}
                  animate={{
                    scale: isHot ? 1.03 : 1,
                    y: isHot ? -3 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`p-3.5 rounded-xl border text-center transition-colors ${
                    isHot
                      ? "bg-[#0B192C] border-[#0B192C] text-white shadow-sm"
                      : isNmt
                      ? "bg-[#4285F4]/10 border-[#4285F4] text-[#0B192C]"
                      : "bg-slate-50 border-slate-200 text-[#0B192C]"
                  }`}
                >
                  <div
                    className={`text-[10px] font-mono tabular-nums mb-1 ${
                      isHot ? "text-blue-300" : "text-slate-400"
                    }`}
                  >
                    0{idx + 1}
                  </div>
                  <div className="font-display font-semibold text-xs sm:text-sm">
                    {step}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-xs sm:text-sm text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 border-t border-slate-100">
            <span>{activeMode.description}</span>
            <span className="font-mono text-[11px] text-slate-500 shrink-0">
              {activeMode.architectureNote}
            </span>
          </div>
        </div>

        {/* Tri-Script Visual Case Study */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg text-[#0B192C]">
              Cross-Typology Mapping: English → French &amp; Tamil
            </h3>
            <span className="text-[11px] font-mono text-slate-500">
              SVO vs. SOV
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-semibold text-[#4285F4] mb-1">
                English · SVO
              </div>
              <div className="font-display font-bold text-base text-[#0B192C]">
                Knowledge bridges cultures across borders.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-semibold text-[#EA4335] mb-1">
                French · SVO + Articles
              </div>
              <div className="font-display font-bold text-base text-[#0B192C]">
                La connaissance relie les cultures au-delà des frontières.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-semibold text-[#34A853] mb-1">
                Tamil · SOV + Case Suffixes
              </div>
              <div className="font-display font-bold text-base text-[#0B192C]">
                அறிவு எல்லைகளைக் கடந்து கலாச்சாரங்களை இணைக்கிறது.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
