/**
 * Home page content.
 *
 * Copy option B, chosen 2026-10-31. Deliberately free of numbers, client
 * names and "trusted by" claims (workflow rule 7, brief §13).
 */

export const HERO = {
	eyebrow: "WEB & PRODUCT ENGINEERING",
	/** Two lines, per the hero layout spec. */
	headline: ["From idea", "to production."],
	/**
	 * TODO (Inputs needed #1): confirm the service scope this asserts —
	 * specifically "keep them fast and maintained after launch", which claims
	 * an ongoing maintenance offering that is not yet verified.
	 */
	paragraph:
		"We plan, design and ship web applications, then keep them fast and maintained after launch.",
	primaryCta: { label: "Start a project", to: "/contact" },
	secondaryCta: { label: "See our work", to: "/projects" },
} as const
