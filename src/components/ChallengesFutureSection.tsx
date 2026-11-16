import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CHALLENGES_LIST } from "../data/mtData";

const FUTURE_FRONTIERS = [
  {
    title: "Zero-Shot Translation",
    accent: "#4285F4",
    description: "Direct translation across unseen language pairs via shared latent space.",
  },
  {
    title: "Multimodal Translation",
    accent: "#EA4335",
    description: "Jointly grounds text output in camera scenes and document layout.",
  },
  {
    title: "Speech-to-Speech",
    accent: "#FBBC05",
    description: "Direct acoustic translation preserving speaker prosody and cadence.",
  },
  {
    title: "Context-Aware Discourse",
    accent: "#34A853",
    description: "Long-context attention preserves pronouns and tone across paragraphs.",
  },
  {
    title: "Real-Time Streaming",
    accent: "#4285F4",
    description: "Low-latency simultaneous decoding emits tokens mid-utterance.",
  },
  {
    title: "On-Device Quantized NMT",
    accent: "#34A853",
    description: "Compact INT4/INT8 models run privately offline on mobile NPUs.",
  },
];

const HUB_NODES = [
  { label: "English", glyph: "A", x: 180, y: 36, color: "#4285F4" },
  { label: "Tamil", glyph: "அ", x: 312, y: 112, color: "#34A853" },
  { label: "French", glyph: "É", x: 312, y: 238, color: "#EA4335" },
  { label: "Hindi", glyph: "अ", x: 180, y: 314, color: "#FBBC05" },
  { label: "Japanese", glyph: "文", x: 48, y: 238, color: "#4285F4" },
  { label: "Arabic", glyph: "ض", x: 48, y: 112, color: "#34A853" },
];

export function ChallengesFutureSection() {
  const [selectedChallengeId, setSelectedChallengeId] = useState("ambiguity");
  const [activeContext, setActiveContext] = useState<"A" | "B">("A");

  const activeChallenge =
    CHALLENGES_LIST.find((c) => c.id === selectedChallengeId) ??
    CHALLENGES_LIST[0];

  const currentCtx =
    activeContext === "A" ? activeChallenge.contextA : activeChallenge.contextB;

  return (
    <>
      {/* Section 09: Challenges & Limitations */}
      <section
        id="challenges"
        className="py-14 lg:py-20 border-b border-slate-200 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono tabular-nums text-slate-500 mb-1.5">
                09 · Open Research Problems
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B192C] tracking-tight text-balance">
                Challenges &amp; Context Sensitivity
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              Select a limitation and flip Context A vs. Context B to watch how
              surrounding cues shift the translation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {CHALLENGES_LIST.map((ch) => {
                const active = ch.id === selectedChallengeId;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChallengeId(ch.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      active
                        ? "bg-[#0B192C] border-[#0B192C] text-white"
                        : "bg-white border-slate-200 text-[#0B192C] hover:border-slate-300"
                    }`}
                  >
                    <span className="font-display font-semibold text-sm">
                      {ch.title}
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: ch.accent }}
                    />
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display font-bold text-xl text-[#0B192C]">
                  {activeChallenge.title}
                </h3>

                <div
                  role="tablist"
                  aria-label="Context comparison toggle"
                  className="inline-flex p-1 bg-slate-100 rounded-lg"
                >
                  {(["A", "B"] as const).map((ctxKey) => (
                    <button
                      key={ctxKey}
                      role="tab"
                      aria-selected={activeContext === ctxKey}
                      onClick={() => setActiveContext(ctxKey)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                        activeContext === ctxKey
                          ? "bg-white text-[#0B192C] shadow-sm"
                          : "text-slate-600 hover:text-[#0B192C]"
                      }`}
                    >
                      Context {ctxKey}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs text-slate-600">
                {activeChallenge.sourceExample}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeChallenge.id}-${activeContext}`}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.16 }}
                  className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
                >
                  <div className="font-display font-bold text-base text-[#0B192C]">
                    {currentCtx.label}
                  </div>
                  <div
                    className="p-3.5 bg-white border-2 rounded-lg font-mono text-sm font-semibold text-[#0B192C]"
                    style={{
                      borderColor:
                        activeContext === "A" ? "#4285F4" : "#34A853",
                    }}
                  >
                    {currentCtx.translation}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {currentCtx.note}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Future of Machine Translation */}
      <section
        id="future"
        className="py-14 lg:py-20 border-b border-slate-200 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-sm bg-slate-50 border border-slate-200 rounded-xl p-5">
                <div className="text-xs font-semibold text-slate-500 text-center mb-1">
                  Shared Multilingual Semantic Space
                </div>
                <svg
                  viewBox="0 0 360 350"
                  className="w-full h-auto"
                  aria-label="Animated multilingual neural hub connecting six world scripts"
                >
                  {HUB_NODES.map((node, idx) => (
                    <g key={node.label}>
                      <line
                        x1="180"
                        y1="175"
                        x2={node.x}
                        y2={node.y}
                        stroke="#CBD5E1"
                        strokeWidth="1.5"
                      />
                      <motion.line
                        x1="180"
                        y1="175"
                        x2={node.x}
                        y2={node.y}
                        stroke={node.color}
                        strokeWidth="2.5"
                        strokeDasharray="6 8"
                        animate={{ strokeDashoffset: [28, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: "linear",
                          delay: idx * 0.2,
                        }}
                      />
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r="24"
                        fill="#FFFFFF"
                        stroke={node.color}
                        strokeWidth="2"
                        animate={{ r: [23, 25, 23] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2.2,
                          delay: idx * 0.25,
                        }}
                      />
                      <text
                        x={node.x}
                        y={node.y - 1}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="700"
                        fill="#0B192C"
                      >
                        {node.glyph}
                      </text>
                      <text
                        x={node.x}
                        y={node.y + 13}
                        textAnchor="middle"
                        fontSize="8.5"
                        fontFamily="sans-serif"
                        fill="#475569"
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}

                  <circle cx="180" cy="175" r="38" fill="#0B192C" />
                  <text
                    x="180"
                    y="172"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill="#FFFFFF"
                  >
                    Latent
                  </text>
                  <text
                    x="180"
                    y="186"
                    textAnchor="middle"
                    fontSize="9.5"
                    fontFamily="monospace"
                    fill="#93C5FD"
                  >
                    Interlingua
                  </text>
                </svg>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="text-xs font-mono tabular-nums text-slate-500 mb-1.5">
                10 · Emerging Frontiers
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B192C] tracking-tight mb-6 text-balance">
                The Future of Machine Translation
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {FUTURE_FRONTIERS.map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <div
                      className="w-6 h-1 rounded-full mb-2"
                      style={{ backgroundColor: item.accent }}
                    />
                    <h3 className="font-display font-bold text-sm text-[#0B192C] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
