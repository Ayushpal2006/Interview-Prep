import React, { useState, useEffect, useRef, useMemo, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BookOpen, Code2, ClipboardCheck, Search, Flame,
  ChevronRight, Play, CheckCircle2, XCircle, Clock, GitBranch,
  Terminal, X, RotateCcw, ArrowRight, Sparkles, ShieldCheck,
  Boxes, Layers, Globe, Database, Box, Menu, Cpu, Network, ExternalLink, Atom,
  Shield, Server, HardDrive, Wifi, Radio, Zap, Lock, RefreshCw, Activity, ArrowLeftRight, FileText, Key, Check
} from "lucide-react";

/* ======================================================================
   THEME — "study buddy" cartoon palette
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

const CATEGORY_META = {
  Fundamentals: { color: C.sun, icon: Sparkles },
  Git: { color: C.rust, icon: GitBranch },
  "Data Structures": { color: C.sky, icon: Boxes },
  Algorithms: { color: C.coral, icon: Code2 },
  OOP: { color: C.grape, icon: Layers },
  OS: { color: C.mint, icon: Cpu },
  Networking: { color: C.amber, icon: Network },
  React: { color: C.cyan, icon: Atom },
  Web: { color: C.pink, icon: Globe },
  SQL: { color: C.leaf, icon: Database },
  Docker: { color: C.docker, icon: Box },
};
const CATEGORY_NAMES = Object.keys(CATEGORY_META);

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", file: "today.md", icon: LayoutDashboard, color: C.sky },
  { id: "library", label: "Concept Library", file: "concepts.json", icon: BookOpen, color: C.sun },
  { id: "networkLab", label: "Visual Network Lab", file: "network.visualizer.jsx", icon: Network, color: C.amber },
  { id: "practice", label: "Practice Arena", file: "practice.js", icon: Code2, color: C.mint },
  { id: "assessment", label: "Assessment Mode", file: "quiz.test.js", icon: ClipboardCheck, color: C.coral },
];

/* ======================================================================
   GLOBAL STYLE + MASCOT
   ====================================================================== */

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
      .font-display { font-family: 'Baloo 2', 'Inter', system-ui, sans-serif; }
      .font-ui { font-family: 'Inter', system-ui, sans-serif; }
      .font-code { font-family: 'JetBrains Mono', ui-monospace, monospace; }
      .sticker { box-shadow: 4px 4px 0 ${INK}; }
      .sticker-sm { box-shadow: 3px 3px 0 ${INK}; }
      .paper-dots { background-image: radial-gradient(${INK}1f 1.5px, transparent 1.5px); background-size: 20px 20px; }
      * { scrollbar-width: thin; scrollbar-color: ${C.grape} transparent; }
      *::-webkit-scrollbar { width: 8px; height: 8px; }
      *::-webkit-scrollbar-track { background: transparent; }
      *::-webkit-scrollbar-thumb { background: ${C.grape}; border-radius: 8px; }
      textarea:focus, input:focus, button:focus-visible { outline: 3px solid ${C.sky}; outline-offset: 2px; }
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

/* ======================================================================
   VISUAL SVG DIAGRAM COMPONENTS
   ====================================================================== */

function DiagTable({ color = C.sky }) {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="12" y="12" width="176" height="86" rx="10" fill="#fff" stroke={INK} strokeWidth="3" />
      <rect x="12" y="12" width="176" height="26" rx="10" fill={color} stroke={INK} strokeWidth="3" />
      {[0, 1, 2].map((i) => (
        <line key={i} x1="12" y1={38 + i * 20} x2="188" y2={38 + i * 20} stroke={INK} strokeWidth="2" opacity="0.3" />
      ))}
      <line x1="76" y1="12" x2="76" y2="98" stroke={INK} strokeWidth="2" opacity="0.3" />
      <line x1="140" y1="12" x2="140" y2="98" stroke={INK} strokeWidth="2" opacity="0.3" />
    </svg>
  );
}

function DiagFlow({ steps, colors }) {
  const uid = useId();
  const w = 200, boxW = 46, n = steps.length;
  const gap = (w - boxW * n) / (n + 1);
  return (
    <svg viewBox={`0 0 ${w} 110`} className="w-full h-24">
      <defs>
        <marker id={`${uid}-arrow`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={INK} />
        </marker>
      </defs>
      {steps.map((s, i) => {
        const x = gap + i * (boxW + gap);
        return (
          <g key={i}>
            <rect x={x} y="34" width={boxW} height="42" rx="10" fill={colors ? colors[i] : C.sky} stroke={INK} strokeWidth="3" />
            <text x={x + boxW / 2} y="59" fontSize="8.5" fontWeight="700" fill={INK} textAnchor="middle">{s}</text>
            {i < n - 1 && (
              <line x1={x + boxW} y1="55" x2={x + boxW + gap - 5} y2="55" stroke={INK} strokeWidth="3" markerEnd={`url(#${uid}-arrow)`} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function DiagStack({ layers }) {
  const n = layers.length;
  const bandH = 88 / n;
  const gap = n > 5 ? 2 : 5;
  const fs = n > 5 ? 6.3 : 8.5;
  const sw = n > 5 ? 2 : 3;
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      {layers.map((l, i) => {
        const y = 100 - (i + 1) * bandH;
        return (
          <g key={i}>
            <rect x="18" y={y} width="164" height={bandH - gap} rx={n > 5 ? 5 : 8} fill={l.color} fillOpacity={l.faded ? 0.45 : 1} stroke={INK} strokeWidth={sw} />
            <text x="100" y={y + bandH / 2 + 2} fontSize={fs} fontWeight="700" fill={INK} textAnchor="middle">{l.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function DiagCompare({ left, right, colorL = C.sky, colorR = C.coral }) {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="10" y="25" width="82" height="60" rx="12" fill={colorL} stroke={INK} strokeWidth="3" />
      <text x="51" y="59" fontSize="9.5" fontWeight="800" fill="#fff" textAnchor="middle">{left}</text>
      <rect x="108" y="25" width="82" height="60" rx="12" fill={colorR} stroke={INK} strokeWidth="3" />
      <text x="149" y="59" fontSize="9.5" fontWeight="800" fill="#fff" textAnchor="middle">{right}</text>
      <circle cx="100" cy="55" r="16" fill={C.paper} stroke={INK} strokeWidth="3" />
      <text x="100" y="59" fontSize="9" fontWeight="800" fill={INK} textAnchor="middle">VS</text>
    </svg>
  );
}

function DiagFunctionBox({ inLabel = "in", outLabel = "out", label = "f()", color = C.grape }) {
  const uid = useId();
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <defs>
        <marker id={`${uid}-a`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0L8,4L0,8Z" fill={INK} />
        </marker>
      </defs>
      <text x="6" y="59" fontSize="9" fontWeight="700" fill={INK}>{inLabel}</text>
      <line x1="38" y1="55" x2="66" y2="55" stroke={INK} strokeWidth="3" markerEnd={`url(#${uid}-a)`} />
      <rect x="68" y="30" width="60" height="50" rx="12" fill={color} stroke={INK} strokeWidth="3" />
      <text x="98" y="60" fontSize="13" fontWeight="800" fill="#fff" textAnchor="middle">{label}</text>
      <line x1="130" y1="55" x2="158" y2="55" stroke={INK} strokeWidth="3" markerEnd={`url(#${uid}-a)`} />
      <text x="161" y="59" fontSize="9" fontWeight="700" fill={INK}>{outLabel}</text>
    </svg>
  );
}

function DiagGitFlow() {
  const uid = useId();
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <defs>
        <marker id={`${uid}-g`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0L7,3.5L0,7Z" fill={INK} />
        </marker>
      </defs>
      <rect x="4" y="38" width="56" height="36" rx="8" fill={C.pink} stroke={INK} strokeWidth="2.5" />
      <text x="32" y="60" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">working</text>
      <line x1="62" y1="56" x2="82" y2="56" stroke={INK} strokeWidth="2.5" markerEnd={`url(#${uid}-g)`} />
      <text x="72" y="48" fontSize="6" fontWeight="700" fill={INK} textAnchor="middle">add</text>
      <rect x="84" y="38" width="56" height="36" rx="8" fill={C.sun} stroke={INK} strokeWidth="2.5" />
      <text x="112" y="60" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">staged</text>
      <line x1="142" y1="56" x2="160" y2="56" stroke={INK} strokeWidth="2.5" markerEnd={`url(#${uid}-g)`} />
      <text x="151" y="48" fontSize="6" fontWeight="700" fill={INK} textAnchor="middle">commit</text>
      <rect x="162" y="38" width="34" height="36" rx="8" fill={C.leaf} stroke={INK} strokeWidth="2.5" />
      <text x="179" y="60" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">repo</text>
    </svg>
  );
}

function DiagBranchMerge() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <line x1="10" y1="28" x2="190" y2="28" stroke={INK} strokeWidth="3" />
      <circle cx="35" cy="28" r="6" fill={C.sky} stroke={INK} strokeWidth="2" />
      <circle cx="80" cy="28" r="6" fill={C.sky} stroke={INK} strokeWidth="2" />
      <circle cx="170" cy="28" r="6" fill={C.sky} stroke={INK} strokeWidth="2" />
      <path d="M80,28 C105,28 105,80 130,80" stroke={INK} strokeWidth="3" fill="none" />
      <circle cx="130" cy="80" r="6" fill={C.leaf} stroke={INK} strokeWidth="2" />
      <path d="M130,80 C155,80 155,28 170,28" stroke={INK} strokeWidth="3" fill="none" />
      <text x="130" y="100" fontSize="7" fontWeight="700" fill={INK} textAnchor="middle">feature branch</text>
    </svg>
  );
}

function DiagRewind() {
  const uid = useId();
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <defs>
        <marker id={`${uid}-r`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0L7,3.5L0,7Z" fill={C.coral} />
        </marker>
      </defs>
      <line x1="10" y1="65" x2="190" y2="65" stroke={INK} strokeWidth="3" />
      {[30, 70, 110, 150, 190].map((x, i) => (
        <circle key={i} cx={x} cy="65" r="7" fill={i < 3 ? C.sky : "#fff"} fillOpacity={i < 3 ? 1 : 0.4} stroke={INK} strokeWidth="2.5" />
      ))}
      <line x1="108" y1="30" x2="72" y2="30" stroke={C.coral} strokeWidth="3" markerEnd={`url(#${uid}-r)`} />
      <text x="90" y="20" fontSize="7" fontWeight="800" fill={C.coral} textAnchor="middle">reset / rebase</text>
    </svg>
  );
}

function DiagIgnore() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="70" y="18" width="60" height="74" rx="8" fill="#fff" stroke={INK} strokeWidth="3" />
      <circle cx="100" cy="55" r="34" fill="none" stroke={C.coral} strokeWidth="4.5" />
      <line x1="75" y1="80" x2="125" y2="30" stroke={C.coral} strokeWidth="4.5" />
    </svg>
  );
}

function DiagContainers({ withGuestOS = false, color = C.docker, count = 3 }) {
  const items = Array.from({ length: count });
  const boxW = 46, startX = 20, spacing = boxW + 12;
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      {items.map((_, i) => {
        const x = startX + i * spacing;
        return (
          <g key={i}>
            {withGuestOS && <rect x={x} y="14" width={boxW} height="18" rx="5" fill="#fff" stroke={INK} strokeWidth="2.2" />}
            <rect x={x} y={withGuestOS ? 34 : 16} width={boxW} height={withGuestOS ? 34 : 52} rx="8" fill={color} stroke={INK} strokeWidth="3" />
          </g>
        );
      })}
      <rect x="10" y="80" width="180" height="20" rx="8" fill="#fff" stroke={INK} strokeWidth="3" />
      <text x="100" y="93" fontSize="8" fontWeight="700" fill={INK} textAnchor="middle">
        {withGuestOS ? "Hypervisor + Host OS" : "Docker Engine (shared kernel)"}
      </text>
    </svg>
  );
}

function DiagVMvsContainer() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      {[0, 1, 2].map((i) => <rect key={i} x={22 + i * 35} y="6" width="26" height="24" rx="6" fill={C.docker} stroke={INK} strokeWidth="2.2" />)}
      <rect x="15" y="34" width="170" height="10" rx="4" fill="#fff" stroke={INK} strokeWidth="2" />
      <text x="100" y="42" fontSize="6.5" textAnchor="middle" fill={INK} fontWeight="700">shared engine</text>
      <line x1="8" y1="52" x2="192" y2="52" stroke={INK} strokeWidth="2" strokeDasharray="3 3" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={20 + i * 55} y="60" width="46" height="14" rx="4" fill="#fff" stroke={INK} strokeWidth="2" />
          <rect x={20 + i * 55} y="76" width="46" height="18" rx="4" fill={C.docker} stroke={INK} strokeWidth="2" />
        </g>
      ))}
      <text x="100" y="107" fontSize="6.5" textAnchor="middle" fill={INK} fontWeight="700">each own guest OS</text>
    </svg>
  );
}

function DiagStarTopology() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <circle cx="100" cy="55" r="16" fill={C.amber} stroke={INK} strokeWidth="3" />
      <text x="100" y="58" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">HUB/SWITCH</text>
      {[[40, 20], [160, 20], [30, 80], [170, 80], [100, 95]].map(([x, y], i) => (
        <g key={i}>
          <line x1="100" y1="55" x2={x} y2={y} stroke={INK} strokeWidth="2.5" />
          <rect x={x - 12} y={y - 9} width="24" height="18" rx="4" fill={C.sky} stroke={INK} strokeWidth="2" />
          <text x={x} y={y + 3} fontSize="6" fontWeight="700" fill="#fff" textAnchor="middle">N{i + 1}</text>
        </g>
      ))}
    </svg>
  );
}

function DiagOSIvsTCPIP() {
  const osi = [
    { name: "7. Application", col: C.coral },
    { name: "6. Presentation", col: C.pink },
    { name: "5. Session", col: C.grape },
    { name: "4. Transport", col: C.sky },
    { name: "3. Network", col: C.mint },
    { name: "2. Data Link", col: C.sun },
    { name: "1. Physical", col: C.leaf }
  ];
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <text x="48" y="10" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">OSI Model (7)</text>
      {osi.map((l, i) => (
        <g key={i}>
          <rect x="8" y={14 + i * 13} width="80" height="11" rx="3" fill={l.col} stroke={INK} strokeWidth="1.5" />
          <text x="48" y={22 + i * 13} fontSize="5.5" fontWeight="800" fill={INK} textAnchor="middle">{l.name}</text>
        </g>
      ))}
      <rect x="112" y="14" width="80" height="37" rx="4" fill={C.coral} stroke={INK} strokeWidth="1.5" />
      <text x="152" y="35" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">Application</text>
      <rect x="112" y="53" width="80" height="11" rx="3" fill={C.sky} stroke={INK} strokeWidth="1.5" />
      <text x="152" y="61" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">Transport</text>
      <rect x="112" y="66" width="80" height="11" rx="3" fill={C.mint} stroke={INK} strokeWidth="1.5" />
      <text x="152" y="74" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">Internet</text>
      <rect x="112" y="79" width="80" height="24" rx="4" fill={C.leaf} stroke={INK} strokeWidth="1.5" />
      <text x="152" y="94" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">Link Layer</text>
    </svg>
  );
}

function DiagERDiagram() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="80" y="45" width="40" height="24" rx="4" fill={C.coral} stroke={INK} strokeWidth="2.5" />
      <text x="100" y="60" fontSize="7" fontWeight="800" fill="#fff" textAnchor="middle">Student</text>
      <ellipse cx="40" cy="30" rx="22" ry="12" fill={C.sun} stroke={INK} strokeWidth="2" />
      <text x="40" y="32" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle" textDecoration="underline">Roll_no</text>
      <line x1="58" y1="36" x2="82" y2="48" stroke={INK} strokeWidth="1.8" />
    </svg>
  );
}

