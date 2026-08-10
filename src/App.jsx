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

function DiagQueueCPU() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      {[0, 1, 2].map((i) => <rect key={i} x={8 + i * 24} y="40" width="18" height="30" rx="5" fill={C.sun} stroke={INK} strokeWidth="2.2" />)}
      <text x="45" y="24" fontSize="7" fontWeight="700" fill={INK} textAnchor="middle">queue</text>
      <line x1="84" y1="55" x2="110" y2="55" stroke={INK} strokeWidth="3" />
      <rect x="112" y="30" width="60" height="50" rx="10" fill={C.grape} stroke={INK} strokeWidth="3" />
      <text x="142" y="59" fontSize="10" fontWeight="800" fill="#fff" textAnchor="middle">CPU</text>
    </svg>
  );
}

function DiagThreads() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="20" y="15" width="160" height="72" rx="14" fill="#fff" stroke={INK} strokeWidth="3" strokeDasharray="5 4" />
      {[0, 1, 2].map((i) => <rect key={i} x={35 + i * 45} y="30" width="34" height="42" rx="8" fill={C.sky} stroke={INK} strokeWidth="2.5" />)}
      <text x="100" y="100" fontSize="8" fontWeight="700" fill={INK} textAnchor="middle">shared memory (one process)</text>
    </svg>
  );
}

function DiagPoly() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="8" y="42" width="54" height="26" rx="8" fill={C.grape} stroke={INK} strokeWidth="3" />
      <text x="35" y="59" fontSize="8" fontWeight="800" fill="#fff" textAnchor="middle">speak()</text>
      <line x1="64" y1="55" x2="92" y2="22" stroke={INK} strokeWidth="2.5" />
      <line x1="64" y1="55" x2="92" y2="55" stroke={INK} strokeWidth="2.5" />
      <line x1="64" y1="55" x2="92" y2="90" stroke={INK} strokeWidth="2.5" />
      <circle cx="107" cy="22" r="12" fill={C.sky} stroke={INK} strokeWidth="2.5" />
      <rect x="95" y="44" width="24" height="24" rx="4" fill={C.sun} stroke={INK} strokeWidth="2.5" />
      <polygon points="107,80 119,102 95,102" fill={C.coral} stroke={INK} strokeWidth="2.5" />
    </svg>
  );
}

function DiagAbstraction() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="55" y="10" width="90" height="30" rx="15" fill={C.sky} stroke={INK} strokeWidth="3" />
      <text x="100" y="30" fontSize="9" fontWeight="800" fill="#fff" textAnchor="middle">brew()</text>
      <rect x="28" y="56" width="144" height="42" rx="10" fill="#fff" stroke={INK} strokeWidth="2.5" strokeDasharray="5 4" />
      <circle cx="62" cy="77" r="10" fill={C.grape} stroke={INK} strokeWidth="2" />
      <circle cx="100" cy="77" r="8" fill={C.coral} stroke={INK} strokeWidth="2" />
      <circle cx="138" cy="77" r="10" fill={C.sun} stroke={INK} strokeWidth="2" />
      <text x="100" y="50" fontSize="7" fontWeight="700" fill={INK} textAnchor="middle">hidden machinery</text>
    </svg>
  );
}

function DiagCapsule() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="40" y="28" width="120" height="56" rx="28" fill={C.mint} stroke={INK} strokeWidth="3" />
      <circle cx="72" cy="56" r="6" fill="#fff" stroke={INK} strokeWidth="2" />
      <circle cx="100" cy="56" r="6" fill="#fff" stroke={INK} strokeWidth="2" />
      <circle cx="128" cy="56" r="6" fill="#fff" stroke={INK} strokeWidth="2" />
      <circle cx="100" cy="20" r="11" fill={C.sun} stroke={INK} strokeWidth="2.5" />
      <rect x="97" y="28" width="6" height="12" fill={C.sun} stroke={INK} strokeWidth="1.5" />
    </svg>
  );
}

function DiagHandshake() {
  const uid = useId();
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <defs>
        <marker id={`${uid}-h`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0L7,3.5L0,7Z" fill={INK} />
        </marker>
      </defs>
      <rect x="8" y="15" width="46" height="24" rx="6" fill={C.sky} stroke={INK} strokeWidth="2.5" />
      <text x="31" y="31" fontSize="8" fontWeight="800" fill="#fff" textAnchor="middle">Client</text>
      <rect x="146" y="15" width="46" height="24" rx="6" fill={C.grape} stroke={INK} strokeWidth="2.5" />
      <text x="169" y="31" fontSize="8" fontWeight="800" fill="#fff" textAnchor="middle">Server</text>
      <line x1="54" y1="48" x2="144" y2="48" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-h)`} />
      <text x="100" y="45" fontSize="7" fill={INK} textAnchor="middle">1. SYN</text>
      <line x1="146" y1="68" x2="56" y2="68" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-h)`} />
      <text x="100" y="65" fontSize="7" fill={INK} textAnchor="middle">2. SYN-ACK</text>
      <line x1="54" y1="88" x2="144" y2="88" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-h)`} />
      <text x="100" y="85" fontSize="7" fill={INK} textAnchor="middle">3. ACK</text>
    </svg>
  );
}

function DiagNormalize() {
  const uid = useId();
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <defs>
        <marker id={`${uid}-n`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0L7,3.5L0,7Z" fill={INK} />
        </marker>
      </defs>
      <rect x="8" y="38" width="80" height="34" rx="8" fill={C.pink} stroke={INK} strokeWidth="3" />
      <text x="48" y="58" fontSize="7.5" fontWeight="700" fill={INK} textAnchor="middle">one messy table</text>
      <line x1="92" y1="55" x2="114" y2="55" stroke={INK} strokeWidth="3" markerEnd={`url(#${uid}-n)`} />
      <rect x="118" y="12" width="72" height="30" rx="8" fill={C.leaf} stroke={INK} strokeWidth="2.5" />
      <text x="154" y="31" fontSize="7.5" fontWeight="700" fill={INK} textAnchor="middle">table A</text>
      <rect x="118" y="68" width="72" height="30" rx="8" fill={C.sky} stroke={INK} strokeWidth="2.5" />
      <text x="154" y="87" fontSize="7.5" fontWeight="700" fill={INK} textAnchor="middle">table B</text>
    </svg>
  );
}

function DiagVenn({ mode = "inner", color = C.leaf }) {
  const uid = useId();
  const fullA = mode === "left" || mode === "union" || mode === "unionall";
  const fullB = mode === "right" || mode === "union" || mode === "unionall";
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <defs>
        <clipPath id={`${uid}-clip`}><circle cx="80" cy="55" r="36" /></clipPath>
      </defs>
      <circle cx="80" cy="55" r="36" fill={fullA ? color : "#fff"} stroke={INK} strokeWidth="3" />
      <circle cx="120" cy="55" r="36" fill={fullB ? color : "#fff"} stroke={INK} strokeWidth="3" />
      <circle cx="120" cy="55" r="36" fill={color} clipPath={`url(#${uid}-clip)`} />
      <circle cx="80" cy="55" r="36" fill="none" stroke={INK} strokeWidth="3" />
      <circle cx="120" cy="55" r="36" fill="none" stroke={INK} strokeWidth="3" />
      <text x="50" y="24" fontSize="12" fontWeight="800" fill={INK}>A</text>
      <text x="140" y="24" fontSize="12" fontWeight="800" fill={INK}>B</text>
    </svg>
  );
}

function DiagGrid({ color = C.leaf }) {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      {[0, 1, 2].map((r) => [0, 1, 2, 3].map((cc) => (
        <circle key={`${r}-${cc}`} cx={40 + cc * 40} cy={25 + r * 28} r="7" fill={color} stroke={INK} strokeWidth="2" />
      )))}
    </svg>
  );
}

function DiagMagnify({ color = C.coral }) {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="15" y="20" width="170" height="70" rx="10" fill="#fff" stroke={INK} strokeWidth="3" />
      {[0, 1, 2].map((i) => (
        <line key={i} x1="15" y1={40 + i * 17} x2="185" y2={40 + i * 17} stroke={INK} strokeWidth="2" opacity="0.3" />
      ))}
      <circle cx="140" cy="57" r="22" fill={color} fillOpacity="0.3" stroke={INK} strokeWidth="3" />
      <line x1="156" y1="73" x2="174" y2="91" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function DiagWindow({ color = C.sky }) {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="15" y="45" width="170" height="26" rx="8" fill="#fff" stroke={INK} strokeWidth="3" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={15 + i * 34} y1="45" x2={15 + i * 34} y2="71" stroke={INK} strokeWidth="1.5" opacity="0.3" />
      ))}
      <rect x="49" y="42" width="68" height="32" rx="8" fill={color} fillOpacity="0.4" stroke={INK} strokeWidth="3" />
    </svg>
  );
}

function DiagPointers({ color = C.coral }) {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="15" y="45" width="170" height="26" rx="8" fill="#fff" stroke={INK} strokeWidth="3" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={15 + i * 34} y1="45" x2={15 + i * 34} y2="71" stroke={INK} strokeWidth="1.5" opacity="0.3" />
      ))}
      <text x="24" y="35" fontSize="18" fill={color} fontWeight="800">&#9660;</text>
      <text x="162" y="35" fontSize="18" fill={color} fontWeight="800">&#9660;</text>
    </svg>
  );
}

