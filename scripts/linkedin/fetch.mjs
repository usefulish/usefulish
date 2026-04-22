#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ROOT_DIR = process.cwd();
const OUTPUT_PATH = path.join(ROOT_DIR, '_data/specs/linkedin.json');
const TODAY = new Date().toISOString().slice(0, 10);
const CHECK_MODE = process.argv.includes('--check');

const SOURCE_URLS = [
  'https://www.linkedin.com/help/linkedin/answer/a426534',
  'https://www.linkedin.com/help/linkedin/answer/a424737',
  'https://www.linkedin.com/help/linkedin/answer/a427022',
  'https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/post-api-schema?view=li-lms-2026-02',
];

async function main() {
  const pages = await fetchPages(SOURCE_URLS);

  const nextWithoutDate = {
    platform: 'LinkedIn',
    source_urls: SOURCE_URLS,
    formats: [
      extractSponsoredImage(pages.get(SOURCE_URLS[0])),
      extractSponsoredVideo(pages.get(SOURCE_URLS[1])),
      extractSponsoredCarousel(pages.get(SOURCE_URLS[2])),
    ],
    cta_options: extractCtaOptions(pages.get(SOURCE_URLS[3])),
  };

  const existing = await readExistingJson(OUTPUT_PATH);
  const comparableExisting = existing ? stripLastUpdated(existing) : null;
  const changed = JSON.stringify(comparableExisting) !== JSON.stringify(nextWithoutDate);

  if (!changed) {
    console.log('No changes detected — skipping write');
    return;
  }

  const next = {
    platform: nextWithoutDate.platform,
    last_updated: TODAY,
    source_urls: nextWithoutDate.source_urls,
    formats: nextWithoutDate.formats,
    cta_options: nextWithoutDate.cta_options,
  };

  if (CHECK_MODE) {
    console.log(`Changes detected (check mode)`);
    console.log(summarizeChanges(existing, next));
    return;
  }

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(next, null, 2)}\n`, 'utf8');

  console.log(existing ? 'Updated _data/specs/linkedin.json' : 'Created _data/specs/linkedin.json');
  console.log(summarizeChanges(existing, next));
}

async function fetchPages(urls) {
  const entries = await Promise.all(
    urls.map(async (url) => {
      const html = await fetchWithRetry(url);
      const text = htmlToText(html);

      if (!text || text.length < 500) {
        throw new Error(`Fetched ${url}, but extracted text was unexpectedly short`);
      }

      return [url, { html, text }];
    }),
  );

  return new Map(entries);
}

async function fetchWithRetry(url, attempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          'user-agent': 'usefulish-linkedin-spec-fetcher/1.0',
        },
        redirect: 'follow',
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.text();
    } catch (error) {
      lastError = error;

      if (attempt < attempts) {
        await sleep(500 * attempt);
      }
    }
  }

  throw new Error(`Failed to fetch ${url}: ${lastError.message}`);
}

function htmlToText(html) {
  return decodeHtmlEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, '\n')
      .replace(/<style[\s\S]*?<\/style>/gi, '\n')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, '\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|section|article|main|header|footer|aside|li|ul|ol|table|tr|td|th|h1|h2|h3|h4|h5|h6)>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\r/g, '')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n +/g, '\n')
      .replace(/\n{2,}/g, '\n')
      .trim(),
  );
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)));
}

function extractSponsoredImage(page) {
  const introMatch = requirePageMatch(
    page,
    [
      ['html', /<td[^>]*>\s*Introductory text\s*<\/td>\s*<td[^>]*>[\s\S]*?Use up to (\d+) characters including spaces, emojis, and punctuation to avoid truncation \(([\d,]+) character maximum\)/i],
      ['text', /Use up to (\d+) characters including spaces, emojis, and punctuation to avoid truncation \(([\d,]+) character maximum\)/i],
    ],
    'single image intro text limits',
  );
  const headlineMatch = requirePageMatch(
    page,
    [
      ['html', /<td[^>]*>\s*Headline\s*<\/td>\s*<td[^>]*>Use up to (\d+) characters to avoid truncation \(([\d,]+) character maximum\)/i],
      ['text', /Headline\s+Use up to (\d+) characters to avoid truncation \(([\d,]+) character maximum\)/i],
    ],
    'single image headline limits',
  );
  const fileSizeMatch = requirePageMatch(
    page,
    [
      ['html', /<td[^>]*>\s*File size\s*<\/td>\s*<td[^>]*>[\s\S]*?<td[^>]*>(\d+) MB<\/td>/i],
      ['text', /File size (\d+) MB/i],
    ],
    'single image max file size',
  );

  return {
    slug: 'sponsored-image',
    name: 'Sponsored Image',
    image_sizes: [
      extractImageRatio(page, 'horizontal or landscape', '1.91:1'),
      extractImageRatio(page, 'square', '1:1'),
      extractImageRatio(page, 'vertical', '4:5'),
    ],
    ratios: ['1.91:1', '1:1', '4:5'],
    headline_max: toInt(headlineMatch[1]),
    headline_max_absolute: toInt(headlineMatch[2]),
    intro_text_recommended: toInt(introMatch[1]),
    intro_text_max: toInt(introMatch[2]),
    max_file_size_mb: toInt(fileSizeMatch[1]),
  };
}

function extractSponsoredVideo(page) {
  const lengthMatch = requirePageMatch(page, [['text', /Length\s+Three seconds to (\d+) minutes/i]], 'video duration limits');
  const fileSizeMatch = requirePageMatch(
    page,
    [
      ['html', /<td[^>]*>\s*File size\s*<\/td>\s*<td[^>]*>Between (\d+) KB and (\d+) MB<\/td>/i],
      ['text', /File size\s+Between (\d+) KB and (\d+) MB/i],
    ],
    'video file size limits',
  );
  const introMatch = requirePageMatch(
    page,
    [
      ['html', /<td[^>]*>\s*Introductory text \(optional\)\s*<\/td>\s*<td[^>]*>Use up to ([\d,]+) characters for your intro text\./i],
      ['text', /Introductory text \(optional\)\s+Use up to ([\d,]+) characters/i],
    ],
    'video intro text limit',
  );
  const headlineMatch = requirePageMatch(
    page,
    [
      ['html', /<td[^>]*>\s*Video headline\s*<\/td>\s*<td[^>]*>Use up to (\d+) characters to avoid truncation on most devices \(([\d,]+) max characters\)/i],
      ['text', /Video headline\s+Use up to (\d+) characters to avoid truncation on most devices \(([\d,]+) max characters\)/i],
    ],
    'video headline limits',
  );
  const fileFormatMatch = requirePageMatch(
    page,
    [
      ['html', /<td[^>]*>\s*File format\s*<\/td>\s*<td[^>]*>(MP4)<\/td>/i],
      ['text', /File format (MP4)/i],
    ],
    'video format',
  );

  return {
    slug: 'sponsored-video',
    name: 'Sponsored Video',
    format: fileFormatMatch[1],
    ratios: extractVideoRatios(page),
    duration_min_seconds: 3,
    duration_max_seconds: toInt(lengthMatch[1]) * 60,
    duration_recommended_seconds: '15-30',
    file_size_min_kb: toInt(fileSizeMatch[1]),
    file_size_max_mb: toInt(fileSizeMatch[2]),
    headline_max: toInt(headlineMatch[1]),
    headline_max_absolute: toInt(headlineMatch[2]),
    intro_text_max: toInt(introMatch[1]),
  };
}

function extractSponsoredCarousel(page) {
  const introMatch = requirePageMatch(page, [['text', /Introductory text - Use up to (\d+) characters to avoid truncation on some devices \(a maximum of (\d+) characters\)/i]], 'carousel intro text limits');
  const cardsMatch = requirePageMatch(page, [['text', /Cards - Use a minimum of ([a-z0-9]+) cards and a maximum of ([a-z0-9]+) cards/i]], 'carousel card count limits');
  const fileSizeMatch = requirePageMatch(page, [['text', /Max file size: (\d+) MB/i]], 'carousel max file size');
  const dimensionMatch = requirePageMatch(page, [['text', /Recommended individual image spec: (\d+\s*x\s*\d+)px with a (1:1) aspect ratio/i]], 'carousel recommended size');
  const headlineMatch = requirePageMatch(page, [['text', /(\d+)-character limit for carousel ads that direct to a destination URL/i]], 'carousel headline max');
  const linesMatch = requirePageMatch(page, [['text', /Headline text for each image card is a maximum of ([a-z]+) lines before being truncated/i]], 'carousel headline truncation');

  return {
    slug: 'sponsored-carousel',
    name: 'Sponsored Carousel',
    recommended_card_px: normalizeDimensions(dimensionMatch[1]),
    ratio: dimensionMatch[2],
    min_cards: toNumberWord(cardsMatch[1]),
    max_cards: toNumberWord(cardsMatch[2]),
    max_file_size_mb: toInt(fileSizeMatch[1]),
    headline_max: toInt(headlineMatch[1]),
    headline_truncation_note: `${linesMatch[1]} lines`,
    intro_text_recommended: toInt(introMatch[1]),
    intro_text_max: toInt(introMatch[2]),
  };
}

function extractCtaOptions(page) {
  const ctaBlock = requirePageMatch(
    page,
    [
      ['html', /<td>\s*contentCallToActionLabel\s*<\/td>\s*<td>([\s\S]*?)<\/td>\s*<td>/i],
      ['text', /contentCallToActionLabel Type of ContentCallToActionLabel which has the values of:(.*?)The call to action label which a member can act upon/si],
    ],
    'CTA options block',
  )[1];

  const options = [];
  const pattern = /(?:<li>|\*)\s*([A-Z_]+)\s*-\s*Call To Action button on the creative shows\s*(?:<code>|`)([^<`]+)(?:<\/code>|`)\./g;
  let match;

  while ((match = pattern.exec(ctaBlock)) !== null) {
    options.push({
      value: match[1],
      label: match[2],
    });
  }

  if (options.length === 0) {
    throw new Error('Unable to extract CTA options from post schema page');
  }

  return options;
}

