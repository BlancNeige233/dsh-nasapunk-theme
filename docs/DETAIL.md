# NASA-punk paper theme

A NASA-punk interpretation of the dsh web interface: warm paper surfaces and ink hairlines in light mode, instrument graphite and amber in dark mode, with one red signal colour.

## What it changes

The bundle stacks one token override layer on the theme service: `ctx.theme.overrideTokens('dsh-nasapunk-theme', …)`. It overrides only alias tokens, so every client package that reads them follows automatically.

Because it is an override layer rather than a registered theme, it **follows your Appearance setting** — light / dark / system all keep working, and each token supplies a value for both palettes.

Covered: surface layers, four border steps, four text steps, brand / link / four states, focus ring, the full six-step radius scale (including `--dsw-radius-panel`, which the composer uses), interactive washes, cards, code-block fill, scrollbars, selection, tooltip keycaps, switch thumb, the three shadow steps, menu surfaces, hovercard, plugin icon tiles, the segmented switcher, the settings dialog surface, and the trajectory/turn-rail accents.

No theme preference is taken over; unloading the plugin restores the stock palette.

## Typography

| Role | Stack |
| --- | --- |
| Interface and body | `"DIN Next LT Pro", "Noto Serif SC", "Microsoft YaHei", sans-serif` |
| Code and readouts | `"Consolas", "DIN Next LT Pro", monospace` |
| Headings and brand | `"DIN Next LT Pro", "Bahnschrift", "Segoe UI", sans-serif` |

DIN Next LT Pro carries the Latin text (real DIN — instrument and manual lineage); Chinese falls back to Noto Serif SC for a printed-page feel. All three faces ship with Windows, so nothing is downloaded.

## Structural layer

A plugin-owned stylesheet adds what tokens cannot express:

- **Window corners** — the desktop titlebar's 16px top-left rounding is pinned to 0.
- **Chrome rule** — a 2px red line under the titlebar, drawn on its own `<html>`-level node with the maximum z-index. It stops at the left edge of the native window controls (using the `env(titlebar-area-*)` values), because that strip is painted by the OS above all page content; while the agent is running the line turns into a sweeping, breathing glow.
- **Paper fibre** — a `feTurbulence` noise layer over the window at 3.5% multiply (5.5% screen in dark mode).
- **Sidebar divider** — a 1px hairline on the sidebar's right edge.
- **Inline code** — pale red chip with red text and a thin red border; code blocks are explicitly exempted so shiki colours survive.
- **Blockquote** — 3px red rule on the left plus a 12% red wash.
- **Task checkboxes** — redrawn with `appearance: none` (the stock ones are disabled and ignore `accent-color`): paper-white empty box with an ink outline, solid red with a white tick when checked.
- **Turn rail** — the active turn's tick is red rather than ink black.
- **Question card** — the recommended-option badge keeps its chip but turns red (pale fill, red inset hairline, red label) with the glyphs nudged 1px down inside the fixed 17px box; the selected row paints on its inner button so the row's reserved description padding never shows as a red overhang.
- **Welcome hero title** — the headline takes DIN at 32px with tight tracking instead of the stock 26px system face, and rises 4px into place over 0.22s when the hero mounts.
- **Welcome breathe** — while the hero is on screen (no session) the chrome rule breathes on a 2.6s cycle; the running scan still wins when the agent is working.
- **Selected conversation** — the workspace list paints hover with an ink wash and selection with an accent tint, so the two states read differently (upstream shares one token for both).
- **Segmented control** — the front-end `_tabs_` / `_indicator_` / `_tab_` triplet is restyled: no borders, paper track, one shade lighter pill, weight instead of outlines for the active tab.
- **Brand mark** — the whale inherits ink like the wordmark; the rounded rect behind `HARNESS` is filled with the accent (red in light, instrument blue in dark).
- **Preset chip** — background stripped so it sits flush with the header.

Earlier decorative additions (corner brackets on the composer, a ticked rail beside the chat flow, multi-coloured headings and list markers) were tried and removed: they read as noise.

## Palette

| Role | Light | Dark |
| --- | --- | --- |
| Base | `#EAE8E2` | `#0B0E10` |
| Sheet / card | `#F3F1EC` | `#111417` |
| Composer, buttons | `#E5E2DA` | `#14181C` |
| Sidebar / titlebar | `#E1DFD9` | `#070A0B` |
| User bubble | `#DEDAD1` | `#181D22` |
| Code block | `#F4F1EA` | `#060809` |
| Nested surface | `#FFFFFF` | `#181D21` |
| Ink | `#3A3732` | `#E9E5DA` |
| Secondary text | `#66625A` | `#A7A399` |
| Accent | `#B3352A` | `#86CFE0` |
| Accent hover | `#9C2D24` | `#B0E3F0` |
| Accent tint | `rgba(179,53,42,.11)` | `rgba(134,207,224,.14)` |
| Error | `#B3352A` | `#D2603C` |
| Success | `#4F6B32` | `#8FA36A` |
| Hairline | `rgba(34,32,28,.16)` | `rgba(233,229,218,.10)` |

The dark accent is an instrument blue sampled from a cockpit-display reference (`#88B9C0`–`#9FD1DA`) and lifted slightly so it reads blue rather than grey. Light keeps the sealing-wax red, so the two modes share a palette skeleton but not a hue.

## Switching off

Disable or remove the bundle in Plugins. Both layers are disposed with the plugin and the interface returns to the stock look immediately.

## Known gaps

- Product icons (including the brand whale) are hard-coded SVGs and are not replaced; only their colour is retargeted.
- Structural selectors use preserved CSS-module local names; a dsh upgrade that renames them makes the affected flourish disappear silently (layout is never broken).
- The welcome hero's swimming-fish animation keeps its stock ink colour.
- The preset chip shows the raw preset id when the preset carries its own `name` field: the app skips localisation in that case, and CSS can only substitute a fixed string.
