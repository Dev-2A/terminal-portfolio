import { registerCommand } from "../registry";
import { out } from "../output";

// sudo
registerCommand("sudo", {
  description: "관리자 권한을 요청합니다 (이스터에그)",
  usage: "sudo <command>",
  aliases: [],
  execute: (args) => {
    if (args.length === 0) {
      return [out.error("sudo: 명령어를 입력하세요")];
    }

    return [
      out.blank(),
      out.error("  ⛔ Permission denied."),
      out.warning("  이 터미널에서는 관리자 권한이 필요하지 않습니다."),
      out.comment("  (이미 충분히 강력한 명령어들이 있어요 😎)"),
      out.blank(),
    ];
  },
});

// rm -rf
registerCommand("rm", {
  description: "파일을 삭제합니다 (이스터에그)",
  usage: "rm [-rf] <path>",
  aliases: ["delete"],
  execute: (args) => {
    const flags = args.filter((a) => a.startsWith("-").join(""));
    const target = args.filter((a) => !a.startsWith("-"))[0];

    if (flags.includes("r") && flags.includes("f") && target === "/") {
      return [
        out.blank(),
        out.error("  💥 sudo rm -rf / detected!"),
        out.blank(),
        out.warning("  잠깐! 포트폴리오를 삭제할 순 없어요."),
        out.info("  이 포트폴리오는 장애 조치 완료된 고가용성 시스템입니다."),
        out.comment("  (농담이에요. 그냥 정적 사이트예요.)"),
        out.blank(),
      ];
    }

    return [
      out.warning(`  rm: '${target || ""}': Operation not permitted`),
      out.comment("  이 터미널에서는 파일 삭제가 지원되지 않습니다."),
    ];
  },
});

// exit / quit
registerCommand("exit", {
  description: "터미널을 종료합니다 (이스터에그)",
  usage: "exit",
  aliases: ["quit", "logout", "q"],
  execute: () => {
    return [
      out.blank(),
      out.warning("  👋 터미널을 종료하시겠습니까?"),
      out.blank(),
      out.info("  ...그런데 이 터미널은 종료할 수 없습니다."),
      out.purple("  포트폴리오는 항상 열려 있으니까요! 😄"),
      out.blank(),
      out.comment("  대신 'open github' 으로 GitHub를 방문하거나"),
      out.comment("  'open portfolio' 로 메인 포트폴리오를 확인해보세요."),
      out.blank(),
    ];
  },
});

// vim / nano / emacs
registerCommand("vim", {
  description: "텍스트 에디터를 실행합니다 (이스터에그)",
  usage: "vim [file]",
  aliases: ["vi", "nano", "emacs", "code"],
  execute: () => {
    return [
      out.blank(),
      out.warning("  vim을 실행하려 했으나..."),
      out.error("  💀 vim에서 나오는 방법을 잊었습니다."),
      out.comment("  (힌트: :q! 라고 외치세요)"),
      out.blank(),
    ];
  },
});

// ping
registerCommand("ping", {
  description: "네트워크 연결을 테스트합니다 (이스터에그)",
  usage: "ping [host]",
  aliases: [],
  execute: (args) => {
    const host = args[0] || "dev-2a.github.io";

    return [
      out.blank(),
      out.info(`  PING ${host}`),
      out.success(`  64 bytes from ${host}: time=1ms 🟢`),
      out.success(`  64 bytes from ${host}: time=2ms 🟢`),
      out.success(`  64 bytes from ${host}: time=1ms 🟢`),
      out.blank(),
      out.info("  --- ping statistics ---"),
      out.info("  3 packets transmitted, 3 received, 0% packet loss"),
      out.success("  ✅ 포트폴리오 서버 정상 운영 중!"),
      out.blank(),
    ];
  },
});

// neofetch
registerCommand("neofetch", {
  description: "시스템 정보를 표시합니다 (이스터에그)",
  usage: "neofetch",
  aliases: ["sysinfo", "info"],
  execute: () => {
    const uptime = getUptime();

    return [
      out.blank(),
      out.cyan("         ╔══════════════╗"),
      out.cyan("         ║   DEV-2A     ║       dev-2a@portfolio"),
      out.cyan("         ║   TERMINAL   ║       ─────────────────"),
      out.cyan("         ║   ▓▓▓▓▓▓▓▓   ║"),
      out.cyan("         ╚══════════════╝"),
      out.blank(),
      out.info(`  OS:       Terminal Portfolio v0.1.0`),
      out.info(`  Host:     GitHub Pages`),
      out.info(`  Kernel:   React + Vite`),
      out.info(`  Uptime:   ${uptime}`),
      out.info(`  Shell:    dev-2a-sh 1.0`),
      out.info(`  Theme:    Tokyo Night (default)`),
      out.info(`  Terminal: 80x24 (web)`),
      out.info(`  CPU:      Claude-powered Vibe Coding™`),
      out.info(`  Memory:   ∞ (브라우저가 허용하는 만큼)`),
      out.blank(),
      out.info("  🟥🟧🟨🟩🟦🟪⬛⬜"),
      out.blank(),
    ];
  },
});

const startTime = Date.now();

function getUptime() {
  const diff = Date.now() - startTime;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}시간 ${minutes % 60}분`;
  }
  if (minutes > 0) {
    return `${minutes}분 ${seconds % 60}초`;
  }
  return `${seconds}초`;
}

// coffee
registerCommand("coffee", {
  description: "커피를 내립니다 (이스터에그)",
  usage: "coffee",
  aliases: ["brew"],
  execute: () => {
    return [
      out.blank(),
      out.warning("  ☕ 커피를 내리는 중..."),
      out.blank(),
      out.info("     ( ("),
      out.info("      ) )"),
      out.info("    ._______."),
      out.info("    |       |]"),
      out.info("    \\       /"),
      out.info("     `-----'"),
      out.blank(),
      out.success("  ✅ 커피가 완성되었습니다!"),
      out.comment("  코딩할 준비가 되었군요. ☕"),
      out.blank(),
    ];
  },
});

// hello
registerCommand("hello", {
  description: "인사합니다",
  usage: "hello",
  aliases: ["hi", "안녕", "안녕하세요"],
  execute: () => {
    const greetings = [
      "안녕하세요! 반갑습니다 👋",
      "어서오세요! 포트폴리오를 둘러보세요 😊",
      "Hello! Welcome to my terminal portfolio!",
      "오늘도 좋은 하루 되세요! ☀️",
    ];
    const random = greetings[Math.floor(Math.random() * greetings.length)];

    return [out.blank(), out.success(`  ${random}`), out.blank()];
  },
});
