import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from 'url';

const F_ARG = '-f';
const argFlagIndex = process.argv.findIndex(v => v === F_ARG);
if (argFlagIndex === -1) {
  throw new Error(`Argument: ${F_ARG} not found!`);
}

const OUTPUT_FOLDER = process.argv[argFlagIndex + 1];
if (!OUTPUT_FOLDER) {
  throw new Error(`Argument value: ${F_ARG} <path> not found!`);
}

function getDirname(importMetaUrl) {
  return path.dirname(fileURLToPath(importMetaUrl));
}

/**
 * @param {String} dist - **MUST PROVIDE OUTPUT FOLDER**
 * @returns {import('esbuild').Plugin}
 */
function cleanUpOutputFolder(dist) {
  const workingDirectory = path.join(getDirname(import.meta.url), "..");

  const resolvedTarget = path.resolve(dist);
  const resolvedRoot = path.resolve(workingDirectory);

  // Safety check: ensure the folder is within the project root
  if (!resolvedTarget.startsWith(resolvedRoot + path.sep)) {
    throw new Error(
      [
        "❌ Refusing to delete outside project root!",
        `  ⮡  Root  : ${resolvedRoot}`,
        `  ⮡  Target: ${resolvedTarget}`
      ].join("\n")
    );
  }

  if (!fs.existsSync(dist)) {
    return;
  }

  if (!fs.lstatSync(dist).isDirectory()) {
    throw new Error(`❌ Not a valid output directory: ${resolvedTarget}`);
  }

  fs.rmSync(dist, { recursive: true });
}

cleanUpOutputFolder(OUTPUT_FOLDER);