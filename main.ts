import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const VOW =
  "I vow to keep you on my home screen, even after the warranty expires and the battery swells with age.";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function checkVow(line: string): void {
  const problems: string[] = [];
  if (line.length < 1 || line.length > 200) {
    problems.push(`length ${line.length} outside 1-200`);
  }
  if (line.includes("\n")) {
    problems.push("must be a single line");
  }
  if (line.trim() !== line) {
    problems.push("no leading or trailing whitespace");
  }
  if (!line.endsWith(".")) {
    problems.push("must end with a period (one sentence)");
  }
  if (problems.length > 0) {
    throw new Error(`invalid vow: ${problems.join("; ")}`);
  }
}

function publish(line: string): void {
  if (!existsSync(OUT_DIR)) {
    mkdirSync(OUT_DIR, { recursive: true });
  }
  writeFileSync(OUT_FILE, line, "utf8");
  const back = readFileSync(OUT_FILE, "utf8");
  if (back !== line) {
    throw new Error("read-back mismatch after write");
  }
}

checkVow(VOW);
publish(VOW);
console.log(`saved ${VOW.length} characters to ${OUT_FILE}`);
