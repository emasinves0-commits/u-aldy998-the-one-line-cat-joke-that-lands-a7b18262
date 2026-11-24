// The One-Line Cat Joke That Lands - dependency-free entrypoint (Node built-ins only).
// Usage: node main.ts [--self-test]

import { mkdirSync, writeFileSync, readFileSync, mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

export const ENTRY =
  "She brought me a dead spider, placed it on my keyboard, and waited for me to sign the NDA before eating it.";

export const MAX_CHARS = 200;

type Rule = { name: string; ok: (s: string) => boolean };

export const RULES: Rule[] = [
  { name: "not-blank", ok: (s) => s.trim().length > 0 },
  { name: "max-200-chars", ok: (s) => s.length <= MAX_CHARS },
  { name: "single-line", ok: (s) => !/[\r\n]/.test(s) },
];

export function validate(entry: string): void {
  for (const rule of RULES) {
    if (!rule.ok(entry)) throw new Error(`entry rejected by rule: ${rule.name}`);
  }
}

export function writeEntry(dir: string, entry: string): string {
  validate(entry);
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "entry.txt");
  writeFileSync(file, entry); // no trailing newline
  const back = readFileSync(file);
  if (!back.equals(Buffer.from(entry, "utf8"))) {
    throw new Error("round-trip mismatch: bytes read back differ from entry");
  }
  return file;
}

function selfTest(): void {
  const bad: Array<[string, string]> = [
    ["", "not-blank"],
    ["   \t ", "not-blank"],
    ["x".repeat(MAX_CHARS + 1), "max-200-chars"],
    ["line one\nline two", "single-line"],
    ["line one\r\nline two", "single-line"],
  ];
  for (const [input, rule] of bad) {
    let msg = "";
    try {
      validate(input);
    } catch (e) {
      msg = (e as Error).message;
    }
    if (!msg.includes(rule)) throw new Error(`self-test: expected rule ${rule}, got "${msg}"`);
    console.log(`ok  rejected by ${rule}`);
  }
  validate("x".repeat(MAX_CHARS));
  console.log("ok  200-char entry accepted");

  const tmp = mkdtempSync(join(tmpdir(), "catjoke-"));
  try {
    const file = writeEntry(join(tmp, "output"), ENTRY);
    if (!readFileSync(file).equals(Buffer.from(ENTRY, "utf8"))) throw new Error("self-test: round-trip differs");
    console.log("ok  real entry round-trips byte-identical");
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
  console.log("self-test passed");
}

function main(): void {
  if (process.argv.includes("--self-test")) return selfTest();
  const file = writeEntry("output", ENTRY);
  console.log(`wrote ${file} (${ENTRY.length} chars)`);
}

main();
