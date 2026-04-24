---
layout: default
title: "saving-myself-from-myself"
permalink: /saving-myself-from-myself/
---
{% assign skills = site.data.skills.saving-myself-from-myself %}
<div class="wrap">
  <div class="layout" id="smfm">

    <div class="span-2" style="padding-top:32px;">

      <div class="smfm-hero">
        <div class="section-label" style="margin-bottom:14px;">skills collection</div>
        <h1 class="smfm-title">saving-myself<span class="smfm-title__dim">-from-</span>myself</h1>
        <p class="smfm-lede">
          Claude skills for not getting in my own way.
        </p>
        <p class="smfm-prose">
          Some of these catch mistakes before they become permanent — leaked
          keys, sloppy pushes, the stuff that's annoying to clean up from git
          history. Others catch a different kind of mistake: grinding past the
          point where grinding helps.
        </p>
        <p class="smfm-prose smfm-prose--quiet">
          Different problems, same underlying posture: notice the thing I'd
          miss on my own, say something before it costs me.
        </p>
        <div class="smfm-meta">
          <span class="smfm-meta__k">skills</span>
          <span class="smfm-meta__v">{{ skills.size }}</span>
          <span class="smfm-meta__sep">·</span>
          <span class="smfm-meta__k">status</span>
          <span class="smfm-meta__v">growing · planned 6–10</span>
        </div>
      </div>

      <section class="smfm-section">
        <div class="section-label">the skills</div>
        <div class="smfm-grid">
          {% for skill in skills %}
          <a class="skill-card" href="{{ '/saving-myself-from-myself/' | append: skill.slug | append: '/' | relative_url }}">
            <div class="skill-card__head">
              <span class="skill-card__name">{{ skill.name }}</span>
              <span class="skill-card__arrow">→</span>
            </div>
            <p class="skill-card__tagline">{{ skill.tagline }}</p>
            <p class="skill-card__desc">{{ skill.description }}</p>
            {% if skill.triggers %}
            <div class="skill-card__triggers">
              <span class="skill-card__k">triggers</span>
              <div class="skill-card__chips">
                {% for t in skill.triggers %}<span class="trigger-chip">{{ t }}</span>{% endfor %}
              </div>
            </div>
            {% endif %}
          </a>
          {% endfor %}

          {% assign planned = 8 | minus: skills.size %}
          {% for i in (1..planned) %}
          <div class="skill-card is-soon">
            <div class="skill-card__head">
              <span class="skill-card__name">————</span>
              <span class="skill-card__status">soon</span>
            </div>
            <p class="skill-card__tagline">tbd</p>
          </div>
          {% endfor %}
        </div>
      </section>

      <section class="smfm-section">
        <div class="section-label">install</div>
        <div class="smfm-install">
          <div class="install-row">
            <div class="install-row__k">Claude Desktop</div>
            <div class="install-row__v">double-click the <code>.skill</code> bundle</div>
          </div>
          <div class="install-row">
            <div class="install-row__k">Claude Code</div>
            <div class="install-row__v">drop the skill folder into <code>.claude/skills/</code> or <code>~/.claude/skills/</code></div>
          </div>
        </div>
      </section>

      <section class="smfm-section smfm-section--last">
        <div class="section-label">philosophy</div>
        <p class="smfm-prose">
          Each skill here exists because I needed it, not because it seemed
          like a good idea in the abstract. Fork freely — the personal bits
          (names, phrasings, specific habits) are meant to be swapped for
          yours.
        </p>
      </section>

    </div>

    <div class="col-3" style="padding-top:32px;">
      <div class="sidebar-section">
        <div class="section-label">on this page</div>
        {% for skill in skills %}
        <a class="toc-item" href="#{{ skill.slug }}">{{ skill.name }}</a>
        {% endfor %}
      </div>

      <div class="sidebar-section">
        <div class="section-label">source</div>
        <a class="sidebar-link" href="https://github.com/usefulish/usefulish/tree/main/skills/saving-myself-from-myself" target="_blank">repo folder →</a>
        <a class="sidebar-link" href="https://github.com/usefulish/saving-myself-from-myself" target="_blank">standalone repo →</a>
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
#smfm .smfm-hero { margin-bottom: 48px; padding-bottom: 28px; border-bottom: 1px solid var(--rule); }
#smfm .smfm-title { font-size: 40px; font-weight: 600; letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 16px; word-break: break-word; }
#smfm .smfm-title__dim { color: var(--ink-faint); font-weight: 400; }
#smfm .smfm-lede { font-size: 15px; color: var(--ink); line-height: 1.5; margin-bottom: 18px; max-width: 58ch; }
#smfm .smfm-prose { font-size: 13px; color: var(--ink-mid); line-height: 1.85; max-width: 62ch; margin-bottom: 1.2em; }
#smfm .smfm-prose--quiet { color: var(--ink-faint); }
#smfm .smfm-prose strong { color: var(--ink); font-weight: 600; }
#smfm .smfm-meta { font-size: 11px; color: var(--ink-faint); display: flex; gap: 8px; flex-wrap: wrap; align-items: baseline; margin-top: 18px; }
#smfm .smfm-meta__k { letter-spacing: 0.08em; text-transform: uppercase; }
#smfm .smfm-meta__v { color: var(--ink); }

