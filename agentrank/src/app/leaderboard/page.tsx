"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { benchmarkScores, type BenchmarkScore } from "@/data/mock";

type SortKey = keyof BenchmarkScore;

const benchmarkColumns: { key: SortKey; label: string; short: string; max: number }[] = [
  { key: "sweBenchVerified", label: "SWE-bench Verified", short: "SWE-V", max: 100 },
  { key: "sweBenchPro", label: "SWE-bench Pro", short: "SWE-P", max: 20 },
  { key: "liveCodeBench", label: "LiveCodeBench", short: "LCB", max: 100 },
  { key: "aiderPolyglot", label: "Aider Polyglot", short: "Aider", max: 100 },
  { key: "bfcl", label: "BFCL", short: "BFCL", max: 100 },
  { key: "arenaElo", label: "Arena Elo", short: "Elo", max: 1500 },
];

const providerColors: Record<string, string> = {
  Anthropic: "var(--accent-cyan)",
  OpenAI: "var(--accent-green)",
  Google: "var(--accent-amber)",
  DeepSeek: "var(--accent-rose)",
  Alibaba: "var(--accent-amber)",
  "Zhipu AI": "var(--accent-rose)",
};

function ScoreCell({ value, max, isTop }: { value: number | null; max: number; isTop: boolean }) {
  if (value === null) return (
    <td className="px-3 py-4 text-center">
      <span className="mono text-[12px]" style={{ color: 'var(--text-tertiary)' }}>—</span>
    </td>
  );
  const pct = Math.min((value / max) * 100, 100);
  return (
    <td className="px-3 py-4">
      <div className="flex flex-col items-center gap-1.5">
        <span className={`mono text-[13px] font-medium ${isTop ? 'font-bold' : ''}`}
          style={{ color: isTop ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
          {value.toLocaleString()}
        </span>
        <div className="score-bar w-full max-w-[60px]">
          <div className="score-bar-fill" style={{
            width: `${pct}%`,
            background: isTop
              ? 'linear-gradient(90deg, var(--accent-cyan-dim), var(--accent-cyan))'
              : 'linear-gradient(90deg, var(--border-bright), var(--text-tertiary))'
          }} />
        </div>
      </div>
    </td>
  );
}

export default function LeaderboardPage() {
  const [sortKey, setSortKey] = useState<SortKey>("sweBenchVerified");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [providerFilter, setProviderFilter] = useState<string>("all");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortDir(key === "pricePerMTok" ? "asc" : "desc");
    }
  };

  const filtered = providerFilter === "all"
    ? benchmarkScores
    : benchmarkScores.filter(s => s.provider === providerFilter);

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey] as number | null;
    const bv = b[sortKey] as number | null;
    if (av === null && bv === null) return 0;
    if (av === null) return 1;
    if (bv === null) return -1;
    return sortDir === "desc" ? bv - av : av - bv;
  });

  const topValues: Record<string, number> = {};
  for (const col of benchmarkColumns) {
    const values = benchmarkScores
      .map((s) => s[col.key] as number | null)
      .filter((v): v is number => v !== null);
    if (values.length > 0) {
      topValues[col.key] = Math.max(...values);
    }
  }

  const providers = [...new Set(benchmarkScores.map(s => s.provider))];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="badge badge-cyan mono">LIVE DATA</div>
            </div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              메타 리더보드
            </h1>
            <p className="mt-1 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
              주요 벤치마크 결과를 정규화하여 한 곳에서 비교합니다
            </p>
          </div>
          <div className="text-[11px] mono" style={{ color: 'var(--text-tertiary)' }}>
            마지막 업데이트: 2026-03-28
          </div>
        </div>

        {/* Filters */}
        <div className="mb-5 flex items-center gap-2">
          <button
            onClick={() => setProviderFilter("all")}
            className="rounded-md px-3 py-1.5 text-[12px] font-medium transition-all"
            style={{
              background: providerFilter === "all" ? 'var(--accent-cyan-glow)' : 'transparent',
              color: providerFilter === "all" ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              border: `1px solid ${providerFilter === "all" ? 'var(--accent-cyan-dim)' : 'var(--border-dim)'}`,
            }}
          >
            전체
          </button>
          {providers.map(p => (
            <button
              key={p}
              onClick={() => setProviderFilter(p === providerFilter ? "all" : p)}
              className="rounded-md px-3 py-1.5 text-[12px] font-medium transition-all"
              style={{
                background: providerFilter === p ? 'var(--bg-surface)' : 'transparent',
                color: providerFilter === p ? providerColors[p] || 'var(--text-primary)' : 'var(--text-tertiary)',
                border: `1px solid ${providerFilter === p ? 'var(--border-bright)' : 'var(--border-dim)'}`,
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-dim)', background: 'var(--bg-raised)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-dim)', background: 'var(--bg-surface)' }}>
                <th className="px-4 py-3 text-left text-[11px] font-medium mono uppercase tracking-wider" style={{ color: 'var(--text-tertiary)', width: '40px' }}>
                  #
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-medium mono uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                  모델
                </th>
                {benchmarkColumns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="cursor-pointer px-3 py-3 text-center text-[11px] font-medium mono uppercase tracking-wider select-none transition-colors"
                    style={{ color: sortKey === col.key ? 'var(--accent-cyan)' : 'var(--text-tertiary)' }}
                  >
                    <div className="flex items-center justify-center gap-1">
                      {col.short}
                      {sortKey === col.key && (
                        <span style={{ color: 'var(--accent-cyan)' }}>
                          {sortDir === "desc" ? "↓" : "↑"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                <th
                  onClick={() => handleSort("pricePerMTok")}
                  className="cursor-pointer px-3 py-3 text-center text-[11px] font-medium mono uppercase tracking-wider select-none transition-colors"
                  style={{ color: sortKey === "pricePerMTok" ? 'var(--accent-cyan)' : 'var(--text-tertiary)' }}
                >
                  $/MTok
                </th>
                <th className="px-3 py-3 text-center text-[11px] font-medium mono uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                  CTX
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => (
                <tr
                  key={row.model}
                  className="transition-colors animate-fade-up"
                  style={{
                    borderBottom: '1px solid var(--border-dim)',
                    animationDelay: `${i * 0.03}s`,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td className="px-4 py-4 mono text-[12px]" style={{ color: i < 3 ? 'var(--accent-cyan)' : 'var(--text-tertiary)' }}>
                    {i + 1}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ background: providerColors[row.provider] || 'var(--text-tertiary)' }} />
                      <div>
                        <div className="text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>{row.model}</div>
                        <div className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{row.provider}</div>
                      </div>
                    </div>
                  </td>
                  {benchmarkColumns.map((col) => (
                    <ScoreCell
                      key={col.key}
                      value={row[col.key] as number | null}
                      max={col.max}
                      isTop={row[col.key] === topValues[col.key]}
                    />
                  ))}
                  <td className="px-3 py-4 text-center mono text-[13px]" style={{ color: 'var(--accent-amber)' }}>
                    ${row.pricePerMTok}
                  </td>
                  <td className="px-3 py-4 text-center mono text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                    {row.contextWindow >= 1000 ? `${row.contextWindow / 1000}M` : `${row.contextWindow}K`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Insight card */}
        <div className="mt-6 card p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-amber), transparent)', opacity: 0.4 }} />
          <div className="flex items-start gap-3">
            <div className="badge badge-amber mt-0.5">INSIGHT</div>
            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <span className="mono font-medium" style={{ color: 'var(--accent-amber)' }}>DeepSeek V3.2</span>는 $0.27/M tokens로 가장 저렴하면서도 SWE-bench 60.2%를 달성.
              가성비 최고는 <span className="mono font-medium" style={{ color: 'var(--accent-green)' }}>Gemini 2.5 Pro</span> ($1.25/M, 63.8%).
              성능 1위는 <span className="mono font-medium" style={{ color: 'var(--accent-cyan)' }}>Claude Opus 4.6</span> (72.5%).
            </p>
          </div>
        </div>

        {/* Sources */}
        <div className="mt-4 text-[11px] mono" style={{ color: 'var(--text-tertiary)' }}>
          출처: SWE-bench, LMArena, Aider Polyglot, BFCL, LiveCodeBench · 주간 자동 업데이트
        </div>
      </div>
    </div>
  );
}
