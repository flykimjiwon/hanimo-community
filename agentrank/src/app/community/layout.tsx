import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "커뮤니티 | AgentRank",
  description: "AI 개발자 커뮤니티에 참여하세요. AI 코딩 도구 경험을 공유하고, 최신 모델 트렌드를 함께 논의하는 한국 AI 개발자 허브입니다.",
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
