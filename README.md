# 💻 Terminal Portfolio

> 브라우저에서 터미널처럼 명령어로 탐색하는 인터랙티브 개발자 포트폴리오

[![Deploy](https://img.shields.io/badge/🌐_Live_Demo-dev--2a.github.io-blue?style=for-the-badge)](https://dev-2a.github.io/terminal-portfolio/)
[![GitHub](https://img.shields.io/badge/GitHub-Dev--2A-181717?style=for-the-badge&logo=github)](https://github.com/Dev-2A)

![terminal-portfolio-preview](https://img.shields.io/badge/status-v0.1.0-green?style=flat-square)

## 🎯 소개

**"전직 사서 → AI/ML 엔지니어"** 내러티브를 터미널 UX로 전달하는 인터랙티브 포트폴리오입니다.

22개의 토이 프로젝트를 명령어로 탐색하고, 가상 파일시스템으로 디렉토리를 이동하며, 8종의 테마로 자신만의 터미널을 꾸밀 수 있습니다.

## ✨ 주요 기능

### 📂 가상 파일시스템

- `ls` / `cd` / `pwd` / `cat` 으로 디렉토리 탐색
- `~/projects/`, `~/skills/` 등 가상 폴더 구조
- 프롬프트에 현재 경로 실시간 반영

### 🔍 프로젝트 탐색

- `ls projects` — 22개 토이 프로젝트 전체 목록
- `cat <project-id>` — 프로젝트 상세 정보 (기술 스택, GitHub 링크)
- `search <keyword>` — 키워드 기반 프로젝트 검색
- `open <project-id>` — GitHub 페이지 새 탭에서 열기

### 🎨 8종 터미널 테마

- `theme` 으로 목록 확인
- Tokyo Night, Dracula, Monokai, Nord, Solarized, Catppuccin, Gruvbox, Light

### ⌨️ 터미널 UX

- Tab 자동완성
- ↑↓ 방향키 명령어 히스토리
- `clear` 화면 초기화
- 시간대별 동적 웰컴 메시지

### 🎮 이스터에그

- `neofetch` — 시스템 정보
- `sudo` / `rm -rf /` / `vim` / `ping` / `coffee` / `exit`
- `hello` / `안녕` — 랜덤 인사말

### 📱 모바일 대응

- 반응형 레이아웃
- 빠른 명령어 버튼 패널
- iOS 확대 방지

## 🛠️ 기술 스택

| 분류 | 기술 |
| --- | --- |
| Frontend | React, Vite |
| Styling | Tailwind CSS 3.x |
| Font | Fira Code (Google Fonts) |
| Deploy | GitHub Pages (gh-pages) |
| Dev Tool | Claude AI (Vibe Coding) |

## 📋 명령어 목록

| 명령어 | 별칭 | 설명 |
| --- | --- | --- |
| `help` | `h`, `?` | 사용 가능한 명령어 목록 |
| `whoami` | `who` | 개발자 소개 |
| `about` | | 상세 자기소개 |
| `ls [path]` | `list`, `dir` | 파일/디렉토리 목록 |
| `cd <dir>` | | 디렉토리 이동 |
| `pwd` | | 현재 경로 표시 |
| `cat <file>` | `read`, `view` | 파일/프로젝트 상세 |
| `search <keyword>` | `grep`, `find` | 프로젝트 검색 |
| `open <target>` | `goto`, `visit` | 외부 링크 열기 |
| `theme [name]` | | 테마 변경 |
| `banner [variant]` | `logo` | ASCII 배너 표시 |
| `history [count]` | | 명령어 히스토리 |
| `clear` | `cls` | 화면 초기화 |
| `neofetch` | `sysinfo`, `info` | 시스템 정보 |
| `coffee` | `brew` | ☕ |

## 📦 설치 및 실행

```bash
# 클론
git clone https://github.com/Dev-2A/terminal-portfolio.git
cd terminal-portfolio

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# GitHub Pages 배포
npm run deploy
```

## 📁 프로젝트 구조

```text
terminal-portfolio/
├── public/
│   └── 404.html              # SPA 리다이렉트
├── src/
│   ├── commands/
│   │   ├── cmds/
│   │   │   ├── about.js      # about 명령어
│   │   │   ├── banner.js     # banner 명령어
│   │   │   ├── cat.js        # cat 명령어
│   │   │   ├── cd.js         # cd 명령어
│   │   │   ├── clear.js      # clear 명령어
│   │   │   ├── easter.js     # 이스터에그 모음
│   │   │   ├── help.js       # help 명령어
│   │   │   ├── history.js    # history 명령어
│   │   │   ├── ls.js         # ls 명령어
│   │   │   ├── open.js       # open 명령어
│   │   │   ├── pwd.js        # pwd 명령어
│   │   │   ├── search.js     # search 명령어
│   │   │   ├── theme.js      # theme 명령어
│   │   │   └── whoami.js     # whoami 명령어
│   │   ├── autocomplete.js   # Tab 자동완성
│   │   ├── loader.js         # 명령어 로더
│   │   ├── output.js         # 출력 헬퍼
│   │   ├── parser.js         # 입력 파서
│   │   └── registry.js       # 명령어 레지스트리
│   ├── components/
│   │   ├── MobileHelper.jsx  # 모바일 빠른 명령어
│   │   ├── Terminal.jsx      # 터미널 컨테이너
│   │   ├── TerminalInput.jsx # 입력 영역
│   │   ├── TerminalOutput.jsx# 출력 영역
│   │   └── TypingOutput.jsx  # 타이핑 애니메이션
│   ├── data/
│   │   ├── ascii.js          # ASCII 아트
│   │   ├── filesystem.js     # 가상 파일시스템
│   │   ├── projects.js       # 프로젝트 데이터
│   │   ├── themes.js         # 테마 데이터
│   │   └── welcome.js        # 웰컴 메시지
│   ├── hooks/
│   │   ├── useMobile.js      # 모바일 감지
│   │   └── useTypingEffect.js# 타이핑 효과
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── LICENSE
├── README.md
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 🧑‍💻 개발 방식

이 프로젝트는 **Claude AI**와 함께 "바이브 코딩" 방식으로 개발되었습니다.

단계별 가이드를 따라 한 스텝씩 구현하며, 각 단계마다 한국어 gitmoji 커밋 메시지로 기록했습니다.

## 📄 라이선스

MIT License — 자유롭게 사용하세요!
