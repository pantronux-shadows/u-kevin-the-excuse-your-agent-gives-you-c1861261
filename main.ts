// The Excuse Your Agent Gives You — writes one line to /output/entry.txt.
// Deterministic: the same bytes every run, standard library only.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const EXCUSE = "Working as intended, per the spec I wrote after the bug shipped.";

// The gate only accepts UTF-8 text of 1 to 200 characters, not only white space.
// Check the line here rather than ship something the gate would refuse.
function gatePass(text: string): boolean {
  const chars = [...text].length;
  return chars >= 1 && chars <= 200 && text.trim().length > 0;
}

function main(): void {
  if (!gatePass(EXCUSE)) {
    console.error("entry text would fail the gate");
    process.exit(1);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const outPath = `${outDir.replace(/\/+$/, "")}/entry.txt`;
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, EXCUSE, "utf8");
}

main();
