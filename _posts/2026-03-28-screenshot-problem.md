---
layout: post
title: "The screenshot problem nobody talks about"
date: 2026-03-28
tags: [tools, macos, bash]
description: "Every screenshot gets named Screenshot 2026-03-28 at 11.00.40.png. That filename tells you exactly one useful thing. I tried fixing it with Shortcuts and Apple Intelligence. Then I threw out the whole stack and wrote a bash script. This is how I fixed it — and why the obvious solution didn't work."
read_time: 8
post_tools:
  - name: screenshot-renamer
    url: https://github.com/usefulish/screenshot-renamer
post_links:
  - label: github.com/usefulish
    url: https://github.com/usefulish
---

<!--more-->

My Screenshots folder had thousands of them. Finding a specific screenshot meant either remembering roughly when you took it, or opening them one by one. Neither is a great answer.

## The obvious solution

Shortcuts. Someone had already built a solid 118-action implementation. I tried it. It mostly worked for text screenshots. But even when it worked, it was slow — 5 to 10 seconds per file. My workflow is take screenshot, go to folder, share. The file was never ready when I got there.

## Apple Intelligence as a bridge

Apple Intelligence can describe images. In theory, perfect for this. In practice: it queues the request, processes it in the background, and there's no reliable hook into when it's done. You can't say "rename this file once Apple Intelligence has finished describing it." You can only check after the fact, which means polling, which means more latency.

## Throwing out the stack

Why does renaming a file require a 118-action Shortcut, Apple Intelligence, and a chat app running in the background? It doesn't. It's a bash script.

<div class="code-block">
  <div class="cb-bar">
    <span class="cb-label">screenshot-rename.sh</span>
  </div>
  <div class="cb-body"><span class="t-comment"># OCR via macOS Vision framework</span>
<span class="t-var">ocrText</span>=$(<span class="t-cmd">osascript</span> <span class="t-flag">-e</span> <span class="t-str">"
  use framework \"Vision\"
  set request to current application's
    VNRecognizeTextRequest's alloc()'s init()
  return ocrResult
"</span> 2>/dev/null)

<span class="t-comment"># If text found, send to API for slug</span>
<span class="t-key">if</span> [ <span class="t-flag">-n</span> <span class="t-str">"$ocrText"</span> ] && [ ${<span class="t-var">#ocrText</span>} <span class="t-flag">-gt</span> <span class="t-num">10</span> ]; <span class="t-key">then</span>
  <span class="t-var">slug</span>=$(call_api <span class="t-flag">--text</span> <span class="t-str">"$ocrText"</span>)
<span class="t-key">else</span>
  <span class="t-comment"># Resize to 300px, send to vision API</span>
  <span class="t-cmd">sips</span> <span class="t-flag">-Z</span> <span class="t-num">300</span> <span class="t-str">"$inputFile"</span> <span class="t-flag">--out</span> <span class="t-path">"$tmpImg"</span>
  <span class="t-var">slug</span>=$(call_api <span class="t-flag">--image</span> <span class="t-str">"$tmpImg"</span>)
<span class="t-key">fi</span>

<span class="t-cmd">mv</span> <span class="t-str">"$inputFile"</span> <span class="t-path">"${datePrefix}-${slug}.png"</span></div>
</div>

Hazelnut watches the Desktop. New screenshot appears, script runs, file renamed. Under a second for OCR, under two for vision. No Shortcuts, no Apple Intelligence queue, no chat app dependency.

## How it works

The script runs two passes. First, it tries OCR using macOS's native Vision framework via `osascript`. If there's readable text in the screenshot — a UI, a terminal, a webpage — that text goes to the API and comes back as a slug like `claude-code-settings-hooks`.

If OCR comes back empty or too short to be meaningful, it falls back to vision: the image gets resized to 300px on its longest side via `sips`, then sent to the vision API as a base64 blob. The model describes what it sees and returns a slug.

## The 300px finding

I originally sent full-resolution images to the vision API. Then I tried 512px, then 300px. The slugs are identical. A 300px thumbnail is enough for a vision model to describe the content of a typical screenshot. Resizing first cuts the API call from ~2s to under 1s on a good connection, and cuts token cost by roughly 90%.

## Provider notes

The script works with any API that accepts a text prompt or base64 image and returns a string. I use Claude for both — `claude-3-haiku-20240307` for OCR slugs (fast, cheap) and `claude-3-5-sonnet-20241022` for vision (better descriptions). You can swap in any provider that fits the interface.

The prompt is short: `Describe this screenshot in 4-6 words as a lowercase hyphenated slug. Return only the slug.` Haiku follows it reliably. Sonnet always does.

## The repo

Everything is at `github.com/usefulish/screenshot-renamer`. The `README` has setup instructions for both Hazelnut and Hazel. The script is about 80 lines, no dependencies beyond `curl` and `osascript`.
