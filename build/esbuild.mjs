import { build } from "esbuild";

import { cjs_config, esm_config } from "./configs.cjs";

async function main() {
  await build(cjs_config);
  await build(esm_config);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});