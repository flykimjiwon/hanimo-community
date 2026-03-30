import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "모델 프로필 | AgentRank",
  description: "GPT-4o, Claude 3.5, Gemini 1.5 등 주요 AI 모델의 상세 프로필. 컨텍스트 길이, 가격, 벤치마크 점수, 강점을 한곳에서 확인하세요.",
};

export default function ModelsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
