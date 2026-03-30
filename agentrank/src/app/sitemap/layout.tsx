import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사이트맵 | AgentRank",
  description: "AgentRank 전체 페이지 사이트맵. 리더보드, 모델 비교, 에이전트 도구, 커뮤니티 등 모든 섹션을 한눈에 탐색하세요.",
};

export default function SitemapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
