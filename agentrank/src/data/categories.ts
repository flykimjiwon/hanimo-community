// ============================================================
// AgentRank — Category Scoring & Test Templates
// ============================================================

export interface CategoryScore {
  [key: string]: number;
  coding: number;
  math: number;
  language: number;
  reasoning: number;
  agent: number;
  creative: number;
}

export interface ModelProfile {
  id: string;
  name: string;
  provider: string;
  paramSize: string;
  contextWindow: string;
  pricePerMTok: number;
  scores: CategoryScore;
  overall: number;
  specialty: string; // best category
  specialtyScore: number;
  tier: "S" | "A" | "B" | "C";
  description: string;
  releaseDate: string;
}

export interface TestTemplate {
  id: string;
  category: keyof CategoryScore;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard" | "expert";
  prompt: string;
  expectedBehavior: string;
  evaluationCriteria: string[];
  tags: string[];
}

export interface ArenaCategory {
  key: string;
  label: string;
  labelEn: string;
  icon: string;
  color: string;
  description: string;
  templateCount: number;
}

// --- Category Definitions ---
export const categories: ArenaCategory[] = [
  { key: "coding", label: "코딩", labelEn: "Coding", icon: "⌨️", color: "var(--accent-cyan)", description: "코드 생성, 디버깅, 리팩토링, 알고리즘 구현", templateCount: 24 },
  { key: "math", label: "수학", labelEn: "Math", icon: "🧮", color: "var(--accent-green)", description: "수학 문제 풀이, 증명, 통계, 최적화", templateCount: 18 },
  { key: "language", label: "언어", labelEn: "Language", icon: "🌐", color: "var(--accent-amber)", description: "번역, 요약, 글쓰기, 다국어 처리", templateCount: 20 },
  { key: "reasoning", label: "추론", labelEn: "Reasoning", icon: "🧠", color: "var(--accent-rose)", description: "논리적 추론, 인과관계, 복잡한 의사결정", templateCount: 16 },
  { key: "agent", label: "에이전트", labelEn: "Agent", icon: "🤖", color: "#a78bfa", description: "도구 사용, 멀티스텝 작업, 자율 실행", templateCount: 14 },
  { key: "creative", label: "창작", labelEn: "Creative", icon: "🎨", color: "#f472b6", description: "스토리텔링, 아이디어 생성, 콘텐츠 기획", templateCount: 12 },
];

