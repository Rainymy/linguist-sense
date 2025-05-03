import type { PathLike } from "node:fs";
import type { Language } from "../types/language";

export interface DetectLanguage {
  name: string | null;
  language: Language | null;
  error: DETECTION_ERROR_TYPE | null;
  path: PathLike | null;
}

export interface SimpleStats {
  languages: string[];
  count: number;
}

export interface LanguageDetection {
  detected: DetectLanguage[],
  failed: DetectLanguage[]
}

export const DETECTION_ERROR = {
  FILE_NOT_FOUND: "FILE_NOT_FOUND",
  UNKNOWN_LANGUAGE: "UNKNOWN_LANGUAGE",
} as const;

export type DETECTION_ERROR_TYPE = keyof typeof DETECTION_ERROR;