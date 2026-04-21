---
layout: default
title: identity
permalink: /identity/
sitemap: false
---
<div class="wrap">
  <div class="layout" id="identity">

    <div class="span-2" style="padding-top:32px;">

      <div class="id-hero">
        <div class="section-label" style="margin-bottom:14px;">identity</div>
        <div class="id-version">
          <span class="id-dot"></span>
          v0.1 — living document, last touched {{ site.time | date: "%Y-%m-%d" }}
        </div>
        <h1 class="id-title">usefuli<span>.sh</span></h1>
        <p class="id-tagline">creative directed code.<br><em class="id-ish">&amp; tools of utility, mostly.</em></p>
      </div>

      <!-- ── Premise ─────────────────────────────────────────────── -->
      <section class="id-section" id="premise">
        <div class="section-label">01 — premise</div>
        <p class="id-prose">
          <strong>usefulish</strong> is a brand for the stuff I ship when a problem
          keeps nagging and a script seems like the shortest line between here and
          not-annoyed. It lives in the gap between <em>"this should exist"</em> and
          <em>"this is a product."</em> Some of it is software, some of it is
          automation, some of it is scaffolding around the creative process. None
          of it is trying to raise a round.
        </p>
        <p class="id-prose">
          The working description is <strong>creative directed code</strong> —
          code made by someone who thinks like a designer, art-directed the whole
          way down. Not shipped-to-you code; shipped-to-me code that I hang a
          name on in case you want a copy.
        </p>
        <p class="id-prose id-prose--quiet">
          Name comes from the dictionary entry. <em>usefulish</em>, adjective: of
          utility, mostly. The <em>ish</em> is doing a lot of the work. It lets
          things be rough, unfinished, quietly opinionated. It keeps the bar at
          "honest" instead of "polished."
        </p>
      </section>

      <!-- ── Logo ────────────────────────────────────────────────── -->
      <section class="id-section" id="logo">
        <div class="section-label">02 — logo · the dictionary mark</div>
        <p class="id-prose id-prose--quiet" style="margin-bottom:24px;">
          The primary mark is a dictionary entry: headword, pronunciation, first
          definition. The <em>ish</em> is set in italic — same typeface, same
          size, different temperature. Typeface is IBM Plex Mono throughout;
          the mark is text, not art.
        </p>

        <div class="logo-stage">
          <div class="logo-stage__inner">
            <div class="logo-dict">
              <div class="logo-dict__word">
                <span class="logo-dict__useful">useful</span><span class="logo-dict__ish">ish</span>
              </div>
              <div class="logo-dict__pron">/ˈyus&nbsp;fəl&nbsp;ɪʃ/</div>
              <div class="logo-dict__def">1.&nbsp;&nbsp;of utility, mostly</div>
            </div>
          </div>
          <div class="logo-stage__caption">
            primary mark · on paper
          </div>
        </div>

        <div class="id-grid-2">
          <div class="id-note">
            <div class="id-note__k">use on</div>
            <div class="id-note__v">about pages, README headers, avatars, places where the brand introduces itself.</div>
          </div>
          <div class="id-note">
            <div class="id-note__k">don't use for</div>
            <div class="id-note__v">favicons, tiny header slots, anywhere below ~140px wide. Use the <code>u/ish</code> site mark instead.</div>
          </div>
          <div class="id-note">
            <div class="id-note__k">colors</div>
            <div class="id-note__v">headword in <code>--accent</code>, italic <em>ish</em> in <code>--ink</code>, pron + def in <code>--ink</code>. Background is <code>--paper</code>.</div>
          </div>
          <div class="id-note">
            <div class="id-note__k">clearspace</div>
            <div class="id-note__v">minimum padding equal to the cap-height of the headword on all sides. More is fine.</div>
          </div>
        </div>
      </section>

      <!-- ── Typography ──────────────────────────────────────────── -->
      <section class="id-section" id="typography">
        <div class="section-label">03 — typography</div>
        <p class="id-prose id-prose--quiet">
          One typeface: <strong>IBM Plex Mono</strong>. Open-source, legible at
          small sizes, has a real italic with character. Everything on the brand
          is set in it — body, headings, pronunciations, tags, code, footer. The
          monospace is the texture.
        </p>

        <div class="type-stack">
          <button class="type-stack__copy" data-copy="'IBM Plex Mono', monospace">
            <span class="type-stack__label">font-family</span>
            <span class="type-stack__value">'IBM Plex Mono', monospace</span>
            <span class="type-stack__copy-hint">click to copy</span>
          </button>
        </div>

        <div class="type-specimen">
          <div class="type-row">
            <div class="type-row__meta">
              <div class="type-row__name">display · 600</div>
              <div class="type-row__spec">26&nbsp;/&nbsp;1.15 &nbsp;·&nbsp; -0.03em</div>
              <div class="type-row__use">page titles · hero wordmark</div>
            </div>
            <div class="type-row__sample" style="font-size:26px;font-weight:600;line-height:1.15;letter-spacing:-0.03em;">
              tools, scripts, and workflows that actually work.
            </div>
          </div>

          <div class="type-row">
            <div class="type-row__meta">
              <div class="type-row__name">post title · 600</div>
              <div class="type-row__spec">22&nbsp;/&nbsp;1.25 &nbsp;·&nbsp; -0.03em</div>
              <div class="type-row__use">article + featured titles</div>
            </div>
            <div class="type-row__sample" style="font-size:22px;font-weight:600;line-height:1.25;letter-spacing:-0.03em;">
              of utility, <em>mostly.</em>
            </div>
          </div>

          <div class="type-row">
            <div class="type-row__meta">
              <div class="type-row__name">body · 400</div>
              <div class="type-row__spec">13&nbsp;/&nbsp;1.85</div>
              <div class="type-row__use">prose, post body, descriptions</div>
            </div>
            <div class="type-row__sample" style="font-size:13px;font-weight:400;line-height:1.85;color:var(--ink-mid);">
              The monospace isn't a stylistic choice so much as a workflow choice —
              everything here was read in a terminal before it was read anywhere else.
            </div>
          </div>

          <div class="type-row">
            <div class="type-row__meta">
              <div class="type-row__name">body italic · 300i</div>
              <div class="type-row__spec">13&nbsp;/&nbsp;1.85</div>
              <div class="type-row__use">the <em>ish</em> voice · asides</div>
            </div>
            <div class="type-row__sample" style="font-size:13px;font-weight:300;line-height:1.85;font-style:italic;color:var(--ink-mid);">
              it's fine, it's probably fine, you should back up your stuff first though.
            </div>
          </div>

          <div class="type-row">
            <div class="type-row__meta">
              <div class="type-row__name">section label · 400</div>
              <div class="type-row__spec">10 &nbsp;·&nbsp; +0.12em &nbsp;·&nbsp; upper</div>
              <div class="type-row__use">column headers, eyebrows</div>
            </div>
            <div class="type-row__sample">
              <span style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--ink-faint);">
                previously &nbsp;·&nbsp; tools &nbsp;·&nbsp; elsewhere
              </span>
            </div>
          </div>

          <div class="type-row">
            <div class="type-row__meta">
              <div class="type-row__name">meta · 400</div>
              <div class="type-row__spec">11 &nbsp;·&nbsp; +0.03em</div>
              <div class="type-row__use">dates, bylines, tags</div>
            </div>
            <div class="type-row__sample" style="font-size:11px;color:var(--ink-faint);letter-spacing:0.03em;">
              2026-04-20 &nbsp;·&nbsp; automation &nbsp;·&nbsp; macos
            </div>
          </div>
        </div>
      </section>

      <!-- ── Color ───────────────────────────────────────────────── -->
      <section class="id-section" id="color">
        <div class="section-label">04 — color</div>
        <p class="id-prose id-prose--quiet">
          Warm neutrals on a paper base with one bronze accent. The palette
          earns its warmth by sitting a touch below pure white / pure black —
          nothing is <code>#fff</code>, nothing is <code>#000</code>. The same
          tokens are re-mapped for dark mode; the role stays, the value shifts.
        </p>

        <div class="palette">
          <div class="palette__scheme">
            <div class="palette__head">
              <span class="palette__schemename">light · paper</span>
              <span class="palette__schemehint">default</span>
            </div>
            <div class="palette__grid">
              <button class="swatch" data-copy="#f2ede6" style="--s:#f2ede6;--fg:#1e1c18;">
                <span class="swatch__role">paper</span>
                <span class="swatch__token">--paper</span>
                <span class="swatch__hex">#f2ede6</span>
              </button>
              <button class="swatch" data-copy="#1e1c18" style="--s:#1e1c18;--fg:#f2ede6;">
                <span class="swatch__role">ink</span>
                <span class="swatch__token">--ink</span>
                <span class="swatch__hex">#1e1c18</span>
              </button>
              <button class="swatch" data-copy="#5a5650" style="--s:#5a5650;--fg:#f2ede6;">
                <span class="swatch__role">ink · mid</span>
                <span class="swatch__token">--ink-mid</span>
                <span class="swatch__hex">#5a5650</span>
              </button>
              <button class="swatch" data-copy="#a09890" style="--s:#a09890;--fg:#1e1c18;">
                <span class="swatch__role">ink · faint</span>
                <span class="swatch__token">--ink-faint</span>
                <span class="swatch__hex">#a09890</span>
              </button>
              <button class="swatch" data-copy="#c8c0b4" style="--s:#c8c0b4;--fg:#1e1c18;">
                <span class="swatch__role">rule</span>
                <span class="swatch__token">--rule</span>
                <span class="swatch__hex">#c8c0b4</span>
              </button>
              <button class="swatch" data-copy="#ece7de" style="--s:#ece7de;--fg:#1e1c18;">
                <span class="swatch__role">surface</span>
                <span class="swatch__token">--surface</span>
                <span class="swatch__hex">#ece7de</span>
              </button>
              <button class="swatch swatch--accent" data-copy="#7a5c3a" style="--s:#7a5c3a;--fg:#f2ede6;">
                <span class="swatch__role">accent</span>
                <span class="swatch__token">--accent</span>
                <span class="swatch__hex">#7a5c3a</span>
              </button>
              <button class="swatch" data-copy="#b8966a" style="--s:#b8966a;--fg:#1e1c18;">
                <span class="swatch__role">accent · lt</span>
                <span class="swatch__token">--accent-lt</span>
                <span class="swatch__hex">#b8966a</span>
              </button>
            </div>
          </div>

          <div class="palette__scheme palette__scheme--dark">
            <div class="palette__head">
              <span class="palette__schemename">dark · ink</span>
              <span class="palette__schemehint">prefers-color-scheme: dark</span>
            </div>
            <div class="palette__grid">
              <button class="swatch" data-copy="#1a1815" style="--s:#1a1815;--fg:#e8e2d8;">
                <span class="swatch__role">paper</span>
                <span class="swatch__token">--paper</span>
                <span class="swatch__hex">#1a1815</span>
              </button>
              <button class="swatch" data-copy="#e8e2d8" style="--s:#e8e2d8;--fg:#1a1815;">
                <span class="swatch__role">ink</span>
                <span class="swatch__token">--ink</span>
                <span class="swatch__hex">#e8e2d8</span>
              </button>
              <button class="swatch" data-copy="#9a9088" style="--s:#9a9088;--fg:#1a1815;">
                <span class="swatch__role">ink · mid</span>
                <span class="swatch__token">--ink-mid</span>
                <span class="swatch__hex">#9a9088</span>
              </button>
              <button class="swatch" data-copy="#5a5450" style="--s:#5a5450;--fg:#e8e2d8;">
                <span class="swatch__role">ink · faint</span>
                <span class="swatch__token">--ink-faint</span>
                <span class="swatch__hex">#5a5450</span>
              </button>
              <button class="swatch" data-copy="#2e2c28" style="--s:#2e2c28;--fg:#e8e2d8;">
                <span class="swatch__role">rule</span>
                <span class="swatch__token">--rule</span>
                <span class="swatch__hex">#2e2c28</span>
              </button>
              <button class="swatch" data-copy="#222018" style="--s:#222018;--fg:#e8e2d8;">
                <span class="swatch__role">surface</span>
                <span class="swatch__token">--surface</span>
                <span class="swatch__hex">#222018</span>
              </button>
              <button class="swatch swatch--accent" data-copy="#c8966a" style="--s:#c8966a;--fg:#1a1815;">
                <span class="swatch__role">accent</span>
                <span class="swatch__token">--accent</span>
                <span class="swatch__hex">#c8966a</span>
              </button>
              <button class="swatch" data-copy="#e8b888" style="--s:#e8b888;--fg:#1a1815;">
                <span class="swatch__role">accent · lt</span>
                <span class="swatch__token">--accent-lt</span>
                <span class="swatch__hex">#e8b888</span>
              </button>
            </div>
          </div>
        </div>

        <p class="id-prose id-prose--quiet" style="margin-top:28px;">
          <em>click any swatch to copy the hex.</em>
        </p>
      </section>

      <!-- ── Terminal aesthetic ──────────────────────────────────── -->
      <section class="id-section" id="terminal">
        <div class="section-label">05 — terminal as brand surface</div>
        <p class="id-prose id-prose--quiet">
          The code block is a logo-adjacent element. It's where a lot of the
          brand actually lives — READMEs, writeups, install instructions. So
          it gets its own palette: true dark background, muted syntax colors
          picked to sit next to the paper palette without shouting.
        </p>

        <div class="code-block">
          <div class="cb-bar"><span class="cb-label">~ / usefulish / identity.sh</span></div>
          <pre class="cb-body"><span class="t-comment"># the whole brand, basically</span>
