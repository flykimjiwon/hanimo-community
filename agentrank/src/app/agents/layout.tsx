import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "에이전트 도구 비교 | AgentRank",
  description: "Cursor, Copilot, Devin 등 AI 코딩 에이전트 도구를 기능·가격·성능 기준으로 비교 분석합니다. 최적의 코딩 에이전트를 선택하세요.",
};

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
