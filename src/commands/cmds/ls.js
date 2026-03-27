import { registerCommand } from "../registry";
import { out, divider } from "../output";
import projects from "../../data/projects";

registerCommand("ls", {
  description: "파일 및 프로젝트 목록을 표시합니다",
  usage: "ls [projects|skills]",
  aliases: ["list", "dir"],
  execute: (args) => {
    const target = args[0]?.toLowerCase();

    // ls projects
    if (target === "projects" || target === "project") {
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
        out.comment("  예: cat bookshelf-log"),
        out.blank(),
      );

      return results;
    }

    // ls skills
    if (target === "skills" || target === "skill") {
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

    // ls (인자 없음) - 루트 디렉토리
    return [
      out.blank(),
      out.accent("📂 ~/dev-2a/"),
      out.blank(),
      out.info("  📄 about.md"),
      out.info(`  📁 projects/        (${projects.length}개의 토이 프로젝트)`),
      out.info("  📁 skills/          (기술 스택)"),
      out.info("  📄 contact.md"),
      out.blank(),
      out.comment("  'ls <folder>' 로 하위 항목을 확인하세요."),
      out.blank(),
    ];
  },
});