// --- Model Profiles with Category Scores ---
export const modelProfiles: ModelProfile[] = [
  {
    id: "claude-opus-4-6",
    name: "Claude Opus 4.6",
    provider: "Anthropic",
    paramSize: "비공개",
    contextWindow: "1M",
    pricePerMTok: 15.0,
    scores: { coding: 92, math: 85, language: 90, reasoning: 94, agent: 96, creative: 88 },
    overall: 91,
    specialty: "에이전트",
    specialtyScore: 96,
    tier: "S",
    description: "최고 수준의 추론과 에이전트 능력. 복잡한 멀티스텝 작업에서 탁월.",
    releaseDate: "2026-02",
  },
  {
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6",
    provider: "Anthropic",
    paramSize: "비공개",
    contextWindow: "1M",
    pricePerMTok: 3.0,
    scores: { coding: 86, math: 78, language: 85, reasoning: 84, agent: 88, creative: 82 },
    overall: 84,
    specialty: "에이전트",
    specialtyScore: 88,
    tier: "A",
    description: "가격 대비 뛰어난 성능. 일상 코딩과 에이전트 작업에 최적.",
    releaseDate: "2026-02",
  },
  {
    id: "gpt-5-4",
    name: "GPT-5.4",
    provider: "OpenAI",
    paramSize: "비공개",
    contextWindow: "256K",
    pricePerMTok: 10.0,
    scores: { coding: 88, math: 90, language: 92, reasoning: 91, agent: 85, creative: 93 },
    overall: 90,
    specialty: "창작",
    specialtyScore: 93,
    tier: "S",
    description: "균형 잡힌 최상위 모델. 특히 창작과 언어 능력이 뛰어남.",
    releaseDate: "2026-01",
  },
  {
    id: "gpt-4-1",
    name: "GPT-4.1",
    provider: "OpenAI",
    paramSize: "비공개",
    contextWindow: "1M",
    pricePerMTok: 2.0,
    scores: { coding: 75, math: 72, language: 80, reasoning: 74, agent: 70, creative: 78 },
    overall: 75,
    specialty: "언어",
    specialtyScore: 80,
    tier: "B",
    description: "긴 컨텍스트와 합리적 가격. 대량 문서 처리에 적합.",
    releaseDate: "2025-04",
  },
  {
    id: "gemini-2-5-pro",
    name: "Gemini 2.5 Pro",
    provider: "Google",
    paramSize: "비공개",
    contextWindow: "1M",
    pricePerMTok: 1.25,
    scores: { coding: 84, math: 88, language: 82, reasoning: 86, agent: 80, creative: 79 },
    overall: 83,
    specialty: "수학",
    specialtyScore: 88,
    tier: "A",
    description: "수학과 추론에 강점. 가격 대비 성능이 매우 우수.",
    releaseDate: "2025-12",
  },
  {
    id: "deepseek-v3-2",
    name: "DeepSeek V3.2",
    provider: "DeepSeek",
    paramSize: "685B (37B active)",
    contextWindow: "128K",
    pricePerMTok: 0.27,
    scores: { coding: 80, math: 86, language: 70, reasoning: 82, agent: 68, creative: 65 },
    overall: 75,
    specialty: "수학",
    specialtyScore: 86,
    tier: "A",
    description: "극강의 가성비. 수학과 코딩에서 유료 모델과 대등.",
    releaseDate: "2026-01",
  },
  {
    id: "qwen3-235b",
    name: "Qwen3-235B",
    provider: "Alibaba",
    paramSize: "235B (22B active)",
    contextWindow: "128K",
    pricePerMTok: 0.8,
    scores: { coding: 78, math: 84, language: 76, reasoning: 80, agent: 65, creative: 70 },
    overall: 76,
    specialty: "수학",
    specialtyScore: 84,
    tier: "B",
    description: "MoE 아키텍처로 효율적. 수학·코딩에서 강점.",
    releaseDate: "2025-09",
  },
  {
    id: "glm-5",
    name: "GLM-5",
    provider: "Zhipu AI",
    paramSize: "비공개",
    contextWindow: "128K",
    pricePerMTok: 0.5,
    scores: { coding: 74, math: 78, language: 82, reasoning: 76, agent: 60, creative: 72 },
    overall: 74,
    specialty: "언어",
    specialtyScore: 82,
    tier: "B",
    description: "중국어·아시아 언어에서 뛰어난 성능. SWE-bench Pro 1위.",
    releaseDate: "2026-01",
  },
  {
    id: "llama-4-maverick",
    name: "Llama 4 Maverick",
    provider: "Meta",
    paramSize: "400B (17B active)",
    contextWindow: "1M",
    pricePerMTok: 0.0,
    scores: { coding: 72, math: 70, language: 74, reasoning: 71, agent: 58, creative: 68 },
    overall: 69,
    specialty: "언어",
    specialtyScore: 74,
    tier: "B",
    description: "오픈소스 최강. 무료로 사용 가능한 대규모 MoE 모델.",
    releaseDate: "2025-04",
  },
  {
    id: "phi-4-mini",
    name: "Phi-4 Mini",
    provider: "Microsoft",
    paramSize: "3.8B",
    contextWindow: "128K",
    pricePerMTok: 0.0,
    scores: { coding: 68, math: 82, language: 55, reasoning: 72, agent: 40, creative: 50 },
    overall: 61,
    specialty: "수학",
    specialtyScore: 82,
    tier: "C",
    description: "3.8B 파라미터로 수학에서 10배 큰 모델과 대등. 엣지 디바이스에 최적.",
    releaseDate: "2025-02",
  },
  {
    id: "qwen3-coder-3b",
    name: "Qwen3-Coder 3B",
    provider: "Alibaba",
    paramSize: "3B",
    contextWindow: "32K",
    pricePerMTok: 0.0,
    scores: { coding: 75, math: 60, language: 48, reasoning: 55, agent: 42, creative: 40 },
    overall: 53,
    specialty: "코딩",
    specialtyScore: 75,
    tier: "C",
    description: "3B 파라미터로 코딩 특화. SWE-bench에서 10-20배 큰 모델과 비슷.",
    releaseDate: "2026-03",
  },
];

