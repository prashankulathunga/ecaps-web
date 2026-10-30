/**
 * Technology strip on the home hero.
 *
 * TODO (Inputs needed #5): confirm this list. These six are what *this
 * repository* verifiably uses, which is a defensible starting point but is
 * not the same as the stack ECAPS CODE offers clients. Replace or reorder
 * before launch — workflow rule 7 forbids presenting unverified facts.
 *
 * Text wordmarks only: no client logos, no partner badges (brief §13).
 */
export type Technology = {
	name: string
	/** Hidden on mobile, where the strip shows only the first three cells. */
	secondary?: boolean
}

export const TECHNOLOGIES: readonly Technology[] = [
	{ name: "React" },
	{ name: "TypeScript" },
	{ name: "Node.js" },
	{ name: "Tailwind", secondary: true },
	{ name: "Vite", secondary: true },
	{ name: "PostgreSQL", secondary: true },
]

export const TECHNOLOGIES_CAPTION = "BUILT WITH MODERN TECHNOLOGY"
