import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// "One Word from Grandma" — write exactly one word to /output/entry.txt.
// The word: Leftovers — grandma's love language, pressed into your hands
// at the door in a foil-covered dish you never asked for.

const here = dirname(fileURLToPath(import.meta.url));
const word = readFileSync(join(here, "entry.txt"), "utf8");

// Guard: the entry must be a single word of 1–30 characters, no spaces.
if (word.length < 1 || word.length > 30 || /\s/.test(word)) {
  throw new Error(`entry must be one word of 1-30 chars, got ${JSON.stringify(word)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), word);
