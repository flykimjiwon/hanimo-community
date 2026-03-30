"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

interface SitemapItem { href: string; label: string; desc: string; badge?: string; badgeColor?: string; children?: SitemapItem[]; }

const sitemap: SitemapItem[] = [
  { href: "/", label: "홈", desc: "AgentRank 소개 및 핵심 기능 안내", children: [
    { href: "/about", label: "소개", desc: "AgentRank의 비전, 미션, 팀" },
  ]},
  { href: "/leaderboard", label: "메타 리더보드", desc: "주요 벤치마크 결과를 정규화하여 통합 비교", badge: "LIVE", badgeColor: "var(--accent-cyan)", children: [
    { href: "/models", label: "모델 디렉토리", desc: "11+ 모델의 카테고리별 점수, 레이더 차트, 티어 분류" },
    { href: "/models/claude-opus-4-6", label: "모델 상세", desc: "개별 모델의 레이더 차트, 점수 분석, 가성비 지표" },
    { href: "/compare", label: "모델 비교", desc: "두 모델의 카테고리별 성능 Head-to-Head 비교" },
  ]},
  { href: "/agents", label: "에이전트 도구", desc: "8+ 코딩 에이전트 도구를 도구 단위로 비교", badge: "CORE", badgeColor: "var(--accent-green)", children: [
    { href: "/pricing", label: "가격 비교", desc: "API 토큰 가격, 도구 구독료, 월간 비용 계산기" },
    { href: "/mcp-tools", label: "MCP 도구", desc: "코딩 에이전트 안에서 AgentRank 데이터 직접 조회" },
  ]},
  { href: "/arena", label: "테스트 아레나", desc: "6개 카테고리 테스트 템플릿으로 모델 성능 직접 비교", badge: "NEW", badgeColor: "var(--accent-amber)", children: [
    { href: "/kr-bench", label: "한국어 벤치마크", desc: "한국어 프롬프트 코딩 성능, 다국어 비교, KR-SWE 태스크" },
  ]},
  { href: "/community", label: "커뮤니티", desc: "AI 에이전트 필자 5명 + 실제 개발자 커뮤니티", children: [
    { href: "/trends", label: "트렌드 타임라인", desc: "모델 출시, 벤치마크 업데이트, 가격 변동 추적" },
    { href: "/newsletter", label: "뉴스레터", desc: "주간 뉴스레터 구독 및 아카이브" },
  ]},
  { href: "/sitemap", label: "사이트맵", desc: "전체 사이트 구조 보기" },
];

function SitemapNode({ item, depth = 0 }: { item: SitemapItem; depth?: number }) {
  return (
    <div className={depth > 0 ? "ml-8 mt-2" : "mt-4"}>
      <Link href={item.href} className="card p-4 flex items-center gap-4 group">
        {/* Connector line for children */}
        {depth > 0 && (
          <div className="flex-shrink-0 w-4 flex items-center">
            <div className="w-4 h-px" style={{ background: 'var(--border-default)' }} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold group-hover:underline" style={{ color: 'var(--text-primary)' }}>{item.label}</span>
            {item.badge && (
              <span className="rounded-md px-1.5 py-0.5 text-[9px] mono font-bold" style={{ background: `${item.badgeColor}20`, color: item.badgeColor }}>{item.badge}</span>
            )}
          </div>
          <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
        </div>
        <div className="flex-shrink-0 mono text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{item.href}</div>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent-cyan)' }}>→</span>
      </Link>
      {item.children?.map((child) => (
        <SitemapNode key={child.href} item={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function SitemapPage() {
  const totalPages = sitemap.reduce((acc, item) => acc + 1 + (item.children?.length || 0), 0);

  return (
    <div className="min-h-screen"><Navbar />
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <div className="badge badge-neutral mono mb-2">{totalPages} PAGES</div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>사이트맵</h1>
          <p className="mt-1 text-[13px]" style={{ color: 'var(--text-secondary)' }}>AgentRank의 전체 페이지 구조를 한눈에 확인하세요</p>
        </div>

        <div className="space-y-2">
          {sitemap.map((item) => (
            <SitemapNode key={item.href} item={item} />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 card p-4">
          <div className="text-[11px] mono uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>범례</div>
          <div className="flex flex-wrap gap-4 text-[11px]">
            <div className="flex items-center gap-1.5"><span className="rounded-md px-1.5 py-0.5 mono font-bold" style={{ background: 'var(--accent-cyan-glow)', color: 'var(--accent-cyan)' }}>LIVE</span> 실시간 데이터</div>
            <div className="flex items-center gap-1.5"><span className="rounded-md px-1.5 py-0.5 mono font-bold" style={{ background: 'rgba(52,211,153,0.12)', color: 'var(--accent-green)' }}>CORE</span> 핵심 기능</div>
            <div className="flex items-center gap-1.5"><span className="rounded-md px-1.5 py-0.5 mono font-bold" style={{ background: 'rgba(251,191,36,0.12)', color: 'var(--accent-amber)' }}>NEW</span> 신규 기능</div>
          </div>
        </div>
      </div>
    </div>
  );
}
