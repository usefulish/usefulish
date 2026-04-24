# saving-myself-from-myself
Claude skills for catching my own mistakes before they become permanent.

### The problem
Some errors are just annoying. Some are annoying and irrecoverable — leaked API keys, personal server hostnames in a public repo, hardcoded paths that only exist on my machine. The window between "seems fine" and "already indexed by GitHub" is shorter than the time it takes to notice.
These skills give Claude enough context to catch the obvious stuff before I do something I'll have to clean up from git history.

## What's in here
```last-looks
A pre-push scan for repos going public. Checks git-tracked files for:

API keys, tokens, and credentials
Hardcoded absolute paths
Personal infrastructure details (server names, internal IPs, tunnel URLs)
Sensitive files lurking in git history even if they've since been deleted

Trigger it by saying things like "last looks", "ready to push", or "check before I push".

## Philosophy
This skill exists because I did the thing it prevents, or came close enough to add it proactively.