function DiagTree() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <line x1="100" y1="22" x2="60" y2="55" stroke={INK} strokeWidth="2.5" />
      <line x1="100" y1="22" x2="140" y2="55" stroke={INK} strokeWidth="2.5" />
      <line x1="60" y1="55" x2="40" y2="90" stroke={INK} strokeWidth="2.5" />
      <line x1="60" y1="55" x2="80" y2="90" stroke={INK} strokeWidth="2.5" />
      <circle cx="100" cy="22" r="11" fill={C.grape} stroke={INK} strokeWidth="2.5" />
      <circle cx="60" cy="55" r="10" fill={C.sky} stroke={INK} strokeWidth="2.5" />
      <circle cx="140" cy="55" r="10" fill={C.sky} stroke={INK} strokeWidth="2.5" />
      <circle cx="40" cy="90" r="9" fill={C.mint} stroke={INK} strokeWidth="2.5" />
      <circle cx="80" cy="90" r="9" fill={C.mint} stroke={INK} strokeWidth="2.5" />
    </svg>
  );
}

function DiagToggle({ on = true, color = C.leaf }) {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="50" y="32" width="100" height="40" rx="20" fill={on ? color : "#fff"} stroke={INK} strokeWidth="3" />
      <circle cx={on ? 128 : 72} cy="52" r="16" fill="#fff" stroke={INK} strokeWidth="3" />
      <text x="100" y="92" fontSize="11" fontWeight="800" textAnchor="middle" fill={INK}>{on ? "ON" : "OFF"}</text>
    </svg>
  );
}

function DiagBucket({ colors = [C.sky, C.coral, C.sun] }) {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      {colors.map((col, i) => {
        const x = 20 + i * 60;
        return (
          <g key={i}>
            <path d={`M${x},28 h40 v46 a20,20 0 0 1 -40,0 z`} fill="#fff" stroke={INK} strokeWidth="3" />
            {[0, 1, 2].map((d) => (
              <circle key={d} cx={x + 12 + d * 8} cy={58 + (d % 2) * 10} r="5" fill={col} stroke={INK} strokeWidth="1.5" />
            ))}
          </g>
        );
      })}
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

function DiagKeyLock({ color = C.sun }) {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="15" y="55" width="170" height="26" rx="8" fill="#fff" stroke={INK} strokeWidth="3" />
      <circle cx="150" cy="34" r="13" fill={color} stroke={INK} strokeWidth="3" />
      <rect x="147" y="44" width="6" height="20" fill={color} stroke={INK} strokeWidth="2" />
      <rect x="151" y="54" width="8" height="5" fill={color} stroke={INK} strokeWidth="1.5" />
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

function DiagPlug({ color = C.docker, label = "network" }) {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="20" y="35" width="46" height="40" rx="8" fill={color} stroke={INK} strokeWidth="3" />
      <rect x="134" y="35" width="46" height="40" rx="8" fill={color} stroke={INK} strokeWidth="3" />
      <circle cx="100" cy="55" r="7" fill={INK} />
      <line x1="66" y1="55" x2="93" y2="55" stroke={INK} strokeWidth="3" strokeDasharray="4 4" />
      <line x1="107" y1="55" x2="134" y2="55" stroke={INK} strokeWidth="3" strokeDasharray="4 4" />
      <text x="100" y="98" fontSize="8.5" fontWeight="700" fill={INK} textAnchor="middle">{label}</text>
    </svg>
  );
}

function DiagClock() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <circle cx="100" cy="55" r="38" fill={C.sky} stroke={INK} strokeWidth="3.5" />
      <line x1="100" y1="55" x2="100" y2="30" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <line x1="100" y1="55" x2="118" y2="62" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="55" r="4" fill={INK} />
    </svg>
  );
}

function DiagDelete({ color = C.coral }) {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="15" y="20" width="170" height="70" rx="10" fill="#fff" stroke={INK} strokeWidth="3" />
      <line x1="15" y1="55" x2="185" y2="55" stroke={INK} strokeWidth="1.5" opacity="0.3" />
      <line x1="15" y1="72" x2="185" y2="72" stroke={INK} strokeWidth="1.5" opacity="0.3" />
      <rect x="15" y="55" width="170" height="17" fill={color} fillOpacity="0.35" />
      <line x1="22" y1="58" x2="178" y2="69" stroke={color} strokeWidth="3.5" />
      <line x1="178" y1="58" x2="22" y2="69" stroke={color} strokeWidth="3.5" />
    </svg>
  );
}

function DiagNested({ color = C.grape }) {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="15" y="15" width="170" height="80" rx="12" fill="#fff" stroke={INK} strokeWidth="3" />
      <text x="100" y="30" fontSize="8" fontWeight="700" fill={INK} textAnchor="middle">outer query</text>
      <rect x="45" y="40" width="110" height="42" rx="10" fill={color} stroke={INK} strokeWidth="3" />
      <text x="100" y="65" fontSize="9" fontWeight="800" fill="#fff" textAnchor="middle">subquery</text>
    </svg>
  );
}

function DiagBars({ heights = [10, 22, 38, 58, 82], color = C.coral }) {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <line x1="15" y1="95" x2="190" y2="95" stroke={INK} strokeWidth="3" />
      {heights.map((h, i) => (
        <rect key={i} x={25 + i * 33} y={95 - h} width="21" height={h} rx="4" fill={color} stroke={INK} strokeWidth="2.5" />
      ))}
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

function DiagState() {
  const uid = useId();
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <defs>
        <marker id={`${uid}-s`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0L7,3.5L0,7Z" fill={INK} />
        </marker>
      </defs>
      <rect x="55" y="38" width="80" height="40" rx="10" fill={C.sky} stroke={INK} strokeWidth="3" />
      <text x="95" y="63" fontSize="10" fontWeight="800" fill="#fff" textAnchor="middle">count: 0</text>
      <path d="M138,45 C 178,35 178,80 138,72" fill="none" stroke={INK} strokeWidth="3" markerEnd={`url(#${uid}-s)`} />
      <text x="168" y="60" fontSize="7" fontWeight="700" fill={INK} textAnchor="middle">set</text>
    </svg>
  );
}

function DiagBranch() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="80" y="8" width="40" height="26" rx="8" fill={C.grape} stroke={INK} strokeWidth="3" />
      <text x="100" y="26" fontSize="8" fontWeight="800" fill="#fff" textAnchor="middle">if?</text>
      <line x1="88" y1="34" x2="50" y2="70" stroke={INK} strokeWidth="2.5" />
      <line x1="112" y1="34" x2="150" y2="70" stroke={INK} strokeWidth="2.5" />
      <rect x="18" y="72" width="64" height="28" rx="8" fill={C.leaf} stroke={INK} strokeWidth="2.5" />
      <text x="50" y="90" fontSize="7.5" fontWeight="700" fill={INK} textAnchor="middle">true &rarr; UI</text>
      <rect x="118" y="72" width="64" height="28" rx="8" fill={C.coral} stroke={INK} strokeWidth="2.5" />
      <text x="150" y="90" fontSize="7.5" fontWeight="700" fill={INK} textAnchor="middle">false &rarr; UI</text>
    </svg>
  );
}

function DiagBroadcast() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <circle cx="100" cy="55" r="24" fill={C.grape} stroke={INK} strokeWidth="3" />
      <text x="100" y="59" fontSize="7.5" fontWeight="800" fill="#fff" textAnchor="middle">Context</text>
      {[[38, 18], [162, 18], [30, 92], [170, 92]].map(([x, y], i) => (
        <g key={i}>
          <line x1="100" y1="55" x2={x} y2={y} stroke={INK} strokeWidth="2" strokeDasharray="3 3" />
          <circle cx={x} cy={y} r="11" fill={C.sky} stroke={INK} strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
}

function DiagHookFactory() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="72" y="8" width="56" height="26" rx="8" fill={C.grape} stroke={INK} strokeWidth="3" />
      <text x="100" y="26" fontSize="7.5" fontWeight="800" fill="#fff" textAnchor="middle">useX()</text>
      <line x1="88" y1="34" x2="55" y2="60" stroke={INK} strokeWidth="2.5" />
      <line x1="112" y1="34" x2="145" y2="60" stroke={INK} strokeWidth="2.5" />
      <rect x="22" y="62" width="66" height="32" rx="8" fill={C.sky} stroke={INK} strokeWidth="2.5" />
      <text x="55" y="82" fontSize="7.5" fontWeight="700" fill={INK} textAnchor="middle">instance A</text>
      <rect x="112" y="62" width="66" height="32" rx="8" fill={C.mint} stroke={INK} strokeWidth="2.5" />
      <text x="145" y="82" fontSize="7.5" fontWeight="700" fill={INK} textAnchor="middle">instance B</text>
    </svg>
  );
}

