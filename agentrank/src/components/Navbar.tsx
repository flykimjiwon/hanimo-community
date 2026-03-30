"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { href: "/leaderboard", label: "리더보드", children: [
    { href: "/leaderboard", label: "메타 리더보드", desc: "벤치마크 통합 비교" },
    { href: "/models", label: "모델 디렉토리", desc: "카테고리별 점수" },
    { href: "/compare", label: "모델 비교", desc: "Head-to-Head" },
  ]},
  { href: "/agents", label: "에이전트 도구", children: [
    { href: "/agents", label: "도구 비교", desc: "8+ 도구 비교" },
    { href: "/pricing", label: "가격 비교", desc: "비용 계산기" },
    { href: "/mcp-tools", label: "MCP 도구", desc: "에이전트 내 조회" },
  ]},
  { href: "/arena", label: "아레나", children: [
    { href: "/arena", label: "테스트 아레나", desc: "6개 카테고리 테스트" },
    { href: "/kr-bench", label: "한국어 벤치마크", desc: "KR-SWE 태스크셋" },
  ]},
  { href: "/community", label: "커뮤니티", children: [
    { href: "/community", label: "커뮤니티", desc: "AI 필자 + 개발자" },
    { href: "/trends", label: "트렌드 타임라인", desc: "이벤트 추적" },
    { href: "/newsletter", label: "뉴스레터", desc: "주간 배달" },
  ]},
];

