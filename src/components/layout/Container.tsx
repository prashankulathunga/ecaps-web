import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type ContainerProps = {
	children: ReactNode
	className?: string
}

/**
 * Site container — design-brief.md §5.
 * Max width 1200px, side padding 24px on mobile and 48px from tablet up.
 */
function Container({ children, className }: ContainerProps) {
	return (
		<div className={cn("mx-auto w-full max-w-site px-6 md:px-12", className)}>
			{children}
		</div>
	)
}

export default Container
