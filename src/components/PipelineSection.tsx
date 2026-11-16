import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, ChevronRight, RotateCcw } from "lucide-react";
import { PIPELINE_PRESETS, PIPELINE_STAGES } from "../data/mtData";

export function PipelineSection() {
  const [activeStageIdx, setActiveStageIdx] = useState(2); // Start at Tokenize so visual impact is immediate
  const [targetLangKey, setTargetLangKey] = useState<"fr" | "ta" | "hi">("fr");
  const [isPlaying, setIsPlaying] = useState(true);

  const preset = PIPELINE_PRESETS[targetLangKey];
  const stage = PIPELINE_STAGES[activeStageIdx];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setActiveStageIdx((prev) => (prev + 1) % PIPELINE_STAGES.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const renderAnimatedStageTheater = () => {
    switch (stage.id) {
      case "input":
        return (
          <div className="flex flex-col items-center justify-center min-h-[220px] space-y-4">
            <div className="text-xs font-mono text-slate-500">
              Unicode Stream Acquisition (NFKC)
            </div>
            <div className="flex flex-wrap justify-center gap-1">
              {preset.sourceSentence.split("").map((ch, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="w-7 h-9 rounded bg-white border border-slate-200 flex items-center justify-center font-mono text-sm font-semibold text-[#0B192C]"
                >
                  {ch === " " ? "␣" : ch}
                </motion.span>
              ))}
            </div>
          </div>
        );

      case "detection":
        return (
          <div className="flex flex-col justify-center min-h-[220px] max-w-lg mx-auto space-y-4">
            <div className="text-xs font-mono text-slate-500 text-center">
              Script &amp; N-Gram Classifier Probability Race
            </div>
            {[
              { lang: "English (en)", pct: 99.4, color: "#4285F4" },
              { lang: "Scots (sco)", pct: 4.2, color: "#CBD5E1" },
              { lang: "Dutch (nl)", pct: 1.8, color: "#CBD5E1" },
            ].map((row, i) => (
              <div key={row.lang} className="space-y-1">
                <div className="flex justify-between text-xs font-mono tabular-nums">
                  <span className="font-semibold text-[#0B192C]">{row.lang}</span>
                  <span>{row.pct}%</span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${row.pct}%` }}
                    transition={{ duration: 0.65, delay: i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: row.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case "tokenization":
        return (
          <div className="flex flex-col items-center justify-center min-h-[220px] space-y-5">
            <div className="text-xs font-mono text-slate-500">
              Sentence Splits into Discrete Subword Units &amp; Vocab IDs
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {preset.tokens.map((tok, i) => (
                <motion.div
                  key={tok.text + i}
                  initial={{ scale: 0.7, opacity: 0, x: -16 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12, type: "spring", stiffness: 260, damping: 20 }}
                  className="px-4 py-3 bg-white border-2 border-[#FBBC05] rounded-xl text-center shadow-xs"
                >
                  <div className="font-mono text-base font-bold text-[#0B192C]">
                    {tok.text}
                  </div>
                  <div className="font-mono text-[11px] tabular-nums text-slate-500 mt-1">
                    ID {tok.id}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "embedding":
        return (
          <div className="flex flex-col justify-center min-h-[220px] space-y-3 max-w-2xl mx-auto">
            <div className="text-xs font-mono text-slate-500 text-center">
              Token IDs → 512-Dim Vectors + Positional Sin/Cos Signals
            </div>
            {preset.embeddingsSample.map((row, idx) => (
              <motion.div
                key={row.token}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg px-3.5 py-2"
              >
                <span className="font-mono text-xs font-bold text-[#0B192C] w-20">
                  {row.token}
                </span>
                <div className="flex-1 grid grid-cols-4 gap-1.5">
                  {row.vector.map((val, vIdx) => (
                    <div
                      key={vIdx}
                      className="h-5 rounded flex items-center justify-center font-mono text-[10px] tabular-nums text-white"
                      style={{
                        backgroundColor:
                          val >= 0
                            ? `rgba(52, 168, 83, ${0.4 + Math.abs(val) * 0.6})`
                            : `rgba(234, 67, 53, ${0.4 + Math.abs(val) * 0.6})`,
                      }}
                    >
                      {val.toFixed(2)}
                    </div>
                  ))}
                </div>
                <span className="font-mono text-[11px] text-[#FBBC05] font-semibold">
                  +PE({row.pos})
                </span>
              </motion.div>
            ))}
          </div>
        );

      case "encoder":
        return (
          <div className="flex flex-col items-center justify-center min-h-[220px] space-y-4">
            <div className="text-xs font-mono text-slate-500">
              6 Stacked Encoder Layers Mixing Full-Sentence Context
            </div>
            <div className="w-full max-w-xl space-y-1.5">
              {[6, 5, 4, 3, 2, 1].map((layerNum, idx) => (
                <motion.div
                  key={layerNum}
                  initial={{ opacity: 0.35 }}
                  animate={{
                    opacity: [0.45, 1, 0.45],
                    borderColor: ["#E2E8F0", "#4285F4", "#E2E8F0"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    delay: (5 - idx) * 0.2,
                  }}
                  className="w-full py-1.5 px-4 rounded-lg bg-white border flex items-center justify-between text-xs font-mono"
                >
                  <span className="font-semibold text-[#0B192C]">
                    Encoder Layer {layerNum}
                  </span>
                  <span className="text-slate-500">
                    Self-Attn + Add&amp;Norm + FFN
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "attention":
        return (
          <div className="flex flex-col items-center justify-center min-h-[220px] space-y-3">
            <div className="text-xs font-mono text-slate-500">
              Dynamic Pairwise Attention Arcs Between Tokens
            </div>
            <svg viewBox="0 0 560 140" className="w-full max-w-xl h-36">
              {preset.tokens.slice(0, 5).map((tok, i) => {
                const x = 60 + i * 110;
                return (
                  <g key={tok.text}>
                    <rect
                      x={x - 40}
                      y="95"
                      width="80"
                      height="30"
                      rx="6"
                      fill="#FFFFFF"
                      stroke="#0B192C"
                      strokeWidth="1.5"
                    />
                    <text
                      x={x}
                      y="114"
                      textAnchor="middle"
                      fontSize="12"
                      fontFamily="monospace"
                      fontWeight="600"
                      fill="#0B192C"
                    >
                      {tok.text}
                    </text>
                  </g>
                );
              })}

              {/* Animated attention arcs radiating from "reads" (index 2, x=280) */}
              {[
                { from: 280, to: 170, w: "0.44", c: "#EA4335", h: 20 },
                { from: 280, to: 500, w: "0.39", c: "#4285F4", h: 12 },
                { from: 60, to: 170, w: "0.62", c: "#34A853", h: 42 },
                { from: 390, to: 500, w: "0.57", c: "#FBBC05", h: 42 },
              ].map((arc, idx) => (
                <g key={idx}>
                  <motion.path
                    d={`M ${arc.from} 94 Q ${(arc.from + arc.to) / 2} ${arc.h}, ${arc.to} 94`}
                    fill="none"
                    stroke={arc.c}
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                    animate={{ strokeDashoffset: [24, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      ease: "linear",
                    }}
                  />
                  <text
                    x={(arc.from + arc.to) / 2}
                    y={arc.h + 18}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="700"
                    fill={arc.c}
                  >
                    {arc.w}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        );

      case "decoder":
        return (
          <div className="flex flex-col items-center justify-center min-h-[220px] space-y-4">
            <div className="text-xs font-mono text-slate-500">
              Autoregressive Token-by-Token Emission ({preset.targetLanguage})
            </div>
            <div className="flex flex-wrap justify-center gap-2.5">
              {preset.decoderSteps.map((st, idx) => (
                <motion.div
                  key={st.step}
                  initial={{ opacity: 0, scale: 0.75, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: idx * 0.25 }}
                  className="px-4 py-2.5 bg-white border-2 border-[#34A853] rounded-xl text-center"
                >
                  <div className="text-[10px] font-mono text-slate-400">
                    Step t={st.step}
                  </div>
                  <div className="font-display font-bold text-base text-[#0B192C] mt-0.5">
                    {st.generated}
                  </div>
                  <div className="text-[10px] font-mono text-[#34A853] tabular-nums mt-0.5">
                    p={st.topCandidates[0].prob.toFixed(2)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "output":
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[220px] space-y-4 text-center">
            <div className="text-xs font-mono text-slate-500">
              Final Detokenized Target Translation ({preset.targetLanguage})
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="px-8 py-5 bg-white border-2 border-[#34A853] rounded-xl shadow-sm"
            >
              <div className="font-display font-bold text-2xl sm:text-3xl text-[#0B192C]">
                {preset.finalOutput}
              </div>
            </motion.div>
            <div className="text-xs font-mono text-slate-600 max-w-lg">
              {preset.linguisticNote}
            </div>
          </div>
        );
    }
  };

  return (
    <section
      id="pipeline"
      className="py-14 lg:py-20 border-b border-slate-200 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono tabular-nums text-slate-500 mb-1.5">
              03 · Live Signal Pipeline
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B192C] tracking-tight text-balance">
              How Machine Translation Works
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div
              role="tablist"
              aria-label="Pipeline target language"
              className="inline-flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-lg"
            >
              {(["fr", "ta", "hi"] as const).map((code) => {
                const active = targetLangKey === code;
                return (
                  <button
                    key={code}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTargetLangKey(code)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? "bg-[#0B192C] text-white"
                        : "text-slate-600 hover:text-[#0B192C]"
                    }`}
                  >
                    EN → {PIPELINE_PRESETS[code].targetLanguage}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Auto-Flow</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Play Auto-Flow</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setActiveStageIdx((i) => (i + 1) % PIPELINE_STAGES.length);
              }}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-xs font-semibold text-[#0B192C] cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setActiveStageIdx(0);
              }}
              aria-label="Reset pipeline"
              className="p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-600 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 8-Stage Interactive Rail with Traveling Pulse */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 mb-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {PIPELINE_STAGES.map((item, idx) => {
              const isActive = idx === activeStageIdx;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveStageIdx(idx);
                  }}
                  className={`relative p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#0B192C] border-[#0B192C] text-white"
                      : idx < activeStageIdx
                      ? "bg-slate-50 border-slate-300 text-[#0B192C]"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono tabular-nums mb-1">
                    <span>0{item.index}</span>
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          idx <= activeStageIdx ? item.accent : "#CBD5E1",
                      }}
                    />
                  </div>
                  <div className="font-display font-semibold text-xs truncate">
                    {item.shortName}
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="pipeline-rail-glow"
                      className="mt-1.5 h-0.5 rounded-full"
                      style={{ backgroundColor: item.accent }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Kinetic Animation Theater (Visual-First, Minimal Prose) */}
        <div className="bg-slate-100/70 border border-slate-200 rounded-xl p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span
                className="px-2.5 py-1 rounded text-xs font-mono font-bold text-white"
                style={{ backgroundColor: stage.accent }}
              >
                Stage 0{stage.index}
              </span>
              <h3 className="font-display font-bold text-lg text-[#0B192C]">
                {stage.name}
              </h3>
            </div>
            <span className="text-xs text-slate-600">{stage.purpose}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${stage.id}-${targetLangKey}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {renderAnimatedStageTheater()}
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
            <span>
              In: {stage.inputRepr} → Out: {stage.outputRepr}
            </span>
            <span className="shrink-0">Conceptual NMT illustration</span>
          </div>
        </div>
      </div>
    </section>
  );
}