// --- Test Templates ---
export const testTemplates: TestTemplate[] = [
  // Coding
  { id: "c1", category: "coding", title: "REST API 서버 구현", description: "Express.js로 CRUD REST API를 구현하세요", difficulty: "medium", prompt: "Node.js + Express로 TODO 앱 REST API를 만들어줘. GET/POST/PUT/DELETE 엔드포인트, 에러 핸들링, 입력 검증 포함.", expectedBehavior: "동작하는 REST API 서버 코드 + 미들웨어", evaluationCriteria: ["코드 정확성", "에러 핸들링", "API 설계 품질", "타입 안전성"], tags: ["Node.js", "Express", "REST API"] },
  { id: "c2", category: "coding", title: "알고리즘: 최단 경로", description: "다익스트라 알고리즘을 구현하세요", difficulty: "hard", prompt: "가중 그래프에서 다익스트라 알고리즘을 Python으로 구현해줘. 우선순위 큐 사용, 경로 추적 포함.", expectedBehavior: "정확한 최단 경로 계산 + 시간 복잡도 설명", evaluationCriteria: ["알고리즘 정확성", "시간 복잡도", "코드 가독성", "엣지 케이스 처리"], tags: ["Python", "알고리즘", "그래프"] },
  { id: "c3", category: "coding", title: "React 컴포넌트 리팩토링", description: "복잡한 React 컴포넌트를 분리하세요", difficulty: "medium", prompt: "이 500줄짜리 React 컴포넌트를 적절한 크기의 하위 컴포넌트로 분리하고, 커스텀 훅을 추출해줘.", expectedBehavior: "분리된 컴포넌트 + 커스텀 훅 + 타입 정의", evaluationCriteria: ["컴포넌트 분리 적절성", "재사용성", "상태 관리", "성능 고려"], tags: ["React", "리팩토링", "TypeScript"] },
  { id: "c4", category: "coding", title: "디버깅: 메모리 누수", description: "Node.js 앱의 메모리 누수를 찾으세요", difficulty: "expert", prompt: "이 Node.js 서버에서 메모리 사용량이 계속 증가합니다. 원인을 찾고 수정해주세요.", expectedBehavior: "누수 원인 파악 + 수정 코드 + 예방 방법", evaluationCriteria: ["원인 진단 정확성", "수정의 완전성", "설명의 명확성", "예방책 제시"], tags: ["Node.js", "디버깅", "메모리"] },

  // Math
  { id: "m1", category: "math", title: "확률 계산", description: "조건부 확률 문제를 풀어보세요", difficulty: "medium", prompt: "공장 3곳에서 부품을 생산합니다. A(50%), B(30%), C(20%). 불량률은 각각 1%, 2%, 3%입니다. 무작위 부품이 불량일 때, B 공장에서 만들어졌을 확률은?", expectedBehavior: "베이즈 정리 적용 + 단계별 풀이", evaluationCriteria: ["정답 정확성", "풀이 과정", "수학적 표현", "베이즈 정리 이해"], tags: ["확률", "베이즈", "통계"] },
  { id: "m2", category: "math", title: "미적분 응용", description: "최적화 문제를 미적분으로 풀어보세요", difficulty: "hard", prompt: "반지름 r인 원에 내접하는 직사각형 중 넓이가 최대인 것의 가로, 세로 길이를 구하세요.", expectedBehavior: "미분을 이용한 최적화 풀이", evaluationCriteria: ["정답 정확성", "미분 과정", "증명 완전성", "기하학적 해석"], tags: ["미적분", "최적화", "기하"] },
  { id: "m3", category: "math", title: "선형대수: 고유값", description: "행렬의 고유값과 고유벡터를 구하세요", difficulty: "hard", prompt: "3x3 행렬 A = [[2,1,0],[1,3,1],[0,1,2]]의 고유값과 고유벡터를 모두 구하세요.", expectedBehavior: "특성 방정식 풀이 + 고유벡터 계산", evaluationCriteria: ["정답 정확성", "풀이 과정", "고유벡터 정규화", "검증"], tags: ["선형대수", "고유값", "행렬"] },

  // Language
  { id: "l1", category: "language", title: "한→영 기술 문서 번역", description: "기술 문서를 자연스러운 영어로 번역하세요", difficulty: "medium", prompt: "다음 한국어 기술 블로그 글을 자연스러운 영어로 번역해주세요. 기술 용어는 원어를 유지하되, 문체는 Hacker News 스타일로.", expectedBehavior: "자연스러운 영어 번역 + 기술 용어 정확성", evaluationCriteria: ["번역 정확성", "자연스러운 문체", "기술 용어 처리", "문화적 적절성"], tags: ["번역", "한국어", "영어"] },
  { id: "l2", category: "language", title: "논문 요약", description: "학술 논문을 3문장으로 요약하세요", difficulty: "medium", prompt: "이 arXiv 논문의 Abstract와 Conclusion을 읽고, 핵심 기여를 비전문가도 이해할 수 있게 3문장으로 요약해주세요.", expectedBehavior: "정확하고 간결한 3문장 요약", evaluationCriteria: ["핵심 파악 정확성", "간결성", "비전문가 이해도", "정보 왜곡 없음"], tags: ["요약", "논문", "학술"] },
  { id: "l3", category: "language", title: "다국어 감정 분석", description: "여러 언어의 감정을 분석하세요", difficulty: "hard", prompt: "한국어, 영어, 일본어로 된 리뷰 10개의 감정(긍정/부정/중립)을 분석하고 신뢰도와 함께 JSON으로 출력해주세요.", expectedBehavior: "정확한 감정 분류 + 신뢰도 점수", evaluationCriteria: ["감정 분류 정확성", "다국어 처리", "출력 포맷", "신뢰도 적절성"], tags: ["NLP", "감정분석", "다국어"] },

  // Reasoning
  { id: "r1", category: "reasoning", title: "논리 퍼즐", description: "복잡한 논리 퍼즐을 풀어보세요", difficulty: "hard", prompt: "A, B, C, D, E 5명이 원형 테이블에 앉습니다. 조건: A는 B 옆에 못 앉음, C는 D 바로 오른쪽, E는 A와 C 사이. 가능한 배치를 모두 구하세요.", expectedBehavior: "체계적 추론 + 모든 해 도출", evaluationCriteria: ["정답 완전성", "추론 과정", "체계적 접근", "반례 검증"], tags: ["논리", "퍼즐", "조합"] },
  { id: "r2", category: "reasoning", title: "인과관계 추론", description: "데이터에서 인과관계를 파악하세요", difficulty: "expert", prompt: "아이스크림 판매량과 익사 사고가 양의 상관관계를 보입니다. 이 관계를 분석하고, 가능한 인과 모델을 3개 제시하고, 각각을 검증할 실험을 설계해주세요.", expectedBehavior: "교란 변수 파악 + 인과 모델 + 실험 설계", evaluationCriteria: ["인과 추론 정확성", "교란 변수 파악", "실험 설계 타당성", "반사실 분석"], tags: ["인과추론", "통계", "실험설계"] },

  // Agent
  { id: "a1", category: "agent", title: "멀티스텝 작업 계획", description: "복잡한 작업을 단계별로 계획하세요", difficulty: "hard", prompt: "새로운 SaaS 제품의 랜딩 페이지를 만들어야 합니다. 디자인, 개발, 배포까지의 전체 작업을 계획하고, 각 단계의 도구, 시간, 의존성을 포함하세요.", expectedBehavior: "상세한 작업 분해 + 의존성 그래프", evaluationCriteria: ["작업 분해 적절성", "의존성 파악", "현실적 시간 추정", "도구 선택 합리성"], tags: ["작업계획", "프로젝트관리", "SaaS"] },
  { id: "a2", category: "agent", title: "도구 연쇄 사용", description: "여러 API를 조합하여 문제를 해결하세요", difficulty: "expert", prompt: "사용자가 '서울 날씨 좋은 날에 맛집 추천해줘'라고 했습니다. 날씨 API, 맛집 API, 지도 API를 조합하여 응답을 생성하는 플로우를 설계하세요.", expectedBehavior: "API 호출 순서 + 에러 핸들링 + 결과 조합", evaluationCriteria: ["API 연쇄 설계", "에러 처리", "결과 통합 품질", "사용자 경험"], tags: ["API", "도구사용", "에이전트"] },

  // Creative
  { id: "cr1", category: "creative", title: "기술 블로그 작성", description: "흥미로운 기술 블로그 글을 작성하세요", difficulty: "medium", prompt: "Next.js의 Server Components가 왜 혁신적인지 설명하는 기술 블로그 글을 작성해주세요. 비유를 활용하고, 코드 예시를 포함하세요.", expectedBehavior: "흥미로운 기술 글 + 정확한 설명 + 코드 예시", evaluationCriteria: ["기술적 정확성", "흥미도", "비유 적절성", "코드 예시 품질"], tags: ["블로그", "Next.js", "기술글"] },
  { id: "cr2", category: "creative", title: "제품 네이밍", description: "AI 제품의 이름을 5개 제안하세요", difficulty: "easy", prompt: "AI 기반 코드 리뷰 도구의 이름을 5개 제안해주세요. 각 이름의 의미, 도메인 가용성 확인 방법, 브랜딩 전략을 함께 설명해주세요.", expectedBehavior: "창의적 이름 5개 + 브랜딩 전략", evaluationCriteria: ["창의성", "기억 용이성", "브랜딩 적합성", "설명 품질"], tags: ["네이밍", "브랜딩", "마케팅"] },
];

