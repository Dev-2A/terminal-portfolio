import { useState } from "react";

const quickCommands = [
  { label: "help", cmd: "help" },
  { label: "whoami", cmd: "whoami" },
  { label: "projects", cmd: "ls projects" },
  { label: "skills", cmd: "ls skills" },
  { label: "about", cmd: "about" },
  { label: "theme", cmd: "theme" },
  { label: "clear", cmd: "clear" },
];

export default function MobileHelper({ onCommand }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="shrink-0">
      {/* 토글 버튼 */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full py-2 text-xs border-t flex items-center justify-center gap-1"
        style={{
          backgroundColor: "var(--terminal-bg)",
          borderColor: "var(--terminal-comment)",
          color: "var(--terminal-comment)",
        }}
      >
        {expanded ? "▼ 빠른 명령어 닫기" : "▲ 빠른 명령어 열기"}
      </button>

      {/* 빠른 명령어 버튼들 */}
      {expanded && (
        <div
          className="flex flex-wrap gap-2 p-3 border-t"
          style={{
            backgroundColor: "var(--terminal-bg)",
            borderColor: "var(--terminal-comment)",
          }}
        >
          {quickCommands.map((item) => (
            <button
              key={item.cmd}
              onClick={() => onCommand(item.cmd)}
              className="px-3 py-1.5 rounded text-xs font-mono transition-colors"
              style={{
                backgroundColor: "var(--terminal-comment)",
                color: "var(--terminal-fg)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "var(--terminal-blue)";
                e.target.style.color = "var(--terminal-bg)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "var(--terminal-comment)";
                e.target.style.color = "var(--terminal-fg)";
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
