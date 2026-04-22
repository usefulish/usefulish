---
layout: default
title: "LinkedIn · social specs"
permalink: /specs/linkedin/
---
{% assign s = site.data.specs.linkedin %}
<div class="wrap">
  <div class="layout" id="specs">

    <div class="span-2" style="padding-top:32px;">

      <div class="specs-hero">
        <div class="section-label" style="margin-bottom:14px;">specs</div>
        <div class="specs-crumbs">
          <a href="{{ '/specs/' | relative_url }}">all platforms</a>
          <span>/</span>
          <span class="specs-crumbs__current">{{ s.platform }}</span>
        </div>
        <h1 class="specs-title">{{ s.platform }}</h1>
        <p class="specs-lede">
          Current ad format specs for {{ s.platform }} — ratios, sizes, character limits, CTAs.
          Scraped and versioned so they stay honest.
        </p>
        <div class="specs-meta">
          <span class="specs-meta__k">last updated</span>
          <span class="specs-meta__v">{{ s.last_updated }}</span>
          <span class="specs-meta__sep">·</span>
          <span class="specs-meta__k">formats</span>
          <span class="specs-meta__v">{{ s.formats.size }}</span>
          <span class="specs-meta__sep">·</span>
          <span class="specs-meta__k">sources</span>
          <span class="specs-meta__v">{{ s.source_urls.size }}</span>
        </div>
      </div>

      {% for f in s.formats %}
      <section class="specs-format" id="{{ f.slug }}">
        <div class="specs-format__head">
          <div class="section-label">format · {{ forloop.index | prepend: '00' | slice: -2, 2 }}</div>
          <h2 class="specs-format__name">{{ f.name }}</h2>
          {% if f.format %}<div class="specs-format__sub">container: <code>{{ f.format }}</code></div>{% endif %}
        </div>

        {% if f.image_sizes %}
        <div class="specs-ratios">
          {% for r in f.image_sizes %}
          <div class="ratio-card">
            <div class="ratio-card__viz" data-ratio="{{ r.ratio }}"></div>
            <div class="ratio-card__body">
              <div class="ratio-card__label">{{ r.ratio }}</div>
              <dl class="ratio-card__dl">
                <dt>recommended</dt><dd>{{ r.recommended_px }}</dd>
                <dt>min</dt><dd>{{ r.min_px }}</dd>
                <dt>max</dt><dd>{{ r.max_px }}</dd>
              </dl>
            </div>
          </div>
          {% endfor %}
        </div>
        {% endif %}

        {% if f.ratios and f.ratios.first.ratio %}
        <div class="specs-ratios">
          {% for r in f.ratios %}
          <div class="ratio-card">
            <div class="ratio-card__viz" data-ratio="{{ r.ratio }}"></div>
            <div class="ratio-card__body">
              <div class="ratio-card__label">
                {{ r.ratio }}
                {% if r.label %}<span class="ratio-card__sub">{{ r.label | downcase }}</span>{% endif %}
              </div>
              <dl class="ratio-card__dl">
                {% if r.recommended_px %}<dt>recommended</dt><dd>{{ r.recommended_px }}</dd>{% endif %}
                {% if r.recommended_px_options %}<dt>recommended</dt><dd>{{ r.recommended_px_options | join: ", " }}</dd>{% endif %}
                <dt>min</dt><dd>{{ r.min_px }}</dd>
                <dt>max</dt><dd>{{ r.max_px }}</dd>
              </dl>
            </div>
          </div>
          {% endfor %}
        </div>
        {% endif %}

        {% if f.recommended_card_px %}
        <div class="specs-ratios">
          <div class="ratio-card">
            <div class="ratio-card__viz" data-ratio="{{ f.ratio }}"></div>
            <div class="ratio-card__body">
              <div class="ratio-card__label">{{ f.ratio }}<span class="ratio-card__sub">per card</span></div>
              <dl class="ratio-card__dl">
                <dt>recommended</dt><dd>{{ f.recommended_card_px }}</dd>
                <dt>cards</dt><dd>{{ f.min_cards }}–{{ f.max_cards }}</dd>
              </dl>
            </div>
          </div>
        </div>
        {% endif %}

        <div class="specs-attrs">
          {% if f.headline_max %}
          <div class="attr">
            <div class="attr__k">headline</div>
            <div class="attr__v"><strong>{{ f.headline_max }}</strong> <span>recommended</span>{% if f.headline_max_absolute %} · max <strong>{{ f.headline_max_absolute }}</strong>{% endif %}{% if f.headline_truncation_note %} · truncates at {{ f.headline_truncation_note }}{% endif %}</div>
          </div>
          {% endif %}
          {% if f.intro_text_max %}
          <div class="attr">
            <div class="attr__k">intro text</div>
            <div class="attr__v">{% if f.intro_text_recommended %}<strong>{{ f.intro_text_recommended }}</strong> <span>recommended</span> · {% endif %}max <strong>{{ f.intro_text_max }}</strong></div>
          </div>
          {% endif %}
          {% if f.duration_min_seconds %}
          <div class="attr">
            <div class="attr__k">duration</div>
            <div class="attr__v"><strong>{{ f.duration_min_seconds }}–{{ f.duration_max_seconds }}s</strong>{% if f.duration_recommended_seconds %} · <span>recommended</span> {{ f.duration_recommended_seconds }}s{% endif %}</div>
          </div>
          {% endif %}
          {% if f.max_file_size_mb %}
          <div class="attr">
            <div class="attr__k">file size</div>
            <div class="attr__v">max <strong>{{ f.max_file_size_mb }} MB</strong></div>
          </div>
          {% endif %}
          {% if f.file_size_max_mb %}
          <div class="attr">
            <div class="attr__k">file size</div>
            <div class="attr__v">{% if f.file_size_min_kb %}<strong>{{ f.file_size_min_kb }} KB</strong> – {% endif %}<strong>{{ f.file_size_max_mb }} MB</strong></div>
          </div>
          {% endif %}
        </div>
      </section>
      {% endfor %}

      {% if s.cta_options %}
      <section class="specs-ctas" id="ctas">
        <div class="section-label">call to action · options</div>
        <div class="cta-grid">
          {% for cta in s.cta_options %}
          <div class="cta-chip">
            <span class="cta-chip__label">{{ cta.label }}</span>
            <span class="cta-chip__value">{{ cta.value }}</span>
          </div>
          {% endfor %}
        </div>
      </section>
      {% endif %}

      <section class="specs-sources" id="sources">
        <div class="section-label">sources</div>
        <ol class="specs-sources__list">
          {% for url in s.source_urls %}
          <li><a href="{{ url }}" target="_blank" rel="noopener">{{ url }}</a></li>
          {% endfor %}
        </ol>
        <p class="specs-sources__note">
          <em>Specs are scraped, not transcribed. If a platform changes something and this page hasn't caught up, trust the source.</em>
        </p>
      </section>

    </div>

    <div class="col-3" style="padding-top:32px;">
      <div class="sidebar-section">
        <div class="section-label">platforms</div>
        <a class="platform-link is-active" href="{{ '/specs/linkedin/' | relative_url }}">
          <span class="platform-link__name">LinkedIn</span>
          <span class="platform-link__status">{{ s.formats.size }} formats</span>
        </a>
        <span class="platform-link is-soon">
          <span class="platform-link__name">Meta</span>
          <span class="platform-link__status">soon</span>
        </span>
        <span class="platform-link is-soon">
          <span class="platform-link__name">TikTok</span>
          <span class="platform-link__status">soon</span>
        </span>
        <span class="platform-link is-soon">
          <span class="platform-link__name">X</span>
          <span class="platform-link__status">soon</span>
        </span>
        <span class="platform-link is-soon">
          <span class="platform-link__name">YouTube</span>
          <span class="platform-link__status">soon</span>
        </span>
      </div>

      <div class="sidebar-section">
        <div class="section-label">on this page</div>
        {% for f in s.formats %}
        <a class="toc-item" href="#{{ f.slug }}">{{ f.name | downcase }}</a>
        {% endfor %}
        <a class="toc-item" href="#ctas">cta options</a>
        <a class="toc-item" href="#sources">sources</a>
      </div>

      <div class="sidebar-section">
        <div class="section-label">data</div>
        <a class="sidebar-link" href="https://github.com/usefulish/usefulish/blob/main/_data/specs/linkedin.json" target="_blank">linkedin.json →</a>
        <a class="sidebar-link" href="https://github.com/usefulish/usefulish/tree/main/_data/specs" target="_blank">all spec data →</a>
      </div>

      <div class="sidebar-section">
        <div class="section-label">about</div>
        <p class="specs-about">
          A one-stop destination for ad format specs across platforms, scraped and versioned so copywriters and designers stop hunting through help docs.
        </p>
      </div>
    </div>

  </div>
