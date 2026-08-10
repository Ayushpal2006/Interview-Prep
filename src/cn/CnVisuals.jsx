import React, { useState } from "react";
import { Network, Globe, ShieldCheck, ArrowRight, ArrowDown, Cpu, Box, Layers } from "lucide-react";
import { GOOGLE_REQUEST_STEPS, COMPARISONS } from "./cnData";

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
   1. EMPHASIZED SPOTLIGHT: "WHAT HAPPENS WHEN YOU ENTER GOOGLE.COM?"
   ====================================================================== */

export function GoogleRequestFlowDiagram() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="rounded-3xl p-6 sticker mb-8 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white" style={{ border: `3.5px solid ${INK}` }}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-white/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full text-xs font-bold font-code bg-white text-amber-900 border border-amber-900">
              #1 High-Frequency Interview Question
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold font-code bg-red-900 text-white border border-white/40">
              10-Step Interactive Pipeline
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-black">
            "What happens when you enter google.com?"
          </h2>
        </div>
        <p className="text-xs font-ui text-white/90 max-w-sm">
          Interactive end-to-end trace from browser keystroke to rendered webpage.
        </p>
      </div>

      {/* PIPELINE STEP INDICATOR CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {GOOGLE_REQUEST_STEPS.map((s, idx) => (
          <button
            key={s.step}
            onClick={() => setActiveStep(idx)}
            className={`p-2.5 rounded-2xl text-left transition-all sticker-sm flex flex-col justify-between ${
              activeStep === idx
                ? "bg-white text-slate-900 ring-4 ring-amber-200 scale-105"
                : "bg-black/20 text-white hover:bg-black/30 border border-white/20"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-code font-bold opacity-80">Step {s.step}</span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-400 text-slate-900">
                {s.badge}
              </span>
            </div>
            <p className="font-display text-xs font-black leading-tight truncate">{s.short}</p>
          </button>
        ))}
      </div>

      {/* ACTIVE STEP DETAILED DISPLAY CARD */}
      {(() => {
        const step = GOOGLE_REQUEST_STEPS[activeStep];
        return (
          <div className="p-5 rounded-2xl bg-white text-slate-900 sticker-sm" style={{ border: `3px solid ${INK}` }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-white font-display font-extrabold flex items-center justify-center text-sm border-2 border-slate-900">
                  {step.step}
                </span>
                <div>
                  <h3 className="font-display text-lg font-black text-slate-900">{step.title}</h3>
                  <span className="text-xs font-code font-bold text-amber-700">OSI/Protocol Layer: {step.layer}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 border border-slate-900 disabled:opacity-40"
                >
                  &larr; Prev
                </button>
                <button
                  disabled={activeStep === GOOGLE_REQUEST_STEPS.length - 1}
                  onClick={() => setActiveStep((prev) => Math.min(GOOGLE_REQUEST_STEPS.length - 1, prev + 1))}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-500 text-white hover:bg-amber-600 border border-slate-900 disabled:opacity-40"
                >
                  Next &rarr;
                </button>
              </div>
            </div>

            <p className="text-xs font-ui text-gray-800 leading-relaxed mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200">
              {step.desc}
            </p>

            <div className="p-3 rounded-xl bg-slate-900 text-amber-300 font-code text-xs">
              <p className="font-bold text-emerald-400 mb-1">// Interview Speakable Summary (Step {step.step}):</p>
              <p className="text-slate-200">
                "{step.title}: {step.desc}"
              </p>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

/* ======================================================================
   2. OSI 7-LAYER STACK VS TCP/IP 4-LAYER STACK VISUAL
   ====================================================================== */

export function OSITCPIPVisuals() {
  return (
    <div className="rounded-3xl p-5 sticker mb-8" style={{ backgroundColor: C.card, border: `3.5px solid ${INK}` }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold font-code" style={{ backgroundColor: C.sky, color: "#fff", border: `2px solid ${INK}` }}>Layer Architecture</span>
        <h3 className="font-display text-xl font-extrabold" style={{ color: INK }}>OSI 7-LAYER STACK VS. TCP/IP 4-LAYER STACK</h3>
      </div>
      <p className="text-xs font-ui text-gray-600 mb-6">
        Visual mapping of the ISO theoretical 7-layer OSI reference model against the DoD practical 4-layer TCP/IP internet model.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* OSI 7 LAYERS */}
        <div className="p-4 rounded-2xl bg-slate-50" style={{ border: `2.5px solid ${INK}` }}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-display text-sm font-black text-sky-800">OSI Reference Model (7 Layers)</h4>
            <span className="text-[10px] font-code bg-sky-200 text-sky-900 px-2 py-0.5 rounded font-bold">ISO Standard</span>
          </div>

          <div className="space-y-1.5 font-code text-xs">
            {[
              { num: 7, name: "7. Application Layer", desc: "User network access (HTTP, HTTPS, FTP, DNS)", color: "#FF8FB1" },
              { num: 6, name: "6. Presentation Layer", desc: "Translation, Compression, SSL Encryption", color: "#FF8FB1" },
              { num: 5, name: "5. Session Layer", desc: "Establishes, maintains & ends sessions", color: "#FF8FB1" },
              { num: 4, name: "4. Transport Layer", desc: "End-to-end segmentation (TCP, UDP)", color: "#9B5DE5" },
              { num: 3, name: "3. Network Layer", desc: "Logical IP addressing & routing (IP, ICMP)", color: "#38C6D9" },
              { num: 2, name: "2. Data Link Layer", desc: "Framing & MAC physical address delivery", color: "#6BCB77" },
              { num: 1, name: "1. Physical Layer", desc: "Raw bit stream transmission over cable", color: "#FFA94D" },
            ].map((layer) => (
              <div
                key={layer.num}
                className="p-2.5 rounded-xl border border-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1"
                style={{ backgroundColor: layer.color, color: INK }}
              >
                <span className="font-extrabold">{layer.name}</span>
                <span className="text-[10.5px] font-ui opacity-90">{layer.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TCP/IP 4 LAYERS */}
        <div className="p-4 rounded-2xl bg-slate-50 flex flex-col justify-between" style={{ border: `2.5px solid ${INK}` }}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-display text-sm font-black text-purple-800">TCP/IP Model (4 Layers)</h4>
              <span className="text-[10px] font-code bg-purple-200 text-purple-900 px-2 py-0.5 rounded font-bold">DoD Standard (1970s)</span>
            </div>

            <div className="space-y-3 font-code text-xs">
              {[
                { num: 4, name: "4. Application Layer", maps: "Maps to OSI Layers 7, 6, 5 (HTTP, SMTP, DNS)", color: "#FF8FB1" },
                { num: 3, name: "3. Transport Layer", maps: "Maps to OSI Layer 4 (TCP, UDP)", color: "#9B5DE5" },
                { num: 2, name: "2. Internet Layer", maps: "Maps to OSI Layer 3 (IP, ICMP)", color: "#38C6D9" },
                { num: 1, name: "1. Link Layer", maps: "Maps to OSI Layers 2, 1 (Ethernet, Sonet)", color: "#6BCB77" },
              ].map((layer) => (
                <div
                  key={layer.num}
                  className="p-3.5 rounded-xl border border-slate-900 flex flex-col justify-between"
                  style={{ backgroundColor: layer.color, color: INK }}
                >
                  <span className="font-extrabold text-sm">{layer.name}</span>
                  <span className="text-[11px] font-ui mt-1 opacity-90">{layer.maps}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] font-ui text-gray-600 bg-purple-50 p-2.5 rounded-xl border border-purple-300 mt-3">
            <strong>Key Difference:</strong> TCP/IP compresses OSI's top 3 layers into Application, and bottom 2 layers into Link.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   3. SIDE-BY-SIDE COMPARISON MATRICES
   ====================================================================== */

export function ComparisonMatrixSection() {
  const [activeComp, setActiveComp] = useState(0);

  return (
    <div className="rounded-3xl p-5 sticker mb-8" style={{ backgroundColor: C.card, border: `3.5px solid ${INK}` }}>
      <div className="flex items-center gap-2 mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold font-code" style={{ backgroundColor: C.mint, color: INK, border: `2px solid ${INK}` }}>Comparison Matrix</span>
        <h3 className="font-display text-xl font-extrabold" style={{ color: INK }}>NETWORKING SIDE-BY-SIDE COMPARISONS</h3>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap gap-2 mb-4">
        {COMPARISONS.map((comp, idx) => (
          <button
            key={idx}
            onClick={() => setActiveComp(idx)}
            className="px-3.5 py-1.5 rounded-full font-display text-xs font-bold transition-all sticker-sm"
            style={{
              backgroundColor: activeComp === idx ? C.sun : "#fff",
              color: INK,
              border: `2px solid ${INK}`,
            }}
          >
            {comp.title}
          </button>
        ))}
      </div>

      {/* ACTIVE TABLE */}
      {(() => {
        const comp = COMPARISONS[activeComp];
        return (
          <div className="overflow-x-auto rounded-2xl" style={{ border: `2.5px solid ${INK}` }}>
            <table className="w-full text-left text-xs font-ui border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-900" style={{ backgroundColor: C.paper }}>
                  <th className="p-3 font-display font-extrabold text-gray-700 w-1/4">Aspect</th>
                  <th className="p-3 font-display font-extrabold text-white w-3/8" style={{ backgroundColor: comp.colorL }}>
                    {comp.leftName}
                  </th>
                  <th className="p-3 font-display font-extrabold text-white w-3/8" style={{ backgroundColor: comp.colorR }}>
                    {comp.rightName}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comp.rows.map((row, i) => (
                  <tr key={i} className={`border-b border-slate-200 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                    <td className="p-3 font-bold text-gray-800">{row.aspect}</td>
                    <td className="p-3 text-gray-700 font-medium">{row.left}</td>
                    <td className="p-3 text-gray-700 font-medium">{row.right}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })()}
    </div>
  );
}

/* ======================================================================
   4. NETWORK TOPOLOGIES SVG VISUALIZER
   ====================================================================== */

export function TopologiesVisualizer() {
  return (
    <div className="rounded-3xl p-5 sticker mb-8" style={{ backgroundColor: C.card, border: `3.5px solid ${INK}` }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold font-code" style={{ backgroundColor: C.amber, color: INK, border: `2px solid ${INK}` }}>Geometric Layouts</span>
        <h3 className="font-display text-xl font-extrabold" style={{ color: INK }}>THE 6 NETWORK TOPOLOGIES</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {/* Star */}
        <div className="p-4 rounded-2xl bg-slate-50 flex flex-col justify-between text-center" style={{ border: `2px solid ${INK}` }}>
          <span className="font-display text-sm font-extrabold text-amber-800">1. Star Topology</span>
          <svg viewBox="0 0 100 75" className="w-full h-20 my-1">
            <circle cx="50" cy="37" r="10" fill={C.sun} stroke={INK} strokeWidth="2" />
            <text x="50" y="41" fontSize="8" fontWeight="bold" fill={INK} textAnchor="middle">Hub</text>
            {[[20, 15], [80, 15], [20, 60], [80, 60]].map(([x, y], i) => (
              <g key={i}>
                <line x1="50" y1="37" x2={x} y2={y} stroke={INK} strokeWidth="1.5" />
                <rect x={x - 8} y={y - 8} width="16" height="16" rx="3" fill={C.sky} stroke={INK} strokeWidth="1.5" />
              </g>
            ))}
          </svg>
          <p className="text-[11px] font-ui text-gray-700">All nodes connect to a central Hub/Switch. Robust cable fault isolation.</p>
        </div>

        {/* Ring */}
        <div className="p-4 rounded-2xl bg-slate-50 flex flex-col justify-between text-center" style={{ border: `2px solid ${INK}` }}>
          <span className="font-display text-sm font-extrabold text-purple-800">2. Ring Topology</span>
          <svg viewBox="0 0 100 75" className="w-full h-20 my-1">
            <circle cx="50" cy="37" r="24" fill="none" stroke={INK} strokeWidth="2" />
            {[[50, 13], [74, 37], [50, 61], [26, 37]].map(([x, y], i) => (
              <rect key={i} x={x - 6} y={y - 6} width="12" height="12" rx="2" fill={C.leaf} stroke={INK} strokeWidth="1.5" />
            ))}
          </svg>
          <p className="text-[11px] font-ui text-gray-700">Nodes connected in a circular loop. Single node break downs whole ring.</p>
        </div>

        {/* Bus */}
        <div className="p-4 rounded-2xl bg-slate-50 flex flex-col justify-between text-center" style={{ border: `2px solid ${INK}` }}>
          <span className="font-display text-sm font-extrabold text-sky-800">3. Bus Topology</span>
          <svg viewBox="0 0 100 75" className="w-full h-20 my-1">
            <line x1="10" y1="37" x2="90" y2="37" stroke={INK} strokeWidth="3" />
            {[25, 50, 75].map((x, i) => (
              <g key={i}>
                <line x1={x} y1="37" x2={x} y2="18" stroke={INK} strokeWidth="1.5" />
                <rect x={x - 7} y="6" width="14" height="12" rx="2" fill={C.coral} stroke={INK} strokeWidth="1.5" />
              </g>
            ))}
          </svg>
          <p className="text-[11px] font-ui text-gray-700">Shared backbone cable. Useful for small setups; backbone break downs network.</p>
        </div>

        {/* Mesh */}
        <div className="p-4 rounded-2xl bg-slate-50 flex flex-col justify-between text-center" style={{ border: `2px solid ${INK}` }}>
          <span className="font-display text-sm font-extrabold text-emerald-800">4. Mesh Topology</span>
          <svg viewBox="0 0 100 75" className="w-full h-20 my-1">
            {[ [20, 20], [80, 20], [80, 60], [20, 60] ].map(([x1, y1], i, pts) =>
              pts.slice(i + 1).map(([x2, y2], j) => (
                <line key={`${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="1" />
              ))
            )}
            {[[20, 20], [80, 20], [80, 60], [20, 60]].map(([x, y], i) => (
              <rect key={i} x={x - 6} y={y - 6} width="12" height="12" rx="2" fill={C.mint} stroke={INK} strokeWidth="1.5" />
            ))}
          </svg>
          <p className="text-[11px] font-ui text-gray-700">Dedicated point-to-point links (N(N-1)/2). Maximum redundancy &amp; cost.</p>
        </div>

        {/* Tree */}
        <div className="p-4 rounded-2xl bg-slate-50 flex flex-col justify-between text-center" style={{ border: `2px solid ${INK}` }}>
          <span className="font-display text-sm font-extrabold text-pink-800">5. Tree Topology</span>
          <svg viewBox="0 0 100 75" className="w-full h-20 my-1">
            <line x1="20" y1="20" x2="80" y2="20" stroke={INK} strokeWidth="2.5" />
            <line x1="35" y1="20" x2="35" y2="40" stroke={INK} strokeWidth="1.5" />
            <circle cx="35" cy="40" r="6" fill={C.sun} stroke={INK} strokeWidth="1.5" />
            <line x1="65" y1="20" x2="65" y2="40" stroke={INK} strokeWidth="1.5" />
            <circle cx="65" cy="40" r="6" fill={C.sun} stroke={INK} strokeWidth="1.5" />
          </svg>
          <p className="text-[11px] font-ui text-gray-700">Star networks connected to a central Bus. Expanded star layout.</p>
        </div>

        {/* Hybrid */}
        <div className="p-4 rounded-2xl bg-slate-50 flex flex-col justify-between text-center" style={{ border: `2px solid ${INK}` }}>
          <span className="font-display text-sm font-extrabold text-amber-800">6. Hybrid Topology</span>
          <svg viewBox="0 0 100 75" className="w-full h-20 my-1">
            <circle cx="30" cy="37" r="14" fill="none" stroke={INK} strokeWidth="1.5" />
            <rect x="70" y="27" width="16" height="20" rx="3" fill={C.cyan} stroke={INK} strokeWidth="1.5" />
            <line x1="44" y1="37" x2="70" y2="37" stroke={INK} strokeWidth="2" />
          </svg>
          <p className="text-[11px] font-ui text-gray-700">Combination of two or more distinct topology types in one system.</p>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   5. CASTING TRANSMISSION MODES VISUAL
   ====================================================================== */

export function CastingVisualizer() {
  return (
    <div className="rounded-3xl p-5 sticker mb-8" style={{ backgroundColor: C.card, border: `3.5px solid ${INK}` }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold font-code" style={{ backgroundColor: C.grape, color: "#fff", border: `2px solid ${INK}` }}>Transmission Modes</span>
        <h3 className="font-display text-xl font-extrabold" style={{ color: INK }}>UNICAST, ANYCAST, MULTICAST &amp; BROADCAST</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-4 text-xs font-ui">
        <div className="p-3.5 rounded-2xl bg-sky-50" style={{ border: `2px solid ${INK}` }}>
          <span className="font-display font-extrabold text-sky-800">1. Unicast (1-to-1)</span>
          <p className="text-[11px] text-gray-700 mt-1">Message delivered to a single specific destination node.</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-purple-50" style={{ border: `2px solid ${INK}` }}>
          <span className="font-display font-extrabold text-purple-800">2. Anycast (1-to-Nearest)</span>
          <p className="text-[11px] text-gray-700 mt-1">Message delivered to the nearest node in a server group (CDNs).</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-50" style={{ border: `2px solid ${INK}` }}>
          <span className="font-display font-extrabold text-emerald-800">3. Multicast (1-to-Group)</span>
          <p className="text-[11px] text-gray-700 mt-1">Message delivered to a selective subscribed subset of nodes.</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-50" style={{ border: `2px solid ${INK}` }}>
          <span className="font-display font-extrabold text-amber-800">4. Broadcast (1-to-ALL)</span>
          <p className="text-[11px] text-gray-700 mt-1">Message delivered to ALL nodes on the local subnet (ARP, DHCP).</p>
        </div>
      </div>
    </div>
  );
}