<span class="t-key">brand</span>=<span class="t-str">"usefulish"</span>
<span class="t-key">tagline</span>=<span class="t-str">"creative directed code"</span>
<span class="t-key">mode</span>=<span class="t-var">$MOSTLY</span>

<span class="t-cmd">ship</span> <span class="t-flag">--when</span>=<span class="t-str">"it annoys me enough"</span> \
     <span class="t-flag">--polish</span>=<span class="t-num">0.7</span> \
     <span class="t-path">./tools/*</span>
<span class="t-comment"># ✓ done. it works on my machine.</span></pre>
        </div>

        <div class="id-grid-2">
          <div class="id-note">
            <div class="id-note__k">bg</div>
            <div class="id-note__v"><code>#0e0e0e</code> — true dark, not near-black. keeps syntax colors honest.</div>
          </div>
          <div class="id-note">
            <div class="id-note__k">colors</div>
            <div class="id-note__v">muted pastel set — green, yellow, blue, pink, cyan, red — all desaturated so they live next to the bronze accent.</div>
          </div>
        </div>
      </section>

      <!-- ── Avatar ──────────────────────────────────────────────── -->
      <section class="id-section" id="avatar">
        <div class="section-label">06 — favicon · social avatar</div>
        <p class="id-prose id-prose--quiet">
          Two sizes, one idea. The full dictionary mark for avatars and OG
          images where it has room to breathe; a compact <code>u/ish</code>
          tile for favicons and anywhere tiny.
        </p>

        <div class="avatar-row">
          <figure class="avatar">
            <div class="avatar__tile avatar__tile--full">
              <div class="logo-dict logo-dict--tight">
                <div class="logo-dict__word">
                  <span class="logo-dict__useful">useful</span><span class="logo-dict__ish">ish</span>
                </div>
                <div class="logo-dict__pron">/ˈyus&nbsp;fəl&nbsp;ɪʃ/</div>
                <div class="logo-dict__def">1.&nbsp;&nbsp;of utility, mostly</div>
              </div>
            </div>
            <figcaption>avatar · 500×500 · paper</figcaption>
          </figure>

          <figure class="avatar">
            <div class="avatar__tile avatar__tile--fav">
              <svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" style="width:84px;height:84px;">
                <rect x="2" y="2" width="24" height="24" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
                <text x="4" y="12" font-family="'IBM Plex Mono',monospace" font-size="7" font-weight="600" fill="var(--accent)">u/</text>
                <text x="4" y="22" font-family="'IBM Plex Mono',monospace" font-size="7" font-weight="400" fill="var(--ink-faint)">ish</text>
              </svg>
            </div>
            <figcaption>favicon · 28×28 · header slot</figcaption>
          </figure>

          <figure class="avatar">
            <div class="avatar__tile avatar__tile--dark">
              <div class="logo-dict logo-dict--tight logo-dict--dark">
                <div class="logo-dict__word">
                  <span class="logo-dict__useful">useful</span><span class="logo-dict__ish">ish</span>
                </div>
                <div class="logo-dict__pron">/ˈyus&nbsp;fəl&nbsp;ɪʃ/</div>
                <div class="logo-dict__def">1.&nbsp;&nbsp;of utility, mostly</div>
              </div>
            </div>
            <figcaption>avatar · 500×500 · ink</figcaption>
          </figure>
        </div>
      </section>
      07 â€” application palette Â· secondary
      A secondary palette for use inside products â€” dashboards, logs, charts, chips, status indicators. These are not brand colors. They don't appear on the marketing surface, the logo, or the dictionary mark. They exist to give data a voice without shouting over the paper.
      
      Rules of thumb: pastel, not saturated. warm-biased. used in small quantities â€” a bar, a dot, a chip. never a full background. When in doubt, reach for --ink-mid or --accent first.
      
      light Â· paper foreground + chip bg per role
      sage olive --prov-fal #8fa86a dusty rose --prov-kie #c888a0 soft blue --prov-glk #7a9ec0 bronze-tan --prov-anth #c89a6a muted teal --prov-oai #7ab5a0 soft terracotta --prov-rep #d49a6a sage Â· bg --prov-fal-bg #dfe4d0 rose Â· bg --prov-kie-bg #ead3da blue Â· bg --prov-glk-bg #d4dde6 bronze Â· bg --prov-anth-bg #ead8c0 teal Â· bg --prov-oai-bg #d2e0d8 terra Â· bg --prov-rep-bg #ead8c4
      dark Â· ink prefers-color-scheme: dark
      sage olive --prov-fal #a8c088 dusty rose --prov-kie #dca8bc soft blue --prov-glk #9ab8d4 bronze-tan --prov-anth #d4a878 muted teal --prov-oai #9cc8b8 soft terracotta --prov-rep #e4b488 sage Â· bg --prov-fal-bg #2a3020 rose Â· bg --prov-kie-bg #382830 blue Â· bg --prov-glk-bg #242e38 bronze Â· bg --prov-anth-bg #3a2e20 teal Â· bg --prov-oai-bg #253028 terra Â· bg --prov-rep-bg #3a2c20
      click any swatch to copy the hex.
      
      fg tokens
      bar fills, dots, icons, 1px borders, small text tags. never type larger than ~14px â€” they don't have the weight for display.
      bg tokens
      chip backgrounds, selected-row highlights, hover tints. never a full-page background.
      active state
      pair fg + bg only for "active / selected" â€” the chip gets a -bg fill with a fg border and text.
      limit
      never use more than one of these as a dominant color in a single view. they're accents, not themes.
      relation to --accent
      --prov-anth (bronze-tan) is the closest sibling to --accent. that's on purpose â€” anthropic is the "home" provider and should feel related, not identical.
      what's missing
      no status colors (error, warning, ok). when a product needs them they get their own pass â€” don't borrow from this palette, the hues are too soft to carry alarm.

      <!-- ── End note ────────────────────────────────────────────── -->
      <section class="id-section id-section--end">
        <div class="section-label">fin — what's missing</div>
        <p class="id-prose id-prose--quiet">
          This is v0.1. Things that aren't here yet, on purpose: a proper logo
          lockup with clearspace diagrams, a sound / motion language, don'ts,
          product sub-marks, imagery guidelines, a PDF export. They'll land
          when there's enough of the brand to justify documenting them.
        </p>
      </section>

    </div>

    <!-- ── Sidebar ─────────────────────────────────────────────── -->
    <div class="col-3" style="padding-top:32px;">
      <div class="sidebar-section">
        <div class="section-label">contents</div>
        <a class="toc-item" href="#premise">01 — premise</a>
        <a class="toc-item" href="#logo">02 — logo</a>
        <a class="toc-item" href="#typography">03 — typography</a>
        <a class="toc-item" href="#color">04 — color</a>
        <a class="toc-item" href="#terminal">05 — terminal</a>
        <a class="toc-item" href="#avatar">06 — avatar</a>
        <a class="toc-item" href="#app-palette">07 — application palette</a>
      </div>

      <div class="sidebar-section">
        <div class="section-label">tagline</div>
        <div class="id-sidequote">
          creative directed code.
        </div>
        <div class="id-sidequote id-sidequote--sub">
          <em>&amp; tools of utility, mostly.</em>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="section-label">status</div>
        <div class="id-status">
          <span class="id-dot"></span>
          v0.1 — this document will grow as the brand does. expect additions, not rewrites.
        </div>
      </div>

      <div class="sidebar-section">
        <div class="section-label">elsewhere</div>
        {% for link in site.data.links %}
        <a class="sidebar-link" href="{{ link.url }}" target="_blank">{{ link.label }}</a>
        {% endfor %}
      </div>
    </div>

  </div>
</div>

<style>
/* ── identity page — scoped to #identity ──────────────────────── */
#identity .id-hero { margin-bottom: 48px; padding-bottom: 32px; border-bottom: 1px solid var(--rule); }
#identity .id-version {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--ink-faint); margin-bottom: 28px;
  padding: 4px 10px; border: 1px solid var(--rule); background: var(--surface);
}
#identity .id-dot {
  width: 6px; height: 6px; background: var(--accent); border-radius: 50%;
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent) 18%, transparent);
}
#identity .id-title {
  font-size: 56px; font-weight: 600; line-height: 1.0; letter-spacing: -0.04em;
  margin-bottom: 20px; color: var(--ink);
}
#identity .id-title span { color: var(--accent); }
#identity .id-tagline {
  font-size: 18px; line-height: 1.5; color: var(--ink-mid); max-width: 40ch;
  letter-spacing: -0.01em;
}
#identity .id-ish { color: var(--ink-faint); }

