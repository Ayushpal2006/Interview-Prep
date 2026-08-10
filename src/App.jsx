import React, { useState, useEffect, useRef, useMemo, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BookOpen, Code2, ClipboardCheck, Search, Flame,
  ChevronRight, Play, CheckCircle2, XCircle, Clock, GitBranch,
  Terminal, X, RotateCcw, ArrowRight, Sparkles, ShieldCheck,
  Boxes, Layers, Globe, Database, Box, Menu, Cpu, Network, ExternalLink, Atom,
  Shield, Server, HardDrive, Wifi, Radio, Zap, Lock, RefreshCw, Activity, ArrowLeftRight
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
   EXISTING & ENHANCED DIAGRAM COMPONENTS
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
   NEW COMPUTER NETWORKS CUSTOM VISUAL DIAGRAMS (FROM DOCUMENT)
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
      <text x="100" y="52" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">Full Mesh (N*(N-1)/2)</text>
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
      {/* Star side */}
      <circle cx="50" cy="55" r="12" fill={C.amber} stroke={INK} strokeWidth="2" />
      <line x1="50" y1="55" x2="25" y2="30" stroke={INK} strokeWidth="1.8" />
      <line x1="50" y1="55" x2="25" y2="80" stroke={INK} strokeWidth="1.8" />
      <circle cx="25" cy="30" r="7" fill={C.sky} stroke={INK} strokeWidth="1.5" />
      <circle cx="25" cy="80" r="7" fill={C.sky} stroke={INK} strokeWidth="1.5" />
      {/* Connector */}
      <line x1="62" y1="55" x2="130" y2="55" stroke={INK} strokeWidth="3" strokeDasharray="4 2" />
      <rect x="88" y="44" width="24" height="22" rx="5" fill={C.sun} stroke={INK} strokeWidth="2" />
      <text x="100" y="58" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">Bridge</text>
      {/* Ring side */}
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
      {/* Concentric scale */}
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
      {/* Public internet cloud background */}
      <path d="M40,55 Q50,25 90,30 Q120,20 150,40 Q170,55 150,75 Q120,90 80,80 Q40,85 40,55 Z" fill="#EAE6F8" stroke={INK} strokeWidth="2" strokeDasharray="3 3" />
      {/* Secure tunnel inside */}
      <rect x="25" y="44" width="150" height="22" rx="11" fill={C.leaf} stroke={INK} strokeWidth="2.5" />
      <text x="100" y="58" fontSize="7.5" fontWeight="800" fill={INK} textAnchor="middle">AES Encrypted VPN Tunnel</text>
      {/* Left Client */}
      <rect x="8" y="38" width="28" height="34" rx="5" fill={C.sky} stroke={INK} strokeWidth="2" />
      <text x="22" y="58" fontSize="6" fontWeight="800" fill="#fff" textAnchor="middle">User</text>
      {/* Right Office Server */}
      <rect x="164" y="38" width="28" height="34" rx="5" fill={C.grape} stroke={INK} strokeWidth="2" />
      <text x="178" y="58" fontSize="6" fontWeight="800" fill="#fff" textAnchor="middle">Corp</text>
    </svg>
  );
}

function DiagIPv4Classes() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="10" y="10" width="180" height="90" rx="8" fill="#fff" stroke={INK} strokeWidth="2.5" />
      {/* Header */}
      <rect x="10" y="10" width="180" height="18" rx="8" fill={C.sun} stroke={INK} strokeWidth="2" />
      <text x="30" y="22" fontSize="6.5" fontWeight="800" fill={INK}>Class</text>
      <text x="80" y="22" fontSize="6.5" fontWeight="800" fill={INK}>1st Octet Range</text>
      <text x="150" y="22" fontSize="6.5" fontWeight="800" fill={INK}>Primary Usage</text>
      {/* Rows */}
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
  const tcpip = [
    { name: "Application", col: C.coral, h: 3 },
    { name: "Transport", col: C.sky, h: 1 },
    { name: "Internet", col: C.mint, h: 1 },
    { name: "Network Link", col: C.leaf, h: 2 }
  ];
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      {/* OSI Stack */}
      <text x="48" y="10" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">OSI Model (7)</text>
      {osi.map((l, i) => (
        <g key={i}>
          <rect x="8" y={14 + i * 13} width="80" height="11" rx="3" fill={l.col} stroke={INK} strokeWidth="1.5" />
          <text x="48" y={22 + i * 13} fontSize="5.5" fontWeight="800" fill={INK} textAnchor="middle">{l.name}</text>
        </g>
      ))}
      {/* Arrow mapping */}
      <line x1="92" y1="55" x2="108" y2="55" stroke={INK} strokeWidth="2" strokeDasharray="2 2" />
      {/* TCP/IP Stack */}
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
      {/* HTTP Box */}
      <rect x="10" y="20" width="85" height="70" rx="8" fill={C.sun} stroke={INK} strokeWidth="2.5" />
      <text x="52" y="38" fontSize="9" fontWeight="800" fill={INK} textAnchor="middle">HTTP</text>
      <text x="52" y="52" fontSize="7" fontWeight="700" fill={INK} textAnchor="middle">Port 80</text>
      <text x="52" y="68" fontSize="6.5" fontWeight="700" fill={C.coral} textAnchor="middle">Plain Text</text>
      <text x="52" y="80" fontSize="6" fill={INK} textAnchor="middle">No Security</text>

      {/* VS Badge */}
      <circle cx="100" cy="55" r="12" fill="#fff" stroke={INK} strokeWidth="2" />
      <text x="100" y="58" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">VS</text>

      {/* HTTPS Box */}
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
      {/* PC */}
      <rect x="8" y="35" width="40" height="40" rx="6" fill={C.sky} stroke={INK} strokeWidth="2.5" />
      <text x="28" y="58" fontSize="7" fontWeight="800" fill="#fff" textAnchor="middle">Browser</text>
      {/* DNS Resolver */}
      <rect x="80" y="35" width="45" height="40" rx="6" fill={C.sun} stroke={INK} strokeWidth="2.5" />
      <text x="102" y="54" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">DNS Server</text>
      <text x="102" y="65" fontSize="5.5" fill={INK} textAnchor="middle">(UDP 53)</text>
      {/* Target IP */}
      <rect x="152" y="35" width="40" height="40" rx="6" fill={C.leaf} stroke={INK} strokeWidth="2.5" />
      <text x="172" y="58" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">IP Web</text>

      <line x1="48" y1="48" x2="78" y2="48" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-dns)`} />
      <text x="63" y="44" fontSize="5.5" fontWeight="700" fill={INK} textAnchor="middle">"site.com?"</text>

      <line x1="125" y1="55" x2="150" y2="55" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-dns)`} />
      <text x="137" y="50" fontSize="5.5" fontWeight="700" fill={INK} textAnchor="middle">142.250.x.x</text>
    </svg>
  );
}