const sitemapGroups = [
  { title: "벤치마크", items: [
    { href: "/leaderboard", label: "메타 리더보드", badge: "LIVE" },
    { href: "/models", label: "모델 디렉토리" },
    { href: "/compare", label: "모델 비교" },
  ]},
  { title: "에이전트", items: [
    { href: "/agents", label: "도구 비교", badge: "CORE" },
    { href: "/pricing", label: "가격 비교" },
    { href: "/mcp-tools", label: "MCP 도구" },
  ]},
  { title: "테스트", items: [
    { href: "/arena", label: "테스트 아레나", badge: "NEW" },
    { href: "/kr-bench", label: "한국어 벤치마크" },
  ]},
  { title: "커뮤니티", items: [
    { href: "/community", label: "커뮤니티" },
    { href: "/trends", label: "트렌드 타임라인" },
    { href: "/newsletter", label: "뉴스레터" },
  ]},
  { title: "기타", items: [
    { href: "/about", label: "소개" },
  ]},
];

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} aria-label="테마 전환"
      className="relative flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200"
      style={{ border: '1px solid var(--border-dim)', background: 'var(--bg-surface)' }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="absolute transition-all duration-300"
        style={{ opacity: theme === "dark" ? 1 : 0, transform: theme === "dark" ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)", color: "var(--accent-amber)" }}>
        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 1.5V3M8 13V14.5M1.5 8H3M13 8H14.5M3.4 3.4L4.5 4.5M11.5 11.5L12.6 12.6M3.4 12.6L4.5 11.5M11.5 4.5L12.6 3.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="absolute transition-all duration-300"
        style={{ opacity: theme === "light" ? 1 : 0, transform: theme === "light" ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0)", color: "var(--accent-cyan)" }}>
        <path d="M14 9.5A6.5 6.5 0 016.5 2 5.5 5.5 0 1014 9.5z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
  );
}

function SitemapModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", handler);
      return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handler); };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.6)' }} />

      {/* Modal */}
      <div
        className="relative rounded-2xl shadow-2xl w-full max-w-2xl mx-4 animate-fade-up"
        style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-dim)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top line */}
        <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-cyan), transparent)', opacity: 0.5 }} />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border-dim)' }}>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" stroke="var(--accent-cyan)" strokeWidth="1.2" />
              <rect x="8" y="1" width="5" height="5" rx="1" stroke="var(--accent-cyan)" strokeWidth="1.2" />
              <rect x="1" y="8" width="5" height="5" rx="1" stroke="var(--accent-cyan)" strokeWidth="1.2" />
              <rect x="8" y="8" width="5" height="5" rx="1" stroke="var(--accent-cyan)" strokeWidth="1.2" />
            </svg>
            <span className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>사이트맵</span>
            <span className="badge badge-neutral mono text-[9px]">18 PAGES</span>
          </div>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-md transition-colors"
            style={{ border: '1px solid var(--border-dim)' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2L10 10M10 2L2 10" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-4 p-6 md:grid-cols-5">
          {sitemapGroups.map((group) => (
            <div key={group.title}>
              <div className="text-[10px] mono uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-tertiary)' }}>
                {group.title}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[12px] font-medium transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--accent-cyan)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="rounded px-1 py-0.5 text-[8px] mono font-bold"
                        style={{
                          background: item.badge === 'LIVE' ? 'var(--accent-cyan-glow)' : item.badge === 'CORE' ? 'rgba(52,211,153,0.12)' : 'rgba(251,191,36,0.12)',
                          color: item.badge === 'LIVE' ? 'var(--accent-cyan)' : item.badge === 'CORE' ? 'var(--accent-green)' : 'var(--accent-amber)',
                        }}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer shortcut hint */}
        <div className="px-6 py-3 text-center" style={{ borderTop: '1px solid var(--border-dim)' }}>
          <span className="text-[10px] mono" style={{ color: 'var(--text-tertiary)' }}>
            ESC로 닫기
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [sitemapOpen, setSitemapOpen] = useState(false);

  const isActive = (href: string, children?: { href: string }[]) => {
    if (pathname === href) return true;
    return children?.some(c => pathname.startsWith(c.href)) || false;
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ borderColor: 'var(--border-dim)', background: 'var(--nav-bg)' }}>
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex h-7 w-7 items-center justify-center rounded-md" style={{ background: 'var(--accent-cyan-glow)', border: '1px solid var(--accent-cyan-dim)' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:scale-110">
                <path d="M7 1L12.5 4.5V9.5L7 13L1.5 9.5V4.5L7 1Z" stroke="var(--accent-cyan)" strokeWidth="1.5" fill="none" />
                <circle cx="7" cy="7" r="2" fill="var(--accent-cyan)" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Agent<span style={{ color: 'var(--accent-cyan)' }}>Rank</span>
            </span>
          </Link>

          {/* Nav links with dropdowns */}
          <div className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const active = isActive(item.href, item.children);
              return (
                <div key={item.href} className="relative"
                  onMouseEnter={() => setOpenMenu(item.href)}
                  onMouseLeave={() => setOpenMenu(null)}>
                  <Link href={item.href}
                    className="flex items-center gap-1 rounded-md px-3 py-1.5 text-[13px] font-medium transition-all duration-200"
                    style={{ color: active ? 'var(--accent-cyan)' : 'var(--text-secondary)', background: active ? 'var(--accent-cyan-glow)' : 'transparent' }}>
                    {item.label}
                    {item.children && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.5 }}>
                        <path d="M3 4L5 6L7 4" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    )}
                  </Link>

                  {item.children && openMenu === item.href && (
                    <div className="absolute top-full left-0 pt-1 z-50" style={{ minWidth: '220px' }}>
                      <div className="rounded-lg p-1.5 shadow-xl" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-dim)' }}>
                        {item.children.map((child) => (
                          <Link key={child.href} href={child.href}
                            className="flex flex-col rounded-md px-3 py-2 transition-colors"
                            style={{ color: pathname === child.href ? 'var(--accent-cyan)' : 'var(--text-primary)' }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                            <span className="text-[13px] font-medium">{child.label}</span>
                            <span className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{child.desc}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Sitemap modal trigger */}
            <button
              onClick={() => setSitemapOpen(true)}
              className="rounded-md px-2.5 py-1.5 transition-all"
              style={{ color: 'var(--text-tertiary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-tertiary)'}
              aria-label="사이트맵 열기"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-colors"
              style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-dim)' }}>로그인</button>
            <button className="rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-all"
              style={{ background: 'var(--accent-cyan-dim)', color: 'var(--accent-cyan)', border: '1px solid var(--accent-cyan-dim)' }}>회원가입</button>
          </div>
        </div>
      </nav>

      {/* Sitemap Modal */}
      <SitemapModal open={sitemapOpen} onClose={() => setSitemapOpen(false)} />
    </>
  );
}
