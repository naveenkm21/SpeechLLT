import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown } from "lucide-react";
import { EXHIBIT_SECTIONS } from "../data/mtData";

interface TargetPreview {
  id: "ta" | "fr" | "hi";
  language: string;
  scriptLabel: string;
  text: string;
  tokens: string[];
  accent: string;
  /** Mapping from source token index [0..4] to target token index */
  alignments: [number, number][];
}

const HERO_TARGETS: TargetPreview[] = [
  {
    id: "ta",
    language: "Tamil",
    scriptLabel: "Dravidian · SOV",
    text: "மாணவர் ஒரு புத்தகத்தை படிக்கிறார்.",
    tokens: ["மாணவர்", "ஒரு", "புத்தகத்தை", "படிக்கிறார்"],
    accent: "#34A853",
    alignments: [
      [1, 0], // student -> மாணவர்
      [3, 1], // a -> ஒரு
      [4, 2], // book -> புத்தகத்தை
      [2, 3], // reads -> படிக்கிறார் (SOV swap!)
    ],
  },
  {
    id: "fr",
    language: "French",
    scriptLabel: "Romance · SVO",
    text: "L'étudiant lit un livre.",
    tokens: ["L'", "étudiant", "lit", "un", "livre"],
    accent: "#4285F4",
    alignments: [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
    ],
  },
  {
    id: "hi",
    language: "Hindi",
    scriptLabel: "Indo-Aryan · SOV",
    text: "छात्र एक किताब पढ़ता है।",
    tokens: ["छात्र", "एक", "किताब", "पढ़ता है"],
    accent: "#EA4335",
    alignments: [
      [1, 0],
      [3, 1],
      [4, 2],
      [2, 3],
    ],
  },
];

const SOURCE_TOKENS = ["The", "student", "reads", "a", "book"];
const TOKEN_COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853", "#4285F4"];

