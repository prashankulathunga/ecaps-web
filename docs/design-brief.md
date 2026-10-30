# ECAPS CODE Website: Design Brief

Claude Code must read this file before ANY UI work. If something here conflicts with a quick idea, this file wins.

## 1. Mood
**Minimal. Premium. Confident. Technical. Calm.**

Meaning in practice:
- Minimal: few elements per screen, lots of empty space, one message per section.
- Premium: precise spacing, soft rounded corners, restrained color, high-quality images.
- Confident: short, bold headlines. No hedging words ("we try to", "maybe").
- Technical: real numbers, clear structure, clean grid, developer-grade detail.
- Calm: slow, smooth motion. Nothing flashes, bounces or auto-plays loudly.

## 2. References (what to take from each)

### Apple iPhone page (apple.com/iphone)
Take: typography, spacing, simple animations, rounded corners.
- Very short headlines, big and tight (the page uses lines like "Pro further." and "Hello, hello.").
- One idea per section, with a lot of empty space around it.
- Two buttons per section: one primary ("Buy"), one secondary ("Learn more").
- Lineup section: one clean card per item, same structure each time.
- Image-led sections, text kept small and quiet.

### AWS (aws.amazon.com)
Take: structure and technical credibility.
- Clear page order: hero with one main CTA, what's new, customer stories, industries grid, numbers/infrastructure stats, footer.
- Credibility through real numbers (AWS uses figures such as "240+ services"). ECAPS CODE should show its own numbers (projects delivered, technologies, years, clients). Use only true numbers.
- Well-organized footer with grouped links.
- Do NOT copy: dense mega-menu, crowded cards, heavy text.

### Francium (francium.lk)
Take: smooth and fast experience.
- Consistent card grid: same card structure everywhere.
- Large visual blocks (video or image) between sections.
- "View all" links at the end of each group.
- Floating WhatsApp contact button (very effective for Sri Lanka customers).
- Fast loading: light pages, optimized images, no heavy libraries.

## 3. Colors (strict, no other colors)
| Token | Hex | Share | Use |
|---|---|---|---|
| INK | `#202124` | ~74% | Text, dark sections, primary buttons |
| MIST | `#F1F3F4` | ~21% | Light sections, page background, cards |
| SILVER | `#BDC1C6` | ~5% | Borders, dividers, secondary text, small accents |

- Allowed: tints and opacity of these three (for example INK at 60% for secondary text).
- Sections alternate between dark (INK) and light (MIST) to create rhythm.
- No gradients with new colors. No pure saturated accents. If an accent is ever needed, ask first.
- Text contrast must pass WCAG AA (INK on MIST is fine; SILVER only for non-essential text).

## 4. Typography (Apple-like feel)
- Font: **Inter** (or Geist). One family only, loaded with `next/font`.
- Headline sizes use `clamp()`:
  - Hero H1: `clamp(44px, 7vw, 88px)`, weight 600, line-height 1.05, letter-spacing -0.025em
  - H2: `clamp(32px, 4.5vw, 56px)`, weight 600, line-height 1.1, letter-spacing -0.02em
  - H3: 24 to 28px, weight 600
  - Body: 17 to 18px, weight 400, line-height 1.6, INK at 80%
  - Small / caption: 14px, SILVER or INK at 60%
- Headlines: short, 2 to 6 words where possible. Left-aligned by default; center only for hero and closing CTA.
- Max line length for paragraphs: 60 to 70 characters.

## 5. Spacing and layout
- 8px base grid. Allowed spacing values: 8, 16, 24, 32, 48, 64, 96, 128.
- Container: max-width 1200px, side padding 24px (mobile), 48px (desktop).
- Space between sections: 96px (mobile) to 128px (desktop).
- 12-column grid on desktop, single column on mobile.
- Every section: one headline, one short paragraph, one visual or card group, one CTA at most.
- Whitespace is a feature. If a section feels crowded, remove something.

## 6. Corner radius
| Element | Radius |
|---|---|
| Buttons | pill (`9999px`) |
| Small elements (tags, inputs) | 12px |
| Cards | 24px |
| Large image / hero / feature panels | 32px |

Use these values everywhere. Never mix random radii.

## 7. Components (style rules)
- **Primary button:** INK background, MIST text, pill, height 48px, padding 0 28px. On dark sections: MIST background, INK text.
- **Secondary button:** transparent, 1px SILVER border, pill. Hover fills slightly.
- **Link CTA:** text with a small arrow, like "Learn more >". Underline on hover only.
- **Cards:** MIST or INK background, 24px radius, 32px padding, no heavy shadow (use 1px SILVER border at low opacity or a very soft shadow).
- **Navbar:** sticky, slim (64px), blurred translucent background, logo left, 4 to 5 links, one CTA button right. Collapses to a clean menu on mobile.
- **Footer:** grouped link columns (Company, Services, Contact), contact details, social links, copyright.
- **Floating WhatsApp button:** bottom-right, simple round button, INK background.

## 8. Motion (simple, smooth, calm)
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Duration: 400 to 700ms. Hover effects 200 to 250ms.
- Allowed: fade-up on scroll (24px distance, once per element), subtle hover lift (translateY -2px), smooth scroll, gentle image scale on hover (1.02).
- Hero: slow fade-in of text, then image. No parallax overload.
- Always respect `prefers-reduced-motion`.
- Not allowed: bouncing, spinning, flashing, auto-playing sound, cursor effects, heavy 3D.

## 9. Speed and smooth experience (Francium-style)
- Lighthouse target: Performance 90+, Accessibility 95+, SEO 95+.
- LCP under 2.5s on mobile.
- Hero image: AVIF or WebP, under 200KB, served with `next/image` and `priority`.
- All other images lazy loaded with fixed width and height (no layout shift).
- No heavy animation libraries unless needed. Prefer CSS; use Framer Motion only where it clearly helps.
- Fonts via `next/font` with `display: swap`.
- Prefer server components. Keep client JavaScript small.

## 10. Hero
- Full-width cinematic landscape background (ECAPS CODE logo combined with a black-and-white VR headset photo), dark overlay so text stays readable.
- Headline (short, confident), one-line supporting text, two buttons (primary + secondary).
- A visitor must understand what ECAPS CODE does within 3 seconds.

## 11. Page structure (Home)
1. Navbar
2. Hero
3. What we do (3 to 4 service cards)
4. Numbers strip (real facts only)
5. Featured projects (large visual cards, "View all")
6. How we work (3 to 4 simple steps)
7. Technologies (clean logo row)
8. Closing CTA (dark section)
9. Footer

## 12. Content (to fill before building)
- Services offered: TO FILL
- Real numbers (projects, years, technologies): TO FILL
- Featured projects: TO FILL
- Contact details, WhatsApp number, social links: TO FILL
- Tagline / hero headline options: ask Claude to propose 3 options; I will choose.

## 13. Do NOT
- No colors outside the palette.
- No more than one font family.
- No stock-icon overload. Use a single consistent line-icon set (for example Lucide) at one stroke width.
- No emoji in the UI.
- No Lorem ipsum in finished pages.
- No centered text everywhere. Mix left-aligned and centered with purpose.
- No generic gradient "AI website" look.
- No cluttered sections. Max one main message per section.
- Do not copy any text, images or code from the reference websites. They are inspiration for feel and structure only.

## 14. Review process (every section)
1. Build the section.
2. Open it in the browser and take screenshots at 375px, 768px and 1440px.
3. Compare with this brief: typography, spacing, radius, colors, motion.
4. Fix problems before reporting done.
5. give notify commit.