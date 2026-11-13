# Glossary — Japanese → English leathercraft terms

Fixed vocabulary for Guild pattern translation. Loaded into the translation prompt so that
the same Japanese term always comes out as the same English term, across patterns and across runs.

The design this feeds into is in [TRANSLATION_DESIGN.md](TRANSLATION_DESIGN.md).

## Where it lives (since 2026-09-19)

The source is the database table `glossary_entries`, edited in the app under
**Curation → Glossary** (curator only; members read it). Every write bumps `glossary_state.version`
and lands in `glossary_history`. The edge function checks the version on every call and rereads the
entries when it has moved — so a correction reaches the very next translation, with no deploy and no wait.

This file is now a **snapshot** of that table, for diffs in git and for `glossary_test.mjs`:

```bash
node tools/glossary/export_from_db.mjs
```

It also refreshes `supabase/functions/translate-guild/glossary.json`, which the function uses only
if the database cannot be reached. Do not edit `ja-en.json` by hand and expect it to take effect.

Correcting the glossary does not rewrite translations already made. The curator retranslates the
ones that matter from **Curation → Suggested fixes** (or edits one by hand).

## Why entries carry a source

This file is injected into every translation. One wrong entry does not produce one wrong
translation — it produces a consistent, confident, wrong term in all of them. Provenance is what
makes a bad entry findable later, so `source` and `confidence` are required on every row.

## Tiers

**Tier A — a real English term exists.** Translate it.

Highest-confidence Tier A rows are `confidence: project`: terms we already shipped in
`js/i18n.js`. Those are not research findings, they are our own decisions, and translations must
match the running UI. `tools/test/glossary_test.mjs` checks they have not drifted apart.

**Tier B — the named gusset types and construction techniques.** Translate them too, descriptively.

This started as a "do not translate, romanize and gloss" tier. That was wrong, and the evidence
overturned it: English *does* have terms for nearly all of these, and a romanized name in a UI
label has nowhere to put the gloss that would make it mean anything.

What survived from the original argument is narrower and still true: the English trade vocabulary
names the **construction**, not the gusset. Arsutoria School's bag vocabulary lists T, inside-out,
raw, tooth, box, strip and accordion *constructions* — not a taxonomy of gusset nouns. So a
Japanese gusset name often maps to an English construction name rather than to a part name, and
the part name we use is derived from it. Each such derivation is recorded in the entry's `note`.

The one term where romanization still won is `菊寄せ`: JLIA defines it and leaves its English
field empty, and English-language craft writing uses **kikuyose** untranslated. We label it
"radial corner pleating" and keep kikuyose in the gloss.

Where two Japanese names turned out to be one structure (`帯マチ` and `捨てマチ`), both entries
are kept — people search both — and cross-linked with `aliases`.

## Open items

- `折れマチ` still has `reading_verified: false`, and its two primary sources define it
  differently: JLIA says the gusset is halved vertically and joined to the left and right of the
  front and back panels, while Manual of Leather Goods p.98 says folded gussets are "joined at the
  sides and bottom". These may not be the same construction.
- `通しマチ` is attested as "continuous gusset", but that manual defines a continuous gusset as
  joined at the sides, **top** and bottom, whereas Japanese usage is sides and bottom — which the
  same manual would call a *folded* gusset. The gloss states the edges explicitly so the label
  cannot be misread. Arsutoria's "side-bottom (fianco-fondo)" is the sides+bottom sense.
- `風琴マチ` → "bellows gusset" is our inference from two definitions, not a documented
  equivalence, and it does not encode the real distinction from 蛇腹マチ (dividers in the valleys
  versus on the peaks). Confirm with a maker.
- `横マチ` is not in either web source. Its definition is ours.
- `刻印` is genuinely ambiguous: "engrave" in the 3D UI, but "stamp"/"stamping" as a hand tool.
- Target languages: `js/i18n.js` carries 20 languages. `ja` and `en` are complete (1205 / 1204
  keys). The other 18 are partial, not stubs: 13 sit at ~237 keys (20% of `ja`) and 5 at 153 keys
  (13%). They cover the core UI — tool names, tooltips, the common dialogs — and `t()` falls back
  through `en` then `ja` for the rest. So a German reader already has a mostly-German interface,
  and translating Guild content into these languages is reasonable. This glossary stays ja→en for
  now because English is the pivot every other language is reached through, not because the other
  locales are empty.

  (Counting these is easy to get wrong: the non-ja/en sections pack several `'key': 'value'` pairs
  onto one line, so counting lines, or matching one pair per line, both undercount badly.)

## Sources

Project: `js/i18n.js`.

English definitions: [Popov Leather](https://www.popovleather.com/blogs/from-the-workshop/leather-glossary),
[Learn Leathercraft](https://learnleathercraft.com/pages/leather-terminology),
[Wikipedia: Pricking iron](https://en.wikipedia.org/wiki/Pricking_iron),
[Wikipedia: Leather crafting](https://en.wikipedia.org/wiki/Leather_crafting),
[Hyd Handbags](https://hydhandbags.com/turned-edges-vs-cut-edges-in-leather-bag-construction/),
[Tanner Bates](https://www.tannerbates.co.uk/blogs/news/maker-techniques-edges),
[Arsutoria School — bag construction vocabulary](https://www.arsutoriaschool.com/the-essential-vocabulary-of-bag-construction-and-anatomy/),
[Leather Craft Haven — gusset structures](https://leathercrafthaven.com/leather-wallet-gusset-structure/),
*Manual of Leather Goods* p.98 (the gusset taxonomy; the host blocks automated fetches, so keep a
local copy — the three types are side / continuous / folded).

Japanese headwords: [レザークラフト研究 — 工具](https://leatherworksthalia.hatenablog.com/entry/2024/06/12/124620),
[レザークラフト研究 — 型紙](https://leatherworksthalia.hatenablog.com/entry/2022/11/18/133526),
[KAWANOWA — マチ](https://www.kawanowa.com/gusset_type/),
[sot — マチ](https://sot-web.com/column/gasset/),
[Sakai workS — 帯マチ(捨てマチ)](https://sakaiworks.info/gusset-belt-bag-trial-production-2021-12-23/),
[森革工房 — 捨てマチ](https://moricobo.jimdoweb.com/2020/07/09/%E6%8D%A8%E3%81%A6%E3%83%9E%E3%83%81%E3%81%A7%E4%BD%9C%E3%82%8B%E3%83%9C%E3%83%87%E3%82%A3%E3%83%90%E3%83%83%E3%82%B0-%E8%A3%BD%E4%BD%9C%E3%81%AE%E8%A3%8F%E5%81%B4/),
[JLIA — まち（襠）](https://dictionary.jlia.or.jp/minnano/detail.php?id=924),
[phoenix blog — 菊寄せ](https://l-phoenix.jp/blog/archives/3834).

The two hatenablog posts are the author's own working notes ("自分用の覚書です"), not a dictionary,
and the 型紙 post is dressmaking rather than leather vocabulary. Useful, but corrected where it
conflicts with the English sources — see the `note` on `ヘリ落とし`, `菱目打ち` and `スーベルナイフ`.
