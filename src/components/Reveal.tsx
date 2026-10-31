import type { ReactNode } from "react"
import { useReveal } from "@/hooks/useReveal"
import { cn } from "@/lib/utils"

type RevealProps = {
	children: ReactNode
	className?: string
	/** Stagger within a group, in ms. */
	delay?: number
}

/**
 * Fade-up on scroll for a single element — brief §8, 24px, once.
 *
 * Wraps the useReveal hook so it can be used inside a list, where calling a
 * hook per item directly is not allowed. Motion itself lives in the `reveal`
 * utility in index.css, and the global prefers-reduced-motion block
 * neutralises both the transition and this delay.
 */
function Reveal({ children, className, delay = 0 }: RevealProps) {
	const ref = useReveal<HTMLDivElement>()

	return (
		<div
			ref={ref}
			className={cn("reveal", className)}
			style={delay ? { transitionDelay: `${delay}ms` } : undefined}
		>
			{children}
		</div>
	)
}

export default Reveal
