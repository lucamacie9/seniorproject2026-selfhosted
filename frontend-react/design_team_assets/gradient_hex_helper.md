# Gradient Hex Helper

Companion reference for `pixel_sample_gradient.py`.

Use this file when implementing the sampled gradient consistently across pages and components.

## Canonical Gradient Stops (Sampled)

- `#f7fcf8` at `0%`
- `#baf2d2` at `50%`
- `#a5ebb6` at `100%`

CSS form:

```css
linear-gradient(180deg, #f7fcf8 0%, #baf2d2 50%, #a5ebb6 100%)
```

## Recommended Site-Level Implementation

Define one token and reuse it:

```css
:root {
  --page-gradient: linear-gradient(180deg, #f7fcf8 0%, #baf2d2 50%, #a5ebb6 100%);
}

body {
  background-image: var(--page-gradient);
}
```

## Page Container Pattern (Correct)

If you want the global gradient visible on every route, do not overwrite it with solid top-level page backgrounds:

```css
.page-wrapper {
  min-height: 100vh;
  background: transparent;
}
```

If a page should carry the gradient itself:

```css
.page-wrapper {
  min-height: 100vh;
  background: var(--page-gradient);
}
```

## Component Surface Pattern (Cards/Panels)

To keep text legible, keep components on light, semi-opaque surfaces:

```css
.card {
  background: #ffffff;
  border: 1px solid #dfe7e2;
  color: #1f2937;
}

.panel {
  background: #f9fcfa;
  border: 1px solid #dfe7e2;
  color: #1f2937;
}
```

## Common Mistakes

- Using a different middle stop than `#baf2d2` (visual drift from sampled design)
- Applying a solid `background-color` on top-level page wrappers
- Using low-contrast text colors directly on the gradient instead of on card/panel surfaces
- Mixing multiple near-match gradients in different files instead of using one shared token

## Quick Copy Snippets

Background only:

```css
background: linear-gradient(180deg, #f7fcf8 0%, #baf2d2 50%, #a5ebb6 100%);
```

Token usage:

```css
background: var(--page-gradient);
```
