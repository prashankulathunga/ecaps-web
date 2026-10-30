import { SITE } from "@/data/site"

type SeoProps = {
	/** Page title, without the site name. */
	title: string
	description?: string
	/** Route path, e.g. "/services". Used for canonical and og:url. */
	path?: string
	/** Keeps a route out of search results (e.g. /design-system). */
	noindex?: boolean
}

/**
 * Per-page document metadata using React 19's native support: <title>, <meta>
 * and <link> rendered here are hoisted into <head> automatically, so no
 * react-helmet-async is needed (decision 1 in docs/PLAN.md).
 *
 * Canonical and og:url are emitted only once SITE.url is known, so no guessed
 * domain can ship.
 */
function Seo({ title, description, path, noindex }: SeoProps) {
	const fullTitle = `${title} | ${SITE.name}`
	const metaDescription = description ?? SITE.defaultDescription
	const canonical =
		SITE.url && path ? `${SITE.url}${path === "/" ? "" : path}` : undefined

	return (
		<>
			<title>{fullTitle}</title>
			<meta name="description" content={metaDescription} />
			{noindex && <meta name="robots" content="noindex, nofollow" />}
			{canonical && <link rel="canonical" href={canonical} />}

			<meta property="og:type" content="website" />
			<meta property="og:site_name" content={SITE.name} />
			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={metaDescription} />
			{canonical && <meta property="og:url" content={canonical} />}

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={fullTitle} />
			<meta name="twitter:description" content={metaDescription} />
		</>
	)
}

export default Seo
