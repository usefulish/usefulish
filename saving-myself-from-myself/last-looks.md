---
layout: skill
title: "last-looks"
slug: last-looks
permalink: /saving-myself-from-myself/last-looks/
tagline: "A pre-push safety scan for repos going public. Finds secrets, absolute paths, and personal infrastructure details you should sanitize before the repo is visible."
triggers:
  - last looks
  - ready to push
  - check before I push
  - pre-push review
  - going public
source_url: https://github.com/usefulish/usefulish/blob/main/skills/saving-myself-from-myself/last-looks/SKILL.md
---

## What to scan for

### 1. Secrets and credentials

- API keys and tokens (look for patterns like long alphanumeric strings after keywords: `key`, `token`, `secret`, `password`, `api_key`, `auth`, `bearer`, `credential`, `private_key`)
- Private key file contents (`-----BEGIN ... KEY-----`)
- `.env` files committed to the repo (check git-tracked files, not just working directory)
- Hardcoded passwords in config files or scripts

### 2. Absolute paths

- Any path starting with `/Users/`, `/home/`, `/root/`, or a Windows-style `C:\` that's hardcoded in source files, configs, or scripts
- These expose local machine structure and break portability

### 3. Personal infrastructure details

These aren't security risks but are sloppy in a public repo — flag for sanitization:

- Internal hostnames (e.g. your server names, NAS, local machine names)
- Internal IP addresses (192.168.x.x, 10.x.x.x, or VPN ranges like 100.x.x.x if you use Tailscale)
- Private service URLs (self-hosted tunnels, internal dashboards, etc.)
- Any personal domain names not intended to be public

**To customize:** add your own hostnames, IPs, and service URLs to this section before using the skill. The generic patterns above will catch common cases, but anything specific to your setup should be listed explicitly.

## Workflow

### 1. Establish the repo root

If the user specified a path, use it. Otherwise use the current working directory in Claude Code, or ask in Claude Desktop. Confirm the path before scanning.

### 2. Identify files to scan

Focus on git-tracked files:

```bash
git -C <repo> ls-files
```

Skip binary files, images, and lockfiles (`package-lock.json`, `yarn.lock`, `*.lock`). If `.gitignore` exists, note any files that look sensitive but are already ignored — mention them briefly as "correctly excluded."

### 3. Scan

Run targeted searches across all relevant files. Be thorough — scan file contents, not just filenames. Use grep-style searches for each category.

Also check:

```bash
git -C <repo> log --all --full-history -- "*.env" "*.pem" "*.key"
```

to catch sensitive files that may have been committed and then deleted (still in git history and fully visible to anyone who clones the repo).

### 4. Report findings

Structure the report as:

---

**🔴 Secrets / credentials** — list each finding: file, line number, what was found. Redact the actual secret value in your output — show `sk-...` not the full string. If none found, say so.

**🟡 Absolute paths** — list each: file, line number, the path. If none, say so.

**🟡 Infrastructure / personal details** — list each: file, line number, what was found. If none, say so.

**✅ Correctly excluded** — any sensitive-looking files already in .gitignore worth confirming.

**Git history** — flag if any sensitive files appear in commit history even if now deleted — cleaning this requires a force-push or history rewrite, not just editing a file.

---

Close with: *"These are findings — final call is yours before you push."*

## Tone

Matter-of-fact. No alarm unless something is genuinely serious (committed private key, live API key). Flag personal infra details as "worth sanitizing" not as security issues.
