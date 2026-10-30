# ECAPS CODE Website: Build Plan

Progress checklist for the build order in `CLAUDE.md`. Update after each task (Definition of done).
Read `/docs/design-brief.md` before any UI work — it wins over any quick idea.

**Status:** Phase 0 done. Phase 1 done except prerendering, which is **blocked** — `vite-react-ssg` cannot install alongside `react-router-dom` v7 (see Phase 1). Awaiting a decision on how per-page OG tags are produced.

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
| ~~1~~ | ~~`vite-react-ssg`~~ | **Rejected 2026-10-30** — failed the Phase 1 gate: `ERESOLVE` against `react-router-dom` v7, and no published version supports router v7. Replacement undecided |
| 4e | `react-hook-form`, `zod`, `@hookform/resolvers` | Contact form, client + server validation |
| 5 | `resend` | Serverless-only; email send |
| 5 | Cloudflare Turnstile — **no npm package** | Bot protection via a `<script>` tag client-side and a `fetch` to `siteverify` in the function. Zero dependencies; needs two env keys |
| 6 | `vitest`, `@testing-library/react`, `jsdom` | Testing is in scope — needs approval at that phase |

**Two deviations from the stack as written, each with a reason:**

1. **No `react-helmet-async` — use React 19 native document metadata.** React 19 hoists `<title>` / `<meta>` rendered inside a component automatically. `react-helmet-async` is effectively unmaintained and has React 19 peer conflicts. Zero dependencies instead of one, same result. A small `src/components/Seo.tsx` gives every page its own title and description.
2. **Framer Motion deferred — CSS-first motion.** Brief §9 says "Prefer CSS; use Framer Motion only where it clearly helps." Everything §8 allows (fade-up once per element, hover lift, smooth scroll, 1.02 image scale) works with CSS transitions plus one `useReveal` IntersectionObserver hook. Keeps the bundle small for the LCP target. Install `motion` only when a specific effect genuinely needs it.

**Not planned:** Prisma / PostgreSQL (marked optional; a contact form that emails needs no database). `clsx` / `tailwind-merge` (the installed `cn` package already replaces both).

---

## Phase 0 — Version control

Nothing else should be built before the project is under version control, so a bad change can be rolled back.

- [x] **Run `git init`** — this directory is not a git repository yet. Rule 5 bars Claude from git write commands, so this is run manually
- [x] **Add `.env` to `.gitignore`.** The current file covers `node_modules`, `dist` and `*.local` but **not** `.env` — as written, the Phase 5 secrets file would be committed. Add `.env`, `.env.*` and keep `!.env.example`
- [x] Review the rest of `.gitignore` (`.DS_Store` and editor dirs are already covered)
- [x] Add a remote, if one is wanted this early
- [x] First commit, run manually → suggested message: `chore: initialise repository`

## Phase 1 — Foundation

- [x] Map brand tokens in `src/index.css`: INK `#202124`, MIST `#F1F3F4`, SILVER `#BDC1C6` → `--background`=MIST, `--foreground`=INK, `--primary`=INK, `--primary-foreground`=MIST, `--border`/`--input`=SILVER, `--muted-foreground`=INK at 60%. Keep the `.dark` block coherent for INK sections
- [x] **Use explicit radius tokens.** Define `--radius-card: 24px` and `--radius-panel: 32px` as their own values rather than deriving them. The existing `@theme inline` multipliers are the problem: `--radius-3xl` is `calc(var(--radius) * 2.2)`, which at a 12px base gives 26.4px, not the 24px the brief specifies. Set `--radius: 12px` for small elements and inputs, expose the two explicit tokens for cards and large panels, and keep buttons pill (`9999px`). Components reference `rounded-(--radius-card)` / `rounded-(--radius-panel)` so the spec values can never drift
- [x] Add the type scale from brief §4 as theme tokens (`clamp()` for hero H1 and H2, plus H3, body, caption)
- [x] Container: max-width **1200px**, padding 24px mobile / 48px desktop. `src/components/layout/Container.tsx` currently uses `max-w-7xl` (1280px) and must change
- [x] Remove the `border-o` debug utility (red border) from `src/index.css` and strip its uses from `Header.tsx` and `Container.tsx`
- [x] Confirm Inter loads with `display: swap`; delete unused `src/assets/react.svg` and `vite.svg`
- [x] Install `react-router-dom`; create `src/routes.tsx` using `React.lazy` + `Suspense`; wire `main.tsx` to the router
- [x] **Prerendering gate 1 — compatibility: FAILED (2026-10-30).** Verify `vite-react-ssg` against `react@^19.3.1`, `vite@^8.3.4`, `react-router-dom@7`. Registry pre-check of `vite-react-ssg@0.9.2`: `react` / `react-dom` ✅ (`^17 || ^18 || ^19`), `vite` ✅ (`^6.4 || ^7.3 || ^8`); the `react-router-dom` peer is `^6.14.1` and marked **optional**, so v7 sits outside the declared range — npm will warn (`EINVALIDPEER`) rather than hard-fail, and v7 is unverified by the author. Confirm it installs and builds
  > **Result: hard failure, worse than predicted.** `npm install vite-react-ssg` aborts with `ERESOLVE`, not a warning. The pre-check misread `peerOptional`: it means *optional when absent, enforced when present*. `react-router-dom@7.18.5` is present, so the `^6.14.1` peer is enforced and npm refuses outright. Checked all **46** published versions — every one pins `react-router-dom` to `^6.14.1`, so no version of this package has ever supported router v7. Not a version-bump problem. npm aborted atomically; nothing was written to `package.json` or `node_modules`. `--force` / `--legacy-peer-deps` deliberately not used, per the stop-and-report rule below
