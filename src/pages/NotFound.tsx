import { Link } from "react-router-dom"
import PageWrapper from "@/components/layout/PageWrapper"
import Section from "@/components/layout/Section"
import { Button } from "@/components/ui/button"

function NotFound() {
	return (
		<PageWrapper
			title="Page not found"
			description="This page does not exist."
			noindex
		>
			<Section>
				<p className="text-caption text-foreground/70">404</p>
				<h1 className="mt-2 text-h2">Page not found</h1>
				<p className="mt-4 max-w-[60ch] text-body text-foreground/80">
					The page you asked for does not exist or has moved.
				</p>
				<Button className="mt-10" render={<Link to="/" />}>
					Back to home
				</Button>
			</Section>
		</PageWrapper>
	)
}

export default NotFound
