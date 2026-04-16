import { useEffect, useState } from "react";
import type { BiodynamischDagType } from "../lib/biodynamisch";
import { getBiodynamischInfo } from "../lib/biodynamisch";
import { getSessions } from "../lib/storage";
import { navigate } from "../router";
import type { SessionSummary } from "../types";

const DAGTYPE_LABEL_EN: Record<BiodynamischDagType, string> = {
	fruit: "Fruit day",
	bloem: "Flower day",
	blad: "Leaf day",
	wortel: "Root day",
};
const DAGTYPE_AANBEVELING_EN: Record<BiodynamischDagType, string> = {
	fruit: "Excellent time for a tasting session",
	bloem: "Good day for a tasting session",
	blad: "Moderate day for tasting",
	wortel: "Avoid serious tasting sessions today",
};

import { format } from "date-fns";
import { enUS, nl } from "date-fns/locale";

interface DashboardProps {
	lang?: "nl" | "en";
}

const DAGTYPE_KLEUR: Record<
	string,
	{ bg: string; border: string; color: string }
> = {
	fruit: { bg: "#f0fdf4", border: "#86efac", color: "#166534" },
	bloem: { bg: "#faf5ff", border: "#d8b4fe", color: "#6b21a8" },
	blad: { bg: "#f0fdfa", border: "#5eead4", color: "#115e59" },
	wortel: { bg: "#fffbeb", border: "#fcd34d", color: "#92400e" },
};

