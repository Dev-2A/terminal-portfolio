import { registerCommand } from "../registry";
import { out } from "../output";

// Terminal.jsx에서 commandHistory를 주입받기 위한 저장소
let historyRef = [];

export function setHistoryRef(ref) {
  historyRef = ref;
}

registerCommand("history", {
  description: "입력한 명령어 히스토리를 표시합니다",
  usage: "history [count]",
  aliases: [],
  execute: (args) => {
    if (historyRef.length === 0) {
      return [out.comment("  (히스토리가 비어 있습니다)")];
    }

    let count = historyRef.length;
    if (args[0]) {
      const n = parseInt(args[0], 10);
      if (!isNaN(n) && n > 0) {
        count = Math.min(n, historyRef.length);
      }
    }

    const start = historyRef.length - count;
    const results = [out.blank()];

    historyRef.slice(start).forEach((cmd, i) => {
      const num = String(start + i + 1).padStart(4, " ");
      results.push(out.info(`  ${num}  ${cmd}`));
    });

    results.push(out.blank());
    return results;
  },
});
