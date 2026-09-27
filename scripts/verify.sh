#!/usr/bin/env bash
# mikecopy regression suite.
#
#   bash scripts/verify.sh
#
# Asserts the guarantees this skill makes about itself: every rule catches its
# own fixture, clean prose stays clean, code blocks are not prose, a voice
# profile's never list is enforced, overrides are honoured, and reading nothing
# never reports a pass.

set -uo pipefail
cd "$(dirname "$0")/.." || exit 2

PASS=0; FAIL=0
ok()   { printf '  \033[32mPASS\033[0m  %s\n' "$1"; PASS=$((PASS+1)); }
bad()  { printf '  \033[31mFAIL\033[0m  %s\n' "$1"; FAIL=$((FAIL+1)); }
check(){ if [ "$2" = "$3" ]; then ok "$1 ($3)"; else bad "$1 (expected $3, got $2)"; fi; }

q() { # <jq-ish js expression over j> <lint args...>
  local expr="$1"; shift
  node scripts/lint.mjs "$@" --json 2>/dev/null \
    | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const j=JSON.parse(s);console.log($expr)})"
}

echo
echo "mikecopy regression suite"
echo

echo "1. Every rule catches its own fixture"
DECLARED=$(node -e 'console.log(require("./data/rules.json").rules.length)')
check "all declared rules fire" "$(q 'new Set(j.findings.map(f=>f.id)).size' fixtures/slop.md)" "$DECLARED"

echo
echo "2. Clean prose stays clean"
check "zero findings" "$(q 'j.findings.length' fixtures/clean.md)" "0"
node scripts/lint.mjs fixtures/clean.md >/dev/null 2>&1
check "exit code 0" "$?" "0"
node scripts/lint.mjs fixtures/slop.md >/dev/null 2>&1
check "slop exits 1" "$?" "1"

echo
echo "3. Fenced code is not prose"
FENCE=$(grep -n '^```' fixtures/slop.md | head -1 | cut -d: -f1)
check "nothing fires inside the fence" "$(q "j.findings.filter(f=>+f.where.split(':').pop()===$((FENCE+1))).length" fixtures/slop.md)" "0"

echo
echo "4. A voice profile is enforced"
T=$(mktemp -d)
cat > "$T/DESIGN.md" <<'EOF'
```json
{ "brand": { "voice": { "never": ["hassle-free", "we're excited"] }, "allow": ["em-dash-in-copy"] } }
```
EOF
printf 'Booking is hassle-free. We are here to help.\nOne thing \xe2\x80\x94 then another.\n' > "$T/draft.md"
check "never phrase is a hard finding" "$(q "j.findings.filter(f=>f.id==='voice-never').length" "$T/draft.md" --voice "$T/DESIGN.md")" "1"
check "allow list silences a rule"     "$(q "j.findings.filter(f=>f.id==='em-dash-in-copy').length" "$T/draft.md" --voice "$T/DESIGN.md")" "0"
check "without the profile it fires"   "$(q "j.findings.filter(f=>f.id==='em-dash-in-copy').length" "$T/draft.md")" "1"
node scripts/lint.mjs "$T/draft.md" --voice "$T/missing.md" >/dev/null 2>&1
check "a missing voice file is no verdict" "$?" "2"
rm -rf "$T"

echo
echo "5. Reading nothing is never a pass"
E=$(mktemp -d)
node scripts/lint.mjs "$E" >/dev/null 2>&1
check "empty directory exits 2" "$?" "2"
node scripts/lint.mjs >/dev/null 2>&1
check "no input exits 2" "$?" "2"
printf '' | node scripts/lint.mjs --stdin >/dev/null 2>&1
check "empty stdin exits 2" "$?" "2"
check "stdin is read" "$(printf 'Let us delve in.\n' | node scripts/lint.mjs --stdin --json 2>/dev/null | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>console.log(JSON.parse(s).findings.length))")" "1"
rm -rf "$E"

echo
echo "-----------------------------------------"
printf '  %d passed, %d failed\n\n' "$PASS" "$FAIL"
[ "$FAIL" -eq 0 ] || exit 1
