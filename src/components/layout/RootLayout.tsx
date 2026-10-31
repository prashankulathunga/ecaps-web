import { Suspense, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Container from "./Container"

/**
 * Shell for every route. Navbar, Footer and the WhatsApp button are composed
 * in here by PageWrapper in Phase 3.
 */
function RouteFallback() {
	return (
		<Container className="py-24">
			<p className="text-body text-foreground/80" role="status">
				Loading…
			</p>
		</Container>
	)
}

function RootLayout() {
	const { pathname, hash } = useLocation()

	// Anchor links such as /services#ai must land on the section; everything
	// else starts at the top. scrollIntoView without an explicit behavior
	// honours the CSS scroll-behavior, which prefers-reduced-motion already
	// switches to auto.
	useEffect(() => {
		if (hash) {
			const target = document.getElementById(hash.slice(1))
			if (target) {
				target.scrollIntoView()
				return
			}
		}
		window.scrollTo({ top: 0, behavior: "instant" })
	}, [pathname, hash])

	return (
		<>
			<Suspense fallback={<RouteFallback />}>
				<Outlet />
			</Suspense>
		</>
	)
}

export default RootLayout
