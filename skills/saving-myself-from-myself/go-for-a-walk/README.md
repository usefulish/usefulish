# go-for-a-walk

Most Claude skills optimize for output — commit messages, PR summaries, code reviews, faster everything. This one optimizes for the conditions output comes from.

It watches for signs you've been deep on one thing for a while, and at the next natural pause, suggests stepping away. Once per session. Drop it if you say no. Re-ask if you say "later." Reset when you say you're back.

Named after what I actually do. Fork it and name it after what you do — `hit-the-gym`, `make-lunch`, `pet-the-dog`, whatever form your break takes. The structure does the work; the suggestion is just the filling.

## Customize

Edit `SKILL.md`. The parts most people will want to change:

- The `name` in frontmatter
- The phrasing examples under "How to phrase it"
- The "Why this exists" section, optionally, if your framing differs

Everything else — the signal list, the three-answer handling, the session reset rule — is the reusable structure. Leave it unless you want to change behavior, not branding.
