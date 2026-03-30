"use client";

import Navbar from "@/components/Navbar";
import { modelProfiles } from "@/data/categories";
import { agentTools } from "@/data/mock";

export default function PricingPage() {
  const sorted = [...modelProfiles].sort((a, b) => a.pricePerMTok - b.pricePerMTok);
  const maxPrice = Math.max(...modelProfiles.map(m => m.pricePerMTok).filter(p => p > 0));

  return (
    <div className="min-h-screen"><Navbar />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <div className="badge badge-amber mono mb-2">PRICING</div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>가격 비교 & 비용 계산기</h1>
          <p className="mt-1 text-[13px]" style={{ color: 'var(--text-secondary)' }}>API 토큰 가격부터 도구 구독료까지 한눈에 비교하세요</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* API Pricing */}
          <div className="card p-6">
            <h2 className="text-[15px] font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>모델 API 가격 ($/M input tokens)</h2>
            <div className="space-y-3">
              {sorted.map((m) => (
                <div key={m.id} className="flex items-center gap-3">
                  <span className="w-32 text-[12px] truncate" style={{ color: 'var(--text-primary)' }}>{m.name}</span>
                  <div className="flex-1 score-bar" style={{ height: '10px' }}>
                    <div className="score-bar-fill" style={{
                      width: m.pricePerMTok === 0 ? '2%' : `${(m.pricePerMTok / maxPrice) * 100}%`,
                      background: m.pricePerMTok === 0 ? 'var(--accent-green)' : m.pricePerMTok <= 1 ? 'var(--accent-green)' : m.pricePerMTok <= 5 ? 'var(--accent-amber)' : 'var(--accent-rose)',
                      borderRadius: '5px'
                    }} />
                  </div>
                  <span className="w-16 text-right mono text-[13px] font-medium" style={{ color: m.pricePerMTok === 0 ? 'var(--accent-green)' : 'var(--text-primary)' }}>
                    {m.pricePerMTok === 0 ? "무료" : `$${m.pricePerMTok}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tool Subscriptions */}
          <div className="card p-6">
            <h2 className="text-[15px] font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>도구 구독료</h2>
            <div className="space-y-3">
              {agentTools.map((t) => (
                <div key={t.id} className="flex items-center gap-3 p-2 rounded-lg transition-colors" style={{ border: '1px solid var(--border-dim)' }}>
                  <span className="text-lg">{t.logo}</span>
                  <div className="flex-1">
                    <div className="text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>{t.name}</div>
                    <div className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{t.company}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-bold mono" style={{ color: 'var(--accent-amber)' }}>{t.pricing}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Calculator */}
          <div className="card p-6 lg:col-span-2">
            <h2 className="text-[15px] font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>월간 비용 계산기</h2>
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="rounded-lg p-4" style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-dim)' }}>
                <label className="text-[11px] mono uppercase" style={{ color: 'var(--text-tertiary)' }}>일일 사용량</label>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold mono" style={{ color: 'var(--text-primary)' }}>500K</span>
                  <span className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>tokens/day</span>
                </div>
                <input type="range" min="100" max="5000" defaultValue="500" className="w-full mt-2 accent-cyan-500" />
              </div>
              <div className="rounded-lg p-4" style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-dim)' }}>
                <label className="text-[11px] mono uppercase" style={{ color: 'var(--text-tertiary)' }}>주 사용일</label>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold mono" style={{ color: 'var(--text-primary)' }}>5</span>
                  <span className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>days/week</span>
                </div>
                <input type="range" min="1" max="7" defaultValue="5" className="w-full mt-2 accent-cyan-500" />
              </div>
              <div className="rounded-lg p-4" style={{ background: 'var(--accent-cyan-glow)', border: '1px solid var(--accent-cyan-dim)' }}>
                <label className="text-[11px] mono uppercase" style={{ color: 'var(--accent-cyan)' }}>예상 월간 토큰</label>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold mono" style={{ color: 'var(--accent-cyan)' }}>10M</span>
                  <span className="text-[11px]" style={{ color: 'var(--accent-cyan)' }}>tokens/month</span>
                </div>
              </div>
            </div>
            <div className="text-[11px] mono" style={{ color: 'var(--text-tertiary)' }}>* 실제 비용은 프롬프트 길이, 응답 길이, 캐싱 사용 여부에 따라 달라집니다</div>
          </div>
        </div>
      </div>
    </div>
  );
}
