import { Mail, MapPin, Phone } from "lucide-react"
import { Link } from "react-router-dom"
import Container from "./Container"
import { FOOTER_COLUMNS } from "@/data/navigation"
import { SITE } from "@/data/site"

const linkClasses =
	"rounded-(--radius) text-base text-foreground/70 transition-colors duration-200 ease-brand hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"

/**
 * Footer — design-brief.md §7: grouped link columns, contact details, social
 * links, copyright.
 *
 * Contact rows and social links render only when configured, so no invented
 * email, phone or address ships (Inputs needed #4).
 */
function Footer() {
	const { email, phone, address } = SITE.contact
	const hasContact = Boolean(email || phone || address)

	return (
		<footer className="dark border-t border-border bg-background py-16 text-foreground md:py-24">
			<Container>
				<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
					<div>
						<p className="text-h3">{SITE.name}</p>
						<p className="mt-3 max-w-[32ch] text-caption text-foreground/70">
							{SITE.titleSuffix}
						</p>
					</div>

					{FOOTER_COLUMNS.map((column) => (
						<nav key={column.title} aria-label={column.title}>
							<h2 className="text-caption font-medium tracking-wide uppercase">
								{column.title}
							</h2>
							<ul className="mt-4 space-y-3">
								{column.links.map((link) => (
									<li key={link.to}>
										<Link to={link.to} className={linkClasses}>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					))}

					<div>
						<h2 className="text-caption font-medium tracking-wide uppercase">
							Contact
						</h2>
						{hasContact ? (
							<ul className="mt-4 space-y-3">
								{email && (
									<li>
										<a
											href={`mailto:${email}`}
											className={`inline-flex items-center gap-2 ${linkClasses}`}
										>
											<Mail className="size-4" aria-hidden="true" />
											{email}
										</a>
									</li>
								)}
								{phone && (
									<li>
										<a
											href={`tel:${phone.replace(/\s/g, "")}`}
											className={`inline-flex items-center gap-2 ${linkClasses}`}
										>
											<Phone className="size-4" aria-hidden="true" />
											{phone}
										</a>
									</li>
								)}
								{address && (
									<li className="flex items-start gap-2 text-base text-foreground/70">
										<MapPin className="mt-1 size-4 shrink-0" aria-hidden="true" />
										<span>{address}</span>
									</li>
								)}
							</ul>
						) : (
							import.meta.env.DEV && (
								<p className="mt-4 text-caption text-foreground/70">
									Contact details pending (Inputs needed #4)
								</p>
							)
						)}

						{SITE.social.length > 0 && (
							<ul className="mt-6 flex flex-wrap gap-4">
								{SITE.social.map((item) => (
									<li key={item.href}>
										<a
											href={item.href}
											target="_blank"
											rel="noopener noreferrer"
											className={linkClasses}
										>
											{item.label}
										</a>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>

				<div className="mt-16 border-t border-border pt-8">
					<p className="text-caption text-foreground/70">
						&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
					</p>
				</div>
			</Container>
		</footer>
	)
}

export default Footer
