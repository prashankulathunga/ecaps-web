/**
 * Navigation structure. Labels are generic site sections, not company claims,
 * so nothing here is invented.
 *
 * The site is a single landing page, so these point at in-page anchors rather
 * than routes. Each `to` must match the `id` of the matching section on Home;
 * RootLayout handles the scroll, and Section carries scroll-mt for the fixed
 * 64px navbar.
 */

export type NavLink = {
	label: string
	to: string
}

/** Brief §7: 4-5 links plus one CTA. */
export const NAV_LINKS: readonly NavLink[] = [
	{ label: "What we do", to: "/#what-we-do" },
	{ label: "How we work", to: "/#how-we-work" },
	{ label: "Technologies", to: "/#technologies" },
]

export const NAV_CTA: NavLink = { label: "Contact us", to: "/#contact" }

export type FooterColumn = {
	title: string
	links: readonly NavLink[]
}

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
	{
		title: "Explore",
		links: [...NAV_LINKS, NAV_CTA],
	},
	{
		title: "Company",
		links: [{ label: "Privacy policy", to: "/privacy" }],
	},
]