// --- Evaluation Rubric ---
export interface EvalDimension {
  key: string;
  label: string;
  weight: number;
  description: string;
}

export const evalDimensions: Record<string, EvalDimension[]> = {
  coding: [
    { key: "correctness", label: "정확성", weight: 35, description: "코드가 올바르게 동작하는가" },
    { key: "quality", label: "코드 품질", weight: 25, description: "가독성, 구조, 네이밍, 패턴" },
    { key: "completeness", label: "완전성", weight: 20, description: "엣지 케이스, 에러 핸들링 포함" },
    { key: "efficiency", label: "효율성", weight: 10, description: "시간/공간 복잡도 최적화" },
    { key: "explanation", label: "설명력", weight: 10, description: "코드 설명과 주석의 품질" },
  ],
  math: [
    { key: "correctness", label: "정답", weight: 40, description: "최종 답이 정확한가" },
    { key: "process", label: "풀이 과정", weight: 30, description: "논리적 단계가 명확한가" },
    { key: "notation", label: "수학적 표현", weight: 15, description: "수식과 표기법이 정확한가" },
    { key: "insight", label: "통찰", weight: 15, description: "핵심 개념에 대한 이해도" },
  ],
  language: [
    { key: "accuracy", label: "정확성", weight: 30, description: "내용이 정확하고 왜곡이 없는가" },
    { key: "fluency", label: "유창성", weight: 25, description: "자연스럽고 읽기 쉬운가" },
    { key: "style", label: "문체 적합성", weight: 20, description: "요청된 톤과 스타일에 맞는가" },
    { key: "cultural", label: "문화적 적절성", weight: 15, description: "문화적 맥락을 고려했는가" },
    { key: "format", label: "형식", weight: 10, description: "출력 형식이 적절한가" },
  ],
  reasoning: [
    { key: "logic", label: "논리적 타당성", weight: 35, description: "추론 과정이 논리적인가" },
    { key: "completeness", label: "완전성", weight: 25, description: "모든 경우를 고려했는가" },
    { key: "structure", label: "구조적 접근", weight: 20, description: "체계적으로 접근했는가" },
    { key: "verification", label: "검증", weight: 20, description: "결론을 스스로 검증했는가" },
  ],
  agent: [
    { key: "planning", label: "계획 수립", weight: 30, description: "작업 분해와 순서가 적절한가" },
    { key: "tooluse", label: "도구 활용", weight: 25, description: "적절한 도구를 선택하고 사용했는가" },
    { key: "error", label: "에러 대응", weight: 20, description: "실패 시 복구 전략이 있는가" },
    { key: "autonomy", label: "자율성", weight: 15, description: "최소 개입으로 완수하는가" },
    { key: "result", label: "최종 결과", weight: 10, description: "원하는 결과물이 나왔는가" },
  ],
  creative: [
    { key: "originality", label: "독창성", weight: 30, description: "새롭고 참신한 아이디어인가" },
    { key: "quality", label: "결과물 품질", weight: 25, description: "완성도와 디테일" },
    { key: "relevance", label: "적합성", weight: 20, description: "요청 의도에 맞는가" },
    { key: "engagement", label: "몰입도", weight: 15, description: "읽는 사람을 끌어당기는가" },
    { key: "coherence", label: "일관성", weight: 10, description: "전체적 톤과 메시지가 일관적인가" },
  ],
};

export const tierColors: Record<string, { bg: string; text: string; border: string }> = {
  S: { bg: "rgba(34,211,238,0.12)", text: "var(--accent-cyan)", border: "var(--accent-cyan-dim)" },
  A: { bg: "rgba(52,211,153,0.12)", text: "var(--accent-green)", border: "var(--accent-green-dim)" },
  B: { bg: "rgba(251,191,36,0.12)", text: "var(--accent-amber)", border: "var(--accent-amber-dim)" },
  C: { bg: "rgba(251,113,133,0.12)", text: "var(--accent-rose)", border: "var(--accent-rose-dim)" },
};

export const difficultyColors: Record<string, { bg: string; text: string }> = {
  easy: { bg: "rgba(52,211,153,0.12)", text: "var(--accent-green)" },
  medium: { bg: "rgba(251,191,36,0.12)", text: "var(--accent-amber)" },
  hard: { bg: "rgba(251,113,133,0.12)", text: "var(--accent-rose)" },
  expert: { bg: "rgba(139,92,246,0.12)", text: "#a78bfa" },
};

export const difficultyLabels: Record<string, string> = {
  easy: "쉬움",
  medium: "보통",
  hard: "어려움",
  expert: "전문가",
};
