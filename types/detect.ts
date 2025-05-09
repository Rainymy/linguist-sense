import type { Language } from "./language";

export interface DetectLanguage {
  name: string,
  language: Language
}

export interface LanguageDetection {
  detected: DetectLanguage[];
  failed: DetectLanguage[];
}

export const DETECTION_ERROR = {
  FILE_ERROR: "FILE_ERROR",
  UNKNOWN_LANGUAGE: "UNKNOWN_LANGUAGE",
} as const;

export type DETECTION_ERROR_TYPE = keyof typeof DETECTION_ERROR;