#identity .id-section { margin-bottom: 64px; }
#identity .id-section--end { margin-bottom: 32px; }
#identity .id-section .section-label { margin-bottom: 24px; }

#identity .id-prose {
  font-size: 13px; color: var(--ink-mid); line-height: 1.85;
  max-width: 62ch; margin-bottom: 1.2em;
}
#identity .id-prose strong { color: var(--ink); font-weight: 600; }
#identity .id-prose code {
  font-family: var(--mono); font-size: 12px;
  background: var(--surface); padding: 1px 5px; color: var(--accent);
}
#identity .id-prose--quiet { color: var(--ink-mid); }

#identity .id-grid-2 {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0;
  border-top: 1px solid var(--rule); margin-top: 32px;
}
#identity .id-note {
  padding: 18px 20px 18px 0;
  border-bottom: 1px solid var(--rule);
}
#identity .id-note:nth-child(odd) { border-right: 1px solid var(--rule); padding-right: 20px; }
#identity .id-note:nth-child(even) { padding-left: 20px; padding-right: 0; }
#identity .id-note__k {
  font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--ink-faint); margin-bottom: 8px;
}
#identity .id-note__v { font-size: 12px; color: var(--ink-mid); line-height: 1.7; }
#identity .id-note__v code {
  font-family: var(--mono); font-size: 11px;
  background: var(--surface); padding: 1px 5px; color: var(--accent);
}

