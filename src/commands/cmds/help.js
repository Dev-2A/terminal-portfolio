import { registerCommand, getCommands } from "../registry";
import { out, divider } from "../output";

registerCommand("help", {
  description: "사용 가능한 명령어 목록을 표시합니다",
  usage: "help [command]",
  aliases: ["h", "?"],
  execute: (args) => {
    // 특정 명령어 도움말
    if (args.length > 0) {
      const commands = getCommands();
      const target = args[0].toLowerCase();
      const cmd = commands.find(
        (c) => c.name === target || c.aliases.includes(target),
      );

      if (!cmd) {
        return [out.error(`help: '${target}' 명령어를 찾을 수 없습니다`)];
      }

      return [
        out.blank(),
        out.accent(`📖 ${cmd.name}`),
        out.info(`   ${cmd.description}`),
        out.comment(`   사용법: ${cmd.usage}`),
        cmd.aliases.length > 0
          ? out.comment(`   별칭: ${cmd.aliases.join(", ")}`)
          : null,
        out.blank(),
      ].filter(Boolean);
    }

    // 전체 명령어 목록
    const commands = getCommands();

    const results = [
      out.blank(),
      out.accent("📋 사용 가능한 명령어"),
      divider(),
      out.blank(),
    ];

    commands.forEach((cmd) => {
      results.push(out.info(`  ${cmd.name.padEnd(16)} ${cmd.description}`));
    });

    results.push(
      out.blank(),
      divider(),
      out.comment(
        "  'help <command>' 로 각 명령어의 상세 도움말을 확인하세요.",
      ),
      out.blank(),
    );

    return results;
  },
});
