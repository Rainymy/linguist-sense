import type { PathLike } from "node:fs";
import type { DetectLanguage } from "../types/detect";

import { languages } from "../language/provider";
import { parseFilePath } from "./utils";

/**
 * Detects possible languages based on the
 * file extension using Linguist data.
 */
export function detectByExtension(filePath: PathLike): DetectLanguage[] {
  const { dotExt, ext, basename } = parseFilePath(filePath.toString());

  return Object.keys(languages)
    .filter((lang) => {
      const { extensions, aliases, filenames } = languages[lang];

      return (
        extensions?.includes(dotExt) ||
        aliases?.includes(ext) ||
        filenames?.includes(dotExt) ||
        filenames?.includes(ext) ||
        filenames?.includes(basename)
      );
    })
    .map((item) => {
      return { name: item, language: languages[item] } satisfies DetectLanguage;
    });
}
