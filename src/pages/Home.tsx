import Header from "@/components/Header"
import Seo from "@/components/Seo"
import Container from "@/components/layout/Container"

function Home() {
	return (
		<>
			<Seo title="Home" path="/" />
			<Header />
			<Container className="py-24">
				<h1 className="text-hero">ECAPS CODE</h1>
				<p className="mt-6 max-w-[60ch] text-body text-foreground/80">
					Placeholder hero. The nine blocks of design-brief.md §11 are built
					in Phase 4a, once the content inputs land.
				</p>
			</Container>
		</>
	)
}

export default Home
