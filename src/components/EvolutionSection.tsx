import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EVOLUTION_GENERATIONS } from "../data/mtData";

function AnimatedEraEngine({ era }: { era: "rbmt" | "smt" | "nmt" }) {
  if (era === "rbmt") {
    const pairs = [
      { en: "The", fr: "Le", ok: false },
      { en: "student", fr: "étudiant", ok: true },
      { en: "reads", fr: "lit", ok: true },
      { en: "a", fr: "un", ok: true },
      { en: "book", fr: "livre", ok: true },
    ];
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-4">
          <span>Mechanical Dictionary + Rule Tree Lookup</span>
          <span className="text-[#EA4335] font-semibold">Rigid 1:1 Mapping</span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {pairs.map((p, idx) => (
            <motion.div
              key={p.en}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.14 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-full py-2 px-1 text-center rounded bg-slate-100 font-mono text-xs text-[#0B192C]">
                {p.en}
              </div>
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  delay: idx * 0.2,
                }}
                className="text-xs font-mono text-slate-400"
              >
                ↓ rule
              </motion.div>
              <div
                className={`w-full py-2 px-1 text-center rounded border font-mono text-xs font-semibold ${
                  p.ok
                    ? "bg-slate-50 border-slate-200 text-[#0B192C]"
                    : "bg-red-50 border-[#EA4335] text-[#EA4335]"
                }`}
              >
                {p.fr}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 text-xs font-mono text-[#EA4335] text-center">
          Rule Gap: "Le étudiant" lacks vowel-elision rule → stiff literal output
        </div>
      </div>
    );
  }

  if (era === "smt") {
    const candidates = [
      { phrase: "L'étudiant lit un livre", prob: 0.84, bar: "84%", winner: true },
      { phrase: "L'élève lit un bouquin", prob: 0.51, bar: "51%", winner: false },
      { phrase: "Le étudiant lire livre", prob: 0.22, bar: "22%", winner: false },
    ];
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-4">
          <span>Phrase-Table Probability Race · P(f|e) × P(e)</span>
          <span className="text-[#FBBC05] font-semibold">Beam Search</span>
        </div>

        <div className="space-y-3">
          {candidates.map((c, idx) => (
            <div key={c.phrase} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className={c.winner ? "font-bold text-[#0B192C]" : "text-slate-500"}>
                  {c.phrase}
                </span>
                <span className="tabular-nums text-slate-600">
                  P = {c.prob.toFixed(2)}
                </span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: c.bar }}
                  transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: c.winner ? "#FBBC05" : "#CBD5E1",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs font-mono text-slate-500 text-center">
          Local phrase windows score fluency, but long-distance grammar still fragments
        </div>
      </div>
    );
  }

  // NMT animated continuous vector field
  const nodes = ["The", "student", "reads", "a", "book"];
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-3">
        <span>Continuous Neural Attention &amp; Cross-Order Mapping</span>
        <span className="text-[#4285F4] font-semibold">End-to-End Transformer</span>
      </div>

      <svg
        viewBox="0 0 560 150"
        className="w-full h-36"
        aria-label="Animated neural translation vector flow"
      >
        {/* Source nodes on top */}
        {nodes.map((word, idx) => {
          const x = 60 + idx * 110;
          return (
            <g key={word}>
              {/* Cross-attention arcs */}
              {[0, 1, 2, 3].map((tIdx) => {
                const tx = 85 + tIdx * 130;
                const active =
                  (idx === 1 && tIdx === 0) ||
                  (idx === 2 && tIdx === 3) ||
                  (idx === 4 && tIdx === 2) ||
                  (idx === 3 && tIdx === 1);
                return (
                  <g key={`arc-${idx}-${tIdx}`}>
                    <path
                      d={`M ${x} 36 C ${x} 80, ${tx} 70, ${tx} 112`}
                      fill="none"
                      stroke={active ? "#4285F4" : "#E2E8F0"}
                      strokeWidth={active ? 2 : 1}
                    />
                    {active && (
                      <motion.path
                        d={`M ${x} 36 C ${x} 80, ${tx} 70, ${tx} 112`}
                        fill="none"
                        stroke="#34A853"
                        strokeWidth="2.5"
                        strokeDasharray="6 10"
                        animate={{ strokeDashoffset: [32, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.1,
                          ease: "linear",
                          delay: idx * 0.15,
                        }}
                      />
                    )}
                  </g>
                );
              })}

              <rect
                x={x - 36}
                y="10"
                width="72"
                height="26"
                rx="6"
                fill="#EFF6FF"
                stroke="#4285F4"
              />
              <text
                x={x}
                y="27"
                textAnchor="middle"
                fontSize="11"
                fontFamily="monospace"
                fill="#0B192C"
              >
                {word}
              </text>
            </g>
          );
        })}

        {/* Tamil SOV Output nodes on bottom showing dynamic reordering */}
        {["மாணவர்", "ஒரு", "புத்தகத்தை", "படிக்கிறார்"].map((tWord, tIdx) => {
          const tx = 85 + tIdx * 130;
          return (
            <g key={tWord}>
              <rect
                x={tx - 48}
                y="112"
                width="96"
                height="28"
                rx="6"
                fill="#ECFDF5"
                stroke="#34A853"
              />
              <text
                x={tx}
                y="130"
                textAnchor="middle"
                fontSize="10"
                fontFamily="sans-serif"
                fontWeight="600"
                fill="#0B192C"
              >
                {tWord}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-2 text-xs font-mono text-[#34A853] text-center">
        Global attention reorders SVO (&ldquo;reads a book&rdquo;) → SOV (&ldquo;ஒரு புத்தகத்தை படிக்கிறார்&rdquo;) fluidly
      </div>
    </div>
  );
}

export function EvolutionSection() {
  const [selectedId, setSelectedId] = useState<"rbmt" | "smt" | "nmt">("nmt");
  const current =
    EVOLUTION_GENERATIONS.find((g) => g.id === selectedId) ??
    EVOLUTION_GENERATIONS[2];

  return (
    <section id="evolution" className="py-14 lg:py-18 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <div className="text-xs font-mono tabular-nums text-slate-500 mb-1.5">
              02 · Historical Paradigms
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B192C] tracking-tight text-balance">
              Evolution of Machine Translation
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Switch generations to watch how translation transformed from rigid
            rules to probability races to neural attention.
          </p>
        </div>

        {/* Interactive Era Switcher */}
        <div
          role="tablist"
          aria-label="Generations of Machine Translation"
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6"
        >
          {EVOLUTION_GENERATIONS.map((gen) => {
            const isSelected = gen.id === selectedId;
            return (
              <button
                key={gen.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedId(gen.id)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                  isSelected
                    ? "bg-[#0B192C] border-[#0B192C] text-white shadow-sm"
                    : "bg-white border-slate-200 hover:border-slate-300 text-[#0B192C]"
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span
                    className="font-semibold"
                    style={{ color: isSelected ? "#93C5FD" : gen.accent }}
                  >
                    {gen.code}
                  </span>
                  <span className={`font-mono tabular-nums ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                    {gen.era}
                  </span>
                </div>
                <div className="font-display font-bold text-sm sm:text-base">
                  {gen.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Animated Engine + Compact Visual Spec */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 space-y-5"
          >
            {/* Live Animated Era Visual */}
            <AnimatedEraEngine era={current.id} />

            {/* Compact 3-Column Visual Summary (Less prose, fast scanning) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="font-semibold text-[#0B192C] mb-1.5">
                  Core Mechanism
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {current.tagline}
                </p>
                <div className="mt-2 font-mono text-[11px] text-slate-500">
                  {current.diagramSteps.map((s) => s.label).join(" → ")}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="font-semibold text-[#34A853] mb-1.5">
                  Key Strengths
                </div>
                <ul className="space-y-1 text-slate-600">
                  {current.advantages.slice(0, 2).map((a) => (
                    <li key={a}>+ {a}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="font-semibold text-[#EA4335] mb-1.5">
                  Bottlenecks
                </div>
                <ul className="space-y-1 text-slate-600">
                  {current.limitations.slice(0, 2).map((l) => (
                    <li key={l}>− {l}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
