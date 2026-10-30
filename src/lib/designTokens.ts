/**
 * The brief's tokens as typed data, so the design-system page is generated
 * from one list per concept rather than hand-written repetition.
 * Values mirror docs/design-brief.md §3-§8 and src/index.css.
 */

export const INK = "#202124"
export const MIST = "#F1F3F4"
export const SILVER = "#BDC1C6"
/** Only a candidate — see the open card question in docs/PLAN.md, Phase 2. */
export const WHITE = "#FFFFFF"

export type BrandColor = {
	name: string
	hex: string
	share: string
	use: string
}

export const BRAND_COLORS: readonly BrandColor[] = [
	{
		name: "INK",
		hex: INK,
		share: "~74%",
		use: "Text, dark sections, primary buttons",
	},
	{
		name: "MIST",
		hex: MIST,
		share: "~21%",
		use: "Light sections, page background, cards",
	},
	{
		name: "SILVER",
		hex: SILVER,
		share: "~5%",
		use: "Borders, dividers, secondary text, small accents",
	},
]

/** Opacity steps the brief allows as tints of the three base colours. */
export const TINT_STEPS = [100, 80, 60, 40, 20, 10] as const

export type TypeSpec = {
	name: string
	className: string
	spec: string
	/** Neutral specimen text: no invented company claims. */
	sample: string
}

export const TYPE_SCALE: readonly TypeSpec[] = [
	{
		name: "Hero H1",
		className: "text-hero",
		spec: "clamp(44px, 7vw, 88px) · 600 · 1.05 · -0.025em",
		sample: "Hero headline",
	},
	{
		name: "H2",
		className: "text-h2",
		spec: "clamp(32px, 4.5vw, 56px) · 600 · 1.1 · -0.02em",
		sample: "Section heading",
	},
	{
		name: "H3",
		className: "text-h3",
		spec: "clamp(24px, 2.5vw, 28px) · 600 · 1.25",
		sample: "Card heading",
	},
	{
		name: "Body",
		className: "text-body",
		spec: "clamp(17px, 1.2vw, 18px) · 400 · 1.6 · INK at 80%",
		sample:
			"Body copy sits between 17 and 18px with generous line height, and paragraphs are capped at 60 to 70 characters so lines stay comfortable to read.",
	},
	{
		name: "Caption",
		className: "text-caption",
		spec: "14px · 400 · 1.45 · SILVER or INK at 60%",
		sample: "Caption and small print",
	},
]

/** Brief §5: 8px base grid, these values only. */
export const SPACING_SCALE = [8, 16, 24, 32, 48, 64, 96, 128] as const

export type RadiusSpec = {
	name: string
	/** Tailwind class used in components. */
	className: string
	value: string
}

export const RADIUS_SCALE: readonly RadiusSpec[] = [
	{ name: "Buttons", className: "rounded-full", value: "pill · 9999px" },
	{ name: "Tags, inputs", className: "rounded-(--radius)", value: "12px" },
	{ name: "Cards", className: "rounded-(--radius-card)", value: "24px" },
	{
		name: "Panels, hero",
		className: "rounded-(--radius-panel)",
		value: "32px",
	},
]
