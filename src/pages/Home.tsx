import PageWrapper from "@/components/layout/PageWrapper"
import Section from "@/components/layout/Section"
import Card from "@/components/Card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

function Home() {
	return (
		<PageWrapper title="Home" path="/">
			<Section>
				<h1 className="text-hero">ECAPS CODE</h1>
				<p className="mt-6 max-w-[60ch] text-body text-foreground/80">
					Placeholder hero. The nine blocks of design-brief.md §11 are built in
					Phase 4a, once the content inputs land.
				</p>
				<div className="mt-10 flex flex-wrap gap-4">
					<Button render={<Link to="/contact" />}>Start a project</Button>
					<Button variant="secondary-outline" render={<Link to="/services" />}>
						See services
					</Button>
				</div>
			</Section>

			<Section tone="ink">
				<h2 className="text-h2">Alternating INK section</h2>
				<p className="mt-4 max-w-[60ch] text-body text-foreground/80">
					Same classes as the light section. The tokens invert because this
					section carries the dark scope.
				</p>
				<div className="mt-10 grid gap-6 md:grid-cols-3">
					{["Card one", "Card two", "Card three"].map((title) => (
						<Card key={title} interactive>
							<h3 className="text-h3">{title}</h3>
							<p className="mt-3 text-body text-foreground/80">
								24px radius, 32px padding, 1px SILVER border.
							</p>
							<Button
								variant="link-cta"
								size="bare"
								className="mt-6"
								render={<Link to="/services" />}
							>
								Learn more
								<ArrowRight className="size-4" aria-hidden="true" />
							</Button>
						</Card>
					))}
				</div>
			</Section>
		</PageWrapper>
	)
}

export default Home
