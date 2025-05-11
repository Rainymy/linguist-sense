import { toRegExp } from "oniguruma-to-es";

import { heuristics } from "../language/provider";
import type { NamedPatterns, RulesEntity } from "../types/heuristics";
import type { DetectLanguage } from "./detect";

export function disambiguations(fileContent: string, searchAt: DetectLanguage[]) {
  const search = searchAt.map(item => item.name);

  for (const disambiguation of heuristics.disambiguations) {
    for (const rule of disambiguation.rules) {
      // skip all non-matching languages.
      const searchIsSearch = search.find(item => item === rule.language);
      if (search.length !== 0 && !searchIsSearch) {
        continue;
      }
      // match against rule set and return if true.
      if (parseRules(rule, fileContent)) {
        return rule
      }
    }
  }

  return null;
}

function parseRules(rules: RulesEntity, fileContent: string): boolean {
  if (rules.and) {
    const subRules = rules.and.map((sRule) => {
      return parseRules(sRule as RulesEntity, fileContent);
    });
    return subRules.every((val) => val);
  }
  if (rules.pattern) {
    return toRegex(rules.pattern).test(fileContent);
  }
  if (rules.negative_pattern) {
    return !toRegex(rules.negative_pattern).test(fileContent);
  }
  if (rules.named_pattern) {
    const ruleName = rules.named_pattern as keyof NamedPatterns;
    const named_patttern = heuristics.named_patterns[ruleName];
    return toRegex(named_patttern).test(fileContent);
  }

  return true;
}

export function toRegex(patterns: string | string[]): RegExp {
  const reg = Array.isArray(patterns) ? patterns.join("|") : patterns;

  return toRegExp(reg, { accuracy: "strict" });
}