function DiagClassObject() {
  const uid = useId();
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <defs>
        <marker id={`${uid}-co`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0L7,3.5L0,7Z" fill={INK} />
        </marker>
      </defs>
      <rect x="8" y="15" width="70" height="80" rx="8" fill={C.sun} stroke={INK} strokeWidth="2.5" strokeDasharray="4 2" />
      <text x="43" y="30" fontSize="7.5" fontWeight="800" fill={INK} textAnchor="middle">Class Blueprint</text>
      <line x1="82" y1="55" x2="114" y2="55" stroke={INK} strokeWidth="2.5" markerEnd={`url(#${uid}-co)`} />
      <rect x="118" y="15" width="74" height="80" rx="8" fill={C.grape} stroke={INK} strokeWidth="2.5" />
      <text x="155" y="30" fontSize="7.5" fontWeight="800" fill="#fff" textAnchor="middle">Object Instance</text>
    </svg>
  );
}

/* ======================================================================
   NEW OPERATING SYSTEMS (OS) VISUAL DIAGRAMS (FROM PDF NOTES)
   ====================================================================== */

function DiagOSTypes() {
  const types = ["Batch", "MultiProg", "MultiTask", "TimeShare", "RTOS"];
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      {types.map((t, i) => (
        <g key={i}>
          <rect x={6 + i * 38} y="25" width="34" height="60" rx="6" fill={i % 2 === 0 ? C.mint : C.sky} stroke={INK} strokeWidth="2" />
          <text x={23 + i * 38} y="58" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">{t}</text>
        </g>
      ))}
    </svg>
  );
}

function DiagProcessLifecycle() {
  const uid = useId();
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <defs>
        <marker id={`${uid}-p`} markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <path d="M0,0L6,3L0,6Z" fill={INK} />
        </marker>
      </defs>
      <rect x="6" y="42" width="32" height="24" rx="5" fill={C.sun} stroke={INK} strokeWidth="2" />
      <text x="22" y="56" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">New</text>

      <line x1="38" y1="54" x2="56" y2="54" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-p)`} />

      <rect x="58" y="42" width="36" height="24" rx="5" fill={C.sky} stroke={INK} strokeWidth="2" />
      <text x="76" y="56" fontSize="6" fontWeight="800" fill="#fff" textAnchor="middle">Ready</text>

      <line x1="94" y1="54" x2="112" y2="54" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-p)`} />

      <rect x="114" y="42" width="40" height="24" rx="5" fill={C.mint} stroke={INK} strokeWidth="2" />
      <text x="134" y="56" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">Running</text>

      <line x1="154" y1="54" x2="168" y2="54" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-p)`} />

      <rect x="170" y="42" width="26" height="24" rx="5" fill={C.leaf} stroke={INK} strokeWidth="2" />
      <text x="183" y="56" fontSize="5.5" fontWeight="800" fill={INK} textAnchor="middle">Exit</text>

      <path d="M134,66 C 134,95 76,95 76,66" fill="none" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-p)`} />
      <text x="105" y="92" fontSize="5.5" fontWeight="700" fill={C.coral} textAnchor="middle">Wait I/O</text>
    </svg>
  );
}

function DiagSchedulingMetrics() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="10" y="20" width="180" height="25" rx="6" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <rect x="10" y="20" width="40" height="25" rx="6" fill={C.pink} stroke={INK} strokeWidth="2" />
      <text x="30" y="36" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">Arrival</text>
      <rect x="50" y="20" width="60" height="25" fill={C.sun} stroke={INK} strokeWidth="2" />
      <text x="80" y="36" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">Wait (WT)</text>
      <rect x="110" y="20" width="80" height="25" rx="6" fill={C.mint} stroke={INK} strokeWidth="2" />
      <text x="150" y="36" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">Burst (BT)</text>
      <line x1="50" y1="60" x2="190" y2="60" stroke={INK} strokeWidth="3" />
      <text x="120" y="78" fontSize="7" fontWeight="800" fill={C.coral} textAnchor="middle">Turnaround Time (TAT = CT - AT)</text>
    </svg>
  );
}

