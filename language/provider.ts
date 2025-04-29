import { readFileSync } from "node:fs";
import path from "node:path";

import { parse } from "yaml";

import type { Heuristics } from "./heuristics";
import type { LinguistLanguages } from "./language";

const LanguageFilename = "languages.yml";
const HeuristicsFilename = "heuristics.yml";

function readYML(filename: string) {
  const content = readFileSync(path.join(__dirname, filename), "utf8");
  return parse(content);
}

export const languages: typeof LinguistLanguages = readYML(LanguageFilename);
export const heuristics: Heuristics = readYML(HeuristicsFilename);