- [ ] **Prerendering gate 2 — head placement: NOT REACHED.** Moot while gate 1 blocks installation; the concern below still applies to whichever approach replaces it.
  Original check — Verify per-page OG tags land inside `<head>` of the emitted HTML, not inside `<div id="root">`. Two reasons this can fail: `vite-react-ssg` depends on `react-helmet-async@^1.3.0` *directly* (a hard dependency, not a peer), which cuts against decision 1; and React 19 native metadata hoisting is a **DOM** behaviour — under server rendering React 19 emits `<title>` / `<meta>` inline where they appear, i.e. inside the root div, exactly where the Facebook and WhatsApp crawlers will not reliably read them. If this fails, the metadata approach has to change (adopt the SSG's own head component, reversing part of decision 1) or take the fallback below
- [x] **Gate failed → stopped and reported, no workaround applied.** Fallback to propose = one default set of OG tags in `index.html` (zero dependencies, every shared link previews identically), with React Router v7 framework-mode prerender as the alternative if per-page previews are a hard requirement
- [ ] ~~Only once both gates pass: shape `routes.tsx` to `vite-react-ssg`'s route-object format, swap `main.tsx` to its `ViteReactSSG` entry, set `includedRoutes`, and exclude `/design-system` from prerendering (it is `noindex` anyway)~~ — **not done**, gate 1 blocked it. `routes.tsx` was still written as a plain route-object array, so it stays convertible without restructuring
- [x] **Decided: per-page OG tags come from React Router framework mode**, not `vite-react-ssg` — see "Prerendering: where this stands" below. Implementation is the next task, after the Phase 1 commit
- [x] Create the missing folders: `/src/sections`, `/src/hooks`, `/src/lib`, `/src/data`
- [x] Keep stylesheet at `src/index.css` rather than `/src/styles/index.css` — moving it also means updating the `tailwind.css` path in `components.json`. Confirm at review
- [x] Add `src/components/Seo.tsx` (native React 19 metadata) and a `useReveal` hook that respects `prefers-reduced-motion`
- [x] `npm run lint` + `npm run build` pass → **Commit now** (both clean, TypeScript strict enabled)

### Prerendering: where this stands

`vite-react-ssg` is **out** — not a judgement call, it cannot coexist with router v7. **Decided 2026-10-30: option B, React Router framework mode.** Chosen now rather than at Phase 6 because only placeholder pages exist, so `routes.tsx` is restructured once instead of twice. Not yet started — it is a dependency upgrade plus a refactor, so it waits behind a commit of the Phase 1 foundation (workflow rule 6).

Options as they stood:

| Option | What it costs | Result |
|---|---|---|
| **A. Static OG tags in `index.html`** | Zero dependencies, ~20 minutes | Every shared link previews identically. Per-page titles still work for Google (it runs JS); only social crawlers see the generic set |
| **B. React Router framework mode ← chosen** | Migrate `react-router-dom@7` → `react-router@8` + `@react-router/dev@8`. A **major-version** migration, not just adopting conventions as first assumed. `vite@^8` is supported ✅ | True per-page prerendered HTML — the original goal |
| **C. Downgrade to `react-router-dom@6`** | Gives up v7, moves the stack backwards | Unblocks `vite-react-ssg`. Not recommended |

Also worth knowing before choosing: `react-router-dom@7.18.5` is a thin wrapper whose only dependency is `react-router@7.18.5`, and `react-router` itself is already at **8.5.1**. `react-router-dom` is no longer the maintained entry point, so option B is a move the project likely needs regardless of prerendering.

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
- [ ] Spam protection, cheap first filter: honeypot field + submission timestamp check. An in-memory per-IP counter is explicitly **not** used — serverless functions are stateless and scale to many instances, so the counter resets constantly and enforces nothing
- [ ] **Abuse control (decided): Cloudflare Turnstile + honeypot — no npm package.** Widget script client-side; the function verifies the token server-side with a `fetch` to `https://challenges.cloudflare.com/turnstile/v0/siteverify`
- [ ] **Reject the submission when the Turnstile token is missing or fails verification — before calling Resend.** Turnstile targets bots, not volume: if a determined human floods the form, durable rate limiting (Upstash Redis) gets revisited then, not now
- [ ] **Run the function locally** before deploying. Either `vercel dev` (runs `/api/contact` on the same origin as the Vite app, closest to production, needs the Vercel CLI and a linked project) or a `server.proxy` entry in `vite.config.ts` pointing `/api` at a locally running handler (no CLI or account needed, but diverges from the production runtime). Decide alongside the host choice; `vercel dev` is the default if deploying to Vercel
- [ ] `.env.example` with `RESEND_API_KEY`, the destination address, and `TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`; real `.env` stays untracked (added to `.gitignore` in Phase 0)
  > **Naming flag:** the site key has to reach the browser, and Vite only exposes env vars prefixed `VITE_`. As literally named, `TURNSTILE_SITE_KEY` will be `undefined` in client code — the client-side read needs `VITE_TURNSTILE_SITE_KEY`. The secret key correctly stays unprefixed and server-only
- [ ] Pending / success / error states in the form; no secrets reachable from client code
- [ ] Manual end-to-end send test, local then deployed → **Commit now**

**Why Turnstile over Upstash Redis:** both are defensible — Turnstile targets bots, Upstash targets volume — but Turnstile needs no npm package, no extra account beyond Cloudflare and no round-trip to a second service per submit, and bots are the actual threat to a contact form. Upstash stays available as the answer if a human ever floods it.

## Phase 6 — Quality

- [ ] SEO: per-page title and meta description, `robots.txt`, `sitemap.xml`, `og-image`, canonical URLs
- [ ] **Verify prerendering against the deployed site.** Setup itself is decided and done in Phase 1 (`vite-react-ssg`, behind the two gates there) — this closes the trade-off accepted in decision 1, since the Facebook and WhatsApp crawlers do **not** execute JS and read the raw HTML response. Check with the Facebook Sharing Debugger and a real WhatsApp message against the live URL, not just by viewing source
- [ ] Performance: convert images to AVIF/WebP, audit `npm run build` output, flag any large dependency. Target Performance 90+, LCP under 2.5s on mobile
- [ ] Accessibility: target 95+ — keyboard path through every interactive element, visible focus states, alt text on all images, correct heading order, AA contrast, `prefers-reduced-motion` honored
- [ ] Testing: propose `vitest` + React Testing Library for the Zod schemas and a per-route smoke render — **requires approval of the new dependencies first**
- [ ] Lighthouse mobile run; record the scores in this file → **Commit now**

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

## CLAUDE.md corrections — applied 2026-10-30

- [x] "shadcn/ui (Radix based)" → Base UI, style `base-vega`, matching `components.json`
- [x] `react-helmet-async` → React 19 native metadata, with the reason recorded
- [x] `/server` Express API → serverless function + Resend (folder structure updated to match)
- [x] Annotate the brief's Next.js references (`next/font`, `next/image`, server components) with their Vite equivalents so a future session does not re-litigate decision 1
- [x] Append all four decisions above to the Decisions log, dated 2026-10-30 — eight entries added, covering the four decisions plus `strict`, the radius tokens and the `vite-react-ssg` rejection

---

## Next task (after the Phase 1 commit)

**Prerendering via React Router framework mode.** Risky enough to want a rollback point first:

- [ ] Migrate `react-router-dom@7.18.5` → `react-router@8` + `@react-router/dev@8` (`react-router-dom` is only a wrapper around `react-router`, which is already at 8.5.1)
- [ ] Convert `src/routes.tsx` to the framework-mode route config; keep `React.lazy` per route
- [ ] Add `react-router.config.ts` with `prerender` listing every public route; exclude `/design-system` (`noindex`)
- [ ] **Verify per-page OG tags land inside `<head>`** of the emitted HTML, not inside `<div id="root">` — the gate-2 check that `vite-react-ssg` never got to. React 19 native metadata does not hoist under server rendering, so if this fails, `Seo.tsx` needs the framework's own head handling
- [ ] `npm run lint` + `npm run build` pass, every route still renders → **Commit now**
