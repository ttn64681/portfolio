# Portfolio Project — Context for AI Assistants

This document describes the codebase, with emphasis on the **pixel background**, **animations**, and **visual system**, so another AI can answer questions or make changes accurately.

---

## 1. Tech Stack & Structure

- **Framework:** Next.js 15 (App Router), React 19
- **Styling:** Tailwind CSS v4 (`@import 'tailwindcss'` in `src/app/globals.css`), with `@theme inline` for design tokens
- **Animation / UX:** Framer Motion, Lenis (smooth scroll via `ReactLenis` in layout), `typewriter-effect`
- **Entry:** `src/app/page.tsx` is a client component that composes `BGFade`, `Splash`, and `Menu`

**Relevant paths:**

- Pages: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`
- Components: `components/BGFade.tsx`, `components/Splash.tsx`, `components/Menu.tsx`, `components/MenuOptions.tsx`
- Pixel assets: `public/pixel/` (PNG sprite sheets and other art)
- Fonts: `public/fonts/` (local), plus Google Pixelify Sans in layout

---

## 2. Pixel Background — Overview

The main background is a **multi-layer parallax scene** built from **sprite sheets**. Five layers are stacked back-to-front and share the same sprite animation. Each layer uses a different PNG and is positioned/scaled in CSS. Parallax is driven by **mouse** and **scroll** in `Splash.tsx`.

---

## 3. Sprite Sheets & Layers

- **Source:** Pixel art was upscaled 4× from an original Aseprite file (see `public/pixel/sizing_notes.txt`). Code may apply further scale via CSS.
- **Animation format:** One horizontal sprite sheet per layer:
  - **25 frames** per sheet
  - **Frame width:** 2200px  
  - **Total width:** 55 000px (25 × 2200)
  - **Background movement:** from 0 to **-52 800px** [(25−1) × 2200]

**Layers (back to front):**

| Layer ID | Asset | Role | Notes |
|----------|--------|------|--------|
| `bg5` | `5 sky.png` | Sky | z-index 1, `top: -43px`, scale 0.92 |
| `bg4` | `4 buildings.png` | Buildings | z-index 2, height 306px, `bottom: 500px`, scale 0.91 |
| `bg3` | `3 midland.png` | Midland | z-index 3, height 444px, `bottom: 460px`, scale 0.9 |
| `bg2` | `2 water.png` | Water | z-index 4, height 630px, `bottom: -100px`, scale 0.89 |
| `bg1` | `1 black.png` | Black/foreground | z-index 6, height 613px, `bottom: -140px`, scale 0.88, `pointer-events: none` |

All layers use the shared **`.sprite-layer`** class (see Section 5). Each `<div>` has `id="bg1"` … `id="bg5"` and is updated by the parallax logic in `Splash.tsx` via `document.getElementById(id)`.

**Other assets in `public/pixel/`:** `emblem.png`, `portrait.png` (not wired into the current background stack).

---

## 4. Sprite Animation (CSS)

Defined in `src/app/globals.css`:

- **Keyframes:** `@keyframes sprite-anim`  
  - `from { background-position-x: 0 }`  
  - `to { background-position-x: -52800px }`
- **Class:** `.sprite-layer`
  - `position: absolute`, `left: 50%`, `width: 2200px`
  - `background-repeat: no-repeat`
  - `background-size: 55000px 100%`
  - `animation: sprite-anim 2.5s steps(24) infinite` — 24 steps for 25 frames, loops every 2.5s
  - Pixel-crisp rendering: `image-rendering: pixelated`, `crisp-edges`, `-webkit-optimize-contrast`, etc.
  - Layer-specific rules in `#bg1`–`#bg5` set `background-image`, `height`, `bottom`/`top`, `transform`, `z-index`, and (for `#bg1`) `pointer-events: none`

The visible “viewport” is 2200px wide; the rest of the 55 000px is revealed by shifting `background-position-x`.

---

## 5. Parallax (Splash.tsx)

