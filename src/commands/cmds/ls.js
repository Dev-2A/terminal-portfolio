import { registerCommand } from "../registry";
import { out, divider } from "../output";
import projects from "../../data/projects";
import fs from "../../data/filesystem";

registerCommand("ls", {
  description: "파일 및 디렉토리 목록을 표시합니다",
  usage: "ls [path]",
  aliases: ["list", "dir"],
  execute: (args) => {
    const target = args[0];

    // 특수 키워드 유지 (편의용)
    if (target === "skills" || target === "skill") {
      return renderSkills();
    }

    // 파일시스템 기반 ls
    const result = fs.ls(target);

    if (!result.success) {
      return [out.error(result.error)];
    }

    const displayPath = result.path || fs.getCurrentPath();

    // projects 디렉토리인 경우 풍부한 출력
    if (
      displayPath === "~/projects" ||
      target === "projects" ||
      target === "project"
    ) {
      return renderProjects();
    }

    // 일반 디렉토리
    const results = [
      out.blank(),
      out.accent(`📂 ${displayPath}/`),
      out.blank(),
    ];

    result.items.forEach((item) => {
      const icon = item.type === "dir" ? "📁" : "📄";
      const suffix = item.type === "dir" ? "/" : "";
      results.push(out.info(`  ${icon} ${item.name}${suffix}`));
    });

    results.push(out.blank());
    return results;
  },
});

function renderProjects() {
  const results = [
    out.blank(),
    out.accent(`📁 projects/ (${projects.length}개)`),
    divider(),
    out.blank(),
  ];

  projects.forEach((p, i) => {
    const num = String(i + 1).padStart(2, "0");
    const status = p.status === "✅ 완성" ? "✅" : "🔨";
    const name = p.id.padEnd(32);
    results.push(out.info(`  ${num}. ${status} ${name} ${p.name}`));
  });

  results.push(
    out.blank(),
    divider(),
    out.comment("  'cat <project-id>' 로 프로젝트 상세 정보를 확인하세요."),
    out.blank(),
  );

  return results;
}

function renderSkills() {
  return [
    out.blank(),
    out.accent("📁 skills/"),
    divider(),
    out.blank(),
    out.cyan("  Languages"),
    out.info("    Python · JavaScript · TypeScript · Java"),
    out.blank(),
    out.cyan("  Backend"),
    out.info("    FastAPI · Spring Boot · Node.js"),
    out.blank(),
    out.cyan("  Frontend"),
    out.info("    React · Next.js · Tailwind CSS · D3.js"),
    out.blank(),
    out.cyan("  AI / ML"),
    out.info("    BGE-M3 · FAISS · ONNX · VLM/OCR · RAG"),
    out.blank(),
    out.cyan("  Infra / Tools"),
    out.info("    Docker · Git · Linux · Elasticsearch · SQLite"),
    out.blank(),
  ];
}