function DiagHubvsSwitch() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      {/* Hub Side */}
      <rect x="8" y="15" width="84" height="80" rx="8" fill={C.pink} stroke={INK} strokeWidth="2.5" />
      <text x="50" y="30" fontSize="7.5" fontWeight="800" fill={INK} textAnchor="middle">HUB (Layer 1)</text>
      <circle cx="50" cy="50" r="10" fill={C.coral} stroke={INK} strokeWidth="2" />
      <text x="50" y="53" fontSize="5.5" fontWeight="800" fill="#fff" textAnchor="middle">Broadcast</text>
      <text x="50" y="75" fontSize="6" fill={INK} textAnchor="middle">Sends to ALL ports</text>
      <text x="50" y="86" fontSize="5.5" fill={INK} textAnchor="middle">(Half Duplex / No filter)</text>

      {/* Switch Side */}
      <rect x="108" y="15" width="84" height="80" rx="8" fill={C.mint} stroke={INK} strokeWidth="2.5" />
      <text x="150" y="30" fontSize="7.5" fontWeight="800" fill={INK} textAnchor="middle">SWITCH (Layer 2)</text>
      <circle cx="150" cy="50" r="10" fill={C.leaf} stroke={INK} strokeWidth="2" />
      <text x="150" y="53" fontSize="5.5" fontWeight="800" fill={INK} textAnchor="middle">MAC Table</text>
      <text x="150" y="75" fontSize="6" fill={INK} textAnchor="middle">Directs to target port</text>
      <text x="150" y="86" fontSize="5.5" fill={INK} textAnchor="middle">(Full Duplex / Packet filter)</text>
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
      <text x="100" y="24" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">1. Discover (Broadcast)</text>

      <line x1="150" y1="48" x2="52" y2="48" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-dora)`} />
      <text x="100" y="44" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">2. Offer (IP Offer)</text>

      <line x1="50" y1="68" x2="148" y2="68" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-dora)`} />
      <text x="100" y="64" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">3. Request (IP Choice)</text>

      <line x1="150" y1="88" x2="52" y2="88" stroke={INK} strokeWidth="2" markerEnd={`url(#${uid}-dora)`} />
      <text x="100" y="84" fontSize="6" fontWeight="800" fill={INK} textAnchor="middle">4. Acknowledge (ACK)</text>
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
      <text x="47" y="64" fontSize="6" fill={INK} textAnchor="middle">192.168.1.5</text>

      <line x1="80" y1="55" x2="118" y2="55" stroke={INK} strokeWidth="3" markerEnd={`url(#${uid}-arp)`} />
      <text x="100" y="46" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">ARP Lookup</text>

      <rect x="120" y="30" width="65" height="50" rx="8" fill={C.leaf} stroke={INK} strokeWidth="2.5" />
      <text x="152" y="50" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">Physical MAC</text>
      <text x="152" y="64" fontSize="5.5" fill={INK} textAnchor="middle">00:1A:2B:3C:4D:5E</text>
    </svg>
  );
}

function DiagGatewayvsRouter() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="8" y="20" width="85" height="70" rx="8" fill={C.sky} stroke={INK} strokeWidth="2.5" />
      <text x="50" y="42" fontSize="8" fontWeight="800" fill="#fff" textAnchor="middle">ROUTER</text>
      <text x="50" y="60" fontSize="6.5" fontWeight="700" fill="#fff" textAnchor="middle">Similar Networks</text>
      <text x="50" y="74" fontSize="6" fill="#fff" textAnchor="middle">(e.g. IP to IP)</text>

      <rect x="107" y="20" width="85" height="70" rx="8" fill={C.grape} stroke={INK} strokeWidth="2.5" />
      <text x="150" y="42" fontSize="8" fontWeight="800" fill="#fff" textAnchor="middle">GATEWAY</text>
      <text x="150" y="60" fontSize="6.5" fontWeight="700" fill="#fff" textAnchor="middle">Dissimilar Networks</text>
      <text x="150" y="74" fontSize="6" fill="#fff" textAnchor="middle">(Protocol conversion)</text>
    </svg>
  );
}

