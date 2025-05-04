import { context } from "esbuild";

import { cjs_config, cjs_yml } from "./configs.cjs";

async function main() {
  (await context(cjs_yml)).watch();
  (await context(cjs_config)).watch();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});