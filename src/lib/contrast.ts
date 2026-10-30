/**
 * WCAG 2.1 contrast math, so the design-system page can show measured ratios
 * instead of claimed ones. No dependencies.
 */

export type Rgb = { r: number; g: number; b: number }

export function hexToRgb(hex: string): Rgb {
	const value = hex.replace("#", "")
	const full =
		value.length === 3
			? value
					.split("")
					.map((c) => c + c)
					.join("")
			: value
	return {
		r: Number.parseInt(full.slice(0, 2), 16),
		g: Number.parseInt(full.slice(2, 4), 16),
		b: Number.parseInt(full.slice(4, 6), 16),
	}
}

export function rgbToHex({ r, g, b }: Rgb): string {
	const part = (n: number) =>
		Math.round(n).toString(16).padStart(2, "0").toUpperCase()
	return `#${part(r)}${part(g)}${part(b)}`
}

/** WCAG relative luminance. */
export function relativeLuminance(rgb: Rgb): number {
	const channel = (raw: number) => {
		const c = raw / 255
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
	}
	return (
		0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b)
	)
}

/** Contrast ratio between two opaque colours, 1 to 21. */
export function contrastRatio(a: string, b: string): number {
	const la = relativeLuminance(hexToRgb(a))
	const lb = relativeLuminance(hexToRgb(b))
	const lighter = Math.max(la, lb)
	const darker = Math.min(la, lb)
	return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Flattens a translucent foreground onto an opaque background.
 * The brief expresses secondary text as "INK at 60%", which is only
 * measurable once composited against what sits behind it.
 */
export function compositeOver(
	foreground: string,
	alphaPercent: number,
	background: string,
): string {
	const fg = hexToRgb(foreground)
	const bg = hexToRgb(background)
	const a = alphaPercent / 100
	return rgbToHex({
		r: fg.r * a + bg.r * (1 - a),
		g: fg.g * a + bg.g * (1 - a),
		b: fg.b * a + bg.b * (1 - a),
	})
}

export type ContrastVerdict = {
	ratio: number
	/** 4.5:1 — normal body text. */
	aaNormal: boolean
	/** 3:1 — text 24px+, or 18.66px+ bold. */
	aaLarge: boolean
	/** 7:1 */
	aaaNormal: boolean
	/** 3:1 — borders, icons, focus rings. */
	nonText: boolean
}

export function judge(ratio: number): ContrastVerdict {
	return {
		ratio,
		aaNormal: ratio >= 4.5,
		aaLarge: ratio >= 3,
		aaaNormal: ratio >= 7,
		nonText: ratio >= 3,
	}
}

export const formatRatio = (ratio: number) => `${ratio.toFixed(2)}:1`
