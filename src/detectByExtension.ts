import type { PathLike } from "node:fs";

import { languages } from "../language/provider";
import { parseFilePath } from "./utils";

/**
* Detects possible languages based on the
* file extension using Linguist data.
*/
export function detectByExtension(filePath: PathLike) {
  const { dotExt, ext } = parseFilePath(filePath.toString());

  const similarLanguages = Object.keys(languages).filter(lang => {
    const { extensions, aliases, filenames } = languages[lang];
    const isExt = extensions?.includes(dotExt) ?? false;
    const isAlias = aliases?.includes(ext) ?? false;

    const isFilename = filenames?.includes(dotExt);
    const isDotFilename = filenames?.includes(ext);

    return isExt || isAlias || (isFilename || isDotFilename);
  });

  return similarLanguages;
}