export function HeroSection() {
  const [selectedTarget, setSelectedTarget] = useState<"ta" | "fr" | "hi">("ta");
  const [activeTokenIdx, setActiveTokenIdx] = useState(1);

  const activeTarget =
    HERO_TARGETS.find((t) => t.id === selectedTarget) ?? HERO_TARGETS[0];

  // Auto-cycle active neural token pulse so the hero feels continuously alive
  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveTokenIdx((prev) => (prev + 1) % SOURCE_TOKENS.length);
    }, 1400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="introduction"
      className="relative border-b border-slate-200 bg-white exhibit-grid-bg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 lg:pt-12 lg:pb-14">
        {/* Top Metadata Line */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mb-4">
          <span className="text-[#4285F4] font-semibold">
            Google Translate: Inside the Machine
          </span>
          <span aria-hidden="true">·</span>
          <span>Interactive Neural Machine Translation Exhibit</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Crisp Title, Short Subtitle, CTA */}
          <div className="lg:col-span-5 space-y-5">
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] tracking-tight text-[#0B192C] text-balance">
              How Does a Machine Understand Another Language?
            </h1>
            <p className="text-base text-slate-600 leading-relaxed max-w-md">
              Watch sentences shatter into tokens, travel through attention
              layers, and reassemble into new grammars in real time.
            </p>

            <div className="pt-1">
              <a
                href="#pipeline"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#0B192C] hover:bg-[#172D4A] text-white text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] focus-visible:ring-offset-2"
              >
                <span>Explore the Translation Process</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: High-Motion Animated Neural Translation Interface */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border border-slate-200 rounded-xl shadow-sm p-5 sm:p-6 overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background:
                    "linear-gradient(90deg, #4285F4 0%, #EA4335 34%, #FBBC05 68%, #34A853 100%)",
                }}
              />

              {/* Floating Animated Script Glyphs */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  {[
                    { g: "A", c: "#4285F4", d: 0 },
                    { g: "அ", c: "#34A853", d: 0.4 },
                    { g: "अ", c: "#EA4335", d: 0.8 },
                    { g: "É", c: "#FBBC05", d: 1.2 },
                    { g: "文", c: "#4285F4", d: 1.6 },
                  ].map((item) => (
                    <motion.span
                      key={item.g}
                      animate={{ y: [0, -4, 0], opacity: [0.55, 1, 0.55] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.8,
                        delay: item.d,
                        ease: "easeInOut",
                      }}
                      className="w-6 h-6 rounded border border-slate-200 bg-slate-50 flex items-center justify-center font-semibold"
                      style={{ color: item.c }}
                    >
                      {item.g}
                    </motion.span>
                  ))}
                </div>

                {/* Target Language Switcher */}
                <div
                  role="tablist"
                  aria-label="Hero target language"
                  className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg"
                >
                  {HERO_TARGETS.map((target) => {
                    const active = target.id === selectedTarget;
                    return (
                      <button
                        key={target.id}
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSelectedTarget(target.id)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                          active
                            ? "bg-white text-[#0B192C] shadow-sm"
                            : "text-slate-600 hover:text-[#0B192C]"
                        }`}
                      >
                        {target.language}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Animated SVG Neural Routing Canvas */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                {/* Source Tokens Column */}
                <div className="sm:col-span-4 space-y-1.5">
                  <div className="text-[11px] font-semibold text-[#4285F4] mb-1">
                    English (SVO)
                  </div>
                  {SOURCE_TOKENS.map((tok, i) => {
                    const isHot = i === activeTokenIdx;
                    return (
                      <motion.button
                        key={tok}
                        onClick={() => setActiveTokenIdx(i)}
                        animate={{
                          scale: isHot ? 1.03 : 1,
                          x: isHot ? 3 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        className={`w-full px-3 py-2 rounded-lg border text-left font-mono text-xs flex items-center justify-between cursor-pointer transition-colors ${
                          isHot
                            ? "bg-[#0B192C] text-white border-[#0B192C]"
                            : "bg-slate-50 text-[#0B192C] border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="font-semibold">{tok}</span>
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: TOKEN_COLORS[i] }}
                        />
                      </motion.button>
                    );
                  })}
                </div>

                {/* Animated Multi-Layer Neural Pathways SVG */}
                <div className="sm:col-span-4 py-1">
                  <svg
                    viewBox="0 0 220 210"
                    className="w-full h-44 sm:h-52"
                    aria-label="Animated neural network translation pathways"
                  >
                    {/* Hidden Layer 1 & Layer 2 Neural Nodes */}
                    {[35, 85, 135, 180].map((y, idx) => (
                      <g key={`layer-${y}`}>
                        {/* Faint mesh connections */}
                        {SOURCE_TOKENS.map((_, sIdx) => {
                          const sy = 22 + sIdx * 42;
                          const isActive = sIdx === activeTokenIdx;
                          return (
                            <path
                              key={`mesh-l-${sIdx}-${idx}`}
                              d={`M 6 ${sy} C 45 ${sy}, 45 ${y}, 76 ${y}`}
                              fill="none"
                              stroke={isActive ? TOKEN_COLORS[sIdx] : "#E2E8F0"}
                              strokeWidth={isActive ? 2 : 1}
                              opacity={isActive ? 0.9 : 0.65}
                            />
                          );
                        })}

                        {/* Animated Flowing Signal Pulse from active source token */}
                        <motion.path
                          d={`M 6 ${22 + activeTokenIdx * 42} C 45 ${22 + activeTokenIdx * 42}, 45 ${y}, 76 ${y}`}
                          fill="none"
                          stroke={TOKEN_COLORS[activeTokenIdx]}
                          strokeWidth="2.5"
                          strokeDasharray="8 14"
                          animate={{ strokeDashoffset: [44, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.9,
                            ease: "linear",
                          }}
                        />

                        {/* Cross-layer bridge */}
                        <motion.path
                          d={`M 84 ${y} C 110 ${y}, 110 ${215 - y}, 136 ${215 - y}`}
                          fill="none"
                          stroke="#94A3B8"
                          strokeWidth="1.25"
                          strokeDasharray="4 6"
                          animate={{ strokeDashoffset: [20, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.4,
                            ease: "linear",
                            delay: idx * 0.15,
                          }}
                        />

                        {/* Encoder Node */}
                        <motion.circle
                          cx="80"
                          cy={y}
                          r="7"
                          fill="#FFFFFF"
                          stroke="#4285F4"
                          strokeWidth="2"
                          animate={{ r: [6.5, 8, 6.5] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.6,
                            delay: idx * 0.2,
                          }}
                        />

                        {/* Decoder Node */}
                        <motion.circle
                          cx="140"
                          cy={215 - y}
                          r="7"
                          fill="#FFFFFF"
                          stroke={activeTarget.accent}
                          strokeWidth="2"
                          animate={{ r: [6.5, 8, 6.5] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.6,
                            delay: idx * 0.25 + 0.3,
                          }}
                        />
                      </g>
                    ))}

                    {/* Output Pathways into Target Tokens */}
                    {activeTarget.alignments.map(([sIdx, tIdx]) => {
                      const isHot = sIdx === activeTokenIdx;
                      const ty = 26 + tIdx * 44;
                      const midY = 215 - [35, 85, 135, 180][tIdx % 4];
                      return (
                        <g key={`out-${sIdx}-${tIdx}`}>
                          <path
                            d={`M 146 ${midY} C 180 ${midY}, 180 ${ty}, 214 ${ty}`}
                            fill="none"
                            stroke={isHot ? activeTarget.accent : "#E2E8F0"}
                            strokeWidth={isHot ? 2.5 : 1}
                          />
                          {isHot && (
                            <motion.path
                              d={`M 146 ${midY} C 180 ${midY}, 180 ${ty}, 214 ${ty}`}
                              fill="none"
                              stroke={activeTarget.accent}
                              strokeWidth="3"
                              strokeDasharray="7 12"
                              animate={{ strokeDashoffset: [38, 0] }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.75,
                                ease: "linear",
                              }}
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Target Tokens Column */}
                <div className="sm:col-span-4 space-y-1.5">
                  <div
                    className="text-[11px] font-semibold mb-1 flex items-center justify-between"
                    style={{ color: activeTarget.accent }}
                  >
                    <span>{activeTarget.language}</span>
                    <span className="font-mono text-slate-400">
                      {activeTarget.scriptLabel.split("·")[1]}
                    </span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTarget.id}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.18 }}
                      className="space-y-1.5"
                    >
                      {activeTarget.tokens.map((tok, tIdx) => {
                        const mappedSource = activeTarget.alignments.find(
                          ([, t]) => t === tIdx
                        )?.[0];
                        const isAlignedHot = mappedSource === activeTokenIdx;
                        return (
                          <motion.div
                            key={tok}
                            animate={{
                              scale: isAlignedHot ? 1.04 : 1,
                              x: isAlignedHot ? -2 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className={`px-3 py-2 rounded-lg border font-mono text-xs flex items-center justify-between ${
                              isAlignedHot
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-slate-50 text-[#0B192C] border-slate-200"
                            }`}
                          >
                            <span className="font-semibold truncate">{tok}</span>
                            <span className="text-[10px] opacity-70 tabular-nums">
                              y{tIdx + 1}
                            </span>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Resulting Sentence Strip */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-mono text-slate-500">
                  &ldquo;The student reads a book.&rdquo;
                </span>
                <span className="font-display font-bold text-sm text-[#0B192C]">
                  → {activeTarget.text}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Exhibit Directory */}
        <div className="mt-8 pt-5 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          {EXHIBIT_SECTIONS.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:border-[#4285F4] transition-colors text-xs"
            >
              <span className="font-mono tabular-nums text-slate-400">
                {sec.number}
              </span>
              <span className="font-medium text-[#0B192C] truncate">
                {sec.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
