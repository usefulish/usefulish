# LinkedIn spec fetcher

This script fetches a small set of official LinkedIn and Microsoft Learn pages, extracts stable ad constraints, and normalizes them into JSON for Jekyll.

Run it with:

```bash
node scripts/linkedin/fetch.mjs
```

Optional check mode:

```bash
node scripts/linkedin/fetch.mjs --check
```

Output:

```text
_data/specs/linkedin.json
```

Behavior:

- Writes only when the normalized spec data changes.
- Prints `No changes detected — skipping write` when nothing changed.
- Fails closed: if a required section cannot be fetched or parsed, it exits with an error and does not overwrite the JSON.

Official source pages:

- https://www.linkedin.com/help/linkedin/answer/a426534
- https://www.linkedin.com/help/linkedin/answer/a424737
- https://www.linkedin.com/help/linkedin/answer/a427022
- https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/post-api-schema?view=li-lms-2026-02