function DiagFirewall() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      {/* Public Net */}
      <circle cx="25" cy="55" r="16" fill={C.pink} stroke={INK} strokeWidth="2" />
      <text x="25" y="58" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">Internet</text>

      {/* Firewall Wall */}
      <rect x="85" y="15" width="30" height="80" rx="4" fill={C.coral} stroke={INK} strokeWidth="3" />
      <text x="100" y="58" fontSize="8" fontWeight="800" fill="#fff" textAnchor="middle" transform="rotate(-90 100 58)">FIREWALL</text>

      {/* Allowed vs Blocked */}
      <line x1="41" y1="40" x2="85" y2="40" stroke={INK} strokeWidth="2" />
      <text x="63" y="35" fontSize="6" fontWeight="700" fill={C.coral} textAnchor="middle">&#10005; Blocked</text>

      <line x1="41" y1="70" x2="155" y2="70" stroke={INK} strokeWidth="2" />
      <text x="63" y="65" fontSize="6" fontWeight="700" fill={C.leaf} textAnchor="middle">&#10003; Safe Data</text>

      {/* Private Net */}
      <rect x="155" y="35" width="38" height="40" rx="6" fill={C.mint} stroke={INK} strokeWidth="2" />
      <text x="174" y="58" fontSize="6.5" fontWeight="800" fill={INK} textAnchor="middle">Private Network</text>
    </svg>
  );
}

function DiagCastTypes() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-24">
      <rect x="10" y="10" width="85" height="42" rx="6" fill={C.sky} stroke={INK} strokeWidth="2" />
      <text x="52" y="28" fontSize="7" fontWeight="800" fill="#fff" textAnchor="middle">Unicast (1 to 1)</text>
      <text x="52" y="42" fontSize="5.5" fill="#fff" textAnchor="middle">Single receiver node</text>

      <rect x="105" y="10" width="85" height="42" rx="6" fill={C.sun} stroke={INK} strokeWidth="2" />
      <text x="147" y="28" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">Anycast (1 to nearest)</text>
      <text x="147" y="42" fontSize="5.5" fill={INK} textAnchor="middle">CDN nearest node</text>

      <rect x="10" y="58" width="85" height="42" rx="6" fill={C.mint} stroke={INK} strokeWidth="2" />
      <text x="52" y="76" fontSize="7" fontWeight="800" fill={INK} textAnchor="middle">Multicast (1 to group)</text>
      <text x="52" y="90" fontSize="5.5" fill={INK} textAnchor="middle">Specific subset of nodes</text>

      <rect x="105" y="58" width="85" height="42" rx="6" fill={C.coral} stroke={INK} strokeWidth="2" />
      <text x="147" y="76" fontSize="7" fontWeight="800" fill="#fff" textAnchor="middle">Broadcast (1 to ALL)</text>
      <text x="147" y="90" fontSize="5.5" fill="#fff" textAnchor="middle">Every node in network</text>
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
   CONCEPT DATA — Fundamentals, Git, DS, Algorithms, OOP, OS, Networking, React, Web, SQL, Docker
   ====================================================================== */

let _id = 0;
const nid = () => ++_id;

