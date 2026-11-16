import { useEffect, useState } from "react";
import { ArrowRight, Play, ChevronDown, ChevronUp } from "lucide-react";
import { LAB_LANGUAGES, LAB_PRESETS } from "../data/mtData";

function clientTokenize(sentence: string): { text: string; id: number }[] {
  const parts = sentence.match(/[\w']+|[.,!?;:]/g) ?? [];
  return parts.map((tok) => {
    // Deterministic hash for educational Token ID illustration
    let hash = 0;
    for (let i = 0; i < tok.length; i++) {
      hash = (hash * 31 + tok.charCodeAt(i)) % 31999;
    }
    return { text: tok, id: hash + 100 };
  });
}

function detectScriptHeuristic(text: string): string {
  if (/[\u0B80-\u0BFF]/.test(text)) return "Tamil (ta)";
  if (/[\u0900-\u097F]/.test(text)) return "Hindi / Devanagari (hi)";
  if (/[äöüßÄÖÜ]/.test(text)) return "German (de)";
  if (/[éàèùâêîôûçÉÀÈ]/.test(text)) return "French (fr)";
  if (/[ñ¿¡áíóú]/i.test(text)) return "Spanish (es)";
  return "English (en)";
}

interface LabResult {
  mode: "simulated" | "live" | "unconfigured-custom" | "error";
  translatedText: string;
  sourceTokens: string[];
  targetTokens: string[];
  detectedLanguage: string;
  note: string;
}

export function TranslationLabSection() {
  const [inputText, setInputText] = useState(LAB_PRESETS[0].sourceSentence);
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("French");
  const [liveApiConfigured, setLiveApiConfigured] = useState(false);
  const [translationServiceAvailable, setTranslationServiceAvailable] =
    useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPipelineTrace, setShowPipelineTrace] = useState(true);
  const [result, setResult] = useState<LabResult>(() => {
    const initial = LAB_PRESETS[0].translations["French"];
    return {
      mode: "simulated",
      translatedText: initial.translatedText,
      sourceTokens: clientTokenize(LAB_PRESETS[0].sourceSentence).map((t) => t.text),
      targetTokens: initial.targetTokens,
      detectedLanguage: "English (en)",
      note: initial.note,
    };
  });

  useEffect(() => {
    let mounted = true;
    fetch("/api/translation-status")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Translation service is unavailable.");
        }
        return res.json();
      })
      .then((data) => {
        if (mounted) {
          setTranslationServiceAvailable(data?.serviceAvailable === true);
          setLiveApiConfigured(data?.liveApiConfigured === true);
        }
      })
      .catch(() => {
        if (mounted) {
          setTranslationServiceAvailable(false);
          setLiveApiConfigured(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const runTranslation = async (
    textToTranslate = inputText,
    src = sourceLang,
    tgt = targetLang
  ) => {
    const trimmed = textToTranslate.trim();
    if (!trimmed) return;

    const tokens = clientTokenize(trimmed).map((t) => t.text);
    const matchedPreset = LAB_PRESETS.find(
      (p) => p.sourceSentence.toLowerCase() === trimmed.toLowerCase()
    );

    // Check predefined corpus match when source is English
    if (src === "English" && matchedPreset && matchedPreset.translations[tgt]) {
      const entry = matchedPreset.translations[tgt];
      setResult({
        mode: "simulated",
        translatedText: entry.translatedText,
        sourceTokens: tokens,
        targetTokens: entry.targetTokens,
        detectedLanguage: "English (en)",
        note: entry.note,
      });
      return;
    }

    // If server live API is configured, call /api/translate
    if (liveApiConfigured) {
      setIsLoading(true);
      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: trimmed,
            sourceLanguage: src,
            targetLanguage: tgt,
          }),
        });
        const data = await res.json();
        if (res.ok && data.mode === "live") {
          setResult({
            mode: "live",
            translatedText: data.translatedText,
            sourceTokens: Array.isArray(data.sourceTokens)
              ? data.sourceTokens
              : tokens,
            targetTokens: Array.isArray(data.targetTokens)
              ? data.targetTokens
              : [],
            detectedLanguage: data.detectedLanguage ?? src,
            note: data.linguisticNote ?? "Live neural translation completed.",
          });
          setIsLoading(false);
          return;
        } else if (data.error) {
          setResult({
            mode: "error",
            translatedText: "Live translation endpoint returned an error.",
            sourceTokens: tokens,
            targetTokens: [],
            detectedLanguage: detectScriptHeuristic(trimmed),
            note: data.error,
          });
          setIsLoading(false);
          return;
        }
      } catch {
        // Fallback below
      }
      setIsLoading(false);
    }

    // Unconfigured custom text: be 100% transparent, never fake a hardcoded translation
    setResult({
      mode: translationServiceAvailable ? "unconfigured-custom" : "error",
      translatedText:
        translationServiceAvailable
          ? "Custom arbitrary-text translation requires a live translation API key on the server."
          : "The live translation server is unavailable.",
      sourceTokens: tokens,
      targetTokens: [],
      detectedLanguage: detectScriptHeuristic(trimmed),
      note: translationServiceAvailable
        ? "Simulated Educational Mode: Client-side tokenization and language heuristics ran locally on your custom sentence. Select one of the predefined parallel corpus presets above to inspect complete target translations."
        : "The frontend could not reach /api/translation-status. Deploy the Node server, then configure OPENROUTER_API_KEY in the server environment.",
    });
  };

  const handleSelectPreset = (sentence: string) => {
    setInputText(sentence);
    setSourceLang("English");
    void runTranslation(sentence, "English", targetLang);
  };

  const tokenObjects = clientTokenize(inputText);

  return (
    <section
      id="lab"
      className="py-16 lg:py-24 border-b border-slate-200 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <div className="text-xs font-mono tabular-nums text-slate-500 mb-2">
              06 · Experimental Workspace
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B192C] tracking-tight mb-2 text-balance">
              Interactive Translation Lab
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Test sample sentences or type your own input to inspect subword
              tokenization, source–target alignment, and pipeline stages.
            </p>
          </div>

          {/* Transparent Mode Indicator (Never misleads) */}
          <div className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-700 shrink-0">
            <span className="font-semibold text-[#0B192C]">Environment Mode: </span>
            {result.mode === "live"
              ? "Live Translation API (Configured Server Endpoint)"
              : "Simulated Educational Demonstration (Predefined Parallel Corpus)"}
          </div>
        </div>

        {/* Preset Sentences */}
        <div className="mb-6">
          <div className="text-xs font-semibold text-slate-500 mb-2">
            Sample Sentence Presets
          </div>
          <div className="flex flex-wrap gap-2">
            {LAB_PRESETS.map((preset) => {
              const isSelected = inputText.trim() === preset.sourceSentence;
              return (
                <button
                  key={preset.sourceSentence}
                  onClick={() => handleSelectPreset(preset.sourceSentence)}
                  className={`px-3.5 py-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#0B192C] text-white border-[#0B192C]"
                      : "bg-slate-50 text-[#0B192C] border-slate-200 hover:border-slate-300"
                  }`}
                >
                  "{preset.sourceSentence}"
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Workspace Split */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 space-y-6">
          {/* Language Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <span>Source</span>
                <select
                  value={sourceLang}
                  onChange={(e) => {
                    const nextSrc = e.target.value;
                    setSourceLang(nextSrc);
                    void runTranslation(inputText, nextSrc, targetLang);
                  }}
                  className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#0B192C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                >
                  {LAB_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </label>

              <ArrowRight className="w-4 h-4 text-slate-400" />

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <span>Target</span>
                <select
                  value={targetLang}
                  onChange={(e) => {
                    const nextTgt = e.target.value;
                    setTargetLang(nextTgt);
                    void runTranslation(inputText, sourceLang, nextTgt);
                  }}
                  className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#0B192C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                >
                  {LAB_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button
              onClick={() => void runTranslation()}
              disabled={isLoading || !inputText.trim()}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#4285F4] hover:bg-[#3367D6] disabled:opacity-50 text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isLoading ? "Processing..." : "Inspect Translation"}</span>
            </button>
          </div>

          {/* Source & Target Comparison Boxes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-[#4285F4]">
                  Source Input ({sourceLang})
                </span>
                <span className="font-mono tabular-nums">
                  {inputText.length} chars
                </span>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={3}
                aria-label="Source sentence input"
                placeholder="Enter a sentence or pick a preset above..."
                className="w-full resize-none border border-slate-200 rounded-lg p-3 text-base font-medium text-[#0B192C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
              />
              <div>
                <div className="text-[11px] font-semibold text-slate-500 mb-1.5">
                  Source Tokenization ({tokenObjects.length} tokens)
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tokenObjects.map((tok, i) => (
                    <span
                      key={`${tok.text}-${i}`}
                      className="px-2 py-1 rounded bg-slate-50 border border-slate-200 font-mono text-xs text-[#0B192C]"
                    >
                      {tok.text}{" "}
                      <span className="text-slate-400 tabular-nums">
                        #{tok.id}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-[#34A853]">
                    Target Output ({targetLang})
                  </span>
                  <span className="font-mono text-slate-500">
                    {result.mode === "live"
                      ? "Live API"
                      : result.mode === "simulated"
                      ? "Simulated Corpus"
                      : "Local Inspector"}
                  </span>
                </div>

                <div
                  className={`min-h-[5.5rem] p-3 rounded-lg border text-base font-semibold flex items-center ${
                    result.mode === "unconfigured-custom"
                      ? "bg-amber-50/60 border-amber-200 text-slate-700 text-sm font-normal"
                      : result.mode === "error"
                      ? "bg-red-50 border-red-200 text-red-800 text-sm"
                      : "bg-slate-50 border-slate-200 text-[#0B192C]"
                  }`}
                >
                  {result.translatedText}
                </div>
              </div>

              {result.targetTokens.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 mb-1.5">
                    Target Tokens ({result.targetTokens.length} tokens)
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.targetTokens.map((tok, i) => (
                      <span
                        key={`${tok}-${i}`}
                        className="px-2 py-1 rounded bg-emerald-50/70 border border-emerald-200 font-mono text-xs text-[#0B192C]"
                      >
                        {tok}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-xs text-slate-600 pt-2 border-t border-slate-100 leading-relaxed">
                <strong>Linguistic Note:</strong> {result.note}
              </p>
            </div>
          </div>

          {/* Pipeline Trace Inspector */}
          <div className="bg-white border border-slate-200 rounded-xl">
            <button
              onClick={() => setShowPipelineTrace((v) => !v)}
              aria-expanded={showPipelineTrace}
              className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-[#0B192C] cursor-pointer"
            >
              <span>Inspect Conceptual Pipeline Trace for Current Input</span>
              {showPipelineTrace ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {showPipelineTrace && (
              <div className="px-4 pb-4 pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="font-mono text-[11px] text-slate-500 mb-1">
                    1. Detection
                  </div>
                  <div className="font-semibold text-[#0B192C]">
                    {result.detectedLanguage}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="font-mono text-[11px] text-slate-500 mb-1">
                    2. Embedding Matrix
                  </div>
                  <div className="font-semibold font-mono tabular-nums text-[#0B192C]">
                    X ∈ ℝ^({tokenObjects.length} × 512)
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="font-mono text-[11px] text-slate-500 mb-1">
                    3. Attention Graph
                  </div>
                  <div className="font-semibold font-mono tabular-nums text-[#0B192C]">
                    {tokenObjects.length * tokenObjects.length} pairwise edges / head
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="font-mono text-[11px] text-slate-500 mb-1">
                    4. Target Decoding
                  </div>
                  <div className="font-semibold text-[#0B192C]">
                    {result.mode === "live"
                      ? "Live Server Endpoint"
                      : result.mode === "simulated"
                      ? "Simulated Beam Output"
                      : "Awaiting Live API"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
