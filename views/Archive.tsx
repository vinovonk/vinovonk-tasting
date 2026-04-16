import { format } from "date-fns";
import { enUS, nl as nlLocale } from "date-fns/locale";
import {
	Beer,
	Download,
	Droplets,
	HelpCircle,
	Leaf,
	Search,
	Wine,
} from "lucide-react";
import { useMemo, useState } from "react";
import { exportAllData, getSession, getSessions } from "../lib/storage";
import { navigate } from "../router";
import type { DrankType, TastingNote } from "../types";
import { Badge } from "../ui/Badge";
import { Card, CardContent } from "../ui/Card";
import { Input } from "../ui/Input";

interface ArchiveProps {
	lang?: "nl" | "en";
}

const T = {
	nl: {
		back: "Dashboard",
		titel: "Archief",
		zoek: "Zoek op naam, producent, regio...",
		exporteer: "Exporteer JSON",
		alleTypes: "Alle types",
		alleScores: "Alle",
		geScoord: "Met score",
		leeg: "Geen notities gevonden.",
		leegSub: "Begin met het toevoegen van sessies en proefnotities.",
		sessie: "Sessie",
		score: "Score",
		notities: "proefnotities",
		notitie: "proefnotitie",
		totaal: "totaal",
	},
	en: {
		back: "Dashboard",
		titel: "Archive",
		zoek: "Search by name, producer, region...",
		exporteer: "Export JSON",
		alleTypes: "All types",
		alleScores: "All",
		geScoord: "Scored",
		leeg: "No tasting notes found.",
		leegSub: "Start by adding sessions and tasting notes.",
		sessie: "Session",
		score: "Score",
		notities: "tasting notes",
		notitie: "tasting note",
		totaal: "total",
	},
};

interface FlatNote {
	sessionId: string;
	sessionNaam: string;
	sessionDatum: string;
	fles: TastingNote;
	naam: string;
}

const DRANK_FILTER_OPTIES: {
	waarde: DrankType | "alle";
	nl: string;
	en: string;
}[] = [
	{ waarde: "alle", nl: "Alle", en: "All" },
	{ waarde: "wijn", nl: "Wijn", en: "Wine" },
	{ waarde: "champagne", nl: "Champagne", en: "Champagne" },
	{ waarde: "spirit", nl: "Spirits", en: "Spirits" },
	{ waarde: "bier", nl: "Bier", en: "Beer" },
	{ waarde: "sake", nl: "Sake", en: "Sake" },
	{ waarde: "alcoholvrij", nl: "Alcoholvrij", en: "Non-alc." },
	{ waarde: "anders", nl: "Anders", en: "Other" },
];

function getFlesNaam(td: unknown): string {
	if (!td || typeof td !== "object") return "";
	const d = td as Record<string, unknown>;
	return ((d.wijnNaam || d.cuveeNaam || d.naam) as string) || "";
}

function getSubtitel(fles: TastingNote): string {
	const d = fles.tastingData as unknown as Record<string, unknown>;
	const parts: string[] = [];
	if (d.producent) parts.push(d.producent as string);
	if (d.regio) parts.push(d.regio as string);
	if (d.land) parts.push(d.land as string);
	if (d.jaargang) parts.push(String(d.jaargang));
	return parts.join(" · ");
}

const drankTypeIkoon = (t: DrankType) => {
	if (t === "wijn" || t === "champagne") return <Wine size={14} />;
	if (t === "spirit") return <Droplets size={14} />;
	if (t === "bier" || t === "sake") return <Beer size={14} />;
	if (t === "alcoholvrij") return <Leaf size={14} />;
	return <HelpCircle size={14} />;
};

const pillStyle = (sel: boolean): React.CSSProperties => ({
	fontFamily: "var(--font-body)",
	fontSize: "0.7rem",
	fontWeight: 700,
	padding: "0.25rem 0.6rem",
	cursor: "pointer",
	background: sel ? "var(--color-primary)" : "var(--color-white)",
	color: sel ? "#fff" : "var(--color-on-surface)",
	border: `2px solid ${sel ? "var(--color-primary)" : "var(--color-border)"}`,
	letterSpacing: "0.05em",
	textTransform: "uppercase" as const,
});

