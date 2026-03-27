import projects from "./projects";

/**
 * 가상 파일시스템 트리 구조
 * type: 'dir | 'file'
 */
const fileSystem = {
  "~": {
    type: "dir",
    children: {
      "about.md": { type: "file", content: "about" },
      "contact.md": { type: "file", content: "contact" },
      projects: {
        type: "dir",
        children: Object.fromEntries(
          projects.map((p) => [
            p.id,
            { type: "file", content: `project:${p.id}` },
          ]),
        ),
      },
      skills: {
        type: "dir",
        children: {
          "languages.md": { type: "file", content: "skills:languages" },
          "backend.md": { type: "file", content: "skills:backend" },
          "frontend.md": { type: "file", content: "skills.frontend" },
          "ai-ml.md": { type: "file", content: "skills:ai-ml" },
          "infra.md": { type: "file", content: "skills:infra" },
        },
      },
    },
  },
};

/**
 * 현재 경로를 관리하는 클래스
 */
class FileSystemManager {
  constructor() {
    this.currentPath = ["~"];
  }

  /**
   * 현재 경로 문자열 반환
   */
  getCurrentPath() {
    if (this.currentPath.length === 1) return "~";
    return this.currentPath.join("/");
  }

  /**
   * 프롬프트에 표시할 짧은 경로
   */
  getPromptPath() {
    if (this.currentPath.length === 1) return "~";
    return this.currentPath[this.currentPath.length - 1];
  }

  /**
   * 경로로부터 노드를 찾아 반환
   */
  resolve(pathParts) {
    let node = fileSystem["~"];
    for (const part of pathParts.slice(1)) {
      if (!node.children || !node.children[part]) {
        return null;
      }
      node = node.children[part];
    }
    return node;
  }

  /**
   * 현재 위치의 노드 반환
   */
  getCurrentNode() {
    return this.resolve(this.currentPath);
  }

  /**
   * 대상 경로를 절대 경로 배열로 변환
   */
  resolvePath(target) {
    if (!target || target === "~" || target === "/") {
      return ["~"];
    }

    // 절대 경로
    if (target.startsWith("~/")) {
      const parts = target.split("/").filter(Boolean);
      parts[0] = "~";
      return parts;
    }

    // 상대 경로
    const parts = [...this.currentPath];
    const segments = target.split("/").filter(Boolean);

    for (const seg of segments) {
      if (seg === "..") {
        if (parts.length > 1) parts.pop();
      } else if (seg !== ".") {
        parts.push(seg);
      }
    }

    return parts;
  }

  /**
   * cd 명령어 - 디렉토리 이동
   * @returns {{ success: boolean, error?: string }}
   */
  cd(target) {
    if (!target || target === "~" || target === "/" || target === "-") {
      this.currentPath = ["~"];
      return { success: true };
    }

    const newPath = this.resolvePath(target);
    const node = this.resolve(newPath);

    if (!node) {
      return { success: false, error: `cd: '${target}': No such directory` };
    }

    if (node.type !== "dir") {
      return { success: false, error: `cd: '${target}': Not a directory` };
    }

    this.currentPath = newPath;
    return { success: true };
  }

  /**
   * ls 명령어 - 현재 또는 대상 디렉토리 내용 반환
   */
  ls(target) {
    const path = target ? this.resolvePath(target) : this.currentPath;
    const node = this.resolve(path);

    if (!node) {
      return {
        success: false,
        error: `ls: '${target}': No such file or directory`,
      };
    }

    if (node.type === "file") {
      return {
        success: true,
        items: [{ name: path[path.length - 1], type: "file" }],
      };
    }

    const items = Object.entries(node.children).map(([name, child]) => ({
      name,
      type: child.type,
    }));

    return { success: true, items, path: path.join("/") };
  }

  /**
   * cat 명령어 - 파일 content 키 반환
   */
  cat(target) {
    if (!target) {
      return { success: false, error: "cat: 파일명을 입력하세요" };
    }

    const path = this.resolvePath(target);
    const node = this.resolve(path);

    if (!node) {
      return {
        success: false,
        error: `cat: '${target}': No such file or directory`,
      };
    }

    if (node.type === "dir") {
      return { success: false, error: `cat: '${target}': Is a directory` };
    }

    return { success: true, content: node.content };
  }

  /**
   * pwd 명령어
   */
  pwd() {
    return "/home/dev-2a/" + this.currentPath.join("/");
  }
}

const fs = new FileSystemManager();
export default fs;
