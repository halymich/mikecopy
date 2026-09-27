# Patterns that make writing read as machine-made

Load this when editing a draft that sounds generated, whoever wrote it, and for the final read of
anything you wrote yourself. Patterns marked with a rule id are checked by `scripts/lint.mjs`. The
rest are judgment, and they are the ones that matter most, because they survive a clean lint.

The catalogue draws on Wikipedia's public guide, *Signs of AI writing*, restated and extended here.

## How to edit a draft that sounds generated

1. **Read it once for meaning.** Write down, in one line, what it is actually saying. If you cannot,
   the draft has no claim and the fix is a conversation with the owner, not a rewrite.
2. **Run the linter** and fix every hard finding.
3. **Read for the judgment patterns below.** Mark them, do not fix yet.
4. **Rewrite from the one-line claim**, in the voice on record, keeping every fact and dropping
   every flourish. Rewriting beats patching: a draft fixed phrase by phrase keeps its shape, and the
   shape is usually the tell.
5. **Check nothing factual changed.** Numbers, names, promises and legal wording survive untouched
   unless the owner said otherwise.

## Content

- **Inflated significance** (`significance-inflation`). "Plays a vital role", "marks a pivotal
  moment". Replace the claim of importance with the consequence.
- **Notability by assertion.** "Widely covered", "featured in major outlets" with no outlet named.
  Name them or cut it.
- **Trailing -ing analysis** (`superficial-ing`). ", highlighting the importance of". End at the
  fact.
- **Promotional register** (`promotional-tone`, `filler-copy`). "Nestled", "breathtaking",
  "seamless", "robust". Use the plain word or the number.
- **Vague attribution** (`vague-attribution`). "Experts say", "studies show". Name and link, or own
  the claim, or cut it.
- **The challenges-and-future section.** A closing section that lists challenges and then says the
  future is promising anyway. Delete it or replace it with one real open problem.

## Language

- **The vocabulary** (`ai-vocabulary`). Delve, tapestry, pivotal, myriad, intricate. The fix is
  the ordinary word.
- **Avoiding "is"** (`copula-avoidance`). "Stands as", "serves as a testament to". Say "is".
- **Negative parallelism** (`negative-parallelism`). "Not just X, it's Y." State Y.
- **Rule of three** (`rule-of-three-headline` for headlines, judgment elsewhere). Three items where
  there are two real ones. Count the real ones.
- **Synonym cycling.** Calling the same thing "the tool", "the platform", "the solution" in three
  sentences to avoid repetition. Pick the name and repeat it; readers track nouns, not variety.
- **False ranges.** "From small startups to global enterprises" when the range means nothing. Say
  who it is actually for.
- **Hedge stacks** (`hedge-stack`). "May potentially". One hedge, where there is real doubt.
- **Formal transitions** (`formal-transition`). "Furthermore," "Moreover,". Usually deletable.

## Structure

These are the tells that survive a vocabulary fix.

- Every paragraph the same length.
- Every section the same depth, as though each heading were owed equal time.
- A bolded lead-in on every list item.
- A summary paragraph restating what the reader just read.
- Headings in Title Case (`title-case-heading`) and emoji as bullets (`emoji-heading`).
- Bold scattered through prose until nothing stands out.
- Throat-clearing openings (`throat-clearing-open`): delete the first paragraph and see if anything
  died.
- Endings that reach for significance (`tidy-ending`): end on the last real thing, or on an
  instruction.

## Communication

- **Chat residue** (`llm-artifact`, `knowledge-cutoff`). Citation stubs, "as of my last update",
  "I hope this helps". Delete.
- **Servility** (`sycophantic-open`). "Great question!", "Absolutely!". Delete.
- **Over-agreement.** Writing that never concedes a downside. Concede one real thing; it is the
  fastest way to sound like someone who has used the product.

## Creative work

The same rules, plus the images generated fiction reaches for (`creative-cliche`): the air thick
with anticipation, a shiver down the spine, a breath they did not know they were holding, and
characters named Elara. Also watch for, by judgment:

- **Theme stated out loud.** The character realises the lesson in a sentence. Cut the sentence;
  if the scene did not show it, fix the scene.
- **Feelings named instead of shown.** "She felt a deep sadness." Give the gesture, the object,
  the thing said instead.
- **Symmetrical endings.** Everything resolved, a callback to the first line, a moral. Leave
  something open.
- **Dialogue that explains.** People in real conversations interrupt, dodge and talk past each
  other. Nobody recaps what both of them already know.
- **Poems that rhyme on the obvious word**, or do not rhyme at all only because rhyming was hard.
  Decide the form, then keep it.
