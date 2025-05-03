import { readdirSync, type PathLike } from "node:fs";

import type { DetectLanguage, LanguageDetection } from "./src/detect";
import { DETECTION_ERROR } from "./src/detect";
import { getLanguage } from "./src/detectLanguage";
import { fileExists } from "./src/fileHandler";
import {
  detectedLanguage,
  filterByLanguage,
  languagesSimpleStat
} from "./src/utils";

/**
 * Applies heuristic analysis to determine the correct language when the file extension is ambiguous.
 *
 * @note
 * - When a file extension maps to multiple possible languages.
 * - This function loads the file content and compares it against known heuristics for each candidate language.
 */
export async function detectLanguage(filePath: PathLike): Promise<DetectLanguage> {
  if (!fileExists(filePath)) {
    return detectedLanguage(null, filePath, DETECTION_ERROR.FILE_NOT_FOUND);
  }

  const language = await getLanguage(filePath);

  if (language === undefined) {
    return detectedLanguage(null, filePath, DETECTION_ERROR.UNKNOWN_LANGUAGE);
  }

  return detectedLanguage(language, filePath, null);
}

export async function detectLanguagesInFiles(files: PathLike[]): Promise<LanguageDetection> {
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

// (async () => {
//   for (const hell of readdirSync("./src")) {
//     const value = await detectLanguage("./src" + hell);
//     if (value.error !== null) {
//       console.log("unknown error found: ", value.error);
//       continue;
//     }
//     if (value.error === "UNKNOWN_LANGUAGE") {
//       console.log("unknown language: ", value.path);
//       continue;
//     }
//     if (value.error === DETECTION_ERROR.FILE_NOT_FOUND) {
//       console.log("file not found");
//       continue;
//     }
//     console.log(value)
//     break;
//   }
// })();

export { filterByLanguage, languagesSimpleStat, DETECTION_ERROR }