function DiagForkTree() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <circle cx="100" cy="22" r="10" fill={C.coral} stroke={INK} strokeWidth="2" />
      <text x="100" y="25" fontSize="6.5" fontWeight="800" fill="#fff" textAnchor="middle">P0</text>
      <line x1="100" y1="32" x2="60" y2="60" stroke={INK} strokeWidth="2" />
      <line x1="100" y1="32" x2="140" y2="60" stroke={INK} strokeWidth="2" />
      <circle cx="60" cy="60" r="9" fill={C.sky} stroke={INK} strokeWidth="2" />
      <text x="60" y="63" fontSize="6" fontWeight="800" fill="#fff" textAnchor="middle">P1</text>
      <circle cx="140" cy="60" r="9" fill={C.sky} stroke={INK} strokeWidth="2" />
      <text x="140" y="63" fontSize="6" fontWeight="800" fill="#fff" textAnchor="middle">P2</text>
      <text x="100" y="94" fontSize="7.5" fontWeight="800" fill={INK} textAnchor="middle">fork() n calls &rarr; 2^n - 1 children</text>
    </svg>
  );
}

function DiagCriticalSectionThree() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      {[
        { name: "Mutual Exclusion", desc: "1 process in CS", col: C.coral },
        { name: "Progress", desc: "No deadlock wait", col: C.sun },
        { name: "Bounded Wait", desc: "No starvation", col: C.leaf }
      ].map((item, i) => (
        <g key={i}>
          <rect x={12 + i * 62} y="15" width="54" height="80" rx="8" fill={item.col} stroke={INK} strokeWidth="2.5" />
          <text x={39 + i * 62} y="38" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">{item.name}</text>
          <text x={39 + i * 62} y="62" fontSize="5.5" fontWeight="700" fill={INK} textAnchor="middle">{item.desc}</text>
        </g>
      ))}
    </svg>
  );
}

function DiagDeadlock4Conditions() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <circle cx="100" cy="55" r="42" fill="none" stroke={C.coral} strokeWidth="3" strokeDasharray="4 2" />
      <text x="100" y="58" fontSize="7" fontWeight="900" fill={C.coral} textAnchor="middle">DEADLOCK</text>
      {[
        { name: "MutEx", x: 60, y: 25 },
        { name: "Hold&Wait", x: 140, y: 25 },
        { name: "NoPreempt", x: 60, y: 85 },
        { name: "CircularWait", x: 140, y: 85 }
      ].map((item, i) => (
        <g key={i}>
          <rect x={item.x - 22} y={item.y - 10} width="44" height="20" rx="4" fill={C.sun} stroke={INK} strokeWidth="1.8" />
          <text x={item.x} y={item.y + 3} fontSize="5.5" fontWeight="800" fill={INK} textAnchor="middle">{item.name}</text>
        </g>
      ))}
    </svg>
  );
}

function DiagMemoryFitSchemes() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="8" y="20" width="56" height="70" rx="6" fill={C.sky} stroke={INK} strokeWidth="2" />
      <text x="36" y="38" fontSize="6.5" fontWeight="800" fill="#fff" textAnchor="middle">First Fit</text>
      <text x="36" y="58" fontSize="5.5" fill="#fff" textAnchor="middle">1st hole that fits</text>

      <rect x="72" y="20" width="56" height="70" rx="6" fill={C.mint} stroke={INK} strokeWidth="2" />
      <text x="100" y="38" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">Best Fit</text>
      <text x="100" y="58" fontSize="5.5" fill={INK} textAnchor="middle">Min leftover gap</text>

      <rect x="136" y="20" width="56" height="70" rx="6" fill={C.coral} stroke={INK} strokeWidth="2" />
      <text x="164" y="38" fontSize="6.5" fontWeight="800" fill="#fff" textAnchor="middle">Worst Fit</text>
      <text x="164" y="58" fontSize="5.5" fill="#fff" textAnchor="middle">Max leftover gap</text>
    </svg>
  );
}

function DiagDiskArmPlatter() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <circle cx="70" cy="55" r="38" fill={C.sun} stroke={INK} strokeWidth="3" />
      <circle cx="70" cy="55" r="24" fill="none" stroke={INK} strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="70" cy="55" r="10" fill={INK} />

      <line x1="70" y1="55" x2="160" y2="25" stroke={C.coral} strokeWidth="4" strokeLinecap="round" />
      <rect x="155" y="18" width="25" height="15" rx="3" fill={C.sky} stroke={INK} strokeWidth="2" />
      <text x="167" y="28" fontSize="5.5" fontWeight="800" fill="#fff" textAnchor="middle">Head</text>
      <text x="130" y="90" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">Seek + Latency + Transfer</text>
    </svg>
  );
}

function DiagThrashingSpike() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <line x1="15" y1="90" x2="185" y2="90" stroke={INK} strokeWidth="3" />
      <path d="M20,80 Q60,20 90,30 Q120,85 180,88" fill="none" stroke={C.coral} strokeWidth="4" />
      <text x="90" y="20" fontSize="7.5" fontWeight="900" fill={C.coral} textAnchor="middle">Thrashing Spike!</text>
      <text x="100" y="104" fontSize="6.5" fontWeight="700" fill={INK} textAnchor="middle">CPU spends 99% time swapping pages</text>
    </svg>
  );
}

/* ======================================================================
   CONCEPT DATA — Fundamentals, Git, DS, Algorithms, OOP, OS, Networking, React, Web, SQL, Docker
   ====================================================================== */

let _id = 0;
const nid = () => ++_id;

