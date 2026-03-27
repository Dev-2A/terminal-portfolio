import { mainBanner } from "./ascii";

export function getWelcomeMessage() {
  const now = new Date();
  const hours = now.getHours();

  let greeting;
  if (hours >= 5 && hours < 12) {
    greeting = "☀️  Good morning!";
  } else if (hours >= 12 && hours < 18) {
    greeting = "🌤️  Good afternoon!";
  } else if (hours >= 18 && hours < 22) {
    greeting = "🌆  Good evening!";
  } else {
    greeting = "🌙  Good night! 늦은 시간까지 수고하시네요.";
  }

  const dateStr = now.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const timeStr = now.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return [
    { type: "ascii", content: mainBanner },
    { type: "info", content: "" },
    { type: "cyan", content: "  Terminal Portfolio v0.1.0" },
    { type: "comment", content: `  ${dateStr} ${timeStr}` },
    { type: "info", content: "" },
    { type: "info", content: `  ${greeting}` },
    {
      type: "purple",
      content:
        "  전직 사서 → AI/ML 엔지니어, Dev-2A의 인터랙티브 포트폴리오입니다.",
    },
    { type: "info", content: "" },
    {
      type: "comment",
      content: "  ─────────────────────────────────────────────────",
    },
    { type: "info", content: "" },
    {
      type: "success",
      content:
        "  💡 'help' 를 입력하면 사용 가능한 명령어를 확인할 수 있습니다.",
    },
    {
      type: "comment",
      content: "     'whoami' — 개발자 소개  |  'ls projects' — 프로젝트 탐색",
    },
    { type: "info", content: "" },
  ];
}
