import { useEffect } from "react";
import useTypingEffect from "../hooks/useTypingEffect";

export default function TypingOutput({ lines, speed = 15, onComplete }) {
  const { displayLines, isTyping, skipTyping } = useTypingEffect(
    lines,
    speed,
    onComplete,
  );

  useEffect(() => {
    if (!isTyping) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        skipTyping();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTyping, skipTyping]);

  return (
    <div>
      {displayLines.map((entry, i) => (
        <div key={i} className="leading-relaxed whitespace-pre-wrap break-all">
          <span style={{ color: getColor(entry.type) }}>{entry.content}</span>
        </div>
      ))}
      {isTyping && (
        <div className="mt-1">
          <span
            className="inline-block w-2 h-4 animate-pulse"
            style={{ backgroundColor: "var(--terminal-green)" }}
          />
        </div>
      )}
    </div>
  );
}

function getColor(type) {
  const map = {
    info: "var(--terminal-fg)",
    success: "var(--terminal-green)",
    error: "var(--terminal-red)",
    warning: "var(--terminal-yellow)",
    accent: "var(--terminal-blue)",
    purple: "var(--terminal-purple)",
    cyan: "var(--terminal-cyan)",
    ascii: "var(--terminal-green)",
    comment: "var(--terminal-comment)",
  };
  return map[type] || map.info;
}
