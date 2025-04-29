# linguist-sense

Lightweight [gitHub-linguist](https://github.com/github-linguist/linguist) powered language detection for Node.js

Detect languages from file extensions and content using the official linguist definitions.

---

# Usage
```js
const { detectByExtension, detectByContent } = require('linguist-sense');

// By file extension
const lang1 = detectByExtension("index.ts");
console.log(lang1); // { name: 'TypeScript', extensions: ['.ts', '.tsx'], ... }

// By file content
const fs = require("node:fs");
const code = fs.readFileSync("./snake.py", "utf8");
const lang2 = detectByContent(code);
console.log(lang2); // { name: 'Python', ... }
```

# Language Definitions
We use the exact definitions from [linguist/languages.yml](https://github.com/github-linguist/linguist/blob/main/lib/linguist/languages.yml), so the results are consistent with GitHub's own language classifier.