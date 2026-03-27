const TYPE_STYLES = {
  command: { color: "var(--terminal-fg)", prefix: true },
  info: { color: "var(--terminal-fg)", prefix: false },
  success: { color: "var(--terminal-green)", prefix: false },
  error: { color: "var(--terminal-red)", prefix: false },
  warning: { color: "var(--terminal-yellow)", prefix: false },
  accent: { color: "var(--terminal-blue)", prefix: false },
  purple: { color: "var(--terminal-purple)", prefix: false },
  cyan: { color: "var(--terminal-cyan)", prefix: false },
  ascii: { color: "var(--terminal-green)", prefix: false },
  comment: { color: "var(--terminal-comment)", prefix: false },
};

function OutputLine({ entry }) {
  const style = TYPE_STYLES[entry.type] || TYPE_STYLES.info;

  return (
    <div className="leading-relaxed whitespace-pre-wrap break-all">
      {style.prefix && (
        <span style={{ color: "var(--terminal-prompt)" }}>
          dev-2a@portfolio<span style={{ color: "var(--terminal-fg)" }}>:</span>
          <span style={{ color: "var(--terminal-blue)" }}>
            {entry.path || "~"}
          </span>
          <span style={{ color: "var(--terminal-fg)" }}>$ </span>
        </span>
      )}
      <span style={{ color: style.color }}>{entry.content}</span>
    </div>
  );
}

export default function TerminalOutput({ history }) {
  return (
    <div className="flex flex-col gap-0.5">
      {history.map((entry, index) => (
        <OutputLine key={index} entry={entry} />
      ))}
    </div>
  );
}
