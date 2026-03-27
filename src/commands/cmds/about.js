import { registerCommand } from "../registry";
import { out, divider } from "../output";

registerCommand("about", {
  description: "상세 자기소개를 표시합니다",
  usage: "about",
  aliases: [],
  execute: () => {
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
      out.success("## 🔭 현재 하는 일"),
      out.blank(),
      out.info("  • BGE-M3 임베딩 모델 파인튜닝 및 프로덕션 배포"),
      out.info("  • VLM/OCR 기반 문서 처리 파이프라인 개발"),
      out.info("  • 에어갭(오프라인) 환경 AI 서비스 구축"),
      out.info("  • FastAPI + Java 기반 문서 처리 프레임워크 운영"),
      out.blank(),
      out.success("## 🧩 사이드 프로젝트"),
      out.blank(),
      out.info(
        '  22개의 토이 프로젝트를 Claude와 함께 "바이브 코딩" 방식으로 개발합니다.',
      ),
      out.info("  'ls projects' 명령어로 전체 목록을 확인하세요."),
      out.blank(),
      out.success("## 🎯 키워드"),
      out.blank(),
      out.cyan("  #전직사서  #AI엔지니어  #임베딩모델  #RAG"),
      out.cyan("  #오프라인배포  #바이브코딩  #토이프로젝트"),
      out.blank(),
      out.success("## 🔗 링크"),
      out.blank(),
      out.info("  GitHub:     https://github.com/Dev-2A"),
      out.info("  Portfolio:  https://dev-2a.github.io/dev-2a-portfolio/"),
      out.info("  Solved.ac:  https://solved.ac/profile/tangi826"),
      out.blank(),
    ];
  },
});
