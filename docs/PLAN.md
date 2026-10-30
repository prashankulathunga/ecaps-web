# ECAPS CODE Website: Build Plan

Progress checklist for the build order in `CLAUDE.md`. Update after each task (Definition of done).
Read `/docs/design-brief.md` before any UI work — it wins over any quick idea.

**Status:** Phase 0 not started. Repo is a bare Vite scaffold, not yet under version control.

---

## Decisions locked 2026-10-30

Four conflicts between `CLAUDE.md`, the design brief, and the installed code, now resolved:

| # | Conflict | Decision |
|---|---|---|
| 1 | Brief §4/§9/§10 specify `next/font`, `next/image`, "prefer server components" — all Next.js-only | **Stay on React + Vite.** Translate: `@fontsource-variable/inter` (already installed) for fonts, plain `<img>` + `fetchpriority="high"` for the hero, no server components. Accepted trade-off: client-only SPA, so OG/social link previews stay weak until prerendering is added |
| 2 | `CLAUDE.md` says shadcn/ui is "Radix based" | **Base UI, not Radix.** `components.json` sets style `base-vega` and `src/components/ui/button.tsx` already wraps `@base-ui/react/button`. `npx shadcn add` pulls Base UI components here |
| 3 | Brief §12 content is TO FILL; workflow rule 7 forbids inventing company facts | **Typed placeholders** in `/src/data` with explicit `TODO` markers — never fake numbers, client names or testimonials. A page is only marked done once real copy lands |
| 4 | Contact API provider and hosting unspecified | **Resend + serverless function** on the same Vercel/Netlify deploy. Supersedes the separate `/server` Express API in the folder structure |

## Dependency plan

Rule 9: no new dependency without a reason. Install per phase, not up front.

| Phase | Package | Reason |
|---|---|---|
| 1 | `react-router-dom` v7 | Multi-page site; required by the stated stack |
| 4e | `react-hook-form`, `zod`, `@hookform/resolvers` | Contact form, client + server validation |
| 5 | `resend` | Serverless-only; email send |
| 6 | `vitest`, `@testing-library/react`, `jsdom` | Testing is in scope — needs approval at that phase |

**Two deviations from the stack as written, each with a reason:**

1. **No `react-helmet-async` — use React 19 native document metadata.** React 19 hoists `<title>` / `<meta>` rendered inside a component automatically. `react-helmet-async` is effectively unmaintained and has React 19 peer conflicts. Zero dependencies instead of one, same result. A small `src/components/Seo.tsx` gives every page its own title and description.
2. **Framer Motion deferred — CSS-first motion.** Brief §9 says "Prefer CSS; use Framer Motion only where it clearly helps." Everything §8 allows (fade-up once per element, hover lift, smooth scroll, 1.02 image scale) works with CSS transitions plus one `useReveal` IntersectionObserver hook. Keeps the bundle small for the LCP target. Install `motion` only when a specific effect genuinely needs it.

**Not planned:** Prisma / PostgreSQL (marked optional; a contact form that emails needs no database). `clsx` / `tailwind-merge` (the installed `cn` package already replaces both).

---

## Phase 0 — Version control

Nothing else should be built before the project is under version control, so a bad change can be rolled back.

- [ ] **Run `git init`** — this directory is not a git repository yet. Rule 5 bars Claude from git write commands, so this is run manually
- [ ] **Add `.env` to `.gitignore`.** The current file covers `node_modules`, `dist` and `*.local` but **not** `.env` — as written, the Phase 5 secrets file would be committed. Add `.env`, `.env.*` and keep `!.env.example`
- [ ] Review the rest of `.gitignore` (`.DS_Store` and editor dirs are already covered)
- [ ] Add a remote, if one is wanted this early
- [ ] First commit, run manually → suggested message: `chore: initialise repository`

## Phase 1 — Foundation

