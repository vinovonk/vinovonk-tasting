import { clsx } from "clsx";
import {
	type ButtonHTMLAttributes,
	type CSSProperties,
	forwardRef,
	useState,
} from "react";

export type ButtonVariant = "primary" | "outline" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
}

const BASE: CSSProperties = {
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.5rem",
	fontFamily: "var(--font-body)",
	fontWeight: 700,
	letterSpacing: "0.1em",
	textTransform: "uppercase",
	cursor: "pointer",
	border: "4px solid var(--color-border)",
	borderRadius: 0,
	boxShadow: "var(--shadow-card)",
	transition:
		"transform 150ms ease, box-shadow 150ms ease, background 150ms ease",
	whiteSpace: "nowrap",
};

const VARIANT_STYLES: Record<ButtonVariant, CSSProperties> = {
	primary: { background: "var(--color-primary)", color: "#fff" },
	outline: { background: "transparent", color: "var(--color-on-surface)" },
	ghost: {
		background: "transparent",
		color: "var(--color-gray)",
		border: "2px solid transparent",
		boxShadow: "none",
	},
	destructive: { background: "#b91c1c", color: "#fff" },
};

const SIZE_STYLES: Record<ButtonSize, CSSProperties> = {
	sm: { fontSize: "0.68rem", padding: "0.4rem 0.875rem" },
	md: { fontSize: "0.78rem", padding: "0.65rem 1.25rem" },
	lg: { fontSize: "0.88rem", padding: "0.875rem 1.75rem" },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = "primary",
			size = "md",
			style,
			className,
			onMouseEnter,
			onMouseLeave,
			onMouseDown,
			onMouseUp,
			...props
		},
		ref,
	) => {
		const [hovered, setHovered] = useState(false);
		const [pressed, setPressed] = useState(false);

		const shadowStyle: CSSProperties = pressed
			? { transform: "translate(2px, 2px)", boxShadow: "0px 0px 0px 0px #000" }
			: hovered
				? {
						transform: "translate(-2px, -2px)",
						boxShadow: "var(--shadow-hover)",
					}
				: {};

		// Ghost heeft geen shadow-animatie
		const isGhost = variant === "ghost";

		return (
			<button
				ref={ref}
				style={{
					...BASE,
					...VARIANT_STYLES[variant],
					...SIZE_STYLES[size],
					...(isGhost ? {} : shadowStyle),
					...style,
				}}
				className={clsx(className)}
				onMouseEnter={(e) => {
					setHovered(true);
					onMouseEnter?.(e);
				}}
				onMouseLeave={(e) => {
					setHovered(false);
					setPressed(false);
					onMouseLeave?.(e);
				}}
				onMouseDown={(e) => {
					setPressed(true);
					onMouseDown?.(e);
				}}
				onMouseUp={(e) => {
					setPressed(false);
					onMouseUp?.(e);
				}}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";
