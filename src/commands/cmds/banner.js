import { registerCommand } from "../registry";
import { out } from "../output";
import { mainBanner, miniBanner, bookArt } from "../../data/ascii";

registerCommand("banner", {
  description: "ASCII 아트 배너를 표시합니다",
  usage: "banner [mini|book]",
  aliases: ["logo"],
  execute: (args) => {
    const variant = args[0]?.toLowerCase();

    if (variant === "mini") {
      return [out.blank(), out.ascii(miniBanner), out.blank()];
    }

    if (variant === "book") {
      return [
        out.blank(),
        out.ascii(bookArt),
        out.blank(),
        out.purple('  "도서관에서 정보를 분류하던 사서가,'),
        out.purple('   이제는 AI로 정보를 분류합니다."'),
        out.blank(),
      ];
    }

    return [
      out.blank(),
      out.ascii(mainBanner),
      out.blank(),
      out.cyan("  Terminal Portfolio v0.1.0"),
      out.comment("  https://github.com/Dev-2A"),
      out.blank(),
    ];
  },
});