- [ ] Map brand tokens in `src/index.css`: INK `#202124`, MIST `#F1F3F4`, SILVER `#BDC1C6` → `--background`=MIST, `--foreground`=INK, `--primary`=INK, `--primary-foreground`=MIST, `--border`/`--input`=SILVER, `--muted-foreground`=INK at 60%. Keep the `.dark` block coherent for INK sections
- [ ] **Use explicit radius tokens.** Define `--radius-card: 24px` and `--radius-panel: 32px` as their own values rather than deriving them. The existing `@theme inline` multipliers are the problem: `--radius-3xl` is `calc(var(--radius) * 2.2)`, which at a 12px base gives 26.4px, not the 24px the brief specifies. Set `--radius: 12px` for small elements and inputs, expose the two explicit tokens for cards and large panels, and keep buttons pill (`9999px`). Components reference `rounded-(--radius-card)` / `rounded-(--radius-panel)` so the spec values can never drift
- [ ] Add the type scale from brief §4 as theme tokens (`clamp()` for hero H1 and H2, plus H3, body, caption)
- [ ] Container: max-width **1200px**, padding 24px mobile / 48px desktop. `src/components/layout/Container.tsx` currently uses `max-w-7xl` (1280px) and must change
- [ ] Remove the `border-o` debug utility (red border) from `src/index.css` and strip its uses from `Header.tsx` and `Container.tsx`
- [ ] Confirm Inter loads with `display: swap`; delete unused `src/assets/react.svg` and `vite.svg`
- [ ] Install `react-router-dom`; create `src/routes.tsx` using `React.lazy` + `Suspense`; wire `main.tsx` to the router
- [ ] Create the missing folders: `/src/sections`, `/src/hooks`, `/src/lib`, `/src/data`
- [ ] Keep stylesheet at `src/index.css` rather than `/src/styles/index.css` — moving it also means updating the `tailwind.css` path in `components.json`. Confirm at review
- [ ] Add `src/components/Seo.tsx` (native React 19 metadata) and a `useReveal` hook that respects `prefers-reduced-motion`
- [ ] `npm run lint` + `npm run build` pass → **Commit now**

## Phase 2 — Design system page (approval gate)

Route `/design-system`. **Must be approved before any real page is built.**

- [ ] Color swatches: INK / MIST / SILVER plus allowed opacity tints, each with its contrast ratio shown
- [ ] Full type scale rendered at real sizes
- [ ] Button matrix: primary / secondary / link-CTA, on both light and dark sections, every state including `focus-visible`
- [ ] Card, input and tag samples at their specified radii
- [ ] Spacing ruler showing the allowed 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 scale
- [ ] Motion demos: fade-up, hover lift, image scale, with a reduced-motion note
- [ ] Route marked `noindex` so it ships without polluting search results
- [ ] Screenshots at 375 / 768 / 1440 → **Commit now**, then wait for explicit approval

> **Open design question to settle on this page:** brief §3 sets the page background to MIST while §7 allows cards to be MIST too — identical fill, so cards would disappear. Needs a decision: card = white, or card = MIST with a 1px SILVER border. Both options will be shown side by side.

## Phase 3 — Shared components

Built on top of `src/components/ui/` primitives. One commit per component group.

- [ ] `Button` variants extended on the existing Base UI `ui/button.tsx`: pill, 48px height, 0 28px padding, inverted on dark sections
- [ ] `Navbar` — sticky, slim 64px, blurred translucent background, logo left, 4-5 links + one CTA right; clean mobile menu with focus trap and Esc to close
- [ ] `Footer` — grouped columns (Company / Services / Contact), contact details, social links, copyright
- [ ] `Section` wrapper with a `tone="ink" | "mist"` prop to drive the alternating light/dark rhythm
- [ ] `Card` — 24px radius, 32px padding, 1px SILVER border at low opacity, no heavy shadow
- [ ] `WhatsAppButton` — fixed bottom-right, round, INK background, accessible label
- [ ] `PageWrapper` composing Navbar + Footer + Seo
- [ ] Screenshots at 3 widths → **Commit now**

