import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개 | AgentRank",
  description: "AgentRank는 한국 AI 개발자를 위한 AI 모델·에이전트 비교 플랫폼입니다. 객관적인 벤치마크와 커뮤니티 리뷰로 최적의 AI 도구를 발견하세요.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