function DiagChildren() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="15" y="12" width="170" height="86" rx="12" fill="#fff" stroke={INK} strokeWidth="3" />
      <text x="100" y="28" fontSize="8" fontWeight="700" fill={INK} textAnchor="middle">&lt;Card&gt;</text>
      <rect x="45" y="40" width="110" height="46" rx="10" fill={C.mint} stroke={INK} strokeWidth="3" />
      <text x="100" y="67" fontSize="9" fontWeight="800" fill="#fff" textAnchor="middle">children</text>
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
      <line x1="80" y1="36" x2="120" y2="36" stroke={INK} strokeWidth="2" opacity="0.4" />
      <line x1="80" y1="48" x2="120" y2="48" stroke={INK} strokeWidth="2" opacity="0.4" />
      <line x1="80" y1="60" x2="108" y2="60" stroke={INK} strokeWidth="2" opacity="0.4" />
      <circle cx="100" cy="55" r="34" fill="none" stroke={C.coral} strokeWidth="4.5" />
      <line x1="75" y1="80" x2="125" y2="30" stroke={C.coral} strokeWidth="4.5" />
    </svg>
  );
}

/* ======================================================================
   COMPUTER NETWORKS VISUAL DIAGRAMS
   ====================================================================== */

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
      <text x="100" y="14" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">Centralized Star</text>
    </svg>
  );
}

function DiagRingTopology() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <circle cx="100" cy="55" r="34" fill="none" stroke={C.grape} strokeWidth="3" strokeDasharray="4 2" />
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x = 100 + 34 * Math.cos(rad);
        const y = 55 + 34 * Math.sin(rad);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="9" fill={C.mint} stroke={INK} strokeWidth="2" />
            <text x={x} y={y + 3} fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">{i + 1}</text>
          </g>
        );
      })}
      <circle cx="120" cy="30" r="4" fill={C.coral} stroke={INK} strokeWidth="1.5" />
      <text x="100" y="58" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">Token Ring</text>
    </svg>
  );
}

function DiagBusTopology() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <line x1="15" y1="55" x2="185" y2="55" stroke={INK} strokeWidth="4" />
      <rect x="10" y="50" width="8" height="10" fill={C.coral} stroke={INK} strokeWidth="1.5" />
      <rect x="182" y="50" width="8" height="10" fill={C.coral} stroke={INK} strokeWidth="1.5" />
      {[35, 75, 125, 165].map((x, i) => {
        const isTop = i % 2 === 0;
        const y = isTop ? 22 : 88;
        const lineY = isTop ? 34 : 76;
        return (
          <g key={i}>
            <line x1={x} y1="55" x2={x} y2={lineY} stroke={INK} strokeWidth="2" />
            <rect x={x - 14} y={y - 10} width="28" height="20" rx="4" fill={C.sun} stroke={INK} strokeWidth="2" />
            <text x={x} y={y + 3} fontSize="6.5" fontWeight="700" fill={INK} textAnchor="middle">Node {i + 1}</text>
          </g>
        );
      })}
      <text x="100" y="48" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">Central Bus Backbone</text>
    </svg>
  );
}

function DiagMeshTopology() {
  const nodes = [
    [60, 22], [140, 22],
    [35, 78], [100, 92], [165, 78]
  ];
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      {nodes.map((n1, i) =>
        nodes.slice(i + 1).map((n2, j) => (
          <line key={`${i}-${j}`} x1={n1[0]} y1={n1[1]} x2={n2[0]} y2={n2[1]} stroke={INK} strokeWidth="1.5" opacity="0.6" />
        ))
      )}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="10" fill={C.coral} stroke={INK} strokeWidth="2" />
          <text x={x} y={y + 3} fontSize="6.5" fontWeight="800" fill="#fff" textAnchor="middle">{i + 1}</text>
        </g>
      ))}
      <text x="100" y="52" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">Full Mesh</text>
    </svg>
  );
}

function DiagTreeTopology() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <line x1="20" y1="20" x2="180" y2="20" stroke={INK} strokeWidth="3.5" />
      <text x="100" y="14" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">Main Bus</text>
      {[50, 150].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="20" x2={x} y2={42} stroke={INK} strokeWidth="2" />
          <circle cx={x} cy={42} r="9" fill={C.amber} stroke={INK} strokeWidth="2" />
          <line x1={x} y1={42} x2={x - 22} y2={78} stroke={INK} strokeWidth="1.8" />
          <line x1={x} y1={42} x2={x + 22} y2={78} stroke={INK} strokeWidth="1.8" />
          <rect x={x - 30} y="72" width="16" height="14" rx="3" fill={C.sky} stroke={INK} strokeWidth="1.5" />
          <rect x={x + 14} y="72" width="16" height="14" rx="3" fill={C.sky} stroke={INK} strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  );
}

function DiagHybridTopology() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <circle cx="50" cy="55" r="12" fill={C.amber} stroke={INK} strokeWidth="2" />
      <line x1="50" y1="55" x2="25" y2="30" stroke={INK} strokeWidth="1.8" />
      <line x1="50" y1="55" x2="25" y2="80" stroke={INK} strokeWidth="1.8" />
      <circle cx="25" cy="30" r="7" fill={C.sky} stroke={INK} strokeWidth="1.5" />
      <circle cx="25" cy="80" r="7" fill={C.sky} stroke={INK} strokeWidth="1.5" />
      <line x1="62" y1="55" x2="130" y2="55" stroke={INK} strokeWidth="3" strokeDasharray="4 2" />
      <rect x="88" y="44" width="24" height="22" rx="5" fill={C.sun} stroke={INK} strokeWidth="2" />
      <text x="100" y="58" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">Bridge</text>
      <circle cx="155" cy="55" r="22" fill="none" stroke={C.grape} strokeWidth="2.5" />
      {[0, 90, 180, 270].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x = 155 + 22 * Math.cos(rad);
        const y = 55 + 22 * Math.sin(rad);
        return <circle key={i} cx={x} cy={y} r="6" fill={C.mint} stroke={INK} strokeWidth="1.5" />;
      })}
    </svg>
  );
}

function DiagNetworkScale() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <circle cx="100" cy="55" r="48" fill={C.sky} fillOpacity="0.15" stroke={INK} strokeWidth="2" />
      <circle cx="100" cy="55" r="36" fill={C.mint} fillOpacity="0.25" stroke={INK} strokeWidth="2" />
      <circle cx="100" cy="55" r="24" fill={C.sun} fillOpacity="0.35" stroke={INK} strokeWidth="2" />
      <circle cx="100" cy="55" r="12" fill={C.coral} stroke={INK} strokeWidth="2" />
      <text x="100" y="58" fontSize="6.5" fontWeight="800" fill="#fff" textAnchor="middle">PAN</text>
      <text x="100" y="38" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">LAN</text>
      <text x="100" y="24" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">MAN</text>
      <text x="100" y="12" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">WAN/GAN</text>
    </svg>
  );
}

function DiagVPNTunnel() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <path d="M40,55 Q50,25 90,30 Q120,20 150,40 Q170,55 150,75 Q120,90 80,80 Q40,85 40,55 Z" fill="#EAE6F8" stroke={INK} strokeWidth="2" strokeDasharray="3 3" />
      <rect x="25" y="44" width="150" height="22" rx="11" fill={C.leaf} stroke={INK} strokeWidth="2.5" />
      <text x="100" y="58" fontSize="7.5" fontWeight="800" fill={INK} textAnchor="middle">AES Encrypted VPN Tunnel</text>
      <rect x="8" y="38" width="28" height="34" rx="5" fill={C.sky} stroke={INK} strokeWidth="2" />
      <text x="22" y="58" fontSize="6" fontWeight="800" fill="#fff" textAnchor="middle">User</text>
      <rect x="164" y="38" width="28" height="34" rx="5" fill={C.grape} stroke={INK} strokeWidth="2" />
      <text x="178" y="58" fontSize="6" fontWeight="800" fill="#fff" textAnchor="middle">Corp</text>
    </svg>
  );
}

function DiagIPv4Classes() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="10" y="10" width="180" height="90" rx="8" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <rect x="10" y="10" width="180" height="18" rx="8" fill={C.sun} stroke={INK} strokeWidth="2" />
      <text x="30" y="22" fontSize="6.5" fontWeight="800" fill={INK}>Class</text>
      <text x="80" y="22" fontSize="6.5" fontWeight="800" fill={INK}>1st Octet Range</text>
      <text x="150" y="22" fontSize="6.5" fontWeight="800" fill={INK}>Primary Usage</text>
      {[
        { c: "A", r: "1 – 126", u: "Large Networks", col: C.sky },
        { c: "B", r: "128 – 191", u: "Medium Networks", col: C.mint },
        { c: "C", r: "192 – 223", u: "Local Networks (LAN)", col: C.leaf },
        { c: "D", r: "224 – 239", u: "Multicast Reserved", col: C.amber },
        { c: "E", r: "240 – 254", u: "R&D / Experimental", col: C.coral }
      ].map((row, i) => (
        <g key={row.c}>
          <line x1="10" y1={28 + i * 14} x2="190" y2={28 + i * 14} stroke={INK} strokeWidth="1" opacity="0.2" />
          <circle cx="30" cy={35 + i * 14} r="5" fill={row.col} stroke={INK} strokeWidth="1" />
          <text x="30" y={37 + i * 14} fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">{row.c}</text>
          <text x="80" y={38 + i * 14} fontSize="6" fontWeight="700" fill={INK}>{row.r}</text>
          <text x="150" y={38 + i * 14} fontSize="5.5" fontWeight="700" fill={C.textMuted}>{row.u}</text>
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
          <text x="48" y="22 + i * 13" fontSize="5.5" fontWeight="800" fill={INK} textAnchor="middle">{l.name}</text>
        </g>
      ))}
      <line x1="92" y1="55" x2="108" y2="55" stroke={INK} strokeWidth="2" strokeDasharray="2 2" />
      <text x="152" y="10" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">TCP/IP Model (4)</text>
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

