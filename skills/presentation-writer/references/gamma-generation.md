# Generating in Gamma

Load this when slide markdown is ready to render. Generate via the Gamma MCP `generate` tool. Default Gamma parameters produce uneven results that don't match Mellonhead/ABA visual language. The parameter recipe below closes most of that gap.

## Parameter recipe for ABA decks

| Parameter | Value | Why |
|---|---|---|
| `themeId` | ABA theme ID (call `get_themes` to find it; current name is "ABA") | Applies brand fonts, color palette, accent backgrounds |
| `format` | `"presentation"` | Default for slide decks |
| `textMode` | `"preserve"` | **Critical.** Keeps your written slide content verbatim. Default (`"generate"`) makes Gamma rewrite and re-layout your slides, which is the single biggest cause of off-brand output |
| `cardOptions.dimensions` | `"16x9"` | Standard slide ratio |
| `cardOptions.headerFooter.bottomLeft` | `{type: "image", source: "themeLogo", size: "sm"}` | Adds the AI@ABA badge bottom-left on every slide. Without this, the theme alone does not apply it |
| `cardOptions.headerFooter.hideFromFirstCard` | `true` | Keeps the title slide clean |
| `imageOptions.source` | `"noImages"` | **The default. MQ ruling 2026-08-31.** Not `aiGenerated`, not `themeAccent`. Smart layouts and frames carry the deck; decoration does not. Only override when a slide type below calls for a specific library image, or when MQ asks for imagery |
| `cardSplit` | `"inputTextBreaks"` | Maps your `---` section breaks one to one onto cards, so the deck is the length you planned. Count the breaks before generating |
| `additionalInstructions` | (see below) | Anchors layout style |

## Recommended `additionalInstructions`

Pass this string to anchor Gamma's layout choices:

> "Use sentence case for all slide titles (not Title Case). Prefer outlined frame cards over solid filled color blocks. Use the ABA secondary palette (teal #008095, burgundy #870833, forest #00613b) for accent headings and frame borders, not solid backgrounds. Keep abundant whitespace. Section labels (e.g., 'ACTIVITY', 'TODAY'S SESSION') should appear in small caps with a light tinted pill background above the slide title."

## Image strategy

**Start from no images.** `imageOptions.source: "noImages"` on every generation unless one of the two exceptions below applies. Never let Gamma source or generate imagery on its own: `aiGenerated` produces off-brand stock, and `themeAccent` pulls the theme's decorative photos into decks that should be plain.

**Exception 1: library images for recurring workshop slide types.** Embed the URL from `course-material/ABA/Brand_and_Graphics/slide-image-library.md` with standard `![alt](url)` syntax. Gamma respects embedded URLs. This is the only image path for "Your turn", "Now try again", and other types logged in the library. Embedding in the markdown works alongside `noImages`, so the parameter does not change.

**Exception 2: a one-off hero MQ asked for.** Run `/aba-image` first for a brand-compliant concept, pre-generate the image using the prompt it returns, host the URL, and embed it in the markdown. Pre-generating and embedding is what keeps the image identical across regenerations.

Let's Share, Let's Reflect, Breakouts, and every card in a status or update deck take no imagery at all. Frame layouts and color carry them.

## Generation pitfalls (what NOT to do)

- **Letting `textMode` default.** The default is `"generate"`, which rewrites your slides. Always pass `"preserve"` when slide content is finished.
- **Skipping `headerFooter`.** The AI@ABA badge does not appear from the theme alone.
- **Letting Gamma pick the "Your turn" image.** It generates a different person each time. Use the library URL.
- **Letting Gamma decide the deck's length.** Build to the card count MQ asked for, and if she has not named one, propose a card plan before generating. A fourteen-card deck out of a request for a short update is the failure mode (2026-08-31). Use `cardSplit: "inputTextBreaks"` and count your `---` breaks.
- **Reaching for a deck when the deliverable is a document.** Status updates, stakeholder reads, and anything with dense verbatim tables usually belong in `/aba-word-document`, not Gamma.
- **Passing an outline instead of slide-density text.** If your inputText is an outline, use `textMode: "generate"` and accept Gamma's layouts. If it's finished slide content, use `"preserve"` and pass `additionalInstructions` for layout direction.
- **Forgetting to specify a slide for the "How This Workshop Was Designed" image.** This slide reads better with a sophisticated hero (architectural curve, glass form). Develop with `/aba-image` and embed.
