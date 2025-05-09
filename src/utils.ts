import type { PathLike } from "node:fs";
import path from "node:path";

import type { RetreiveLanguage } from "../types/language";
import type { DetectLanguage } from "./detect";

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
  const ext = filename.startsWith('.') ? filename : path.extname(filename);
  return {
    dotExt: ext,
    ext: ext.startsWith('.') ? ext.slice(1) : ext,
    basename: filename,
  }
}