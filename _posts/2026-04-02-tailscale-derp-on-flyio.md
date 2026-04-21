---
title: "Running a Custom Tailscale DERP Server on Fly.io"
date: 2026-04-02
tags: [tailscale, fly.io, networking, self-hosted]
---

# Running a Custom Tailscale DERP Server on Fly.io

There's almost no documentation about running a Tailscale DERP server specifically on Fly.io. Most guides assume a traditional VPS with root access, manual cert management, and a static IP you control outright. Fly.io works differently — and those differences create exactly the friction points that cause people to give up midway.

This guide covers what actually works, including the mistakes that are easy to make.

---

## What is a DERP server and do you need one?

DERP (Designated Encrypted Relay for Packets) is Tailscale's relay protocol. When two devices can't establish a direct WireGuard connection — due to hard NAT, restrictive firewalls, or network conditions — they fall back to routing encrypted traffic through a DERP server.

Tailscale runs DERP servers globally and selects the nearest one automatically. For most people, those servers are more than adequate.

You might want your own DERP if:

- You want a relay geographically closer to your devices than Tailscale's nearest server
- You travel frequently and want a relay that follows your location
- You prefer your relay infrastructure to be under your control

Note: DERP servers only ever see encrypted WireGuard packets. Even your own DERP server cannot decrypt your traffic.

---

## Why Fly.io

Fly.io lets you deploy containerised apps to specific geographic regions with minimal configuration. If you already have a legacy Fly.io account (pre-October 2024), you have a free allowance of up to 3 shared-CPU VMs and 100GB of outbound data transfer per month — enough to run one or two DERP nodes at effectively no cost.

The key advantage: you can deploy a DERP relay in Stockholm (`arn`), Boston (`bos`), Tokyo (`nrt`), or any other Fly.io region and point your Tailscale config at it.

---

## Prerequisites

- A Fly.io account with `flyctl` installed and authenticated
- A domain you control with DNS on Cloudflare (or another provider)
- A Tailscale account with access to the ACL editor

---

## Step 1 — Create the Fly app

If you're starting fresh:

```bash
mkdir fly-arn-derp && cd fly-arn-derp
fly apps create arn-derp --machines
```

Choose your target region when prompted, or set it in `fly.toml` later.

---

## Step 2 — Allocate a dedicated IPv4

This is the step that isn't obvious and will break your setup if you skip it.

Fly.io apps get a shared IPv4 by default. Shared IPs route through Fly's proxy layer using SNI-based routing. DERP performs a protocol switch inside TLS — from HTTP to a custom binary protocol — that is fundamentally incompatible with SNI-based proxying.

**You need a dedicated IPv4.**

```bash
fly ips allocate-v4 --app arn-derp
```

Note the IP address returned. This is what you'll use for your DNS A record.

> **Cost note:** Dedicated IPv4 addresses are listed at $2/month. However, Fly.io does not collect bills under $5.00 — they are discounted to $0 automatically. A single DERP node (IP + tiny VM) runs around $1.88–$2.00/month in practice, which falls below this threshold. Two nodes stay under $4/month, still below the collection threshold. Your actual out-of-pocket cost may be $0/month. Verify against your own billing dashboard.

---

## Step 3 — Set up DNS

Add an A record at your DNS provider pointing your chosen subdomain to the dedicated IPv4:

```
arn.yourdomain.com  A  137.66.0.194
```

**Critical: do not proxy this through Cloudflare.** Set the record to DNS-only (grey cloud in Cloudflare). Routing DERP traffic through Cloudflare's proxy will break TLS negotiation for the same reason shared IPs break it — DERP is not standard HTTP.

A CNAME to `arn-derp.fly.dev` will not work either. That was the most common failure point when documentation was even harder to find.

---

## Step 4 — Create the Dockerfile

The `fredliang/derper` Docker image packages the official `derper` binary with environment variable configuration, removing the need to build Go binaries yourself.

Create a `Dockerfile` in your project directory:

