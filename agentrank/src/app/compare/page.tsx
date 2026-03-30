"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { modelProfiles, categories, tierColors } from "@/data/categories";

export default function ComparePage() {
  const [modelA, setModelA] = useState("claude-opus-4-6");
  const [modelB, setModelB] = useState("gpt-5-4");
  const a = modelProfiles.find(m => m.id === modelA);
  const b = modelProfiles.find(m => m.id === modelB);

  return (
    <div className="min-h-screen"><Navbar />
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <div className="badge badge-cyan mono mb-2">HEAD-TO-HEAD</div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>모델 비교</h1>
          <p className="mt-1 text-[13px]" style={{ color: 'var(--text-secondary)' }}>두 모델을 선택하여 카테고리별 성능을 직접 비교하세요</p>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[{ val: modelA, set: setModelA, label: "모델 A" }, { val: modelB, set: setModelB, label: "모델 B" }].map((sel) => (
            <div key={sel.label}>
              <div className="text-[11px] mono uppercase mb-2" style={{ color: 'var(--text-tertiary)' }}>{sel.label}</div>
              <select value={sel.val} onChange={e => sel.set(e.target.value)}
                className="w-full rounded-lg px-4 py-3 text-[14px] font-medium focus:outline-none"
                style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-dim)', color: 'var(--text-primary)' }}>
                {modelProfiles.map(m => <option key={m.id} value={m.id}>{m.name} ({m.provider})</option>)}
              </select>
            </div>
          ))}
        </div>

        {a && b && (
          <div className="space-y-4">
            {/* Overall */}
            <div className="card p-6">
              <div className="grid grid-cols-3 text-center">
                <div>
                  <div className="text-4xl font-bold mono" style={{ color: a.overall >= b.overall ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}>{a.overall}</div>
                  <div className="text-[13px] font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>{a.name}</div>
                  <span className="mono text-[11px] rounded-md px-1.5 py-0.5" style={{ ...tierColors[a.tier] }}>{a.tier}</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-[15px] font-bold mono" style={{ color: 'var(--text-tertiary)' }}>VS</span>
                </div>
                <div>
                  <div className="text-4xl font-bold mono" style={{ color: b.overall >= a.overall ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}>{b.overall}</div>
                  <div className="text-[13px] font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>{b.name}</div>
                  <span className="mono text-[11px] rounded-md px-1.5 py-0.5" style={{ ...tierColors[b.tier] }}>{b.tier}</span>
                </div>
              </div>
            </div>

            {/* Category Bars */}
            <div className="card p-6">
              <h2 className="text-[15px] font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>카테고리별 비교</h2>
              <div className="space-y-5">
                {categories.map((cat) => {
                  const sa = a.scores[cat.key], sb = b.scores[cat.key];
                  const aWin = sa > sb, bWin = sb > sa;
                  return (
                    <div key={cat.key}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="mono text-[14px] font-medium" style={{ color: aWin ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}>{sa}</span>
                        <span className="text-[12px] font-medium" style={{ color: 'var(--text-primary)' }}>{cat.icon} {cat.label}</span>
                        <span className="mono text-[14px] font-medium" style={{ color: bWin ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}>{sb}</span>
                      </div>
                      <div className="flex gap-1 h-2">
                        <div className="flex-1 rounded-l-full overflow-hidden" style={{ background: 'var(--bg-hover)' }}>
                          <div className="h-full rounded-l-full float-right" style={{ width: `${sa}%`, background: aWin ? 'var(--accent-cyan)' : 'var(--border-bright)' }} />
                        </div>
                        <div className="flex-1 rounded-r-full overflow-hidden" style={{ background: 'var(--bg-hover)' }}>
                          <div className="h-full rounded-r-full" style={{ width: `${sb}%`, background: bWin ? 'var(--accent-cyan)' : 'var(--border-bright)' }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Meta comparison */}
            <div className="card p-6">
              <h2 className="text-[15px] font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>사양 비교</h2>
              {[
                { label: "가격", av: `$${a.pricePerMTok}/M`, bv: `$${b.pricePerMTok}/M` },
                { label: "컨텍스트", av: a.contextWindow, bv: b.contextWindow },
                { label: "파라미터", av: a.paramSize, bv: b.paramSize },
                { label: "특기", av: a.specialty, bv: b.specialty },
                { label: "출시", av: a.releaseDate, bv: b.releaseDate },
              ].map(row => (
                <div key={row.label} className="grid grid-cols-3 py-2" style={{ borderBottom: '1px solid var(--border-dim)' }}>
                  <div className="text-[13px] text-center" style={{ color: 'var(--text-secondary)' }}>{row.av}</div>
                  <div className="text-[11px] mono text-center" style={{ color: 'var(--text-tertiary)' }}>{row.label}</div>
                  <div className="text-[13px] text-center" style={{ color: 'var(--text-secondary)' }}>{row.bv}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
