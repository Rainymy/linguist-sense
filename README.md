# linguist-sense

[![npm version](https://img.shields.io/npm/v/linguist-sense)](https://www.npmjs.com/package/linguist-sense)
[![npm downloads](https://img.shields.io/npm/dw/linguist-sense)](https://www.npmjs.com/package/linguist-sense)

---

> Lightweight language detection in Node.js using [GitHub Linguist](https://github.com/github-linguist/linguist)'s official language definitions.

Detect languages from file extensions and file content using the official linguist definitions.

---

## 🚀 Features
- 📣 Detect languages from **file paths** or **file contents**.
- ⚡ Just **one** runtime dependency — a PCRE-compatible regex parser.
- 🔧 Works with **CommonJS** and **ESM**. Compiled to **ES2018 (ES9)**.
- 🌳 Fully tree-shakeable for minimal bundles (**Not Bundled**).

---

## 🧪 Usage

### 1. High-Level Detection
Use this when you want a full result in one call.

```js
const path = require("node:path");
const { detectLanguage, DETECTION_ERROR } = require("linguist-sense");

const file = path.join(__dirname, "./index.ts"); // input file
const language = await detectLanguage(file);

if (language instanceof Error) {
  if (language.message === DETECTION_ERROR.UNKNOWN_LANGUAGE) {
    console.log("Unknown language detected");
  }
  else {
    console.log("General error: from reading a file");
  }
}
else {
  console.log(language); // { name: "TypeScript", language: LanguageDefinition }
}
```

---

### 2. Extension & Content-Based Detection
Use this if you want more control.
```js
const path = require("node:path");
const fs = require("node:fs");
const { detectByExtension, detectByContent } = require("linguist-sense");

const filepath = path.join(__dirname, "./index.json");

// Extension-based detection
const candidates = detectByExtension(filepath);

if (candidates.length === 0) {
  console.log("No language detected by extension.");
  return;
}

if (candidates.length === 1) {
  console.log("Detected language:", candidates[0]);
  return;
}

// Multiple possible matches — disambiguate with file content
const fileContent = fs.readFileSync(filepath);
// Note: detectByContent uses the `name` property of each candidates.
// - Other fields can be omitted or left empty.
const detected = detectByContent(fileContent, candidates); /* candidates  optional but preferred */

if (detected) {
  console.log("Final language:", detected); // { name, language }
}
else {
  console.log("Unable to determine language from content.");
}
```
---

### 3. Low-Level Access and Customization
Access raw definitions and regex patterns if needed.
```js
const { heuristics, languages, toRegex } = require("linguist-sense");

const javascriptInfo = languages["Javascript"];

// Linguist uses Ruby-compatible (PCRE) regex syntax
const rules = heuristics.disambiguations[0].rules[0].pattern;

// Convert Ruby (PCRE) regex into a valid JavaScript RegExp
const jsRegex = toRegex(rules);
```

---

## 📦 Package Design Notes

### 📁 Why This Package Isn't Bundled
This package is intentionally **not bundled**, in order to:
- Make it easier to integrate into your bundlers (e.g., Webpack, Rollup, esbuild).
- Support tree shaking, so unused logic can be excluded during bundling.

### 🧬 Embedded language data
- `languages.yml` & `heuristics.yml` are precompiled into JavaScript objects.
- This explains the larger unpacked size, but ensures zero runtime file access and minimal overhead.

---

## 📘 Language Definitions
This package uses the exact language definitions and heuristics from GitHub Linguist:

- [`languages.yml`](https://github.com/github-linguist/linguist/blob/main/lib/linguist/languages.yml)
- [`heuristics.yml`](https://github.com/github-linguist/linguist/blob/main/lib/linguist/heuristics.yml)

That means your results match what GitHub shows in your repo file browser.