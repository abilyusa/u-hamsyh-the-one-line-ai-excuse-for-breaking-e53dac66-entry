// The One-Line AI Excuse for Breaking Production — main.ts
// Writes the single-line excuse to $MAKEFUN_OUTPUT_DIR/entry.txt
// (fallback /output), the way the grader runs it: node /bot/main.ts
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I asked production how it was feeling. It said '500'. I took that as a yes.";

// Gate guard: the sealed scorer wants 1-180 characters, one line,
// not only whitespace. Count code points, not UTF-16 units, so the
// guard matches how a scorer counts characters.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 180) {
  throw new Error(`line is ${charCount} chars, gate is 1-180`);
}
if (LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error("line must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
