import PageWrapper from "./layout/PageWrapper"
import Container from "./layout/Container"

type PagePlaceholderProps = {
	title: string
	path: string
	/** Which phase of docs/PLAN.md fills this page in. */
	phase: string
	description?: string
	noindex?: boolean
}

/**
 * Temporary scaffold so the router has real targets before Phase 4.
 * Each page replaces this with its own sections in the phase named below;
 * this file is deleted once the last one lands.
 */
function PagePlaceholder({
	title,
	path,
	phase,
	description,
	noindex,
}: PagePlaceholderProps) {
	return (
		<PageWrapper
			title={title}
			description={description}
			path={path}
			noindex={noindex}
		>
			<Container className="py-24">
				<h1 className="text-h2">{title}</h1>
				<p className="mt-4 text-body text-foreground/80">
					Placeholder route. Built in {phase}.
				</p>
			</Container>
		</PageWrapper>
	)
}

export default PagePlaceholder
