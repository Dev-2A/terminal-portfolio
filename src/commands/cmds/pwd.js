import { registerCommand } from "../registry";
import { out } from "../output";
import fs from "../../data/filesystem";

registerCommand("pwd", {
  description: "현재 디렉토리 경로를 표시합니다",
  usage: "pwd",
  aliases: [],
  execute: () => {
    return [out.info(fs.pwd())];
  },
});
