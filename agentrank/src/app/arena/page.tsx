"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { categories, testTemplates, difficultyColors, difficultyLabels, evalDimensions } from "@/data/categories";

export default function ArenaPage() {
  const [selectedCat, setSelectedCat] = useState<string>("coding");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>("c1");

  const filtered = testTemplates.filter((t) => t.category === selectedCat);
  const activeTemplate = testTemplates.find((t) => t.id === selectedTemplate);
  const rubric = evalDimensions[selectedCat] || [];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="badge badge-cyan mono mb-2">INTERACTIVE</div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>테스트 아레나</h1>
          <p className="mt-1 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
            6개 카테고리의 테스트 템플릿으로 모델 성능을 직접 비교하세요. 결과는 자동 채점됩니다.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setSelectedCat(cat.key); setSelectedTemplate(null); }}
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-medium whitespace-nowrap transition-all"
              style={{
                background: selectedCat === cat.key ? 'var(--accent-cyan-glow)' : 'var(--bg-raised)',
                color: selectedCat === cat.key ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                border: `1px solid ${selectedCat === cat.key ? 'var(--accent-cyan-dim)' : 'var(--border-dim)'}`,
              }}
            >
              <span>{cat.icon}</span>
              {cat.label}
              <span className="mono text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{cat.templateCount}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* Template List */}
          <div className="space-y-2">
            <div className="text-[11px] mono uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
              템플릿 목록 · {filtered.length}개
            </div>
            {filtered.map((t) => {
              const dc = difficultyColors[t.difficulty];
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  className={`w-full text-left rounded-lg p-3 transition-all ${selectedTemplate === t.id ? 'card-selected' : 'card'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>{t.title}</span>
                    <span className="rounded-md px-1.5 py-0.5 text-[10px] mono" style={{ background: dc.bg, color: dc.text }}>
                      {difficultyLabels[t.difficulty]}
                    </span>
                  </div>
                  <p className="text-[11px] line-clamp-1" style={{ color: 'var(--text-tertiary)' }}>{t.description}</p>
                </button>
              );
            })}
          </div>

          {/* Template Detail + Evaluation */}
          <div>
            {activeTemplate ? (
              <div className="space-y-4">
                {/* Template Info */}
                <div className="card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{activeTemplate.title}</h2>
                    <span className="rounded-md px-2 py-0.5 text-[10px] mono" style={{ background: difficultyColors[activeTemplate.difficulty].bg, color: difficultyColors[activeTemplate.difficulty].text }}>
                      {difficultyLabels[activeTemplate.difficulty]}
                    </span>
                  </div>
                  <p className="text-[13px] mb-4" style={{ color: 'var(--text-secondary)' }}>{activeTemplate.description}</p>

                  {/* Prompt */}
                  <div className="rounded-lg p-4 mb-4" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-dim)' }}>
                    <div className="text-[10px] mono uppercase tracking-wider mb-2" style={{ color: 'var(--accent-cyan)' }}>프롬프트</div>
                    <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-primary)' }}>{activeTemplate.prompt}</p>
                  </div>

                  {/* Expected & Tags */}
                  <div className="rounded-lg p-4 mb-4" style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-dim)' }}>
                    <div className="text-[10px] mono uppercase tracking-wider mb-2" style={{ color: 'var(--accent-green)' }}>기대 결과</div>
                    <p className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>{activeTemplate.expectedBehavior}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {activeTemplate.tags.map((tag) => (
                      <span key={tag} className="badge badge-neutral text-[10px]">#{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Evaluation Rubric */}
                <div className="card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>평가 기준</h3>
                    <span className="badge badge-amber mono text-[10px]">RUBRIC</span>
                  </div>
                  <div className="space-y-3">
                    {rubric.map((dim) => (
                      <div key={dim.key} className="flex items-center gap-3">
                        <div className="w-24 flex-shrink-0">
                          <div className="text-[12px] font-medium" style={{ color: 'var(--text-primary)' }}>{dim.label}</div>
                          <div className="text-[10px] mono" style={{ color: 'var(--accent-cyan)' }}>{dim.weight}%</div>
                        </div>
                        <div className="flex-1">
                          <div className="score-bar">
                            <div className="score-bar-fill" style={{ width: `${dim.weight}%`, background: 'linear-gradient(90deg, var(--accent-cyan-dim), var(--accent-cyan))' }} />
                          </div>
                        </div>
                        <div className="w-40 flex-shrink-0 text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{dim.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Test CTA */}
                <div className="card p-6 text-center" style={{ borderColor: 'var(--accent-cyan-dim)' }}>
                  <div className="text-[13px] mb-3" style={{ color: 'var(--text-secondary)' }}>
                    이 템플릿으로 모델 성능을 비교해보세요
                  </div>
                  <div className="flex justify-center gap-3">
                    <button className="rounded-lg px-5 py-2.5 text-[13px] font-semibold transition-all" style={{ background: 'var(--accent-cyan-dim)', color: 'var(--accent-cyan)' }}>
                      테스트 시작 →
                    </button>
                    <button className="rounded-lg px-5 py-2.5 text-[13px] font-medium" style={{ border: '1px solid var(--border-dim)', color: 'var(--text-secondary)' }}>
                      결과 비교 보기
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card p-12 text-center">
                <div className="text-3xl mb-3">{categories.find(c => c.key === selectedCat)?.icon}</div>
                <p className="text-[13px]" style={{ color: 'var(--text-tertiary)' }}>왼쪽에서 템플릿을 선택하세요</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
