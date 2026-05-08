# Mayur Patle — Portfolio

Hyper-aesthetic developer portfolio. Glassmorphism 2.0 + minimalist cyberpunk, Apple-grade motion, three.js hero.

## Stack

- **React 18** + **Vite** — instant HMR, modern build
- **Tailwind CSS** — custom design tokens (see `tailwind.config.js`)
- **Framer Motion** — scroll reveals, magnetic cursor, parallax
- **Three.js / React Three Fiber / Drei** — interactive distorted icosahedron, particle field, sparkles

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # prod build
npm run preview  # preview prod build
```

## Architecture

```
src/
├── App.jsx                # composition root
├── main.jsx               # entry
├── index.css              # base + glass utilities + cursor
│
├── three/
│   └── HeroScene.jsx      # R3F canvas, Crystal mesh, particles
│
├── components/
│   ├── Nav.jsx            # floating glass pill nav
│   ├── Cursor.jsx         # dot+ring magnetic cursor
│   ├── Magnetic.jsx       # wraps elements for magnetic hover
│   ├── Reveal.jsx         # whileInView fade+rise
│   ├── FAB.jsx            # floating "Hire me" with expanding panel
│   └── Marquee.jsx        # CSS-only infinite text strip
│
└── sections/
    ├── Hero.jsx           # 3D + editorial headline + status pill
    ├── Projects.jsx       # parallax horizontal scroll cards w/ tilt
    ├── Stack.jsx          # bento grid, mixed tile sizes, micro-interactions
    ├── About.jsx          # editorial bio, stats grid
    └── Footer.jsx         # large CTA + social rail
```

## Design tokens (Tailwind)

| Token            | Value                                             | Use                          |
|------------------|---------------------------------------------------|------------------------------|
| `bg-ink-950`     | `#05060A`                                         | App canvas                   |
| `bg-ink-900`     | `#0A0B12`                                         | Section variants             |
| `text-neon-cyan` | `#5EEAD4`                                         | Primary accent               |
| `text-neon-violet`| `#A78BFA`                                        | Secondary accent             |
| `font-display`   | Playfair Display                                  | Headlines, italic phrases    |
| `font-sans`      | Inter                                             | Body                         |
| `font-mono`      | JetBrains Mono                                    | Labels, kickers, indices     |
| `shadow-deep`    | layered drop shadows                              | Cards / FAB                  |
| `ease-apple`     | `cubic-bezier(0.22, 1, 0.36, 1)`                  | All motion                   |

The `.glass` and `.glass-strong` utilities (in `index.css`) handle backdrop blur + saturation + hairline border + inset highlight in one class.

## Motion principles

1. **One easing curve everywhere** — `cubic-bezier(0.22, 1, 0.36, 1)`. Consistency reads as quality.
2. **Damped lerp, not snap** — the 3D crystal uses `0.04` lerp factor for mouse-tracking, the cursor ring uses spring physics. No instantaneous response.
3. **Stagger reveals** — hero headline reveals in 3 lines (`delay: 0.2 / 0.35 / 0.5`). Section reveals stagger child delays by `0.05`.
4. **Magnetic affordances** — buttons, links, and the FAB pull toward the cursor when nearby. Subtle but unmistakable.
5. **Reduced motion respected** — `prefers-reduced-motion` short-circuits all animations.

## Personalization checklist

- [x] LinkedIn → `https://www.linkedin.com/in/mayurpatle/`
- [x] GitHub → `https://github.com/mayurpatle`
- [ ] Email — replace `hello@mayurpatle.dev` in `Footer.jsx` and `FAB.jsx`
- [ ] Project links — point each card's `href` in `Projects.jsx` to the actual repo
- [ ] Twitter / Read.cv links in `Footer.jsx`
- [ ] (Optional) Add `og-image.png` to `/public` and link in `index.html` for social cards

## Performance notes

- Canvas uses `dpr={[1, 2]}` — caps DPR on retina to keep frame rate up.
- Drei's `Sparkles` and `Float` are GPU-light.
- Parallax in `Projects.jsx` uses `useTransform` on `scrollYProgress`, which is RAF-driven and never triggers React re-renders.
- Marquee is pure CSS `@keyframes` — zero JS.
- All `whileInView` animations use `once: true` to avoid re-trigger jank.

## What to extend

- Add a `<Lenis>` smooth-scroll provider if you want inertial scroll (the repo currently relies on native `scroll-behavior: smooth`).
- Swap `Crystal` in `HeroScene.jsx` for a custom `.glb` model loaded via `useGLTF` for a workstation/keyboard hero.
- Add MDX-based case-study pages for each project — the current cards link directly to GitHub.
