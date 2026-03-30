import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "가격 비교 | AgentRank",
  description: "AI 모델 및 코딩 도구 가격 비교. 토큰당 비용, 구독 플랜, 무료 티어를 한눈에 비교해 최적의 비용 효율 솔루션을 찾으세요.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