function DiagHTTPvsHTTPS() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="10" y="20" width="85" height="70" rx="8" fill={C.sun} stroke={INK} strokeWidth="2.5" />
      <text x="52" y="38" fontSize="9" fontWeight="800" fill={INK} textAnchor="middle">HTTP</text>
      <text x="52" y="52" fontSize="7" fontWeight="700" fill={INK} textAnchor="middle">Port 80</text>
      <text x="52" y="68" fontSize="6.5" fontWeight="700" fill={C.coral} textAnchor="middle">Plain Text</text>
      <circle cx="100" cy="55" r="12" fill="#fff" stroke={INK} strokeWidth="2" />
      <text x="100" y="58" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">VS</text>
      <rect x="105" y="20" width="85" height="70" rx="8" fill={C.mint} stroke={INK} strokeWidth="2.5" />
      <text x="147" y="38" fontSize="9" fontWeight="800" fill={INK} textAnchor="middle">HTTPS</text>
      <text x="147" y="52" fontSize="7" fontWeight="700" fill={INK} textAnchor="middle">Port 443</text>
      <rect x="118" y="60" width="58" height="22" rx="4" fill={C.leaf} stroke={INK} strokeWidth="1.5" />
      <text x="147" y="74" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">SSL/TLS Encrypted</text>
    </svg>
  );
}

function DiagDNSFlow() {
  const uid = useId();
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <defs>
        <marker id={`${uid}-dns`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0L7,3.5L0,7Z" fill={INK} />
        </marker>
      </defs>
      <rect x="8" y="35" width="40" height="40" rx="6" fill={C.sky} stroke={INK} strokeWidth="2.5" />
      <text x="28" y="58" fontSize="7" fontWeight="800" fill="#fff" textAnchor="middle">Browser</text>
      <rect x="80" y="35" width="45" height="40" rx="6" fill={C.sun} stroke={INK} strokeWidth="2.5" />
      <text x="102" y="54" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">DNS Server</text>
      <text x="102" y="65" fontSize="5.5" fill={INK} textAnchor="middle">(UDP 53)</text>
      <rect x="152" y="35" width="40" height="40" rx="6" fill={C.leaf} stroke={INK} strokeWidth="2.5" />
      <text x="172" y="58" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">IP Web</text>
      <line x1="48" y1="48" x2="78" y2="48" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-dns)`} />
      <line x1="125" y1="55" x2="150" y2="55" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-dns)`} />
    </svg>
  );
}

function DiagHubvsSwitch() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="8" y="15" width="84" height="80" rx="8" fill={C.pink} stroke={INK} strokeWidth="2.5" />
      <text x="50" y="30" fontSize="7.5" fontWeight="800" fill={INK} textAnchor="middle">HUB (Layer 1)</text>
      <circle cx="50" cy="50" r="10" fill={C.coral} stroke={INK} strokeWidth="2" />
      <text x="50" y="53" fontSize="5.5" fontWeight="800" fill="#fff" textAnchor="middle">Broadcast</text>
      <rect x="108" y="15" width="84" height="80" rx="8" fill={C.mint} stroke={INK} strokeWidth="2.5" />
      <text x="150" y="30" fontSize="7.5" fontWeight="800" fill={INK} textAnchor="middle">SWITCH (Layer 2)</text>
      <circle cx="150" cy="50" r="10" fill={C.leaf} stroke={INK} strokeWidth="2" />
      <text x="150" y="53" fontSize="5.5" fontWeight="800" fill={INK} textAnchor="middle">MAC Table</text>
    </svg>
  );
}

function DiagDHCPDORA() {
  const uid = useId();
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <defs>
        <marker id={`${uid}-dora`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0L7,3.5L0,7Z" fill={INK} />
        </marker>
      </defs>
      <rect x="10" y="15" width="40" height="80" rx="6" fill={C.sky} stroke={INK} strokeWidth="2.5" />
      <text x="30" y="58" fontSize="7" fontWeight="800" fill="#fff" textAnchor="middle">Client</text>
      <rect x="150" y="15" width="40" height="80" rx="6" fill={C.amber} stroke={INK} strokeWidth="2.5" />
      <text x="170" y="58" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">DHCP</text>
      <line x1="50" y1="28" x2="148" y2="28" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-dora)`} />
      <text x="100" y="24" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">1. Discover</text>
      <line x1="150" y1="48" x2="52" y2="48" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-dora)`} />
      <text x="100" y="44" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">2. Offer</text>
      <line x1="50" y1="68" x2="148" y2="68" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-dora)`} />
      <text x="100" y="64" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">3. Request</text>
      <line x1="150" y1="88" x2="52" y2="88" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-dora)`} />
      <text x="100" y="84" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">4. ACK</text>
    </svg>
  );
}

function DiagARPRolodex() {
  const uid = useId();
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <defs>
        <marker id={`${uid}-arp`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0L7,3.5L0,7Z" fill={INK} />
        </marker>
      </defs>
      <rect x="15" y="30" width="65" height="50" rx="8" fill={C.sun} stroke={INK} strokeWidth="2.5" />
      <text x="47" y="50" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">Logical IP</text>
      <line x1="80" y1="55" x2="118" y2="55" stroke={INK} strokeWidth="3" markerEnd={`url(#${uid}-arp)`} />
      <rect x="120" y="30" width="65" height="50" rx="8" fill={C.leaf} stroke={INK} strokeWidth="2.5" />
      <text x="152" y="50" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">Physical MAC</text>
    </svg>
  );
}

function DiagGatewayvsRouter() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="8" y="20" width="85" height="70" rx="8" fill={C.sky} stroke={INK} strokeWidth="2.5" />
      <text x="50" y="42" fontSize="8" fontWeight="800" fill="#fff" textAnchor="middle">ROUTER</text>
      <text x="50" y="60" fontSize="6.5" fontWeight="700" fill="#fff" textAnchor="middle">Similar Networks</text>
      <rect x="107" y="20" width="85" height="70" rx="8" fill={C.grape} stroke={INK} strokeWidth="2.5" />
      <text x="150" y="42" fontSize="8" fontWeight="800" fill="#fff" textAnchor="middle">GATEWAY</text>
      <text x="150" y="60" fontSize="6.5" fontWeight="700" fill="#fff" textAnchor="middle">Dissimilar Networks</text>
    </svg>
  );
}

function DiagFirewall() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <circle cx="25" cy="55" r="16" fill={C.pink} stroke={INK} strokeWidth="2" />
      <rect x="85" y="15" width="30" height="80" rx="4" fill={C.coral} stroke={INK} strokeWidth="3" />
      <text x="100" y="58" fontSize="8" fontWeight="800" fill="#fff" textAnchor="middle" transform="rotate(-90 100 58)">FIREWALL</text>
      <line x1="41" y1="70" x2="155" y2="70" stroke={INK} strokeWidth="2" />
      <rect x="155" y="35" width="38" height="40" rx="6" fill={C.mint} stroke={INK} strokeWidth="2" />
    </svg>
  );
}

function DiagCastTypes() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="10" y="10" width="85" height="42" rx="6" fill={C.sky} stroke={INK} strokeWidth="2" />
      <text x="52" y="28" fontSize="7" fontWeight="800" fill="#fff" textAnchor="middle">Unicast (1 to 1)</text>
      <rect x="105" y="10" width="85" height="42" rx="6" fill={C.sun} stroke={INK} strokeWidth="2" />
      <text x="147" y="28" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">Anycast (1 to nearest)</text>
      <rect x="10" y="58" width="85" height="42" rx="6" fill={C.mint} stroke={INK} strokeWidth="2" />
      <text x="52" y="76" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">Multicast (1 to group)</text>
      <rect x="105" y="58" width="85" height="42" rx="6" fill={C.coral} stroke={INK} strokeWidth="2" />
      <text x="147" y="76" fontSize="7" fontWeight="800" fill="#fff" textAnchor="middle">Broadcast (1 to ALL)</text>
    </svg>
  );
}

