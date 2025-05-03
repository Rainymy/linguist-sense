import { languages } from "../language/provider";
import { disambiguations } from "./disambiguations";

import type { RetreiveLanguage } from "../types/language";

/**
* Detects the programming language from file content using Linguist logic.
*/
export function detectByContent(content: Buffer | string): RetreiveLanguage | null {
  const disambiguate = disambiguations(content.toString());

  if (!disambiguate) {
    return null;
  }

  return {
    name: disambiguate.language,
    language: languages[disambiguate.language]
  }
}