const CONCEPTS = [
  // ---------- Fundamentals ----------
  { id: nid(), cat: "Fundamentals", term: "Big-O notation", def: "Describes how runtime or memory grows as input size grows, focused on worst-case performance.", example: "O(1) < O(log n) < O(n) < O(n log n) < O(n²)", Diagram: DiagTable, dp: { color: C.coral }, link: "https://en.wikipedia.org/wiki/Big_O_notation" },

  // ---------- Git (FULLY PRESERVED) ----------
  { id: nid(), cat: "Git", term: "Working dir → staging → repo", def: "Edits live in working directory, `git add` stages snapshot, `git commit` locks snapshot into repo history.", example: "git status\ngit add index.js\ngit commit -m \"add login form\"", Diagram: DiagGitFlow, dp: {}, link: "https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository" },
  { id: nid(), cat: "Git", term: "git init & git clone", def: "git init turns folder into new Git repo. git clone copies an entire existing remote repository onto your machine.", example: "git init\ngit clone https://github.com/user/repo.git", Diagram: DiagFlow, dp: { steps: ["init", "or clone", "repo"], colors: [C.sun, C.sky, C.leaf] }, link: "https://git-scm.com/docs/git-clone" },
  { id: nid(), cat: "Git", term: "Configuring your identity", def: "Git requires user.name and user.email to author commits.", example: "git config --global user.name \"Alice Dev\"\ngit config --global user.email \"alice@mail.com\"", Diagram: DiagFunctionBox, dp: { inLabel: "name/email", outLabel: "commits", label: "config" }, link: "https://git-scm.com/docs/git-config" },
  { id: nid(), cat: "Git", term: "Staging & diffing", def: "git diff shows unstaged changes; git diff --staged shows staged changes about to be committed.", example: "git diff\ngit add file.js\ngit diff --staged", Diagram: DiagFlow, dp: { steps: ["working", "diff", "staged"], colors: [C.pink, C.sun, C.leaf] }, link: "https://git-scm.com/docs/git-diff" },
  { id: nid(), cat: "Git", term: "Branching & Merging", def: "A branch is a movable commit pointer. git merge integrates commits from another branch into your current branch.", example: "git branch feature\ngit checkout main\ngit merge feature", Diagram: DiagBranchMerge, dp: {}, link: "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging" },
  { id: nid(), cat: "Git", term: "Stashing & Rewriting", def: "git stash shelves uncommitted work. git rebase replays commits; git reset rewinds history.", example: "git stash\ngit stash pop\ngit rebase main\ngit reset --hard HEAD~1", Diagram: DiagRewind, dp: {}, link: "https://git-scm.com/docs/git-stash" },
  { id: nid(), cat: "Git", term: ".gitignore & patterns", def: "Files matching .gitignore patterns are ignored by Git and never committed.", example: "node_modules/\n.env\ndist/", Diagram: DiagIgnore, dp: {}, link: "https://git-scm.com/docs/gitignore" },

  // ---------- Docker (FULLY PRESERVED) ----------
  { id: nid(), cat: "Docker", term: "What is Docker?", def: "Packages an app with code, runtime, system tools, and libraries into a portable container.", example: "\"Works on my machine\" → Works in container everywhere.", Diagram: DiagContainers, dp: { withGuestOS: false, count: 3 }, link: "https://docs.docker.com/get-started/docker-overview/" },
  { id: nid(), cat: "Docker", term: "Containers vs. Virtual Machines", def: "Containers share host kernel (lightweight). VMs bundle a full guest OS (heavy hypervisor).", example: "3 containers share 1 kernel | 3 VMs run 3 guest OSs", Diagram: DiagVMvsContainer, dp: {} },
  { id: nid(), cat: "Docker", term: "Images vs. Containers", def: "Image is immutable read-only blueprint (class); Container is live running instance (object).", example: "docker run -d nginx", Diagram: DiagCompare, dp: { left: "Image", right: "Container", colorL: C.sun, colorR: C.docker } },
  { id: nid(), cat: "Docker", term: "Dockerfile & Image Layers", def: "Dockerfile instructions build cached read-only image layers step-by-step.", example: "FROM node:20\nCOPY . .\nRUN npm install\nCMD [\"node\",\"server.js\"]", Diagram: DiagFlow, dp: { steps: ["Dockerfile", "build", "Image"], colors: [C.sun, C.grape, C.docker] } },
  { id: nid(), cat: "Docker", term: "Volumes & Persistent Storage", def: "Containers are ephemeral. Volumes store data outside the container filesystem so database data persists.", example: "docker run -v pgdata:/var/lib/postgresql/data postgres", Diagram: DiagStack, dp: { layers: [{ label: "container (ephemeral)", color: C.pink }, { label: "volume (persists)", color: C.leaf }] } },
  { id: nid(), cat: "Docker", term: "Docker Compose & Networks", def: "Docker Compose defines multi-container applications in YAML (web + db + redis).", example: "docker compose up -d", Diagram: DiagContainers, dp: { withGuestOS: false, count: 3 } },

  // ---------- OPERATING SYSTEMS (EXPANDED COVER-TO-COVER FROM PDF) ----------
  { id: nid(), cat: "OS", term: "Operating System & 5 Types", def: "Interface between user and hardware. 5 Types: Batch OS, Multiprogramming OS (CPU busy on I/O), Multitasking OS (quick context switch), Time-Sharing OS, Real-Time OS (RTOS strict deadlines).", example: "RTOS used in aviation/automotive; Multitasking in Windows/Linux.", Diagram: DiagOSTypes, dp: {}, link: "https://en.wikipedia.org/wiki/Operating_system" },
  { id: nid(), cat: "OS", term: "Process & PCB (Process Control Block)", def: "Process is a program under execution. Program Counter (PC) holds next instruction address. PCB holds state, PC, registers, memory limits.", example: "PCB = Process ID + Program Counter + State + Registers", Diagram: DiagProcessLifecycle, dp: {}, link: "https://en.wikipedia.org/wiki/Process_control_block" },
  { id: nid(), cat: "OS", term: "Process Scheduling Metrics", def: "Arrival Time (AT), Burst Time (BT), Completion Time (CT). Turnaround Time (TAT) = CT - AT. Waiting Time (WT) = TAT - BT.", example: "TAT = CT - AT | WT = TAT - BT", Diagram: DiagSchedulingMetrics, dp: {} },
  { id: nid(), cat: "OS", term: "Thread vs. Process & `fork()` Call", def: "Thread is a lightweight unit of CPU execution sharing code/data memory. `fork()` system call with n calls creates 2^n - 1 child processes.", example: "fork(); fork(); // Creates 2^2 - 1 = 3 child processes", Diagram: DiagForkTree, dp: {}, link: "https://en.wikipedia.org/wiki/Fork_(system_call)" },
  { id: nid(), cat: "OS", term: "CPU Scheduling Algorithms", def: "FCFS (First Come First Serve), SJF (Shortest Job First), SRTF (Preemptive SJF), Round Robin (time quantum), Priority, HRRN (Highest Response Ratio Next), MLFQ (Multilevel Feedback Queue).", example: "HRRN Response Ratio = (WT + BT) / BT (prevents starvation)", Diagram: DiagFlow, dp: { steps: ["FCFS", "SJF", "RR", "MLFQ"], colors: [C.sky, C.sun, C.mint, C.coral] } },
  { id: nid(), cat: "OS", term: "Critical Section Problem & Conditions", def: "Code segment accessing shared variables. 3 necessary conditions for solution: 1. Mutual Exclusion, 2. Progress, 3. Bounded Waiting.", example: "Mutual Exclusion ensures only 1 process in Critical Section at a time.", Diagram: DiagCriticalSectionThree, dp: {} },
  { id: nid(), cat: "OS", term: "Semaphores (Binary vs. Counting) & Mutex", def: "Synchronization tool lock. Binary Semaphore (0 or 1 value). Counting Semaphore (integer resource count). Mutex = mutual exclusion key lock.", example: "Mutex: producer/consumer lock | Semaphore: counting available slots.", Diagram: DiagCompare, dp: { left: "Binary (0/1)", right: "Counting (N)", colorL: C.sky, colorR: C.leaf } },
  { id: nid(), cat: "OS", term: "Deadlocks & 4 Necessary Conditions", def: "System blocked where processes wait for resources held by each other. 4 conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.", example: "Circular Wait: P1 holds R1 waiting for R2 while P2 holds R2 waiting for R1.", Diagram: DiagDeadlock4Conditions, dp: {}, link: "https://en.wikipedia.org/wiki/Deadlock" },
  { id: nid(), cat: "OS", term: "Deadlock Avoidance: Banker's Algorithm", def: "Deadlock avoidance technique named after banking system. Tests for safe allocation states before granting resources.", example: "Allocates resources only if system remains in a SAFE state.", Diagram: DiagTable, dp: { color: C.sun } },
  { id: nid(), cat: "OS", term: "Memory Management: First Fit, Best Fit, Worst Fit", def: "Variable partitioning memory allocation: First Fit (first fitting hole), Best Fit (minimum leftover gap), Worst Fit (maximum leftover gap).", example: "Best fit minimizes leftover gap; Worst fit leaves max remaining space.", Diagram: DiagMemoryFitSchemes, dp: {} },
  { id: nid(), cat: "OS", term: "Paging vs. Segmentation", def: "Paging divides physical memory into equal frames and main memory into pages (eliminates external fragmentation). Segmentation gives user logical view of memory segments.", example: "Paging = fixed-size frames | Segmentation = variable logical segments", Diagram: DiagCompare, dp: { left: "Paging (Fixed)", right: "Segment (Logical)", colorL: C.mint, colorR: C.grape } },
  { id: nid(), cat: "OS", term: "Page Fault & Page Replacement (FIFO, LRU, Optimal)", def: "Page Fault occurs when virtual page is not in RAM. Page replacement: FIFO (subject to Belady's Anomaly), LRU (Least Recently Used), Optimal (future lookahead benchmark).", example: "Belady's Anomaly: FIFO page faults INCREASE when frames INCREASE!", Diagram: DiagFlow, dp: { steps: ["Page Fault", "FIFO", "LRU", "Optimal"], colors: [C.coral, C.sun, C.sky, C.leaf] } },
  { id: nid(), cat: "OS", term: "Disk Scheduling (Seek Time, Latency, SCAN / SSTF)", def: "I/O scheduling: Seek Time (arm to track) + Rotational Latency + Transfer Time. Algorithms: FCFS, SSTF (Shortest Seek Time First), SCAN (Elevator), C-SCAN, LOOK, C-LOOK.", example: "SCAN = Elevator algorithm moving end-to-end.", Diagram: DiagDiskArmPlatter, dp: {} },
  { id: nid(), cat: "OS", term: "Monolithic vs. Microkernel", def: "Monolithic Kernel includes all OS services in single executable. Microkernel runs minimal core kernel with services in user space.", example: "Linux = Monolithic Kernel | L4 / QNX = Microkernel", Diagram: DiagCompare, dp: { left: "Monolithic", right: "Microkernel", colorL: C.coral, colorR: C.sky } },
  { id: nid(), cat: "OS", term: "Thrashing & Virtual Memory", def: "Thrashing occurs when OS spends more time swapping pages in/out of disk than executing instructions due to high page fault rate.", example: "CPU utilization drops to near zero as swapping spikes.", Diagram: DiagThrashingSpike, dp: {} },

  // ---------- OBJECT ORIENTED PROGRAMMING ----------
  { id: nid(), cat: "OOP", term: "Class vs. Object & Memory Allocation", def: "Class is logical user-defined blueprint (0 memory). Object is runtime instance. `new` allocates Heap memory & Stack address pointer.", example: "student* s = new student();", Diagram: DiagClassObject, dp: {} },
  { id: nid(), cat: "OOP", term: "5 Types of Inheritance & Access Specifiers", def: "Single, Multiple, Hierarchical, Multilevel, Hybrid. Access: Private (same class 🔒), Protected (class + derived), Public (anywhere 🌐).", example: "class Derived : public Base1, public Base2 { };", Diagram: DiagFlow, dp: { steps: ["Single", "Multiple", "Hierarchical", "Hybrid"], colors: [C.sky, C.mint, C.sun, C.coral] } },
  { id: nid(), cat: "OOP", term: "Polymorphism: Overloading vs. Overriding", def: "Overloading = same function name, different parameters in same class (static). Overriding = same function signature in parent & child class (dynamic V-table).", example: "Overloading: add(a,b) vs add(a,b,c)\nOverriding: virtual void show()", Diagram: DiagCompare, dp: { left: "Overloading", right: "Overriding", colorL: C.sky, colorR: C.coral } },

  // ---------- COMPUTER NETWORKS ----------
  { id: nid(), cat: "Networking", term: "Network Topologies (Star, Ring, Bus, Mesh, Tree, Hybrid)", def: "Layout of nodes and cables. Star (hub), Ring (token), Bus (backbone), Mesh (direct N*(N-1)/2 links), Tree, Hybrid.", example: "Star, Ring, Bus, Mesh, Tree, Hybrid topologies", Diagram: DiagStarTopology, dp: {} },
  { id: nid(), cat: "Networking", term: "OSI Model (7 Layers) vs TCP/IP (4 Layers)", def: "OSI: Physical, Data Link, Network, Transport, Session, Presentation, Application. TCP/IP: Link, Internet, Transport, Application.", example: "OSI = 7 Layer Standard | TCP/IP = 4 Layer Internet Protocol", Diagram: DiagOSIvsTCPIP, dp: {} },

  // ---------- DBMS & SQL ----------
  { id: nid(), cat: "SQL", term: "ER Diagram & Normalization (1NF → BCNF)", def: "ER entities, attributes, keys. Normalization removes redundancy: 1NF (Atomic), 2NF (No partial dep), 3NF (No transitive dep), BCNF.", example: "1NF ⊃ 2NF ⊃ 3NF ⊃ BCNF", Diagram: DiagERDiagram, dp: {} },

  // ---------- Data Structures & Algorithms ----------
  { id: nid(), cat: "Data Structures", term: "Arrays vs. linked lists", def: "Arrays give O(1) index access but O(n) insert. Linked lists give O(1) insert once pointer is positioned.", example: "Random access → Array | Frequent inserts → Linked List", Diagram: DiagCompare, dp: { left: "Array", right: "Linked List", colorL: C.sky, colorR: C.coral } },
  { id: nid(), cat: "Algorithms", term: "Two pointers", def: "Move two indices through array to solve problems in O(n) without nested loops.", example: "let l=0, r=n-1; while(l<r) { ... }", Diagram: DiagTable, dp: { color: C.coral } },
  { id: nid(), cat: "React", term: "useState vs. useReducer", def: "useState is best for simple values. useReducer centralizes state transitions when logic is complex.", example: "const [state, dispatch] = useReducer(reducer, initial);", Diagram: DiagCompare, dp: { left: "useState", right: "useReducer", colorL: C.sky, colorR: C.grape } }
];

