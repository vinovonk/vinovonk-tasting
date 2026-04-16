// Radio-stijl knoppengroep — vervangt shadcn ToggleGroup
// Interface matcht Next.js app (opties/waarde) voor directe port van forms
import type { ReactNode } from "react";

export interface ButtonGroupOptie<T extends string = string> {
	waarde: T;
	label: ReactNode;
	hex?: string; // kleur-chip voor wijnkleur picker
	disabled?: boolean;
}

interface ButtonGroupProps<T extends string = string> {
	label?: string;
	opties: ButtonGroupOptie<T>[];
	waarde: T | null;
	onChange: (waarde: T) => void;
	size?: "sm" | "md";
	showColor?: boolean;
	wrap?: boolean;
}

export function ButtonGroup<T extends string>({
	label,
	opties,
	waarde,
	onChange,
	size = "md",
	showColor = false,
	wrap = true,
}: ButtonGroupProps<T>) {
	const labelId = label
		? label.replace(/\s+/g, "-").toLowerCase() + "-label"
		: undefined;

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
			{label && (
				<span
					id={labelId}
					style={{
						fontFamily: "var(--font-body)",
						fontWeight: 700,
						fontSize: "0.68rem",
						letterSpacing: "0.12em",
						textTransform: "uppercase",
						color: "var(--color-on-surface)",
					}}
				>
					{label}
				</span>
			)}
			<div
				role="radiogroup"
				aria-labelledby={labelId}
				style={{
					display: "flex",
					flexWrap: wrap ? "wrap" : "nowrap",
					gap: "2px",
				}}
			>
				{opties.map((optie) => {
					const isActive = waarde === optie.waarde;
					return (
						<button
							key={optie.waarde}
							type="button"
							role="radio"
							aria-checked={isActive}
							disabled={optie.disabled}
							onClick={() => !optie.disabled && onChange(optie.waarde)}
							style={{
								display: "inline-flex",
								alignItems: "center",
								gap: "0.375rem",
								fontFamily: "var(--font-body)",
								fontWeight: 700,
								fontSize: size === "sm" ? "0.68rem" : "0.78rem",
								letterSpacing: "0.08em",
								textTransform: "uppercase",
								padding: size === "sm" ? "0.4rem 0.75rem" : "0.55rem 0.875rem",
								minHeight: "40px",
								background: isActive
									? "var(--color-on-surface)"
									: "var(--color-white)",
								color: isActive
									? "var(--color-background)"
									: "var(--color-on-surface)",
								border: `2px solid ${isActive ? "var(--color-on-surface)" : "var(--color-border)"}`,
								borderRadius: 0,
								cursor: optie.disabled ? "not-allowed" : "pointer",
								opacity: optie.disabled ? 0.4 : 1,
								transition: "background 150ms, color 150ms, border-color 150ms",
								whiteSpace: "nowrap",
							}}
						>
							{showColor && optie.hex && (
								<span
									style={{
										display: "inline-block",
										width: "12px",
										height: "12px",
										background: optie.hex,
										border: "1px solid rgba(0,0,0,0.2)",
										flexShrink: 0,
									}}
								/>
							)}
							{optie.label}
						</button>
					);
				})}
			</div>
		</div>
	);
}
