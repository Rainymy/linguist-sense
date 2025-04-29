import type { PathLike } from "node:fs";
import type { DetectLanguage } from "./detect";
import type { Language } from "../language/language";

export function detectedLanguage(
  lang: Language | null,
  path: PathLike | null,
  error: string | null
): DetectLanguage {
  return { language: lang, path: path, error: error }
}