const CATEGORIES = ["All", ...CATEGORY_NAMES];

/* ======================================================================
   INTERACTIVE VISUAL NETWORK LAB
   ====================================================================== */

function NetworkVisualLab() {
  const [selectedTop, setSelectedTop] = useState("Star");
  const [failedNode, setFailedNode] = useState(null);

  const topologies = [
    { name: "Star", desc: "Nodes connect to central switch. Robust against single node cable cuts, but central switch failure downs network.", color: C.sun },
    { name: "Ring", desc: "Nodes connect in a circle. Single cut breaks whole ring flow.", color: C.grape },
    { name: "Bus", desc: "Single backbone cable. Backbone break cuts entire network.", color: C.amber },
    { name: "Mesh", desc: "Direct links between every node (N*(N-1)/2). Max fault tolerance.", color: C.coral }
  ];

  return (
    <div className="p-5 md:p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Network size={28} style={{ color: C.amber }} />
        <h1 className="font-display text-2xl font-extrabold" style={{ color: INK }}>Interactive Visual Network Lab</h1>
      </div>
      <p className="font-code text-[13px] mb-6" style={{ color: C.textMuted }}>
        // Visual thinker interactive sandbox — toggle topology modes, simulate node failures & trace network impact
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {topologies.map((t) => (
          <button
            key={t.name}
            onClick={() => { setSelectedTop(t.name); setFailedNode(null); }}
            className="p-3 rounded-2xl text-left sticker-sm transition-all"
            style={{
              backgroundColor: selectedTop === t.name ? t.color : C.card,
              border: `3px solid ${INK}`,
              transform: selectedTop === t.name ? "scale(1.02)" : "scale(1)"
            }}
          >
            <p className="font-display text-lg font-extrabold" style={{ color: INK }}>{t.name} Topology</p>
            <p className="text-[11px] font-ui mt-1" style={{ color: INK }}>{t.desc}</p>
          </button>
        ))}
      </div>

      <div className="rounded-3xl p-6 mb-6 sticker" style={{ backgroundColor: C.card, border: `3.5px solid ${INK}` }}>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
          <div>
            <span className="font-display text-lg font-bold" style={{ color: INK }}>Active Simulation: {selectedTop} Topology</span>
            <p className="text-xs font-ui text-gray-500">Click any computer node below to cut its cable and observe network impact!</p>
          </div>
          <button
            onClick={() => setFailedNode(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold font-ui sticker-sm"
            style={{ backgroundColor: C.sun, color: INK, border: `2px solid ${INK}` }}
          >
            <RotateCcw size={12} /> Reset Network Nodes
          </button>
        </div>

        <div className="w-full h-64 bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center p-4">
          <svg viewBox="0 0 400 220" className="w-full h-full">
            {selectedTop === "Star" && (
              <g>
                <rect x="180" y="90" width="40" height="40" rx="8" fill={failedNode === "central" ? C.coral : C.amber} stroke="#fff" strokeWidth="2.5" />
                <text x="200" y="114" fontSize="10" fontWeight="900" fill="#fff" textAnchor="middle">HUB</text>
                {[
                  { id: 1, x: 80, y: 40 },
                  { id: 2, x: 320, y: 40 },
                  { id: 3, x: 70, y: 170 },
                  { id: 4, x: 330, y: 170 },
                  { id: 5, x: 200, y: 190 }
                ].map((n) => {
                  const isFailed = failedNode === n.id || failedNode === "central";
                  return (
                    <g key={n.id} onClick={() => setFailedNode(n.id)} className="cursor-pointer">
                      <line x1="200" y1="110" x2={n.x} y2={n.y} stroke={isFailed ? C.coral : C.mint} strokeWidth="3" strokeDasharray={isFailed ? "4 4" : "none"} />
                      <circle cx={n.x} cy={n.y} r="18" fill={isFailed ? C.coral : C.sky} stroke="#fff" strokeWidth="2.5" />
                      <text x={n.x} y={n.y + 4} fontSize="10" fontWeight="800" fill="#fff" textAnchor="middle">{isFailed ? "X" : `PC ${n.id}`}</text>
                    </g>
                  );
                })}
              </g>
            )}

            {selectedTop === "Ring" && (
              <g>
                <circle cx="200" cy="110" r="70" fill="none" stroke={failedNode ? C.coral : C.mint} strokeWidth="4" strokeDasharray={failedNode ? "6 4" : "none"} />
                {[0, 72, 144, 216, 288].map((deg, i) => {
                  const rad = (deg * Math.PI) / 180;
                  const x = 200 + 70 * Math.cos(rad);
                  const y = 110 + 70 * Math.sin(rad);
                  const isFailed = failedNode === (i + 1);
                  return (
                    <g key={i} onClick={() => setFailedNode(i + 1)} className="cursor-pointer">
                      <circle cx={x} cy={y} r="18" fill={isFailed ? C.coral : C.grape} stroke="#fff" strokeWidth="2.5" />
                      <text x={x} y={y + 4} fontSize="10" fontWeight="800" fill="#fff" textAnchor="middle">{isFailed ? "CUT" : `N${i + 1}`}</text>
                    </g>
                  );
                })}
              </g>
            )}

            {selectedTop === "Bus" && (
              <g>
                <line x1="40" y1="110" x2="360" y2="110" stroke={failedNode === "bus" ? C.coral : C.sun} strokeWidth="6" />
                <rect x="25" y="100" width="15" height="20" fill={C.coral} rx="3" />
                <rect x="360" y="100" width="15" height="20" fill={C.coral} rx="3" />
                {[80, 160, 240, 320].map((x, i) => {
                  const isTop = i % 2 === 0;
                  const y = isTop ? 45 : 175;
                  const lineY = isTop ? 70 : 150;
                  const isFailed = failedNode === (i + 1);
                  return (
                    <g key={i} onClick={() => setFailedNode(i + 1)} className="cursor-pointer">
                      <line x1={x} y1="110" x2={x} y2={lineY} stroke={isFailed ? C.coral : "#fff"} strokeWidth="3" />
                      <rect x={x - 20} y={y - 15} width="40" height="30" rx="6" fill={isFailed ? C.coral : C.leaf} stroke="#fff" strokeWidth="2" />
                      <text x={x} y={y + 4} fontSize="9" fontWeight="800" fill={INK} textAnchor="middle">{isFailed ? "OFF" : `Node ${i + 1}`}</text>
                    </g>
                  );
                })}
              </g>
            )}

            {selectedTop === "Mesh" && (
              <g>
                {[
                  { id: 1, x: 120, y: 45 },
                  { id: 2, x: 280, y: 45 },
                  { id: 3, x: 80, y: 165 },
                  { id: 4, x: 320, y: 165 }
                ].map((n1, i, arr) =>
                  arr.slice(i + 1).map((n2) => (
                    <line key={`${n1.id}-${n2.id}`} x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke={C.cyan} strokeWidth="2.5" opacity="0.8" />
                  ))
                )}
                {[
                  { id: 1, x: 120, y: 45 },
                  { id: 2, x: 280, y: 45 },
                  { id: 3, x: 80, y: 165 },
                  { id: 4, x: 320, y: 165 }
                ].map((n) => {
                  const isFailed = failedNode === n.id;
                  return (
                    <g key={n.id} onClick={() => setFailedNode(n.id)} className="cursor-pointer">
                      <circle cx={n.x} cy={n.y} r="20" fill={isFailed ? C.coral : C.coral} stroke="#fff" strokeWidth="2.5" />
                      <text x={n.x} y={n.y + 4} fontSize="10" fontWeight="900" fill="#fff" textAnchor="middle">{isFailed ? "DOWN" : `Node ${n.id}`}</text>
                    </g>
                  );
                })}
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   SHARED BITS
   ====================================================================== */

function Pill({ children, color, style }) {
  return (
    <span
      className="font-code text-[11px] px-2 py-0.5 rounded-full font-bold"
      style={{ color: INK, backgroundColor: color, border: `2px solid ${INK}`, ...style }}
    >
      {children}
    </span>
  );
}

function SectionLabel({ children, icon: Icon }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      {Icon && <Icon size={16} style={{ color: C.grape }} />}
      <span className="font-display text-sm font-bold" style={{ color: INK }}>{children}</span>
    </div>
  );
}

/* ======================================================================
   SIDEBAR + NAV
   ====================================================================== */

function Sidebar({ active, setActive }) {
  return (
    <aside
      className="hidden md:flex md:flex-col w-64 shrink-0 h-screen sticky top-0 font-ui"
      style={{ backgroundColor: "#2B2660" }}
    >
      <div className="px-5 py-5 flex items-center gap-3" style={{ borderBottom: "3px solid #1F1B4A" }}>
        <Mascot size={40} />
        <div>
          <p className="font-display text-[15px] font-extrabold leading-none text-white">dev.prep</p>
          <p className="font-code text-[10px] mt-1" style={{ color: "#B8B0F0" }}>sde1 study buddy</p>
        </div>
      </div>

      <div className="px-3 pt-4 flex-1 overflow-y-auto">
        <p className="font-code text-[10px] px-2 pb-2 tracking-wider" style={{ color: "#8A82C9" }}>MENU</p>
        <nav className="flex flex-col gap-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActive(item.id)}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left"
                style={{
                  backgroundColor: isActive ? item.color : "transparent",
                }}
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-xl shrink-0"
                  style={{ backgroundColor: isActive ? "#fff" : "#3A3480", border: isActive ? `2px solid ${INK}` : "none" }}
                >
                  <Icon size={15} style={{ color: isActive ? item.color : "#C9C3F0" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] leading-tight truncate font-semibold" style={{ color: isActive ? INK : "#E4E0FA" }}>
                    {item.label}
                  </p>
                  <p className="font-code text-[10px] truncate" style={{ color: isActive ? INK + "AA" : "#8A82C9" }}>
                    {item.file}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </nav>
      </div>

      <div className="px-4 py-4" style={{ borderTop: "3px solid #1F1B4A" }}>
        <div className="flex items-center justify-between rounded-2xl px-3 py-2.5" style={{ backgroundColor: C.sun, border: `2.5px solid ${INK}` }}>
          <div className="flex items-center gap-1.5">
            <Flame size={14} style={{ color: INK }} />
            <span className="font-display text-[12px] font-bold" style={{ color: INK }}>12-day streak!</span>
          </div>
          <Pill color={C.coral}>14d left</Pill>
        </div>
      </div>
    </aside>
  );
}

function MobileNav({ active, setActive }) {
  return (
    <div
      className="flex md:hidden items-center justify-between px-3 py-2 sticky top-0 z-20 font-ui"
      style={{ backgroundColor: "#2B2660" }}
    >
      <div className="flex items-center gap-2">
        <Mascot size={26} />
        <span className="font-display text-[14px] font-extrabold text-white">dev.prep</span>
      </div>
      <div className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              aria-label={item.label}
              className="p-2 rounded-xl"
              style={{ backgroundColor: isActive ? item.color : "transparent" }}
            >
              <Icon size={16} style={{ color: isActive ? INK : "#C9C3F0" }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TabBar({ active, setActive }) {
  return (
    <div className="hidden sm:flex items-end gap-1.5 px-4 pt-3 overflow-x-auto font-ui" style={{ backgroundColor: C.paper }}>
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className="flex items-center gap-2 px-4 py-2 shrink-0 rounded-t-xl"
            style={{
              backgroundColor: isActive ? C.card : "#F1E7D4",
              border: `2.5px solid ${INK}`,
              borderBottom: isActive ? `2.5px solid ${C.card}` : `2.5px solid ${INK}`,
              marginBottom: isActive ? "-2px" : "0",
              opacity: isActive ? 1 : 0.7,
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color, border: `1.5px solid ${INK}` }} />
            <span className="font-code text-[11.5px] font-semibold" style={{ color: INK }}>{item.file}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ======================================================================
   DASHBOARD
   ====================================================================== */

const STATS = [
  { label: "Topics mastered", value: "92", total: "/ 180", icon: BookOpen, color: C.sun },
  { label: "Problems solved", value: "95", total: "total", icon: Code2, color: C.mint },
  { label: "Avg assessment score", value: "92", total: "%", icon: ClipboardCheck, color: C.sky },
  { label: "Current streak", value: "12", total: "days", icon: Flame, color: C.coral },
];

const PROGRESS = [
  { name: "Operating Systems (OS)", pct: 95, color: C.mint },
  { name: "Object Oriented Programming (OOP)", pct: 95, color: C.grape },
  { name: "DBMS & SQL: ER Diagrams & Normalization", pct: 95, color: C.leaf },
  { name: "Computer Networks: Topologies & OSI", pct: 90, color: C.amber },
  { name: "Git & Version Control", pct: 85, color: C.rust },
  { name: "Docker & DevOps Containers", pct: 80, color: C.docker },
  { name: "Arrays, Strings & Pointers", pct: 80, color: C.mint },
];

const SCHEDULE = [
  { title: "OS — CPU Scheduling, Deadlocks & Paging", when: "Today", date: "Aug 10", color: C.mint },
  { title: "OOP — Inheritance Types & Virtual Tables", when: "Tomorrow", date: "Aug 11", color: C.grape },
  { title: "DBMS & SQL — Normalization & ER Diagrams", when: "in 2 days", date: "Aug 12", color: C.leaf },
  { title: "Assessment — OS & Network Protocols", when: "in 4 days", date: "Aug 14", color: C.coral },
];

const RECOMMENDED = [
  { title: "OS: Process Control Block (PCB) & States", tag: "OS", desc: "Visual lifecycle from New → Ready → Running → Terminated." },
  { title: "OS: Deadlocks & 4 Necessary Conditions", tag: "OS", desc: "Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait." },
  { title: "OS: Belady's Anomaly in FIFO Page Faults", tag: "OS", desc: "Why increasing page frames can surprisingly INCREASE page faults in FIFO." },
  { title: "OOP: 5 Types of Inheritance", tag: "OOP", desc: "Single, Multiple, Hierarchical, Multilevel, and Hybrid inheritance." },
  { title: "Docker Containers vs. Virtual Machines", tag: "Docker", desc: "Shared OS kernel containers vs heavy hypervisor Guest OS virtual machines." }
];

function Dashboard({ goTo }) {
  return (
    <div className="p-5 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <Mascot size={56} />
        <div>
          <h1 className="font-display text-2xl font-extrabold" style={{ color: INK }}>Welcome, Visual Learner!</h1>
          <p className="font-code text-[13px] mt-1" style={{ color: C.textMuted }}>
            // Operating Systems + OOP + DBMS & SQL + Computer Networks + Git + Docker active
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              whileHover={{ y: -3 }}
              className={`rounded-3xl p-4 sticker ${i % 2 === 0 ? "-rotate-1" : "rotate-1"} hover:rotate-0 transition-transform duration-200`}
              style={{ backgroundColor: C.card, border: `3px solid ${INK}` }}
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl mb-3" style={{ backgroundColor: s.color, border: `2.5px solid ${INK}` }}>
                <Icon size={16} style={{ color: INK }} />
              </div>
              <p className="font-display text-2xl font-extrabold" style={{ color: INK }}>
                {s.value}
                <span className="text-xs font-normal ml-1 font-ui" style={{ color: C.textMuted }}>{s.total}</span>
              </p>
              <p className="text-[12px] mt-1 font-ui" style={{ color: C.textMuted }}>{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-3xl p-5 sticker" style={{ backgroundColor: C.card, border: `3px solid ${INK}` }}>
          <SectionLabel icon={Terminal}>Progress by category</SectionLabel>
          <div className="flex flex-col gap-4">
            {PROGRESS.map((p) => (
              <div key={p.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-ui font-medium" style={{ color: INK }}>{p.name}</span>
                  <span className="font-code text-[12px] font-bold" style={{ color: INK }}>{p.pct}%</span>
                </div>
                <div className="h-3 rounded-full w-full" style={{ backgroundColor: C.paper, border: `2px solid ${INK}` }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: p.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${p.pct}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl p-5 sticker" style={{ backgroundColor: C.card, border: `3px solid ${INK}` }}>
          <SectionLabel icon={Clock}>Upcoming schedule</SectionLabel>
          <div className="flex flex-col gap-4">
            {SCHEDULE.map((s, i) => (
              <div key={s.title} className="flex gap-3">
                <div className="flex flex-col items-center pt-1">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color, border: `2px solid ${INK}` }} />
                  {i !== SCHEDULE.length - 1 && <span className="w-0.5 flex-1 mt-1" style={{ backgroundColor: INK, opacity: 0.15 }} />}
                </div>
                <div className="pb-1">
                  <p className="text-[13px] leading-snug font-ui font-medium" style={{ color: INK }}>{s.title}</p>
                  <p className="font-code text-[11px] mt-0.5" style={{ color: C.textMuted }}>{s.date} &middot; {s.when}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <SectionLabel icon={Sparkles}>Recommended visual study cards</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {RECOMMENDED.map((r, i) => (
            <motion.div
              key={r.title}
              whileHover={{ y: -3, rotate: 0 }}
              className={`rounded-3xl p-4 flex flex-col justify-between sticker-sm ${i % 2 === 0 ? "rotate-1" : "-rotate-1"}`}
              style={{ backgroundColor: C.card, border: `3px solid ${INK}` }}
            >
              <div>
                <Pill color={CATEGORY_META[r.tag]?.color || C.sun}>{r.tag}</Pill>
                <p className="text-[14px] font-ui font-semibold mt-2.5" style={{ color: INK }}>{r.title}</p>
                <p className="text-[12.5px] mt-1.5 leading-snug font-ui" style={{ color: C.textMuted }}>{r.desc}</p>
              </div>
              <button
                onClick={() => goTo("library")}
                className="flex items-center gap-1 mt-4 text-[12.5px] font-ui font-bold self-start"
                style={{ color: C.grape }}
              >
                Explore Diagram <ArrowRight size={13} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   CONCEPT LIBRARY
   ====================================================================== */

function FlashCard({ item, index, flipped, onFlip }) {
  const meta = CATEGORY_META[item.cat];
  const Diag = item.Diagram;
  const tilt = index % 2 === 0 ? "-rotate-1" : "rotate-1";
  return (
    <div className={`${tilt} hover:rotate-0 transition-transform duration-200`} style={{ perspective: 1400 }}>
      <motion.div
        className="relative w-full h-72 cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        onClick={onFlip}
      >
        <div
          className="absolute inset-0 rounded-3xl p-4 flex flex-col justify-between sticker"
          style={{ backgroundColor: C.card, border: `3px solid ${INK}`, backfaceVisibility: "hidden" }}
        >
          <div>
            <Pill color={meta?.color || C.sun}>{item.cat}</Pill>
            <div className="mt-2">{Diag && <Diag {...(item.dp || {})} />}</div>
          </div>
          <div>
            <p className="text-[14px] font-ui font-bold leading-tight" style={{ color: INK }}>{item.term}</p>
            <p className="font-code text-[10.5px] mt-1" style={{ color: C.textMuted }}>tap card to flip for details &rarr;</p>
          </div>
        </div>
        <div
          className="absolute inset-0 rounded-3xl p-4 overflow-y-auto sticker"
          style={{ backgroundColor: C.paper, border: `3px solid ${INK}`, backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-[15px] font-ui font-bold mb-1.5" style={{ color: INK }}>{item.term}</p>
          <p className="text-[12.5px] leading-snug mb-2 font-ui" style={{ color: INK }}>{item.def}</p>
          <pre className="font-code text-[10.5px] leading-snug whitespace-pre-wrap rounded-xl p-2" style={{ color: INK, backgroundColor: "#fff", border: `2px solid ${INK}22` }}>
            {item.example}
          </pre>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 mt-2 text-[11.5px] font-ui font-bold underline"
              style={{ color: C.grape }}
            >
              Learn more <ExternalLink size={11} />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function ConceptLibrary() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [flipped, setFlipped] = useState({});

  const filtered = useMemo(() => {
    return CONCEPTS.filter((item) => {
      const matchesCat = cat === "All" || item.cat === cat;
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || item.term.toLowerCase().includes(q) || item.def.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, cat]);

  return (
    <div className="p-5 md:p-8 max-w-6xl mx-auto">
      <h1 className="font-display text-xl font-extrabold mb-1" style={{ color: INK }}>Visual Concept Library</h1>
      <p className="font-code text-[13px] mb-6" style={{ color: C.textMuted }}>
        // {filtered.length} of {CONCEPTS.length} topics — custom visual SVG diagrams on every single card
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl flex-1 sticker-sm" style={{ backgroundColor: C.card, border: `2.5px solid ${INK}` }}>
          <Search size={15} style={{ color: C.textMuted }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: PCB, Deadlocks, Belady, FIFO, Inheritance, Git, Docker, OSI..."
            className="bg-transparent outline-none flex-1 text-[13px] font-ui"
            style={{ color: INK }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cg) => {
          const isActive = cat === cg;
          const meta = CATEGORY_META[cg];
          const Icon = meta?.icon;
          return (
            <button
              key={cg}
              onClick={() => setCat(cg)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-ui font-bold"
              style={{
                backgroundColor: isActive ? (meta?.color || C.grape) : "#fff",
                color: INK,
                border: `2.5px solid ${INK}`,
                opacity: isActive ? 1 : 0.65,
              }}
            >
              {Icon && <Icon size={13} />}
              {cg}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl p-8 text-center sticker" style={{ backgroundColor: C.card, border: `3px solid ${INK}` }}>
          <p className="text-[13px] font-ui" style={{ color: C.textMuted }}>No concepts match "{query}". Try searching for 'Deadlocks', 'PCB', or 'Git'.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <FlashCard
              key={item.id}
              item={item}
              index={i}
              flipped={!!flipped[item.id]}
              onFlip={() => setFlipped((f) => ({ ...f, [item.id]: !f[item.id] }))}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ======================================================================
   PRACTICE ARENA
   ====================================================================== */

const PROBLEMS = [
  { id: "two-sum", title: "Two sum", difficulty: "Easy", funcName: "twoSum", prompt: "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.", starter: "function twoSum(nums, target) {\n  // your code here\n}", tests: [{ input: [[2, 7, 11, 15], 9], expected: [0, 1] }, { input: [[3, 2, 4], 6], expected: [1, 2] }, { input: [[3, 3], 6], expected: [0, 1] }] },
  { id: "reverse-string", title: "Reverse a string", difficulty: "Easy", funcName: "reverseString", prompt: "Given a string str, return the string reversed.", starter: "function reverseString(str) {\n  // your code here\n}", tests: [{ input: ["hello"], expected: "olleh" }, { input: ["sde1"], expected: "1eds" }, { input: [""], expected: "" }] },
  { id: "fizzbuzz", title: "FizzBuzz", difficulty: "Easy", funcName: "fizzBuzz", prompt: "Given an integer n, return an array of strings 1..n where multiples of 3 are 'Fizz', multiples of 5 are 'Buzz', and multiples of both are 'FizzBuzz'.", starter: "function fizzBuzz(n) {\n  // your code here\n}", tests: [{ input: [5], expected: ["1", "2", "Fizz", "4", "Buzz"] }, { input: [15], expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"] }] },
  { id: "valid-parens", title: "Valid parentheses", difficulty: "Medium", funcName: "isValid", prompt: "Given a string s of (){}[], determine whether every bracket is properly opened and closed in order.", starter: "function isValid(s) {\n  // your code here\n}", tests: [{ input: ["()[]{}"], expected: true }, { input: ["(]"], expected: false }, { input: ["([{}])"], expected: true }] },
  { id: "fib", title: "Fibonacci number", difficulty: "Easy", funcName: "fib", prompt: "Given an integer n, return the nth Fibonacci number, with fib(0)=0 and fib(1)=1.", starter: "function fib(n) {\n  // your code here\n}", tests: [{ input: [0], expected: 0 }, { input: [1], expected: 1 }, { input: [10], expected: 55 }] },
];

function runTests(code, funcName, tests) {
  let fn;
  try {
    const factory = new Function(`${code}\nreturn typeof ${funcName} === 'function' ? ${funcName} : null;`);
    fn = factory();
    if (!fn) throw new Error(`No function named "${funcName}" was found.`);
  } catch (e) {
    return { error: e.message, results: [] };
  }
  const results = tests.map((t) => {
    try {
      const actual = fn(...t.input);
      const pass = JSON.stringify(actual) === JSON.stringify(t.expected);
      return { ...t, actual, pass };
    } catch (e) {
      return { ...t, actual: `Error: ${e.message}`, pass: false };
    }
  });
  return { results };
}

function CodeEditor({ code, setCode }) {
  const taRef = useRef(null);
  const numRef = useRef(null);
  const lines = code.split("\n").length;
  const syncScroll = () => { if (numRef.current && taRef.current) numRef.current.scrollTop = taRef.current.scrollTop; };
  return (
    <div className="flex rounded-2xl overflow-hidden sticker" style={{ backgroundColor: "#1B2A22", border: `3px solid ${INK}` }}>
      <div ref={numRef} className="font-code text-[12.5px] text-right py-3 px-3 select-none overflow-hidden" style={{ color: "#4E7A63", backgroundColor: "#152019", lineHeight: "1.6rem" }}>
        {Array.from({ length: lines }).map((_, i) => <div key={i}>{i + 1}</div>)}
      </div>
      <textarea
        ref={taRef}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onScroll={syncScroll}
        spellCheck={false}
        className="font-code text-[12.5px] w-full py-3 px-3 bg-transparent outline-none resize-none"
        style={{ color: "#D9F5E4", lineHeight: "1.6rem", minHeight: "240px" }}
      />
    </div>
  );
}

function PracticeArena() {
  const [selected, setSelected] = useState(PROBLEMS[0].id);
  const [codeMap, setCodeMap] = useState(() => Object.fromEntries(PROBLEMS.map((p) => [p.id, p.starter])));
  const [output, setOutput] = useState(null);

  const problem = PROBLEMS.find((p) => p.id === selected);
  const code = codeMap[selected];
  const setCode = (val) => setCodeMap((m) => ({ ...m, [selected]: val }));
  const handleRun = () => setOutput(runTests(code, problem.funcName, problem.tests));
  const diffColor = (d) => (d === "Easy" ? C.leaf : d === "Medium" ? C.sun : C.coral);

  return (
    <div className="p-5 md:p-8 max-w-6xl mx-auto">
      <h1 className="font-display text-xl font-extrabold mb-1" style={{ color: INK }}>Practice arena</h1>
      <p className="font-code text-[13px] mb-6" style={{ color: C.textMuted }}>
        // code runs entirely in your browser — nothing is sent to a server
      </p>

      <div className="flex flex-col lg:flex-row gap-5">
        <div className="lg:w-56 shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
          {PROBLEMS.map((p) => {
            const isActive = p.id === selected;
            return (
              <button
                key={p.id}
                onClick={() => { setSelected(p.id); setOutput(null); }}
                className={`text-left px-3 py-2.5 rounded-2xl shrink-0 w-44 lg:w-full ${isActive ? "sticker-sm" : ""}`}
                style={{ backgroundColor: isActive ? C.card : "#F1E7D4", border: `2.5px solid ${INK}` }}
              >
                <p className="text-[13px] font-ui font-semibold truncate" style={{ color: INK }}>{p.title}</p>
                <Pill color={diffColor(p.difficulty)} style={{ marginTop: 6, display: "inline-block" }}>{p.difficulty}</Pill>
              </button>
            );
          })}
        </div>

        <div className="flex-1 min-w-0">
          <div className="rounded-2xl p-4 mb-4 sticker-sm" style={{ backgroundColor: C.card, border: `2.5px solid ${INK}` }}>
            <p className="text-[14px] font-ui font-bold mb-1" style={{ color: INK }}>{problem.title}</p>
            <p className="text-[12.5px] leading-snug font-ui" style={{ color: C.textMuted }}>{problem.prompt}</p>
          </div>

          <CodeEditor code={code} setCode={setCode} />

          <div className="flex items-center justify-between mt-3">
            <span className="font-code text-[11px]" style={{ color: C.textMuted }}>function: {problem.funcName}()</span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleRun}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[12.5px] font-ui font-bold sticker-sm"
              style={{ backgroundColor: C.leaf, color: INK, border: `2.5px solid ${INK}` }}
            >
              <Play size={12} /> Run tests
            </motion.button>
          </div>

          {output && (
            <div className="mt-4 rounded-2xl p-4 sticker-sm" style={{ backgroundColor: C.card, border: `2.5px solid ${INK}` }}>
              {output.error ? (
                <p className="font-code text-[12px] font-bold" style={{ color: C.coral }}>{output.error}</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {output.results.map((r, i) => (
                    <div key={i} className="flex items-start gap-2">
                      {r.pass ? <CheckCircle2 size={14} style={{ color: C.leaf, marginTop: 2 }} /> : <XCircle size={14} style={{ color: C.coral, marginTop: 2 }} />}
                      <p className="font-code text-[11.5px] leading-snug" style={{ color: r.pass ? C.textMuted : C.coral }}>
                        input: {JSON.stringify(r.input)} &rarr; got {JSON.stringify(r.actual)}
                        {!r.pass && `, expected ${JSON.stringify(r.expected)}`}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   ASSESSMENT MODE (OS, OOP, DBMS, SQL, NETWORKING, GIT, DOCKER)
   ====================================================================== */

const QUESTIONS = [
  { q: "What is Belady's Anomaly in Operating Systems memory management?", options: ["Increasing RAM causes CPU thrashing", "In FIFO page replacement, increasing page frames can surprisingly INCREASE page faults", "LRU page replacement causes infinite loops", "Deadlock occurs when page frames equal zero"], correct: 1, explain: "Belady's Anomaly demonstrates that increasing page frames in FIFO replacement can lead to more page faults for certain reference strings." },
  { q: "Which of the following is NOT one of the 4 necessary Coffman conditions for a Deadlock?", options: ["Mutual Exclusion", "Hold and Wait", "Paging Segmentation", "Circular Wait"], correct: 2, explain: "The 4 Coffman conditions for Deadlock are Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait." },
  { q: "What memory region is allocated when an object is created using the `new` keyword in C++?", options: ["Stack Memory", "Heap Memory", "Code Segment", "Register"], correct: 1, explain: "Using `new` allocates space in Heap memory and stores the address pointer in Stack memory." },
  { q: "Which type of inheritance occurs when a derived class inherits from two or more base classes simultaneously?", options: ["Single Inheritance", "Multilevel Inheritance", "Multiple Inheritance", "Hierarchical Inheritance"], correct: 2, explain: "Multiple inheritance is when a single child class derives attributes from two or more parent classes." },
  { q: "In an ER diagram, what symbol is used to represent an Entity Set?", options: ["Oval", "Rectangle", "Diamond", "Dashed Circle"], correct: 1, explain: "Rectangles represent Entity Sets, Ovals represent Attributes, and Diamonds represent Relationship Sets." },
  { q: "Which Normal Form removes transitive functional dependencies (where non-key A → B)?", options: ["1NF", "2NF", "3NF", "BCNF"], correct: 2, explain: "3NF requires no transitive dependencies on non-prime attributes." },
  { q: "In Star topology, what happens if the central device (Hub/Switch) fails?", options: ["Only 1 node disconnects", "The entire network fails", "Nodes auto-switch to Ring mode", "No effect"], correct: 1, explain: "Star topology relies on the central hub/switch. Central failure downs the whole network." },
  { q: "In Docker, what is the difference between an Image and a Container?", options: ["No difference", "Container is read-only blueprint, Image is live", "Image is immutable read-only blueprint, Container is live running instance", "Images require VM hypervisor"], correct: 2, explain: "An Image is a read-only blueprint; a Container is a live running instance." }
];

const QUIZ_SECONDS = 360;
function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

function AssessmentMode() {
  const [phase, setPhase] = useState("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(QUIZ_SECONDS);

  useEffect(() => {
    if (phase !== "quiz") return;
    if (timeLeft <= 0) { setPhase("results"); return; }
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [phase, timeLeft]);

  const start = () => { setAnswers(Array(QUESTIONS.length).fill(null)); setIdx(0); setTimeLeft(QUIZ_SECONDS); setPhase("quiz"); };
  const selectAnswer = (choice) => setAnswers((a) => { const c = [...a]; c[idx] = choice; return c; });
  const score = answers.reduce((acc, a, i) => acc + (a === QUESTIONS[i].correct ? 1 : 0), 0);

  if (phase === "intro") {
    return (
      <div className="p-5 md:p-8 max-w-2xl mx-auto">
        <h1 className="font-display text-xl font-extrabold mb-1" style={{ color: INK }}>Assessment mode</h1>
        <p className="font-code text-[13px] mb-6" style={{ color: C.textMuted }}>// quiz.test.js — updated with OS, OOP, DBMS, SQL, Computer Networks, Git & Docker</p>
        <div className="rounded-3xl p-6 sticker" style={{ backgroundColor: C.card, border: `3px solid ${INK}` }}>
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck size={18} style={{ color: C.sky }} />
            <p className="text-[15px] font-ui font-bold" style={{ color: INK }}>Timed knowledge check</p>
          </div>
          <ul className="text-[13px] leading-relaxed font-ui" style={{ color: C.textMuted }}>
            <li>&bull; {QUESTIONS.length} multiple-choice questions covering OS, OOP, DBMS, SQL, Computer Networks, Git & Docker</li>
            <li>&bull; {Math.floor(QUIZ_SECONDS / 60)} minutes on the clock</li>
            <li>&bull; Instant scoring & detailed visual explanations after submission</li>
          </ul>
          <motion.button whileTap={{ scale: 0.95 }} onClick={start} className="flex items-center gap-1.5 mt-5 px-5 py-2.5 rounded-full text-[13px] font-ui font-bold sticker-sm" style={{ backgroundColor: C.coral, color: INK, border: `2.5px solid ${INK}` }}>
            Start assessment <ArrowRight size={13} />
          </motion.button>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="p-5 md:p-8 max-w-2xl mx-auto">
        <h1 className="font-display text-xl font-extrabold mb-1" style={{ color: INK }}>Results</h1>
        <p className="font-code text-[13px] mb-6" style={{ color: C.textMuted }}>// {timeLeft <= 0 ? "time expired" : "submitted"}</p>

        <div className="rounded-3xl p-6 mb-5 flex items-center justify-between sticker" style={{ backgroundColor: C.card, border: `3px solid ${INK}` }}>
          <div>
            <p className="font-display text-3xl font-extrabold" style={{ color: INK }}>
              {score}<span className="text-lg" style={{ color: C.textMuted }}>/{QUESTIONS.length}</span>
            </p>
            <p className="text-[12.5px] mt-1 font-ui" style={{ color: C.textMuted }}>{Math.round((score / QUESTIONS.length) * 100)}% correct</p>
          </div>
          <motion.button whileTap={{ scale: 0.95 }} onClick={start} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[12.5px] font-ui font-bold sticker-sm" style={{ backgroundColor: C.sun, color: INK, border: `2.5px solid ${INK}` }}>
            <RotateCcw size={12} /> Retake
          </motion.button>
        </div>

        <div className="flex flex-col gap-3">
          {QUESTIONS.map((q, i) => {
            const isCorrect = answers[i] === q.correct;
            return (
              <div key={i} className="rounded-2xl p-4 sticker-sm" style={{ backgroundColor: C.card, border: `2.5px solid ${INK}` }}>
                <div className="flex items-start gap-2 mb-2">
                  {isCorrect ? <CheckCircle2 size={15} style={{ color: C.leaf, marginTop: 2 }} /> : <XCircle size={15} style={{ color: C.coral, marginTop: 2 }} />}
                  <p className="text-[13px] font-ui font-medium" style={{ color: INK }}>{q.q}</p>
                </div>
                <p className="text-[12px] ml-6 font-ui" style={{ color: C.textMuted }}>
                  Your answer: <span style={{ color: isCorrect ? "#2E9E58" : "#D14D4D", fontWeight: 700 }}>{answers[i] === null ? "unanswered" : q.options[answers[i]]}</span>
                  {!isCorrect && <> &middot; Correct: <span style={{ color: "#2E9E58", fontWeight: 700 }}>{q.options[q.correct]}</span></>}
                </p>
                <p className="text-[12px] ml-6 mt-1.5 leading-snug font-ui" style={{ color: C.textMuted }}>{q.explain}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const question = QUESTIONS[idx];
  return (
    <div className="p-5 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <p className="font-code text-[13px] font-bold" style={{ color: C.textMuted }}>question {idx + 1} / {QUESTIONS.length}</p>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full sticker-sm" style={{ backgroundColor: timeLeft < 30 ? C.coral : C.sky, border: `2.5px solid ${INK}` }}>
          <Clock size={13} style={{ color: INK }} />
          <span className="font-code text-[12px] font-bold" style={{ color: INK }}>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="h-3 rounded-full w-full mb-6" style={{ backgroundColor: C.card, border: `2px solid ${INK}` }}>
        <div className="h-full rounded-full" style={{ backgroundColor: C.grape, width: `${((idx + 1) / QUESTIONS.length) * 100}%`, transition: "width .3s" }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
          <p className="text-[15px] font-ui font-bold mb-4" style={{ color: INK }}>{question.q}</p>
          <div className="flex flex-col gap-2.5">
            {question.options.map((opt, oi) => {
              const isSelected = answers[idx] === oi;
              return (
                <button
                  key={oi}
                  onClick={() => selectAnswer(oi)}
                  className="text-left px-4 py-3 rounded-2xl text-[13px] font-ui font-medium"
                  style={{ backgroundColor: isSelected ? C.sky : C.card, border: `2.5px solid ${INK}`, color: INK }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between mt-6">
        <button onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0} className="text-[12.5px] font-ui font-bold disabled:opacity-30" style={{ color: C.textMuted }}>Back</button>
        {idx === QUESTIONS.length - 1 ? (
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setPhase("results")} className="px-5 py-2.5 rounded-full text-[12.5px] font-ui font-bold sticker-sm" style={{ backgroundColor: C.leaf, color: INK, border: `2.5px solid ${INK}` }}>Submit</motion.button>
        ) : (
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setIdx((i) => Math.min(QUESTIONS.length - 1, i + 1))} className="flex items-center gap-1 px-5 py-2.5 rounded-full text-[12.5px] font-ui font-bold sticker-sm" style={{ backgroundColor: C.card, color: INK, border: `2.5px solid ${INK}` }}>
            Next <ChevronRight size={13} />
          </motion.button>
        )}
      </div>
    </div>
  );
}

/* ======================================================================
   APP SHELL
   ====================================================================== */

export default function App() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="flex min-h-screen font-ui" style={{ backgroundColor: C.paper }}>
      <GlobalStyle />
      <Sidebar active={active} setActive={setActive} />
      <div className="flex-1 min-w-0 flex flex-col paper-dots">
        <MobileNav active={active} setActive={setActive} />
        <TabBar active={active} setActive={setActive} />
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
            {active === "dashboard" && <Dashboard goTo={setActive} />}
            {active === "library" && <ConceptLibrary />}
            {active === "networkLab" && <NetworkVisualLab />}
            {active === "practice" && <PracticeArena />}
            {active === "assessment" && <AssessmentMode />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
