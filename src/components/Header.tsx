import Container from "./layout/Container"

/**
 * Placeholder header. The real Navbar (sticky, 64px, blurred translucent,
 * logo + 4-5 links + one CTA, mobile menu) is built in Phase 3.
 */
function Header() {
	return (
		<header className="h-16 border-b border-border/60">
			<Container className="flex h-full items-center justify-between">
				<span className="text-sm font-semibold tracking-tight">
					ECAPS CODE
				</span>
				<span className="text-caption text-foreground/70">
					Navbar — Phase 3
				</span>
			</Container>
		</header>
	)
}

export default Header
