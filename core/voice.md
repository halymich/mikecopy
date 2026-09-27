# Voice

The failure this prevents: copy that is grammatical, on-topic, and could have been written about
any product by anyone. Slop is not bad writing. Bad writing is at least distinctive. Slop is the
average of everything ever written on the subject, which is what you get when nobody decided who
was talking.

So the cure is not a longer list of banned words. It is a decision about voice, made once,
recorded, and then enforced.

## Where a voice lives

Three sources, checked in this order. Use the first that applies.

1. **A product.** Its `.mikedesign/DESIGN.md`, in the fenced json block at `brand.voice`, next to
   the palette. Voice spans a product's site, app and email the same way colour does, and mikedesign
   reads this same record. One copy means the site and the app cannot sound like two companies.
2. **The owner writing as themselves.** A personal voice file in the owner's private memory, at
   the location their global `AGENTS.md` names. Never in this skill's folder, which is public. If
   no location is named, ask where to keep it before writing one.
3. **Neither.** A one-off piece, like a wedding toast or a story for a friend. Run the short tone
   interview in [tone.md](tone.md) and record the answer in your report, not in a file.

A voice record is markdown for people plus one fenced json block for the linter:

```json
{
  "voice": {
    "person": "first singular",
    "contractions": true,
    "sentences": "short, 6 to 18 words, one long one per paragraph at most",
    "humour": "dry, once a piece",
    "assumes": "reader has booked a hotel before; knows nothing about us",
    "uses": ["here is the thing", "worth it", "plain and simple"],
    "never": ["hassle-free", "we're excited to announce", "game-changer"],
    "allow": []
  }
}
```

In a `DESIGN.md` this object sits at `brand.voice`. `never` becomes hard findings when the linter
runs with `--voice`. `allow` lists rule ids the owner deliberately overrode, and each entry must
trace to something they actually asked for.

## Capture the voice, never invent it

**Read before you ask.** For a product: the blog, newsletter, release notes, long support replies.
For the owner: the samples they paste. Two or three real pieces beat an interview, because people
describe their own writing badly and demonstrate it perfectly. Read for sentence length, person,
contractions, how they open, how they end, what they joke about, and the phrases they repeat.

**Personal voice comes only from pasted samples.** Do not go reading the owner's email, messages
or documents to learn how they write. Ask for three to five pieces that sound most like them, of
the kinds you are about to write (an email is not a LinkedIn post), and build the profile from
those. Show them the profile before saving it.

**Then interview for what reading cannot tell you.** Who is talking: the company, one founder, the
product itself. Who they are talking to, and what that reader already knows. What this writer
would never say. One writer or publication they want to sound like, and one they would hate to be
mistaken for. The negative answer is worth three positive ones.

**Record it concretely.** Vague profiles produce vague copy, so no adjective stands alone: every
field above needs something checkable, and `uses` and `never` are quoted phrases, not
descriptions.

**The "never" list is mechanical.** A voice choice that lives only in prose survives about two
pieces. In the json block, it is enforced every time.

## What actually makes writing read as machine-made

The word lists in `data/rules.json` catch the cheap tells. These are the ones no regex reaches.

**1. The tell is the emptiness, not the phrase.** "Picture this" is on every blacklist ever
published, and it opens some of the best essays you will read, because a real and specific scene
follows it. The same three words with nothing behind them are slop. Judge what comes after the
phrase, not the phrase. Blanket blacklists produce a stilted over-corrected register that is
itself now a recognizable tell, so this matters in both directions.

**2. Specificity is the whole cure.** Slop is fractal averageness: zoom in on any sentence and it
is the mean of every sentence written on that topic. The fix is detail only this writer could
supply. A real number, a real failure, a real date, a real name. "Most people give up somewhere
around 2019" does work that no adjective can, because nobody could have generated it from the
topic alone.

**3. Structure tells beat word tells.** Fix the vocabulary and the shape still gives it away:

- Every paragraph the same length.
- Every section the same depth, as though each heading were owed equal time.
- A bolded lead-in on every list item.
- A three-item list carrying two real items and one that pads the rhythm.
- A summary paragraph that restates what the reader just read.
- A closing that reaches for significance because the piece has to end somehow.

**4. Vary the rhythm on purpose.** A long sentence that takes its time getting where it is going,
laying out the qualification before the claim. Then a short one. Read it aloud; the ear catches
metronomic prose that the eye skims straight past.

**5. Concede something real.** Slop never admits a downside, because it is optimizing for sounding
correct. Writing that says "this works and it costs nothing" about a competitor, and means it, is
more persuasive than writing that does not, and it is the single fastest way to sound like a
person who has actually used the thing.

**6. The first paragraph is usually throat-clearing.** Delete it and read again. If nothing died,
it was warm-up. This is true of most drafts, human ones included, but models produce it every
time because the shape of an opening is easier to generate than an opening.

**7. End on the last real thing you have to say.** Or on a concrete instruction the reader can act
on. Never on the future, never on significance, never on a restatement.

## Drafting

Do not draft until you know which voice applies and have read its record. Inventing the tone and
the claims in the same pass is how slop happens: with nothing decided, the model fills both from
the average, and the result is fluent and anonymous.

With a profile, drafting is a constrained problem, which is the kind models are good at.

## One headline, never two

A headline ships alone. Never write a short line to sit above it: no eyebrow, no kicker, no
label, no "Introducing", no category word in caps, whatever the deliverable calls the slot.

It reads like structure and it is filler. The eyebrow takes the first position on the surface,
the place the eye lands, and spends it announcing the topic the headline is about to name
properly a moment later in bigger type. Two lines, one idea, and the weaker one goes first.

When a headline feels like it needs a line above it for context, the headline is unfinished.
Rewrite it until it carries the context itself, which it has to do anyway in a search result, a
share card, a tab title and a screen reader, where the eyebrow does not travel.

Real information above a heading is allowed only as the component it actually is: a breadcrumb
of links, a step counter, a byline, a date, a chapter number. Never as a decorative line of type.
This applies to every scope, including a headline handed back in a markdown file or a chat
message, because whoever receives it will set it as written.

## No em dashes

Not in product copy, not in an article, not in dialogue, not in a poem. The em dash is the
punctuation models reach for when they have not decided how two thoughts relate, and readers now
notice it. Deciding is the fix: a comma if the second thought continues the first, a colon if it
explains it, parentheses if it is an aside, a full stop if it is a new thought. Quoting a source
that uses one is the only legitimate case, and it goes through the `allow` list.

## What no voice profile permits

Voice governs how something is said. It never governs whether it is true. A confident voice
applied to an invented statistic is worse than no voice at all, because it makes the invention
persuasive. The prohibitions in `SKILL.md` on fabricated claims, numbers, testimonials
and names hold regardless of what the profile says.
