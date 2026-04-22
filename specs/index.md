---
layout: default
title: "social specs"
permalink: /specs/
---
<div class="wrap">
  <div class="layout" id="specs-index">

    <div class="span-2" style="padding-top:32px;">
      <div class="specs-hero">
        <div class="section-label" style="margin-bottom:14px;">specs</div>
        <h1 class="specs-title">social specs</h1>
        <p class="specs-lede">
          A one-stop destination for ad format specs across platforms — ratios,
          sizes, character limits, CTAs. Scraped from the source, versioned in
          git, so what you see is what's current (<em>ish</em>).
        </p>
      </div>

      {% assign platforms = site.data.specs %}
      <div class="platforms-grid">
        {% for p in platforms %}
        {% assign spec = p[1] %}
        <a class="platform-card" href="{{ '/specs/' | append: p[0] | append: '/' | relative_url }}">
          <div class="platform-card__head">
            <span class="platform-card__name">{{ spec.platform }}</span>
            <span class="platform-card__arrow">→</span>
          </div>
          <dl class="platform-card__dl">
            <dt>formats</dt><dd>{{ spec.formats.size }}</dd>
            <dt>updated</dt><dd>{{ spec.last_updated }}</dd>
          </dl>
        </a>
        {% endfor %}

        {% assign soon = "Meta,TikTok,X,YouTube,Pinterest,Reddit" | split: "," %}
        {% for name in soon %}
        <div class="platform-card is-soon">
          <div class="platform-card__head">
            <span class="platform-card__name">{{ name }}</span>
            <span class="platform-card__status">soon</span>
          </div>
          <dl class="platform-card__dl">
            <dt>formats</dt><dd>—</dd>
            <dt>updated</dt><dd>—</dd>
          </dl>
        </div>
        {% endfor %}
      </div>
    </div>

    <div class="col-3" style="padding-top:32px;">
      <div class="sidebar-section">
        <div class="section-label">about</div>
        <p class="specs-about">
          Part of <a href="{{ '/tools/' | relative_url }}">tools</a>. The
          scraper lives on GitHub; the data lives in the repo. Pull requests
          accepted when the platforms change things (they will).
        </p>
      </div>

      <div class="sidebar-section">
        <div class="section-label">data</div>
        <a class="sidebar-link" href="https://github.com/usefulish/usefulish/tree/main/_data/specs" target="_blank">_data/specs →</a>
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
#specs-index .specs-hero { margin-bottom: 40px; padding-bottom: 28px; border-bottom: 1px solid var(--rule); }
#specs-index .specs-title { font-size: 44px; font-weight: 600; letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 16px; }
#specs-index .specs-lede { font-size: 14px; color: var(--ink-mid); line-height: 1.7; max-width: 58ch; }
#specs-index .specs-lede em { color: var(--accent); font-style: italic; }

#specs-index .platforms-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1px; background: var(--rule); border: 1px solid var(--rule);
}
#specs-index .platform-card {
  background: var(--paper); padding: 20px 18px;
  display: flex; flex-direction: column; gap: 14px;
  text-decoration: none; color: var(--ink);
  min-height: 120px; transition: background 0.12s;
}
#specs-index .platform-card:not(.is-soon):hover { background: var(--surface); }
#specs-index .platform-card__head { display: flex; justify-content: space-between; align-items: baseline; }
#specs-index .platform-card__name { font-size: 16px; font-weight: 600; letter-spacing: -0.01em; }
#specs-index .platform-card__arrow { color: var(--accent); font-size: 14px; }
#specs-index .platform-card__status { font-size: 10px; color: var(--ink-faint); letter-spacing: 0.08em; text-transform: uppercase; }
#specs-index .platform-card__dl { display: grid; grid-template-columns: auto 1fr; column-gap: 12px; row-gap: 3px; font-size: 11px; margin: 0; }
#specs-index .platform-card__dl dt { color: var(--ink-faint); letter-spacing: 0.04em; }
#specs-index .platform-card__dl dd { color: var(--ink); margin: 0; }
#specs-index .platform-card.is-soon { color: var(--ink-faint); }
#specs-index .platform-card.is-soon .platform-card__name { color: var(--ink-faint); }
#specs-index .platform-card.is-soon .platform-card__dl dd { color: var(--ink-faint); }

#specs-index .specs-about { font-size: 11px; color: var(--ink-mid); line-height: 1.7; }
#specs-index .specs-about a { color: var(--accent); text-decoration: none; }
#specs-index .specs-about a:hover { text-decoration: underline; }
</style>