function DiagGoogleFlow() {
  const steps = ["1. Cache", "2. DNS", "3. TCP Handshake", "4. HTTP Req", "5. Server Resp", "6. Render"];
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      {steps.map((s, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const x = 12 + col * 62;
        const y = 15 + row * 45;
        return (
          <g key={i}>
            <rect x={x} y={y} width="54" height="34" rx="6" fill={i % 2 === 0 ? C.sun : C.sky} stroke={INK} strokeWidth="2" />
            <text x={x + 27} y={y + 20} fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">{s}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ======================================================================
   NEW DBMS & SQL VISUAL DIAGRAMS (FROM PDF NOTES)
   ====================================================================== */

function DiagERDiagram() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="80" y="45" width="40" height="24" rx="4" fill={C.coral} stroke={INK} strokeWidth="2.5" />
      <text x="100" y="60" fontSize="7" fontWeight="800" fill="#fff" textAnchor="middle">Student</text>
      <ellipse cx="40" cy="30" rx="22" ry="12" fill={C.sun} stroke={INK} strokeWidth="2" />
      <text x="40" y="32" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle" textDecoration="underline">Roll_no</text>
      <line x1="58" y1="36" x2="82" y2="48" stroke={INK} strokeWidth="1.8" />
      <ellipse cx="100" cy="18" rx="18" ry="10" fill={C.sun} stroke={INK} strokeWidth="2" />
      <text x="100" y="21" fontSize="6" fontWeight="700" fill={INK} textAnchor="middle">Name</text>
      <line x1="100" y1="28" x2="100" y2="45" stroke={INK} strokeWidth="1.8" />
      <ellipse cx="160" cy="30" rx="18" ry="10" fill={C.sun} stroke={INK} strokeWidth="2" />
      <text x="160" y="32" fontSize="6" fontWeight="700" fill={INK} textAnchor="middle">Age</text>
      <line x1="144" y1="36" x2="118" y2="48" stroke={INK} strokeWidth="1.8" />
    </svg>
  );
}

function DiagStrongWeak() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="12" y="20" width="75" height="70" rx="8" fill={C.sky} stroke={INK} strokeWidth="2.5" />
      <text x="50" y="38" fontSize="7.5" fontWeight="800" fill="#fff" textAnchor="middle">Strong Entity</text>
      <line x1="25" y1="65" x2="75" y2="65" stroke="#fff" strokeWidth="2" />
      <text x="50" y="60" fontSize="6" fontWeight="700" fill="#fff" textAnchor="middle">Primary Key</text>

      <rect x="112" y="20" width="75" height="70" rx="8" fill={C.pink} stroke={INK} strokeWidth="2.5" />
      <rect x="116" y="24" width="67" height="62" rx="6" fill="none" stroke={INK} strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="150" y="38" fontSize="7.5" fontWeight="800" fill={INK} textAnchor="middle">Weak Entity</text>
      <line x1="125" y1="65" x2="175" y2="65" stroke={INK} strokeWidth="2" strokeDasharray="3 2" />
      <text x="150" y="60" fontSize="6" fontWeight="700" fill={INK} textAnchor="middle">Discriminator</text>
    </svg>
  );
}

function DiagKeyHierarchy() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <ellipse cx="100" cy="55" rx="90" ry="42" fill={C.sun} stroke={INK} strokeWidth="2.5" />
      <text x="100" y="22" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">Super Key</text>
      <ellipse cx="100" cy="58" rx="64" ry="28" fill={C.sky} stroke={INK} strokeWidth="2.5" />
      <text x="100" y="40" fontSize="7" fontWeight="800" fill="#fff" textAnchor="middle">Candidate Key</text>
      <ellipse cx="100" cy="64" rx="38" ry="16" fill={C.coral} stroke={INK} strokeWidth="2.5" />
      <text x="100" y="67" fontSize="7" fontWeight="800" fill="#fff" textAnchor="middle">Primary Key</text>
    </svg>
  );
}

function DiagNormalizationNested() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <ellipse cx="100" cy="55" rx="88" ry="44" fill={C.sun} stroke={INK} strokeWidth="2.5" />
      <text x="100" y="20" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">1NF (Atomic)</text>
      <ellipse cx="100" cy="58" rx="66" ry="32" fill={C.sky} stroke={INK} strokeWidth="2.5" />
      <text x="100" y="36" fontSize="7" fontWeight="800" fill="#fff" textAnchor="middle">2NF (No Partial Dep)</text>
      <ellipse cx="100" cy="62" rx="46" ry="20" fill={C.mint} stroke={INK} strokeWidth="2.5" />
      <text x="100" y="52" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">3NF (No Transitive)</text>
      <ellipse cx="100" cy="66" rx="24" ry="10" fill={C.grape} stroke={INK} strokeWidth="2" />
      <text x="100" y="69" fontSize="6" fontWeight="800" fill="#fff" textAnchor="middle">BCNF</text>
    </svg>
  );
}

function DiagTransactionLifeCycle() {
  const uid = useId();
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <defs>
        <marker id={`${uid}-t`} markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <path d="M0,0L6,3L0,6Z" fill={INK} />
        </marker>
      </defs>
      <rect x="8" y="42" width="40" height="24" rx="6" fill={C.sun} stroke={INK} strokeWidth="2" />
      <text x="28" y="56" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">Active</text>

      <line x1="48" y1="54" x2="72" y2="54" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-t)`} />

      <rect x="74" y="20" width="52" height="22" rx="5" fill={C.sky} stroke={INK} strokeWidth="2" />
      <text x="100" y="34" fontSize="6" fontWeight="800" fill="#fff" textAnchor="middle">Part. Commit</text>

      <line x1="126" y1="31" x2="148" y2="31" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-t)`} />

      <rect x="150" y="20" width="42" height="22" rx="5" fill={C.leaf} stroke={INK} strokeWidth="2" />
      <text x="171" y="34" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">Committed</text>

      <line x1="28" y1="66" x2="72" y2="82" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-t)`} />

      <rect x="74" y="72" width="52" height="22" rx="5" fill={C.coral} stroke={INK} strokeWidth="2" />
      <text x="100" y="86" fontSize="6" fontWeight="800" fill="#fff" textAnchor="middle">Failed / Abort</text>

      <line x1="126" y1="83" x2="148" y2="83" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-t)`} />

      <rect x="150" y="72" width="42" height="22" rx="5" fill={C.pink} stroke={INK} strokeWidth="2" />
      <text x="171" y="86" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">Terminated</text>
    </svg>
  );
}

function DiagACIDMatrix() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="10" y="10" width="85" height="42" rx="6" fill={C.coral} stroke={INK} strokeWidth="2" />
      <text x="52" y="28" fontSize="7.5" fontWeight="800" fill="#fff" textAnchor="middle">A - Atomicity</text>
      <text x="52" y="40" fontSize="5.5" fill="#fff" textAnchor="middle">All or Nothing</text>

      <rect x="105" y="10" width="85" height="42" rx="6" fill={C.sun} stroke={INK} strokeWidth="2" />
      <text x="147" y="28" fontSize="7.5" fontWeight="800" fill={INK} textAnchor="middle">C - Consistency</text>
      <text x="147" y="40" fontSize="5.5" fill={INK} textAnchor="middle">Valid State Always</text>

      <rect x="10" y="58" width="85" height="42" rx="6" fill={C.sky} stroke={INK} strokeWidth="2" />
      <text x="52" y="76" fontSize="7.5" fontWeight="800" fill="#fff" textAnchor="middle">I - Isolation</text>
      <text x="52" y="88" fontSize="5.5" fill="#fff" textAnchor="middle">Concurrent Safety</text>

      <rect x="105" y="58" width="85" height="42" rx="6" fill={C.leaf} stroke={INK} strokeWidth="2" />
      <text x="147" y="76" fontSize="7.5" fontWeight="800" fill={INK} textAnchor="middle">D - Durability</text>
      <text x="147" y="88" fontSize="5.5" fill={INK} textAnchor="middle">Permanent Storage</text>
    </svg>
  );
}