</div>

<style>
/* ── specs · scoped ───────────────────────────────────────────── */
#specs .specs-hero { margin-bottom: 48px; padding-bottom: 28px; border-bottom: 1px solid var(--rule); }
#specs .specs-crumbs { font-size: 11px; color: var(--ink-faint); letter-spacing: 0.04em; margin-bottom: 20px; display: flex; gap: 8px; align-items: baseline; }
#specs .specs-crumbs a { color: var(--ink-mid); text-decoration: none; }
#specs .specs-crumbs a:hover { color: var(--accent); }
#specs .specs-crumbs__current { color: var(--ink); }
#specs .specs-title { font-size: 44px; font-weight: 600; letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 16px; }
#specs .specs-lede { font-size: 14px; color: var(--ink-mid); line-height: 1.7; max-width: 58ch; margin-bottom: 20px; }
#specs .specs-meta { font-size: 11px; color: var(--ink-faint); display: flex; gap: 8px; flex-wrap: wrap; align-items: baseline; }
#specs .specs-meta__k { letter-spacing: 0.08em; text-transform: uppercase; }
#specs .specs-meta__v { color: var(--ink); }
#specs .specs-meta__sep { color: var(--ink-faint); }

#specs .specs-format { margin-bottom: 56px; padding-bottom: 48px; border-bottom: 1px solid var(--rule); }
#specs .specs-format:last-of-type { border-bottom: none; }
#specs .specs-format__head { margin-bottom: 24px; }
#specs .specs-format__name { font-size: 22px; font-weight: 600; letter-spacing: -0.02em; margin: 8px 0 4px; color: var(--ink); }
#specs .specs-format__sub { font-size: 11px; color: var(--ink-faint); }
#specs .specs-format__sub code { font-size: 11px; background: var(--surface); color: var(--accent); padding: 1px 5px; }

