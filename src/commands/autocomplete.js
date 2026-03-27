import { getCommands } from "./registry";
import projects from "../data/projects";

const staticFiles = ["about.md", "contact.md"];
const directories = ["projects", "skills"];

export function getCompletions(input) {
  const parts = input.trim().split(/\s+/);

  if (parts.length <= 1) {
    const partial = parts[0]?.toLowerCase() || "";
    const commands = getCommands();
    return commands.filter((c) => c.name.startWith(partial)).map((c) => c.name);
  }

  const cmd = parts[0].toLowerCase();
  const partial = parts[parts.length - 1]?.toLowerCase() || "";

  if (["cat", "read", "view", "open", "goto", "visit"].includes(cmd)) {
    const projectIds = projects.map((p) => p.id);
    const all = [...staticFiles, ...projectIds];
    return all.filter((item) => item.toLowerCase().startsWith(partial));
  }

  if (["ls", "list", "dir", "cd"].includes(cmd)) {
    return directories.filter((d) => d.startsWith(partial));
  }

  if (cmd === "theme") {
    const themeNames = [
      "tokyonight",
      "dracula",
      "monokai",
      "nord",
      "solarized",
      "catppuccin",
      "gruvbox",
      "light",
    ];
    return themeNames.filter((t) => t.startsWith(partial));
  }

  if (["banner", "logo"].includes(cmd)) {
    return ["mini", "book"].filter((v) => v.startsWith(partial));
  }

  return [];
}
