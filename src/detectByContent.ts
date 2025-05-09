import { languages } from "../language/provider";
import { disambiguations } from "./disambiguations";

import type { DetectLanguage } from "./detect";

/**
 * Detects the programming language from file content using Linguist logic.
 *
 * This method is preferred when used in combination with `detectByExtension`.
 *
 * @note Always provide a list of languages to search (`searchAt`),
 *  - otherwise detection accuracy may drop.
 *  - For example, "Roff" tends to match many inputs if no filter is applied.
 */
export function detectByContent(content: Buffer | string, searchAt: DetectLanguage[]): DetectLanguage | null {
  const disambiguate = disambiguations(content.toString(), searchAt);

  if (!disambiguate) {
    return null;
  }

  return {
    name: disambiguate.rule.language,
    language: languages[disambiguate.rule.language],
    path: disambiguate.path
  }
}
