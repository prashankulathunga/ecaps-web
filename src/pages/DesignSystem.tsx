import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import PageWrapper from "@/components/layout/PageWrapper"
import Container from "@/components/layout/Container"
import { useReveal } from "@/hooks/useReveal"
import { cn } from "@/lib/utils"
import {
	BRAND_COLORS,
	INK,
	MIST,
	RADIUS_SCALE,
	SILVER,
	SPACING_SCALE,
	TINT_STEPS,
	TYPE_SCALE,
	WHITE,
} from "@/lib/designTokens"
import {
	compositeOver,
	contrastRatio,
	formatRatio,
	judge,
} from "@/lib/contrast"

/* --------------------------------------------------------------------------
   Button appearance per brief §7. Defined here so the gate can approve the
   look; Phase 3 lifts these into components/ui/button.tsx.
   -------------------------------------------------------------------------- */
const BTN_BASE =
	"inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-base font-medium transition-all duration-200 ease-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"
const BTN_PRIMARY = "bg-primary text-primary-foreground hover:-translate-y-0.5"
const BTN_SECONDARY =
	"border border-border bg-transparent text-foreground hover:bg-foreground/5 hover:-translate-y-0.5"
const LINK_CTA =
	"inline-flex items-center gap-1.5 text-base font-medium underline-offset-4 transition-colors duration-200 ease-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

/* -------------------------------------------------------------------------- */

type SectionProps = {
	title: string
	id: string
	intro?: string
	children: ReactNode
	tone?: "mist" | "ink"
}

function DsSection({ title, id, intro, children, tone = "mist" }: SectionProps) {
	return (
		<section
			id={id}
			className={cn(
				"scroll-mt-8 py-16 md:py-24",
				tone === "ink" && "dark bg-background text-foreground",
			)}
		>
			<Container>
				<h2 className="text-h2">{title}</h2>
				{intro && (
					<p className="mt-4 max-w-[65ch] text-body text-foreground/80">
						{intro}
					</p>
				)}
				<div className="mt-12">{children}</div>
			</Container>
		</section>
	)
}

function SpecLabel({ children }: { children: ReactNode }) {
	return (
		<p className="text-caption text-foreground/60 tabular-nums">{children}</p>
	)
}

/** Measured, not claimed. */
function Verdict({ ratio, size }: { ratio: number; size: "normal" | "large" }) {
	const v = judge(ratio)
	const passes = size === "normal" ? v.aaNormal : v.aaLarge
	const label = v.aaaNormal
		? "AAA"
		: v.aaNormal
			? "AA"
			: v.aaLarge
				? "AA large only"
				: "Fail"
	// Monochrome palette, so pass/fail is signalled by fill, not hue.
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-(--radius) border border-current px-2 py-0.5 text-caption font-medium",
				passes ? "text-foreground" : "bg-foreground text-background",
			)}
		>
			{label}
		</span>
	)
}

/* ------------------------------ 1. Colours ------------------------------- */

