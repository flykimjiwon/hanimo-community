"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { agentTools, type AgentTool } from "@/data/mock";

const typeColors: Record<string, { bg: string; text: string }> = {
  terminal: { bg: "rgba(52,211,153,0.12)", text: "var(--accent-green)" },
  ide: { bg: "rgba(34,211,238,0.12)", text: "var(--accent-cyan)" },
  cloud: { bg: "rgba(251,191,36,0.12)", text: "var(--accent-amber)" },
  extension: { bg: "rgba(251,113,133,0.12)", text: "var(--accent-rose)" },
};

function ToolCard({ tool, selected, onSelect }: { tool: AgentTool; selected: boolean; onSelect: () => void }) {
  const tc = typeColors[tool.type] || typeColors.extension;
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-xl p-4 transition-all duration-200 ${selected ? "card-selected" : "card"}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{tool.logo}</span>
          <div>
            <h3 className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>{tool.name}</h3>
            <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{tool.company}</p>
          </div>
        </div>
        <span className="rounded-md px-2 py-0.5 text-[10px] font-medium mono uppercase" style={{ background: tc.bg, color: tc.text }}>
          {tool.type}
        </span>
      </div>

      <p className="text-[12px] leading-relaxed line-clamp-2 mb-3" style={{ color: 'var(--text-secondary)' }}>{tool.description}</p>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="rounded-md p-2" style={{ background: 'var(--bg-hover)' }}>
          <div className="text-[10px] mono uppercase" style={{ color: 'var(--text-tertiary)' }}>가격</div>
          <div className="text-[12px] font-medium mono" style={{ color: 'var(--text-primary)' }}>{tool.pricing}</div>
        </div>
        <div className="rounded-md p-2" style={{ background: 'var(--bg-hover)' }}>
          <div className="text-[10px] mono uppercase" style={{ color: 'var(--text-tertiary)' }}>컨텍스트</div>
          <div className="text-[12px] font-medium mono" style={{ color: 'var(--text-primary)' }}>{tool.contextWindow}</div>
        </div>
      </div>

      <div className="flex gap-1.5">
        {tool.mcpSupport && <span className="badge badge-cyan text-[10px]">MCP</span>}
        {tool.multiAgent && <span className="badge badge-green text-[10px]">Multi-Agent</span>}
        {!tool.mcpSupport && !tool.multiAgent && <span className="badge badge-neutral text-[10px]">Basic</span>}
      </div>

      {selected && (
        <div className="mt-3 flex items-center gap-1.5 text-[11px] mono" style={{ color: 'var(--accent-cyan)' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 6L5.5 7.5L8 4.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          비교 선택됨
        </div>
      )}
    </div>
  );
}

function ComparePanel({ tools }: { tools: AgentTool[] }) {
  if (tools.length < 2) {
    return (
      <div className="rounded-xl p-10 text-center" style={{ border: '1px dashed var(--border-default)', background: 'var(--bg-raised)' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mx-auto mb-3">
          <path d="M8 16H24M16 8V24" stroke="var(--text-tertiary)" strokeWidth="2" />
          <circle cx="16" cy="16" r="12" stroke="var(--border-bright)" strokeWidth="1.5" />
        </svg>
        <p className="text-[13px]" style={{ color: 'var(--text-tertiary)' }}>
          2개 도구를 선택하면 상세 비교가 표시됩니다
        </p>
      </div>
    );
  }

  const [a, b] = tools;
  const rows: { label: string; aVal: string; bVal: string; aWin?: boolean; bWin?: boolean }[] = [
    { label: "타입", aVal: a.type.toUpperCase(), bVal: b.type.toUpperCase() },
    { label: "가격", aVal: a.pricingDetail, bVal: b.pricingDetail },
    { label: "컨텍스트", aVal: a.contextWindow, bVal: b.contextWindow },
    { label: "MCP 지원", aVal: a.mcpSupport ? "지원" : "미지원", bVal: b.mcpSupport ? "지원" : "미지원", aWin: a.mcpSupport && !b.mcpSupport, bWin: b.mcpSupport && !a.mcpSupport },
    { label: "멀티에이전트", aVal: a.multiAgent ? "지원" : "미지원", bVal: b.multiAgent ? "지원" : "미지원", aWin: a.multiAgent && !b.multiAgent, bWin: b.multiAgent && !a.multiAgent },
    { label: "SWE-bench", aVal: a.sweBenchScore ? `${a.sweBenchScore}%` : "N/A", bVal: b.sweBenchScore ? `${b.sweBenchScore}%` : "N/A",
      aWin: (a.sweBenchScore || 0) > (b.sweBenchScore || 0), bWin: (b.sweBenchScore || 0) > (a.sweBenchScore || 0) },
    { label: "추천 용도", aVal: a.bestFor, bVal: b.bestFor },
  ];

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-dim)', background: 'var(--bg-raised)' }}>
      {/* Header */}
      <div className="grid grid-cols-[180px_1fr_1fr]" style={{ borderBottom: '1px solid var(--border-dim)', background: 'var(--bg-surface)' }}>
        <div className="px-4 py-3 text-[11px] font-medium mono uppercase" style={{ color: 'var(--text-tertiary)' }}>비교 항목</div>
        <div className="px-4 py-3 text-center text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>
          {a.logo} {a.name}
        </div>
        <div className="px-4 py-3 text-center text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>
          {b.logo} {b.name}
        </div>
      </div>

      {/* Rows */}
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-[180px_1fr_1fr] transition-colors" style={{ borderBottom: '1px solid var(--border-dim)' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <div className="px-4 py-3 text-[12px] mono" style={{ color: 'var(--text-tertiary)' }}>{row.label}</div>
          <div className="px-4 py-3 text-center text-[13px]" style={{ color: row.aWin ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
            {row.aVal}
          </div>
          <div className="px-4 py-3 text-center text-[13px]" style={{ color: row.bWin ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
            {row.bVal}
          </div>
        </div>
      ))}

      {/* Strengths */}
      <div className="grid grid-cols-[180px_1fr_1fr]" style={{ borderBottom: '1px solid var(--border-dim)', background: 'var(--bg-surface)' }}>
        <div className="px-4 py-3 text-[12px] mono" style={{ color: 'var(--text-tertiary)' }}>강점</div>
        <div className="px-4 py-3">
          {a.strengths.map((s) => (
            <div key={s} className="flex items-center gap-1.5 mb-1 text-[11px]" style={{ color: 'var(--accent-green)' }}>
              <span className="text-[8px]">●</span> {s}
            </div>
          ))}
        </div>
        <div className="px-4 py-3">
          {b.strengths.map((s) => (
            <div key={s} className="flex items-center gap-1.5 mb-1 text-[11px]" style={{ color: 'var(--accent-green)' }}>
              <span className="text-[8px]">●</span> {s}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[180px_1fr_1fr]">
        <div className="px-4 py-3 text-[12px] mono" style={{ color: 'var(--text-tertiary)' }}>약점</div>
        <div className="px-4 py-3">
          {a.weaknesses.map((w) => (
            <div key={w} className="flex items-center gap-1.5 mb-1 text-[11px]" style={{ color: 'var(--accent-rose)' }}>
              <span className="text-[8px]">●</span> {w}
            </div>
          ))}
        </div>
        <div className="px-4 py-3">
          {b.weaknesses.map((w) => (
            <div key={w} className="flex items-center gap-1.5 mb-1 text-[11px]" style={{ color: 'var(--accent-rose)' }}>
              <span className="text-[8px]">●</span> {w}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AgentsPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["claude-code", "codex-cli"]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const selectedTools = selectedIds
    .map((id) => agentTools.find((t) => t.id === id))
    .filter((t): t is AgentTool => !!t);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="badge badge-green mono">10+ TOOLS</div>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>코딩 에이전트 도구 비교</h1>
          <p className="mt-1 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
            2개 도구를 선택하여 상세 비교하세요. 모델이 아닌 도구 단위로 비교합니다.
          </p>
        </div>

        {/* Tool Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {agentTools.map((tool, i) => (
            <div key={tool.id} className={`animate-fade-up stagger-${Math.min(i + 1, 6)}`}>
              <ToolCard
                tool={tool}
                selected={selectedIds.includes(tool.id)}
                onSelect={() => toggleSelect(tool.id)}
              />
            </div>
          ))}
        </div>

        {/* Comparison */}
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Head-to-Head 비교</h2>
            {selectedTools.length === 2 && (
              <span className="badge badge-cyan mono">
                {selectedTools[0].name} vs {selectedTools[1].name}
              </span>
            )}
          </div>
          <ComparePanel tools={selectedTools} />
        </div>

        {/* Scenario Recommendations */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-5" style={{ color: 'var(--text-primary)' }}>시나리오별 추천</h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { scenario: "대규모 리팩토링", tool: "Claude Code", reason: "1M context + Agent Teams로 전체 코드베이스 이해", color: "var(--accent-cyan)" },
              { scenario: "일상 코딩", tool: "Cursor", reason: "IDE 통합 UX + 빠른 자동완성 + Background Agent", color: "var(--accent-green)" },
              { scenario: "가성비 최우선", tool: "Cline / Aider", reason: "무료 + BYOK로 API 비용만 부담", color: "var(--accent-amber)" },
              { scenario: "완전 자동화", tool: "Devin", reason: "독립적 태스크 수행, 비동기 위임", color: "var(--accent-rose)" },
            ].map((rec, i) => (
              <div key={rec.scenario} className={`card p-5 animate-fade-up stagger-${i + 1}`}>
                <div className="text-[11px] mono font-medium uppercase tracking-wider mb-2" style={{ color: rec.color }}>{rec.scenario}</div>
                <div className="text-[16px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{rec.tool}</div>
                <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{rec.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
