import { writeFileSync, mkdirSync } from "node:fs";

const TEXT =
  "I vow to reboot beside you every morning, patch what breaks between us, and never factory-reset what we built together.";

if (TEXT.length < 1 || TEXT.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${TEXT.length}`);
}
if (TEXT.trim() !== TEXT) {
  throw new Error("entry must not have leading or trailing whitespace");
}
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", TEXT, "utf8");
console.log(`wrote ${TEXT.length} characters to /output/entry.txt`);
