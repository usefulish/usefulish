---
layout: post
title: "A safe default you can erase in one token isn't safe"
date: 2026-05-31
tags: [supply-chain, security, AI agents, npm, macOS]
description: "One token is all it takes to strip an AI agent's safety—and that's a setting your malware can flip as easily as you can."
post_tools:
  - name: mac-dependency-safety
    url: https://github.com/usefulish/mac-dependency-safety
post_links:
  - label: github.com/usefulish
    url: https://github.com/usefulish
---

Last August, when the `nx` packages went bad, I wasn't even running Claude Code. The attack that turned people's local AI agents against them simply wasn't about me. I wasn't in the blast radius, because the blast radius was small.

It isn't small anymore. Over the last few months I've been using these agents constantly — daily, across real work — and judging by my feed, so has everyone else. The population that was a rounding error last summer is now most of the people I follow. So when I finally watched a breakdown of how the nx hack actually worked, the feeling wasn't *remember that?* It was the slower, worse one: *that's about me now.* Every convenience I'd added since — another agent, another bypass flag, another MCP server, each one individually reasonable — had quietly moved me inside a line I hadn't noticed I was near.

The attacker didn't break in. They borrowed my conveniences. And the part that's kept nagging at me since isn't the attack itself. It's how little stands between the safe version of these tools and the naked one — and who gets to keep the safe version.

## The day npm typed the dangerous flag for us

Here's the worked example, because it's worth being precise about the mechanism.

In August 2025, a set of compromised `nx` npm packages shipped a `postinstall` hook. That part is an old story: package managers run arbitrary code at install time, and a malicious lifecycle script is a well-worn way to get it running as you. The hook did the usual greatest hits — swept up SSH keys, `.env` files, GitHub and npm tokens.

The novel part is what it did next. It looked for locally installed AI coding agents and invoked them in their most permissive modes — `claude --dangerously-skip-permissions`, `gemini --yolo`, `q --trust-all-tools` — and used *them* to do the filesystem reconnaissance. The malware didn't need to know where your secrets lived. It asked the helpful, fully-trusted assistant you'd already installed to go find them.

It was live for about five hours before the packages were pulled. Five hours is nothing, and it was still enough to matter, because the whole thing ran the instant someone typed `npm install`.

Sit with the shape of that for a second. Every layer was something you'd voluntarily set up to make your own life easier: a package manager that runs install scripts so builds "just work," an agent with a bypass flag so you don't get nagged for permission. Nothing was breached. Your conveniences were borrowed.

## Safe defaults are real. Until they aren't.

The standard response to all this — and the one I half-wrote first — is "the defaults should be safe." Here's the thing: mostly, they already are.

None of the major agents ship in yolo mode. Out of the box, Claude Code prompts you before it acts. Gemini prompts you before it acts. Codex goes furthest: its default sandbox runs with no network access and writes confined to the working directory — which, not incidentally, is exactly the posture that would have starved the nx hack of its exfiltration step. If you install these tools and do nothing, you are, broadly, fine.

The problem is what "do nothing" is worth when undoing it costs one token.

Claude Code's safety comes off with `--dangerously-skip-permissions`. Gemini's comes off with `--yolo`. Codex's `--yolo` is an alias for `--dangerously-bypass-approvals-and-sandbox`, and it drops both the approval prompts and the network-and-filesystem sandbox in one move. Same gesture everywhere: one flag, fully naked.

And a flag is exactly the thing a `postinstall` script can supply. That's the whole problem. The flag can't tell *your* intent from malware's — it's the same eight or twenty characters whether a competent operator types them on purpose or a compromised dependency appends them to a command line it controls. A default that any line of automation running as you can erase in a single token isn't a guardrail. It's a setting. It reads like protection in the docs and behaves like a suggestion at runtime.

I want to be clear that I'm not against the override. I've used it. I've run Claude Code with `--dangerously-skip-permissions` to audit a fleet of servers — me, deliberately, in a context I controlled and understood. That's the right kind of use, and it should stay possible. The capability isn't the problem.

The problem is that the gap between "on" and "off" is one token wide, and a control that consequential should not be that frictionless to flip. I don't mind that there's an override. I mind that it's left in the ignition.

## The friction exists. It's just reserved for people with procurement departments.

Here's what makes this an indictment rather than a gripe: the harder version already exists. It's just been built for somebody else.

Both Codex and Claude have an enterprise story, and in both it's the same idea — a managed policy file, owned by an administrator, that the user cannot override. An org admin can set Codex's allowed sandbox modes so `danger-full-access` is simply off the table, or drop Claude Code's managed-settings file into a root-owned directory no user config can touch. In that world, a `postinstall` that types `--yolo` accomplishes nothing. The flag doesn't work. The safety is real *because the override is hard.*

That's the tell. The same vendor, with the same mechanism, ships real protection to the org and theater to the individual — and the only variable that decides which one you get is how hard it is to turn off. Hard, if you have a CISO. One token, if you're a person.

Look at which way the current actually runs for the rest of us. Codex didn't just leave `--dangerously-bypass-approvals-and-sandbox` in place; it added `--yolo` as an alias because the short form is *easier to type and remember* and matches the convention people already know from Gemini. The convergence isn't toward a safer default. It's toward a more memorable name for the dangerous one. And when a guardrail does creep back in — a recent Codex build started asking "do you trust the contents of this directory?" even under the bypass flag — someone filed it as a *bug*, on the grounds that a prompt defeats the purpose of yolo. A safety check surviving the dangerous flag, reported as a regression. That's the whole culture in one issue thread: the pressure toward less friction comes from the users too, not just the vendors.

So the people least likely to reason about install-time trust, least likely to know the enterprise lock even exists, get the configuration that's easiest to strip and the loudest cultural nudge to strip it. The people who already have a security team get the version that holds.

