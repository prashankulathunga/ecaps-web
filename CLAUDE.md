# ECAPS CODE Website: Project Guide for Claude Code

## About
ECAPS CODE is a tech company (formerly "PLATINUM CODE") founded by Prashan Kulathunga.
This repo is the official company website. A visitor should understand what ECAPS CODE does at first glance.

**Before ANY UI work, read `/docs/design-brief.md`. It is the source of truth for look and feel.**

> **Reading the brief on a Vite stack.** The brief specifies `next/font` (§4, §9), `next/image` (§9) and "prefer server components" (§9). These are Next.js-only and this project is React + Vite. Translate, do not re-litigate: `next/font` → `@fontsource-variable/inter` (already installed, `display: swap`); `next/image` + `priority` → plain `<img>` with explicit `width`/`height` and `fetchpriority="high"` on the hero, `loading="lazy"` elsewhere; server components → not available, keep client JS small instead. Everything else in the brief applies as written.

## Workflow rules (always follow)
1. **Plan first.** For any task bigger than one file, propose a plan and wait for my approval before coding.
2. **One task at a time.** Finish, verify, then stop. Do not start the next phase on your own.
3. **Verify before saying "done".** Run `npm run lint` and `npm run build`. Fix all errors first.
4. **Look at your work.** After building a UI section, open it in the browser and check screenshots at 375px, 768px and 1440px against the design brief. Fix problems before reporting done.
5. **Never run git write commands. I commit manually.** Do NOT run `git add`, `git commit`, `git push`, `git merge`, `git rebase`, `git reset`, `git checkout -b`, or create/switch/delete branches. Read-only commands (`git status`, `git diff`, `git log`) are fine.
6. **Tell me when to commit.** After each finished, verified task (lint and build pass), stop and tell me clearly:
   > **Commit now.** Suggested message: `feat: add navbar component`
   > Files changed: (short list)

   Then wait. Do not start the next task until I say I have committed or tell you to continue.
   - One feature = one commit. Use Conventional Commits: `feat:`, `fix:`, `chore:`, `style:`, `refactor:`, `docs:`.
   - If a task grows too big, tell me to commit the working part first, then continue.
   - Also tell me to commit before any risky change (large refactor, dependency upgrade, deleting files) so I can roll back.
   - When a feature is complete and it is time to create a branch or merge, tell me the exact command and let me run it.
7. **Ask when unclear.** If content or requirements are missing, ask me. Do not guess and do not invent company facts, numbers or client names.
8. **Do not change design tokens, brand colors or the folder structure without asking.**
9. **No new dependencies without telling me why.**

## Tech stack
- **React + Vite + TypeScript** (strict mode)
- **Tailwind CSS** with brand colors as design tokens
- **shadcn/ui** (**Base UI** based, style `base-vega` — not Radix) for UI components, customized to match the design brief
- **React Router** for pages
- **react-hook-form + Zod** for forms and validation
- **Framer Motion** only where CSS is not enough (scroll reveal, page transitions)
- **Lucide React** for icons (one icon set, one stroke width)
- **React 19 native document metadata** for per-page title and meta tags, via `src/components/Seo.tsx` (not `react-helmet-async`: unmaintained, React 19 peer conflicts, and React 19 hoists `<title>` / `<meta>` on its own)
- **Font:** Inter via `@fontsource-variable/inter`
- **Back-end (contact form):** a **serverless function** at `/api/contact` on the same Vercel/Netlify deploy (Zod validation, Resend, Cloudflare Turnstile + honeypot). No separate `/server` Express app, and no Prisma/PostgreSQL — a form that sends email needs no database.
- **Deploy:** Vercel or Netlify for the front-end (with SPA fallback to `index.html`); API on a small server or serverless function.

## Commands
```
npm run dev       # start dev server
npm run build     # production build (must pass before "done")
npm run lint      # ESLint (must pass before "done")
npm run preview   # preview the production build
```

## Brand
| Token | Hex | Usage |
|---|---|---|
| INK | `#202124` | ~74%: text, dark sections, primary buttons |
| MIST | `#F1F3F4` | ~21%: page background, light sections, cards |
| SILVER | `#BDC1C6` | ~5%: borders, dividers, secondary text |

- Mood: minimal, premium, confident, technical, calm.
- Style: monochrome. No extra colors without my approval.
- Hero: cinematic landscape background (ECAPS CODE logo + black-and-white VR headset photo).
- References for feel: Apple iPhone page (typography, spacing, radius, simple animation), AWS (structure and credibility), Francium (speed and smooth experience). Never copy their text, images or code.

## shadcn/ui rules
- Add components with the CLI only when needed: `npx shadcn@latest add <component>`.
- Map the brand to shadcn CSS variables in `src/index.css`:
  - `--background` = MIST, `--foreground` = INK, `--primary` = INK, `--primary-foreground` = MIST
  - `--border` and `--input` = SILVER, `--muted-foreground` = INK at 60% opacity
  - `--radius` = 12px for small elements and inputs. Cards and panels use the explicit tokens `rounded-(--radius-card)` (24px) and `rounded-(--radius-panel)` (32px); buttons are pill (`9999px`). **Do not use `rounded-3xl` for cards** — the `@theme` multiplier makes it 26.4px at a 12px base, not the 24px the brief specifies
