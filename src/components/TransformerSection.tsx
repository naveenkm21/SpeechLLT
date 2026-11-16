import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Play, Pause } from "lucide-react";
import {
  ATTENTION_SCENARIOS,
  TRANSFORMER_BLOCKS,
} from "../data/mtData";

const BLOCK_ORDER = [
  "source",
  "embeddings",
  "encoder-stack",
  "multi-head",
  "ffn",
  "decoder-stack",
  "probabilities",
  "target",
];

function BlockLiveSimulation({ blockId }: { blockId: string }) {
  if (blockId === "embeddings") {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
        <div className="text-[11px] font-mono text-slate-500 mb-2">
          Live Positional Wave Addition: sin(pos / 10000^(2i/d))
        </div>
        <svg viewBox="0 0 280 56" className="w-full h-14">
          <motion.path
            d="M 4 28 Q 38 4, 72 28 T 140 28 T 208 28 T 276 28"
            fill="none"
            stroke="#4285F4"
            strokeWidth="2"
            strokeDasharray="6 4"
            animate={{ strokeDashoffset: [20, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
          <motion.path
            d="M 4 28 Q 21 50, 38 28 T 72 28 T 106 28 T 140 28 T 174 28 T 208 28 T 242 28 T 276 28"
            fill="none"
            stroke="#FBBC05"
            strokeWidth="2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          />
        </svg>
      </div>
    );
  }

  if (blockId === "multi-head" || blockId === "encoder-stack") {
    const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853", "#4285F4", "#EA4335", "#FBBC05", "#34A853"];
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
        <div className="text-[11px] font-mono text-slate-500 mb-2">
          8 Parallel Attention Subspaces (64-dim each)
        </div>
        <div className="grid grid-cols-8 gap-1.5 h-12 items-end">
          {colors.map((c, idx) => (
            <motion.div
              key={idx}
              animate={{ height: ["35%", "95%", "45%"] }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
                delay: idx * 0.12,
                ease: "easeInOut",
              }}
              className="rounded-t flex items-end justify-center pb-1 text-[9px] font-mono text-white font-bold"
              style={{ backgroundColor: c }}
            >
              H{idx + 1}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (blockId === "decoder-stack") {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
        <div className="text-[11px] font-mono text-slate-500 mb-2">
          Causal Lower-Triangular Mask (Prevents Future Peeking)
        </div>
        <div className="grid grid-cols-5 gap-1 max-w-[180px]">
          {[0, 1, 2, 3, 4].map((r) =>
            [0, 1, 2, 3, 4].map((c) => {
              const allowed = c <= r;
              return (
                <motion.div
                  key={`${r}-${c}`}
                  animate={
                    allowed
                      ? { opacity: [0.55, 1, 0.55] }
                      : { opacity: 0.25 }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 1.6,
                    delay: r * 0.18,
                  }}
                  className="h-3.5 rounded-xs"
                  style={{
                    backgroundColor: allowed ? "#FBBC05" : "#94A3B8",
                  }}
                />
              );
            })
          )}
        </div>
      </div>
    );
  }

  if (blockId === "probabilities" || blockId === "target") {
    const candidates = [
      { tok: "lit", p: 94, c: "#34A853" },
      { tok: "étudie", p: 4, c: "#CBD5E1" },
      { tok: "lis", p: 2, c: "#CBD5E1" },
    ];
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1.5">
        <div className="text-[11px] font-mono text-slate-500">
          Softmax Vocabulary Distribution
        </div>
        {candidates.map((item) => (
          <div key={item.tok} className="flex items-center gap-2 text-[11px] font-mono">
            <span className="w-12 text-[#0B192C] font-semibold">{item.tok}</span>
            <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.p}%` }}
                transition={{ duration: 0.6 }}
                className="h-full rounded-full"
                style={{ backgroundColor: item.c }}
              />
            </div>
            <span className="w-8 text-right tabular-nums">{item.p}%</span>
          </div>
        ))}
      </div>
    );
  }

  // Default: FFN / Source pulse
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
      <div className="text-[11px] font-mono text-slate-500 mb-2">
        Dimension Expansion Flow: 512 → 2048 → 512
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="px-3 py-2 bg-white border border-slate-200 rounded text-xs font-mono">
          512d
        </div>
        <motion.div
          animate={{ scaleX: [0.85, 1.05, 0.85] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex-1 h-6 rounded bg-[#34A853]/20 border border-[#34A853] flex items-center justify-center text-xs font-mono font-bold text-[#0B192C]"
        >
          ReLU(2048d)
        </motion.div>
        <div className="px-3 py-2 bg-white border border-slate-200 rounded text-xs font-mono">
          512d
        </div>
      </div>
    </div>
  );
}

export function TransformerSection() {
  const [selectedBlockId, setSelectedBlockId] = useState("multi-head");
  const [autoPulse, setAutoPulse] = useState(true);
  const [scenarioId, setScenarioId] = useState<"tired" | "wide">("tired");
  const [selectedWordIdx, setSelectedWordIdx] = useState<number>(8);

  useEffect(() => {
    if (!autoPulse) return;
    const id = window.setInterval(() => {
      setSelectedBlockId((prev) => {
        const idx = BLOCK_ORDER.indexOf(prev);
        return BLOCK_ORDER[(idx + 1) % BLOCK_ORDER.length];
      });
    }, 2400);
    return () => window.clearInterval(id);
  }, [autoPulse]);

  const activeBlock =
    TRANSFORMER_BLOCKS.find((b) => b.id === selectedBlockId) ??
    TRANSFORMER_BLOCKS[3];

  const scenario =
    ATTENTION_SCENARIOS.find((s) => s.id === scenarioId) ??
    ATTENTION_SCENARIOS[0];

  const attentionRow = scenario.weights[selectedWordIdx] ?? scenario.weights[8];

  const topAttended = attentionRow
    .map((weight, idx) => ({ word: scenario.tokens[idx], idx, weight }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 4);

  const selectBlock = (id: string) => {
    setAutoPulse(false);
    setSelectedBlockId(id);
  };

  return (
    <section
      id="transformer"
      className="py-14 lg:py-20 border-b border-slate-200 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono tabular-nums text-slate-500 mb-1.5">
              04 · Deep Architectural Dive
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B192C] tracking-tight text-balance">
              Transformer Architecture &amp; Self-Attention
            </h2>
          </div>

          <button
            onClick={() => setAutoPulse((p) => !p)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B192C] text-white text-xs font-semibold cursor-pointer self-start lg:self-auto"
          >
            {autoPulse ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Signal Tour</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Animate Signal Tour</span>
              </>
            )}
          </button>
        </div>

        {/* Full-Width Interactive Transformer Architecture Diagram */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 mb-10">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Animated Block Schematic (7 cols) */}
            <div className="xl:col-span-7 space-y-3.5">
              {/* Top Horizontal Flow with Animated Connecting Line */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  TRANSFORMER_BLOCKS[0],
                  TRANSFORMER_BLOCKS[1],
                  TRANSFORMER_BLOCKS[6],
                  TRANSFORMER_BLOCKS[7],
                ].map((blk) => {
                  const active = selectedBlockId === blk.id;
                  return (
                    <button
                      key={blk.id}
                      onClick={() => selectBlock(blk.id)}
                      className={`relative p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        active
                          ? "bg-[#0B192C] border-[#0B192C] text-white shadow-sm"
                          : "bg-white border-slate-200 text-[#0B192C] hover:border-slate-300"
                      }`}
                    >
                      <div
                        className="text-[10px] font-mono mb-0.5"
                        style={{ color: active ? "#93C5FD" : blk.accent }}
                      >
                        {blk.zone}
                      </div>
                      <div className="font-display font-semibold text-xs leading-snug">
                        {blk.label}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Dual-Column Encoder & Decoder Stacks with Animated Cross-Attention Bridge */}
              <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center">
                {/* Encoder Stack (5 cols) */}
                <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => selectBlock("encoder-stack")}
                      className={`font-display font-bold text-sm cursor-pointer ${
                        selectedBlockId === "encoder-stack"
                          ? "text-[#4285F4]"
                          : "text-[#0B192C]"
                      }`}
                    >
                      Encoder Stack (6×)
                    </button>
                    <span className="text-[10px] font-mono text-slate-400">
                      Bidirectional
                    </span>
                  </div>

                  <button
                    onClick={() => selectBlock("multi-head")}
                    className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                      selectedBlockId === "multi-head"
                        ? "bg-[#4285F4]/12 border-[#4285F4]"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-[#0B192C]">
                      <span>Multi-Head Attention</span>
                      <span className="font-mono text-[10px] text-[#EA4335]">
                        8H
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                      Residual + LayerNorm
                    </div>
                  </button>

                  <div className="flex justify-center">
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                      className="text-xs font-mono text-[#4285F4]"
                    >
                      ↓
                    </motion.div>
                  </div>

                  <button
                    onClick={() => selectBlock("ffn")}
                    className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                      selectedBlockId === "ffn"
                        ? "bg-[#34A853]/12 border-[#34A853]"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-[#0B192C]">
                      <span>Feed-Forward (FFN)</span>
                      <span className="font-mono text-[10px] text-[#34A853]">
                        2048d
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                      Residual + LayerNorm
                    </div>
                  </button>
                </div>

                {/* Animated Cross-Attention Signal Bridge (1 col) */}
                <div className="md:col-span-1 flex md:flex-col items-center justify-center gap-1 py-1">
                  <svg viewBox="0 0 40 40" className="w-8 h-8">
                    <motion.path
                      d="M 4 20 L 36 20"
                      stroke="#4285F4"
                      strokeWidth="2.5"
                      strokeDasharray="5 5"
                      animate={{ strokeDashoffset: [20, 0] }}
                      transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                    />
                  </svg>
                  <span className="text-[10px] font-mono text-slate-500 text-center">
                    K, V
                  </span>
                </div>

                {/* Decoder Stack (5 cols) */}
                <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => selectBlock("decoder-stack")}
                      className={`font-display font-bold text-sm cursor-pointer ${
                        selectedBlockId === "decoder-stack"
                          ? "text-[#FBBC05]"
                          : "text-[#0B192C]"
                      }`}
                    >
                      Decoder Stack (6×)
                    </button>
                    <span className="text-[10px] font-mono text-slate-400">
                      Causal
                    </span>
                  </div>

                  {[
                    { name: "1. Masked Self-Attn", sub: "Causal -∞ Mask" },
                    { name: "2. Cross-Attention", sub: "Queries H_enc" },
                    { name: "3. Feed-Forward + Norm", sub: "512 → 2048 → 512" },
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => selectBlock("decoder-stack")}
                      className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                        selectedBlockId === "decoder-stack"
                          ? "bg-[#FBBC05]/12 border-[#FBBC05]"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="text-xs font-semibold text-[#0B192C]">
                        {item.name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">
                        {item.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Inspector Panel (5 cols) */}
            <div className="xl:col-span-5 bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-display font-bold text-lg text-[#0B192C]">
                  {activeBlock.label}
                </h3>
                <span className="text-[11px] font-mono tabular-nums text-slate-500">
                  {activeBlock.tensorShape}
                </span>
              </div>

              <BlockLiveSimulation blockId={activeBlock.id} />

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs text-[#0B192C] overflow-x-auto">
                {activeBlock.formula}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeBlock.summary} {activeBlock.whyItMatters}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Animated Attention Arcs + Heatmap */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
            <div>
              <div className="text-xs font-semibold text-[#EA4335] mb-0.5">
                Live Self-Attention Coreference
              </div>
              <h3 className="font-display font-bold text-xl text-[#0B192C]">
                Click Any Word to Trace Its Attention Rays
              </h3>
            </div>

            <div
              role="tablist"
              aria-label="Sentence context variant"
              className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0"
            >
              {ATTENTION_SCENARIOS.map((sc) => {
                const active = sc.id === scenarioId;
                return (
                  <button
                    key={sc.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setScenarioId(sc.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? "bg-white text-[#0B192C] shadow-sm"
                        : "text-slate-600 hover:text-[#0B192C]"
                    }`}
                  >
                    {sc.id === "tired" ? '"...was tired."' : '"...was wide."'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Animated SVG Attention Arcs Above Clickable Words */}
          <div className="mb-6 overflow-x-auto">
            <div className="min-w-[720px]">
              <svg
                viewBox="0 0 840 125"
                className="w-full h-32"
                aria-label="Animated attention arcs from selected query word"
              >
                {scenario.tokens.map((tok, idx) => {
                  const weight = attentionRow[idx] ?? 0;
                  const xFrom = 35 + selectedWordIdx * 70;
                  const xTo = 35 + idx * 70;
                  const dist = Math.abs(idx - selectedWordIdx);
                  const arcHeight = Math.max(12, 108 - dist * 10);
                  const isStrong = weight >= 0.15 && idx !== selectedWordIdx;

                  if (idx === selectedWordIdx) return null;
                  return (
                    <g key={`arc-${idx}`}>
                      <path
                        d={`M ${xFrom} 112 Q ${(xFrom + xTo) / 2} ${arcHeight}, ${xTo} 112`}
                        fill="none"
                        stroke={isStrong ? "#4285F4" : "#E2E8F0"}
                        strokeWidth={Math.max(1, weight * 9)}
                        opacity={Math.max(0.2, Math.min(1, weight * 1.8))}
                      />
                      {isStrong && (
                        <motion.path
                          d={`M ${xFrom} 112 Q ${(xFrom + xTo) / 2} ${arcHeight}, ${xTo} 112`}
                          fill="none"
                          stroke="#EA4335"
                          strokeWidth={Math.max(1.5, weight * 6)}
                          strokeDasharray="6 10"
                          animate={{ strokeDashoffset: [32, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.1,
                            ease: "linear",
                          }}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Clickable Token Strip aligned to SVG coordinates */}
              <div className="grid grid-cols-12 gap-1.5">
                {scenario.tokens.map((tok, idx) => {
                  const isQuery = idx === selectedWordIdx;
                  const weight = attentionRow[idx] ?? 0;
                  const isStrongTarget = !isQuery && weight >= 0.2;
                  return (
                    <button
                      key={`${tok}-${idx}`}
                      onClick={() => setSelectedWordIdx(idx)}
                      className={`py-2 px-1 rounded-lg border text-center font-mono text-xs transition-all cursor-pointer ${
                        isQuery
                          ? "bg-[#0B192C] text-white border-[#0B192C]"
                          : isStrongTarget
                          ? "bg-[#4285F4]/12 border-[#4285F4] text-[#0B192C] font-bold"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <div className="truncate">{tok}</div>
                      <div
                        className={`text-[10px] tabular-nums mt-0.5 ${
                          isQuery ? "text-blue-200" : "text-slate-500"
                        }`}
                      >
                        {isQuery ? "Q" : weight.toFixed(2)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Heatmap + Live Q·K·V Bars */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 overflow-x-auto">
              <div className="inline-block min-w-[520px] border border-slate-200 rounded-lg p-3 bg-slate-50">
                <div className="grid grid-cols-[60px_repeat(12,minmax(32px,1fr))] gap-1 mb-1">
                  <div className="text-[10px] font-mono text-slate-400 text-right pr-2">
                    Q \ K
                  </div>
                  {scenario.tokens.map((tok, colIdx) => (
                    <div
                      key={`col-${colIdx}`}
                      className="text-[10px] font-mono text-slate-600 text-center truncate"
                    >
                      {tok}
                    </div>
                  ))}
                </div>
                {scenario.tokens.map((rowTok, rowIdx) => {
                  const isSelectedRow = rowIdx === selectedWordIdx;
                  return (
                    <div
                      key={`row-${rowIdx}`}
                      onClick={() => setSelectedWordIdx(rowIdx)}
                      className={`grid grid-cols-[60px_repeat(12,minmax(32px,1fr))] gap-1 items-center py-0.5 rounded cursor-pointer ${
                        isSelectedRow ? "ring-1 ring-[#0B192C] bg-white" : ""
                      }`}
                    >
                      <div
                        className={`text-[10px] font-mono pr-2 text-right truncate ${
                          isSelectedRow ? "font-bold text-[#0B192C]" : "text-slate-500"
                        }`}
                      >
                        {rowTok}
                      </div>
                      {scenario.weights[rowIdx].map((w, colIdx) => {
                        const alpha = Math.min(0.95, Math.max(0.05, w * 1.45));
                        return (
                          <div
                            key={`cell-${rowIdx}-${colIdx}`}
                            className="h-6 rounded flex items-center justify-center text-[9px] font-mono tabular-nums"
                            style={{
                              backgroundColor: `rgba(66, 133, 244, ${alpha})`,
                              color: w >= 0.35 ? "#FFFFFF" : "#0F172A",
                            }}
                          >
                            {w.toFixed(2).replace("0.", ".")}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visual Q / K / V Live Output Mix */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <div>
                <div className="text-xs font-semibold text-[#0B192C]">
                  Q · K → Softmax → Weighted Value (V) Blend
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {scenario.explanation}
                </p>
              </div>

              <div className="space-y-2.5">
                {topAttended.map((item) => (
                  <div
                    key={item.idx}
                    className="space-y-1 text-xs font-mono tabular-nums"
                  >
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#0B192C]">
                        V("{item.word}")
                      </span>
                      <span className="text-[#4285F4] font-semibold">
                        {(item.weight * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ width: `${Math.round(item.weight * 100)}%` }}
                        transition={{ duration: 0.35 }}
                        className="h-full bg-[#4285F4] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
