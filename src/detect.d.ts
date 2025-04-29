import type { PathLike } from "node:fs";
import type { Language } from "../language/language";

export interface DetectLanguage {
  language: Language | null;
  error: string | null;
  path: PathLike | null;
}

export interface SimpleStats {
  languages: string[];
  languageCount: number;
}

export interface LanguageDetection {
  detected: DetectLanguage[],
  failed: DetectLanguage[]
}