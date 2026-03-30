"use client";

import { useState } from "react";
import { logos } from "@/data/logos";

const categories = [...new Set(logos.map(l => l.category))];

export default function LogoPickerPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [bgMode, setBgMode] = useState<"dark" | "light">("dark");
  const [catFilter, setCatFilter] = useState<string>("all");

  const filtered = catFilter === "all" ? logos : logos.filter(l => l.category === catFilter);

  return (
    <div className="min-h-screen p-8" style={{ background: bgMode === "dark" ? "#0a0e17" : "#f8f9fc", color: bgMode === "dark" ? "#e8edf5" : "#0f1729" }}>
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold mb-1">로고/파비콘 후보 — {logos.length}개</h1>
        <p className="text-[14px] mb-6" style={{ color: bgMode === "dark" ? "#8892a8" : "#4b5675" }}>
          클릭하여 선택하세요. 번호를 알려주시면 적용합니다.
        </p>

        {/* Controls */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setBgMode("dark")} className="rounded-md px-3 py-1.5 text-[12px] font-medium" style={{ background: bgMode === "dark" ? "#22d3ee20" : "transparent", color: bgMode === "dark" ? "#22d3ee" : "#8892a8", border: "1px solid #283352" }}>다크</button>
          <button onClick={() => setBgMode("light")} className="rounded-md px-3 py-1.5 text-[12px] font-medium" style={{ background: bgMode === "light" ? "#0891b220" : "transparent", color: bgMode === "light" ? "#0891b2" : "#8892a8", border: "1px solid #d1d5e0" }}>라이트</button>
          <span className="mx-2" style={{ color: "#565f75" }}>|</span>
          <button onClick={() => setCatFilter("all")} className="rounded-md px-3 py-1.5 text-[12px] font-medium" style={{ background: catFilter === "all" ? "#22d3ee20" : "transparent", color: catFilter === "all" ? "#22d3ee" : "#8892a8", border: "1px solid #283352" }}>전체 ({logos.length})</button>
          {categories.map(c => {
            const cnt = logos.filter(l => l.category === c).length;
            return (
              <button key={c} onClick={() => setCatFilter(c)} className="rounded-md px-3 py-1.5 text-[12px] font-medium" style={{ background: catFilter === c ? "#22d3ee20" : "transparent", color: catFilter === c ? "#22d3ee" : "#8892a8", border: "1px solid #283352" }}>
                {c} ({cnt})
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-5 gap-3 md:grid-cols-8 lg:grid-cols-10">
          {filtered.map((logo) => (
            <button
              key={logo.id}
              onClick={() => setSelected(logo.id)}
              className="flex flex-col items-center gap-1.5 rounded-xl p-2.5 transition-all"
              style={{
                background: selected === logo.id ? (bgMode === "dark" ? "rgba(34,211,238,0.08)" : "rgba(8,145,178,0.08)") : (bgMode === "dark" ? "#0f1420" : "#ffffff"),
                border: selected === logo.id ? "2px solid #22d3ee" : (bgMode === "dark" ? "1px solid #1e2740" : "1px solid #e2e5ee"),
                boxShadow: selected === logo.id ? "0 0 16px rgba(34,211,238,0.15)" : "none",
              }}
            >
              <span className="text-[9px] font-bold" style={{ fontFamily: "monospace", color: selected === logo.id ? "#22d3ee" : (bgMode === "dark" ? "#565f75" : "#8892a8") }}>
                #{logo.id}
              </span>
              <div className="flex items-center justify-center">{logo.svg}</div>
              <span className="text-[9px] font-medium text-center leading-tight truncate w-full" style={{ color: bgMode === "dark" ? "#8892a8" : "#4b5675" }}>
                {logo.name}
              </span>
            </button>
          ))}
        </div>

        {/* Selected preview */}
        {selected && (() => {
          const logo = logos.find(l => l.id === selected);
          if (!logo) return null;
          return (
            <div className="mt-8 rounded-xl p-6" style={{ background: bgMode === "dark" ? "#0f1420" : "#ffffff", border: "2px solid #22d3ee" }}>
              <div className="text-[12px] font-bold mb-4" style={{ fontFamily: "monospace", color: "#22d3ee" }}>
                선택: #{logo.id} — {logo.name} · {logo.category} · {logo.desc}
              </div>
              <div className="flex items-center justify-center gap-10 flex-wrap">
                <div className="text-center">
                  <div className="mb-2">{logo.svg}</div>
                  <span className="text-[10px]" style={{ fontFamily: "monospace", color: "#565f75" }}>48px</span>
                </div>
                <div className="text-center">
                  <div className="mb-2" style={{ transform: "scale(0.667)", transformOrigin: "center" }}>{logo.svg}</div>
                  <span className="text-[10px]" style={{ fontFamily: "monospace", color: "#565f75" }}>32px</span>
                </div>
                <div className="text-center">
                  <div className="mb-2" style={{ transform: "scale(0.333)", transformOrigin: "center" }}>{logo.svg}</div>
                  <span className="text-[10px]" style={{ fontFamily: "monospace", color: "#565f75" }}>16px</span>
                </div>
                <div className="flex items-center gap-3">
                  <div style={{ transform: "scale(0.583)", transformOrigin: "center" }}>{logo.svg}</div>
                  <span className="text-[20px] font-semibold" style={{ color: bgMode === "dark" ? "#e8edf5" : "#0f1729" }}>
                    Agent<span style={{ color: "#22d3ee" }}>Rank</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