#specs .specs-ratios {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1px; background: var(--rule); border: 1px solid var(--rule);
  margin-bottom: 24px;
}
#specs .ratio-card { background: var(--paper); padding: 20px 18px; display: flex; flex-direction: column; gap: 16px; min-height: 220px; }
#specs .ratio-card__viz {
  align-self: flex-start;
  background: var(--surface);
  border: 1px solid var(--rule);
  width: 100%; max-width: 130px;
  flex-shrink: 0;
}
#specs .ratio-card__label { font-size: 14px; font-weight: 600; color: var(--ink); letter-spacing: -0.01em; }
#specs .ratio-card__sub { display: inline-block; margin-left: 8px; font-size: 10px; font-weight: 400; color: var(--ink-faint); letter-spacing: 0.06em; text-transform: uppercase; }
#specs .ratio-card__dl { display: grid; grid-template-columns: auto 1fr; column-gap: 14px; row-gap: 4px; font-size: 11px; margin-top: 6px; }
#specs .ratio-card__dl dt { color: var(--ink-faint); letter-spacing: 0.04em; }
#specs .ratio-card__dl dd { color: var(--ink); margin: 0; }

#specs .specs-attrs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; border-top: 1px solid var(--rule); }
#specs .attr { padding: 14px 0; border-bottom: 1px solid var(--rule); }
#specs .attr:nth-child(odd) { padding-right: 20px; border-right: 1px solid var(--rule); }
#specs .attr:nth-child(even) { padding-left: 20px; }
#specs .attr__k { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-faint); margin-bottom: 6px; }
#specs .attr__v { font-size: 12px; color: var(--ink-mid); line-height: 1.6; }
#specs .attr__v strong { color: var(--ink); font-weight: 600; }
#specs .attr__v span { color: var(--ink-faint); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; }

