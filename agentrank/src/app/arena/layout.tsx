import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "프롬프트 아레나 | AgentRank",
  description: "다양한 AI 모델에 동일한 프롬프트를 동시에 테스트하는 아레나. 실제 코딩 과제로 모델 성능을 직접 검증하고 비교하세요.",
};

export default function ArenaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
