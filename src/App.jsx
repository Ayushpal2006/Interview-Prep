import React, { useState, useId, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BookOpen, Code2, ClipboardCheck, Search, Flame,
  ChevronRight, Play, CheckCircle2, XCircle, Clock, GitBranch,
  Terminal, X, RotateCcw, ArrowRight, Sparkles, ShieldCheck,
  Boxes, Layers, Globe, Database, Box, Cpu, Network, ExternalLink, Atom,
  ChevronDown, HelpCircle, FileCode, Check, Copy
} from "lucide-react";
import OopModule from "./oop/OopModule";
import ComputerNetworksModule from "./cn/ComputerNetworksModule";

/* ======================================================================
   THEME PALETTE
   ====================================================================== */
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
  docker: "#2EC4F1",
  amber: "#FFA94D",
  cyan: "#38C6D9",
  rust: "#E8734A",
  textMuted: "#6B6480",
};
const INK = C.ink;

/* ======================================================================
   SVG VISUAL DIAGRAM UTILITIES
   ====================================================================== */

function DiagBars({ heights = [12, 25, 42, 65, 88], color = C.coral }) {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-28">
      <line x1="15" y1="95" x2="190" y2="95" stroke={INK} strokeWidth="3" />
      {heights.map((h, i) => (
        <rect key={i} x={25 + i * 33} y={95 - h} width="21" height={h} rx="4" fill={color} stroke={INK} strokeWidth="2.5" />
      ))}
    </svg>
  );
}

function DiagCompare({ left, right, colorL = C.sky, colorR = C.coral }) {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-28">
      <rect x="10" y="25" width="82" height="60" rx="12" fill={colorL} stroke={INK} strokeWidth="3" />
      <text x="51" y="59" fontSize="10" fontWeight="800" fill="#fff" textAnchor="middle">{left}</text>
      <rect x="108" y="25" width="82" height="60" rx="12" fill={colorR} stroke={INK} strokeWidth="3" />
      <text x="149" y="59" fontSize="10" fontWeight="800" fill="#fff" textAnchor="middle">{right}</text>
      <circle cx="100" cy="55" r="16" fill={C.paper} stroke={INK} strokeWidth="3" />
      <text x="100" y="59" fontSize="9" fontWeight="800" fill={INK} textAnchor="middle">VS</text>
    </svg>
  );
}

