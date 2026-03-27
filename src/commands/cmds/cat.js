import { registerCommand } from "../registry";
import { out, divider } from "../output";
import { getProjectById, searchProjects } from "../../data/projects";
import fs from "../../data/filesystem";

// 가상 파일 콘텐츠 렌더러
const contentRenderers = {
  about: renderAbout,
  contact: renderContact,
  "skills:languages": () =>
    renderSkillFile("Languages", "Python · JavaScript · TypeScript · Java"),
  "skills:backend": () =>
    renderSkillFile("Backend", "FastAPI · Spring Boot · Node.js"),
  "skills:frontend": () =>
    renderSkillFile("Frontend", "React · Next.js · Tailwind CSS · D3.js"),
  "skills:ai-ml": () =>
    renderSkillFile("AI / ML", "BGE-M3 · FAISS · ONNX · VLM/OCR · RAG"),
  "skills:infra": () =>
    renderSkillFile(
      "Infra / Tools",
      "Docker · Git · Linux · Elasticsearch · SQLite",
    ),
};

registerCommand("cat", {
  description: "파일 또는 프로젝트 상세 정보를 표시합니다",
  usage: "cat <filename|project-id>",
  aliases: ["read", "view"],
  execute: (args) => {
    if (args.length === 0) {
      return [out.error("cat: 파일명을 입력하세요. 예: cat about.md")];
    }

    const target = args[0];

    // 1. 파일시스템에서 찾기
    const fsResult = fs.cat(target);
    if (fsResult.success) {
      const content = fsResult.content;

      // project: 접두어 처리
      if (content.startsWith("project:")) {
        const projectId = content.replace("project:", "");
        const project = getProjectById(projectId);
        if (project) return renderProject(project);
      }

      // 일반 콘텐츠 렌더러
      if (contentRenderers[content]) {
        return contentRenderers[content]();
      }
    }

    // 2. 프로젝트 ID 직접 검색 (어느 경로에서든 접근 가능)
    const project = getProjectById(target.toLowerCase());
    if (project) {
      return renderProject(project);
    }

    // 3. 부분 검색
    const matches = searchProjects(target);
    if (matches.length === 1) {
      return renderProject(matches[0]);
    }

    if (matches.length > 1) {
      const results = [
        out.warning(
          `cat: '${target}'에 해당하는 프로젝트가 ${matches.length}개 있습니다:`,
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

    // 4. 찾을 수 없음
    return [
      out.error(fsResult.error || `cat: '${target}': No such file or project`),
      out.comment(
        "  'ls' 로 파일 목록을, 'ls projects' 로 프로젝트 목록을 확인하세요.",
      ),
    ];
  },
});

function renderProject(project) {
  return [
    out.blank(),
    out.accent(`📦 ${project.name}`),
    divider(),
    out.blank(),
    out.info(`  📝 ${project.description}`),
    out.blank(),
    out.cyan(`  🔧 기술 스택: ${project.stack.join(" · ")}`),
    out.info(`  📊 상태: ${project.status}`),
    out.info(`  🔗 GitHub: ${project.github}`),
    out.blank(),
    out.comment(`  'open ${project.id}' 로 GitHub 페이지를 열 수 있습니다.`),
    out.blank(),
  ];
}

function renderAbout() {
  return [
    out.blank(),
    out.accent("📄 about.md"),
    divider(),
    out.blank(),
    out.success("# Dev-2A — 전직 사서, 현직 AI/ML 엔지니어"),
    out.blank(),
    out.info(
      "도서관에서 장서를 분류하고, 이용자에게 정보를 연결하던 사서였습니다.",
    ),
    out.info(
      "지금은 AI와 임베딩 모델로 '정보와 사람을 연결하는 일'을 계속하고 있습니다.",
    ),
    out.blank(),
    out.comment("  전체 내용은 'about' 명령어로 확인하세요."),
    out.blank(),
  ];
}

function renderContact() {
  return [
    out.blank(),
    out.accent("📄 contact.md"),
    divider(),
    out.blank(),
    out.success("# Contact"),
    out.blank(),
    out.info("  📧 GitHub:     https://github.com/Dev-2A"),
    out.info("  🌐 Portfolio:  https://dev-2a.github.io/dev-2a-portfolio/"),
    out.info("  📊 Solved.ac:  https://solved.ac/profile/tangi826"),
    out.blank(),
  ];
}

function renderSkillFile(title, content) {
  return [
    out.blank(),
    out.accent(`📄 ${title}`),
    divider(),
    out.blank(),
    out.info(`  ${content}`),
    out.blank(),
  ];
}