const CONCEPTS = [
  // ---------- Fundamentals ----------
  { id: nid(), cat: "Fundamentals", term: "Big-O notation", def: "Describes how runtime or memory grows as input size grows, focused on the worst case rather than exact timings.", example: "O(1) < O(log n) < O(n) < O(n log n) < O(n²)", Diagram: DiagBars, dp: { heights: [8, 18, 32, 50, 78], color: C.coral }, link: "https://en.wikipedia.org/wiki/Big_O_notation" },

  // ---------- Git ----------
  { id: nid(), cat: "Git", term: "Working dir → staging → repo", def: "The core Git mental model: edits live in your working directory, `git add` moves a snapshot into the staging area, and `git commit` locks that snapshot into your repo's history.", example: "git status\ngit add index.js\ngit commit -m \"add login form\"", Diagram: DiagGitFlow, dp: {}, link: "https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository" },
  { id: nid(), cat: "Git", term: "git init & git clone", def: "git init turns the current folder into a brand-new Git repository. git clone instead copies an entire existing repository — history and all — from a URL onto your machine.", example: "git init\ngit clone https://github.com/user/repo.git", Diagram: DiagFlow, dp: { steps: ["init", "or clone", "repo"], colors: [C.sun, C.sky, C.leaf] }, link: "https://git-scm.com/docs/git-clone" },

  // ---------- COMPUTER NETWORKS (EXPANDED COVER-TO-COVER FROM PDF) ----------
  { id: nid(), cat: "Networking", term: "Network & Topology Layout", def: "A Network is a collection of devices connected by physical media links to share data. Topology specifies the layout of devices and cables.", example: "Star, Ring, Bus, Mesh, Tree, Hybrid topologies", Diagram: DiagStarTopology, dp: {}, link: "https://en.wikipedia.org/wiki/Network_topology" },
  { id: nid(), cat: "Networking", term: "Star Topology", def: "All nodes connect to a single central device (Hub/Switch). Highly robust against single cable breaks; if the central device fails, the whole network fails.", example: "Used in most home & office networks. Cable break = only 1 node disconnects.", Diagram: DiagStarTopology, dp: {}, link: "https://en.wikipedia.org/wiki/Star_network" },
  { id: nid(), cat: "Networking", term: "Ring Topology", def: "Nodes connect in a single continuous circular loop. Data travels in one direction. If a single node is damaged, the entire network fails.", example: "SONET and SDH optical networks. No central server needed.", Diagram: DiagRingTopology, dp: {}, link: "https://en.wikipedia.org/wiki/Ring_network" },
  { id: nid(), cat: "Networking", term: "Bus Topology", def: "All nodes connect to a single central cable (the bus), which acts as a shared medium. Useful for small networks; bus damage breaks the whole network.", example: "Ethernet 10BASE2 coax networks with terminators at ends.", Diagram: DiagBusTopology, dp: {}, link: "https://en.wikipedia.org/wiki/Bus_network" },
  { id: nid(), cat: "Networking", term: "Mesh Topology (Fully vs Partially Connected)", def: "Nodes connect directly to other nodes. Fully connected mesh has links between every pair (N*(N-1)/2 cables), ensuring max redundancy and no central failure point.", example: "High cabling cost, extremely robust against cable failure.", Diagram: DiagMeshTopology, dp: {}, link: "https://en.wikipedia.org/wiki/Mesh_networking" },
  { id: nid(), cat: "Networking", term: "Tree Topology (Expanded Star)", def: "Combines Star and Bus topologies. Star sub-networks connect to a main bus. Segment damage won't affect others, but main bus failure destroys the whole network.", example: "Ethernet protocol used to expand large multi-floor corporate networks.", Diagram: DiagTreeTopology, dp: {} },
  { id: nid(), cat: "Networking", term: "Hybrid Topology", def: "Combines 2 or more different topologies (e.g. Star + Ring). Offers maximum flexibility to connect distinct network environments.", example: "Connecting a office Star network with a factory Ring network.", Diagram: DiagHybridTopology, dp: {} },
  { id: nid(), cat: "Networking", term: "Network Types by Area (PAN, LAN, HAN, CAN, MAN, WAN, GAN)", def: "Networks categorized by geographical span: PAN (10m personal), LAN (office/school), HAN (home), CAN (campus), MAN (city), WAN (global/internet), GAN (satellites).", example: "Bluetooth = PAN, Home Wi-Fi = HAN, Office = LAN, Internet = WAN", Diagram: DiagNetworkScale, dp: {} },
  { id: nid(), cat: "Networking", term: "VPN & Types (Access, Site-to-Site, Intranet, Extranet)", def: "Virtual Private Network creates a secure encrypted tunnel over the public internet (private WAN). Protects confidentiality, disguises online identity, connects remote branches.", example: "Access VPN for remote workers; Site-to-Site for connecting office branches.", Diagram: DiagVPNTunnel, dp: {}, link: "https://en.wikipedia.org/wiki/Virtual_private_network" },
  { id: nid(), cat: "Networking", term: "IPv4 Addressing & Classes (A, B, C, D, E)", def: "32-bit dynamic address with 4 octets (0-255 each). Categorized into Class A (large), B (medium), C (local/LAN), D (multicast), E (R&D).", example: "Class C: 192.168.1.1. 32 bits total = 4 bytes.", Diagram: DiagIPv4Classes, dp: {}, link: "https://en.wikipedia.org/wiki/IPv4" },
  { id: nid(), cat: "Networking", term: "OSI Reference Model (7 Layers)", def: "ISO 7-layer architecture for open system communication: Physical, DataLink, Network, Transport, Session, Presentation, Application.", example: "Please Do Not Touch Secret Patient Data (Phys -> App)", Diagram: DiagOSIvsTCPIP, dp: {}, link: "https://en.wikipedia.org/wiki/OSI_model" },
  { id: nid(), cat: "Networking", term: "OSI Layer 1: Physical Layer", def: "Transmits unstructured raw bit stream over physical media (twisted pair, fiber optic, wireless) using electrical, optical, or mechanical signals.", example: "Cables, RJ45 connectors, fiber optics, wireless radio frequencies.", Diagram: DiagStack, dp: { layers: [{ label: "Raw Bit Transmission", color: C.leaf }] } },
  { id: nid(), cat: "Networking", term: "OSI Layer 2: Data Link Layer", def: "Transfers frames node-to-node error-free. Handles physical MAC addressing, frame synchronization, flow control, and link management.", example: "Ethernet switches, MAC addresses, framing.", Diagram: DiagHubvsSwitch, dp: {} },
  { id: nid(), cat: "Networking", term: "OSI Layer 3: Network Layer", def: "Translates logical (IP) to physical address, performs packetizing, fragmentation, internetworking, and determines best route (Routing).", example: "IP Protocol, Routers, ICMP, packet routing.", Diagram: DiagGatewayvsRouter, dp: {} },
  { id: nid(), cat: "Networking", term: "OSI Layer 4: Transport Layer", def: "Delivers messages end-to-end with error checking. Offers Connection-oriented (TCP with ACK) and Connectionless (UDP without ACK) transmission.", example: "TCP (reliable) vs UDP (fast streaming).", Diagram: DiagCompare, dp: { left: "TCP (ACK)", right: "UDP (No ACK)", colorL: C.sky, colorR: C.coral } },
  { id: nid(), cat: "Networking", term: "OSI Layer 5, 6, 7: Session, Presentation, Application", def: "Session manages user sessions. Presentation handles character translation, compression, encryption. Application provides network access to users.", example: "HTTP, HTTPS, SMTP, FTP, DNS on Application layer.", Diagram: DiagStack, dp: { layers: [{ label: "Application (HTTP/DNS)", color: C.coral }, { label: "Presentation (Encrypt)", color: C.pink }, { label: "Session (Sync)", color: C.grape }] } },
  { id: nid(), cat: "Networking", term: "TCP/IP Model (4 Layers)", def: "DoD compressed 4-layer model: Link Layer, Internet Layer (IP, ICMP), Transport Layer (TCP, UDP), Application Layer (HTTP, SMTP, DNS).", example: "De-facto protocol suite powering the global Internet.", Diagram: DiagOSIvsTCPIP, dp: {} },
  { id: nid(), cat: "Networking", term: "HTTP vs. HTTPS", def: "HTTP (port 80) transmits unencrypted plain text. HTTPS (port 443) adds SSL/TLS protocol layer to encrypt data and authenticate servers securely.", example: "HTTP: port 80 (insecure) | HTTPS: port 443 (SSL/TLS encrypted)", Diagram: DiagHTTPvsHTTPS, dp: {}, link: "https://en.wikipedia.org/wiki/HTTPS" },
  { id: nid(), cat: "Networking", term: "DNS & Working of DNS", def: "Domain Name System maps human-readable domain names (google.com) to machine IP addresses (142.250.x.x) over UDP port 53.", example: "Browser cache -> OS lookup -> DNS server query -> IP returned", Diagram: DiagDNSFlow, dp: {}, link: "https://en.wikipedia.org/wiki/Domain_Name_System" },
  { id: nid(), cat: "Networking", term: "DNS Forwarder", def: "A DNS server configured to forward queries it cannot resolve directly to external upstream DNS servers for resolution.", example: "Local router forwarding unresolved DNS requests to 8.8.8.8", Diagram: DiagDNSFlow, dp: {} },
  { id: nid(), cat: "Networking", term: "SMTP & POP3 Mail Protocols", def: "SMTP (port 25) sends emails server-to-server (End-to-End & Store-Forward). POP3 accesses mail on client machine in Delete or Keep mode.", example: "Sending email = SMTP | Fetching email to client = POP3", Diagram: DiagFlow, dp: { steps: ["Client", "SMTP (25)", "Server", "POP3"], colors: [C.sky, C.sun, C.grape, C.mint] } },
  { id: nid(), cat: "Networking", term: "TCP vs. UDP", def: "TCP is connection-oriented, reliable, orders packets, and performs flow control. UDP is connectionless, lightweight, fast, with basic checksum error check.", example: "Web/Email = TCP | Video Streaming/Gaming = UDP", Diagram: DiagCompare, dp: { left: "TCP (Reliable)", right: "UDP (Fast)", colorL: C.sky, colorR: C.coral } },
  { id: nid(), cat: "Networking", term: "TCP 3-Way Handshake", def: "Establishes a reliable connection before data transfer: 1. SYN (Client) -> 2. SYN-ACK (Server) -> 3. ACK (Client).", example: "SYN -> SYN-ACK -> ACK", Diagram: DiagHandshake, dp: {} },
  { id: nid(), cat: "Networking", term: "DHCP (Port 67) & DORA Process", def: "Dynamic Host Configuration Protocol auto-assigns IP address, subnet mask, default gateway, and DNS to network devices via DORA (Discover, Offer, Request, ACK).", example: "Connecting phone to Wi-Fi -> automatically gets IP 192.168.1.15", Diagram: DiagDHCPDORA, dp: {} },
  { id: nid(), cat: "Networking", term: "FTP (File Transfer Protocol)", def: "Application layer protocol used to transfer files reliably between client and server. Uses port 21 for control commands and port 20 for data transfer.", example: "Uploading website files to a remote server.", Diagram: DiagFunctionBox, dp: { inLabel: "file", outLabel: "server", label: "FTP (21/20)" } },
  { id: nid(), cat: "Networking", term: "ICMP (Internet Control Message Protocol)", def: "Network layer protocol (port 7) used by routers and hosts for error handling, network diagnostics, and ping connectivity testing.", example: "`ping 8.8.8.8` sends ICMP Echo Request packets.", Diagram: DiagPlug, dp: { color: C.coral, label: "ICMP Ping / Echo" } },
  { id: nid(), cat: "Networking", term: "ARP (Address Resolution Protocol)", def: "Network protocol that converts logical IP addresses into physical MAC addresses for local network communication.", example: "Broadcasts: 'Who has 192.168.1.1?' -> Target returns MAC 00:1A:2B:3C...", Diagram: DiagARPRolodex, dp: {} },
  { id: nid(), cat: "Networking", term: "RIP (Routing Information Protocol)", def: "Dynamic distance-vector routing protocol used by routers to find the best route from source to destination based on Hop Count algorithm.", example: "Selects route with smallest number of router hops.", Diagram: DiagFlow, dp: { steps: ["Router A", "Hop 1", "Hop 2", "Dest"], colors: [C.sky, C.sun, C.leaf, C.grape] } },
  { id: nid(), cat: "Networking", term: "MAC Address vs. IP Address", def: "MAC address (48-bit) is a permanent physical hardware address burned into the NIC by manufacturer. IP address (32-bit) is a logical network address assigned by ISP.", example: "MAC = NIC hardware ID | IP = Network location", Diagram: DiagCompare, dp: { left: "MAC (Hardware)", right: "IP (Logical)", colorL: C.leaf, colorR: C.sky } },
  { id: nid(), cat: "Networking", term: "CLI Commands: ipconfig, ifconfig, netstat, ping", def: "ipconfig (Windows) & ifconfig (Mac/Linux) view/configure network interfaces. netstat displays active TCP/IP connections. ping tests host reachability.", example: "`ipconfig /all` | `ifconfig` | `netstat -a` | `ping google.com`", Diagram: DiagFunctionBox, dp: { inLabel: "command", outLabel: "net state", label: "CLI" } },
  { id: nid(), cat: "Networking", term: "Hub vs. Switch", def: "Hub operates on Layer 1 (Physical) and broadcasts incoming signals to ALL ports (half-duplex). Switch operates on Layer 2 (Data Link), uses MAC table to filter and direct frames (full-duplex).", example: "Hub = dumb splitter | Switch = intelligent bridge", Diagram: DiagHubvsSwitch, dp: {} },
  { id: nid(), cat: "Networking", term: "Subnetting", def: "Subnetting divides a larger network into smaller subnets to enhance routing efficiency, reduce traffic congestion, and improve security.", example: "Splitting 192.168.1.0/24 into two subnets (/25).", Diagram: DiagNormalize, dp: {} },
  { id: nid(), cat: "Networking", term: "Gateway vs. Router", def: "Both regulate network traffic. A Router forwards data between TWO SIMILAR networks (e.g. IP to IP), while a Gateway connects TWO DISSIMILAR networks with different protocols.", example: "Router = LAN to LAN | Gateway = IP network to non-IP protocol", Diagram: DiagGatewayvsRouter, dp: {} },
  { id: nid(), cat: "Networking", term: "Firewall & Security", def: "Network security system monitoring incoming and outgoing traffic, blocking unauthorized access based on predefined security rules.", example: "Hardware appliance or software blocking open vulnerable ports.", Diagram: DiagFirewall, dp: {} },
  { id: nid(), cat: "Networking", term: "Private vs. Public IP Address", def: "Private IPs (10.x, 172.16-31.x, 192.168.x) are reserved for internal local networks and non-routable on the internet. Public IPs are globally unique and provided by ISP.", example: "Internal PC = 192.168.1.10 (Private) -> Router NAT -> 49.37.x.x (Public)", Diagram: DiagCompare, dp: { left: "Private (LAN)", right: "Public (ISP)", colorL: C.sun, colorR: C.docker } },
  { id: nid(), cat: "Networking", term: "RAID (Redundant Array of Independent Disks)", def: "Combines multiple physical hard drives into a single logical unit to provide fault tolerance and data redundancy.", example: "RAID 1 (mirroring) ensures system runs even if 1 disk dies.", Diagram: DiagContainers, dp: { withGuestOS: false, count: 3 } },
  { id: nid(), cat: "Networking", term: "Cast Types (Unicast, Anycast, Multicast, Broadcast)", def: "Transmission modes: Unicast (1 to 1), Anycast (1 to nearest CDN node), Multicast (1 to specific subset), Broadcast (1 to ALL nodes in network).", example: "ARP/DHCP = Broadcast | Web browser = Unicast | CDN = Anycast", Diagram: DiagCastTypes, dp: {} },
  { id: nid(), cat: "Networking", term: "What happens when you enter google.com in browser?", def: "Step-by-step: 1. Check browser/OS cache -> 2. DNS lookup over UDP -> 3. TCP 3-way handshake -> 4. Send HTTP/HTTPS request -> 5. Web server responds -> 6. Browser decodes & renders page.", example: "Cache -> DNS -> TCP Handshake -> HTTP Request -> Render", Diagram: DiagGoogleFlow, dp: {}, link: "https://en.wikipedia.org/wiki/Web_browser" },

  // ---------- OS ----------
  { id: nid(), cat: "OS", term: "Process vs. thread", def: "A process is an independent running program with its own memory. A thread is a lighter unit of execution inside a process that shares memory with sibling threads.", example: "Browser tabs = separate processes. Workers inside 1 tab = threads.", Diagram: DiagCompare, dp: { left: "Process", right: "Thread", colorL: C.sky, colorR: C.grape }, link: "https://en.wikipedia.org/wiki/Thread_(computing)" },

  // ---------- Data Structures ----------
  { id: nid(), cat: "Data Structures", term: "Arrays vs. linked lists", def: "Arrays store items contiguously for O(1) index access but O(n) middle inserts. Linked lists trade that for O(1) inserts once you hold a pointer to the spot.", example: "Need random access → array. Frequent inserts/removes → linked list.", Diagram: DiagCompare, dp: { left: "Array", right: "Linked List", colorL: C.sky, colorR: C.coral } },

  // ---------- Algorithms ----------
  { id: nid(), cat: "Algorithms", term: "Two pointers", def: "Move two indices through a structure — often from opposite ends — to avoid nested loops when data is sorted or has a known shape.", example: "let l = 0, r = arr.length - 1;\nwhile (l < r) {\n  const sum = arr[l] + arr[r];\n  if (sum === target) return [l, r];\n  sum < target ? l++ : r--;\n}", Diagram: DiagPointers, dp: {} },

  // ---------- OOP ----------
  { id: nid(), cat: "OOP", term: "Encapsulation", def: "Bundles data together with the methods that operate on it, and hides the internal state behind a controlled, public interface.", example: "class Account { #balance=0; deposit(n){ this.#balance+=n; } }", Diagram: DiagCapsule, dp: {} },

  // ---------- React ----------
  { id: nid(), cat: "React", term: "useState vs. useReducer", def: "useState is simplest for independent values. useReducer shines once you have several related state fields or many action types touching the same state.", example: "const [count, setCount] = useState(0);", Diagram: DiagCompare, dp: { left: "useState", right: "useReducer", colorL: C.sky, colorR: C.grape } },

  // ---------- SQL ----------
  { id: nid(), cat: "SQL", term: "INNER JOIN vs LEFT JOIN", def: "INNER JOIN returns only matching rows in both tables. LEFT JOIN returns all rows from the left table, filling NULLs for missing right matches.", example: "SELECT * FROM a LEFT JOIN b ON a.id = b.a_id;", Diagram: DiagVenn, dp: { mode: "left", color: C.sky } },

  // ---------- Docker ----------
  { id: nid(), cat: "Docker", term: "Images vs. containers", def: "An image is a read-only blueprint (like a class); a container is a running instance of that image (like an object).", example: "docker run nginx", Diagram: DiagCompare, dp: { left: "Image", right: "Container", colorL: C.sun, colorR: C.docker } }
];

