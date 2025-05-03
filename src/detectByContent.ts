import { languages } from "../language/provider";
import { disambiguations } from "./disambiguations";

import type { RetreiveLanguage } from "../types/language";

/**
* Detects the programming language from file content using Linguist logic.
*
* This method is preferred when used in combination with `detectByExtension`.
*
* @note Always provide a list of languages to search within (`searchAt`),
*  - otherwise detection accuracy may drop.
*  - For example, "Roff" tends to match many inputs if no filter is applied.
*/
export function detectByContent(content: Buffer | string, searchAt: string[]): RetreiveLanguage | null {
  const disambiguate = disambiguations(content.toString(), searchAt);

  if (!disambiguate) {
    return null;
  }

  return {
    name: disambiguate.language,
    language: languages[disambiguate.language]
  }
}