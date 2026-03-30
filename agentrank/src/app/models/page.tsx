"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { modelProfiles, categories, tierColors } from "@/data/categories";

function RadarMini({ scores, size = 80 }: { scores: Record<string, number>; size?: number }) {
  const keys = ["coding", "math", "language", "reasoning", "agent", "creative"];
  const cx = size / 2, cy = size / 2, r = size / 2 - 8;
  const angleStep = (2 * Math.PI) / keys.length;
  const points = keys.map((k, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const val = (scores[k] || 0) / 100;
    return { x: cx + r * val * Math.cos(angle), y: cy + r * val * Math.sin(angle) };
  });
  const poly = points.map(p => `${p.x},${p.y}`).join(" ");
  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {gridLevels.map((level) => (
        <polygon key={level} points={keys.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          return `${cx + r * level * Math.cos(angle)},${cy + r * level * Math.sin(angle)}`;
        }).join(" ")} fill="none" stroke="var(--border-dim)" strokeWidth="0.5" />
      ))}
      {keys.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(angle)} y2={cy + r * Math.sin(angle)} stroke="var(--border-dim)" strokeWidth="0.5" />;
      })}
      <polygon points={poly} fill="var(--accent-cyan-glow)" stroke="var(--accent-cyan)" strokeWidth="1.5" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2" fill="var(--accent-cyan)" />
      ))}
    </svg>
  );
}

export default function ModelsPage() {
  const [sortBy, setSortBy] = useState<"overall" | "coding" | "math" | "language" | "reasoning" | "agent" | "creative">("overall");
  const [tierFilter, setTierFilter] = useState<string>("all");

  const filtered = tierFilter === "all" ? modelProfiles : modelProfiles.filter(m => m.tier === tierFilter);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "overall") return b.overall - a.overall;
    return (b.scores[sortBy] || 0) - (a.scores[sortBy] || 0);
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <div className="badge badge-cyan mono mb-2">11 MODELS</div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>모델 디렉토리</h1>
          <p className="mt-1 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
            모든 모델의 카테고리별 점수를 한눈에 비교하세요. 작은 모델도 특정 분야에서 빛납니다.
          </p>
        </div>

        {/* Sort & Filter */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] mono" style={{ color: 'var(--text-tertiary)' }}>정렬:</span>
            {[{ key: "overall", label: "종합" }, ...categories.map(c => ({ key: c.key, label: c.label }))].map((s) => (
              <button key={s.key} onClick={() => setSortBy(s.key as typeof sortBy)}
                className="rounded-md px-2.5 py-1 text-[11px] font-medium transition-all"
                style={{
                  background: sortBy === s.key ? 'var(--accent-cyan-glow)' : 'transparent',
                  color: sortBy === s.key ? 'var(--accent-cyan)' : 'var(--text-tertiary)',
                  border: `1px solid ${sortBy === s.key ? 'var(--accent-cyan-dim)' : 'var(--border-dim)'}`,
                }}>
                {s.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] mono" style={{ color: 'var(--text-tertiary)' }}>티어:</span>
            {["all", "S", "A", "B", "C"].map((t) => (
              <button key={t} onClick={() => setTierFilter(t)}
                className="rounded-md px-2.5 py-1 text-[11px] font-medium mono transition-all"
                style={{
                  background: tierFilter === t ? (t === "all" ? 'var(--bg-surface)' : tierColors[t]?.bg) : 'transparent',
                  color: tierFilter === t ? (t === "all" ? 'var(--text-primary)' : tierColors[t]?.text) : 'var(--text-tertiary)',
                  border: `1px solid ${tierFilter === t ? 'var(--border-bright)' : 'var(--border-dim)'}`,
                }}>
                {t === "all" ? "전체" : t}
              </button>
            ))}
          </div>
        </div>

        {/* Model Grid */}
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {sorted.map((model, i) => {
            const tc = tierColors[model.tier];
            return (
              <Link href={`/models/${model.id}`} key={model.id} className={`card p-5 animate-fade-up stagger-${Math.min(i + 1, 6)} group`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>{model.name}</span>
                      <span className="rounded-md px-1.5 py-0.5 text-[10px] font-bold mono" style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}>
                        {model.tier}
                      </span>
                    </div>
                    <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{model.provider} · {model.paramSize}</div>
                  </div>
                  <RadarMini scores={model.scores} />
                </div>

                {/* Overall + Specialty */}
                <div className="flex gap-3 mb-3">
                  <div className="rounded-lg p-2 flex-1" style={{ background: 'var(--bg-hover)' }}>
                    <div className="text-[10px] mono uppercase" style={{ color: 'var(--text-tertiary)' }}>종합</div>
                    <div className="text-xl font-bold mono" style={{ color: 'var(--text-primary)' }}>{model.overall}<span className="text-[12px]">/100</span></div>
                  </div>
                  <div className="rounded-lg p-2 flex-1" style={{ background: 'var(--bg-hover)' }}>
                    <div className="text-[10px] mono uppercase" style={{ color: 'var(--text-tertiary)' }}>특기</div>
                    <div className="text-[13px] font-semibold" style={{ color: 'var(--accent-cyan)' }}>{model.specialty}</div>
                    <div className="text-[11px] mono" style={{ color: 'var(--accent-cyan)' }}>{model.specialtyScore}점</div>
                  </div>
                </div>

                {/* Score Bars */}
                <div className="space-y-1.5">
                  {categories.map((cat) => {
                    const score = model.scores[cat.key];
                    return (
                      <div key={cat.key} className="flex items-center gap-2">
                        <span className="w-10 text-[10px] mono" style={{ color: 'var(--text-tertiary)' }}>{cat.label}</span>
                        <div className="score-bar flex-1">
                          <div className="score-bar-fill" style={{ width: `${score}%`, background: score >= 85 ? cat.color : 'var(--border-bright)' }} />
                        </div>
                        <span className="w-7 text-right text-[11px] mono" style={{ color: score >= 85 ? cat.color : 'var(--text-secondary)' }}>{score}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{model.description}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
