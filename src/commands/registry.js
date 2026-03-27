// 모든 명령어를 등록하고 라우팅하는 중앙 레지스트리
const commands = {};

/**
 * 명령어 등록
 * @param {string} name - 명령어 이름 (소문자)
 * @param {object} config - { description, usage, execute }
 */
export function registerCommand(name, config) {
  commands[name.toLowerCase()] = {
    name,
    description: config.description || "",
    usage: config.usage || name,
    execute: config.execute,
    aliases: config.aliases || [],
  };

  // 별칭도 등록
  if (config.aliases) {
    config.aliases.forEach((alias) => {
      commands[alias.toLowerCase()] = commands[name.toLowerCase()];
    });
  }
}

/**
 * 명령어 실행
 * @param {string} input - 사용자 입력 전체 문자열
 * @returns {Array} - 출력할 엔트리 배열 [{ type, content }]
 */
export function executeCommand(input) {
  const parts = input.trim().split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  if (!cmd) return [];

  const command = commands[cmd];

  if (!command) {
    return [
      { type: "error", content: `command not found: ${cmd}` },
      { type: "comment", content: `Type 'help' to see available commands.` },
    ];
  }

  return command.execute(args);
}

/**
 * 등록된 모든 고유 명령어 목록 반환 (별칭 제외)
 */
export function getCommands() {
  const unique = new Map();
  Object.values(commands).forEach((cmd) => {
    if (!unique.has(cmd.name)) {
      unique.set(cmd.name, cmd);
    }
  });
  return Array.from(unique.values());
}
