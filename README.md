# linguist-sense

Lightweight [gitHub-linguist](https://github.com/github-linguist/linguist) powered language detection for Node.js

Detect languages from file extensions and content using the official linguist definitions.

---

# Usage example 1
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
  console.log(value.name, value); // detected language
}
```

# Usage example 2
```js
(async () => {
  const path = require("node:path");
  const fs = require("node:fs");
  const { detectByExtension, detectByContent } = require("linguist-sense");

  const filepath = path.join(__dirname, "./config.json"); // input file
  const languages = detectByExtension(filepath); // [ <detected languages> ]

  if (languages.length === 0) {
    console.log("No Language Detected!!!");
    return;
  }

  if (languages.length === 1) {
    console.log("language found!", languages[0]);
    return;
  }

  // There might be a language with same extensions.
  const fileContent = fs.readFileSync(filepath);
  const detected = detectByContent(fileContent, languages /* optional but preferred */);

  if (detected === null) {
    console.log("Unable to distingué the language");
    return;
  }

  detected; // { name, language }
})();

```

# Language Definitions
We use the exact definitions from [linguist/languages.yml](https://github.com/github-linguist/linguist/blob/main/lib/linguist/languages.yml), so the results are consistent with GitHub's own language classifier.