function ColorSection() {
	const onMist = [
		{ label: "INK", base: INK, alpha: 100 },
		{ label: "INK 80%", base: INK, alpha: 80 },
		{ label: "INK 60%", base: INK, alpha: 60 },
		{ label: "SILVER", base: SILVER, alpha: 100 },
	]
	const onInk = [
		{ label: "MIST", base: MIST, alpha: 100 },
		{ label: "MIST 80%", base: MIST, alpha: 80 },
		{ label: "MIST 60%", base: MIST, alpha: 60 },
		{ label: "SILVER", base: SILVER, alpha: 100 },
	]

	const rows = [
		...onMist.map((c) => ({ ...c, bg: MIST, bgLabel: "MIST" })),
		...onInk.map((c) => ({ ...c, bg: INK, bgLabel: "INK" })),
	].map((c) => {
		const flat = compositeOver(c.base, c.alpha, c.bg)
		return { ...c, flat, ratio: contrastRatio(flat, c.bg) }
	})

	return (
		<>
			<div className="grid gap-8 sm:grid-cols-3">
				{BRAND_COLORS.map((c) => (
					<div key={c.name}>
						<div
							className="h-32 rounded-(--radius-card) border border-border/60"
							style={{ backgroundColor: c.hex }}
						/>
						<div className="mt-4 flex items-baseline justify-between gap-2">
							<h3 className="text-h3">{c.name}</h3>
							<SpecLabel>{c.share}</SpecLabel>
						</div>
						<SpecLabel>{c.hex}</SpecLabel>
						<p className="mt-2 text-caption text-foreground/80">{c.use}</p>
					</div>
				))}
			</div>

			{/* Allowed tints */}
			<h3 className="mt-16 text-h3">Allowed tints</h3>
			<p className="mt-2 max-w-[65ch] text-caption text-foreground/80">
				Opacity of the three base colours only. No fourth hue.
			</p>
			<div className="mt-6 space-y-6">
				{[
					{ name: "INK on MIST", base: INK, bg: MIST },
					{ name: "MIST on INK", base: MIST, bg: INK },
				].map((set) => (
					<div key={set.name}>
						<SpecLabel>{set.name}</SpecLabel>
						<div
							className="mt-2 flex overflow-hidden rounded-(--radius) border border-border/60"
							style={{ backgroundColor: set.bg }}
						>
							{TINT_STEPS.map((step) => (
								<div
									key={step}
									className="h-16 flex-1"
									style={{
										backgroundColor: compositeOver(set.base, step, set.bg),
									}}
									title={`${step}%`}
								/>
							))}
						</div>
						<div className="mt-1 flex">
							{TINT_STEPS.map((step) => (
								<span
									key={step}
									className="flex-1 text-center text-caption text-foreground/60 tabular-nums"
								>
									{step}%
								</span>
							))}
						</div>
					</div>
				))}
			</div>

			{/* Measured contrast */}
			<h3 className="mt-16 text-h3">Measured contrast</h3>
			<p className="mt-2 max-w-[65ch] text-caption text-foreground/80">
				Computed from the tokens at build time with WCAG 2.1 relative
				luminance. AA needs 4.5:1 for normal text, 3:1 for text at 24px+.
			</p>
			<div className="mt-6 overflow-x-auto">
				<table className="w-full min-w-[34rem] border-collapse text-left">
					<thead>
						<tr className="border-b border-border">
							<th className="py-3 pr-4 text-caption font-medium">Foreground</th>
							<th className="py-3 pr-4 text-caption font-medium">On</th>
							<th className="py-3 pr-4 text-caption font-medium">Flattened</th>
							<th className="py-3 pr-4 text-caption font-medium">Ratio</th>
							<th className="py-3 text-caption font-medium">Normal text</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((r) => (
							<tr
								key={`${r.label}-${r.bgLabel}`}
								className="border-b border-border/50"
							>
								<td className="py-3 pr-4">
									<span className="flex items-center gap-2">
										<span
											className="size-4 shrink-0 rounded-full border border-border/60"
											style={{ backgroundColor: r.flat }}
										/>
										<span className="text-caption">{r.label}</span>
									</span>
								</td>
								<td className="py-3 pr-4 text-caption">{r.bgLabel}</td>
								<td className="py-3 pr-4 text-caption tabular-nums">
									{r.flat}
								</td>
								<td className="py-3 pr-4 text-caption tabular-nums">
									{formatRatio(r.ratio)}
								</td>
								<td className="py-3">
									<Verdict ratio={r.ratio} size="normal" />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

/* ---------------------------- 2. Typography ------------------------------ */

function TypeSection() {
	return (
		<div className="space-y-12">
			{TYPE_SCALE.map((t) => (
				<div
					key={t.name}
					className="border-t border-border/60 pt-6 first:border-0 first:pt-0"
				>
					<div className="flex flex-wrap items-baseline justify-between gap-2">
						<SpecLabel>{t.name}</SpecLabel>
						<SpecLabel>{t.spec}</SpecLabel>
					</div>
					<p
						className={cn(
							"mt-3",
							t.className,
							t.name === "Body" && "max-w-[65ch] text-foreground/80",
							t.name === "Caption" && "text-foreground/60",
						)}
					>
						{t.sample}
					</p>
				</div>
			))}
		</div>
	)
}

/* ------------------------------ 3. Buttons ------------------------------- */

function ButtonMatrix() {
	return (
		<div className="space-y-6">
			<div className="flex flex-wrap items-center gap-4">
				<button type="button" className={cn(BTN_BASE, BTN_PRIMARY)}>
					Primary
				</button>
				<button type="button" className={cn(BTN_BASE, BTN_SECONDARY)}>
					Secondary
				</button>
				<a href="#buttons" className={LINK_CTA}>
					Learn more
					<ArrowRight className="size-4" aria-hidden="true" />
				</a>
			</div>
			<div className="flex flex-wrap items-center gap-4">
				<button type="button" className={cn(BTN_BASE, BTN_PRIMARY)} disabled>
					Primary disabled
				</button>
				<button type="button" className={cn(BTN_BASE, BTN_SECONDARY)} disabled>
					Secondary disabled
				</button>
			</div>
			<p className="text-caption text-foreground/60">
				48px tall, 28px side padding, pill. Hover lifts 2px over 200ms. Press
				Tab to check the focus ring — states cannot be captured in a
				screenshot.
			</p>
		</div>
	)
}

/* ------------------- 4. Cards, inputs, tags + open question -------------- */

function SurfaceSection() {
	const whiteOnMist = contrastRatio(WHITE, MIST)
	const silverOnMist = contrastRatio(SILVER, MIST)

	return (
		<>
			<div className="grid gap-8 md:grid-cols-2">
				{/* Option A */}
				<div>
					<SpecLabel>Option A — white card on MIST</SpecLabel>
					<div
						className="mt-3 rounded-(--radius-card) border border-border/40 p-8"
						style={{ backgroundColor: WHITE }}
					>
						<h3 className="text-h3">Card heading</h3>
						<p className="mt-3 text-body text-foreground/80">
							Separates from the page by fill alone.
						</p>
					</div>
					<p className="mt-3 text-caption text-foreground/80">
						Edge contrast vs MIST: {formatRatio(whiteOnMist)}. Reads cleanly,
						but <strong>white is a fourth colour</strong> — brief §3 permits
						only INK, MIST, SILVER and their tints, and §7 says cards are MIST
						or INK.
					</p>
				</div>

				{/* Option B */}
				<div>
					<SpecLabel>Option B — MIST card, 1px SILVER border</SpecLabel>
					<div
						className="mt-3 rounded-(--radius-card) border p-8"
						style={{ backgroundColor: MIST, borderColor: SILVER }}
					>
						<h3 className="text-h3">Card heading</h3>
						<p className="mt-3 text-body text-foreground/80">
							Separates from the page by border alone.
						</p>
					</div>
					<p className="mt-3 text-caption text-foreground/80">
						Border contrast vs MIST: {formatRatio(silverOnMist)}. Stays inside
						the palette, but the border is the only separation — below the 3:1
						that WCAG 1.4.11 asks of meaningful non-text boundaries.
					</p>
				</div>
			</div>

			<div className="mt-16 grid gap-8 md:grid-cols-2">
				<div>
					<SpecLabel>Input — 12px radius</SpecLabel>
					<input
						type="text"
						placeholder="you@example.com"
						aria-label="Example input"
						className="mt-3 h-12 w-full rounded-(--radius) border border-input bg-transparent px-4 text-base placeholder:text-foreground/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
					/>
				</div>
				<div>
					<SpecLabel>Tags — 12px radius</SpecLabel>
					<div className="mt-3 flex flex-wrap gap-2">
						{["React", "TypeScript", "Node"].map((tag) => (
							<span
								key={tag}
								className="rounded-(--radius) border border-border px-3 py-1.5 text-caption"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			</div>

			<h3 className="mt-16 text-h3">Radius scale</h3>
			<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{RADIUS_SCALE.map((r) => (
					<div key={r.name}>
						<div
							className={cn(
								"flex h-24 items-center justify-center border border-border bg-foreground/5",
								r.className,
							)}
						>
							<SpecLabel>{r.value}</SpecLabel>
						</div>
						<p className="mt-2 text-caption">{r.name}</p>
					</div>
				))}
			</div>
		</>
	)
}

/* ------------------------------ 5. Spacing ------------------------------- */

function SpacingSection() {
	return (
		<div className="space-y-3">
			{SPACING_SCALE.map((step) => (
				<div key={step} className="flex items-center gap-4">
					<SpecLabel>
						<span className="inline-block w-12">{step}px</span>
					</SpecLabel>
					<div
						className="h-6 rounded-sm bg-foreground/80"
						style={{ width: `${step}px` }}
					/>
				</div>
			))}
		</div>
	)
}

/* ------------------------------- 6. Motion ------------------------------- */

function MotionSection() {
	const revealRef = useReveal<HTMLDivElement>()

	return (
		<div className="grid gap-12 md:grid-cols-3">
			<div>
				<SpecLabel>Fade-up on scroll · 24px · once</SpecLabel>
				<div
					ref={revealRef}
					className="reveal mt-3 rounded-(--radius-card) border border-border bg-foreground/5 p-8"
				>
					<p className="text-body">Revealed on scroll.</p>
				</div>
			</div>

			<div>
				<SpecLabel>Hover lift · -2px · 200ms</SpecLabel>
				<div className="mt-3 rounded-(--radius-card) border border-border bg-foreground/5 p-8 transition-transform duration-200 ease-brand hover:-translate-y-0.5">
					<p className="text-body">Hover me.</p>
				</div>
			</div>

			<div>
				<SpecLabel>Image scale · 1.02 · hover</SpecLabel>
				<div className="mt-3 overflow-hidden rounded-(--radius-panel) border border-border">
					<div className="aspect-[4/3] bg-foreground/80 transition-transform duration-500 ease-brand hover:scale-[1.02]" />
				</div>
			</div>

			<p className="text-caption text-foreground/80 md:col-span-3">
				Easing is <code>cubic-bezier(0.22, 1, 0.36, 1)</code> throughout.
				Durations: 400-700ms for entrances, 200-250ms for hover. Everything here
				collapses to no motion under <code>prefers-reduced-motion: reduce</code>,
				enforced globally in <code>index.css</code> and again in the{" "}
				<code>useReveal</code> hook.
			</p>
		</div>
	)
}

/* -------------------------------- Page ---------------------------------- */

function DesignSystem() {
	return (
		<PageWrapper
			title="Design system"
			description="Internal reference for ECAPS CODE design tokens."
			path="/design-system"
			noindex
		>

			<Container className="pt-24 pb-4">
				<p className="text-caption text-foreground/60">Internal · noindex</p>
				<h1 className="mt-2 text-hero">Design system</h1>
				<p className="mt-6 max-w-[65ch] text-body text-foreground/80">
					Every value here comes from <code>docs/design-brief.md</code> via the
					tokens in <code>src/index.css</code>. Contrast ratios are measured,
					not asserted. Approve this page before any real page is built.
				</p>
			</Container>

			<DsSection
				id="colors"
				title="Colour"
				intro="Three colours and their opacity tints. Nothing else without approval."
			>
				<ColorSection />
			</DsSection>

			<DsSection
				id="type"
				title="Typography"
				intro="Inter variable, one family, loaded with display: swap."
			>
				<TypeSection />
			</DsSection>

			<DsSection
				id="buttons"
				title="Buttons on light"
				intro="Primary, secondary and link CTA on a MIST section."
			>
				<ButtonMatrix />
			</DsSection>

			<DsSection
				id="buttons-dark"
				title="Buttons on dark"
				intro="Identical classes. The tokens invert because the section carries the dark scope, so primary becomes MIST on INK."
				tone="ink"
			>
				<ButtonMatrix />
			</DsSection>

			<DsSection
				id="surfaces"
				title="Cards, inputs, tags"
				intro="Open question: the page background and cards are both MIST, so an unbordered MIST card is invisible. Both candidates are below — one needs approval."
			>
				<SurfaceSection />
			</DsSection>

			<DsSection
				id="spacing"
				title="Spacing"
				intro="8px base grid. These eight values only."
			>
				<SpacingSection />
			</DsSection>

			<DsSection
				id="motion"
				title="Motion"
				intro="Calm and slow. Nothing bounces, spins or flashes."
			>
				<MotionSection />
			</DsSection>
		</PageWrapper>
	)
}

export default DesignSystem