/* ── Logo stage ───────────────────────────────────────────────── */
#identity .logo-stage {
  border: 1px solid var(--rule);
  background: var(--paper);
  margin-bottom: 24px;
}
#identity .logo-stage__inner {
  padding: 72px 56px;
  display: flex; align-items: center; justify-content: flex-start;
  background:
    linear-gradient(var(--paper), var(--paper)) padding-box,
    repeating-linear-gradient(
      45deg,
      transparent 0, transparent 28px,
      color-mix(in oklab, var(--rule) 30%, transparent) 28px,
      color-mix(in oklab, var(--rule) 30%, transparent) 29px
    );
  background-origin: border-box;
}
#identity .logo-stage__caption {
  padding: 10px 16px; border-top: 1px solid var(--rule);
  font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--ink-faint); background: var(--surface);
}

#identity .logo-dict {
  font-family: var(--mono);
  color: var(--ink);
  line-height: 1.05;
}
#identity .logo-dict__word {
  font-size: 72px; font-weight: 400; letter-spacing: -0.02em;
  margin-bottom: 14px;
}
#identity .logo-dict__useful { color: var(--accent); }
#identity .logo-dict__ish { color: var(--ink); font-style: italic; }
#identity .logo-dict__pron {
  font-size: 22px; font-style: italic; font-weight: 300;
  color: var(--ink); margin-bottom: 6px; letter-spacing: -0.01em;
}
#identity .logo-dict__def {
  font-size: 22px; font-weight: 400; color: var(--ink);
  letter-spacing: -0.01em;
}

