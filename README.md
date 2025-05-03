# linguist-sense

Lightweight [gitHub-linguist](https://github.com/github-linguist/linguist) powered language detection for Node.js

Detect languages from file extensions and content using the official linguist definitions.

---

# Usage
```js
const { detectLanguage, DETECTION_ERROR } = require("linguist-sense");
const path = require("path");

const value = await detectLanguage(path.join(__dirname, "./hello.py"));
if (value.error !== null) {
  console.log("unknown error found: ", value.error);
}
if (value.error === DETECTION_ERROR.UNKNOWN_LANGUAGE) {
  console.log("unknown language: ", value.path);
}
if (value.error === DETECTION_ERROR.FILE_NOT_FOUND) {
  console.log("file not found");
}
console.log(value); // detected language
```

# Language Definitions
We use the exact definitions from [linguist/languages.yml](https://github.com/github-linguist/linguist/blob/main/lib/linguist/languages.yml), so the results are consistent with GitHub's own language classifier.