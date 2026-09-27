#!/usr/bin/env node
/*
 * mikecopy text linter.
 *
 *   node lint.mjs <file-or-dir...> [--voice <file.md>] [--json]
 *   echo "some draft" | node lint.mjs --stdin [--voice <file.md>]
 *
 * --voice points at any markdown file with one fenced ```json block holding a
 * voice profile: a product's .mikedesign/DESIGN.md (read from brand.voice) or a
 * personal voice file (read from voice). Its "never" list becomes hard findings,
 * and its "allow" list silences rules the owner deliberately overrode.
 *
 * Same two promises as mikedesign's linter:
 *   1. It reports what it actually read.
 *   2. It never reports a pass when it read nothing. No coverage, no verdict.
 *
 * Exit codes: 0 clean · 1 hard findings · 2 no verdict possible (or usage error).
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const RULES = JSON.parse(readFileSync(join(HERE, '..', 'data', 'rules.json'), 'utf8'));

const argv = process.argv.slice(2);
const opt = { paths: [], voice: null, json: false, stdin: false };
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--voice') opt.voice = argv[++i];
  else if (a === '--json') opt.json = true;
  else if (a === '--stdin') opt.stdin = true;
  else if (a === '--help' || a === '-h') { usage(); process.exit(2); }
  else if (a.startsWith('--')) { console.error(`unknown argument: ${a}`); usage(); process.exit(2); }
  else opt.paths.push(a);
}

function usage() {
  console.error('usage: lint.mjs <file-or-dir...> | --stdin  [--voice <file.md>] [--json]');
}

if (!opt.stdin && opt.paths.length === 0) {
  console.error('mikecopy: nothing to read. Pass files, a directory, or --stdin.');
  usage();
  process.exit(2);
}

/* ---------- voice profile ---------- */

function loadVoice(path) {
  const empty = { found: false, never: [], allow: [] };
  if (!path) return empty;
  if (!existsSync(path)) return { ...empty, error: `no file at ${path}` };
  const m = readFileSync(path, 'utf8').match(/```json\s*([\s\S]*?)```/);
  if (!m) return { ...empty, found: true, error: 'no fenced json block' };
  let cfg;
  try { cfg = JSON.parse(m[1]); } catch (e) { return { ...empty, found: true, error: e.message }; }
  const brand = cfg.brand || cfg;
  const v = brand.voice || cfg.voice || {};
  return {
    found: true,
    never: Array.isArray(v.never) ? v.never.filter(Boolean) : [],
    allow: [...(brand.allow || []), ...(v.allow || [])],
  };
}
const voice = loadVoice(opt.voice);
if (voice.error && opt.voice) {
  console.error(`mikecopy: voice file unusable (${voice.error}).`);
  process.exit(2);
}
const allowed = new Set(voice.allow);

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const rules = RULES.rules.filter((r) => r.scope === 'text' && r.test.type === 'text-pattern');
if (voice.never.length) {
  rules.push({
    id: 'voice-never',
    severity: 'hard',
    title: 'Phrase this voice never uses',
    why: 'The voice profile lists it as something this owner would never say. A recorded decision, enforced.',
    fix: 'Say it the way this owner would. The profile quotes phrases they do use.',
    test: { pattern: `\\b(${voice.never.map(escape).join('|')})\\b`, flags: 'gi' },
  });
}

/* ---------- read ---------- */

const TEXTUAL = new Set(['.md', '.mdx', '.txt', '.html', '.htm', '.eml', '.json', '.yml', '.yaml', '.strings', '.xml']);
const IGNORE_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'out', 'vendor', 'coverage']);
const coverage = { files: 0, skipped: 0, words: 0 };
const inputs = [];

function walk(p, explicit) {
  let st;
  try { st = statSync(p); } catch { coverage.skipped++; return; }
  if (st.isDirectory()) {
    for (const name of readdirSync(p)) if (!IGNORE_DIRS.has(name)) walk(join(p, name), false);
    return;
  }
  // A file named directly is read whatever its extension: the user chose it.
  if (!explicit && !TEXTUAL.has(extname(p))) { coverage.skipped++; return; }
  try { inputs.push({ name: p, text: readFileSync(p, 'utf8') }); } catch { coverage.skipped++; }
}

if (opt.stdin) {
  let text = '';
  try { text = readFileSync(0, 'utf8'); } catch { text = ''; }
  if (text.trim()) inputs.push({ name: 'stdin', text, markdown: true });
}
for (const p of opt.paths) walk(p, true);

/* ---------- check ---------- */

const findings = [];
for (const input of inputs) {
  coverage.files++;
  const lines = input.text.split('\n');
  coverage.words += input.text.split(/\s+/).filter(Boolean).length;

  // Fenced code is not prose, and its wording is not the author's voice.
  const fenced = new Set();
  const md = input.markdown || ['.md', '.mdx', '.txt'].includes(extname(input.name));
  if (md) {
    let open = false;
    lines.forEach((line, i) => {
      if (/^\s*(```|~~~)/.test(line)) { open = !open; fenced.add(i); return; }
      if (open) fenced.add(i);
    });
  }

  for (const rule of rules) {
    if (allowed.has(rule.id)) continue;
    const re = new RegExp(rule.test.sourcePattern || rule.test.pattern, rule.test.flags || '');
    lines.forEach((line, i) => {
      if (fenced.has(i)) return;
      const m = line.match(re);
      if (!m) return;
      findings.push({
        id: rule.id,
        severity: rule.severity,
        title: rule.title,
        why: rule.why,
        fix: rule.fix,
        where: `${input.name}:${i + 1}`,
        evidence: m[0].trim().slice(0, 120),
      });
    });
  }
}

/* ---------- verdict ---------- */

const hard = findings.filter((f) => f.severity === 'hard');
const advisory = findings.filter((f) => f.severity === 'advisory');
const inspected = coverage.files > 0 && coverage.words > 0;

if (opt.json) {
  console.log(JSON.stringify({
    verdict: !inspected ? 'no-verdict' : hard.length ? 'fail' : 'pass',
    coverage,
    voice: { loaded: voice.found, never: voice.never.length, allow: [...allowed] },
    findings,
  }, null, 2));
  process.exit(!inspected ? 2 : hard.length ? 1 : 0);
}

const out = (s) => console.log(s);
out('');
out(`mikecopy lint · ${coverage.files} input(s), ${coverage.words} words read, ${coverage.skipped} skipped`);
out(voice.found
  ? `  voice: ${voice.never.length} never-phrases enforced, ${allowed.size} rule overrides`
  : '  voice: none loaded (pass --voice to enforce a profile\'s never list)');
out('');

if (!inspected) {
  out('NO VERDICT. Nothing was read, so this is not a pass.');
  out('');
  process.exit(2);
}

const show = (list, label) => {
  if (!list.length) return;
  out(`${label} (${list.length})`);
  for (const f of list) {
    out(`  · ${f.title}`);
    out(`      where: ${f.where}`);
    out(`      found: ${f.evidence}`);
    out(`      fix:   ${f.fix}`);
  }
  out('');
};
show(hard, 'HARD (these gate the result)');
show(advisory, 'ADVISORY (judgment, not a block)');
if (!findings.length) out('No findings.');
out('A clean result means no known tell was found. It says nothing about whether the writing is good.');
out('');
process.exit(hard.length ? 1 : 0);
