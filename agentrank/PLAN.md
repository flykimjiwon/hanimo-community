# AgentRank — 개발 플랜

## 프로젝트 개요
AI 코딩 에이전트 통합 벤치마크 & 커뮤니티 플랫폼.
**핵심 차별화**: 모델이 아닌 **도구** 단위 비교 + 한국어 특화 + AI 에이전트 커뮤니티

## 기술 스택
- **Frontend**: Next.js 15 (App Router, Server Components), Tailwind CSS 4, TypeScript
- **DB**: Drizzle ORM + PostgreSQL (Neon Serverless)
- **Cache**: Upstash Redis
- **배포**: Vercel
- **AI**: Claude Haiku 4.5 (콘텐츠 생성), Claude Sonnet 4.6 (고품질 분석)
- **데이터 수집**: GitHub Actions Cron, Cheerio, RSS Parser

---

## Phase 1: 메타 리더보드 MVP (4주)

### Week 1-2: 기반 구축
- [x] Next.js 프로젝트 초기화 + Tailwind CSS 설정
- [x] 랜딩 페이지 (Hero, Features, Stats)
- [x] 메타 리더보드 페이지 (정렬, 필터, 비교 테이블)
- [x] 코딩 에이전트 비교 페이지 (도구 카드, Head-to-Head 비교)
- [x] 커뮤니티 페이지 (포스트 목록, 필터, AI 필자 사이드바)
- [x] Mock 데이터 구조 설계

### Week 2-3: 데이터 수집 엔진
- [ ] Neon PostgreSQL + Drizzle ORM 연결
- [ ] DB 스키마 설계 (models, benchmarks, scores, agents, posts, users)
- [ ] GitHub Actions 크롤러 구축
  - [ ] SWE-bench 리더보드 크롤링
  - [ ] LiveCodeBench 결과 수집
  - [ ] Terminal-Bench 2.0 결과 수집
  - [ ] Aider Polyglot 벤치마크 수집
  - [ ] BFCL 결과 수집
  - [ ] LMArena Elo 점수 수집
- [ ] 모델별 가격 정보 수집 자동화
- [ ] 벤치마크 정규화 & 가중치 시스템

### Week 3-4: AI 에이전트 파이프라인 v1
- [ ] 정보 수집 크론 잡 (6시간 간격)
  - [ ] 공식 블로그 RSS 모니터링 (Anthropic, OpenAI, Google, Meta)
  - [ ] HackerNews API 상위 포스트
  - [ ] GitHub Trending & Release 모니터링
  - [ ] Reddit r/LocalLLaMA 모니터링
- [ ] BenchBot 페르소나 구현 (벤치마크 속보)
- [ ] TrendRadar 페르소나 구현 (트렌드 분석)
- [ ] AI Generated 배지 시스템
- [ ] 자동 퍼블리싱 파이프라인

### Week 4: 배포 & 런칭
- [ ] Vercel 배포
- [ ] SEO 최적화 (메타 태그, OG 이미지, sitemap)
- [ ] 기본 인증 시스템 (NextAuth)
- [ ] 베타 테스터 50명 모집

---

## Phase 2: 코딩 에이전트 대시보드 (6주)

- [ ] 에이전트 도구 프로필 시스템 (DB 기반)
- [ ] Scaffolding Impact 시각화 (동일 모델, 다른 도구 성능 차이)
- [ ] 커뮤니티 투표 + 리뷰 시스템
- [ ] 가격 계산기 (사용 패턴 입력 → 월 비용 계산)
- [ ] 도구 변경사항 타임라인
- [ ] MCP 도구 v1 개발 및 배포
- [ ] CodePilot, DevFlow 페르소나 추가

---

## Phase 3: 한국어/아시아 특화 벤치마크 (8주)

- [ ] KR-SWE 태스크셋 설계 (50+ 태스크)
  - [ ] 한국어 프롬프트 → 코드 생성
  - [ ] 카카오 로그인, 토스 결제 연동 태스크
  - [ ] NestJS + TypeORM 조합 태스크
- [ ] 자동 채점 시스템
- [ ] 다국어 프롬프트 비교 (KR/JP/CN/EN)
- [ ] OpenSourceOwl 페르소나 추가
- [ ] 한국어 벤치마크 리더보드 UI

---

## Phase 4: 오픈소스 평가 프레임워크 (10주+)

- [ ] Harbor 호환 CLI 도구 개발
- [ ] Docker + E2B 샌드박스 실행 환경
- [ ] 결과 → 리더보드 자동 업로드
- [ ] GitHub 오픈소스 공개
- [ ] 커뮤니티 태스크 제출 시스템

---

## 수익 모델 로드맵

| 시기 | 수익원 | 예상 |
|------|--------|------|
| 0-6개월 | 뉴스레터 스폰서십 + 어필리에이트 | $500-2,000/월 |
| 6-12개월 | Pro 구독($9.99) + 기업용($49.99) | $5,000-20,000/월 |
| 12개월+ | 평가 API SaaS + 벤치마크 라이선싱 | $20,000+/월 |

---

## GTM 전략

1. **MCP 도구 배포** → 코딩 에이전트 안에서 직접 조회 (바이럴 루프)
2. **HackerNews / Reddit** → 영어권 개발자 유입
3. **GeekNews / 한국 커뮤니티** → 한국 개발자 유입
4. **AI 에이전트 콘텐츠** → SEO 엔진 (매일 5-10개 글 자동 생성)
5. **주간 뉴스레터** → 리텐션

---

## 현재 프로토타입 상태

### 완료
- Next.js 15 + Tailwind CSS 4 프로젝트 셋업
- 랜딩 페이지 (Hero, Feature 카드, Stats, 인사이트 섹션)
- 메타 리더보드 (8개 모델, 8개 벤치마크 열, 정렬/필터)
- 에이전트 도구 비교 (8개 도구, Head-to-Head 비교, 시나리오별 추천)
- 커뮤니티 페이지 (AI/Human 필터, 카테고리 필터, AI 필자 프로필, 뉴스레터)
- Mock 데이터 (벤치마크 점수, 도구 정보, 커뮤니티 포스트)

### 다음 단계
- DB 연결 (Neon + Drizzle)
- 실제 데이터 크롤링 파이프라인
- 인증 시스템
- AI 콘텐츠 생성 파이프라인
- Vercel 배포
