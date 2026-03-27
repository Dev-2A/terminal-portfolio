import { registerCommand } from "../registry";
import { out } from "../output";
import fs from "../../data/filesystem";

registerCommand("cd", {
  description: "디렉토리를 이동합니다",
  usage: "cd <directory>",
  aliases: [],
  execute: (args) => {
    const target = args[0];
    const result = fs.cd(target);

    if (!result.success) {
      return [out.error(result.error)];
    }

    return [];
  },
});