#identity .logo-dict--tight .logo-dict__word { font-size: 42px; margin-bottom: 8px; }
#identity .logo-dict--tight .logo-dict__pron { font-size: 13px; }
#identity .logo-dict--tight .logo-dict__def { font-size: 13px; }

#identity .logo-dict--dark .logo-dict__useful { color: var(--accent-lt); }
#identity .logo-dict--dark .logo-dict__ish { color: #f2ede6; }
#identity .logo-dict--dark .logo-dict__pron,
#identity .logo-dict--dark .logo-dict__def { color: #e8e2d8; }

/* ── Type ─────────────────────────────────────────────────────── */
#identity .type-stack {
  margin-bottom: 32px;
}
#identity .type-stack__copy {
  all: unset; display: block; width: 100%;
  border: 1px solid var(--rule); background: var(--surface);
  padding: 14px 16px; cursor: pointer;
  transition: border-color 0.12s;
  position: relative;
}
#identity .type-stack__copy:hover { border-color: var(--accent-lt); }
#identity .type-stack__label {
  display: block; font-size: 10px; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--ink-faint); margin-bottom: 4px;
}
#identity .type-stack__value {
  font-family: var(--mono); font-size: 13px; color: var(--ink);
}
#identity .type-stack__copy-hint {
  position: absolute; right: 16px; top: 50%; transform: translateY(-50%);
  font-size: 10px; letter-spacing: 0.08em; color: var(--ink-faint);
}
#identity .type-stack__copy.is-copied .type-stack__copy-hint { color: var(--accent); }

