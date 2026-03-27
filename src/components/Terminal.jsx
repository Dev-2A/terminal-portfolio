import { useState, useRef, useEffect } from "react";
import TerminalOutput from "./TerminalOutput";
import TerminalInput from "./TerminalInput";
import { executeCommand } from "../commands/registry";
import "../commands/loader";

const WELCOME_MESSAGE = [
  {
    type: "ascii",
    content: `  ____             ____    _    
 |  _ \\  _____   _|___ \\  / \\   
 | | | |/ _ \\ \\ / / __) |/ _ \\  
 | |_| |  __/\\ V / / __// ___ \\ 
 |____/ \\___| \\_/ |_____/_/   \\_\\`,
  },
  { type: "info", content: "" },
  { type: "info", content: "Terminal Portfolio v0.1.0" },
  {
    type: "info",
    content: "전직 사서 → AI/ML 엔지니어, Dev-2A의 인터랙티브 포트폴리오",
  },
  { type: "info", content: "" },
  { type: "success", content: "Type 'help' to see available commands." },
  { type: "info", content: "" },
];

export default function Terminal() {
  const [history, setHistory] = useState(WELCOME_MESSAGE);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef(null);

  // 새 출력이 추가되면 자동 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (input) => {
    const trimmed = input.trim();

    // 명령어 히스토리에 추가
    if (trimmed) {
      setCommandHistory((prev) => [...prev, trimmed]);
    }
    setHistoryIndex(-1);

    // 입력한 명령어를 출력 영역에 표시
    const newEntries = [{ type: "command", content: trimmed }];

    if (trimmed === "") {
      // 빈 입력은 빈 줄만 추가
    } else if (trimmed === "clear") {
      setHistory([]);
      return;
    } else {
      const result = executeCommand(trimmed);
      newEntries.push(...result);
    }

    setHistory((prev) => [...prev, ...newEntries]);
  };

  const handleHistoryNavigation = (direction) => {
    if (commandHistory.length === 0) return "";

    let newIndex;
    if (direction === "up") {
      newIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
    } else {
      newIndex =
        historyIndex === -1
          ? -1
          : Math.min(commandHistory.length - 1, historyIndex + 1);
    }

    setHistoryIndex(newIndex);
    return newIndex === -1 ? "" : commandHistory[newIndex];
  };

  return (
    <div
      className="h-screen w-screen flex flex-col"
      style={{ backgroundColor: "var(--terminal-bg)" }}
    >
      {/* 타이틀 바 */}
      <div
        className="flex items-center px-4 py-2 gap-2"
        style={{ backgroundColor: "var(--terminal-comment)", opacity: 0.6 }}
      >
        <div className="flex gap-1.5">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "var(--terminal-red)" }}
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "var(--terminal-yellow)" }}
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "var(--terminal-green)" }}
          />
        </div>
        <span className="text-xs ml-2" style={{ color: "var(--terminal-fg)" }}>
          dev-2a@portfolio:~
        </span>
      </div>

      {/* 출력 영역 (스크롤 가능) */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
        <TerminalOutput history={history} />
        <div ref={bottomRef} />
      </div>

      {/* 입력 영역 */}
      <div className="shrink-0 p-4 pt-0">
        <TerminalInput
          onSubmit={handleCommand}
          onHistoryNavigation={handleHistoryNavigation}
        />
      </div>
    </div>
  );
}
