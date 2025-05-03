import type { Heuristics } from "../types/heuristics";
import type { LinguistLanguages } from "../types/language";

import LanguageFile from "./languages.yml";
import HeuristicsFile from "./heuristics.yml";

export const languages: typeof LinguistLanguages = LanguageFile;
export const heuristics: Heuristics = HeuristicsFile;