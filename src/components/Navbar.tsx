import { useEffect, useState } from "react";
import { EXHIBIT_SECTIONS } from "../data/mtData";

export function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setScrollProgress(ratio);

      // Determine active section in viewport
      let current = EXHIBIT_SECTIONS[0].id;
      for (const sec of EXHIBIT_SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            current = sec.id;
          }
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentObj =
    EXHIBIT_SECTIONS.find((s) => s.id === activeSection) ?? EXHIBIT_SECTIONS[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#introduction"
          className="font-display font-bold text-base sm:text-lg tracking-tight text-[#0B192C] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] rounded"
        >
          Inside the Machine
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary sections"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          <a
            href="#evolution"
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              activeSection === "evolution"
                ? "border-[#4285F4] text-[#0B192C]"
                : "border-transparent hover:text-[#0B192C] hover:border-slate-300"
            }`}
          >
            Evolution
          </a>
          <a
            href="#pipeline"
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              activeSection === "pipeline"
                ? "border-[#4285F4] text-[#0B192C]"
                : "border-transparent hover:text-[#0B192C] hover:border-slate-300"
            }`}
          >
            Pipeline
          </a>
          <a
            href="#transformer"
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              activeSection === "transformer"
                ? "border-[#4285F4] text-[#0B192C]"
                : "border-transparent hover:text-[#0B192C] hover:border-slate-300"
            }`}
          >
            Transformer
          </a>
          <a
            href="#lab"
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              activeSection === "lab"
                ? "border-[#4285F4] text-[#0B192C]"
                : "border-transparent hover:text-[#0B192C] hover:border-slate-300"
            }`}
          >
            Translation Lab
          </a>
          <a
            href="#references"
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              activeSection === "references"
                ? "border-[#4285F4] text-[#0B192C]"
                : "border-transparent hover:text-[#0B192C] hover:border-slate-300"
            }`}
          >
            References
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="hidden xl:inline text-xs font-mono tabular-nums text-slate-500 whitespace-nowrap">
            {currentObj.number} / {EXHIBIT_SECTIONS.length} · {currentObj.shortLabel}
          </span>
          <a
            href="#quiz"
            className="px-4 py-2 text-xs font-semibold text-white bg-[#4285F4] hover:bg-[#3367D6] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] focus-visible:ring-offset-2"
          >
            Knowledge Check
          </a>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div
        role="progressbar"
        aria-label="Reading progress"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-[2px] w-full bg-slate-100 overflow-hidden"
      >
        <div
          className="h-full origin-left transition-transform duration-150 ease-out"
          style={{
            transform: `scaleX(${scrollProgress})`,
            background:
              "linear-gradient(90deg, #4285F4 0%, #EA4335 35%, #FBBC05 70%, #34A853 100%)",
          }}
        />
      </div>
    </header>
  );
}
