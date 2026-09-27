# mikecopy

A writing skill for Claude Code and Codex. Product copy, articles, personal writing and creative
work, in a voice somebody decided, checked by a script rather than by hoping the model remembers.

It is the writing half of [mikedesign](https://github.com/halymich/mikedesign). mikedesign hands
the words on every page and screen to mikecopy, and both read the same voice record, so a product's
site and app cannot drift into sounding like two companies.

## Install

```bash
git clone https://github.com/halymich/mikecopy.git ~/.claude/skills/mikecopy
ln -s ~/.claude/skills/mikecopy ~/.agents/skills/mikecopy   # Codex
```

Node is the only dependency. Install it next to mikedesign (as a sibling folder) so mikedesign can
load its rules.

## Modes

| Mode | For |
|---|---|
| `product` | Interface strings, landing pages, store listings, the email and push a product sends |
| `longform` | Blog posts, guides, articles, changelogs, writing meant to be found in search |
| `personal` | Emails, LinkedIn posts, pitches and bios, written as you |
| `creative` | Fiction, scripts, poetry, toasts, speeches, invitations and event wording |

## How it stays out of the average

**Voice before words.** A product's voice is recorded once in its `.mikedesign/DESIGN.md`. Your
own voice is built from samples you paste, and kept in your private memory, never in this
repository. One-off pieces get a four-question tone interview.

**Specific beats fluent.** It asks for the real number, name and story rather than inventing a
plausible one. It never fabricates claims, quotes or testimonials.

**Zero tells, in every mode.** `data/rules.json` holds the patterns readers now recognise on sight:
em dashes, "delve", "not just X, it's Y", inflated significance, vague attribution, chat residue,
the stock images of generated fiction. `scripts/lint.mjs` checks for them, plus a voice's own
"never" list. Creative writing gets no exemption.

```bash
node scripts/lint.mjs draft.md --voice path/to/DESIGN.md
pbpaste | node scripts/lint.mjs --stdin
```

Exit 0 is clean, 1 is hard findings, 2 means nothing was read. Exit 2 is never a pass.

## Tests

```bash
bash scripts/verify.sh
```

## Credits

The pattern catalogue draws on Wikipedia's public guide, *Signs of AI writing*, and on the ideas in
the open-source `humanizer` skill, restated and extended here.

## Licence

MIT
