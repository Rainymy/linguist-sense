/**
* @typedef {import("esbuild").BuildOptions} BuildOptions
*/

/** @type {BuildOptions} */
const options = {
  entryPoints: ['./index.ts'],
  platform: 'node',
  bundle: false,
  minify: false,
  minifyIdentifiers: false,
  minifySyntax: true,
  logLevel: "info",
}

/** @type {BuildOptions} */
export const cjs_config = {
  ...options,
  format: 'cjs',
  outfile: './dist/index.cjs'
}
/** @type {BuildOptions} */
export const esm_config = {
  ...options,
  format: 'esm',
  outfile: './dist/index.mjs',
}