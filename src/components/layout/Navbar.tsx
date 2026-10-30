import { useState } from "react"
import { Dialog } from "@base-ui/react/dialog"
import { Menu, X } from "lucide-react"
import { NavLink } from "react-router-dom"
import Container from "./Container"
import { Button } from "@/components/ui/button"
import { NAV_CTA, NAV_LINKS } from "@/data/navigation"
import { SITE } from "@/data/site"
import { cn } from "@/lib/utils"

const linkClasses = ({ isActive }: { isActive: boolean }) =>
	cn(
		"text-base transition-colors duration-200 ease-brand rounded-(--radius) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
		isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground",
	)

/**
 * Navbar — design-brief.md §7: sticky, slim 64px, blurred translucent
 * background, logo left, links plus one CTA right, clean menu on mobile.
 *
 * The mobile menu uses Base UI's Dialog in modal mode, which supplies the
 * focus trap, Esc-to-close and scroll lock rather than hand-rolling them.
 */
function Navbar() {
	const [open, setOpen] = useState(false)
	// Tapping a link navigates without unmounting the dialog, so each mobile
	// link closes the panel itself. Done on click rather than in an effect
	// keyed to the route, which would cause a cascading render.
	const closeMenu = () => setOpen(false)

	return (
		<header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
			<Container className="flex h-16 items-center justify-between gap-6">
				<NavLink
					to="/"
					className="rounded-(--radius) text-base font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
				>
					{SITE.name}
				</NavLink>

				{/* Desktop */}
				<nav aria-label="Main" className="hidden items-center gap-8 md:flex">
					{NAV_LINKS.map((link) => (
						<NavLink key={link.to} to={link.to} className={linkClasses}>
							{link.label}
						</NavLink>
					))}
					<Button render={<NavLink to={NAV_CTA.to} />}>{NAV_CTA.label}</Button>
				</nav>

				{/* Mobile */}
				<Dialog.Root open={open} onOpenChange={setOpen} modal>
					<Dialog.Trigger
						render={
							<Button
								variant="secondary-outline"
								size="pill-icon"
								aria-label="Open menu"
								className="md:hidden"
							>
								<Menu className="size-5" aria-hidden="true" />
							</Button>
						}
					/>
					<Dialog.Portal>
						<Dialog.Backdrop className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm md:hidden" />
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
										>
											<X className="size-5" aria-hidden="true" />
										</Button>
									}
								/>
							</div>

							<nav aria-label="Mobile" className="mt-10 flex flex-col gap-6">
								{NAV_LINKS.map((link) => (
									<NavLink
										key={link.to}
										to={link.to}
										onClick={closeMenu}
										className={({ isActive }) =>
											cn(linkClasses({ isActive }), "text-h3")
										}
									>
										{link.label}
									</NavLink>
								))}
								<Button
									render={<NavLink to={NAV_CTA.to} onClick={closeMenu} />}
									className="mt-4 w-full"
								>
									{NAV_CTA.label}
								</Button>
							</nav>
						</Dialog.Popup>
					</Dialog.Portal>
				</Dialog.Root>
			</Container>
		</header>
	)
}

export default Navbar
