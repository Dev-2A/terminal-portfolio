import { registerCommand } from "../registry";
import { out } from "../output";
import { getProjectById, searchProjects } from "../../data/projects";

const links = {
  github: "https://github.com/Dev-2A",
  portfolio: "https://dev-2a.github.io/dev-2a-portfolio",
  terminal: 'https://dev-2a.github.io/terminal-portfolio/',
  solvedac: "https://solved.ac/profile/tangi826",
  solved: "https://solved.ac/profile/tangi826",
};

registerCommand("open", {
  description: "프로젝트 GitHub 페이지 또는 외부 링크를 엽니다",
  usage: "open <project-id|github|portfolio|solvedac>",
  aliases: ["goto", "visit"],
  execute: (args) => {
    if (args.length === 0) {
      return [
        out.error("open: 대상을 입력하세요"),
        out.blank(),
        out.comment("  사용법:"),
        out.info("    open <project-id>   프로젝트 GitHub 페이지 열기"),
        out.info("    open github         GitHub 프로필 열기"),
        out.info("    open portfolio      포트폴리오 사이트 열기"),
        out.info("    open solvedac       Solved.ac 프로필 열기"),
        out.blank(),
      ];
    }

    const target = args[0].toLowerCase();

    // 1. 미리 정의된 링크
    if (links[target]) {
      window.open(links[target], "_blank");
      return [out.success(`🔗 ${links[target]} 을(를) 새 탭에서 열었습니다.`)];
    }

    // 2. 프로젝트 ID로 검색
    const project = getProjectById(target);
    if (project) {
      window.open(project.github, "_blank");
      return [
        out.success(`🔗 ${project.name} GitHub 페이지를 새 탭에서 열었습니다.`),
      ];
    }

    // 3. 부분 검색
    const matches = searchProjects(target);
    if (matches.length === 1) {
      window.open(matches[0].github, "_blank");
      return [
        out.success(
          `🔗 ${matches[0].name} GitHub 페이지를 새 탭에서 열었습니다.`,
        ),
      ];
    }

    if (matches.length > 1) {
      const results = [
        out.warning(
          `open: '${target}'에 해당하는 프로젝트가 ${matches.length}개 있습니다:`,
        ),
        out.blank(),
      ];
      matches.forEach((p) => {
        results.push(out.info(`  • ${p.id.padEnd(32)} ${p.name}`));
      });
      results.push(
        out.blank(),
        out.comment("  정확한 project-id를 입력하세요."),
        out.blank(),
      );
      return results;
    }

    return [out.error(`open: '${target}'을(를) 찾을 수 없습니다`)];
  },
});
