"use client";

import Navbar from "@/components/Navbar";

const issues = [
  { num: 12, date: "2026-03-24", title: "Qwen3-Coder의 충격: 3B로 대형 모델 성능?", highlights: ["Qwen3-Coder 3B 벤치마크 분석", "Claude Code Agent Teams 심층 리뷰", "주간 SWE-bench 변동"], readers: 2840 },
  { num: 11, date: "2026-03-17", title: "Cursor 2.0 vs Claude Code: 멀티에이전트 전쟁", highlights: ["Background Agent 비교 테스트", "DeepSeek API 추가 인하", "Terminal-Bench 2.0 결과"], readers: 3120 },
  { num: 10, date: "2026-03-10", title: "OpenAI Codex CLI 오픈소스 공개 특집", highlights: ["Codex CLI 아키텍처 분석", "Claude Code와 비교", "오픈소스 코딩 에이전트 동향"], readers: 4250 },
  { num: 9, date: "2026-03-03", title: "2월 벤치마크 총결산: 누가 1위?", highlights: ["SWE-bench Pro 2월 결과", "LiveCodeBench 업데이트", "비용 효율성 랭킹"], readers: 2680 },
  { num: 8, date: "2026-02-24", title: "Claude Opus 4.6 출시 특집", highlights: ["1M 컨텍스트 실사용 테스트", "Agent Teams 활용 가이드", "가격 분석"], readers: 5100 },
];

export default function NewsletterPage() {
  return (
    <div className="min-h-screen"><Navbar />
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <div className="badge badge-green mono mb-2">WEEKLY</div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>주간 뉴스레터</h1>
          <p className="mt-1 text-[13px]" style={{ color: 'var(--text-secondary)' }}>매주 월요일, AI 코딩 에이전트의 최신 벤치마크와 트렌드를 배달합니다</p>
        </div>

        {/* Subscribe CTA */}
        <div className="card p-6 mb-8" style={{ borderColor: 'var(--accent-cyan-dim)' }}>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <h2 className="text-[16px] font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>구독하기</h2>
              <p className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>3,000+ 개발자가 받아보는 AI 에이전트 뉴스레터</p>
            </div>
            <div className="flex gap-2">
              <input type="email" placeholder="이메일 주소" className="rounded-md px-4 py-2.5 text-[13px] w-64 focus:outline-none"
                style={{ background: 'var(--bg-base)', border: '1px solid var(--border-dim)', color: 'var(--text-primary)' }} />
              <button className="rounded-md px-5 py-2.5 text-[13px] font-semibold" style={{ background: 'var(--accent-cyan-dim)', color: 'var(--accent-cyan)' }}>구독</button>
            </div>
          </div>
        </div>

        {/* Archive */}
        <h2 className="text-[15px] font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>아카이브</h2>
        <div className="space-y-3">
          {issues.map((issue, i) => (
            <div key={issue.num} className={`card p-5 animate-fade-up stagger-${Math.min(i + 1, 6)} cursor-pointer group`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="mono text-[12px] font-bold" style={{ color: 'var(--accent-cyan)' }}>#{issue.num}</span>
                    <span className="mono text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{issue.date}</span>
                    <span className="mono text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{issue.readers.toLocaleString()} readers</span>
                  </div>
                  <h3 className="text-[15px] font-semibold mb-2 group-hover:underline" style={{ color: 'var(--text-primary)' }}>{issue.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {issue.highlights.map(h => (
                      <span key={h} className="badge badge-neutral text-[10px]">{h}</span>
                    ))}
                  </div>
                </div>
                <span className="text-[14px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent-cyan)' }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
