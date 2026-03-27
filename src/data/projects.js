const projects = [
  {
    id: "solvedac-dashboard",
    name: "Solved.ac 대시보드",
    stack: ["FastAPI", "Vanilla JS"],
    description: "Solved.ac 프로필 통계를 시각화하는 대시보드",
    github: "https://github.com/Dev-2A/solvedac-dashboard",
    status: "✅ 완성",
  },
  {
    id: "solvedac-rival-tracker",
    name: "Solved.ac 라이벌 트래커",
    stack: ["Next.js", "Recharts"],
    description: "라이벌과의 알고리즘 풀이 현황 비교 트래커",
    github: "https://github.com/Dev-2A/solvedac-rival-tracker",
    status: "✅ 완성",
  },
  {
    id: "ai-librarian",
    name: "AI 사서",
    stack: ["FastAPI", "BGE-M3", "Elasticsearch"],
    description: "임베딩 기반 시맨틱 검색 도서 추천 시스템",
    github: "https://github.com/Dev-2A/ai-librarian",
    status: "✅ 완성",
  },
  {
    id: "vibe-coding-radio",
    name: "Vibe Coding Radio",
    stack: ["Next.js", "Zustand", "YouTube API"],
    description: "포모도로 타이머 + YouTube 음악 + 세션 분석",
    github: "https://github.com/Dev-2A/vibe-coding-radio",
    status: "✅ 완성",
  },
  {
    id: "gravity-raid-hub",
    name: "FF14 과중력 공대 허브",
    stack: ["React", "Supabase"],
    description: "FFXIV 레이드 공대 포트폴리오 + 베팅/투표 시스템",
    github: "https://github.com/Dev-2A/gravity-raid-hub",
    status: "✅ 완성",
  },
  {
    id: "git-commit-gen",
    name: "깃 커밋 메시지 생성기",
    stack: ["Python", "CLI", "pipx"],
    description: "AI 기반 깃 커밋 메시지 자동 생성 CLI 도구",
    github: "https://github.com/Dev-2A/git-commit-gen",
    status: "✅ 완성",
  },
  {
    id: "github-profile-gen",
    name: "GitHub README 자동 생성기",
    stack: ["FastAPI", "React", "SVG"],
    description: "GitHub 프로필 README를 자동 생성하는 웹 도구",
    github: "https://github.com/Dev-2A/github-profile-gen",
    status: "✅ 완성",
  },
  {
    id: "tech-digest-kr",
    name: "Tech Digest KR",
    stack: ["FastAPI", "RSS", "LLM API"],
    description: "한국어 기술 블로그 RSS 수집 → LLM 3줄 요약 뉴스레터",
    github: "https://github.com/Dev-2A/tech-digest-kr",
    status: "✅ 완성",
  },
  {
    id: "md-notion-bridge",
    name: "마크다운-Notion 변환기",
    stack: ["Python", "CLI", "Notion API"],
    description: "양방향 Markdown ↔ Notion 블록 변환 CLI 도구",
    github: "https://github.com/Dev-2A/md-notion-bridge",
    status: "✅ 완성",
  },
  {
    id: "stardew-analyzer",
    name: "Stardew 저장파일 분석기",
    stack: ["FastAPI", "React", "Recharts"],
    description: "Stardew Valley 세이브 파일 파싱 및 통계 시각화",
    github: "https://github.com/Dev-2A/stardew-analyzer",
    status: "✅ 완성",
  },
  {
    id: "seat-puzzle",
    name: "Is This Seat Taken?",
    stack: ["React", "Vite"],
    description: "좌석 배치 퍼즐 게임",
    github: "https://github.com/Dev-2A/seat-puzzle",
    status: "✅ 완성",
  },
  {
    id: "discord-algo-bot",
    name: "Discord 알고 스터디 봇",
    stack: ["Python", "discord.py", "SQLite"],
    description: "Solved.ac 연동 알고리즘 스터디 봇 (약점 기반 추천)",
    github: "https://github.com/Dev-2A/discord-algo-bot",
    status: "✅ 완성",
  },
  {
    id: "color-palette-studio",
    name: "Color Palette Studio",
    stack: ["HTML", "CSS", "JavaScript"],
    description: "색상 조화 모드 기반 팔레트 생성기",
    github: "https://github.com/Dev-2A/color-palette-studio",
    status: "✅ 완성",
  },
  {
    id: "password-generator",
    name: "스마트 비밀번호 생성기",
    stack: ["HTML", "CSS", "JavaScript"],
    description: "강도 조절 + 패스프레이즈 + 강도 시각화",
    github: "https://github.com/Dev-2A/password-generator",
    status: "✅ 완성",
  },
  {
    id: "airgap-kor-search",
    name: "Airgap Korean Search",
    stack: ["Python", "BGE-M3 ONNX", "FAISS"],
    description: "에어갭 환경 한국어 시맨틱 검색 엔진",
    github: "https://github.com/Dev-2A/airgap-kor-search",
    status: "✅ 완성",
  },
  {
    id: "weekly-report-gen",
    name: "주간 보고서 자동 생성기",
    stack: ["Python", "Notion API", "Claude API"],
    description: "Notion 작업 기록 → Claude로 주간 회고 보고서 생성",
    github: "https://github.com/Dev-2A/weekly-report-gen",
    status: "✅ 완성",
  },
  {
    id: "steam-library-analyzer",
    name: "Steam Library Analyzer",
    stack: ["Python", "FastAPI", "Steam API"],
    description: "Steam 라이브러리 분석 및 통계 시각화",
    github: "https://github.com/Dev-2A/steam-library-analyzer",
    status: "✅ 완성",
  },
  {
    id: "kr-code-reviewer",
    name: "KR Code Reviewer",
    stack: ["Python", "CLI", "GitHub Action"],
    description: "Claude API 기반 한국어 코드 리뷰 CLI + GitHub Action",
    github: "https://github.com/Dev-2A/kr-code-reviewer",
    status: "✅ 완성",
  },
  {
    id: "format-converter",
    name: "Format Converter",
    stack: ["React", "Monaco Editor"],
    description: "JSON/YAML/TOML 양방향 변환기",
    github: "https://github.com/Dev-2A/format-converter",
    status: "✅ 완성",
  },
  {
    id: "docker-compose-visual-editor",
    name: "Docker Compose Visual Editor",
    stack: ["React", "ReactFlow"],
    description: "docker-compose.yml 시각적 노드 에디터",
    github: "https://github.com/Dev-2A/docker-compose-visual-editor",
    status: "✅ 완성",
  },
  {
    id: "font-showroom",
    name: "Font ShowRoom",
    stack: ["React", "Google Fonts API"],
    description: "Google Fonts 실시간 미리보기 도구",
    github: "https://github.com/Dev-2A/font-showroom",
    status: "✅ 완성",
  },
  {
    id: "bookshelf-log",
    name: "BookShelf.log",
    stack: ["React", "D3.js", "BGE-M3", "Aladin API"],
    description: "독서 지식 그래프 — 임베딩 기반 도서 관계 시각화",
    github: "https://github.com/Dev-2A/bookshelf-log",
    status: "🔨 진행 중",
  },
];

export default projects;

export function getProjectById(id) {
  return projects.find((p) => p.id === id);
}

export function searchProjects(keyword) {
  const lower = keyword.toLowerCase();
  return projects.filter(
    (p) =>
      p.id.includes(lower) ||
      p.name.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.stack.some((s) => s.toLowerCase().includes(lower)),
  );
}
