"use client";

import Navbar from "@/components/Navbar";
import { modelProfiles } from "@/data/categories";

const krTasks = [
  { id: "kr1", title: "카카오 로그인 구현", stack: "Next.js + NextAuth", difficulty: "medium", description: "카카오 OAuth를 사용한 소셜 로그인 구현" },
  { id: "kr2", title: "토스 결제 연동", stack: "Next.js + Toss Payments", difficulty: "hard", description: "토스페이먼츠 API로 결제 플로우 구현" },
  { id: "kr3", title: "네이버 지도 연동", stack: "React + Naver Maps", difficulty: "medium", description: "네이버 지도 API로 맛집 마커 표시" },
  { id: "kr4", title: "한국어 챗봇 구현", stack: "NestJS + WebSocket", difficulty: "hard", description: "한국어 자연어 처리가 가능한 실시간 챗봇" },
  { id: "kr5", title: "공공데이터 API 활용", stack: "Python + FastAPI", difficulty: "easy", description: "공공데이터포털 API로 날씨 대시보드 구현" },
  { id: "kr6", title: "Spring Boot REST API", stack: "Spring Boot + JPA", difficulty: "medium", description: "게시판 CRUD API + JWT 인증" },
];

const langCompare = [
  { model: "Claude Opus 4.6", kr: 91, en: 92, jp: 85, cn: 82 },
  { model: "GPT-5.4", kr: 85, en: 93, jp: 82, cn: 80 },
  { model: "Gemini 2.5 Pro", kr: 82, en: 84, jp: 80, cn: 83 },
  { model: "DeepSeek V3.2", kr: 68, en: 80, jp: 65, cn: 90 },
  { model: "GLM-5", kr: 75, en: 74, jp: 70, cn: 95 },
  { model: "Qwen3-235B", kr: 72, en: 78, jp: 74, cn: 92 },
];

export default function KrBenchPage() {
  return (
    <div className="min-h-screen"><Navbar />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <div className="flex gap-2 mb-2">
            <span className="badge badge-amber mono">KR-SWE</span>
            <span className="badge badge-cyan mono">MULTILINGUAL</span>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>한국어/아시아 벤치마크</h1>
          <p className="mt-1 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
            한국어 프롬프트 코딩 성능, 아시아 주력 프레임워크 호환성, 다국어 비교
          </p>
        </div>

        {/* Multilingual Comparison */}
        <div className="card p-6 mb-6">
          <h2 className="text-[15px] font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>다국어 프롬프트 성능 비교</h2>
          <p className="text-[12px] mb-4" style={{ color: 'var(--text-tertiary)' }}>동일 태스크를 한국어/영어/일본어/중국어 프롬프트로 수행했을 때 성능 차이</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-dim)' }}>
                  <th className="text-left px-3 py-2 text-[11px] mono uppercase" style={{ color: 'var(--text-tertiary)' }}>모델</th>
                  {["🇰🇷 한국어", "🇺🇸 영어", "🇯🇵 일본어", "🇨🇳 중국어"].map(h => (
                    <th key={h} className="text-center px-3 py-2 text-[11px] mono" style={{ color: 'var(--text-tertiary)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {langCompare.map((row) => {
                  const max = Math.max(row.kr, row.en, row.jp, row.cn);
                  return (
                    <tr key={row.model} style={{ borderBottom: '1px solid var(--border-dim)' }}>
                      <td className="px-3 py-3 text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>{row.model}</td>
                      {[row.kr, row.en, row.jp, row.cn].map((val, i) => (
                        <td key={i} className="px-3 py-3 text-center">
                          <span className="mono text-[13px] font-medium" style={{ color: val === max ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}>{val}</span>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* KR-SWE Task Templates */}
        <div className="mb-6">
          <h2 className="text-[15px] font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>KR-SWE 태스크셋</h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {krTasks.map((task) => (
              <div key={task.id} className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>{task.title}</span>
                  <span className="badge badge-neutral text-[10px] mono">{task.difficulty}</span>
                </div>
                <p className="text-[12px] mb-2" style={{ color: 'var(--text-secondary)' }}>{task.description}</p>
                <span className="badge badge-cyan text-[10px]">{task.stack}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div className="card p-8 text-center" style={{ borderColor: 'var(--accent-amber-dim)' }}>
          <div className="text-2xl mb-2">🚧</div>
          <h3 className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>Phase 3에서 본격 가동</h3>
          <p className="text-[13px] mt-1" style={{ color: 'var(--text-secondary)' }}>Harbor 호환 자동 평가 시스템 + 50개 이상 한국어 태스크로 확장 예정</p>
        </div>
      </div>
    </div>
  );
}