function extractImageRatio(page, label, ratio) {
  const escapedLabel = escapeRegex(label);
  const escapedRatio = escapeRegex(ratio);
  const match = requirePageMatch(
    page,
    [
      [
        'html',
        new RegExp(
          `Aspect ratio for ${escapedLabel}: ${escapedRatio}(?: \\(recommended ratio\\))?<\\/td>\\s*<td[^>]*>(\\d+\\s*x\\s*\\d+) pixels<\\/td>\\s*<td[^>]*>Minimum: (\\d+\\s*x\\s*\\d+) pixels(?:<br>|\\s)+Maximum: (\\d+\\s*x\\s*\\d+) pixels`,
          'i',
        ),
      ],
      [
        'text',
        new RegExp(
          `Aspect ratio for ${escapedLabel}: ${escapedRatio}(?: \\(recommended ratio\\))?\\s*(\\d+\\s*x\\s*\\d+)?\\s*pixels?[\\s\\S]*?Minimum: (\\d+\\s*x\\s*\\d+) pixels[\\s\\S]*?Maximum: (\\d+\\s*x\\s*\\d+) pixels`,
          'i',
        ),
      ],
    ],
    `single image ratio ${ratio}`,
  );

  return {
    ratio,
    recommended_px: match[1] ? normalizeDimensions(match[1]) : null,
    min_px: normalizeDimensions(match[2]),
    max_px: normalizeDimensions(match[3]),
  };
}

