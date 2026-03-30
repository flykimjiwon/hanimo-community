"use client";

import Navbar from "@/components/Navbar";

const tools = [
  { id: "benchmark", name: "벤치마크 조회", command: "agentrank_benchmark", desc: "모델의 벤치마크 점수를 코딩 에이전트 안에서 바로 조회", example: "agentrank_benchmark --model claude-opus-4.6 --benchmark swe-bench", status: "available" },
  { id: "compare", name: "모델 비교", command: "agentrank_compare", desc: "두 모델의 카테고리별 점수를 즉시 비교", example: "agentrank_compare --a claude-opus-4.6 --b gpt-5.4", status: "available" },
  { id: "price", name: "가격 조회", command: "agentrank_price", desc: "모델 API 가격 및 도구 구독료 조회", example: "agentrank_price --model deepseek-v3.2", status: "available" },
  { id: "trend", name: "트렌드 요약", command: "agentrank_trends", desc: "최근 AI 트렌드를 요약하여 반환", example: "agentrank_trends --days 7", status: "beta" },
  { id: "recommend", name: "도구 추천", command: "agentrank_recommend", desc: "사용 시나리오에 맞는 도구 추천", example: "agentrank_recommend --scenario 'large refactoring'", status: "beta" },
  { id: "kr-bench", name: "한국어 벤치 조회", command: "agentrank_kr", desc: "한국어 프롬프트 성능 점수 조회", example: "agentrank_kr --model gemini-2.5-pro", status: "coming" },
];

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  available: { bg: "rgba(52,211,153,0.12)", text: "var(--accent-green)", label: "사용 가능" },
  beta: { bg: "rgba(251,191,36,0.12)", text: "var(--accent-amber)", label: "베타" },
  coming: { bg: "rgba(251,113,133,0.12)", text: "var(--accent-rose)", label: "예정" },
};

export default function McpToolsPage() {
  return (
    <div className="min-h-screen"><Navbar />
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <div className="badge badge-cyan mono mb-2">MCP TOOLS</div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>MCP 도구</h1>
          <p className="mt-1 text-[13px]" style={{ color: 'var(--text-secondary)' }}>Claude Code, Cursor 등 코딩 에이전트 안에서 AgentRank 데이터를 직접 조회하세요</p>
        </div>

        {/* Install */}
        <div className="card p-6 mb-6" style={{ borderColor: 'var(--accent-cyan-dim)' }}>
          <h2 className="text-[15px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>설치</h2>
          <div className="rounded-lg p-4 mono text-[13px]" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-dim)', color: 'var(--accent-cyan)' }}>
            npx agentrank-mcp install
          </div>
          <p className="mt-3 text-[12px]" style={{ color: 'var(--text-tertiary)' }}>Claude Code, Cursor, Cline에서 MCP 서버로 자동 등록됩니다</p>
        </div>

        {/* Tools List */}
        <div className="space-y-3">
          {tools.map((tool, i) => {
            const st = statusStyles[tool.status];
            return (
              <div key={tool.id} className={`card p-5 animate-fade-up stagger-${Math.min(i + 1, 6)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>{tool.name}</span>
                    <span className="rounded-md px-1.5 py-0.5 text-[10px] mono" style={{ background: st.bg, color: st.text }}>{st.label}</span>
                  </div>
                  <span className="mono text-[12px]" style={{ color: 'var(--accent-cyan)' }}>{tool.command}</span>
                </div>
                <p className="text-[12px] mb-3" style={{ color: 'var(--text-secondary)' }}>{tool.desc}</p>
                <div className="rounded-md p-3 mono text-[11px]" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-dim)', color: 'var(--text-tertiary)' }}>
                  $ {tool.example}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