function downloadJson(filename: string, data: string) {
	const blob = new Blob([data], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}

export function Archive({ lang = "nl" }: ArchiveProps) {
	const t = T[lang];
	const locale = lang === "en" ? enUS : nlLocale;

	const [zoekterm, setZoekterm] = useState("");
	const [typeFilter, setTypeFilter] = useState<DrankType | "alle">("alle");
	const [scoreFilter, setScoreFilter] = useState<"alle" | "geScoord">("alle");

	// Load all notes flat
	const allNotes = useMemo<FlatNote[]>(() => {
		const summaries = getSessions();
		const result: FlatNote[] = [];
		for (const summary of summaries) {
			const session = getSession(summary.id);
			if (!session) continue;
			for (const fles of session.flessen) {
				result.push({
					sessionId: session.id,
					sessionNaam: session.naam,
					sessionDatum: session.datum,
					fles,
					naam: getFlesNaam(fles.tastingData),
				});
			}
		}
		// Sort newest first
		return result.sort(
			(a, b) =>
				new Date(b.fles.createdAt).getTime() -
				new Date(a.fles.createdAt).getTime(),
		);
	}, []);

	const filtered = useMemo(() => {
		let items = allNotes;
		if (typeFilter !== "alle")
			items = items.filter((n) => n.fles.drankType === typeFilter);
		if (scoreFilter === "geScoord")
			items = items.filter((n) => n.fles.score != null);
		if (zoekterm.trim()) {
			const q = zoekterm.trim().toLowerCase();
			items = items.filter((n) => {
				const d = n.fles.tastingData as unknown as Record<string, unknown>;
				const searchFields = [
					n.naam,
					d.producent,
					d.regio,
					d.land,
					d.merk,
					n.sessionNaam,
				]
					.filter(Boolean)
					.join(" ")
					.toLowerCase();
				return searchFields.includes(q);
			});
		}
		return items;
	}, [allNotes, typeFilter, scoreFilter, zoekterm]);

	const handleExport = () => {
		const data = exportAllData();
		const datum = new Date().toISOString().split("T")[0];
		downloadJson(`vinovonk-export-${datum}.json`, data);
	};

	const backBtnStyle: React.CSSProperties = {
		background: "none",
		border: "none",
		cursor: "pointer",
		fontFamily: "var(--font-body)",
		fontSize: "0.72rem",
		fontWeight: 700,
		letterSpacing: "0.1em",
		textTransform: "uppercase",
		color: "var(--color-gray)",
		marginBottom: "1.5rem",
		padding: 0,
	};

	return (
		<div
			style={{
				maxWidth: "800px",
				margin: "0 auto",
				padding: "2rem var(--gap)",
			}}
		>
			<button onClick={() => navigate("/")} style={backBtnStyle}>
				← {t.back}
			</button>

			<div
				style={{
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "space-between",
					marginBottom: "1.5rem",
					gap: "1rem",
					flexWrap: "wrap",
				}}
			>
				<div>
					<h2
						style={{
							fontFamily: "var(--font-headline)",
							fontSize: "1.5rem",
							fontWeight: 900,
							textTransform: "uppercase",
							margin: 0,
						}}
					>
						{t.titel}
					</h2>
					<p
						style={{
							fontFamily: "var(--font-body)",
							fontSize: "0.82rem",
							color: "var(--color-gray)",
							margin: "0.25rem 0 0",
						}}
					>
						{allNotes.length} {allNotes.length === 1 ? t.notitie : t.notities}{" "}
						{t.totaal}
					</p>
				</div>
				<button
					type="button"
					onClick={handleExport}
					style={{
						display: "flex",
						alignItems: "center",
						gap: "0.4rem",
						padding: "0.5rem 0.875rem",
						fontFamily: "var(--font-body)",
						fontSize: "0.72rem",
						fontWeight: 700,
						letterSpacing: "0.08em",
						textTransform: "uppercase",
						background: "var(--color-white)",
						color: "var(--color-on-surface)",
						border: "4px solid var(--color-border)",
						cursor: "pointer",
						boxShadow: "4px 4px 0 #000",
					}}
				>
					<Download size={14} />
					{t.exporteer}
				</button>
			</div>

			{/* Zoekbalk */}
			<div style={{ position: "relative", marginBottom: "1rem" }}>
				<Search
					size={14}
					style={{
						position: "absolute",
						left: "0.75rem",
						top: "50%",
						transform: "translateY(-50%)",
						color: "var(--color-gray)",
						pointerEvents: "none",
					}}
				/>
				<input
					type="search"
					placeholder={t.zoek}
					value={zoekterm}
					onChange={(e) => setZoekterm(e.target.value)}
					style={{
						width: "100%",
						boxSizing: "border-box",
						padding: "0.6rem 0.75rem 0.6rem 2.25rem",
						fontFamily: "var(--font-body)",
						fontSize: "0.875rem",
						border: "4px solid var(--color-border)",
						background: "var(--color-white)",
						color: "var(--color-on-surface)",
						outline: "none",
					}}
				/>
			</div>

			{/* Filters */}
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "4px",
					marginBottom: "0.5rem",
				}}
			>
				{DRANK_FILTER_OPTIES.map((opt) => (
					<button
						key={opt.waarde}
						type="button"
						style={pillStyle(typeFilter === opt.waarde)}
						onClick={() => setTypeFilter(opt.waarde)}
					>
						{lang === "en" ? opt.en : opt.nl}
					</button>
				))}
			</div>
			<div style={{ display: "flex", gap: "4px", marginBottom: "1.5rem" }}>
				<button
					type="button"
					style={pillStyle(scoreFilter === "alle")}
					onClick={() => setScoreFilter("alle")}
				>
					{t.alleScores}
				</button>
				<button
					type="button"
					style={pillStyle(scoreFilter === "geScoord")}
					onClick={() => setScoreFilter("geScoord")}
				>
					★ {t.geScoord}
				</button>
			</div>

			{/* Results */}
			{filtered.length === 0 ? (
				<div style={{ textAlign: "center", padding: "3rem 1rem" }}>
					<p
						style={{
							fontFamily: "var(--font-body)",
							fontWeight: 700,
							color: "var(--color-on-surface)",
							marginBottom: "0.5rem",
						}}
					>
						{t.leeg}
					</p>
					<p
						style={{
							fontFamily: "var(--font-body)",
							fontSize: "0.85rem",
							color: "var(--color-gray)",
						}}
					>
						{t.leegSub}
					</p>
				</div>
			) : (
				<div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
					{filtered.map((n) => (
						<button
							key={`${n.sessionId}-${n.fles.id}`}
							type="button"
							onClick={() =>
								navigate(`/sessie/${n.sessionId}/fles/${n.fles.id}`)
							}
							style={{
								display: "flex",
								alignItems: "center",
								gap: "0.75rem",
								padding: "0.875rem 1rem",
								textAlign: "left",
								background: "var(--color-white)",
								border: "4px solid var(--color-border)",
								cursor: "pointer",
								width: "100%",
								transition: "transform 0.1s",
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.transform = "translate(-2px,-2px)")
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.transform = "translate(0,0)")
							}
						>
							{/* Type icon */}
							<div
								style={{
									width: "36px",
									height: "36px",
									flexShrink: 0,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									background: "var(--color-surface)",
									border: "2px solid var(--color-border)",
									color: "var(--color-primary)",
								}}
							>
								{drankTypeIkoon(n.fles.drankType)}
							</div>

							{/* Info */}
							<div style={{ flex: 1, minWidth: 0 }}>
								<div
									style={{
										fontFamily: "var(--font-body)",
										fontWeight: 700,
										fontSize: "0.875rem",
										color: "var(--color-on-surface)",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "ellipsis",
									}}
								>
									{n.naam || (
										<span
											style={{
												color: "var(--color-gray)",
												fontStyle: "italic",
											}}
										>
											Naamloos
										</span>
									)}
								</div>
								<div
									style={{
										fontFamily: "var(--font-body)",
										fontSize: "0.75rem",
										color: "var(--color-gray)",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "ellipsis",
										marginTop: "1px",
									}}
								>
									{getSubtitel(n.fles) || " "}
								</div>
								<div
									style={{
										fontFamily: "var(--font-body)",
										fontSize: "0.68rem",
										color: "var(--color-gray)",
										marginTop: "2px",
									}}
								>
									{n.sessionNaam} · {(() => {
										try {
											return format(new Date(n.sessionDatum), "d MMM yyyy", {
												locale,
											});
										} catch {
											return n.sessionDatum;
										}
									})()}
								</div>
							</div>

							{/* Score */}
							{n.fles.score != null && (
								<Badge
									style={{
										flexShrink: 0,
										background: "var(--color-primary)",
										color: "#fff",
										border: "2px solid var(--color-primary)",
										fontWeight: 900,
										fontSize: "0.85rem",
										padding: "0.15rem 0.45rem",
									}}
								>
									{n.fles.score}
								</Badge>
							)}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
