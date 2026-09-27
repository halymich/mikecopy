# product

The words a product ships: interface strings, marketing pages, the email and push it sends, and its
store listing.

When mikedesign called you, it has already decided the surface, its type and its layout. Your job
is the words, in the voice at `brand.voice` in that project's `.mikedesign/DESIGN.md`. Hand them
back in place; mikedesign renders and shows them.

## 1. Scope it

| Scope | Covers |
|---|---|
| `interface` | headlines, subheads, labels, buttons, errors, empty states, tooltips, onboarding |
| `marketing` | landing and site copy, title tags, meta descriptions, share card text |
| `lifecycle` | transactional and lifecycle email, push, in-app messages |
| `store` | App Store and Play Store name, subtitle, description, keywords, release notes |

Articles and changelogs are [longform.md](longform.md). Store panel captions belong to
mikedesign's `screenshots` command, which owns their six-word budget.

## 2. Voice before words

Read `brand.voice` in `DESIGN.md`. If it is missing, capture it per [../core/voice.md](../core/voice.md)
and add it there, at brand level, so mikedesign and every later piece inherit it. Editing existing
copy needs enough of a voice to know what you are preserving: cutting words is safe, changing how
something sounds without knowing how it should sound is not.

## 3. Budgets

Rendered pages have word ceilings in mikedesign's `data/rules.json`, keyed by surface type, and
mikedesign's linter enforces them. The formats below have ceilings too, and they are yours to
apply, because nothing in a file says which string is a subject line:

- **Email subject** 9 words, and it must survive truncation at about 35 characters on a phone.
- **Email preheader** 14 words, and it must not restate the subject.
- **Push title** 6 words. **Push body** 20.
- **Store subtitle** 30 characters, hard, set by Apple. The first three lines of a store
  description are the only ones shown before "more", so they carry the whole listing.
- **Title tag** about 60 characters. **Meta description** about 155.

Say in the report that you applied these by hand. Nothing else checked them.

## 4. When text runs over

**The fix is usually not shorter text. It is a different medium.** A paragraph explaining how the
product works wants to be a mockup. A list of steps wants to be a diagram. A claim about speed wants
to be a demonstration. Tell mikedesign (its `illustrate` command) rather than compressing prose into
tighter prose, and never solve overflow by shrinking type.

## 5. How to cut

1. **Delete whole sentences before trimming words.** The second sentence usually restates the
   first with more adjectives.
2. **Cut the wind-up.** "We built this because we believe" prefixes the actual claim. Start at it.
3. **Name the thing.** "Solutions", "platform", "experience" are what you write before deciding
   what the product is. Use the product's own words.
4. **Controls name their action.** "Start watching this price", not "Submit". "Get started" is what
   a button says when nobody decided what happens next.
5. **Errors name the problem and the recovery.** Not the code, and not an apology.
6. **Empty states say what goes here and how to add the first one.** They are the first thing a
   new user reads, and they ship broken more than any other string.
7. **Email that a system sends is still written by someone.** The subject says what happened
   ("Your Toronto booking dropped $38"), the first line says what to do, and the footer says why
   they got it.

## 6. Verify

For copy in source files, run the linter on those files with `--voice` pointing at `DESIGN.md`.
For copy on a rendered page, mikedesign's linter loads these same rules and checks the text a
visitor actually reads. Report the cuts, word counts before and after, and anything left long on
purpose with the reason.
