import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "뉴스레터 | AgentRank",
  description: "AI 코딩 트렌드 주간 뉴스레터. 최신 모델 출시, 벤치마크 결과, 도구 업데이트를 매주 받아보세요. 한국 AI 개발자를 위한 큐레이션 콘텐츠.",
};

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
