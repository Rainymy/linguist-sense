import type { PathLike } from "node:fs";

import type {
  DETECTION_ERROR_TYPE,
  DetectLanguage,
  LanguageDetection,
} from "./types/detect";
import { DETECTION_ERROR } from "./types/detect";

import { detectByContent } from "./src/detectByContent";
import { detectByExtension } from "./src/detectByExtension";

import { customReadStream } from "./src/fileHandler";

/**
 * Applies heuristic analysis to determine the correct language when the file extension is ambiguous.
 *
 * @note
 * - When a file extension maps to multiple possible languages.
 * - This function loads the file content and compares it against known heuristics for each candidate language.
 */
export async function detectLanguage(filePath: PathLike): Promise<DetectLanguage | Error> {
  const extensionLanguages = detectByExtension(filePath);

  // check if there are multiple possible values
  if (extensionLanguages.length === 1) {
    return extensionLanguages[0];
  }

  const content = await customReadStream(filePath);
  if (content instanceof Error) {
    return content;
  }

  const contentLanguage = detectByContent(content, extensionLanguages);
  if (!contentLanguage) {
    return new Error(DETECTION_ERROR.UNKNOWN_LANGUAGE);
  }

  return contentLanguage;
}

/**
 * Detects programming languages for multiple files
 * using extension and content
 *
 * @note This is a wrapper around the `detectLanguage` function.
 *
 * @param files - Array of file paths to analyze.
 */
export async function detectLanguagesInFiles(files: PathLike[]) {
  const detected: DetectLanguage[] = [];
  const failedPaths: PathLike[] = [];

  for (const file of files) {
    const lang = await detectLanguage(file);
    if (lang instanceof Error) {
      failedPaths.push(file);
      continue;
    }
    detected.push(lang);
  }

  return { detected: detected, failed: failedPaths }
}

export {
  type DetectLanguage,
  type LanguageDetection,
  detectByExtension,
  detectByContent,
  DETECTION_ERROR,
};
