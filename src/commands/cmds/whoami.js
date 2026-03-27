import { registerCommand } from "../registry";
import { out, divider } from "../output";

registerCommand("whoami", {
  description: "개발자 소개를 표시합니다",
  usage: "whoami",
  aliases: ["who"],
  execute: () => {
    return [
      out.blank(),
      out.accent("👤 Dev-2A (이에이)"),
      divider(),
      out.blank(),
      out.info("  🏷️  전직 사서 → AI/ML 엔지니어"),
      out.info("  🏢  ONTHEIT 연구개발1팀"),
      out.info("  💼  임베딩 모델 · OCR/VLM · 문서 처리 파이프라인"),
      out.blank(),
      out.purple('  "도서관에서 정보를 분류하던 사서가,'),
      out.purple('   이제는 AI로 정보를 분류합니다."'),
      out.blank(),
      out.info("  🔧  Python · FastAPI · Java · React"),
      out.info("  🤖  BGE-M3 · FAISS · RAG · VLM/OCR"),
      out.info("  🎮  FFXIV · Stardew Valley · Steam"),
      out.info("  📊  Solved.ac: tangi826"),
      out.blank(),
      out.comment("  더 자세한 내용은 'cat about.md' 를 입력하세요."),
      out.blank(),
    ];
  },
});
