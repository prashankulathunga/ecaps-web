import { useEffect, useRef } from "react"

/**
 * Fade-up on scroll — design-brief.md §8: 24px distance, once per element.
 * Pair with the `reveal` utility in index.css; this hook only flips
 * data-revealed, so the motion itself stays in CSS.
 *
 * Respects prefers-reduced-motion by revealing immediately.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
	const ref = useRef<T>(null)

	useEffect(() => {
		const el = ref.current
		if (!el) return

		const prefersReduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches

		if (prefersReduced || typeof IntersectionObserver === "undefined") {
			el.dataset.revealed = "true"
			return
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue
					el.dataset.revealed = "true"
					// Once per element, per the brief.
					observer.unobserve(el)
				}
			},
			{ threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
		)

		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	return ref
}