function DiagSQLCategories() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="8" y="15" width="42" height="80" rx="6" fill={C.sun} stroke={INK} strokeWidth="2" />
      <text x="29" y="32" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">DDL</text>
      <text x="29" y="55" fontSize="5.5" fill={INK} textAnchor="middle">CREATE</text>
      <text x="29" y="70" fontSize="5.5" fill={INK} textAnchor="middle">ALTER</text>
      <text x="29" y="85" fontSize="5.5" fill={INK} textAnchor="middle">DROP</text>

      <rect x="56" y="15" width="42" height="80" rx="6" fill={C.sky} stroke={INK} strokeWidth="2" />
      <text x="77" y="32" fontSize="7" fontWeight="800" fill="#fff" textAnchor="middle">DML</text>
      <text x="77" y="55" fontSize="5.5" fill="#fff" textAnchor="middle">SELECT</text>
      <text x="77" y="70" fontSize="5.5" fill="#fff" textAnchor="middle">INSERT</text>
      <text x="77" y="85" fontSize="5.5" fill="#fff" textAnchor="middle">UPDATE</text>

      <rect x="104" y="15" width="42" height="80" rx="6" fill={C.mint} stroke={INK} strokeWidth="2" />
      <text x="125" y="32" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">DCL</text>
      <text x="125" y="58" fontSize="5.5" fill={INK} textAnchor="middle">GRANT</text>
      <text x="125" y="75" fontSize="5.5" fill={INK} textAnchor="middle">REVOKE</text>

      <rect x="152" y="15" width="40" height="80" rx="6" fill={C.coral} stroke={INK} strokeWidth="2" />
      <text x="172" y="32" fontSize="7" fontWeight="800" fill="#fff" textAnchor="middle">TCL</text>
      <text x="172" y="58" fontSize="5.5" fill="#fff" textAnchor="middle">COMMIT</text>
      <text x="172" y="75" fontSize="5.5" fill="#fff" textAnchor="middle">ROLLBACK</text>
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
  { id: nid(), cat: "Fundamentals", term: "Big-O notation", def: "Describes how runtime or memory grows as input size grows, focused on worst-case performance.", example: "O(1) < O(log n) < O(n) < O(n log n) < O(n²)", Diagram: DiagBars, dp: { heights: [8, 18, 32, 50, 78], color: C.coral }, link: "https://en.wikipedia.org/wiki/Big_O_notation" },

  // ---------- Git (FULLY PRESERVED & EXPANDED) ----------
  { id: nid(), cat: "Git", term: "Working dir → staging → repo", def: "The core Git mental model: edits live in working directory, `git add` moves a snapshot into staging, and `git commit` locks snapshot into repo history.", example: "git status\ngit add index.js\ngit commit -m \"add login form\"", Diagram: DiagGitFlow, dp: {}, link: "https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository" },
  { id: nid(), cat: "Git", term: "git init & git clone", def: "git init turns folder into new Git repo. git clone copies an entire existing remote repository onto your machine.", example: "git init\ngit clone https://github.com/user/repo.git", Diagram: DiagFlow, dp: { steps: ["init", "or clone", "repo"], colors: [C.sun, C.sky, C.leaf] }, link: "https://git-scm.com/docs/git-clone" },
  { id: nid(), cat: "Git", term: "Configuring your identity", def: "Git requires user.name and user.email to author commits.", example: "git config --global user.name \"Alice Dev\"\ngit config --global user.email \"alice@mail.com\"", Diagram: DiagFunctionBox, dp: { inLabel: "name/email", outLabel: "commits", label: "config" }, link: "https://git-scm.com/docs/git-config" },
  { id: nid(), cat: "Git", term: "Staging & diffing", def: "git diff shows unstaged changes; git diff --staged shows staged changes about to be committed.", example: "git diff\ngit add file.js\ngit diff --staged", Diagram: DiagMagnify, dp: { color: C.sun }, link: "https://git-scm.com/docs/git-diff" },
  { id: nid(), cat: "Git", term: "Branching & Merging", def: "A branch is a movable commit pointer. git merge integrates commits from another branch into your current branch.", example: "git branch feature\ngit checkout main\ngit merge feature", Diagram: DiagBranchMerge, dp: {}, link: "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging" },
  { id: nid(), cat: "Git", term: "Stashing & Rewriting", def: "git stash shelves uncommitted work. git rebase replays commits on top of another branch; git reset rewinds history.", example: "git stash\ngit stash pop\ngit rebase main\ngit reset --hard HEAD~1", Diagram: DiagRewind, dp: {}, link: "https://git-scm.com/docs/git-stash" },
  { id: nid(), cat: "Git", term: ".gitignore & patterns", def: "Files matching .gitignore patterns are ignored by Git and never committed.", example: "node_modules/\n.env\ndist/", Diagram: DiagIgnore, dp: {}, link: "https://git-scm.com/docs/gitignore" },

  // ---------- Docker (FULLY PRESERVED & EXPANDED) ----------
  { id: nid(), cat: "Docker", term: "What is Docker?", def: "Packages an app with code, runtime, system tools, and libraries into a portable container that runs identically anywhere.", example: "\"Works on my machine\" → Works in container everywhere.", Diagram: DiagContainers, dp: { withGuestOS: false, count: 3 }, link: "https://docs.docker.com/get-started/docker-overview/" },
  { id: nid(), cat: "Docker", term: "Containers vs. Virtual Machines", def: "Containers share host kernel and only package app layer (lightweight/seconds boot). VMs bundle a full guest OS (heavy/minutes boot).", example: "3 containers share 1 kernel | 3 VMs run 3 guest OSs", Diagram: DiagVMvsContainer, dp: {} },
  { id: nid(), cat: "Docker", term: "Images vs. Containers", def: "An image is an immutable read-only blueprint (class); a container is a live running instance (object).", example: "docker run -d nginx", Diagram: DiagCompare, dp: { left: "Image", right: "Container", colorL: C.sun, colorR: C.docker } },
  { id: nid(), cat: "Docker", term: "Dockerfile & Image Layers", def: "Dockerfile instructions build cached read-only image layers step-by-step from a base image.", example: "FROM node:20\nCOPY . .\nRUN npm install\nCMD [\"node\",\"server.js\"]", Diagram: DiagFlow, dp: { steps: ["Dockerfile", "build", "Image"], colors: [C.sun, C.grape, C.docker] } },
  { id: nid(), cat: "Docker", term: "Volumes & Persistent Storage", def: "Containers are ephemeral. Volumes store data outside the container filesystem so database data persists across container restarts.", example: "docker run -v pgdata:/var/lib/postgresql/data postgres", Diagram: DiagStack, dp: { layers: [{ label: "container (ephemeral)", color: C.pink }, { label: "volume (persists)", color: C.leaf }] } },
  { id: nid(), cat: "Docker", term: "Docker Compose & Networks", def: "Docker Compose defines multi-container applications in YAML (web + db + redis) and starts them together on an isolated network.", example: "docker compose up -d", Diagram: DiagContainers, dp: { withGuestOS: false, count: 3 } },

  // ---------- COMPUTER NETWORKS (FULL PDF COVERAGE) ----------
  { id: nid(), cat: "Networking", term: "Network Topologies (Star, Ring, Bus, Mesh, Tree, Hybrid)", def: "Layout specification of nodes and cables. Star (central hub), Ring (token loop), Bus (shared backbone), Mesh (direct links N*(N-1)/2), Tree, and Hybrid.", example: "Star topology used in home Wi-Fi; Ring in SONET; Mesh in high-resiliency data centers.", Diagram: DiagStarTopology, dp: {}, link: "https://en.wikipedia.org/wiki/Network_topology" },
  { id: nid(), cat: "Networking", term: "Network Types by Area (PAN, LAN, HAN, CAN, MAN, WAN, GAN)", def: "Geographic scale: PAN (10m Bluetooth), LAN (office), HAN (home), CAN (campus), MAN (city), WAN (global/internet), GAN (satellites).", example: "PAN = 10m range | LAN = Office building | WAN = Global Internet", Diagram: DiagNetworkScale, dp: {} },
  { id: nid(), cat: "Networking", term: "VPN & Secured Tunneling", def: "Virtual Private Network encrypts traffic in a secure tunnel across public Internet. Types: Access VPN (remote users), Site-to-Site (Intranet & Extranet).", example: "AES Encrypted tunnel connecting remote worker to corporate intranet.", Diagram: DiagVPNTunnel, dp: {} },
  { id: nid(), cat: "Networking", term: "IPv4 Addressing & Classes (A, B, C, D, E)", def: "32-bit (4 octet) address. Class A (1-126 large), Class B (128-191 medium), Class C (192-223 LAN), Class D (224-239 Multicast), Class E (240-254 R&D).", example: "192.168.1.1 is Class C Local Network IP.", Diagram: DiagIPv4Classes, dp: {} },
  { id: nid(), cat: "Networking", term: "OSI Model (7 Layers) vs TCP/IP (4 Layers)", def: "OSI: Physical, Data Link, Network, Transport, Session, Presentation, Application. TCP/IP: Link, Internet, Transport, Application.", example: "OSI = 7 Layer Standard Reference | TCP/IP = 4 Layer Internet Protocol", Diagram: DiagOSIvsTCPIP, dp: {} },
  { id: nid(), cat: "Networking", term: "HTTP vs. HTTPS", def: "HTTP (port 80) sends plain unencrypted text. HTTPS (port 443) uses SSL/TLS encryption for confidential data transfer.", example: "HTTP: port 80 (insecure) | HTTPS: port 443 (SSL/TLS encrypted)", Diagram: DiagHTTPvsHTTPS, dp: {} },
  { id: nid(), cat: "Networking", term: "DNS Lookup & Forwarder", def: "Domain Name System maps domain names to IP addresses over UDP port 53. Forwarder passes unresolved queries to external DNS servers.", example: "google.com → 142.250.x.x", Diagram: DiagDNSFlow, dp: {} },
  { id: nid(), cat: "Networking", term: "TCP 3-Way Handshake & UDP", def: "TCP establishes connection via SYN → SYN-ACK → ACK (reliable). UDP is connectionless and fast (video calls/gaming).", example: "SYN → SYN-ACK → ACK", Diagram: DiagHandshake, dp: {} },
  { id: nid(), cat: "Networking", term: "DHCP (Port 67) & DORA Process", def: "Auto-assigns IP addresses and configurations via Discover, Offer, Request, Acknowledge.", example: "Connecting phone to Wi-Fi automatically retrieves local IP.", Diagram: DiagDHCPDORA, dp: {} },
  { id: nid(), cat: "Networking", term: "ARP Protocol (Address Resolution)", def: "Converts logical IP addresses into physical MAC addresses for local network delivery.", example: "Broadcasts IP query -> Target responds with physical MAC address.", Diagram: DiagARPRolodex, dp: {} },
  { id: nid(), cat: "Networking", term: "Hub vs. Switch", def: "Hub (Layer 1) broadcasts incoming packets to ALL ports. Switch (Layer 2) inspects MAC address table to route frames to destination port.", example: "Hub = broadcast splitter | Switch = intelligent MAC filtering", Diagram: DiagHubvsSwitch, dp: {} },
  { id: nid(), cat: "Networking", term: "Gateway vs. Router", def: "Router routes packets between two SIMILAR networks. Gateway bridges two DISSIMILAR networks with different protocol suites.", example: "Router = LAN to LAN | Gateway = IP Network to non-IP System", Diagram: DiagGatewayvsRouter, dp: {} },
  { id: nid(), cat: "Networking", term: "Firewall & Cast Types", def: "Firewall monitors/blocks unauthorized traffic. Cast types: Unicast (1:1), Anycast (1:nearest), Multicast (1:group), Broadcast (1:all).", example: "Firewall inspects ports | Broadcast sends to all nodes.", Diagram: DiagFirewall, dp: {} },
  { id: nid(), cat: "Networking", term: "What happens when you type google.com?", def: "1. Browser/OS Cache → 2. DNS Lookup → 3. TCP Handshake → 4. HTTP Request → 5. Server Response → 6. Browser Render.", example: "Cache → DNS → Handshake → Request → Render", Diagram: DiagGoogleFlow, dp: {} },

  // ---------- DBMS & SQL (NEW COVER-TO-COVER EXPANDED FROM PDF 2) ----------
  { id: nid(), cat: "SQL", term: "Database & DBMS Overview", def: "Database is an organized collection of related real-world data. DBMS software manages storage, security, and retrieval while eliminating file system drawbacks (redundancy, inconsistency, isolation).", example: "MySQL, PostgreSQL, Oracle, SQLite", Diagram: DiagTable, dp: { color: C.leaf } },
  { id: nid(), cat: "SQL", term: "ER Diagram (Entity Relationship)", def: "Graphical representation of logical database structure consisting of Entity Sets (rectangles), Attributes (ovals), and Relationship Sets (diamonds).", example: "Student (Entity) -- [Roll_no (PK), Name, Age] (Attributes)", Diagram: DiagERDiagram, dp: {}, link: "https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model" },
  { id: nid(), cat: "SQL", term: "Strong vs. Weak Entity Set", def: "Strong Entity Set has a Primary Key (solid line underline). Weak Entity Set lacks a primary key and relies on a partial key / discriminator (dashed line underline).", example: "Order (Strong) vs OrderItem (Weak dependent on Order)", Diagram: DiagStrongWeak, dp: {} },
  { id: nid(), cat: "SQL", term: "Relationships & Cardinality", def: "Relationships connect entities (Unary, Binary, Ternary, N-ary). Cardinality defines max associations: One-to-One (1:1), One-to-Many (1:N), Many-to-One (N:1), Many-to-Many (M:N).", example: "Department 1 : N Employees | Student M : N Courses", Diagram: DiagFlow, dp: { steps: ["1 : 1", "1 : N", "N : 1", "M : N"], colors: [C.sky, C.sun, C.leaf, C.coral] } },
  { id: nid(), cat: "SQL", term: "Types of Attributes", def: "Simple (indivisible like Age), Composite (Name -> First/Last), Multi-valued (multiple values like Phone Nos), Derived (computed from other attributes like Age from DOB), Key attribute (uniquely identifies tuple).", example: "Derived: Age from DOB | Multi-valued: Email IDs", Diagram: DiagERDiagram, dp: {} },
  { id: nid(), cat: "SQL", term: "Relational Constraints", def: "Domain constraint (atomic values), Tuple Uniqueness, Key constraint (unique & NOT NULL), Entity Integrity (Primary key not NULL), Referential Integrity (Foreign key must match PK or be NULL).", example: "FOREIGN KEY (dept_id) REFERENCES departments(id)", Diagram: DiagKeyLock, dp: {} },
  { id: nid(), cat: "SQL", term: "Key Hierarchy (Super, Candidate, Primary, Alternate, Foreign)", def: "Super Key = any set of attributes identifying a tuple. Candidate Key = minimal Super Key. Primary Key = chosen Candidate Key. Alternate Key = unused Candidate Keys.", example: "Super Key ⊃ Candidate Key ⊃ Primary Key", Diagram: DiagKeyHierarchy, dp: {} },
  { id: nid(), cat: "SQL", term: "Functional Dependencies (Trivial vs Non-Trivial)", def: "α → β holds if tuples with same α value have same β value. Trivial if β ⊆ α. Non-Trivial if β ⊄ α.", example: "(roll_no, name) → roll_no is Trivial | roll_no → name is Non-Trivial", Diagram: DiagFunctionBox, dp: { inLabel: "α", outLabel: "β", label: "α → β" } },
  { id: nid(), cat: "SQL", term: "Normalization (1NF, 2NF, 3NF, BCNF)", def: "Reduces data redundancy. 1NF: Atomic values. 2NF: No partial dependencies (A→B where A is proper subset of candidate key). 3NF: No transitive dependencies. BCNF: A→B requires A to be a super key.", example: "1NF ⊃ 2NF ⊃ 3NF ⊃ BCNF", Diagram: DiagNormalizationNested, dp: {}, link: "https://en.wikipedia.org/wiki/Database_normalization" },
  { id: nid(), cat: "SQL", term: "Relation Decomposition (Lossless vs Lossy)", def: "Decomposition breaks relation R into R1..Rn. Lossless ensures R1 ⋈ R2 ⋈ ... ⋈ Rn = R (no data loss). Dependency preservation ensures functional dependencies remain enforceable.", example: "R1 ⋈ R2 = R → Lossless Join Decomposition", Diagram: DiagNormalize, dp: {} },
  { id: nid(), cat: "SQL", term: "Transaction Life Cycle States", def: "Single logical unit of work operations: Read(A), Write(A). States: Active → Partially Committed → Committed (Permanent Store) OR Failed → Aborted (Rollback) → Terminated.", example: "Active -> Partially Committed -> Committed / Failed -> Aborted", Diagram: DiagTransactionLifeCycle, dp: {}, link: "https://en.wikipedia.org/wiki/Database_transaction" },
  { id: nid(), cat: "SQL", term: "ACID Properties", def: "Atomicity (all or nothing), Consistency (preserves integrity rules), Isolation (concurrent safety), Durability (permanent write to disk).", example: "Money transfer: subtract from A & add to B atomically.", Diagram: DiagACIDMatrix, dp: {} },
  { id: nid(), cat: "SQL", term: "Schedules & Serializability", def: "Serial (one by one, strict) vs Non-Serial (concurrent execution). Conflict / View Serializable schedule is equivalent to a serial schedule. Recoverable schedules avoid dirty read errors (Cascading, Cascadeless, Strict).", example: "Strict schedule prevents reading uncommitted written data.", Diagram: DiagFlow, dp: { steps: ["Serial", "Non-Serial", "Serializable", "Strict"], colors: [C.leaf, C.sun, C.sky, C.coral] } },
  { id: nid(), cat: "SQL", term: "Relational Algebra Operators", def: "Basic: Selection σ, Projection Π, Cross Product X, Union U, Difference -, Rename ρ. Extended: Intersection ∩, Natural Join ⋈, Left/Right/Full Outer Joins, Division /.", example: "σ age > 18 (Students)", Diagram: DiagFunctionBox, dp: { inLabel: "Relation", outLabel: "Result", label: "σ / Π / ⋈" } },
  { id: nid(), cat: "SQL", term: "Indexes, B-Trees & B+ Trees", def: "Primary Index (ordered PK file), Clustering Index, Secondary Index. B-Trees & B+ Trees keep keys sorted; B+ Trees store data pointers only in leaf nodes for faster shallow search.", example: "B+ Tree: Leaves store all data pointers, non-leaf nodes index keys.", Diagram: DiagTree, dp: {} },
  { id: nid(), cat: "SQL", term: "SQL Command Categories (DDL, DML, DCL, TCL)", def: "DDL (CREATE, ALTER, DROP, TRUNCATE), DML (SELECT, INSERT, UPDATE, DELETE, MERGE), DCL (GRANT, REVOKE), TCL (COMMIT, ROLLBACK, SAVEPOINT).", example: "CREATE = DDL | SELECT = DML | GRANT = DCL | COMMIT = TCL", Diagram: DiagSQLCategories, dp: {} },
  { id: nid(), cat: "SQL", term: "SQL Joins (INNER, LEFT, RIGHT, FULL, CROSS)", def: "Combines tables on foreign key match. INNER (matches both), LEFT (all left + matching right), RIGHT (all right + matching left), FULL (all rows), CROSS (Cartesian m*n).", example: "SELECT * FROM orders INNER JOIN customers ON orders.cust_id = customers.id;", Diagram: DiagVenn, dp: { mode: "inner", color: C.leaf } },
  { id: nid(), cat: "SQL", term: "Aggregate Functions & GROUP BY / HAVING", def: "MIN(), MAX(), COUNT(), AVG(), SUM(). GROUP BY buckets rows. HAVING filters aggregated bucket results (WHERE applies before HAVING).", example: "SELECT dept, COUNT(*) FROM emp GROUP BY dept HAVING COUNT(*) > 5;", Diagram: DiagBucket, dp: {} },
  { id: nid(), cat: "SQL", term: "SQL Wildcards & LIKE Operator", def: "LIKE searches patterns: % (0+ characters), _ (exactly 1 character).", example: "WHERE name LIKE 'A%' (starts with A) | WHERE name LIKE '_r%' (second char r)", Diagram: DiagMagnify, dp: { color: C.sun } },

  // ---------- OS ----------
  { id: nid(), cat: "OS", term: "Process vs. thread", def: "Process = independent program with memory space. Thread = lightweight unit inside process sharing memory.", example: "Browser tabs = processes | Render threads = threads", Diagram: DiagCompare, dp: { left: "Process", right: "Thread", colorL: C.sky, colorR: C.grape } },

  // ---------- Data Structures ----------
  { id: nid(), cat: "Data Structures", term: "Arrays vs. linked lists", def: "Arrays give O(1) index access but O(n) insert. Linked lists give O(1) insert once pointer is positioned.", example: "Random access → Array | Frequent inserts → Linked List", Diagram: DiagCompare, dp: { left: "Array", right: "Linked List", colorL: C.sky, colorR: C.coral } },

  // ---------- Algorithms ----------
  { id: nid(), cat: "Algorithms", term: "Two pointers", def: "Move two indices through array to solve problems in O(n) without nested loops.", example: "let l=0, r=n-1; while(l<r) { ... }", Diagram: DiagPointers, dp: {} },

  // ---------- OOP ----------
  { id: nid(), cat: "OOP", term: "Encapsulation & Polymorphism", def: "Encapsulation hides state behind public interface. Polymorphism allows subclass methods to override parent behavior.", example: "class Dog extends Animal { speak(){ return 'Woof'; } }", Diagram: DiagPoly, dp: {} },

  // ---------- React ----------
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
    { name: "Star", desc: "Nodes connect to central switch. Robust against single cable cuts, but central switch failure downs network.", color: C.sun },
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
  { label: "Topics mastered", value: "62", total: "/ 140", icon: BookOpen, color: C.sun },
  { label: "Problems solved", value: "95", total: "total", icon: Code2, color: C.mint },
  { label: "Avg assessment score", value: "88", total: "%", icon: ClipboardCheck, color: C.sky },
  { label: "Current streak", value: "12", total: "days", icon: Flame, color: C.coral },
];

