import type { PathLike } from "node:fs";
import type { DetectLanguage, SimpleStats, DETECTION_ERROR_TYPE } from "./detect";
import type { RetreiveLanguage } from "../types/language";

export function detectedLanguage(
  lang: RetreiveLanguage | null, path: PathLike | null, error: DETECTION_ERROR_TYPE | null
): DetectLanguage {
  return {
    name: lang?.name ?? null,
    language: lang?.language ?? null,
    path: path,
    error: error
  }
}

export function languagesSimpleStat(langs: DetectLanguage[]): SimpleStats {
  const uniqueLanguages = [...new Set(langs.map(d => d.name!))];

  return {
    languages: uniqueLanguages,
    count: uniqueLanguages.length
  }
}

export function filterByLanguage(langs: DetectLanguage[], language: string) {
  return langs.filter(val => {
    const langName = val.name === language;
    const fsName = val.language?.fs_name === language;
    return langName || fsName;
  });
}