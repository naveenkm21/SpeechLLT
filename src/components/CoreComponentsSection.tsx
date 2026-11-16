import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CORE_COMPONENTS, type CoreComponentSpec } from "../data/mtData";

function AnimatedMicroDiagram({
  type,
  accent,
}: {
  type: CoreComponentSpec["diagramType"];
  accent: string;
}) {
  switch (type) {
    case "tokenization":
      return (
        <svg viewBox="0 0 220 56" className="w-full h-14" aria-hidden="true">
          <rect x="4" y="14" width="66" height="28" rx="4" fill="#FFFFFF" stroke="#CBD5E1" />
          <text x="37" y="31" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fill="#0B192C">
            untranslatable
          </text>
          <motion.path
            d="M 74 28 L 92 28"
            stroke={accent}
            strokeWidth="2"
            strokeDasharray="4 4"
            animate={{ strokeDashoffset: [16, 0] }}
            transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
          />
          {[
            { x: 96, w: 24, t: "un" },
            { x: 124, w: 32, t: "trans" },
            { x: 160, w: 24, t: "lat" },
            { x: 188, w: 28, t: "able" },
          ].map((b, i) => (
            <motion.g
              key={b.t}
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.15 }}
            >
              <rect x={b.x} y="14" width={b.w} height="28" rx="4" fill="#EFF6FF" stroke={accent} />
              <text x={b.x + b.w / 2} y="31" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fill="#0B192C">
                {b.t}
              </text>
            </motion.g>
          ))}
        </svg>
      );

    case "embedding":
      return (
        <svg viewBox="0 0 220 56" className="w-full h-14" aria-hidden="true">
          <line x1="20" y1="48" x2="200" y2="48" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="20" y1="8" x2="20" y2="48" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="20" y1="48" x2="88" y2="18" stroke={accent} strokeWidth="2" />
          <motion.circle
            cx="88"
            cy="18"
            r="4"
            fill={accent}
            animate={{ r: [3.5, 5.5, 3.5] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          />
          <text x="96" y="20" fontSize="9" fontFamily="monospace" fill="#0B192C">king</text>
          <line x1="20" y1="48" x2="150" y2="20" stroke="#4285F4" strokeWidth="2" />
          <motion.circle
            cx="150"
            cy="20"
            r="4"
            fill="#4285F4"
            animate={{ r: [3.5, 5.5, 3.5] }}
            transition={{ repeat: Infinity, duration: 1.8, delay: 0.4 }}
          />
          <text x="158" y="22" fontSize="9" fontFamily="monospace" fill="#0B192C">queen</text>
        </svg>
      );

    case "positional":
      return (
        <svg viewBox="0 0 220 56" className="w-full h-14" aria-hidden="true">
          <motion.path
            d="M 8 28 Q 34 4, 60 28 T 112 28 T 164 28 T 212 28"
            fill="none"
            stroke={accent}
            strokeWidth="2.25"
            strokeDasharray="6 4"
            animate={{ strokeDashoffset: [20, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
          />
          <path
            d="M 8 28 Q 21 48, 34 28 T 60 28 T 86 28 T 112 28 T 138 28 T 164 28 T 190 28 T 212 28"
            fill="none"
            stroke="#4285F4"
            strokeWidth="1.25"
          />
        </svg>
      );

    case "self-attention":
      return (
        <svg viewBox="0 0 220 56" className="w-full h-14" aria-hidden="true">
          {[28, 76, 124, 172].map((x, idx) => (
            <g key={x}>
              <circle cx={x} cy="40" r="7" fill="#FFFFFF" stroke="#0B192C" strokeWidth="1.5" />
              <text x={x} y="43" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#0B192C">
                w{idx + 1}
              </text>
            </g>
          ))}
          <motion.path
            d="M 28 33 Q 76 4, 124 33"
            fill="none"
            stroke={accent}
            strokeWidth="2"
            strokeDasharray="5 5"
            animate={{ strokeDashoffset: [20, 0] }}
            transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
          />
          <motion.path
            d="M 76 33 Q 124 12, 172 33"
            fill="none"
            stroke="#4285F4"
            strokeWidth="1.75"
            strokeDasharray="5 5"
            animate={{ strokeDashoffset: [20, 0] }}
            transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
          />
        </svg>
      );

    case "multi-head":
      return (
        <svg viewBox="0 0 220 56" className="w-full h-14" aria-hidden="true">
          {["#4285F4", "#EA4335", "#FBBC05", "#34A853"].map((color, i) => (
            <motion.g
              key={color}
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.18 }}
            >
              <rect
                x={18 + i * 48}
                y="14"
                width="38"
                height="28"
                rx="5"
                fill="#FFFFFF"
                stroke={color}
                strokeWidth="1.75"
              />
              <text
                x={37 + i * 48}
                y="31"
                textAnchor="middle"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="700"
                fill="#0B192C"
              >
                H{i + 1}
              </text>
            </motion.g>
          ))}
        </svg>
      );

    case "encoder":
      return (
        <svg viewBox="0 0 220 56" className="w-full h-14" aria-hidden="true">
          {[16, 62, 108, 154].map((x, idx) => (
            <motion.rect
              key={x}
              x={x}
              y="10"
              width="36"
              height="34"
              rx="5"
              fill="#EFF6FF"
              stroke={accent}
              strokeWidth="1.5"
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ repeat: Infinity, duration: 1.6, delay: idx * 0.25 }}
            />
          ))}
        </svg>
      );

    case "decoder":
      return (
        <svg viewBox="0 0 220 56" className="w-full h-14" aria-hidden="true">
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <motion.rect
                key={`${r}-${c}`}
                x={62 + c * 22}
                y={8 + r * 10}
                width="18"
                height="8"
                rx="1.5"
                fill={c <= r ? accent : "#CBD5E1"}
                animate={c <= r ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.3 }}
                transition={{ repeat: Infinity, duration: 1.5, delay: r * 0.2 }}
              />
            ))
          )}
        </svg>
      );

    case "ffn":
    default:
      return (
        <svg viewBox="0 0 220 56" className="w-full h-14" aria-hidden="true">
          <rect x="18" y="18" width="32" height="20" rx="3" fill="#FFFFFF" stroke="#0B192C" />
          <text x="34" y="31" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#0B192C">512</text>
          <motion.rect
            x="80"
            y="8"
            width="56"
            height="40"
            rx="4"
            fill="#FEF9C3"
            stroke={accent}
            strokeWidth="1.5"
            animate={{ scale: [0.96, 1.03, 0.96] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          />
          <text x="108" y="31" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill="#0B192C">2048</text>
          <rect x="166" y="18" width="32" height="20" rx="3" fill="#FFFFFF" stroke="#0B192C" />
          <text x="182" y="31" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#0B192C">512</text>
        </svg>
      );
  }
}