#specs .specs-ctas { margin: 48px 0 48px; padding-bottom: 48px; border-bottom: 1px solid var(--rule); }
#specs .cta-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1px; background: var(--rule); border: 1px solid var(--rule); margin-top: 18px; }
#specs .cta-chip { background: var(--paper); padding: 12px 14px; display: flex; flex-direction: column; gap: 2px; }
#specs .cta-chip__label { font-size: 12px; color: var(--ink); font-weight: 500; }
#specs .cta-chip__value { font-size: 10px; color: var(--ink-faint); letter-spacing: 0.06em; }

#specs .specs-sources { margin-bottom: 48px; }
#specs .specs-sources__list { list-style: none; padding: 0; margin: 12px 0; }
#specs .specs-sources__list li { padding: 10px 0; border-bottom: 1px solid var(--rule); font-size: 11px; }
#specs .specs-sources__list li:last-child { border-bottom: none; }
#specs .specs-sources__list a { color: var(--ink-mid); text-decoration: none; word-break: break-all; }
#specs .specs-sources__list a:hover { color: var(--accent); }
#specs .specs-sources__note { font-size: 11px; color: var(--ink-faint); margin-top: 12px; line-height: 1.7; }

/* sidebar platforms */
#specs .platform-link {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 8px 0; font-size: 12px; text-decoration: none;
  border-bottom: 1px solid var(--rule); color: var(--ink-mid); letter-spacing: 0.02em;
}
#specs .platform-link:last-child { border-bottom: none; }
#specs .platform-link.is-active { color: var(--ink); font-weight: 600; }
#specs .platform-link.is-active::before { content: "→ "; color: var(--accent); margin-right: 4px; }
#specs .platform-link.is-soon { color: var(--ink-faint); cursor: default; }
#specs .platform-link:not(.is-soon):hover { color: var(--accent); }
#specs .platform-link__status { font-size: 10px; color: var(--ink-faint); letter-spacing: 0.06em; text-transform: uppercase; }
#specs .specs-about { font-size: 11px; color: var(--ink-mid); line-height: 1.7; }

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 900px) {
  #specs .specs-title { font-size: 32px; }
  #specs .specs-attrs { grid-template-columns: 1fr; }
  #specs .attr:nth-child(odd) { border-right: none; padding-right: 0; }
  #specs .attr:nth-child(even) { padding-left: 0; }
}
</style>

<script>
(function(){
  // size each ratio-card__viz proportionally based on its data-ratio
  function parseRatio(r){
    if (!r) return 1;
    var parts = r.split(':').map(parseFloat);
    if (parts.length !== 2 || !parts[1]) return 1;
    return parts[0] / parts[1];
  }
  var vizes = document.querySelectorAll('#specs .ratio-card__viz');
  var maxH = 110;
  var maxW = 140;
  vizes.forEach(function(v){
    var r = parseRatio(v.getAttribute('data-ratio'));
    var w, h;
    if (r >= 1) {
      w = maxW; h = maxW / r;
    } else {
      h = maxH; w = maxH * r;
      if (w > maxW) { w = maxW; h = maxW / r; }
    }
    v.style.width = Math.round(w) + 'px';
    v.style.height = Math.round(h) + 'px';
  });
})();
</script>