- Do NOT leave shadcn at its default look. Adjust each component (radius, height, spacing, hover) to match `/docs/design-brief.md`.
- Keep shadcn files in `src/components/ui`. Build custom pieces on top of them in other folders; do not edit them without a reason.
- Use design tokens and Tailwind theme values. Never hardcode hex colors inside components.

## Folder structure
```
/src
  /assets          -> images, logo, fonts
  /components
    /ui            -> shadcn components
    /layout        -> Navbar, Footer, PageWrapper, WhatsAppButton
    /sections      -> Hero, ServicesPreview, Stats, ProjectsPreview, Process, CTA
  /pages           -> Home, Services, Projects, About, Contact, NotFound
  /hooks           -> custom hooks
  /lib             -> utils, constants, validation schemas
  /data            -> services, projects, site content (typed objects)
  /styles          -> index.css (tokens, global styles)
  App.tsx, main.tsx, routes.tsx
/api               -> contact form serverless function (replaces /server)
/public            -> favicon, og-image, robots.txt, sitemap.xml
/docs              -> PLAN.md, design-brief.md, design-links.md
```

## Pages (priority order)
1. **Home**
2. **Services**
3. **Projects / Portfolio**
4. **About**
5. **Contact**

Build and finish one page completely (responsive, polished) before starting the next.
Keep text content in `/src/data` so it is easy to edit later.

## Build order
1. **Foundation:** Vite + TS + Tailwind + shadcn init, design tokens, font, router, base layout
2. **Design system page:** `/design-system` demo (colors, type scale, buttons, cards, inputs). I must approve it before any real page.
3. **Shared components:** Navbar, Footer, Button variants, Section wrapper, Card, WhatsApp button
4. **Pages** in the priority order above
5. **Back-end:** contact form API, email sending, spam protection
6. **Quality:** SEO, performance, accessibility, testing
7. **Deploy** and release `v1.0.0`

Track progress as a checklist in `/docs/PLAN.md`. Update it after each task.

## Code standards
- TypeScript strict. No `any` unless explained in a comment.
- Function components and hooks only. Small, reusable components. No copy-pasted blocks.
- Mobile first, responsive on every component.
- Semantic HTML, alt text on all images, visible focus states, keyboard navigation.
- Lazy load routes with `React.lazy` and `Suspense`.
- Images: WebP or AVIF, always set `width` and `height`, `loading="lazy"` (hero uses `fetchpriority="high"`).
- Motion: follow the design brief (400 to 700ms, `cubic-bezier(0.22, 1, 0.36, 1)`). Respect `prefers-reduced-motion`.
- Every page sets its own title and meta description with `src/components/Seo.tsx` (React 19 native metadata).
- Forms: validate on both client (Zod) and server (Zod). Never trust client input.
- Secrets only in `.env` files. Never commit `.env`. Keep a `.env.example`.

## Performance targets
- Lighthouse on mobile: Performance 90+, Accessibility 95+, SEO 95+
- LCP under 2.5s
- Keep bundle small: check with `npm run build` output and tell me about any large dependency.

## Definition of done (every task)
- [ ] Matches `/docs/design-brief.md`
- [ ] Works on mobile, tablet and desktop (checked with screenshots)
- [ ] `npm run lint` and `npm run build` pass
- [ ] `/docs/PLAN.md` checklist updated
- [ ] I was told "Commit now" with a suggested commit message (I run the commit myself)

## Decisions log
(Add new decisions here so they are not forgotten between sessions.)
- 2026-10-30: Stack set to React + Vite + Tailwind + shadcn/ui. Plan Mode first, then foundation.
- 2026-10-30: Claude never commits or manages branches. It tells me "Commit now" with a suggested message, and I commit manually.
- 2026-10-30: **Stay on React + Vite.** The brief's `next/font` / `next/image` / server-component lines are translated to Vite equivalents (see the note at the top), not treated as a reason to switch framework.
- 2026-10-30: **shadcn/ui here is Base UI based**, style `base-vega`, per `components.json` and `src/components/ui/button.tsx`. Not Radix.
- 2026-10-30: **Placeholder content is typed and marked `TODO`** in `/src/data`. Never invent company facts, numbers, client names or testimonials; a page is done only once real copy lands.
- 2026-10-30: **Contact form = serverless function + Resend + Cloudflare Turnstile and a honeypot.** Supersedes the `/server` Express API. No in-memory rate limiting — serverless instances are stateless, so a per-IP counter enforces nothing.
- 2026-10-30: **No `react-helmet-async`** — React 19 native document metadata via `src/components/Seo.tsx`.
- 2026-10-30: **Framer Motion deferred.** CSS transitions plus the `useReveal` IntersectionObserver hook cover everything brief §8 allows. Install `motion` only when a specific effect genuinely needs it.
- 2026-10-30: **TypeScript `strict` enabled** in `tsconfig.app.json` / `tsconfig.node.json`. It was absent despite the stated stack, which is why `any` had slipped into `Container.tsx`.
- 2026-10-30: **`vite-react-ssg` rejected.** It cannot install alongside `react-router-dom` v7 (`ERESOLVE`; no published version supports v7). Prerendering goes through React Router framework mode instead — see `/docs/PLAN.md`.
