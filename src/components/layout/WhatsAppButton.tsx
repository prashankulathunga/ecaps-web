import { MessageCircle } from "lucide-react"
import { SITE } from "@/data/site"

/**
 * Floating WhatsApp button — design-brief.md §7: bottom-right, round, INK.
 *
 * Renders nothing in production until a number is configured, so no broken
 * wa.me link can ship. In dev it shows an inert placeholder so the layout is
 * still reviewable (Inputs needed #4).
 */
function WhatsAppButton() {
	const number = SITE.contact.whatsapp
	const base =
		"fixed right-6 bottom-6 z-40 inline-flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-200 ease-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

	if (!number) {
		if (!import.meta.env.DEV) return null
		return (
			<div
				className={`${base} opacity-40`}
				title="WhatsApp number not configured (dev only)"
				aria-hidden="true"
			>
				<MessageCircle className="size-6" />
			</div>
		)
	}

	return (
		<a
			href={`https://wa.me/${number}`}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Chat with ECAPS CODE on WhatsApp"
			className={`${base} hover:-translate-y-0.5`}
		>
			<MessageCircle className="size-6" aria-hidden="true" />
		</a>
	)
}

export default WhatsAppButton