export function CoreComponentsSection() {
  const [expandedId, setExpandedId] = useState<string>("");

  return (
    <section
      id="components"
      className="py-14 lg:py-18 border-b border-slate-200 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono tabular-nums text-slate-500 mb-1.5">
              05 · Visual Building Blocks
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B192C] tracking-tight text-balance">
              Core Components in Motion
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Each animated micro-diagram illustrates a core Transformer building
            block. Click any card to inspect its formula and example.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {CORE_COMPONENTS.map((comp) => {
            const isOpen = expandedId === comp.id;
            return (
              <div
                key={comp.id}
                className={`bg-white border rounded-xl transition-all ${
                  isOpen ? "border-[#0B192C] shadow-sm" : "border-slate-200"
                }`}
              >
                <button
                  onClick={() => setExpandedId(isOpen ? "" : comp.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 text-left space-y-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] rounded-xl"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display font-bold text-sm sm:text-base text-[#0B192C]">
                      {comp.name}
                    </h3>
                    <span className="text-slate-400 shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </div>

                  {/* Always-visible Animated Visual */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2">
                    <AnimatedMicroDiagram
                      type={comp.diagramType}
                      accent={comp.accent}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-2 border-t border-slate-100 space-y-2.5 text-xs">
                    <p className="text-slate-600 leading-relaxed">
                      {comp.functionDesc}
                    </p>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] text-[#0B192C] break-words">
                      {comp.exampleCode}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
