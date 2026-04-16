import { getBiodynamischInfo } from "../lib/biodynamisch";
import { Badge, type BadgeVariant } from "../ui/Badge";

interface BiodynamischBadgeProps {
	datum?: string | Date;
	variant?: "full" | "compact";
}

export function BiodynamischBadge({
	datum,
	variant = "compact",
}: BiodynamischBadgeProps) {
	const d = datum ? new Date(datum) : new Date();
	const info = getBiodynamischInfo(d);
	const badgeVariant = info.dagType as BadgeVariant;

	if (variant === "compact") {
		return (
			<Badge variant={badgeVariant}>
				{info.emoji} {info.label}
			</Badge>
		);
	}

	return (
		<div
			style={{
				border: "4px solid var(--color-border)",
				padding: "1rem 1.25rem",
				display: "flex",
				gap: "1rem",
				alignItems: "flex-start",
			}}
		>
			<span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{info.emoji}</span>
			<div>
				<div
					style={{
						fontFamily: "var(--font-body)",
						fontWeight: 700,
						fontSize: "0.78rem",
						letterSpacing: "0.1em",
						textTransform: "uppercase",
						marginBottom: "0.25rem",
					}}
				>
					{info.label} — {info.sterrenbeeld} ({info.element})
				</div>
				<div
					style={{
						fontFamily: "var(--font-body)",
						fontSize: "0.82rem",
						color: "var(--color-gray)",
						lineHeight: 1.5,
					}}
				>
					{info.beschrijving}
				</div>
				<div
					style={{
						fontFamily: "var(--font-body)",
						fontSize: "0.72rem",
						fontWeight: 600,
						marginTop: "0.4rem",
						color: "var(--color-on-surface)",
					}}
				>
					{info.aanbeveling}
				</div>
			</div>
		</div>
	);
}
