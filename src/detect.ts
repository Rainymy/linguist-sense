import type { PathLike } from "node:fs";
import type { Language } from "../types/language";

export interface DetectLanguage {
  name: string;
  language: Language;
  path: PathLike;
}

export interface LanguageDetection {
  detected: DetectLanguage[];
  failed: DetectLanguage[];
}

export enum DETECTION_ERROR {
  UNKNOWN_LANGUAGE = "UNKNOWN_LANGUAGE",
}
