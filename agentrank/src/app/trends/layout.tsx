import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 트렌드 | AgentRank",
  description: "AI 코딩 도구의 최신 트렌드와 성능 변화 타임라인. 모델 업데이트 히스토리와 벤치마크 추이를 시각적으로 확인하세요.",
};

export default function TrendsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