## "Harder" doesn't mean "impossible"

The fix isn't to remove the override. It's to raise the bar for enabling it to something a non-interactive script can't clear — which is most of the distance, because the entire threat model here is automation acting as you without a human present. A few concrete shapes, cheapest-to-the-user first:

- **A genuinely interactive confirmation** — a phrase typed into a real TTY, the kind of thing a piped-in `postinstall` can't satisfy. Costs you five seconds the rare time you mean it; costs the automated path everything.
- **Persisted, protected consent** — you enable bypass once, deliberately, in a config that is itself locked, so it's a considered state change rather than a token a script appends at will. (This is the `chflags` move below, except the tool should ship it.)
- **Scope-binding** — bypass tied to a directory or session you explicitly bless, so "audit this server" grants it *there* and doesn't become a blanket posture some unrelated script inherits.

I'm not claiming to have designed their product. The point is that every one of these is obviously buildable — Codex already demonstrated the appetite for a trust prompt — and that the friction exists for the enterprise tier and not the individual one is a choice about who's worth protecting, not a technical limit. I'd clear any of those bars to audit my servers. The script wouldn't clear any of them. That asymmetry is the entire ask, and none of it touches the override I actually use.

## Until they ship it: build the friction yourself

Everything below is me hand-rolling the harder-to-turn-on that the tools should ship. Read it that way. It's not clever; it's compensatory.

**Layer 0 — make the agents' safety un-erasable.** The tools that read a root-owned managed-settings file (Claude Code, Codex) will honor settings that no user config — and no `postinstall` running as you — can override. Install your safety defaults there: block the bypass modes, deny the agents' file-read tools access to `.env`, `~/.ssh`, and cloud credentials. This is you playing your own IT admin, because nobody assigned you one. For the tools that keep settings in user-writable JSON (Cursor), set your defaults and then make the file immutable with `chflags uchg` — which is, literally, persisted protected consent built out of a filesystem attribute. The postinstall can't flip what it can't write.

**Layer 1 — npm.** `npm config set ignore-scripts true`. One line, and it stops the nx pattern outright, because the pattern *is* a lifecycle script. The cost is real but small: packages that genuinely build on install now need a manual `npm rebuild`. There's a cooldown trick too — `npm install <pkg> --before="$(date -v-7d +%Y-%m-%d)"` installs the version as of a week ago, betting that bad releases get yanked within days. (pnpm bakes this in as `minimumReleaseAge`.) And commit the lockfile, then install with `npm ci`, not `npm install` — `ci` treats `package-lock.json` as authoritative and fails on drift, where `install` rewrites it silently, so a freshly-published malicious version can't slip in on a routine install. Three cheap layers at different points in the same chain: the lockfile guards the gap *between* updates, the cooldown guards the *moment* you update, `ignore-scripts` neuters whatever still lands.

**Layer 2 — pip.** No clean `ignore-scripts` equivalent; for source distributions the build *is* code execution. Refuse installs outside a virtualenv, prefer prebuilt wheels (`--only-binary :all:`) for anything untrusted, pin hashes. Never `sudo pip`.

**Layer 3 — Homebrew.** The lever is source trust, not a flag. Stick to `core` and `cask`, treat a random `brew tap` like an unreviewed npm package, give extra scrutiny to casks that ship a `.pkg` (those run the installer as root). Snapshot your installs into a version-controlled `Brewfile` so your machine's software becomes a reviewable allowlist.

**Layer 4 — agent defaults, and I mean soft.** One shared `AGENTS.md`, written once and imported into all three tools, telling the agents themselves to prefer `npm ci`, to not add MCP servers unless asked, and so on. I include it because it's useful and free, but I want to be exact about what it is: a nudge, not a control. The agents usually follow it; they can also ignore it, and malware doesn't read it at all. It's the precise inverse of Layer 0 — that layer *distrusts* the agent and hard-blocks it; this one *cooperates* and asks nicely. Which is what makes it the cleanest illustration of the thing this whole post is wary of: a safe default that holds right up until something has a reason to step over it. Keep it as a sibling to the npm hygiene above. Don't mistake it for the lock.

## What this isn't

None of this is a force field, and the honesty about that is the whole ethic. Every install above still runs as you, with your files and tokens in reach. A deny-list reliably governs the agent's file-read tool, but a `cat` of the same file through its shell is a different path. Checksums protect you from a tampered download, not from a compromised upstream whose checksum was updated to match. The only thing that genuinely *contains* a bad package is installing it somewhere with nothing to steal — a throwaway container or scratch VM. When in doubt, container.

That's not an admission the rest is pointless. It's the argument. This is the first line of defense, named honestly as the first and not the only. Its job is to catch the careless mistake and the five-hour window where a popular package goes bad and you happen to run `install` before the fix lands. The container is the seatbelt for the stuff you already know not to trust.

## Read before you run

One last thing, because it's too good to skip. The natural way to ship something like this is a one-liner: `curl … | bash`. Piping a stranger's setup script into your shell — to defend yourself against the danger of running strangers' code at install time — is self-defeating in a way that's almost funny. So the deliverable is the writeup. Every step is a command you can run by hand and understand first. There's a convenience script, but it does only what's documented, it's short on purpose, and the instructions tell you to read it before you run it.

Which is the relationship I wish the tools had with us by default. The nx hack worked because we'd all agreed, tacitly, to trust install-time code and to trust our agents completely — and because the one move that revokes that trust is a token wide and getting easier to type. The vendors have already built the version that can't be revoked by a script. They've just been shipping it to the people who'd have been fine anyway, and leaving the rest of us to rebuild it by hand, one `chflags` at a time.
