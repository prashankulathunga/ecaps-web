/**
 * Site-wide content and metadata.
 * Everything marked TODO is listed under "Inputs needed" in docs/PLAN.md and
 * must come from the owner — workflow rule 7 forbids inventing company facts.
 */
export const SITE = {
	name: "ECAPS CODE",
	/**
	 * TODO (Inputs needed #7): live domain. Needed for canonical URLs, the
	 * sitemap and absolute OG image URLs. Left empty on purpose: Seo omits
	 * canonical and og:url entirely rather than ship a guessed domain.
	 */
	url: "",
	/** Reuses the wording already in index.html rather than inventing a tagline. */
	titleSuffix: "software partner",
	/** TODO (Inputs needed #1, #8): replace once services and tagline are confirmed. */
	defaultDescription:
		"ECAPS CODE is a software partner building web and mobile products.",
} as const