#identity .type-specimen { border-top: 1px solid var(--rule); }
#identity .type-row {
  display: grid; grid-template-columns: 200px 1fr;
  gap: 24px; padding: 24px 0;
  border-bottom: 1px solid var(--rule);
  align-items: baseline;
}
#identity .type-row__name {
  font-size: 11px; font-weight: 600; color: var(--ink);
  margin-bottom: 4px;
}
#identity .type-row__spec {
  font-size: 10px; color: var(--ink-faint); letter-spacing: 0.04em;
  margin-bottom: 4px;
}
#identity .type-row__use {
  font-size: 10px; color: var(--ink-faint); font-style: italic;
}
#identity .type-row__sample { color: var(--ink); }
#identity .type-row__sample em { color: var(--accent); font-style: italic; }

/* ── Color ────────────────────────────────────────────────────── */
#identity .palette { display: grid; gap: 28px; margin-top: 24px; }
#identity .palette__head {
  display: flex; align-items: baseline; justify-content: space-between;
  padding-bottom: 10px; margin-bottom: 14px;
  border-bottom: 1px solid var(--rule);
}
#identity .palette__schemename {
  font-size: 11px; font-weight: 600; color: var(--ink);
  letter-spacing: 0.02em;
}
#identity .palette__schemehint {
  font-size: 10px; color: var(--ink-faint); letter-spacing: 0.04em;
}
#identity .palette__grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
  background: var(--rule);
  border: 1px solid var(--rule);
}
#identity .swatch {
  all: unset; cursor: pointer;
  background: var(--s); color: var(--fg);
  padding: 14px 14px 40px;
  min-height: 110px; position: relative;
  display: flex; flex-direction: column; gap: 2px;
  transition: transform 0.12s;
}
#identity .swatch:hover { transform: translateY(-1px); }
#identity .swatch__role {
  font-size: 11px; font-weight: 600; letter-spacing: 0.02em;
}
#identity .swatch__token {
  font-size: 10px; opacity: 0.7; letter-spacing: 0.02em;
}
#identity .swatch__hex {
  position: absolute; left: 14px; bottom: 12px;
  font-size: 10px; letter-spacing: 0.06em; opacity: 0.85;
}
#identity .swatch.is-copied::after {
  content: "copied"; position: absolute; right: 12px; bottom: 10px;
  font-size: 10px; letter-spacing: 0.08em; opacity: 0.9;
}
#identity .swatch--accent { position: relative; }
#identity .swatch--accent::before {
  content: "primary"; position: absolute; right: 10px; top: 10px;
  font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase;
  opacity: 0.7;
}

