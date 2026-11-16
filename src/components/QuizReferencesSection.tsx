import { useState } from "react";
import { Check, X, RotateCcw, ExternalLink } from "lucide-react";
import { ACADEMIC_REFERENCES, QUIZ_QUESTIONS } from "../data/mtData";

const REF_CATEGORIES = [
  "All",
  "Foundational Architecture",
  "Google Translate Research",
  "Tokenization & Evaluation",
  "Official Documentation",
] as const;

export function QuizReferencesSection() {
  // Quiz State
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedRefCategory, setSelectedRefCategory] =
    useState<(typeof REF_CATEGORIES)[number]>("All");

  const answeredCount = Object.keys(answers).length;
  const correctCount = QUIZ_QUESTIONS.reduce((acc, q) => {
    return acc + (answers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);
  const allAnswered = answeredCount === QUIZ_QUESTIONS.length;

  const filteredRefs =
    selectedRefCategory === "All"
      ? ACADEMIC_REFERENCES
      : ACADEMIC_REFERENCES.filter((r) => r.category === selectedRefCategory);

  return (
    <>
      {/* Section 11: Interactive Knowledge Check */}
      <section
        id="quiz"
        className="py-16 lg:py-24 border-b border-slate-200 bg-slate-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono tabular-nums text-slate-500 mb-2">
                11 · Concept Verification
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B192C] tracking-tight text-balance">
                Knowledge Check
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Test your understanding of Transformer mechanics, tokenization,
                evaluation metrics, and Google Translate research.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="px-3.5 py-2 bg-white border border-slate-200 rounded-lg font-mono text-xs tabular-nums text-[#0B192C]">
                Score: <strong>{correctCount}</strong> / {QUIZ_QUESTIONS.length}
              </div>
              {answeredCount > 0 && (
                <button
                  onClick={() => setAnswers({})}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {QUIZ_QUESTIONS.map((q, qIdx) => {
              const chosen = answers[q.id];
              const hasAnswered = chosen !== undefined;
              const isCorrect = chosen === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-display font-semibold text-base text-[#0B192C]">
                      <span className="font-mono text-slate-400 mr-2 tabular-nums">
                        Q{qIdx + 1}.
                      </span>
                      {q.question}
                    </h3>
                    {hasAnswered && (
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold shrink-0 ${
                          isCorrect ? "text-[#34A853]" : "text-[#EA4335]"
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Correct</span>
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4" />
                            <span>Incorrect</span>
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isPicked = chosen === optIdx;
                      const isRightOption = q.correctIndex === optIdx;

                      let btnStyle =
                        "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300";
                      if (hasAnswered) {
                        if (isRightOption) {
                          btnStyle =
                            "bg-emerald-50 border-[#34A853] text-[#0B192C] font-medium";
                        } else if (isPicked && !isRightOption) {
                          btnStyle =
                            "bg-red-50 border-[#EA4335] text-red-900";
                        } else {
                          btnStyle =
                            "bg-slate-50 border-slate-200 text-slate-400";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() =>
                            setAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                          }
                          className={`w-full text-left px-4 py-3 rounded-lg border text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${btnStyle}`}
                        >
                          <span className="font-mono text-xs text-slate-500 shrink-0">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {hasAnswered && (
                    <div className="mt-4 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <strong className="text-[#0B192C]">Explanation: </strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {allAnswered && (
            <div className="mt-6 p-6 bg-[#0B192C] text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-blue-300 mb-1">
                  Assessment Complete
                </div>
                <div className="font-display font-bold text-xl">
                  Final Score: {correctCount} / {QUIZ_QUESTIONS.length} (
                  <span className="tabular-nums">
                    {Math.round((correctCount / QUIZ_QUESTIONS.length) * 100)}%
                  </span>
                  )
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {correctCount >= 6
                    ? "Strong command of Neural Machine Translation and Transformer internals."
                    : "Review the Pipeline and Transformer sections above to reinforce attention and decoding mechanics."}
                </p>
              </div>
              <button
                onClick={() => setAnswers({})}
                className="px-4 py-2.5 rounded-lg bg-white text-[#0B192C] text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              >
                Retake Assessment
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Section 12: Academic References */}
      <section id="references" className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <div className="text-xs font-mono tabular-nums text-slate-500 mb-2">
                12 · Primary Literature
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B192C] tracking-tight mb-2">
                Academic References &amp; Documentation
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Peer-reviewed papers, foundational textbooks, and official
                Google Research publications cited throughout this exhibit.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Filter academic references"
              className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-lg"
            >
              {REF_CATEGORIES.map((cat) => {
                const active = cat === selectedRefCategory;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedRefCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? "bg-white text-[#0B192C] shadow-sm"
                        : "text-slate-600 hover:text-[#0B192C]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRefs.map((ref) => (
              <article
                key={ref.id}
                className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{ref.category}</span>
                    <span className="font-mono tabular-nums">{ref.year}</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#0B192C] leading-snug">
                    {ref.title}
                  </h3>
                  <div className="text-xs text-slate-600">{ref.authors}</div>
                  <div className="text-xs font-mono text-slate-500">
                    {ref.venue}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {ref.note}
                  </p>
                </div>

                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4285F4] hover:underline pt-2 border-t border-slate-200"
                >
                  <span>Read Source Paper / Docs</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Restrained Academic Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <div className="font-display font-bold text-sm text-[#0B192C]">
              Google Translate: Inside the Machine
            </div>
            <p className="mt-1">
              University-level Computer Science educational exhibit on Neural
              Machine Translation and Transformer architectures.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 font-medium text-slate-600">
            <a href="#introduction" className="hover:text-[#0B192C]">
              Top
            </a>
            <a href="#pipeline" className="hover:text-[#0B192C]">
              Pipeline
            </a>
            <a href="#transformer" className="hover:text-[#0B192C]">
              Transformer
            </a>
            <a href="#lab" className="hover:text-[#0B192C]">
              Lab
            </a>
            <a href="#references" className="hover:text-[#0B192C]">
              References
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
