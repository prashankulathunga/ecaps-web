import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import Container from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { HERO } from "@/data/home"

/** Stagger per brief §8: 80ms between elements, 600ms each. */
const RISE_DELAY = {
	eyebrow: "0ms",
	heading: "80ms",
	paragraph: "160ms",
	actions: "240ms",
} as const

/**
 * Home hero — full-bleed photograph with the page colour rising over it.
 *
 * No panel, no inset, no radius: the image runs edge to edge and dissolves
 * into the MIST page background at the bottom, so the hero and the section
 * below it read as one surface.
 *
 * Because the bottom of the hero resolves to MIST, all hero text is INK.
 * grayscale keeps the photo inside the three-colour palette (brief §3) and
 * matches the black-and-white treatment of brief §10.
 */
function Hero() {
	return (
		<section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
			<img
				src="/hero.webp"
				srcSet="/hero-900.webp 900w, /hero.webp 2400w"
				sizes="100vw"
				width={2400}
				height={1358}
				alt=""
				aria-hidden="true"
				fetchPriority="high"
				decoding="async"
				className="hero-settle absolute inset-0 -z-10 size-full object-cover object-[68%_center] grayscale md:object-[58%_center]"
			/>

			{/* The page colour rising from the bottom. Solid MIST at the base, so
			    the hero meets the next section with no visible seam.
			    Stops are set from a measurement, not by eye: the photo's mean
			    luma under the text block is 93/255, which needs at least 29%
			    MIST coverage for INK body text to clear AA. These stops put
			    ~59% under the topmost line, measuring about 7.9:1. */}
			<div
				aria-hidden="true"
				className="absolute inset-0 -z-10 bg-linear-to-t from-mist from-0% via-mist/90 via-38% to-transparent to-85%"
			/>

			{/* A light wash at the very top so the overlaying navbar stays legible
			    wherever the photo happens to be bright. */}
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-mist/85 to-transparent"
			/>

			<Container className="pt-32 pb-24 md:pb-32">
				<div className="max-w-[640px]">
					<p
						className="hero-rise text-caption font-medium tracking-[0.18em] text-foreground/70 uppercase"
						style={{ animationDelay: RISE_DELAY.eyebrow }}
					>
						{HERO.eyebrow}
					</p>

					<h1
						className="hero-rise mt-6 text-hero"
						style={{ animationDelay: RISE_DELAY.heading }}
					>
						{HERO.headline.map((line) => (
							<span key={line} className="block">
								{line}
							</span>
						))}
					</h1>

					<p
						className="hero-rise mt-6 max-w-[52ch] text-body text-foreground/80"
						style={{ animationDelay: RISE_DELAY.paragraph }}
					>
						{HERO.paragraph}
					</p>

					<div
						className="hero-rise mt-10 flex flex-wrap items-center gap-4"
						style={{ animationDelay: RISE_DELAY.actions }}
					>
						<Button render={<Link to={HERO.primaryCta.to} />} className="pr-2">
							{HERO.primaryCta.label}
							<span
								aria-hidden="true"
								className="ml-1 inline-flex size-8 items-center justify-center rounded-full bg-primary-foreground text-primary"
							>
								<ArrowRight className="size-4" />
							</span>
						</Button>
						<Button
							variant="secondary-outline"
							render={<Link to={HERO.secondaryCta.to} />}
						>
							{HERO.secondaryCta.label}
						</Button>
					</div>
				</div>
			</Container>
		</section>
	)
}

export default Hero
