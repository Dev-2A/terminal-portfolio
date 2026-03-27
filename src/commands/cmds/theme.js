import { registerCommand } from "../registry";
import { out, divider } from "../output";
import themes from "../../data/themes";

registerCommand("theme", {
  description: "터미널 테마를 변경합니다",
  usage: "theme <name>",
  aliases: [],
  execute: (args) => {
    if (args.length === 0) {
      // 테마 목록 표시
      const results = [
        out.blank(),
        out.accent("🎨 사용 가능한 테마"),
        divider(),
        out.blank(),
      ];

      Object.entries(themes).forEach(([key, theme]) => {
        // 현재 테마인지 확인
        const currentBg = getComputedStyle(document.documentElement)
          .getPropertyValue("--terminal-bg")
          .trim();
        const isCurrent = theme["--terminal-bg"] === currentBg;
        const marker = isCurrent ? " ◀ current" : "";

        results.push(out.info(`  ${key.padEnd(16)} ${theme.name}${marker}`));
      });

      results.push(
        out.blank(),
        divider(),
        out.comment("  'theme <name>' 으로 테마를 변경하세요."),
        out.blank(),
      );

      return results;
    }

    const themeName = args[0].toLowerCase();
    const theme = themes[themeName];

    if (!theme) {
      return [
        out.error(`theme: '${themeName}' 테마를 찾을 수 없습니다`),
        out.comment("  'theme' 으로 사용 가능한 테마 목록을 확인하세요."),
      ];
    }

    // CSS 변수 업데이트
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      if (key.startsWith("--")) {
        root.style.setProperty(key, value);
      }
    });

    // body 배경색도 직접 업데이트
    document.body.style.backgroundColor = theme["--terminal-bg"];

    return [out.success(`🎨 테마가 '${theme.name}'(으)로 변경되었습니다.`)];
  },
});
