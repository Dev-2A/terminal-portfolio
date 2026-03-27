import { useState, useRef, useEffect } from "react";

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
