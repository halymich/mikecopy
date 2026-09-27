# longform

Blog posts, guides, articles, hub pages and changelogs. Prose is the medium here, so there is no
body word ceiling, and replacing a paragraph with a diagram usually loses the argument.

## 1. Before a word

- **The claim.** One sentence: what this piece argues, and who it is arguing against. If there is
  no one on the other side, there is no piece yet, only a topic.
- **The reader.** Who arrives, from where, knowing what. A search visitor wants the answer in the
  first screen; a newsletter reader will give you three paragraphs.
- **The proof you have.** Real numbers, real examples, first-hand experience. List them before
  drafting. A section that needs proof you do not have should not exist yet.
- **The voice.** A product's blog uses its `brand.voice`. A piece by the owner uses their personal
  voice. See [../core/voice.md](../core/voice.md).

Gate on the claim and outline before drafting when the angle is new.

## 2. Written to be found

When the piece is meant to rank or be cited by AI search, and an SEO skill is installed, use it for
keyword and competitor research. The writing rules below still apply to its output.

- **Answer first.** The question the title asks is answered in the first 100 words, plainly, then
  the piece earns the rest. Search engines and AI answer boxes quote this paragraph; readers leave
  if it is missing.
- **One search intent per piece.** "How to" and "best X" are different pieces.
- **Headings as the reader's questions**, in sentence case, each answerable on its own, because
  AI search lifts passages, not pages.
- **Experience on the page.** What you did, what happened, what it cost. First-hand detail is what
  ranking systems now reward and what generated competitors cannot supply.
- **Title tag** about 60 characters with the main term early. **Meta description** about 155,
  written as the reason to click, not a summary.
- **Link out** to primary sources by name. Link in to the two or three pages a reader needs next.

## 3. Drafting

- The first paragraph is usually throat-clearing. Delete it and read again.
- Vary paragraph length on purpose. Vary section depth: sections are owed what their content
  needs, not equal time.
- Concede something real. A piece that admits a limit is trusted on everything else.
- End on the last real thing, or on what to do next. Never on the future or on significance.

## 4. Changelogs

Lead with what the user can now do, in their words, not what the team shipped in theirs. One line
per change. Fixes say what was broken from the user's side. No "various improvements".

## 5. Verify and show

Lint the markdown with `--voice`. Fenced code is skipped. Show the article rendered in the site's
own reading styles at its real measure when there is a site; otherwise hand back the markdown.
Report word count, the claim in one line, and any proof you asked for but did not get.
