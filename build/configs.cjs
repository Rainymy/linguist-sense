const { yamlPlugin } = require("esbuild-plugin-yaml");

/**
* @typedef {import("esbuild").BuildOptions} BuildOptions
*/

/** @type {BuildOptions} */
const options = {
  entryPoints: ['./index.ts'],
  platform: 'node',
  bundle: true,
  minify: false,
  minifyIdentifiers: false,
  minifySyntax: false,
  logLevel: "info",
  plugins: [yamlPlugin()]
}

/** @type {BuildOptions} */
const cjs_config = {
  ...options,
  format: 'cjs',
  outfile: './dist/index.cjs'
}
/** @type {BuildOptions} */
const esm_config = {
  ...options,
  format: 'esm',
  outfile: './dist/index.mjs',
}

module.exports = { cjs_config, esm_config }