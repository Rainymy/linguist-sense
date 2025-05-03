import fs from "node:fs";

import { customReadStream } from "./fileHandler";
import { toRegExp } from "oniguruma-to-es";

import { heuristics } from "../language/provider";
import type { RulesEntity, NamedPatterns } from "../types/heuristics";

export async function disambiguations(ext: string, filePath: fs.PathLike) {
  const fileContent = await customReadStream(filePath);
  if (!fileContent) {
    // FAILED TO READ FILE
    return null;
  }

  for (const disambiguation of heuristics.disambiguations) {
    if (!disambiguation.extensions.includes(ext)) { continue; }

    for (const rule of disambiguation.rules) {
      if (!parseRules(rule, fileContent)) {
        continue;
      }
      return rule;
    }
  }

  return null;
}

function parseRules(rules: RulesEntity, fileContent: string): boolean {
  if (rules.and) {
    const subRules = rules.and.map(sRule => {
      return parseRules(sRule as RulesEntity, fileContent);
    });
    return subRules.every(val => val);
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
    return toRegex(named_patttern).test(fileContent)
  }

  return true;
}

function toRegex(patterns: string | string[]): RegExp {
  const reg = Array.isArray(patterns)
    ? patterns.join("|")
    : patterns;

  return toRegExp(reg, { accuracy: "strict" });
}