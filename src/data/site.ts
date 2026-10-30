/**
 * Site-wide content and metadata.
 * Everything marked TODO is listed under "Inputs needed" in docs/PLAN.md and
 * must come from the owner — workflow rule 7 forbids inventing company facts.
 */

export type SiteContact = {
	email: string
	phone: string
	/** Digits only, international format, no "+" or spaces, e.g. 94771234567. */
	whatsapp: string
	address: string
}

export type SiteSocial = {
	label: string
	href: string
}

export type Site = {
	name: string
	/** Empty until the live domain is known; Seo then omits canonical/og:url. */
	url: string
	titleSuffix: string
	defaultDescription: string
	contact: SiteContact
	social: readonly SiteSocial[]
}

/**
 * Fields are typed as `string` rather than inferred literals on purpose: the
 * placeholders are empty, and literal `""` types would narrow to `never`
 * inside the truthiness checks the components use to hide unset rows.
 */
export const SITE: Site = {
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

	/**
	 * TODO (Inputs needed #4): real contact details. All empty on purpose —
	 * components render each item only when it is set, so no invented phone
	 * number or address can ship.
	 */
	contact: {
		email: "",
		phone: "",
		whatsapp: "",
		address: "",
	},

	/**
	 * TODO (Inputs needed #4): social profiles. Rendered as text labels, not
	 * icons — Lucide v1 dropped brand icons and brief §13 allows only one
	 * icon set.
	 */
	social: [],
}
