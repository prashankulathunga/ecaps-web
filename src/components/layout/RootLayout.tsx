import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import Container from "./Container"

/**
 * Shell for every route. Navbar, Footer and the WhatsApp button are composed
 * in here by PageWrapper in Phase 3.
 */
function RouteFallback() {
	return (
		<Container className="py-24">
			<p className="text-body text-muted-foreground" role="status">
				Loading…
			</p>
		</Container>
	)
}

function RootLayout() {
	return (
		<div className="min-h-dvh">
			<Suspense fallback={<RouteFallback />}>
				<Outlet />
			</Suspense>
		</div>
	)
}

export default RootLayout
