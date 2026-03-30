import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "모델 비교 | AgentRank",
  description: "AI 모델 1:1 상세 비교. 코딩 성능, 응답 속도, 비용 효율성을 직접 대조해 프로젝트에 맞는 최적 모델을 선택하세요.",
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
