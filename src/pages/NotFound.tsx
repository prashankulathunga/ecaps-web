import { Link } from "react-router-dom"
import Seo from "@/components/Seo"
import Container from "@/components/layout/Container"

function NotFound() {
	return (
		<>
			<Seo
				title="Page not found"
				description="This page does not exist."
				noindex
			/>
			<Container className="py-24">
				<p className="text-caption text-muted-foreground">404</p>
				<h1 className="mt-2 text-h2">Page not found</h1>
				<p className="mt-4 max-w-[60ch] text-body text-muted-foreground">
					The page you asked for does not exist or has moved.
				</p>
				<Link
					to="/"
					className="mt-8 inline-block text-body underline-offset-4 hover:underline"
				>
					Back to home
				</Link>
			</Container>
		</>
	)
}

export default NotFound