## Phase 4 — Pages (priority order)

Finish one page completely — responsive and polished — before starting the next.
Every page follows the same loop: typed data file in `/src/data` → sections → `Seo` title and description → screenshots at 375/768/1440 → lint + build → update this file → **Commit now**.

### 4a. Home
- [ ] The 9 blocks of brief §11, in order: Navbar, Hero, What we do (3-4 service cards), Numbers strip, Featured projects + "View all", How we work (3-4 steps), Technologies logo row, closing CTA on INK, Footer
- [ ] Hero: full-width cinematic background with dark overlay, short confident headline, one-line support text, primary + secondary button. Image `fetchpriority="high"`, explicit width and height, AVIF or WebP under 200KB
- [ ] Propose 3 tagline options for selection before building the hero
- [ ] A visitor understands what ECAPS CODE does within 3 seconds

### 4b. Services
- [ ] Card grid reusing `Card`, one message per service, identical card structure throughout

### 4c. Projects / Portfolio
- [ ] Large visual cards, same card shape everywhere, lazy-loaded images with fixed dimensions, "View all" pattern

### 4d. About
- [ ] Company and founder story. No invented facts, numbers or client names

### 4e. Contact
- [ ] Form UI with `react-hook-form` + Zod, contact details, WhatsApp link. Submit handler wired in Phase 5

### 4f. Privacy Policy
- [ ] `/privacy` route — what the contact form collects, how it is used, who it is sent through (Resend, plus the chosen abuse control if it processes IPs), retention, and how to request deletion
- [ ] Link it from the `Footer` Company column built in Phase 3
- [ ] Content must describe what the site actually does — no boilerplate claiming cookies, analytics or tracking that is not present. Needs a contact email for data requests

### 4g. NotFound
- [ ] 404 route, consistent with the rest of the site

## Phase 5 — Contact API

- [ ] Zod schema in `src/lib/validation.ts`, shared by client and server. Never trust client input
- [ ] Serverless function `/api/contact` validating with that same schema, sending via Resend
- [ ] Spam protection: honeypot field + submission timestamp check, plus a real abuse control (see below). An in-memory per-IP counter is explicitly **not** used — serverless functions are stateless and scale to many instances, so the counter resets constantly and enforces nothing
- [ ] **Decision needed before installing:** Cloudflare Turnstile or Upstash Redis. See the options below — ask first
- [ ] **Run the function locally** before deploying. Either `vercel dev` (runs `/api/contact` on the same origin as the Vite app, closest to production, needs the Vercel CLI and a linked project) or a `server.proxy` entry in `vite.config.ts` pointing `/api` at a locally running handler (no CLI or account needed, but diverges from the production runtime). Decide alongside the host choice; `vercel dev` is the default if deploying to Vercel
- [ ] `.env.example` with `RESEND_API_KEY`, the destination address, and whichever keys the chosen abuse control needs; real `.env` stays untracked (added to `.gitignore` in Phase 0)
- [ ] Pending / success / error states in the form; no secrets reachable from client code
- [ ] Manual end-to-end send test, local then deployed → **Commit now**

### Abuse control options (pick one)

| Option | How it works | Trade-off |
|---|---|---|
| **Cloudflare Turnstile** | Invisible CAPTCHA widget on the form; the function verifies the token server-side before sending | Free, no extra infrastructure, strong against bots. Adds a third-party script to the page and a visible challenge in rare fallback cases. Blocks bots but does not limit a determined human |
| **Upstash Redis** | Serverless Redis holding a per-IP counter with a TTL, checked in the function | True durable rate limiting that survives across instances; also reusable later for caching. Free tier is generous but it is another account, another secret, and a network round-trip per submit |

Both are defensible. Turnstile targets bots, Upstash targets volume — they solve different halves of the problem and can be combined later if spam gets through.

## Phase 6 — Quality

