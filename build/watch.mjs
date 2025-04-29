import { context } from "esbuild";

import { cjs_config } from "./configs.mjs";

async function main() {
  (await context(cjs_config)).watch();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});