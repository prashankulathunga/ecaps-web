import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type CardProps = {
	children: ReactNode
	className?: string
	/** Adds the brief's 2px hover lift. Use for cards that link somewhere. */
	interactive?: boolean
}

/**
 * Card — design-brief.md §7: 24px radius, 32px padding, 1px SILVER border,
 * no heavy shadow.
 *
 * The border is the card's only separation from the page (both are MIST), so
 * it uses SILVER at full opacity rather than the "low opacity" the brief
 * suggests: even at full strength it only measures 1.63:1 against MIST.
 */
function Card({ children, className, interactive = false }: CardProps) {
	return (
		<div
			className={cn(
				"rounded-(--radius-card) border border-border bg-card p-8 text-card-foreground",
				interactive &&
					"transition-transform duration-200 ease-brand hover:-translate-y-0.5",
				className,
			)}
		>
			{children}
		</div>
	)
}

export default Card