- [ ] SEO: per-page title and meta description, `robots.txt`, `sitemap.xml`, `og-image`, canonical URLs
- [ ] **Prerendering, so per-page OG tags actually work.** This closes the trade-off accepted in decision 1. React 19 metadata is injected by JavaScript, and the Facebook and WhatsApp crawlers do **not** execute JS — they read the raw HTML response. Without prerendering every shared link shows the same `index.html` title regardless of page, and no image. **Decision needed before installing — ask first.** Verify afterwards with the Facebook Sharing Debugger and a real WhatsApp message, not just by viewing source
- [ ] Performance: convert images to AVIF/WebP, audit `npm run build` output, flag any large dependency. Target Performance 90+, LCP under 2.5s on mobile
- [ ] Accessibility: target 95+ — keyboard path through every interactive element, visible focus states, alt text on all images, correct heading order, AA contrast, `prefers-reduced-motion` honored
- [ ] Testing: propose `vitest` + React Testing Library for the Zod schemas and a per-route smoke render — **requires approval of the new dependencies first**
- [ ] Lighthouse mobile run; record the scores in this file → **Commit now**

### Prerendering options (pick one)

| Option | How it works | Trade-off |
|---|---|---|
| **`vite-react-ssg`** | Crawls the route list at build time and emits real HTML per route, hydrating into the existing SPA | Smallest change to the current setup — keeps Vite, React Router and every component as-is. Needs routes defined in its own config shape, and the build gets slower. Smaller community than the alternatives |
| **React Router v7 framework mode** | React Router's own pre-rendering (`prerender` in its Vite plugin config) | First-party and actively maintained, no extra dependency beyond the router already planned in Phase 1. Means adopting its framework conventions, so Phase 1's `routes.tsx` would need restructuring |
| **Static OG tags only** | Skip prerendering; put one good set of OG tags in `index.html` | Zero dependencies and zero build cost. Every shared link previews identically — acceptable only if the home page is the only URL ever shared |

Recommendation: **React Router v7 framework mode**, since the router is already a planned dependency and it adds nothing new — but it is the larger refactor, so it may be worth choosing at Phase 1 instead of Phase 6 to avoid restructuring `routes.tsx` twice.

## Phase 7 — Deploy

- [ ] Vercel or Netlify config with SPA fallback to `index.html`
- [ ] Production environment variables set in the host dashboard
- [ ] Deploy; verify every route and the contact form on the live URL; re-run Lighthouse against production
- [ ] Tag `v1.0.0` — the exact command will be provided to run manually

---

## Inputs needed

Phases 1-3 are fully unblocked and can start immediately. These gate Phase 4 (brief §12, rule 7 — these must not be invented):

1. **Services offered** — names + one-line descriptions · blocks 4a, 4b
2. **Real numbers** — projects delivered, years active, technologies, clients. True figures only · blocks the 4a numbers strip
3. **Featured projects** — name, one-liner, image and link for each · blocks 4a, 4c
4. **Contact details** — email, phone, WhatsApp number, social links, address if any · blocks Navbar/Footer CTAs and 4e
5. **Technologies list** — for the §11 logo row · blocks 4a
6. **Hero asset** — `src/assets/hero.png` is only 13KB, which looks like a placeholder rather than the cinematic logo + black-and-white VR headset composite the brief describes. The real file is needed · blocks 4a
7. **Live domain** — for canonical URLs, sitemap, and the Resend sending domain · blocks 6, 7
8. **Tagline** — 3 options will be proposed at the start of 4a for selection

## CLAUDE.md corrections to apply in Phase 1

- "shadcn/ui (Radix based)" → Base UI, style `base-vega`, matching `components.json`
- `react-helmet-async` → React 19 native metadata, with the reason recorded
- `/server` Express API → serverless function + Resend (folder structure updated to match)
- Annotate the brief's Next.js references (`next/font`, `next/image`, server components) with their Vite equivalents so a future session does not re-litigate decision 1
- Append all four decisions above to the Decisions log, dated 2026-10-30