#smfm .smfm-section { margin-bottom: 56px; }
#smfm .smfm-section--last { margin-bottom: 24px; }
#smfm .smfm-section .section-label { margin-bottom: 20px; }

#smfm .smfm-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1px; background: var(--rule); border: 1px solid var(--rule);
}
#smfm .skill-card {
  background: var(--paper); padding: 20px 20px 22px;
  display: flex; flex-direction: column; gap: 10px;
  text-decoration: none; color: var(--ink);
  transition: background 0.12s; min-height: 200px;
}
#smfm .skill-card:not(.is-soon):hover { background: var(--surface); }
#smfm .skill-card__head { display: flex; justify-content: space-between; align-items: baseline; }
#smfm .skill-card__name { font-size: 15px; font-weight: 600; letter-spacing: -0.01em; color: var(--ink); }
#smfm .skill-card__arrow { color: var(--accent); font-size: 14px; }
#smfm .skill-card__status { font-size: 10px; color: var(--ink-faint); letter-spacing: 0.08em; text-transform: uppercase; }
#smfm .skill-card__tagline { font-size: 12px; color: var(--ink-mid); font-style: italic; margin: 0; line-height: 1.5; }
#smfm .skill-card__desc { font-size: 12px; color: var(--ink-mid); line-height: 1.65; margin: 0; }
#smfm .skill-card__triggers { margin-top: auto; padding-top: 12px; border-top: 1px solid var(--rule); }
#smfm .skill-card__k { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-faint); display: block; margin-bottom: 6px; }
#smfm .skill-card__chips { display: flex; flex-wrap: wrap; gap: 4px; }
#smfm .trigger-chip { font-size: 10px; background: var(--tag-bg); color: var(--ink-mid); padding: 2px 7px; letter-spacing: 0.02em; }
#smfm .skill-card.is-soon { color: var(--ink-faint); min-height: 140px; }
#smfm .skill-card.is-soon .skill-card__name { color: var(--ink-faint); font-weight: 400; letter-spacing: 0; }

#smfm .smfm-install { border-top: 1px solid var(--rule); }
#smfm .install-row { display: grid; grid-template-columns: 160px 1fr; gap: 20px; padding: 14px 0; border-bottom: 1px solid var(--rule); align-items: baseline; }
#smfm .install-row__k { font-size: 11px; font-weight: 600; color: var(--ink); letter-spacing: 0.02em; }
#smfm .install-row__v { font-size: 12px; color: var(--ink-mid); }
#smfm .install-row__v code { font-family: var(--mono); font-size: 11px; background: var(--surface); color: var(--accent); padding: 1px 5px; }

@media (max-width: 900px) {
  #smfm .smfm-title { font-size: 28px; }
  #smfm .install-row { grid-template-columns: 1fr; gap: 6px; }
}
</style>
