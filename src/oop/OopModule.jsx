import React, { useState, useMemo } from "react";
import {
  Layers, Search, Sparkles, BookOpen, Code2, HelpCircle,
  CheckCircle2, AlertTriangle, ChevronDown, Check, Copy, Flame, Clock
} from "lucide-react";
import { TOPICS, QUICK_REVISION, RAPID_FIRE, QUESTION_BANK } from "./oopData";
import {
  PillarsSpotlight,
  ComparisonMatrixSection,
  TopicVisualizer
} from "./OopVisuals";

const INK = "#241E3D";
const C = {
  ink: "#241E3D",
  paper: "#FDF6EC",
  card: "#FFFFFF",
  coral: "#FF6B6B",
  sun: "#FFC93C",
  mint: "#3FC1A6",
  sky: "#4D96FF",
  grape: "#9B5DE5",
  pink: "#FF8FB1",
  leaf: "#6BCB77",
  amber: "#FFA94D",
  cyan: "#38C6D9",
};

/* ======================================================================
   CODE BLOCK WITH COPY BUTTON & EXPECTED OUTPUT
   ====================================================================== */
function CodeBlockWithOutput({ code, output, outputExplanation, title = "C++ Example & Expected Output" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl overflow-hidden my-3 border-2 border-slate-800 bg-slate-900 text-slate-100 font-code text-xs">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700 text-slate-300">
        <span className="flex items-center gap-1.5 text-[11px] font-bold">
          <Code2 size={13} className="text-purple-400" /> {title}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-700 hover:bg-slate-600 transition-all text-slate-200"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" /> Copied!
            </>
          ) : (
            <>
              <Copy size={12} /> Copy Code
            </>
          )}
        </button>
      </div>

      {/* CODE & OUTPUT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        <div className="lg:col-span-2 p-4 border-b lg:border-b-0 lg:border-r border-slate-800">
          <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed text-slate-200">
            {code}
          </pre>
        </div>

        {/* OUTPUT PANEL */}
        {output && (
          <div className="p-4 bg-slate-950/80 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                ▶ EXPECTED OUTPUT
              </span>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300 font-bold font-code text-[11px]">
                {output}
              </div>
            </div>
            {outputExplanation && (
              <p className="text-[10.5px] font-ui text-slate-400 mt-2 leading-tight">
                💡 <strong>Why:</strong> {outputExplanation}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ======================================================================
   INDIVIDUAL TOPIC CARD COMPONENT (VISUAL-FIRST)
   ====================================================================== */
function TopicCard({ topic }) {
  const [expanded, setExpanded] = useState(true);
  const [showAnswer, setShowAnswer] = useState(true);
  const [showFollowUp, setShowFollowUp] = useState(false);

  return (
    <div
      id={topic.id}
      className="rounded-3xl p-5 sticker mb-6 transition-all bg-white"
      style={{ border: `3.5px solid ${INK}` }}
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center flex-wrap gap-2">
          <span
            className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold font-code"
            style={{
              backgroundColor: topic.importance === "HIGH FREQUENCY" ? C.grape : C.sun,
              color: topic.importance === "HIGH FREQUENCY" ? "#fff" : INK,
              border: `2px solid ${INK}`,
            }}
          >
            {topic.importance}
          </span>
          <span
            className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-code bg-slate-100 text-slate-800"
            style={{ border: `1.5px solid ${INK}` }}
          >
            {topic.category}
          </span>
          <span
            className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-code"
            style={{
              backgroundColor:
                topic.difficulty === "Easy"
                  ? "#DCFCE7"
                  : topic.difficulty === "Medium"
                  ? "#FEF9C3"
                  : "#FEE2E2",
              color: INK,
              border: `1.5px solid ${INK}`,
            }}
          >
            {topic.difficulty}
          </span>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs font-display font-extrabold text-purple-700 hover:underline"
        >
          {expanded ? "Collapse Topic" : "Expand Topic"}
          <ChevronDown
            size={16}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <h3 className="font-display text-xl font-black mb-2" style={{ color: INK }}>
        {topic.title}
      </h3>

      {/* CONCEPT */}
      <p className="text-xs font-ui text-gray-700 leading-relaxed mb-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
        <strong>Concept:</strong> {topic.concept}
      </p>

      {/* EXPANDABLE BODY */}
      {expanded && (
        <div className="space-y-4">
          {/* INLINE DEDICATED VISUAL DIAGRAM */}
          <TopicVisualizer topicId={topic.id} />

          {/* SOURCE NOTE CALLOUT IF APPLICABLE */}
          {topic.sourceNote && (
            <div className="p-3 rounded-2xl bg-amber-50 border-2 border-amber-400 text-amber-900 text-xs font-ui">
              <p className="font-bold flex items-center gap-1 mb-1">
                <AlertTriangle size={14} className="text-amber-600" /> ⚠️ Source Note (C++ vs Java Context)
              </p>
              <p>{topic.sourceNote}</p>
            </div>
          )}

          {/* C++ CODE BLOCK + EXPECTED OUTPUT */}
          <CodeBlockWithOutput
            code={topic.code}
            output={topic.output}
            outputExplanation={topic.outputExplanation}
            title={`${topic.title} — C++ Code & Output`}
          />

          {/* KEY POINTS */}
          <div className="p-3.5 rounded-2xl" style={{ backgroundColor: C.paper, border: `2px solid ${INK}` }}>
            <p className="font-display text-xs font-bold text-gray-900 mb-2 flex items-center gap-1.5">
              <Sparkles size={14} className="text-purple-600" /> Key Points to Remember
            </p>
            <ul className="space-y-1.5 text-xs font-ui text-gray-800">
              {topic.keyPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold text-sm leading-none">&bull;</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* INTERVIEW CORNER */}
          <div className="p-4 rounded-2xl bg-slate-900 text-slate-100" style={{ border: `2.5px solid ${INK}` }}>
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-code bg-amber-400 text-slate-900">
                INTERVIEW QUESTION
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="text-[11px] font-bold text-purple-300 hover:text-white underline"
                >
                  {showAnswer ? "Hide Answer" : "Show Answer"}
                </button>
                <button
                  onClick={() => setShowFollowUp(!showFollowUp)}
                  className="text-[11px] font-bold text-sky-300 hover:text-white underline"
                >
                  {showFollowUp ? "Hide Follow-up" : "Show Follow-up"}
                </button>
              </div>
            </div>

            <p className="font-display text-sm font-extrabold text-amber-300 mb-2">
              "{topic.interviewQuestion}"
            </p>

            {showAnswer && (
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs font-ui mb-2 text-slate-200">
                <p className="font-bold text-emerald-400 mb-1">💬 Speakable Answer:</p>
                <p className="leading-relaxed">{topic.goodAnswer}</p>
              </div>
            )}

            {showFollowUp && (
              <div className="p-3 rounded-xl bg-purple-950/80 border border-purple-800 text-xs font-ui mb-2 text-purple-200">
                <p className="font-bold text-purple-300 mb-1">🔥 Follow-up Question:</p>
                <p className="leading-relaxed">{topic.followUp}</p>
              </div>
            )}

            {topic.trap && (
              <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-800 text-[11px] font-ui text-red-200">
                <span className="font-bold text-red-400">⚠️ Common Candidate Trap:</span> {topic.trap}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ======================================================================
   MAIN OOP PREPARATION MODULE CONTAINER
   ====================================================================== */
export default function OopModule() {
  const [searchTerm, setSearchTerm] = useState("");
  const [diffFilter, setDiffFilter] = useState("All");
  const [viewMode, setViewMode] = useState("full"); // "full" | "revision" | "rapid" | "qbank"
  const [qBankAnswerState, setQBankAnswerState] = useState({});

  const filteredTopics = useMemo(() => {
    return TOPICS.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.interviewQuestion.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDiff = diffFilter === "All" || t.difficulty === diffFilter;
      return matchesSearch && matchesDiff;
    });
  }, [searchTerm, diffFilter]);

  const toggleQBankAnswer = (id) => {
    setQBankAnswerState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8">
      {/* MODULE BANNER HEADER */}
      <div className="rounded-3xl p-6 sticker text-white" style={{ backgroundColor: C.grape, border: `3.5px solid ${INK}` }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold font-code bg-white text-purple-900">
                Visual-First C++ Study Guide
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold font-code bg-amber-300 text-slate-900">
                Interactive SDE Prep
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black">
              Object-Oriented Programming (OOP) Visual Prep Module
            </h1>
            <p className="text-xs font-ui opacity-90 mt-1 max-w-2xl">
              Visual-first interview guide with inline SVG diagrams, C++ code &amp; expected output panels, 8 comparison matrices, 5-minute quick revision, and rapid-fire flashcards.
            </p>
          </div>
        </div>
      </div>

      {/* MODE SELECTOR & SEARCH BAR */}
      <div className="rounded-2xl p-4 sticker bg-white" style={{ border: `3px solid ${INK}` }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 pb-3 border-b-2 border-slate-100">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {[
              { id: "full", label: "📚 Complete Visual Module", color: C.grape },
              { id: "revision", label: "⚡ 5-Minute Quick Revision", color: C.sun },
              { id: "rapid", label: "🔥 Rapid-Fire Interview", color: C.coral },
              { id: "qbank", label: "❓ Question Bank", color: C.sky },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className="px-4 py-2 rounded-full font-display text-xs font-extrabold sticker-sm transition-all"
                style={{
                  backgroundColor: viewMode === mode.id ? mode.color : "#fff",
                  color: viewMode === mode.id && mode.id === "full" ? "#fff" : INK,
                  border: `2px solid ${INK}`,
                }}
              >
                {mode.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search OOP topics or Qs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-2xl text-xs font-ui border-2 border-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        {viewMode === "full" && (
          <div className="flex items-center gap-2 text-xs font-ui">
            <span className="font-bold text-gray-700">Filter Difficulty:</span>
            {["All", "Easy", "Medium", "Hard"].map((diff) => (
              <button
                key={diff}
                onClick={() => setDiffFilter(diff)}
                className={`px-3 py-1 rounded-full font-code font-bold transition-all ${
                  diffFilter === diff ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
                style={{ border: `1.5px solid ${INK}` }}
              >
                {diff}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* MODE 1: COMPLETE VISUAL TOPICS VIEW */}
      {viewMode === "full" && (
        <>
          <PillarsSpotlight />
          <ComparisonMatrixSection />

          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-extrabold flex items-center gap-2" style={{ color: INK }}>
              <Layers size={22} className="text-purple-600" /> Visual Topic Breakdown ({filteredTopics.length} Topics)
            </h2>
          </div>

          {filteredTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </>
      )}

      {/* MODE 2: 5-MINUTE QUICK REVISION */}
      {viewMode === "revision" && (
        <div className="rounded-3xl p-6 sticker bg-white" style={{ border: `3.5px solid ${INK}` }}>
          <div className="flex items-center gap-2 mb-4">
            <Clock size={22} className="text-amber-500" />
            <h2 className="font-display text-2xl font-extrabold" style={{ color: INK }}>
              OOP — 5 MINUTE QUICK REVISION
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {QUICK_REVISION.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl" style={{ backgroundColor: C.paper, border: `2px solid ${INK}` }}>
                <p className="font-display text-sm font-black text-purple-900 mb-1">{item.term}</p>
                <p className="text-xs font-ui text-gray-800 leading-snug">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODE 3: RAPID-FIRE INTERVIEW */}
      {viewMode === "rapid" && (
        <div className="rounded-3xl p-6 sticker bg-white" style={{ border: `3.5px solid ${INK}` }}>
          <div className="flex items-center gap-2 mb-4">
            <Flame size={22} className="text-red-500" />
            <h2 className="font-display text-2xl font-extrabold" style={{ color: INK }}>
              RAPID FIRE — OOP INTERVIEW FLASHCARDS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RAPID_FIRE.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl flex flex-col justify-between" style={{ backgroundColor: C.paper, border: `2.5px solid ${INK}` }}>
                <p className="font-display text-sm font-extrabold text-slate-900 mb-2">Q{idx + 1}: {item.q}</p>
                <div className="p-2.5 rounded-xl bg-slate-900 text-amber-300 font-code text-xs font-bold border border-slate-800">
                  A: {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODE 4: QUESTION BANK */}
      {viewMode === "qbank" && (
        <div className="rounded-3xl p-6 sticker bg-white" style={{ border: `3.5px solid ${INK}` }}>
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle size={22} className="text-sky-600" />
            <h2 className="font-display text-2xl font-extrabold" style={{ color: INK }}>
              PRACTICE QUESTION BANK
            </h2>
          </div>
          <div className="space-y-4">
            {QUESTION_BANK.map((q) => {
              const isOpen = qBankAnswerState[q.id];
              return (
                <div key={q.id} className="p-4 rounded-2xl bg-white" style={{ border: `2.5px solid ${INK}` }}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-code bg-emerald-100 text-emerald-900" style={{ border: `1.5px solid ${INK}` }}>
                        {q.difficulty}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-code bg-slate-100 text-slate-800" style={{ border: `1.5px solid ${INK}` }}>
                        {q.category}
                      </span>
                    </div>
                    <button onClick={() => toggleQBankAnswer(q.id)} className="text-xs font-display font-bold text-purple-700 hover:underline">
                      {isOpen ? "Hide Answer" : "Show Answer"}
                    </button>
                  </div>
                  <p className="font-display text-sm font-extrabold text-slate-900 mb-2 whitespace-pre-line">{q.question}</p>
                  {isOpen && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-900 text-slate-100 font-ui text-xs space-y-2 border border-slate-800">
                      <p className="font-bold text-emerald-400">Answer:</p>
                      <p className="text-slate-200">{q.answer}</p>
                      {q.followUp && <p className="text-purple-300 font-code text-[11px] pt-1 border-t border-slate-700">🔥 <strong>Follow-up:</strong> {q.followUp}</p>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
