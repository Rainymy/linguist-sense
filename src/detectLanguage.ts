import path from "node:path";
import type { PathLike } from "node:fs";

import { languages } from "../language/provider";
import { disambiguations } from "./disambiguations";

import type { RetreiveLanguage } from "../types/language";

export async function getLanguage(filePath: PathLike): Promise<RetreiveLanguage | undefined> {
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
    return {
      name: lang,
      language: languages[lang]
    }
  }
  if (similarLanguages.length === 0) {
    return;
  }

  const disambiguate = await disambiguations(dotExt, filePath);
  if (!disambiguate) {
    return;
  }

  return {
    name: disambiguate.language,
    language: languages[disambiguate.language]
  }
}