#identity .palette__scheme--dark .palette__grid { background: #2e2c28; border-color: #2e2c28; }

/* ── Avatar ───────────────────────────────────────────────────── */
#identity .avatar-row {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
  margin-top: 8px;
}
#identity .avatar { margin: 0; }
#identity .avatar__tile {
  aspect-ratio: 1 / 1;
  border: 1px solid var(--rule);
  padding: 24px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 10px;
}
#identity .avatar__tile--full { background: var(--paper); }
#identity .avatar__tile--fav { background: var(--surface); }
#identity .avatar__tile--dark { background: #1a1815; border-color: #2e2c28; }
#identity .avatar figcaption {
  font-size: 10px; color: var(--ink-faint);
  letter-spacing: 0.08em; text-transform: uppercase;
}

/* ── Sidebar bits ─────────────────────────────────────────────── */
#identity .id-sidequote {
  font-size: 15px; line-height: 1.3; color: var(--ink);
  letter-spacing: -0.02em;
}
#identity .id-sidequote--sub {
  font-size: 12px; color: var(--ink-faint); margin-top: 6px;
}
#identity .id-status {
  font-size: 11px; color: var(--ink-mid); line-height: 1.6;
  display: flex; gap: 10px; align-items: flex-start;
}
#identity .id-status .id-dot { margin-top: 5px; flex-shrink: 0; }

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 900px) {
  #identity .id-title { font-size: 40px; }
  #identity .logo-dict__word { font-size: 48px; }
  #identity .logo-dict__pron,
  #identity .logo-dict__def { font-size: 16px; }
  #identity .logo-stage__inner { padding: 48px 28px; }
  #identity .type-row { grid-template-columns: 1fr; gap: 10px; }
  #identity .palette__grid { grid-template-columns: repeat(2, 1fr); }
  #identity .avatar-row { grid-template-columns: 1fr; }
  #identity .id-grid-2 { grid-template-columns: 1fr; }
  #identity .id-note:nth-child(odd),
  #identity .id-note:nth-child(even) {
    border-right: none; padding: 18px 0;
  }
}
</style>

<script>
(function(){
  // click-to-copy for swatches and font stack
  function copyText(text){
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    // fallback
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly','');
    ta.style.position='absolute'; ta.style.left='-9999px';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch(e){}
    document.body.removeChild(ta);
    return Promise.resolve();
  }

  document.querySelectorAll('#identity [data-copy]').forEach(function(el){
    el.addEventListener('click', function(){
      var val = el.getAttribute('data-copy');
      copyText(val).then(function(){
        el.classList.add('is-copied');
        var hint = el.querySelector('.type-stack__copy-hint');
        var prev = hint ? hint.textContent : null;
        if (hint) hint.textContent = 'copied ✓';
        setTimeout(function(){
          el.classList.remove('is-copied');
          if (hint && prev) hint.textContent = prev;
        }, 1400);
      });
    });
  });
})();
</script>
