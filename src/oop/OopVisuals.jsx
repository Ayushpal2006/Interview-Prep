import React, { useState } from "react";
import { Layers, GitBranch, ArrowRight, ShieldCheck, Box, Check, Copy } from "lucide-react";
import { FOUR_PILLARS, COMPARISONS } from "./oopData";

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
   1. CLASS -> OBJECT VISUAL DIAGRAM
   ====================================================================== */
export function ClassToObjectDiagram() {
  return (
    <div className="p-4 rounded-2xl my-3 border-2 border-slate-900 bg-slate-50">
      <p className="font-display text-xs font-black text-slate-800 mb-2">VISUAL FLOW: CLASS TO OBJECT INSTANTIATION</p>
      <div className="flex flex-col sm:flex-row items-center justify-around gap-3 text-xs font-ui">
        <div className="p-3 rounded-xl bg-white border-2 border-slate-900 text-center w-full sm:w-2/5">
          <span className="font-display font-extrabold text-purple-700">Class (Blueprint)</span>
          <p className="text-[10.5px] text-gray-600 mt-1 font-code">class student &#123; int id; &#125;</p>
          <span className="inline-block mt-1 text-[9.5px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900">
            0 Memory Occupied
          </span>
        </div>

        <div className="flex flex-col items-center text-purple-700 font-display font-bold text-xs">
          <span>instantiate</span>
          <ArrowRight size={18} className="hidden sm:block" />
          <span className="sm:hidden">&darr;</span>
        </div>

        <div className="p-3 rounded-xl bg-white border-2 border-slate-900 text-center w-full sm:w-2/5">
          <span className="font-display font-extrabold text-emerald-700">Object (Instance)</span>
          <p className="text-[10.5px] text-gray-600 mt-1 font-code">student s1; // Stack</p>
          <span className="inline-block mt-1 text-[9.5px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
            Allocates Memory Space
          </span>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   2. ENCAPSULATION FLOW DIAGRAM
   ====================================================================== */
export function EncapsulationFlowDiagram() {
  return (
    <div className="p-4 rounded-2xl my-3 border-2 border-slate-900 bg-slate-50">
      <p className="font-display text-xs font-black text-slate-800 mb-2">VISUAL FLOW: DATA HIDING &amp; CONTROLLED ACCESS</p>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-ui">
        <div className="p-3 rounded-xl bg-red-100 border-2 border-slate-900 text-center w-full sm:w-1/3">
          <span className="font-display font-extrabold text-red-900">🔒 Private Data</span>
          <p className="text-[10.5px] text-red-800 mt-0.5 font-code">double balance;</p>
          <span className="text-[9.5px] font-bold text-red-700">Direct Access Blocked</span>
        </div>

        <div className="font-display text-xs font-bold text-gray-500">&rarr;</div>

        <div className="p-3 rounded-xl bg-amber-100 border-2 border-slate-900 text-center w-full sm:w-1/3">
          <span className="font-display font-extrabold text-amber-900">🛡️ Getter / Setter</span>
          <p className="text-[10.5px] text-amber-800 mt-0.5 font-code">deposit(amount)</p>
          <span className="text-[9.5px] font-bold text-amber-700">Validation Logic</span>
        </div>

        <div className="font-display text-xs font-bold text-gray-500">&rarr;</div>

        <div className="p-3 rounded-xl bg-emerald-100 border-2 border-slate-900 text-center w-full sm:w-1/3">
          <span className="font-display font-extrabold text-emerald-900">🌐 External Caller</span>
          <p className="text-[10.5px] text-emerald-800 mt-0.5 font-code">acc.deposit(500);</p>
          <span className="text-[9.5px] font-bold text-emerald-700">Controlled Access</span>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   3. ABSTRACTION FLOW DIAGRAM
   ====================================================================== */
export function AbstractionFlowDiagram() {
  return (
    <div className="p-4 rounded-2xl my-3 border-2 border-slate-900 bg-slate-50">
      <p className="font-display text-xs font-black text-slate-800 mb-2">VISUAL FLOW: COMPLEXITY HIDING INTERFACE</p>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-ui">
        <div className="p-3 rounded-xl bg-slate-200 border-2 border-slate-900 text-center w-full sm:w-1/3">
          <span className="font-display font-extrabold text-slate-800">Complex Implementation</span>
          <p className="text-[10px] text-gray-600 mt-0.5">Email SMTP / Socket Protocols</p>
        </div>

        <div className="font-display text-xs font-bold text-purple-700">&rarr;</div>

        <div className="p-3 rounded-xl bg-purple-100 border-2 border-slate-900 text-center w-full sm:w-1/3">
          <span className="font-display font-extrabold text-purple-900">Abstract Interface</span>
          <p className="text-[10px] text-purple-800 font-code mt-0.5">send(msg) = 0;</p>
        </div>

        <div className="font-display text-xs font-bold text-purple-700">&rarr;</div>

        <div className="p-3 rounded-xl bg-sky-100 border-2 border-slate-900 text-center w-full sm:w-1/3">
          <span className="font-display font-extrabold text-sky-900">User / Caller</span>
          <p className="text-[10px] text-sky-800 mt-0.5">Calls simple interface method</p>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   4. VIRTUAL FUNCTION & RUNTIME DISPATCH DIAGRAM
   ====================================================================== */
export function VirtualFunctionDispatchDiagram() {
  return (
    <div className="p-4 rounded-2xl my-3 border-2 border-slate-900 bg-purple-50">
      <p className="font-display text-xs font-black text-purple-900 mb-2">VISUAL FLOW: BASE POINTER RUNTIME DISPATCH</p>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-ui">
        <div className="p-3 rounded-xl bg-white border-2 border-slate-900 text-center w-full sm:w-1/3">
          <span className="font-display font-extrabold text-purple-900">Base Pointer</span>
          <p className="text-[10.5px] font-code text-purple-800 mt-0.5">Base* bptr = &amp;d;</p>
        </div>

        <div className="font-display text-xs font-bold text-purple-700">&rarr; Look up VPTR &rarr;</div>

        <div className="p-3 rounded-xl bg-white border-2 border-slate-900 text-center w-full sm:w-1/3">
          <span className="font-display font-extrabold text-emerald-900">V-TABLE Entry</span>
          <p className="text-[10.5px] font-code text-emerald-800 mt-0.5">Derived::print()</p>
        </div>

        <div className="font-display text-xs font-bold text-purple-700">&rarr;</div>

        <div className="p-3 rounded-xl bg-white border-2 border-slate-900 text-center w-full sm:w-1/3">
          <span className="font-display font-extrabold text-slate-900">Execution Output</span>
          <p className="text-[10.5px] font-code text-slate-800 mt-0.5">"print derived class"</p>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   5. PURE VIRTUAL FUNCTION & ABSTRACT CLASS DIAGRAM
   ====================================================================== */
export function PureVirtualAbstractDiagram() {
  return (
    <div className="p-4 rounded-2xl my-3 border-2 border-slate-900 bg-pink-50">
      <p className="font-display text-xs font-black text-pink-900 mb-2">VISUAL FLOW: ABSTRACT CLASS &amp; PURE VIRTUAL CONTRACT</p>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-ui">
        <div className="p-3 rounded-xl bg-white border-2 border-slate-900 text-center w-full sm:w-1/3">
          <span className="font-display font-extrabold text-pink-900">Abstract Base Class</span>
          <p className="text-[10.5px] font-code text-pink-800 mt-0.5">virtual void draw() = 0;</p>
          <span className="text-[9px] font-bold text-red-600">Cannot Instantiate (`Shape s;` ❌)</span>
        </div>

        <div className="font-display text-xs font-bold text-pink-700">&rarr; Mandatory Override &rarr;</div>

        <div className="p-3 rounded-xl bg-white border-2 border-slate-900 text-center w-full sm:w-1/3">
          <span className="font-display font-extrabold text-emerald-900">Concrete Derived Class</span>
          <p className="text-[10.5px] font-code text-emerald-800 mt-0.5">void draw() override &#123; ... &#125;</p>
          <span className="text-[9px] font-bold text-emerald-600">Instantiable (`Rectangle r;` ✅)</span>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   6. CONSTRUCTOR LIFETIME DIAGRAM
   ====================================================================== */
export function ConstructorFlowDiagram() {
  return (
    <div className="p-4 rounded-2xl my-3 border-2 border-slate-900 bg-cyan-50">
      <p className="font-display text-xs font-black text-cyan-900 mb-2">VISUAL FLOW: OBJECT INITIALIZATION STAGES</p>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-ui">
        <div className="p-2.5 rounded-xl bg-white border-2 border-slate-900 text-center w-full sm:w-1/3">
          <span className="font-display font-extrabold text-cyan-900">1. Object Creation</span>
          <p className="text-[10px] font-code text-gray-600">go a1(20);</p>
        </div>
        <div className="font-display text-xs font-bold text-cyan-700">&rarr;</div>
        <div className="p-2.5 rounded-xl bg-white border-2 border-slate-900 text-center w-full sm:w-1/3">
          <span className="font-display font-extrabold text-purple-900">2. Constructor Called</span>
          <p className="text-[10px] font-code text-gray-600">go(int a) &#123; x = a; &#125;</p>
        </div>
        <div className="font-display text-xs font-bold text-cyan-700">&rarr;</div>
        <div className="p-2.5 rounded-xl bg-white border-2 border-slate-900 text-center w-full sm:w-1/3">
          <span className="font-display font-extrabold text-emerald-900">3. Initialized Instance</span>
          <p className="text-[10px] font-code text-gray-600">a1.x = 20</p>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   7. DESTRUCTOR LIFETIME DIAGRAM
   ====================================================================== */
export function DestructorLifetimeDiagram() {
  return (
    <div className="p-4 rounded-2xl my-3 border-2 border-slate-900 bg-red-50">
      <p className="font-display text-xs font-black text-red-900 mb-2">VISUAL FLOW: OBJECT DESTRUCTION LIFETIME</p>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-ui">
        <div className="p-2.5 rounded-xl bg-white border-2 border-slate-900 text-center w-full sm:w-1/4">
          <span className="font-display font-extrabold text-slate-800">1. Created</span>
          <p className="text-[10px] font-code text-gray-600">A a;</p>
        </div>
        <div className="font-display text-xs font-bold text-gray-500">&rarr;</div>
        <div className="p-2.5 rounded-xl bg-white border-2 border-slate-900 text-center w-full sm:w-1/4">
          <span className="font-display font-extrabold text-emerald-800">2. Object Scope</span>
          <p className="text-[10px] text-gray-600">Active execution</p>
        </div>
        <div className="font-display text-xs font-bold text-gray-500">&rarr;</div>
        <div className="p-2.5 rounded-xl bg-white border-2 border-slate-900 text-center w-full sm:w-1/4">
          <span className="font-display font-extrabold text-red-800">3. Destructor</span>
          <p className="text-[10px] font-code text-gray-600">~A()</p>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   8. ACCESS SPECIFIERS MATRIX DIAGRAM
   ====================================================================== */
export function AccessSpecifiersDiagram() {
  return (
    <div className="p-4 rounded-2xl my-3 border-2 border-slate-900 bg-slate-50 text-xs font-ui">
      <p className="font-display text-xs font-black text-slate-800 mb-2">VISUAL SCOPE BOUNDARIES</p>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 rounded-xl bg-red-100 border-2 border-slate-900">
          <span className="font-display font-extrabold text-red-900">Private</span>
          <p className="text-[10px] text-red-800 mt-1">Same class ONLY</p>
        </div>
        <div className="p-2.5 rounded-xl bg-amber-100 border-2 border-slate-900">
          <span className="font-display font-extrabold text-amber-900">Protected</span>
          <p className="text-[10px] text-amber-800 mt-1">Same class &amp; Child classes</p>
        </div>
        <div className="p-2.5 rounded-xl bg-emerald-100 border-2 border-slate-900">
          <span className="font-display font-extrabold text-emerald-900">Public</span>
          <p className="text-[10px] text-emerald-800 mt-1">Everywhere in program</p>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   9. THIS POINTER DIAGRAM
   ====================================================================== */
export function ThisPointerDiagram() {
  return (
    <div className="p-4 rounded-2xl my-3 border-2 border-slate-900 bg-sky-50 text-xs font-ui">
      <p className="font-display text-xs font-black text-sky-900 mb-2">VISUAL RELATIONSHIP: `this` POINTER</p>
      <div className="flex flex-col sm:flex-row items-center justify-around gap-3">
        <div className="p-3 rounded-xl bg-white border-2 border-slate-900 text-center w-full sm:w-1/2">
          <span className="font-display font-extrabold text-sky-900">Current Calling Object</span>
          <p className="text-[10.5px] font-code text-gray-600 mt-0.5">node n(100);</p>
        </div>
        <div className="font-display font-bold text-sky-700">&larr; Implicit `this` Address &rarr;</div>
        <div className="p-3 rounded-xl bg-white border-2 border-slate-900 text-center w-full sm:w-1/2">
          <span className="font-display font-extrabold text-purple-900">Member Disambiguation</span>
          <p className="text-[10.5px] font-code text-purple-800 mt-0.5">this-&gt;data = data;</p>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   10. FRIEND FUNCTION DIAGRAM
   ====================================================================== */
export function FriendFunctionDiagram() {
  return (
    <div className="p-4 rounded-2xl my-3 border-2 border-slate-900 bg-amber-50 text-xs font-ui">
      <p className="font-display text-xs font-black text-amber-900 mb-2">VISUAL RELATIONSHIP: FRIEND FUNCTION ACCESS</p>
      <div className="flex flex-col sm:flex-row items-center justify-around gap-3">
        <div className="p-3 rounded-xl bg-white border-2 border-slate-900 text-center w-full sm:w-1/2">
          <span className="font-display font-extrabold text-red-900">Class A (Private Members)</span>
          <p className="text-[10.5px] font-code text-red-800 mt-0.5">private: int a = 2, b = 4;</p>
        </div>
        <div className="font-display font-bold text-amber-700">&larr; Granted Private Access &rarr;</div>
        <div className="p-3 rounded-xl bg-white border-2 border-slate-900 text-center w-full sm:w-1/2">
          <span className="font-display font-extrabold text-amber-900">Friend Non-Member Function</span>
          <p className="text-[10.5px] font-code text-amber-800 mt-0.5">int mul(A k) &#123; return k.a * k.b; &#125;</p>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   11. HAS-A ASSOCIATION DIAGRAM
   ====================================================================== */
export function HasAAssociationDiagram() {
  return (
    <div className="p-4 rounded-2xl my-3 border-2 border-slate-900 bg-slate-50 text-xs font-ui">
      <p className="font-display text-xs font-black text-slate-800 mb-2">IS-A (INHERITANCE) VS. HAS-A (ASSOCIATION)</p>
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="p-3 rounded-xl bg-emerald-100 border-2 border-slate-900">
          <span className="font-display font-extrabold text-emerald-900">IS-A (Inheritance)</span>
          <p className="text-[10.5px] font-code text-emerald-800 mt-1">Dog &rarr; Animal</p>
          <span className="text-[9.5px] text-emerald-700">Tight Class Coupling</span>
        </div>
        <div className="p-3 rounded-xl bg-amber-100 border-2 border-slate-900">
          <span className="font-display font-extrabold text-amber-900">HAS-A (Association)</span>
          <p className="text-[10.5px] font-code text-amber-800 mt-1">Car &rarr; Engine</p>
          <span className="text-[9.5px] text-amber-700">Loose Entity Reference</span>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   12. VIRTUAL INHERITANCE DIAGRAM
   ====================================================================== */
export function VirtualInheritanceDiagram() {
  return (
    <div className="p-4 rounded-2xl my-3 border-2 border-slate-900 bg-purple-50 text-xs font-ui">
      <p className="font-display text-xs font-black text-purple-900 mb-2">DIAMOND PROBLEM RESOLUTION</p>
      <div className="flex flex-col items-center gap-2">
        <div className="p-2 rounded-lg bg-white border border-slate-900 font-code font-bold">Class A (Base val=10)</div>
        <div className="flex gap-8 font-code text-[11px]">
          <span>virtual public A &swarr;</span>
          <span>&searr; virtual public A</span>
        </div>
        <div className="flex gap-6 font-code text-xs">
          <div className="p-2 rounded bg-white border border-slate-900">Class B</div>
          <div className="p-2 rounded bg-white border border-slate-900">Class C</div>
        </div>
        <div className="text-purple-700 font-bold">&darr;</div>
        <div className="p-2 rounded-lg bg-emerald-100 border-2 border-slate-900 font-code font-bold text-emerald-900">
          Class D (1 Single Shared Copy of A)
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   13. DELETE OPERATORS DIAGRAM
   ====================================================================== */
export function DeleteOperatorsDiagram() {
  return (
    <div className="p-4 rounded-2xl my-3 border-2 border-slate-900 bg-slate-50 text-xs font-ui">
      <p className="font-display text-xs font-black text-slate-800 mb-2">SINGLE UNIT VS. ARRAY DEALLOCATION</p>
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="p-3 rounded-xl bg-sky-100 border-2 border-slate-900">
          <span className="font-display font-extrabold text-sky-900">delete ptr;</span>
          <p className="text-[10.5px] text-sky-800 mt-1">Frees 1 unit &amp; calls 1 destructor</p>
        </div>
        <div className="p-3 rounded-xl bg-coral-100 border-2 border-slate-900" style={{ backgroundColor: "#FEE2E2" }}>
          <span className="font-display font-extrabold text-red-900">delete[] arr;</span>
          <p className="text-[10.5px] text-red-800 mt-1">Frees array &amp; calls ALL destructors</p>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   14. NAMESPACE SCOPE DIAGRAM
   ====================================================================== */
export function NamespaceScopeDiagram() {
  return (
    <div className="p-4 rounded-2xl my-3 border-2 border-slate-900 bg-amber-50 text-xs font-ui">
      <p className="font-display text-xs font-black text-amber-900 mb-2">NAMESPACE SCOPE BOUNDARY</p>
      <div className="p-3 rounded-xl bg-white border-2 border-slate-900 flex justify-between items-center">
        <span className="font-code font-bold text-amber-900">namespace Add &#123; int add(); &#125;</span>
        <span className="font-code font-extrabold text-slate-900">Add::add()</span>
      </div>
    </div>
  );
}

/* ======================================================================
   MASTER TOPIC VISUALIZER ROUTER COMPONENT
   ====================================================================== */
export function TopicVisualizer({ topicId }) {
  switch (topicId) {
    case "class-and-object": return <ClassToObjectDiagram />;
    case "encapsulation-data-hiding": return <EncapsulationFlowDiagram />;
    case "abstraction-data-binding": return <AbstractionFlowDiagram />;
    case "types-of-inheritance": return <InheritanceVisualizer />;
    case "virtual-function": return <VirtualFunctionDispatchDiagram />;
    case "pure-virtual-function":
    case "abstract-classes": return <PureVirtualAbstractDiagram />;
    case "constructors": return <ConstructorFlowDiagram />;
    case "destructor": return <DestructorLifetimeDiagram />;
    case "access-specifiers": return <AccessSpecifiersDiagram />;
    case "this-pointer": return <ThisPointerDiagram />;
    case "friend-function": return <FriendFunctionDiagram />;
    case "association-has-a": return <HasAAssociationDiagram />;
    case "virtual-inheritance": return <VirtualInheritanceDiagram />;
    case "delete-operators": return <DeleteOperatorsDiagram />;
    case "namespaces": return <NamespaceScopeDiagram />;
    default: return null;
  }
}

/* ======================================================================
   PILLARS SPOTLIGHT & COMPARISONS
   ====================================================================== */
export function PillarsSpotlight() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="rounded-3xl p-5 sticker mb-8" style={{ backgroundColor: C.card, border: `3.5px solid ${INK}` }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full text-xs font-bold font-code" style={{ backgroundColor: C.sun, color: INK, border: `2px solid ${INK}` }}>Core Foundation</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold font-code bg-purple-100 text-purple-800" style={{ border: `1.5px solid ${INK}` }}>HIGH FREQUENCY</span>
          </div>
          <h2 className="font-display text-2xl font-extrabold" style={{ color: INK }}>THE 4 PILLARS OF OOP</h2>
        </div>
        <p className="text-xs font-ui text-gray-600 max-w-sm">
          The four fundamental principles that govern Object-Oriented system architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {FOUR_PILLARS.map((p, idx) => (
          <div
            key={p.id}
            onClick={() => setActiveTab(idx)}
            className={`cursor-pointer rounded-2xl p-4 transition-all sticker-sm flex flex-col justify-between ${
              activeTab === idx ? "ring-4 ring-purple-400 scale-[1.02]" : "hover:opacity-90"
            }`}
            style={{ backgroundColor: p.color, border: `3px solid ${INK}`, color: "#fff" }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-white/20 backdrop-blur-sm text-white">
                  {p.badge}
                </span>
                <span className="text-xs font-code font-bold opacity-80">Pillar #{idx + 1}</span>
              </div>
              <h3 className="font-display text-lg font-black leading-tight text-white mb-1">{p.title}</h3>
              <p className="text-xs font-ui text-white/90 font-medium mb-3">{p.subtitle}</p>
            </div>
            <p className="text-[11px] font-ui bg-black/20 p-2 rounded-xl text-white/95 leading-snug border border-white/20">
              {p.oneLiner}
            </p>
          </div>
        ))}
      </div>

      {(() => {
        const active = FOUR_PILLARS[activeTab];
        return (
          <div className="p-4 sm:p-5 rounded-2xl" style={{ backgroundColor: C.paper, border: `2.5px solid ${INK}` }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: active.color }} />
              <h4 className="font-display text-base font-extrabold" style={{ color: INK }}>
                Deep Dive: {active.title} — {active.subtitle}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-3.5 rounded-xl bg-white" style={{ border: `2px solid ${INK}` }}>
                <p className="font-display text-xs font-bold text-purple-700 mb-1">💡 Real-World Analogy</p>
                <p className="text-xs font-ui text-gray-700 leading-relaxed">{active.analogy}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white" style={{ border: `2px solid ${INK}` }}>
                <p className="font-display text-xs font-bold text-emerald-700 mb-1">🎤 Speakable Interview Answer</p>
                <p className="text-xs font-ui text-gray-700 leading-relaxed">{active.goodAnswer}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-code text-xs">
              <p className="text-amber-400 font-bold mb-1">// Minimal C++ Example ({active.title})</p>
              <pre className="overflow-x-auto whitespace-pre-wrap">{active.cxxSnippet}</pre>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export function ComparisonMatrixSection() {
  const [activeComp, setActiveComp] = useState(0);

  return (
    <div className="rounded-3xl p-5 sticker mb-8" style={{ backgroundColor: C.card, border: `3.5px solid ${INK}` }}>
      <div className="flex items-center gap-2 mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold font-code" style={{ backgroundColor: C.mint, color: INK, border: `2px solid ${INK}` }}>Comparison Matrix</span>
        <h3 className="font-display text-xl font-extrabold" style={{ color: INK }}>8 SIDE-BY-SIDE CONCEPT COMPARISONS</h3>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {COMPARISONS.map((comp, idx) => (
          <button
            key={idx}
            onClick={() => setActiveComp(idx)}
            className="px-3 py-1 rounded-full font-display text-xs font-bold transition-all sticker-sm"
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

      {(() => {
        const comp = COMPARISONS[activeComp];
        return (
          <div className="overflow-x-auto rounded-2xl" style={{ border: `2.5px solid ${INK}` }}>
            <table className="w-full text-left text-xs font-ui border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-900" style={{ backgroundColor: C.paper }}>
                  <th className="p-3 font-display font-extrabold text-gray-700 w-1/4">Aspect / Property</th>
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

export function InheritanceVisualizer() {
  return (
    <div className="rounded-3xl p-5 sticker mb-8" style={{ backgroundColor: C.card, border: `3.5px solid ${INK}` }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold font-code" style={{ backgroundColor: C.leaf, color: INK, border: `2px solid ${INK}` }}>Visual Hierarchy</span>
        <h3 className="font-display text-xl font-extrabold" style={{ color: INK }}>INHERITANCE STRUCTURES &amp; DIAGRAMS</h3>
      </div>

      <div className="p-4 rounded-2xl mb-6 flex flex-col sm:flex-row items-center justify-center gap-4" style={{ backgroundColor: C.paper, border: `2.5px solid ${INK}` }}>
        <div className="px-5 py-3 rounded-2xl text-center sticker-sm" style={{ backgroundColor: C.coral, color: "#fff", border: `2px solid ${INK}` }}>
          <p className="font-display text-xs font-extrabold">Base Class (Parent)</p>
          <p className="text-[10px] font-code">class Animal &#123; eat() &#125;</p>
        </div>
        <div className="flex items-center gap-1 font-display text-xs font-bold text-purple-700">
          <span>inherits</span> <ArrowRight size={18} />
        </div>
        <div className="px-5 py-3 rounded-2xl text-center sticker-sm" style={{ backgroundColor: C.leaf, color: INK, border: `2px solid ${INK}` }}>
          <p className="font-display text-xs font-extrabold">Derived Class (Child)</p>
          <p className="text-[10px] font-code">class Dog : public Animal &#123; bark() &#125;</p>
        </div>
      </div>
    </div>
  );
}

export function PolymorphismVTableDiagram() {
  return (
    <div className="rounded-3xl p-5 sticker mb-8" style={{ backgroundColor: C.card, border: `3.5px solid ${INK}` }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold font-code bg-purple-100 text-purple-900" style={{ border: `2px solid ${INK}` }}>Dynamic Dispatch</span>
        <h3 className="font-display text-xl font-extrabold" style={{ color: INK }}>POLYMORPHISM TREE &amp; V-TABLE MECHANISM</h3>
      </div>
    </div>
  );
}

export function ConstructorCopyDiagram() {
  return (
    <div className="rounded-3xl p-4 sm:p-5 sticker mb-8" style={{ backgroundColor: C.card, border: `3.5px solid ${INK}` }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold font-code" style={{ backgroundColor: C.cyan, color: INK, border: `2px solid ${INK}` }}>Memory &amp; Creation</span>
        <h3 className="font-display text-lg font-extrabold" style={{ color: INK }}>COPY CONSTRUCTOR ALLOCATION FLOW</h3>
      </div>
    </div>
  );
}
