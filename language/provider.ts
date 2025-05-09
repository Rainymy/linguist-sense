import type { Heuristics } from "../types/heuristics";
import type { LinguistLanguages } from "../types/language";

import heuristicsFile from "./heuristics.yml";
import languageFile from "./languages.yml";

export const languages = languageFile as typeof LinguistLanguages;
export const heuristics = heuristicsFile as Heuristics;