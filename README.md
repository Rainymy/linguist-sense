# linguist-sense

[![npm version](https://img.shields.io/npm/v/linguist-sense)](https://www.npmjs.com/package/linguist-sense)
[![npm downloads](https://img.shields.io/npm/dw/linguist-sense)](https://www.npmjs.com/package/linguist-sense)

---

> Lightweight language detection in Node.js using [GitHub Linguist](https://github.com/github-linguist/linguist)'s official language definitions.

Detect languages from file extensions and file content using the official linguist definitions.

---

## 🚀 Features
- 📣 Detect languages from **file paths** or **file contents**
- ⚡ Zero dependencies for core logic
- 🔧 Works with **CommonJS** and **ESM**. Compiled to **ES2018 (ES9)**
- 🌳 Fully tree-shakeable for minimal bundles (not bundled, e.g not minified)

---

## 🧪 Usage

### 1. High-Level Detection
The `detectLanguage()` function returns `[value, error]`. Use this when you want a full result in one call.

```js
const path = require("node:path");
const { detectLanguage, DETECTION_ERROR } = require("linguist-sense");

const file = path.join(__dirname, "./index.ts"); // input file
const [value, error] = await detectLanguage(file);

if (error === DETECTION_ERROR.UNKNOWN_LANGUAGE) {
  console.log("Unknown language: ", value.path);
}
if (error === DETECTION_ERROR.FILE_ERROR) {
  console.log("File not found", value.path);
}
if (error === null) {
  console.log(value.name, value); // e.g., "TypeScript"
}
```

---

### 2. Extension & Content-Based Detection
Use this if you want more control.
```js
const path = require("node:path");
const fs = require("node:fs");
const { detectByExtension, detectByContent } = require("linguist-sense");

const filepath = path.join(__dirname, "./index.ts");

// Detect by extension
const candidates = detectByExtension(filepath); // [ <detected languages> ]

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
const detected = detectByContent(fileContent, candidates /* optional but recommended */);

if (detected) {
  console.log("Final language:", detected.name); // { name, language }
}
else {
  console.log("Unable to determine language from content.");
}
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