`Splash` renders the five `bg1`–`bg5` divs inside `animated-bg-container` and runs a single effect loop that:

- Tracks **mouse** and **scroll**
- Uses **lerp** (linear interpolation) for smoothing: `smoothingRatio = 0.065`
- Converts mouse to normalized coords: `relX`, `relY` in [-1, 1] from screen center
- On **tablet/smaller** (`window.innerWidth <= 768`), mouse-based parallax is disabled (offsets forced to 0)
- Updates each layer via inline `transform` on the DOM element

**Per-layer config (order matches back→front):**

- `bg5`: maxX 30, maxY 20, scale 0.93, scrollYMult 0.5  
- `bg4`: maxX 24, maxY 16, scale 0.91, scrollYMult 0.4  
- `bg3`: maxX 18, maxY 12, scale 0.9, scrollYMult 0.3  
- `bg2`: maxX 12, maxY 8, scale 0.89, scrollYMult 0.15  
- `bg1`: maxX 6, maxY 4, scale 0.88, scrollYMult -0.1  

**Transform applied (conceptually):**

- `translateX(calc(-50% - ${mouseXOffset}px))`
- `translateY(${scrollY * scrollYMult - mouseYOffset}px)`
- `scale(${scale})`

A `requestAnimationFrame` loop calls `updateTransforms()` every frame; mouse/scroll/resize are wired in a single IIFE whose return value is the cleanup function used in `useEffect`.

---

## 6. BGFade — Intro Overlay

**Role:** Full-screen black intro that hides the pixel background, then fades out.

- **Visibility:** Rendered for 3 seconds (`setIsVisible(false)` after 3000 ms), then unmounts (`return null`).
- **Visual:** Framer Motion overlay with `initial={{ opacity: 1 }}`, `animate={{ opacity: 0, scale: 1.5 }}`, `transition={{ duration: 1, delay: 1, ease: 'easeOut' }}`. Background uses `bg-blackground` (`#000e1d`).
- **Content:** Two SVGs (same path): one stroked, one filled. The stroked path uses `pathLength` 0→1 over 3s; the filled path uses a clip-path reveal (`polygon(0 0, 0 0, 0 0)` → `polygon(0 0, 0 100%, 100% 100%)`) with delay 0.25s.
- **Responsive:** SVG container size depends on viewport: 256×128 (≤640px), 320×160 (≤768px), 384×192 (desktop). `willChange` and `contain` are used for performance.
- **Z-index:** Overlay at `z-51` so it sits above the pixel background and menu during intro.

---

## 7. Menu & MenuOptions

- **Menu** (`components/Menu.tsx`): Fixed overlay (`z-5`) with title “THAI NGUYEN”, a “[ Press Start ]” / “[ Back ]” button, and a typewriter line. On “[ Press Start ]” it sets `startPressed`; on “[ Back ]” it sets `isExiting` and then clears it when the exit animation completes. Scroll-driven parallax/scale is applied to `#menu-container` (e.g. `translateY(-scrollY * 0.5)`, `scale(1 + scrollY * -0.0005)`).
- **MenuOptions** (`components/MenuOptions.tsx`): Renders when `startPressed || isExiting`. Two layouts: small/medium (stacked, slide from bottom via `translateY`), large (right-side, slide from right via `translateX`). Uses Framer Motion for enter/exit and calls `onExitComplete` when the exit animation finishes.
- **Button animation:** Each option uses two spans: one with “white background” clip animation (`.menu-button-white-bg` / `.menu-button-white-bg-reverse`), one with text reveal (`.menu-button` / `.menu-button-reverse`). These are defined in `globals.css` with `clip-path: inset(...)` keyframes.

---

## 8. CSS Animations in globals.css