function extractVideoRatios(page) {
  const block = requirePageMatch(
    page,
    [['html', /<h2>Recommended Specifications<\/h2>([\s\S]*?)<h2>Understanding aspect ratio<\/h2>/i]],
    'video recommended specifications block',
  )[1];

  const pattern = /<tr[^>]*>\s*<td[^>]*>\s*(?:&nbsp;)?\s*(Horizontal\/landscape|Square|Vertical):\s*([0-9.:]+)\s*(?:\([^)]+\))?(?:<br>\s*\(Recommended ratio\))?\s*<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<td[^>]*>Minimum:\s*(\d+\s*x\s*\d+)\s+pixels(?:<br>\s*|\s+)Maximum:\s*(\d+\s*x\s*\d+)\s+pixels/gi;
  const ratios = [];
  let match;

  while ((match = pattern.exec(block)) !== null) {
    const recommendedOptions = [...match[3].matchAll(/(\d+\s*x\s*\d+)\s+pixels/gi)].map((entry) =>
      normalizeDimensions(entry[1]),
    );
    const ratioEntry = {
      label: match[1],
      ratio: match[2],
      min_px: normalizeDimensions(match[4]),
      max_px: normalizeDimensions(match[5]),
    };

    if (recommendedOptions.length === 1) {
      ratioEntry.recommended_px = recommendedOptions[0];
    }

    if (recommendedOptions.length > 1) {
      ratioEntry.recommended_px_options = recommendedOptions;
    }

    ratios.push(ratioEntry);
  }

  if (ratios.length < 4) {
    throw new Error('Unable to extract all video ratios');
  }

  return ratios;
}

async function readExistingJson(filePath) {
  try {
    const raw = await readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }

    throw error;
  }
}

function summarizeChanges(previous, next) {
  if (!previous) {
    return 'Initial spec file created';
  }

  const changes = [];
  const previousComparable = stripLastUpdated(previous);
  const nextComparable = stripLastUpdated(next);

  if (JSON.stringify(previousComparable.source_urls) !== JSON.stringify(nextComparable.source_urls)) {
    changes.push('source URLs changed');
  }

  if (JSON.stringify(previousComparable.cta_options) !== JSON.stringify(nextComparable.cta_options)) {
    changes.push('CTA options changed');
  }

  for (const format of nextComparable.formats) {
    const oldFormat = previousComparable.formats.find((entry) => entry.slug === format.slug);

    if (!oldFormat) {
      changes.push(`format added: ${format.slug}`);
      continue;
    }

    if (JSON.stringify(oldFormat) !== JSON.stringify(format)) {
      changes.push(`format changed: ${format.slug}`);
    }
  }

  return changes.length > 0 ? changes.join('; ') : 'Normalized data changed';
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function stripLastUpdated(data) {
  const { last_updated, ...rest } = data;
  return rest;
}

function requirePageMatch(page, patterns, label) {
  for (const [source, pattern] of patterns) {
    const match = page[source].match(pattern);
    if (match) {
      return match;
    }
  }

  throw new Error(`Unable to extract ${label}`);
}

function normalizeDimensions(value) {
  return value.replace(/\s*x\s*/i, 'x');
}

function toInt(value) {
  return Number.parseInt(String(value).replace(/,/g, ''), 10);
}

function toNumberWord(value) {
  const normalized = String(value).trim().toLowerCase();
  const map = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
  };

  return map[normalized] ?? toInt(normalized);
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

main().catch((error) => {
  console.error(`LinkedIn spec fetch failed: ${error.message}`);
  process.exit(1);
});
