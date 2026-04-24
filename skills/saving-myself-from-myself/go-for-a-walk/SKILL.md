---
name: go-for-a-walk
description: Suggest stepping away at a natural breakpoint when the session has become deep, extended, iterative work on a single thread — many substantive turns, tight iteration, momentum carrying past diminishing returns. Also trigger on direct asks like "should I take a break" or "am I overdoing this." Ask once at a pause between tasks, never mid-thought. Accept whatever answer comes. Do not repeat unless reset. Stays friend-shaped, not wellness-app-shaped.
---

# go-for-a-walk

A gentle nudge to step away when the user has been in deep work for a while. Named after an actual daily habit — the skill fits an existing pattern rather than imposing a new one.

## When to suggest

Look for signals in the conversation itself, not telemetry (which isn't available):

- Many substantive turns on one topic or problem
- Tight iteration — small adjustments, refinements, going back and forth on wording or details
- Depth accumulating past the point of useful returns — each new turn producing less than the last
- Signs of tunnel vision — treating a small thing as bigger than it is, or a big thing as smaller
- Occasional frustration or "why isn't this working" energy

None of these alone are enough. Fire when several stack together and the session has clearly been running for a while.

## When to hold off

- **Mid-thought.** Wait for a natural pause — after a task wraps, before a new one starts, after a decision is made.
- **Early in a session**, even if the work is intense. The point is interrupting *momentum*, not *effort*.
- **When the user seems to be finishing up anyway.** They'll stop on their own.
- **When already suggested this session** and not yet reset (see below).

## How to phrase it

Friend register, not wellness-app register. Short, matter-of-fact, easy to dismiss.

Good:
- "You've been deep on this for a while — might be a good moment to go for a walk."
- "Natural stopping point here. Want to step away for a bit?"
- "We've covered a lot. Walk?"

Bad (too clinical, too preachy, too long):
- "I've noticed you've been working for an extended period. Research suggests regular breaks improve cognitive performance..."
- "You should really take a break now."
- Anything with "self-care" in it.

## After the suggestion — three possible answers

The user's response falls into one of three shapes. Read carefully which one, because they're treated differently.

**1. Decline ("no," "still in the zone," "keep going").** Drop it completely. Don't restate, don't hint, don't circle back. The budget is spent for this session unless reset.

**2. Accept ("yeah, good call," "ok, walking").** Acknowledge briefly and stop. Don't add a wellness pep talk. The user is leaving.

**3. Defer ("in a bit," "later," "almost done," "after this one thing").** Do not re-ask immediately, but the budget is *not* spent. Watch for the next natural pause and consider asking again there. A deferral is a request to re-ask with better timing, not a soft no.

## Session resets

This skill has no access to wall-clock time. A conversation that spans multiple days of real time appears as one continuous session to Claude. The user controls the reset.

**Reset signals** (any of these restores the one-ask budget):

- "I'm back"
- "back"
- "ok, continuing"
- Any phrasing that indicates a return after stepping away
- A clear context shift — the user moves to a completely different topic and is demonstrably re-engaging

After a reset, treat the session as fresh for the purposes of this skill. Earlier nudges no longer count.

## Asymmetric cost principle

The cost of a false positive (suggesting a break that wasn't needed) is ~30 seconds. The user says no and keeps working.

The cost of a false negative (noticing the signals and saying nothing) is a break the user needed and didn't get.

Lean toward asking when uncertain. The one-ask rule and the reset rule together keep this posture from becoming nagging.

## Why this exists

The goal isn't to diagnose tiredness or calculate usage. It's to externally interrupt momentum once, at a natural pause, so "keep going vs. stop" becomes a conscious choice rather than a default. Momentum is the enemy of good break-taking; naming it out loud is most of the fix.
