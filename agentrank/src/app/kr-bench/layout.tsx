import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KR-SWE 벤치마크 | AgentRank",
  description: "한국어 코딩 벤치마크 KR-SWE. 한국어 문서와 코드 환경에서 AI 모델의 소프트웨어 엔지니어링 능력을 평가하는 국내 최초 벤치마크입니다.",
};

export default function KrBenchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
