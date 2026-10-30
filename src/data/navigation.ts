/**
 * Navigation structure. Labels are generic site sections, not company claims,
 * so nothing here is invented. Service names stay out until Inputs needed #1
 * lands (workflow rule 7).
 */

export type NavLink = {
	label: string
	to: string
}

/** Brief §7: 4-5 links plus one CTA. We have four routes besides Contact. */
export const NAV_LINKS: readonly NavLink[] = [
	{ label: "Services", to: "/services" },
	{ label: "Projects", to: "/projects" },
	{ label: "About", to: "/about" },
]

export const NAV_CTA: NavLink = { label: "Contact us", to: "/contact" }

export type FooterColumn = {
	title: string
	links: readonly NavLink[]
}

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
	{
		title: "Company",
		links: [
			{ label: "About", to: "/about" },
			{ label: "Projects", to: "/projects" },
			{ label: "Privacy policy", to: "/privacy" },
		],
	},
	{
		title: "Services",
		// TODO (Inputs needed #1): list individual services once confirmed.
		links: [{ label: "All services", to: "/services" }],
	},
]
