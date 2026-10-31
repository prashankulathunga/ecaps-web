import { useEffect, useState } from "react"
import { Dialog } from "@base-ui/react/dialog"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"
import Container from "./Container"
import { Button } from "@/components/ui/button"
import { NAV_CTA, NAV_LINKS } from "@/data/navigation"
import { SITE } from "@/data/site"
import { cn } from "@/lib/utils"
import logo from "@/assets/lockup/ecapscode-lockup-horizontal-light-bg.svg"

type NavbarProps = {
	/**
	 * Sit over a hero without a background until the page is scrolled, then
	 * settle into the brief's blurred 64px bar.
	 */
	overlay?: boolean
}

/**
 * Plain string rather than NavLink's isActive callback: every link now points
 * at an in-page anchor on "/", and isActive matches on pathname only, so all
 * of them would render as active at once. Scroll-spy highlighting, if wanted,
 * is its own task.
 */
const linkClasses =
	"rounded-(--radius) text-base text-foreground/70 transition-colors duration-200 ease-brand hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"

/**
 * Navbar — brief §7: slim 64px, blurred translucent, logo left, links plus
 * one CTA right.
 *
 * Over the home hero only the background is dropped; the hero resolves to
 * MIST, so the type stays INK in both states and nothing has to invert.
 *
 * Fixed rather than sticky so it can overlay the hero without taking layout
 * space; PageWrapper adds the offset on pages that need it.
 */
function Navbar({ overlay = false }: NavbarProps) {
	const [open, setOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)

	// Subscribe only — a synchronous setState in the effect body would cause a
	// cascading render. At load scrollY is 0, so `false` is already correct.
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24)
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	const transparent = overlay && !scrolled
	const closeMenu = () => setOpen(false)

	return (
		<header
			className={cn(
				"fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-brand",
				transparent
					? "border-b border-transparent bg-transparent"
					: "border-b border-border/60 bg-background/80 backdrop-blur-md",
			)}
		>
			<Container className="flex h-16 items-center gap-6">
				<div className="flex flex-1 items-center">
					<Link
						to="/"
						className="rounded-(--radius) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
					>
						<img
							src={logo}
							alt={SITE.name}
							width={162}
							height={24}
							className="h-6 w-auto"
						/>
					</Link>
				</div>

				<nav aria-label="Main" className="hidden items-center gap-8 md:flex">
					{NAV_LINKS.map((link) => (
						<Link key={link.to} to={link.to} className={linkClasses}>
							{link.label}
						</Link>
					))}
				</nav>

				<div className="flex flex-1 items-center justify-end gap-3">
					<Button
						render={<Link to={NAV_CTA.to} />}
						className="hidden md:inline-flex"
					>
						{NAV_CTA.label}
					</Button>

					{/* Mobile trigger — 12px radius, per the hero spec. */}
					<Dialog.Root open={open} onOpenChange={setOpen} modal>
						<Dialog.Trigger
							render={
								<Button
									variant="secondary-outline"
									size="pill-icon"
									aria-label="Open menu"
									className="rounded-(--radius) md:hidden"
								>
									<Menu className="size-5" aria-hidden="true" />
								</Button>
							}
						/>
						<Dialog.Portal>
							<Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm md:hidden" />
							<Dialog.Popup className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background px-6 pt-6 pb-10 md:hidden">
								<div className="flex items-center justify-between">
									<Dialog.Title className="text-base font-semibold tracking-tight">
										{SITE.name}
									</Dialog.Title>
									<Dialog.Close
										render={
											<Button
												variant="secondary-outline"
												size="pill-icon"
												aria-label="Close menu"
												className="rounded-(--radius)"
											>
												<X className="size-5" aria-hidden="true" />
											</Button>
										}
									/>
								</div>

								<nav aria-label="Mobile" className="mt-10 flex flex-col gap-6">
									{NAV_LINKS.map((link) => (
										<Link
											key={link.to}
											to={link.to}
											onClick={closeMenu}
											className={cn(linkClasses, "text-h3")}
										>
											{link.label}
										</Link>
									))}
									<Button
										render={<Link to={NAV_CTA.to} onClick={closeMenu} />}
										className="mt-4 w-full"
									>
										{NAV_CTA.label}
									</Button>
								</nav>
							</Dialog.Popup>
						</Dialog.Portal>
					</Dialog.Root>
				</div>
			</Container>
		</header>
	)
}

export default Navbar