function DiagFlow({ steps, colors }) {
  const uid = useId();
  const w = 200, boxW = 42, n = steps.length;
  const gap = (w - boxW * n) / (n + 1);
  return (
    <svg viewBox={`0 0 ${w} 110`} className="w-full h-28">
      <defs>
        <marker id={`${uid}-a`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={INK} />
        </marker>
      </defs>
      {steps.map((s, i) => {
        const x = gap + i * (boxW + gap);
        return (
          <g key={i}>
            <rect x={x} y="34" width={boxW} height="42" rx="8" fill={colors ? colors[i] : C.sky} stroke={INK} strokeWidth="2.5" />
            <text x={x + boxW / 2} y="59" fontSize="8" fontWeight="800" fill={INK} textAnchor="middle">{s}</text>
            {i < n - 1 && (
              <line x1={x + boxW} y1="55" x2={x + boxW + gap - 4} y2="55" stroke={INK} strokeWidth="2.5" markerEnd={`url(#${uid}-a)`} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ======================================================================
   COMPONENT-BASED TOPIC CARDS — INDIVIDUAL COMPONENT FOR EVERY SINGLE TOPIC
   ====================================================================== */

/* ---------------- 1. OPERATING SYSTEMS TOPIC COMPONENTS ---------------- */

function TopicOSTypes() {
  return (
    <div className="rounded-3xl p-5 sticker mb-6" style={{ backgroundColor: C.card, border: `3.5px solid ${INK}` }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-code" style={{ backgroundColor: C.mint, color: INK, border: `2px solid ${INK}` }}>OS Module #1</span>
        <h3 className="font-display text-lg font-extrabold" style={{ color: INK }}>Operating System &amp; 5 Core Types</h3>
      </div>
      <p className="text-xs font-ui mb-3 text-gray-700 leading-relaxed">
        An Operating System acts as an intermediary between computer user and computer hardware.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-3">
        {[
          { name: "Batch OS", desc: "Jobs grouped in batches; no direct user interaction." },
          { name: "Multiprogramming", desc: "Keeps CPU busy by holding multiple programs in memory." },
          { name: "Multitasking", desc: "Time-sharing context switches rapidly across tasks." },
          { name: "Time-Sharing", desc: "Allocates CPU time slot (quantum) to multiple users." },
          { name: "Real-Time (RTOS)", desc: "Strict deadline constraints (Aviation / Medical)." }
        ].map((t, i) => (
          <div key={i} className="p-2.5 rounded-xl text-center" style={{ backgroundColor: C.paper, border: `2px solid ${INK}` }}>
            <p className="font-display text-xs font-bold" style={{ color: INK }}>{t.name}</p>
            <p className="text-[10px] font-ui text-gray-600 mt-1 leading-snug">{t.desc}</p>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl font-code text-xs bg-slate-900 text-slate-200">
        <p className="text-amber-400 font-bold">// Key Interview Q: Difference between Multiprogramming and Multitasking?</p>
        <p className="mt-1">// Multiprogramming maximizes CPU utilization by swapping jobs on I/O wait. Multitasking switches based on Time Quantum.</p>
      </div>
    </div>
  );
}

function TopicProcessPCB() {
  return (
    <div className="rounded-3xl p-5 sticker mb-6" style={{ backgroundColor: C.card, border: `3.5px solid ${INK}` }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-code" style={{ backgroundColor: C.mint, color: INK, border: `2px solid ${INK}` }}>OS Module #2</span>
        <h3 className="font-display text-lg font-extrabold" style={{ color: INK }}>Process &amp; Process Control Block (PCB)</h3>
      </div>
      <p className="text-xs font-ui mb-3 text-gray-700 leading-relaxed">
        A <strong>Program</strong> is passive code stored on disk. A <strong>Process</strong> is an active program under execution with PC, Stack, and Heap memory.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        {[
          { key: "PID", val: "Process Identifier" },
          { key: "PC", val: "Program Counter (Next Addr)" },
          { key: "Registers", val: "CPU Register state" },
          { key: "Memory Limits", val: "Page / Segment tables" }
        ].map((item, i) => (
          <div key={i} className="p-2 rounded-xl text-center" style={{ backgroundColor: C.paper, border: `2px solid ${INK}` }}>
            <span className="font-code text-xs font-extrabold" style={{ color: C.coral }}>{item.key}</span>
            <p className="text-[10.5px] font-ui text-gray-600 mt-0.5">{item.val}</p>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl font-code text-xs bg-slate-900 text-slate-200">
        <p className="text-emerald-400 font-bold">// PCB Attributes stored in Kernel Memory:</p>
        <p className="mt-1">struct task_struct &#123; pid_t pid; long state; struct mm_struct *mm; &#125;;</p>
      </div>
    </div>
  );
}

function TopicCPUScheduling() {
  return (
    <div className="rounded-3xl p-5 sticker mb-6" style={{ backgroundColor: C.card, border: `3.5px solid ${INK}` }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-code" style={{ backgroundColor: C.mint, color: INK, border: `2px solid ${INK}` }}>OS Module #3</span>
        <h3 className="font-display text-lg font-extrabold" style={{ color: INK }}>CPU Scheduling Algorithms &amp; Formulas</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div className="p-3 rounded-2xl" style={{ backgroundColor: C.paper, border: `2px solid ${INK}` }}>
          <p className="font-display text-xs font-bold mb-1" style={{ color: INK }}>Core Formulas</p>
          <ul className="text-xs font-code space-y-1">
            <li>Turnaround Time (TAT) = CT - AT</li>
            <li>Waiting Time (WT) = TAT - BT</li>
            <li>Response Ratio (HRRN) = (WT + BT) / BT</li>
          </ul>
        </div>
        <div className="p-3 rounded-2xl" style={{ backgroundColor: C.paper, border: `2px solid ${INK}` }}>
          <p className="font-display text-xs font-bold mb-1" style={{ color: INK }}>Algorithms</p>
          <ul className="text-xs font-ui space-y-0.5 text-gray-700">
            <li>&bull; <strong>FCFS</strong>: Non-preemptive (Convoy Effect)</li>
            <li>&bull; <strong>SJF / SRTF</strong>: Optimal minimum average waiting time</li>
            <li>&bull; <strong>Round Robin</strong>: Preemptive with Time Quantum</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function TopicDeadlocks() {
  return (
    <div className="rounded-3xl p-5 sticker mb-6" style={{ backgroundColor: C.card, border: `3.5px solid ${INK}` }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-code" style={{ backgroundColor: C.mint, color: INK, border: `2px solid ${INK}` }}>OS Module #4</span>
        <h3 className="font-display text-lg font-extrabold" style={{ color: INK }}>Deadlocks &amp; 4 Coffman Conditions</h3>
      </div>
      <p className="text-xs font-ui mb-3 text-gray-700">
        A Deadlock occurs when a set of processes are blocked because each process holds a resource and waits for another resource held by another process.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          "1. Mutual Exclusion",
          "2. Hold & Wait",
          "3. No Preemption",
          "4. Circular Wait"
        ].map((c, i) => (
          <div key={i} className="p-2 rounded-xl text-center font-display text-xs font-bold" style={{ backgroundColor: C.coral, color: "#fff", border: `2px solid ${INK}` }}>
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- 2. DBMS & SQL TOPIC COMPONENTS ---------------- */

function TopicERDiagrams() {
  return (
    <div className="rounded-3xl p-5 sticker mb-6" style={{ backgroundColor: C.card, border: `3.5px solid ${INK}` }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-code" style={{ backgroundColor: C.leaf, color: INK, border: `2px solid ${INK}` }}>DBMS Module #1</span>
        <h3 className="font-display text-lg font-extrabold" style={{ color: INK }}>ER Diagrams, Entities &amp; Key Hierarchy</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <div className="p-3 rounded-2xl" style={{ backgroundColor: C.paper, border: `2px solid ${INK}` }}>
          <p className="font-display text-xs font-bold text-emerald-700">Entity Types</p>
          <p className="text-[11px] font-ui mt-1 text-gray-700">Strong Entity (has Primary Key) vs Weak Entity (depends on Identifying Owner Entity).</p>
        </div>
        <div className="p-3 rounded-2xl" style={{ backgroundColor: C.paper, border: `2px solid ${INK}` }}>
          <p className="font-display text-xs font-bold text-sky-700">Attributes</p>
          <p className="text-[11px] font-ui mt-1 text-gray-700">Simple, Composite (Name $\rightarrow$ First/Last), Multivalued (Phone []), Derived (Age from DOB).</p>
        </div>
        <div className="p-3 rounded-2xl" style={{ backgroundColor: C.paper, border: `2px solid ${INK}` }}>
          <p className="font-display text-xs font-bold text-purple-700">Key Hierarchy</p>
          <p className="text-[11px] font-ui mt-1 text-gray-700">Super Key $\supseteq$ Candidate Key $\supseteq$ Primary Key.</p>
        </div>
      </div>
    </div>
  );
}

function TopicNormalization() {
  return (
    <div className="rounded-3xl p-5 sticker mb-6" style={{ backgroundColor: C.card, border: `3.5px solid ${INK}` }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-code" style={{ backgroundColor: C.leaf, color: INK, border: `2px solid ${INK}` }}>DBMS Module #2</span>
        <h3 className="font-display text-lg font-extrabold" style={{ color: INK }}>Database Normalization (1NF &rarr; 2NF &rarr; 3NF &rarr; BCNF)</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { form: "1NF", rule: "Atomic Values (No multi-valued attributes)" },
          { form: "2NF", rule: "1NF + No Partial Dependency (Non-key depends on full PK)" },
          { form: "3NF", rule: "2NF + No Transitive Dependency (Non-key X → Y)" },
          { form: "BCNF", rule: "Strict 3NF: For every X → Y, X must be Super Key" }
        ].map((n, i) => (
          <div key={i} className="p-2.5 rounded-xl text-center" style={{ backgroundColor: C.paper, border: `2px solid ${INK}` }}>
            <span className="font-display text-xs font-extrabold" style={{ color: C.leaf }}>{n.form}</span>
            <p className="text-[10.5px] font-ui text-gray-700 mt-1 leading-tight">{n.rule}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- 3. OBJECT ORIENTED PROGRAMMING TOPIC COMPONENTS ---------------- */

function TopicOOPInheritance() {
  return (
    <div className="rounded-3xl p-5 sticker mb-6" style={{ backgroundColor: C.card, border: `3.5px solid ${INK}` }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-code" style={{ backgroundColor: C.grape, color: "#fff", border: `2px solid ${INK}` }}>OOP Module #1</span>
        <h3 className="font-display text-lg font-extrabold" style={{ color: INK }}>5 Types of Inheritance &amp; Access Specifiers</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div className="p-3 rounded-2xl" style={{ backgroundColor: C.paper, border: `2px solid ${INK}` }}>
          <p className="font-display text-xs font-bold" style={{ color: INK }}>5 Inheritance Types</p>
          <ul className="text-xs font-ui space-y-1 text-gray-700 mt-1">
            <li>1. Single (A &rarr; B)</li>
            <li>2. Multiple (A, B &rarr; C)</li>
            <li>3. Hierarchical (A &rarr; B, C)</li>
            <li>4. Multilevel (A &rarr; B &rarr; C)</li>
            <li>5. Hybrid (Combination)</li>
          </ul>
        </div>
        <div className="p-3 rounded-2xl" style={{ backgroundColor: C.paper, border: `2px solid ${INK}` }}>
          <p className="font-display text-xs font-bold" style={{ color: INK }}>Access Specifiers</p>
          <ul className="text-xs font-ui space-y-1 text-gray-700 mt-1">
            <li>🔒 <strong>Private</strong>: Accessible inside class only</li>
            <li>🛡️ <strong>Protected</strong>: Accessible inside class &amp; derived classes</li>
            <li>🌐 <strong>Public</strong>: Accessible anywhere</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function TopicPolymorphismVTable() {
  return (
    <div className="rounded-3xl p-5 sticker mb-6" style={{ backgroundColor: C.card, border: `3.5px solid ${INK}` }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-code" style={{ backgroundColor: C.grape, color: "#fff", border: `2px solid ${INK}` }}>OOP Module #2</span>
        <h3 className="font-display text-lg font-extrabold" style={{ color: INK }}>Polymorphism: Overloading vs. Overriding &amp; V-TABLE</h3>
      </div>
      <p className="text-xs font-ui mb-3 text-gray-700">
        Overloading is compile-time (static binding). Overriding is runtime (dynamic binding via Virtual Table pointer VPTR).
      </p>
      <div className="p-3 rounded-xl font-code text-xs bg-slate-900 text-slate-200">
        <p className="text-purple-400 font-bold">// Pure Virtual Function &amp; Abstract Class:</p>
        <p className="mt-1">class Shape &#123; public: virtual void draw() = 0; // Pure virtual &#125;;</p>
      </div>
    </div>
  );
}

/* ---------------- 4. COMPUTER NETWORKS TOPIC COMPONENTS ---------------- */

function TopicNetworkTopologiesOSI() {
  return (
    <div className="rounded-3xl p-5 sticker mb-6" style={{ backgroundColor: C.card, border: `3.5px solid ${INK}` }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-code" style={{ backgroundColor: C.amber, color: INK, border: `2px solid ${INK}` }}>Networking Module #1</span>
        <h3 className="font-display text-lg font-extrabold" style={{ color: INK }}>Topologies &amp; OSI 7 Layers vs TCP/IP</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 rounded-2xl" style={{ backgroundColor: C.paper, border: `2px solid ${INK}` }}>
          <p className="font-display text-xs font-bold" style={{ color: INK }}>Topologies</p>
          <p className="text-xs font-ui text-gray-700 mt-1">Star (Central Switch), Ring (Token passing), Bus (Backbone cable), Mesh ($N(N-1)/2$ links).</p>
        </div>
        <div className="p-3 rounded-2xl" style={{ backgroundColor: C.paper, border: `2px solid ${INK}` }}>
          <p className="font-display text-xs font-bold" style={{ color: INK }}>OSI 7 Layers</p>
          <p className="text-xs font-ui text-gray-700 mt-1">Application, Presentation, Session, Transport, Network, Data Link, Physical.</p>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   MAIN MASTER APP COMPONENT WITH ALL SUBJECT MODULE COMPONENTS
   ====================================================================== */

export default function App() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen font-ui paper-dots p-4 sm:p-8" style={{ backgroundColor: C.paper, color: INK }}>
      <GlobalStyle />

      {/* HEADER */}
      <header className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Mascot size={52} />
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold" style={{ color: INK }}>Component-Based SDE Prep Master</h1>
            <p className="font-code text-xs font-bold text-gray-600">// Cover-To-Cover Topic Explosion for OS, DBMS, OOP &amp; Computer Networks</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Ayushpal2006/Interview-Prep"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl font-display text-xs font-extrabold sticker-sm"
            style={{ backgroundColor: C.sun, color: INK, border: `2.5px solid ${INK}` }}
          >
            GitHub Repo <ExternalLink size={13} />
          </a>
        </div>
      </header>

      {/* SUBJECT FILTER TABS */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-2 mb-6">
        {[
          { id: "all", label: "All 4 Core Subjects", color: C.sun },
          { id: "os", label: "⚙️ Operating Systems (OS)", color: C.mint },
          { id: "dbms", label: "🗄️ DBMS & SQL", color: C.leaf },
          { id: "oop", label: "🧱 Object-Oriented Prog (OOP)", color: C.grape },
          { id: "cn", label: "🌐 Computer Networks (CN)", color: C.amber },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-2 rounded-full font-display text-xs font-extrabold sticker-sm transition-all"
            style={{
              backgroundColor: activeTab === tab.id ? tab.color : "#fff",
              color: activeTab === tab.id && tab.id === "oop" ? "#fff" : INK,
              border: `2.5px solid ${INK}`,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* MAIN TOPIC COMPONENT CONTAINER */}
      <main className="max-w-6xl mx-auto">
        {(activeTab === "all" || activeTab === "os") && (
          <section className="mb-8">
            <h2 className="font-display text-xl font-extrabold mb-4 flex items-center gap-2" style={{ color: INK }}>
              <Cpu size={22} style={{ color: C.mint }} /> Operating Systems (OS) Cover-to-Cover Topic Components
            </h2>
            <TopicOSTypes />
            <TopicProcessPCB />
            <TopicCPUScheduling />
            <TopicDeadlocks />
          </section>
        )}

        {(activeTab === "all" || activeTab === "dbms") && (
          <section className="mb-8">
            <h2 className="font-display text-xl font-extrabold mb-4 flex items-center gap-2" style={{ color: INK }}>
              <Database size={22} style={{ color: C.leaf }} /> DBMS &amp; SQL Cover-to-Cover Topic Components
            </h2>
            <TopicERDiagrams />
            <TopicNormalization />
          </section>
        )}

        {(activeTab === "all" || activeTab === "oop") && (
          <section className="mb-8">
            <OopModule />
          </section>
        )}

        {(activeTab === "all" || activeTab === "cn") && (
          <section className="mb-8">
            <ComputerNetworksModule />
          </section>
        )}
      </main>
    </div>
  );
}

function GlobalStyle() {
  return (
    <style>{`
      .font-display { font-family: 'Baloo 2', 'Inter', system-ui, sans-serif; }
      .font-ui { font-family: 'Inter', system-ui, sans-serif; }
      .font-code { font-family: 'JetBrains Mono', ui-monospace, monospace; }
      .sticker { box-shadow: 4px 4px 0 ${INK}; }
      .sticker-sm { box-shadow: 3px 3px 0 ${INK}; }
      .paper-dots { background-image: radial-gradient(${INK}1f 1.5px, transparent 1.5px); background-size: 20px 20px; }
    `}</style>
  );
}

function Mascot({ size = 42 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <rect x="44" y="4" width="12" height="18" rx="4" fill={C.coral} stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="54" r="38" fill={C.sun} stroke={INK} strokeWidth="4" />
      <circle cx="36" cy="48" r="5" fill={INK} />
      <circle cx="64" cy="48" r="5" fill={INK} />
      <path d="M32,64 Q50,80 68,64" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}