export function Dashboard({ lang = "nl" }: DashboardProps) {
	const [sessions, setSessions] = useState<SessionSummary[]>([]);
	const bio = getBiodynamischInfo(new Date());
	const dagKleur = DAGTYPE_KLEUR[bio.dagType];
	const locale = lang === "en" ? enUS : nl;

	useEffect(() => {
		setSessions(getSessions());
	}, []);

	return (
		<div
			style={{
				maxWidth: "800px",
				margin: "0 auto",
				padding: "2rem var(--gap)",
			}}
		>
			{/* Header */}
			<div
				style={{
					marginBottom: "2rem",
					borderBottom: "4px solid var(--color-border)",
					paddingBottom: "1.5rem",
				}}
			>
				<span
					style={{
						display: "block",
						fontFamily: "var(--font-body)",
						fontWeight: 700,
						fontSize: "0.68rem",
						letterSpacing: "0.18em",
						textTransform: "uppercase",
						color: "var(--color-primary)",
						marginBottom: "0.5rem",
					}}
				>
					{lang === "en" ? "Tasting Notes" : "Proefnotities"}
				</span>
				<h1
					style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", margin: "0 0 1rem" }}
				>
					{lang === "en" ? "Your sessions" : "Je sessies"}
				</h1>

				{/* Biodynamisch badge — klikbaar naar kalender */}
				<button
					onClick={() => navigate("/biodynamisch")}
					style={{
						display: "inline-flex",
						alignItems: "center",
						gap: "0.5rem",
						padding: "0.5rem 0.75rem",
						border: `2px solid ${dagKleur.border}`,
						background: dagKleur.bg,
						color: dagKleur.color,
						fontFamily: "var(--font-body)",
						fontSize: "0.72rem",
						fontWeight: 600,
						letterSpacing: "0.06em",
						cursor: "pointer",
					}}
				>
					<span>{bio.emoji}</span>
					<span>
						{lang === "en" ? DAGTYPE_LABEL_EN[bio.dagType] : bio.label}
					</span>
					<span style={{ opacity: 0.7 }}>
						—{" "}
						{lang === "en"
							? DAGTYPE_AANBEVELING_EN[bio.dagType]
							: bio.aanbeveling}
					</span>
					<span style={{ opacity: 0.5, marginLeft: "0.25rem" }}>›</span>
				</button>
			</div>

			{/* Nieuwe sessie knop */}
			<button
				onClick={() => navigate("/sessie/nieuw")}
				style={{
					display: "inline-flex",
					alignItems: "center",
					gap: "0.5rem",
					background: "var(--color-primary)",
					color: "#fff",
					border: "4px solid var(--color-border)",
					boxShadow: "4px 4px 0px 0px #000",
					padding: "0.75rem 1.5rem",
					fontFamily: "var(--font-body)",
					fontWeight: 700,
					fontSize: "0.82rem",
					letterSpacing: "0.1em",
					textTransform: "uppercase",
					cursor: "pointer",
					marginBottom: "2rem",
					transition: "transform 150ms, box-shadow 150ms",
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.transform = "translate(-2px, -2px)";
					e.currentTarget.style.boxShadow = "6px 6px 0px 0px #000";
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.transform = "translate(0, 0)";
					e.currentTarget.style.boxShadow = "4px 4px 0px 0px #000";
				}}
			>
				+ {lang === "en" ? "New session" : "Nieuwe sessie"}
			</button>

			{/* Sessie lijst */}
			{sessions.length === 0 ? (
				<div
					style={{
						border: "4px solid var(--color-border)",
						padding: "3rem 2rem",
						textAlign: "center",
						color: "var(--color-gray)",
						fontFamily: "var(--font-body)",
					}}
				>
					<p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
						{lang === "en" ? "No sessions yet." : "Nog geen sessies."}
					</p>
					<p style={{ fontSize: "0.9rem" }}>
						{lang === "en"
							? "Start your first tasting session above."
							: "Start je eerste proefsessie hierboven."}
					</p>
					<button
						onClick={() => navigate("/hoe-gebruik-je-dit")}
						style={{
							background: "none",
							border: "none",
							cursor: "pointer",
							fontFamily: "var(--font-body)",
							fontSize: "0.8rem",
							fontWeight: 700,
							color: "var(--color-primary)",
							textDecoration: "underline",
							padding: 0,
							marginTop: "0.5rem",
						}}
					>
						{lang === "en" ? "How does this work? →" : "Hoe werkt dit? →"}
					</button>
				</div>
			) : (
				<div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
					{sessions.map((s) => (
						<button
							key={s.id}
							onClick={() => navigate(`/sessie/${s.id}`)}
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								background: "var(--color-white)",
								border: "4px solid var(--color-border)",
								boxShadow: "4px 4px 0px 0px #000",
								padding: "1.25rem 1.5rem",
								cursor: "pointer",
								textAlign: "left",
								color: "var(--color-on-surface)",
								transition:
									"transform 150ms, box-shadow 150ms, background 150ms",
								width: "100%",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = "translate(-2px, -2px)";
								e.currentTarget.style.boxShadow = "6px 6px 0px 0px #000";
								e.currentTarget.style.background = "var(--color-background)";
								e.currentTarget.style.borderColor = "var(--color-primary)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = "translate(0, 0)";
								e.currentTarget.style.boxShadow = "4px 4px 0px 0px #000";
								e.currentTarget.style.background = "var(--color-white)";
								e.currentTarget.style.borderColor = "var(--color-border)";
							}}
						>
							<div>
								<div
									style={{
										fontFamily: "var(--font-headline)",
										fontWeight: 900,
										fontSize: "1rem",
										textTransform: "uppercase",
										letterSpacing: "-0.02em",
										marginBottom: "0.25rem",
									}}
								>
									{s.naam}
								</div>
								<div
									style={{
										fontFamily: "var(--font-body)",
										fontSize: "0.72rem",
										letterSpacing: "0.08em",
										textTransform: "uppercase",
										color: "var(--color-gray)",
									}}
								>
									{format(new Date(s.datum), "d MMMM yyyy", { locale })}
								</div>
							</div>
							<div
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "0.72rem",
									fontWeight: 700,
									letterSpacing: "0.1em",
									textTransform: "uppercase",
									color: "var(--color-gray)",
									whiteSpace: "nowrap",
								}}
							>
								{s.aantalFlessen}{" "}
								{lang === "en"
									? s.aantalFlessen === 1
										? "bottle"
										: "bottles"
									: s.aantalFlessen === 1
										? "fles"
										: "flessen"}
							</div>
						</button>
					))}
				</div>
			)}

			{/* Footer nav */}
			{sessions.length > 0 && (
				<div
					style={{
						display: "flex",
						gap: "1rem",
						marginTop: "2rem",
						paddingTop: "1.5rem",
						borderTop: "4px solid var(--color-border)",
					}}
				>
					<button
						onClick={() => navigate("/archief")}
						style={{
							background: "none",
							border: "2px solid var(--color-border)",
							padding: "0.5rem 1rem",
							fontFamily: "var(--font-body)",
							fontSize: "0.72rem",
							fontWeight: 700,
							letterSpacing: "0.1em",
							textTransform: "uppercase",
							cursor: "pointer",
							color: "var(--color-gray)",
						}}
					>
						{lang === "en" ? "Archive" : "Archief"}
					</button>
					<button
						onClick={() => navigate("/instellingen")}
						style={{
							background: "none",
							border: "2px solid var(--color-border)",
							padding: "0.5rem 1rem",
							fontFamily: "var(--font-body)",
							fontSize: "0.72rem",
							fontWeight: 700,
							letterSpacing: "0.1em",
							textTransform: "uppercase",
							cursor: "pointer",
							color: "var(--color-gray)",
						}}
					>
						{lang === "en" ? "Settings" : "Instellingen"}
					</button>
					<button
						onClick={() => navigate("/hoe-gebruik-je-dit")}
						style={{
							background: "none",
							border: "2px solid var(--color-border)",
							padding: "0.5rem 1rem",
							fontFamily: "var(--font-body)",
							fontSize: "0.72rem",
							fontWeight: 700,
							letterSpacing: "0.1em",
							textTransform: "uppercase",
							cursor: "pointer",
							color: "var(--color-gray)",
						}}
					>
						{lang === "en" ? "How to use" : "Hoe gebruik je dit?"}
					</button>
					<button
						onClick={() => navigate("/bronnen")}
						style={{
							background: "none",
							border: "2px solid var(--color-border)",
							padding: "0.5rem 1rem",
							fontFamily: "var(--font-body)",
							fontSize: "0.72rem",
							fontWeight: 700,
							letterSpacing: "0.1em",
							textTransform: "uppercase",
							cursor: "pointer",
							color: "var(--color-gray)",
						}}
					>
						{lang === "en" ? "Sources" : "Bronnen"}
					</button>
				</div>
			)}
		</div>
	);
}
