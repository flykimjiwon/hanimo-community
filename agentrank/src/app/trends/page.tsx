"use client";

import Navbar from "@/components/Navbar";

const timeline = [
  { date: "2026-03-28", type: "release", title: "Qwen3-Coder 3B 출시", desc: "3B 파라미터로 코딩 특화. SWE-bench에서 놀라운 성능.", color: "var(--accent-green)" },
  { date: "2026-03-25", type: "benchmark", title: "SWE-bench Pro 3월 업데이트", desc: "GLM-5가 77.8%로 전체 1위. Claude Opus 4.6 서양 모델 1위.", color: "var(--accent-cyan)" },
  { date: "2026-03-20", type: "pricing", title: "DeepSeek API 가격 인하", desc: "V3.2 입력 가격 $0.27/M으로 추가 인하. 가성비 1위 유지.", color: "var(--accent-amber)" },
  { date: "2026-03-15", type: "tool", title: "Cursor 2.0 Background Agent 출시", desc: "비동기 에이전트 실행 + 서브에이전트 지원. Cursor Ultra $200/mo.", color: "#a78bfa" },
  { date: "2026-03-10", type: "release", title: "OpenAI Codex CLI 오픈소스 공개", desc: "터미널 코딩 에이전트를 오픈소스로 공개. Claude Code 대항마.", color: "var(--accent-green)" },
  { date: "2026-03-05", type: "industry", title: "Cognition AI, Windsurf 인수", desc: "Devin 제작사가 Windsurf를 인수. AI IDE 시장 통합 가속화.", color: "var(--accent-rose)" },
  { date: "2026-02-28", type: "release", title: "Claude Opus 4.6 출시", desc: "1M 컨텍스트, Agent Teams 지원. 에이전트 벤치마크 1위.", color: "var(--accent-cyan)" },
  { date: "2026-02-20", type: "benchmark", title: "Terminal-Bench 2.0 공개", desc: "229개 태스크, 93명 기여자. 터미널 에이전트 평가 표준.", color: "var(--accent-cyan)" },
  { date: "2026-02-15", type: "tool", title: "GitHub Copilot 에이전트 모드 정식 출시", desc: "멀티모델 지원 + MCP 통합. $10/mo부터.", color: "#a78bfa" },
  { date: "2026-01-30", type: "release", title: "GPT-5.4 출시", desc: "균형 잡힌 최상위 모델. 창작·언어 카테고리에서 특히 강세.", color: "var(--accent-green)" },
];

const typeLabels: Record<string, string> = { release: "출시", benchmark: "벤치마크", pricing: "가격", tool: "도구", industry: "업계" };

export default function TrendsPage() {
  return (
    <div className="min-h-screen"><Navbar />
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <div className="badge badge-rose mono mb-2">TIMELINE</div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>AI 트렌드 타임라인</h1>
          <p className="mt-1 text-[13px]" style={{ color: 'var(--text-secondary)' }}>모델 출시, 벤치마크 업데이트, 가격 변동, 도구 변경 이벤트를 시간순으로 추적</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2">
          {["전체", "출시", "벤치마크", "가격", "도구", "업계"].map(f => (
            <button key={f} className="rounded-md px-3 py-1.5 text-[11px] font-medium" style={{ background: f === "전체" ? 'var(--accent-cyan-glow)' : 'transparent', color: f === "전체" ? 'var(--accent-cyan)' : 'var(--text-tertiary)', border: `1px solid ${f === "전체" ? 'var(--accent-cyan-dim)' : 'var(--border-dim)'}` }}>
              {f}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px" style={{ background: 'var(--border-dim)' }} />
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <div key={i} className={`card p-5 ml-10 relative animate-fade-up stagger-${Math.min(i + 1, 6)}`}>
                <div className="absolute -left-[27px] top-5 h-3 w-3 rounded-full border-2" style={{ background: item.color, borderColor: 'var(--bg-base)' }} />
                <div className="flex items-center gap-2 mb-2">
                  <span className="mono text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{item.date}</span>
                  <span className="rounded-md px-1.5 py-0.5 text-[10px] mono" style={{ background: `${item.color}20`, color: item.color }}>{typeLabels[item.type]}</span>
                </div>
                <h3 className="text-[14px] font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                <p className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
