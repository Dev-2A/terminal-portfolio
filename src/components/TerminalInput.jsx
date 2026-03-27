import { useState, useRef, useEffect } from "react";
import { getCompletions } from "../commands/autocomplete";

export default function TerminalInput({
  onSubmit,
  onHistoryNavigation,
  currentPath,
}) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // 항상 입력창에 포커스 유지
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 화면 아무 곳이나 클릭해도 입력창으로 포커스
  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = onHistoryNavigation("up");
      if (prev !== undefined) setInput(prev);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = onHistoryNavigation("down");
      if (next !== undefined) setInput(next);
    } else if (e.key === "Tab") {
      e.preventDefault();
      handleTabComplete();
    }
  };

  const handleTabComplete = () => {
    const completions = getCompletions(input);

    if (completions.length === 0) return;

    if (completions.length === 1) {
      // 단일 매칭: 자동 완성
      const parts = input.trim().split(/\s+/);
      if (parts.length <= 1) {
        setInput(completions[0] + " ");
      } else {
        parts[parts.length - 1] = completions[0];
        setInput(parts.join(" ") + " ");
      }
    } else {
      // 다중 매칭: 공통 접두어까지 완성
      const common = findCommonPrefix(completions);
      const parts = input.trim().split(/\s+/);
      if (parts.length <= 1) {
        setInput(common);
      } else {
        parts[parts.length - 1] = common;
        setInput(parts.join(" "));
      }
    }
  };

  return (
    <div className="flex items-center font-mono text-sm min-h-[2rem]">
      <span style={{ color: "var(--terminal-prompt)" }}>
        dev-2a@portfolio<span style={{ color: "var(--terminal-fg)" }}>:</span>
        <span style={{ color: "var(--terminal-blue)" }}>
          {currentPath || "~"}
        </span>
        <span style={{ color: "var(--terminal-fg)" }}>$ </span>
      </span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent outline-none caret-[var(--terminal-green)]"
        style={{ color: "var(--terminal-fg)" }}
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  );
}

function findCommonPrefix(strings) {
  if (strings.length === 0) return "";
  let prefix = strings[0];
  for (let i = 1; i < strings.length; i++) {
    while (!strings[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
    }
  }
  return prefix;
}
