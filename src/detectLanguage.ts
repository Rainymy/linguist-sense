import path from "node:path";
import fs from "node:fs";

import { languages } from "../language/provider";
import { disambiguations } from "./disambiguations";

import type { Language } from "../language/language";

import type {
  DetectLanguage,
  LanguageDetection,
  SimpleStats
} from "./detect";

import { detectedLanguage } from "./utils";

/**
 * Applies heuristic analysis to determine the correct language when the file extension is ambiguous.
 *
 * @note
 * - When a file extension maps to multiple possible languages.
 * - This function loads the file content and compares it against known heuristics for each candidate language.
 */
async function detectLanguage(filePath: fs.PathLike): Promise<DetectLanguage> {
  if (!fs.existsSync(filePath)) {
    return detectedLanguage(null, filePath, "File does not exist.");
  }

  const language = await getLanguage(filePath);

  if (language === undefined) {
    return detectedLanguage(null, filePath, "Unknown language.");
  }

  return detectedLanguage(language, filePath, null);
}

async function getLanguage(filePath: fs.PathLike): Promise<Language | undefined> {
  const dotExt = path.extname(path.basename(filePath.toString()));
  const ext = dotExt.substring(1);

  const similarLanguages = Object.keys(languages).filter(lang => {
    const { extensions, aliases } = languages[lang];
    const correctExt = extensions?.includes(dotExt) ?? false;
    const correctAlias = aliases?.includes(ext) ?? false;

    return correctExt || correctAlias;
  });

  if (similarLanguages.length === 1) {
    const lang = similarLanguages[0];
    return languages[lang];
  }
  if (similarLanguages.length === 0) {
    return;
  }

  const disambiguate = await disambiguations(dotExt, filePath);
  if (!disambiguate) {
    return;
  }

  return languages[disambiguate.language];
}

/**
* @param {DetectLanguage[]} langs
* @returns {SimpleStats}
*/
export function languagesSimpleStat(langs: DetectLanguage[]): SimpleStats {
  const uniqueLanguages = [...new Set(langs.map(d => d.language?.name!))];

  return {
    languages: uniqueLanguages,
    languageCount: uniqueLanguages.length
  }
}

export function filterByLanguage(langs: DetectLanguage[], language: string) {
  return langs.filter(val => {
    const langName = val.language?.name === language;
    const fsName = val.language?.fs_name === language;
    return langName || fsName;
  });
}

export async function detectLanguagesInFiles(files: fs.PathLike[]): Promise<LanguageDetection> {
  const detectedLanguages: DetectLanguage[] = [];
  const failedLanguages: DetectLanguage[] = [];

  for (const file of files) {
    const detected = await detectLanguage(file);
    if (detected.error) {
      failedLanguages.push(detected);
      continue;
    }
    detectedLanguages.push(detected);
  }

  return {
    detected: detectedLanguages,
    failed: failedLanguages
  }
}