const CATEGORIES = ["All", ...CATEGORY_NAMES];

/* ======================================================================
   NEW INTERACTIVE VISUAL NETWORK LAB
   ====================================================================== */

function NetworkVisualLab() {
  const [selectedTop, setSelectedTop] = useState("Star");
  const [failedNode, setFailedNode] = useState(null);
  const [packetStep, setPacketStep] = useState(0);

  const topologies = [
    { name: "Star", desc: "Nodes connect to central switch. Robust against single node cable cuts, but central switch failure downs network.", color: C.sun },
    { name: "Ring", desc: "Nodes connect in a circle. Single cut breaks whole ring flow.", color: C.grape },
    { name: "Bus", desc: "Single backbone cable. Backbone break cuts entire network.", color: C.amber },
    { name: "Mesh", desc: "Direct links between every node N(N-1)/2 direct links. Max fault tolerance.", color: C.coral }
  ];

  return (
    <div className="p-5 md:p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Network size={28} style={{ color: C.amber }} />
        <h1 className="font-display text-2xl font-extrabold" style={{ color: INK }}>Interactive Visual Network Lab</h1>
      </div>
      <p className="font-code text-[13px] mb-6" style={{ color: C.textMuted }}>
        // Visual thinker interactive sandbox — toggle topology modes, simulate node failures & trace packets in real-time
      </p>

      {/* Mode Selector */}
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

      {/* Interactive Visualizer Canvas */}
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

        {/* Live Dynamic SVG Diagram Canvas */}
        <div className="w-full h-64 bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center p-4">
          <svg viewBox="0 0 400 220" className="w-full h-full">
            {selectedTop === "Star" && (
              <g>
                {/* Central Switch */}
                <rect x="180" y="90" width="40" height="40" rx="8" fill={failedNode === "central" ? C.coral : C.amber} stroke="#fff" strokeWidth="2.5" />
                <text x="200" y="114" fontSize="10" fontWeight="900" fill="#fff" textAnchor="middle">HUB</text>
                {/* Outer Nodes */}
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
  { label: "Topics mastered", value: "48", total: "/ 120", icon: BookOpen, color: C.sun },
  { label: "Problems solved", value: "95", total: "total", icon: Code2, color: C.mint },
  { label: "Avg assessment score", value: "84", total: "%", icon: ClipboardCheck, color: C.sky },
  { label: "Current streak", value: "12", total: "days", icon: Flame, color: C.coral },
];

const PROGRESS = [
  { name: "Computer Networks: Topologies & OSI", pct: 90, color: C.amber },
  { name: "Networking: TCP/UDP & Protocols", pct: 85, color: C.sun },
  { name: "Arrays & Strings", pct: 80, color: C.mint },
  { name: "Git & Version Control", pct: 75, color: C.rust },
  { name: "SQL & Databases", pct: 70, color: C.leaf },
  { name: "React: Hooks & State", pct: 65, color: C.cyan },
  { name: "OS: Threads & Scheduling", pct: 50, color: C.mint },
  { name: "Docker & DevOps", pct: 40, color: C.docker },
];

const SCHEDULE = [
  { title: "Visual Lab — Topologies & Packet Flows", when: "Today", date: "Aug 10", color: C.amber },
  { title: "Mock Interview — Computer Networks", when: "Tomorrow", date: "Aug 11", color: C.sky },
  { title: "OA practice — Arrays & Strings", when: "in 2 days", date: "Aug 12", color: C.mint },
  { title: "Assessment review — TCP/IP & VPN", when: "in 4 days", date: "Aug 14", color: C.coral },
];

const RECOMMENDED = [
  { title: "Computer Networks: Star vs Mesh", tag: "Networking", desc: "Visual comparison of star topology hubs vs mesh redundancy cables." },
  { title: "OSI 7 Layers vs TCP/IP 4 Layers", tag: "Networking", desc: "Understand how Physical-to-App maps directly to Link-Internet-Transport-App." },
  { title: "DNS resolution & DORA flow", tag: "Networking", desc: "Trace what happens when typing google.com and how DHCP assigns IP addresses." },
  { title: "Hub vs. Switch (Layer 1 vs Layer 2)", tag: "Networking", desc: "Why switches filter packets with MAC address tables while hubs broadcast." },
];

function Dashboard({ goTo }) {
  return (
    <div className="p-5 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <Mascot size={56} />
        <div>
          <h1 className="font-display text-2xl font-extrabold" style={{ color: INK }}>Good day, Visual Thinker!</h1>
          <p className="font-code text-[13px] mt-1" style={{ color: C.textMuted }}>
            // Computer Networks curriculum loaded — 12-day streak, diagrams ready
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
        <SectionLabel icon={Sparkles}>Recommended next (Computer Networks Spotlight)</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <p className="font-code text-[10.5px] mt-1" style={{ color: C.textMuted }}>tap to flip for details &rarr;</p>
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
        // {filtered.length} of {CONCEPTS.length} topics — interactive visual diagrams on every card
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl flex-1 sticker-sm" style={{ backgroundColor: C.card, border: `2.5px solid ${INK}` }}>
          <Search size={15} style={{ color: C.textMuted }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: OSI, TCP, UDP, Star, Mesh, VPN, DNS, Hub, Switch..."
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
          <p className="text-[13px] font-ui" style={{ color: C.textMuted }}>No concepts match "{query}". Try searching for 'OSI', 'Star', or 'TCP'.</p>
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
        // code runs entirely in your browser — nothing is sent to a server, no keys involved
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
   ASSESSMENT MODE (UPDATED WITH COMPUTER NETWORKS QUESTIONS FROM PDF)
   ====================================================================== */

const QUESTIONS = [
  { q: "In Star topology, what happens if the central device (Hub/Switch) fails?", options: ["Only 1 node disconnects", "The entire network fails", "Nodes auto-switch to Ring mode", "No effect"], correct: 1, explain: "Star topology relies entirely on the central hub/switch. If the central device fails, communication between all connected nodes collapses." },
  { q: "How many layers are in the standard OSI Reference Model?", options: ["4", "5", "7", "9"], correct: 2, explain: "The OSI model consists of 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application." },
  { q: "Which Layer 2 device uses a MAC address table to direct frames to specific ports?", options: ["Hub", "Switch", "Repeater", "Modem"], correct: 1, explain: "A Switch operates at Layer 2 (Data Link) and filters/directs network frames to target ports using MAC addresses, unlike a Hub which broadcasts." },
  { q: "What default port is used by HTTPS for secure encrypted communication?", options: ["Port 80", "Port 21", "Port 443", "Port 25"], correct: 2, explain: "HTTP uses port 80 by default, while HTTPS uses port 443 with SSL/TLS encryption." },
  { q: "Which IPv4 address class range is 192.0.0.0 to 223.255.255.255?", options: ["Class A", "Class B", "Class C", "Class D"], correct: 2, explain: "Class C IPv4 addresses start with octets 192 to 223 and are commonly used for local area networks." },
  { q: "What protocol automatically assigns IP addresses, subnet masks, and gateways via DORA?", options: ["DNS", "DHCP", "ARP", "ICMP"], correct: 1, explain: "DHCP (Dynamic Host Configuration Protocol) automatically auto-configures IP settings on client devices." },
  { q: "What is the primary function of Address Resolution Protocol (ARP)?", options: ["Encrypt web traffic", "Convert logical IP addresses to physical MAC addresses", "Route packets between cities", "Assign domain names"], correct: 1, explain: "ARP maps a device's 32-bit IP address to its physical 48-bit MAC address on local networks." },
  { q: "Which transport layer protocol is connection-oriented and guarantees packet delivery?", options: ["UDP", "TCP", "IP", "ICMP"], correct: 1, explain: "TCP provides reliable, connection-oriented data transfer with sequence numbers and ACKs, whereas UDP is connectionless." },
  { q: "What command in Mac/Linux is used to view and configure network interfaces?", options: ["ipconfig", "ifconfig", "netstat", "ping"], correct: 1, explain: "`ifconfig` is used in Mac/Unix/Linux systems, while `ipconfig` is used in Microsoft Windows." },
  { q: "Which network device connects TWO DISSIMILAR networks with different protocols?", options: ["Switch", "Router", "Gateway", "Hub"], correct: 2, explain: "A Router sends data between similar networks, whereas a Gateway converts and routes traffic between dissimilar networks." },
  { q: "What does `git stash` do?", options: ["Deletes uncommitted changes permanently", "Shelves uncommitted changes so you can switch branches cleanly", "Creates a new branch", "Undoes the last commit"], correct: 1, explain: "git stash saves modified and staged changes off to the side, restoring a clean working directory until you pop them back." },
  { q: "Which ACID guarantee ensures a transaction either completes fully or leaves the database untouched?", options: ["Atomicity", "Consistency", "Isolation", "Durability"], correct: 0, explain: "Atomicity ensures all statements in a transaction are executed as a single all-or-nothing unit." }
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
        <p className="font-code text-[13px] mb-6" style={{ color: C.textMuted }}>// quiz.test.js — updated with Computer Networks module</p>
        <div className="rounded-3xl p-6 sticker" style={{ backgroundColor: C.card, border: `3px solid ${INK}` }}>
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck size={18} style={{ color: C.sky }} />
            <p className="text-[15px] font-ui font-bold" style={{ color: INK }}>Timed knowledge check</p>
          </div>
          <ul className="text-[13px] leading-relaxed font-ui" style={{ color: C.textMuted }}>
            <li>&bull; {QUESTIONS.length} multiple-choice questions covering Computer Networks, Git, SQL, and CS Core</li>
            <li>&bull; {Math.floor(QUIZ_SECONDS / 60)} minutes on the clock for the full set</li>
            <li>&bull; Instant scoring & detailed visual explanations after you submit</li>
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
