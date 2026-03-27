/**
 * 명령어 입력을 파싱하여 구조화된 객체로 반환
 * 예: "cat about.md" → { command: "cat", args: ["about.md"], flags: {} }
 * 예: "ls -a projects" → { command: "ls", args: ["projects"], flags: { a: true } }
 */
export function parseInput(input) {
  const tokens = input.trim().split(/\s+/).filter(Boolean);

  if (tokens.length === 0) {
    return { command: "", args: [], flags: {} };
  }

  const command = tokens[0].toLowerCase();
  const args = [];
  const flags = {};

  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.startsWith("--")) {
      // --flag 또는 --key=value
      const [key, value] = token.slice(2).split("=");
      flags[key] = value || true;
    } else if (token.startsWith("-") && token.length > 1) {
      // -a, -la 등 단축 플래그
      token
        .slice(1)
        .split("")
        .forEach((char) => {
          flags[char] = true;
        });
    } else {
      args.push(token);
    }
  }

  return { command, args, flags };
}

/**
 * 경로 문자열을 정규화
 * 예: "projects/bookshelf-log" → ["projects", "bookshelf-log"]
 */
export function normalizePath(pathStr) {
  return pathStr
    .replace(/^[~/]+/, "")
    .split("/")
    .filter(Boolean);
}
