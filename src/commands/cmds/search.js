import { registerCommand } from "../registry";
import { out, divider } from "../output";
import { searchProjects } from "../../data/projects";

registerCommand("search", {
  description: "프로젝트를 키워드로 검색합니다",
  usage: "search <keyword>",
  aliases: ["grep", "find"],
  execute: (args) => {
    if (args.length === 0) {
      return [out.error("search: 검색어를 입력하세요. 예: search react")];
    }

    const keyword = args.join(" ");
    const matches = searchProjects(keyword);

    if (matches.length === 0) {
      return [
        out.warning(`  '${keyword}'에 해당하는 프로젝트가 없습니다.`),
        out.comment(
          "  다른 키워드로 검색하거나 'ls projects' 로 전체 목록을 확인하세요.",
        ),
      ];
    }

    const results = [
      out.blank(),
      out.accent(`🔍 '${keyword}' 검색 결과 (${matches.length}건)`),
      divider(),
      out.blank(),
    ];

    matches.forEach((p) => {
      const status = p.status === "✅ 완성" ? "✅" : "🔨";
      results.push(out.info(`  ${status} ${p.id.padEnd(32)} ${p.name}`));
      results.push(out.comment(`     ${p.stack.join(" · ")}`));
    });

    results.push(
      out.blank(),
      out.comment("  'cat <project-id>' 로 상세 정보를 확인하세요."),
      out.blank(),
    );

    return results;
  },
});