const PROGRESS = [
  { name: "DBMS & SQL: ER Diagrams & Normalization", pct: 95, color: C.leaf },
  { name: "Computer Networks: Topologies & OSI", pct: 90, color: C.amber },
  { name: "Git & Version Control", pct: 85, color: C.rust },
  { name: "Docker & DevOps Containers", pct: 80, color: C.docker },
  { name: "Arrays, Strings & Pointers", pct: 80, color: C.mint },
  { name: "React: Hooks & State Management", pct: 70, color: C.cyan },
  { name: "OS: Threads, Scheduling & Lifecycle", pct: 60, color: C.mint },
];

const SCHEDULE = [
  { title: "DBMS & SQL — Normalization & ER Diagrams", when: "Today", date: "Aug 10", color: C.leaf },
  { title: "Visual Network Lab — Topologies & Packets", when: "Tomorrow", date: "Aug 11", color: C.amber },
  { title: "Docker & Git — Containers & Rebasing", when: "in 2 days", date: "Aug 12", color: C.docker },
  { title: "Assessment — Transactions & ACID Check", when: "in 4 days", date: "Aug 14", color: C.coral },
];

const RECOMMENDED = [
  { title: "ER Diagrams: Entities, Attributes & Keys", tag: "SQL", desc: "Visual guide to Strong vs Weak Entities and Primary/Partial Keys." },
  { title: "Database Normalization (1NF → 2NF → 3NF → BCNF)", tag: "SQL", desc: "Master nested normalization rules to eliminate partial and transitive dependencies." },
  { title: "Transaction Life Cycle & ACID Matrix", tag: "SQL", desc: "Trace Active → Committed states and Atomicity, Consistency, Isolation, Durability." },
  { title: "Git: Rebase vs. Merge & Stashing", tag: "Git", desc: "Clean branch management, stashing uncommitted work, and rewinding history." },
  { title: "Docker: Containers vs. Virtual Machines", tag: "Docker", desc: "Shared OS kernel containers vs heavy hypervisor Guest OS virtual machines." }
];

