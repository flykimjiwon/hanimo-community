import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "메타 리더보드 | AgentRank",
  description: "AI 모델 벤치마크 종합 비교 리더보드. GPT-4, Claude, Gemini 등 최신 AI 모델의 코딩 성능을 SWE-bench, HumanEval 기준으로 한눈에 비교하세요.",
};

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
