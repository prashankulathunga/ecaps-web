import type { ReactNode } from "react"
import Container from "./Container"
import { cn } from "@/lib/utils"

type SectionProps = {
	children: ReactNode
	/** Drives the alternating light/dark rhythm of brief §3. */
	tone?: "mist" | "ink"
	/** Skip the container for full-bleed content such as the hero. */
	bleed?: boolean
	className?: string
	id?: string
	ariaLabel?: string
}

/**
 * Section wrapper — design-brief.md §5: 96px vertical rhythm on mobile,
 * 128px from tablet up.
 *
 * tone="ink" applies the dark token scope, so children keep using
 * bg-background / text-foreground and invert automatically.
 */
function Section({
	children,
	tone = "mist",
	bleed = false,
	className,
	id,
	ariaLabel,
}: SectionProps) {
	return (
		<section
			id={id}
			aria-label={ariaLabel}
			className={cn(
				"scroll-mt-16 py-24 md:py-32",
				tone === "ink" && "dark bg-background text-foreground",
				className,
			)}
		>
			{bleed ? children : <Container>{children}</Container>}
		</section>
	)
}

export default Section
