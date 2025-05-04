const { yamlPlugin } = require("esbuild-plugin-yaml");

/**
* @typedef {import("esbuild").BuildOptions} BuildOptions
*/


/** @type {BuildOptions} */
const options = {
  entryPoints: [
    "./index.ts",
    "src/**/*.ts"
  ],
  platform: 'node',
  target: ["es2018"],
  bundle: false,
  minify: false,
  minifyIdentifiers: false,
  minifySyntax: true,
  logLevel: "info"
}

/** @type {BuildOptions} */
const cjs_config = {
  ...options,
  format: 'cjs',
  outdir: "dist/cjs"
}

/** @type {BuildOptions} */
const cjs_yml = {
  ...options,
  entryPoints: ["language/provider.ts"],
  bundle: true,
  format: 'cjs',
  outdir: './dist/cjs/language',
  plugins: [yamlPlugin()]
}

/** @type {BuildOptions} */
const esm_config = {
  ...options,
  format: 'esm',
  outdir: "dist/esm"
}

/** @type {BuildOptions} */
const esm_yml = {
  ...options,
  entryPoints: ["language/provider.ts"],
  bundle: true,
  format: 'esm',
  outdir: './dist/esm/language',
  plugins: [yamlPlugin()]
}


module.exports = {
  cjs_config,
  cjs_yml,
  esm_config,
  esm_yml
}