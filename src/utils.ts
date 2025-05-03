import type { PathLike } from "node:fs";
import path from "node:path";

import type { DetectLanguage } from "./detect";
import type { RetreiveLanguage } from "../types/language";

export function detectedLanguage(
  lang: RetreiveLanguage | null,
  path: PathLike
): DetectLanguage {
  return {
    name: lang?.name ?? null,
    language: lang?.language ?? null,
    path: path
  }
}

export function parseFilePath(filepath: string) {
  const filename = path.basename(filepath);
  if (filename.startsWith(".")) {
    return { dotExt: filename, ext: filename.substring(1) }
  }

  const ext = path.extname(filename);
  return { dotExt: ext, ext: ext.substring(1) }
}