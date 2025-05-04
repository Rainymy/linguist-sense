import { build } from "esbuild";

import { cjs_config, cjs_yml, esm_config, esm_yml } from "./configs.cjs";

async function main() {
  await build(cjs_yml);
  await build(cjs_config);
  await build(esm_yml);
  await build(esm_config);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});