- **black-bg-fade:** Opacity 1→0 over 3s, then `visibility: hidden` (used by a class; not currently driving BGFade, which uses Framer Motion).
- **menu-button / menu-button-reverse:** Clip from right (0 100% 0 0) to full (0 0 0 0) and back; ~0.25s.
- **menu-button-white-bg / menu-button-white-bg-reverse:** Three-phase clip (right → full → left) over 0.5s / 0.2s.
- **echo / echo-delayed:** “Echo” effect for the Press Start button — scale 1→1.5, opacity pulse, blur 0→4px; `.animate-echo-delayed` is offset in time (e.g. 34%–35% start) for a second wave.
- **sprite-anim:** Described in Section 4; drives the pixel background layers.

---

## 9. Colors & Fonts

**Variables (in `:root` and `@theme inline`):**

- `--blackground: #000e1d` (dark blue-black)
- `--white-title: #f1f8ff` (light blue-white)
- `--background` / `--foreground` (Tailwind semantic colors; also respect `prefers-color-scheme: dark`)

**Fonts (from `layout.tsx` + `globals.css`):**

- **Pixelify Sans** (Google) → `--font-pixelify` → `.font-pixelify`
- **VCR_OSD_MONO** → `--font-pixel-mono` → `.font-pixel-mono`
- **Retron2000** → `--font-pixel-retron` → `.font-pixel-retron`
- **terminal-grotesque** → `--font-pixel-terminal` → `.font-pixel-terminal`
- **AtlantisHeadline-Bold** → `--font-pixel-headline` → `.font-pixel-headline`

---

## 10. Page Layout & Z-Index (Conceptual)

- Root: `relative w-100vw h-100vh bg-blackground`.
- **BGFade** (when mounted): full viewport, `z-51`.
- **Splash:** `animated-bg-container` (full height), contains the five sprite layers (z-index 1–6).
- **Menu:** `fixed inset-0 z-5`.
- **Content block:** `relative … z-10` with “[ Press Enter ]”, “THAI NGUYEN”, and placeholder “Subtext…” lines. Uses classes like `text-shadow-pixel-large`, `text-shadow-pixel-blue`, `text-shadow-pixel` — these are **not** defined in `globals.css`; they may be intended as custom utilities or from a Tailwind theme/plugin and would need to be added if the shadows are to work.

---

## 11. Things to Watch When Editing

- **Sprite math:** Changing frame count or frame width requires updating both `background-size`, `background-position-x` in `sprite-anim`, and the `steps()` count so the animation stays in sync.
- **Layer order:** Parallax in `Splash.tsx` uses a fixed array of layer configs; IDs must match the divs and stay in back-to-front order.
- **Cleanup:** Splash’s `useEffect` returns the cleanup from the IIFE (remove listeners + stop rAF if you ever add a cancel). BGFade’s timer is cleared on unmount.
- **Paths:** Pixel images are referenced as `url('/pixel/1 black.png')` etc. — leading slash and `pixel` folder name matter for Next.js `public` serving.
- **Lenis:** Layout wraps the app in `<ReactLenis root options={{ lerp: 0.4 }}>`, so scroll behavior is smooth and scroll-driven effects (Splash, Menu) depend on it.

---

## 12. File-by-File Summary

| File | Role |
|------|------|
| `src/app/page.tsx` | Composes BGFade, Splash, Menu; main content block with title and placeholders |
| `src/app/layout.tsx` | Fonts, ReactLenis, HTML/body setup |
| `src/app/globals.css` | Tailwind import, theme, font classes, all keyframe/ animation and sprite-layer styles |
| `components/BGFade.tsx` | Black intro overlay + dual-SVG logo, unmounts after 3s |
| `components/Splash.tsx` | Renders bg1–bg5 divs, runs mouse/scroll parallax and applies transform to each |
| `components/Menu.tsx` | Fixed menu with Press Start / Back, typewriter, scroll-based transform, MenuOptions |
| `components/MenuOptions.tsx` | Animated menu buttons (About Me, Projects, Extra, Quit); enter/exit and clip-path effects |
| `public/pixel/*.png` | Sprite sheets and art; `sizing_notes.txt` notes 4× upscale from Aseprite |

Use this context when answering questions about the pixel background, parallax, sprite animation, BGFade, menu animations, or where to change layout, timing, or assets.