function Dashboard({ goTo }) {
  return (
    <div className="p-5 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <Mascot size={56} />
        <div>
          <h1 className="font-display text-2xl font-extrabold" style={{ color: INK }}>Welcome, Visual Learner!</h1>
          <p className="font-code text-[13px] mt-1" style={{ color: C.textMuted }}>
            // DBMS & SQL notes + Computer Networks + Git + Docker visual curriculum fully active
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
        {/* front: diagram */}
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
        {/* back: text */}
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
            placeholder="Search: ER Diagram, 3NF, BCNF, ACID, Git, Docker, OSI, TCP..."
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
          <p className="text-[13px] font-ui" style={{ color: C.textMuted }}>No concepts match "{query}". Try searching for 'ER', 'Normalization', or 'Git'.</p>
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
   ASSESSMENT MODE (DBMS, SQL, NETWORKING, GIT, DOCKER)
   ====================================================================== */

const QUESTIONS = [
  { q: "In an ER diagram, what symbol is used to represent an Entity Set?", options: ["Oval", "Rectangle", "Diamond", "Dashed Circle"], correct: 1, explain: "In ER diagrams, Rectangles represent Entity Sets, Ovals represent Attributes, and Diamonds represent Relationship Sets." },
  { q: "Which Normal Form removes transitive functional dependencies (where non-key A → B)?", options: ["1NF", "2NF", "3NF", "BCNF"], correct: 2, explain: "3NF requires a relation to be in 2NF and have no transitive dependencies on non-prime attributes." },
  { q: "In Star topology, what happens if the central device (Hub/Switch) fails?", options: ["Only 1 node disconnects", "The entire network fails", "Nodes auto-switch to Ring mode", "No effect"], correct: 1, explain: "Star topology depends on the central hub/switch. Central failure downs all communication." },
  { q: "Which ACID property guarantees that a transaction executes completely or not at all?", options: ["Atomicity", "Consistency", "Isolation", "Durability"], correct: 0, explain: "Atomicity ensures all-or-nothing execution." },
  { q: "How many layers are in the standard OSI Reference Model?", options: ["4", "5", "7", "9"], correct: 2, explain: "OSI has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application." },
  { q: "In Docker, what is the difference between an Image and a Container?", options: ["No difference", "Container is read-only blueprint, Image is live", "Image is immutable blueprint, Container is live running instance", "Images require VM hypervisor"], correct: 2, explain: "An Image is a read-only blueprint; a Container is a live running instance." },
  { q: "What does `git stash` do?", options: ["Deletes uncommitted changes permanently", "Shelves uncommitted changes so you can switch branches cleanly", "Creates a new branch", "Undoes the last commit"], correct: 1, explain: "git stash saves uncommitted modifications off to the side so you get a clean working tree." },
  { q: "Which SQL clause filters records AFTER aggregation with GROUP BY?", options: ["WHERE", "HAVING", "ORDER BY", "LIMIT"], correct: 1, explain: "WHERE filters rows before aggregation; HAVING filters aggregated bucket results after GROUP BY." },
  { q: "What default port is used by HTTPS for secure encrypted communication?", options: ["Port 80", "Port 21", "Port 443", "Port 25"], correct: 2, explain: "HTTP uses port 80; HTTPS uses port 443 with SSL/TLS encryption." },
  { q: "What is a Weak Entity Set in DBMS?", options: ["An entity set without primary key that relies on a partial key/discriminator", "An entity with no attributes", "A table with no foreign keys", "A view with no data"], correct: 0, explain: "Weak entity sets cannot be uniquely identified by their own attributes alone and rely on a partial key (discriminator)." }
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
        <p className="font-code text-[13px] mb-6" style={{ color: C.textMuted }}>// quiz.test.js — updated with DBMS, SQL, Computer Networks, Git & Docker</p>
        <div className="rounded-3xl p-6 sticker" style={{ backgroundColor: C.card, border: `3px solid ${INK}` }}>
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck size={18} style={{ color: C.sky }} />
            <p className="text-[15px] font-ui font-bold" style={{ color: INK }}>Timed knowledge check</p>
          </div>
          <ul className="text-[13px] leading-relaxed font-ui" style={{ color: C.textMuted }}>
            <li>&bull; {QUESTIONS.length} multiple-choice questions covering DBMS, SQL, Computer Networks, Git & Docker</li>
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
