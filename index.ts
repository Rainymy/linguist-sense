import { readdirSync, type PathLike } from "node:fs";

import type { DetectLanguage, LanguageDetection, DETECTION_ERROR_TYPE } from "./src/detect";
import { DETECTION_ERROR } from "./src/detect";

import { detectByExtension } from "./src/detectByExtension";
import { detectByContent } from "./src/detectByContent";

import { languages } from "./language/provider"
import { customReadStream } from "./src/fileHandler";
import { detectedLanguage } from "./src/utils";

/**
 * Applies heuristic analysis to determine the correct language when the file extension is ambiguous.
 *
 * @note
 * - When a file extension maps to multiple possible languages.
 * - This function loads the file content and compares it against known heuristics for each candidate language.
 */
export async function detectLanguage(filePath: PathLike): Promise<[DetectLanguage, DETECTION_ERROR_TYPE | null]> {
  const extensionLanguages = detectByExtension(filePath);

  // check if there are multiple possible values
  if (extensionLanguages.length === 1) {
    const lang = languages[extensionLanguages[0]];
    const detLang = { language: lang, name: extensionLanguages[0] }
    return [
      detectedLanguage(detLang, filePath), null
    ];
  }

  const content = await customReadStream(filePath);
  if (content instanceof Error) {
    return [
      detectedLanguage(null, filePath), DETECTION_ERROR.FILE_ERROR
    ];
  }

  const contentLanguage = detectByContent(content, extensionLanguages);
  if (!contentLanguage) {
    return [
      detectedLanguage(null, filePath), DETECTION_ERROR.UNKNOWN_LANGUAGE
    ];
  }

  return [
    detectedLanguage(contentLanguage, filePath), null
  ];
}

/**
* Detects programming languages for multiple files
* using extension and content
*
* @note This is a wrapper around the `detectLanguage` function.
*
* @param files - Array of file paths to analyze.
*/
export async function detectLanguagesInFiles(files: PathLike[]): Promise<LanguageDetection> {
  const detectedLanguages: DetectLanguage[] = [];
  const failedLanguages: DetectLanguage[] = [];

  for (const file of files) {
    const [detected, error] = await detectLanguage(file);
    if (error) {
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

export {
  detectByExtension,
  detectByContent,
  DETECTION_ERROR
}