export interface Heuristics {
  disambiguations: DisambiguationsEntity[];
  named_patterns: NamedPatterns;
}
export interface DisambiguationsEntity {
  extensions: string[];
  rules: RulesEntity[];
}
export interface RulesEntity {
  language: string;
  and?: AndEntity[] | null;
  pattern?: string | null | string[];
  named_pattern?: string | null;
  negative_pattern?: string | string[] | null;
}
export interface AndEntity {
  named_pattern?: string | null;
  pattern?: string | null;
  negative_pattern?: string | null;
}
export interface NamedPatterns {
  cpp: string[];
  euphoria: string[];
  fortran: string;
  freebasic: string[];
  gsc: string[];
  json: string;
  key_equals_value: string;
  m68k: string[];
  "man-heading": string;
  "man-title": string;
  "mdoc-date": string;
  "mdoc-heading": string;
  "mdoc-title": string;
  objectivec: string;
  perl: string[];
  quickbasic: string[];
  raku: string;
  "vb-class": string;
  "vb-form": string;
  "vb-module": string;
  vba: string[];
}