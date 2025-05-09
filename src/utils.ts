import type { PathLike } from "node:fs";
import path from "node:path";

import type { DetectLanguage } from "../types/detect";
import type { Language } from "../types/language";

export function detectedLanguage(
  name: string,
  lang: Language | null,
  path: PathLike
): DetectLanguage {
  return {
    name: name,
    language: lang ?? null,
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