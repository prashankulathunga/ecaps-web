import type { ReactNode } from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"
import WhatsAppButton from "./WhatsAppButton"
import Seo from "@/components/Seo"

type PageWrapperProps = {
	/** Page title, without the site name. */
	title: string
	description?: string
	/** Route path, for canonical and og:url. */
	path?: string
	noindex?: boolean
	/**
	 * The page opens with a full-height hero that the navbar sits over, so
	 * skip the fixed-header offset and let the navbar go transparent.
	 */
	heroOverlay?: boolean
	children: ReactNode
}

/**
 * Page shell — composes Seo, Navbar, Footer and the floating WhatsApp button
 * so each page declares only its own metadata and content.
 */
function PageWrapper({
	title,
	description,
	path,
	noindex,
	heroOverlay = false,
	children,
}: PageWrapperProps) {
	return (
		<>
			<Seo
				title={title}
				description={description}
				path={path}
				noindex={noindex}
			/>
			<a
				href="#main"
				className="sr-only rounded-(--radius) bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60]"
			>
				Skip to content
			</a>
			<div className="flex min-h-dvh flex-col">
				<Navbar overlay={heroOverlay} />
				{/* Navbar is fixed, so non-hero pages need the 64px offset. */}
				<main id="main" className={heroOverlay ? "flex-1" : "flex-1 pt-16"}>
					{children}
				</main>
				<Footer />
			</div>
			<WhatsAppButton />
		</>
	)
}

export default PageWrapper
