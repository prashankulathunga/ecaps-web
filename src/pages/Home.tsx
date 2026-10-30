import PageWrapper from "@/components/layout/PageWrapper"
import Hero from "@/components/sections/Hero"

function Home() {
	return (
		<PageWrapper title="Home" path="/" heroOverlay>
			<Hero />
			{/*
			  Remaining blocks of brief §11 (what we do, numbers, featured
			  projects, how we work, technologies, closing CTA) follow in later
			  4a steps, once the content inputs land.
			*/}
		</PageWrapper>
	)
}

export default Home
