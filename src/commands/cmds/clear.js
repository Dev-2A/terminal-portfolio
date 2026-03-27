import { registerCommand } from "../registry";

registerCommand("clear", {
  description: "터미널 화면을 초기화합니다",
  usage: "clear",
  aliases: ["cls"],
  execute: () => {
    // 실제 clear 동작은 Terminal.jsx에서 처리
    // 여기서는 레지스트리에 등록만 해서 help 목록에 노출
    return [{ type: "__clear__" }];
  },
});
