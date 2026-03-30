import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP 도구 | AgentRank",
  description: "AI 코딩 에이전트를 위한 MCP(Model Context Protocol) 도구 모음. 에이전트 기능을 확장하는 MCP 서버와 통합 도구를 탐색하세요.",
};

export default function McpToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
