"use client";

import { use } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { modelProfiles, categories, tierColors, evalDimensions } from "@/data/categories";

function RadarChart({ scores, size = 240 }: { scores: Record<string, number>; size?: number }) {
  const keys = ["coding", "math", "language", "reasoning", "agent", "creative"];
  const labels = ["코딩", "수학", "언어", "추론", "에이전트", "창작"];
  const cx = size / 2, cy = size / 2, r = size / 2 - 28;
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
      <polygon points={poly} fill="var(--accent-cyan-glow-strong)" stroke="var(--accent-cyan)" strokeWidth="2" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--accent-cyan)" stroke="var(--bg-base)" strokeWidth="2" />
      ))}
      {keys.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const lx = cx + (r + 18) * Math.cos(angle);
        const ly = cy + (r + 18) * Math.sin(angle);
        return <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="var(--font-mono)">{labels[i]}</text>;
      })}
    </svg>
  );
}

export default function ModelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const model = modelProfiles.find((m) => m.id === id);

  if (!model) {
    return (
      <div className="min-h-screen"><Navbar />
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>모델을 찾을 수 없습니다</h1>
          <Link href="/models" className="mt-4 inline-block text-[13px]" style={{ color: 'var(--accent-cyan)' }}>← 모델 디렉토리로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const tc = tierColors[model.tier];
  const sortedCategories = [...categories].sort((a, b) => (model.scores[b.key] || 0) - (model.scores[a.key] || 0));

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Breadcrumb */}
        <div className="mb-6 text-[12px] mono" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/models" className="hover:underline" style={{ color: 'var(--text-tertiary)' }}>모델</Link>
          <span className="mx-2">/</span>
          <span style={{ color: 'var(--text-secondary)' }}>{model.name}</span>
        </div>

        {/* Header */}
        <div className="card p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{model.name}</h1>
                <span className="rounded-md px-2 py-0.5 text-[12px] font-bold mono" style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}>{model.tier} Tier</span>
              </div>
              <p className="text-[14px] mb-4" style={{ color: 'var(--text-secondary)' }}>{model.description}</p>
              <div className="flex flex-wrap gap-4 text-[12px] mono">
                <div><span style={{ color: 'var(--text-tertiary)' }}>제공사</span> <span style={{ color: 'var(--text-primary)' }}>{model.provider}</span></div>
                <div><span style={{ color: 'var(--text-tertiary)' }}>파라미터</span> <span style={{ color: 'var(--text-primary)' }}>{model.paramSize}</span></div>
                <div><span style={{ color: 'var(--text-tertiary)' }}>컨텍스트</span> <span style={{ color: 'var(--text-primary)' }}>{model.contextWindow}</span></div>
                <div><span style={{ color: 'var(--text-tertiary)' }}>가격</span> <span style={{ color: 'var(--accent-amber)' }}>${model.pricePerMTok}/M</span></div>
                <div><span style={{ color: 'var(--text-tertiary)' }}>출시</span> <span style={{ color: 'var(--text-primary)' }}>{model.releaseDate}</span></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mono" style={{ color: 'var(--accent-cyan)' }}>{model.overall}</div>
              <div className="text-[11px] mono" style={{ color: 'var(--text-tertiary)' }}>종합 점수</div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="space-y-6">
            {/* Radar Chart */}
            <div className="card p-6">
              <h2 className="text-[15px] font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>카테고리별 성능 레이더</h2>
              <div className="flex justify-center">
                <RadarChart scores={model.scores} />
              </div>
            </div>

            {/* Detailed Scores */}
            <div className="card p-6">
              <h2 className="text-[15px] font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>카테고리별 상세 점수</h2>
              <div className="space-y-4">
                {sortedCategories.map((cat, i) => {
                  const score = model.scores[cat.key];
                  const isTop = i === 0;
                  return (
                    <div key={cat.key}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span>{cat.icon}</span>
                          <span className="text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>{cat.label}</span>
                          {isTop && <span className="badge badge-cyan text-[9px] mono">TOP</span>}
                        </div>
                        <span className="text-[15px] font-bold mono" style={{ color: isTop ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
                          {score}<span className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>/100</span>
                        </span>
                      </div>
                      <div className="score-bar" style={{ height: '8px' }}>
                        <div className="score-bar-fill" style={{ width: `${score}%`, background: isTop ? `linear-gradient(90deg, var(--accent-cyan-dim), ${cat.color})` : 'var(--border-bright)', borderRadius: '4px' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="card p-4">
              <h3 className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>특기 분야</h3>
              <div className="text-center p-4 rounded-lg" style={{ background: 'var(--accent-cyan-glow)', border: '1px solid var(--accent-cyan-dim)' }}>
                <div className="text-3xl mb-2">{categories.find(c => c.label === model.specialty)?.icon || "⭐"}</div>
                <div className="text-[15px] font-bold" style={{ color: 'var(--accent-cyan)' }}>{model.specialty}</div>
                <div className="text-2xl font-bold mono mt-1" style={{ color: 'var(--accent-cyan)' }}>{model.specialtyScore}점</div>
              </div>
            </div>

            <div className="card p-4">
              <h3 className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>가성비 지표</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-[12px]">
                  <span style={{ color: 'var(--text-tertiary)' }}>점수/$1</span>
                  <span className="mono font-medium" style={{ color: model.pricePerMTok === 0 ? 'var(--accent-green)' : 'var(--text-primary)' }}>
                    {model.pricePerMTok === 0 ? "무료" : (model.overall / model.pricePerMTok).toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span style={{ color: 'var(--text-tertiary)' }}>월 예상 비용</span>
                  <span className="mono" style={{ color: 'var(--accent-amber)' }}>
                    {model.pricePerMTok === 0 ? "$0" : `~$${(model.pricePerMTok * 30).toFixed(0)}`}
                  </span>
                </div>
              </div>
            </div>

            <Link href="/arena" className="card p-4 block text-center group">
              <div className="text-[13px] font-medium" style={{ color: 'var(--accent-cyan)' }}>이 모델로 테스트하기 →</div>
              <div className="text-[11px] mt-1" style={{ color: 'var(--text-tertiary)' }}>아레나에서 직접 비교</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
