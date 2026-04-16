import type { HTMLAttributes } from "react";

export type BadgeVariant =
	| "default"
	| "primary"
	| "outline"
	| "fruit"
	| "bloem"
	| "blad"
	| "wortel";

const BADGE_VARIANTS: Record<
	BadgeVariant,
	{ bg: string; color: string; border: string }
> = {
	default: {
		bg: "var(--color-surface)",
		color: "var(--color-gray)",
		border: "var(--color-border)",
	},
	primary: {
		bg: "var(--color-primary)",
		color: "#fff",
		border: "var(--color-primary)",
	},
	outline: {
		bg: "transparent",
		color: "var(--color-on-surface)",
		border: "var(--color-border)",
	},
	fruit: { bg: "#f0fdf4", color: "#166534", border: "#86efac" },
	bloem: { bg: "#faf5ff", color: "#6b21a8", border: "#d8b4fe" },
	blad: { bg: "#f0fdfa", color: "#115e59", border: "#5eead4" },
	wortel: { bg: "#fffbeb", color: "#92400e", border: "#fcd34d" },
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	variant?: BadgeVariant;
}

export function Badge({
	variant = "default",
	style,
	children,
	...props
}: BadgeProps) {
	const v = BADGE_VARIANTS[variant];
	return (
		<span
			style={{
				display: "inline-flex",
				alignItems: "center",
				gap: "0.25rem",
				padding: "0.2rem 0.5rem",
				fontFamily: "var(--font-body)",
				fontWeight: 700,
				fontSize: "0.68rem",
				letterSpacing: "0.1em",
				textTransform: "uppercase",
				background: v.bg,
				color: v.color,
				border: `2px solid ${v.border}`,
				borderRadius: 0,
				whiteSpace: "nowrap",
				...style,
			}}
			{...props}
		>
			{children}
		</span>
	);
}