```dockerfile
FROM fredliang/derper:latest
```

That's the entire file.

---

## Step 5 — Create fly.toml

```toml
app = "arn-derp"
primary_region = "arn"

[[services]]
  internal_port = 443
  protocol = "tcp"

  [[services.ports]]
    port = 80

  [[services.ports]]
    port = 443

[[services]]
  internal_port = 3478
  protocol = "udp"

  [[services.ports]]
    port = 3478
```

The TCP services handle DERP relay traffic and Let's Encrypt certificate issuance. The UDP service is for STUN (NAT traversal probing). Note that Fly.io's UDP support is inconsistent — STUN may not work reliably, which means Tailscale won't show a latency number for your custom region in `tailscale netcheck`. The DERP relay function over TCP 443 will still work correctly.

---

## Step 6 — Set secrets and deploy

Set environment variables as Fly secrets so they persist across deploys:

```bash
fly secrets set DERP_DOMAIN=arn.yourdomain.com DERP_VERIFY_CLIENTS=false --app arn-derp
fly deploy --app arn-derp
```

`DERP_VERIFY_CLIENTS=false` allows any Tailscale client to use your relay. Since DERP only ever forwards already-encrypted packets, this doesn't expose any of your data — but it does mean anyone who knows your hostname could use your server as a relay. For a personal setup this is generally acceptable.

---

## Step 7 — Verify

Once deployed, check the logs:

```bash
fly logs --app arn-derp
```

Look for:
```
STUN server listening on [::]:3478
derper: serving on :443 with TLS
```

Then confirm the cert issued and the server is reachable:

```bash
curl https://arn.yourdomain.com
```

A working DERP server returns an HTML page identifying itself as a Tailscale DERP server. If you see that, you're done with the server side.

---

## Step 8 — Add to Tailscale ACL

Go to your Tailscale admin console at `https://login.tailscale.com/admin/acls` and add a `derpMap` key to your ACL JSON:

```json
"derpMap": {
  "OmitDefaultRegions": false,
  "Regions": {
    "900": {
      "RegionID": 900,
      "RegionCode": "arn-custom",
      "RegionName": "Stockholm (custom)",
      "Nodes": [
        {
          "Name": "1",
          "RegionID": 900,
          "HostName": "arn.yourdomain.com",
          "IPv4": "137.66.0.194"
        }
      ]
    }
  }
}
```

`OmitDefaultRegions: false` keeps Tailscale's own servers available as fallback. Don't set this to `true` unless you're certain your custom server is reliable — if it goes down with default regions omitted, you'll lose DERP relay entirely.

Place `derpMap` at the top level of your ACL JSON alongside `acls`, `ssh`, and other top-level keys.

Save the ACL and run:

```bash
tailscale netcheck
```

Your custom region should appear in the output. If STUN is working you'll see a latency number; if UDP is blocked on Fly.io's side it will show with no latency but still function as a relay.

---

## Adding a second region

The setup is identical for additional nodes. Create a new app, allocate a dedicated IP, add a DNS A record, deploy with the same Dockerfile, and add a new region entry (increment the RegionID to `901`, `902`, etc.) to your `derpMap`.

A Stockholm and US East Coast pair covers most travel scenarios for a European-based user and stays well under the $5/month billing threshold.

---

## Cost summary

| Resource | Listed price | Practical cost |
|---|---|---|
| Shared-CPU 256MB VM (always-on) | ~$1.94/mo | Free (legacy allowance) |
| Dedicated IPv4 | $2.00/mo | Free if total bill <$5 |
| Outbound bandwidth | $0.02/GB | Free up to 100GB (legacy) |
| **Single node total** | ~$1.88–$2.00/mo | **$0/mo** |
| **Two node total** | ~$3.76–$4.00/mo | **$0/mo** |

These figures apply to legacy Fly.io Hobby plan accounts (pre-October 2024). New accounts are pay-as-you-go with no free allowances. Always verify against your own billing dashboard — Fly.io pricing and thresholds are subject to change.
