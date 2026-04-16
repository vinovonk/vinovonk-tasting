import { addDays, format } from "date-fns";
import { enUS, nl as nlLocale } from "date-fns/locale";
import { useMemo } from "react";
import type { BiodynamischDagType, MaanFase } from "../lib/biodynamisch";
import { getBiodynamischInfo, getMaanFaseInfo } from "../lib/biodynamisch";
import { navigate } from "../router";
import { Card, CardContent } from "../ui/Card";

interface BiodynamischViewProps {
	lang?: "nl" | "en";
}

// Kleurthema per dagtype — CSS vars + fallback
const DAGTYPE_THEMA: Record<
	BiodynamischDagType,
	{ achtergrond: string; rand: string; tekst: string; textMuted: string }
> = {
	fruit: {
		achtergrond: "#f0fdf4",
		rand: "#86efac",
		tekst: "#14532d",
		textMuted: "#166534",
	},
	bloem: {
		achtergrond: "#faf5ff",
		rand: "#d8b4fe",
		tekst: "#3b0764",
		textMuted: "#6b21a8",
	},
	blad: {
		achtergrond: "#f0fdfa",
		rand: "#5eead4",
		tekst: "#042f2e",
		textMuted: "#115e59",
	},
	wortel: {
		achtergrond: "#fffbeb",
		rand: "#fcd34d",
		tekst: "#451a03",
		textMuted: "#92400e",
	},
};

const DAGTYPE_LABEL_EN: Record<BiodynamischDagType, string> = {
	fruit: "Fruit day",
	bloem: "Flower day",
	blad: "Leaf day",
	wortel: "Root day",
};

const UITLEG: Record<
	BiodynamischDagType,
	{
		nl: { titel: string; theorie: string; praktijk: string[] };
		en: { titel: string; theorie: string; praktijk: string[] };
	}
> = {
	fruit: {
		nl: {
			titel: "🍇 Fruit dag — beste dag",
			theorie:
				"De maan staat in een vuurteken (Ram, Leeuw, Boogschutter). Warmte en licht beïnvloeden de vruchtdragende delen van de plant. Wijn toont zijn fruitigste, meest expressieve karakter.",
			praktijk: [
				"Ideaal voor verticale proeverijen en vergelijkingen",
				"Fruitaromas staan op de voorgrond",
				"Wijn is open, lonend en communicatief",
				"Beste dag voor fotografie en presentaties",
			],
		},
		en: {
			titel: "🍇 Fruit day — best day",
			theorie:
				"Moon is in a fire sign (Aries, Leo, Sagittarius). Warmth and light influence the fruit-bearing parts of the plant. Wine shows its most expressive, fruity character.",
			praktijk: [
				"Ideal for vertical tastings and comparisons",
				"Fruit aromas take centre stage",
				"Wine is open, rewarding and communicative",
				"Best day for photography and presentations",
			],
		},
	},
	bloem: {
		nl: {
			titel: "🌸 Bloem dag — goede dag",
			theorie:
				"De maan staat in een luchtteken (Tweelingen, Weegschaal, Waterman). Lucht en beweging beïnvloeden de bloeiende delen van de plant. Wijn is aromatisch, fris en elegant.",
			praktijk: [
				"Uitstekend voor aromatische witte wijnen en champagne",
				"Floraal karakter en frisheid staan centraal",
				"Goede dag voor kwaliteitsbeoordelingen",
				"Rosé wijnen tonen hier hun beste kant",
			],
		},
		en: {
			titel: "🌸 Flower day — good day",
			theorie:
				"Moon is in an air sign (Gemini, Libra, Aquarius). Air and movement influence the flowering parts of the plant. Wine is aromatic, fresh and elegant.",
			praktijk: [
				"Excellent for aromatic whites and champagne",
				"Floral character and freshness take centre stage",
				"Good day for quality assessments",
				"Rosé wines show their best side",
			],
		},
	},
	blad: {
		nl: {
			titel: "🌿 Blad dag — matige dag",
			theorie:
				"De maan staat in een waterteken (Kreeft, Schorpioen, Vissen). Water beïnvloedt de bladeren en sappen van de plant. Wijn kan licht grassig, waterig of gesloten aanvoelen.",
			praktijk: [
				"Minder geschikt voor serieuze beoordeling",
				"Grassige of vegetale tonen kunnen meer opvallen",
				"Frisse, lichte wijnen presteren beter dan zware",
				"Goede dag voor informeel proeven of experimenten",
			],
		},
		en: {
			titel: "🌿 Leaf day — moderate day",
			theorie:
				"Moon is in a water sign (Cancer, Scorpio, Pisces). Water influences the leaf parts and sap flow of the plant. Wine may feel slightly grassy, watery or closed.",
			praktijk: [
				"Less suitable for serious assessment",
				"Grassy or vegetal notes may be more prominent",
				"Light, fresh wines perform better than heavy ones",
				"Good day for informal tasting or experiments",
			],
		},
	},
	wortel: {
		nl: {
			titel: "🌱 Wortel dag — slechte dag",
			theorie:
				"De maan staat in een aardteken (Stier, Maagd, Steenbok). Aarde trekt de energie naar beneden. Wijn smaakt vlak, tannineus, stug of volledig gesloten. Gecertificeerd MW Cees van Casteren adviseert uitdrukkelijk: geen serieuze proeverijen op worteldagen.",
			praktijk: [
				"Vermijd alle serieuze wijnbeoordelingen",
				"Tannine voelt harder en ruwer aan",
				"Fruit is afwezig of onderdrukt",
				"Wijn lijkt meer gecorkt of gebrekkig dan hij is",
				"Aanbeveling: sla je beste flessen op voor morgen",
			],
		},
		en: {
			titel: "🌱 Root day — bad day",
			theorie:
				"Moon is in an earth sign (Taurus, Virgo, Capricorn). Earth pulls energy downwards. Wine tastes flat, tannic, harsh or completely closed. MW Cees van Casteren explicitly advises against serious tastings on root days.",
			praktijk: [
				"Avoid all serious wine assessments",
				"Tannins feel harder and rougher",
				"Fruit is absent or suppressed",
				"Wine may seem more corked or faulty than it is",
				"Recommendation: save your best bottles for tomorrow",
			],
		},
	},
};

const dagNamen = {
	nl: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
	en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

const STERRENBEELD_EN: Record<string, string> = {
	Ram: "Aries",
	Stier: "Taurus",
	Tweelingen: "Gemini",
	Kreeft: "Cancer",
	Leeuw: "Leo",
	Maagd: "Virgo",
	Weegschaal: "Libra",
	Schorpioen: "Scorpio",
	Boogschutter: "Sagittarius",
	Steenbok: "Capricorn",
	Waterman: "Aquarius",
	Vissen: "Pisces",
};

const ELEMENT_EN: Record<string, string> = {
	Vuur: "Fire",
	Aarde: "Earth",
	Lucht: "Air",
	Water: "Water",
};

const MAANFASE_EN: Record<
	MaanFase,
	{ label: string; beschrijving: string; invloedOpWijn: string }
> = {
	nieuw: {
		label: "New Moon",
		beschrijving:
			"Moon between earth and sun — not visible. Beginning of a new cycle.",
		invloedOpWijn: "Wine may be closed. Less suited for serious assessment.",
	},
	wassend_sikkel: {
		label: "Waxing Crescent",
		beschrijving: "Small crescent visible on the right. Energy starts to rise.",
		invloedOpWijn:
			"Wine becomes more expressive. A budding good moment for tasting.",
	},
	wassend_kwart: {
		label: "First Quarter",
		beschrijving: "Right half illuminated. Growing energy.",
		invloedOpWijn: "Wine opens slowly. Good time to taste.",
	},
	wassend_bol: {
		label: "Waxing Gibbous",
		beschrijving: "More than half illuminated. Full energy approaching.",
		invloedOpWijn: "Wine very expressive. Excellent for a tasting session.",
	},
	vol: {
		label: "Full Moon",
		beschrijving: "Moon fully illuminated. Peak of the cycle.",
		invloedOpWijn:
			"Maximum energy. Wine at full expression — ideal for assessment. Combined with a fruit day = perfect conditions.",
	},
	afnemend_bol: {
		label: "Waning Gibbous",
		beschrijving: "Just past full. Energy slowly declining.",
		invloedOpWijn: "Wine still open and expressive.",
	},
	afnemend_kwart: {
		label: "Last Quarter",
		beschrijving: "Left half illuminated. Energy noticeably decreasing.",
		invloedOpWijn: "Wine starts to close. Less ideal for serious assessment.",
	},
	afnemend_sikkel: {
		label: "Waning Crescent",
		beschrijving: "Small crescent on the left. End of cycle approaching.",
		invloedOpWijn: "Wine closed or withdrawn. Avoid important assessments.",
	},
};

const DAG_BESCHRIJVING_EN: Record<BiodynamischDagType, string> = {
	fruit:
		"Wine is open, fruity and expressive. The best conditions for tasting and assessment.",
	bloem:
		"Wine is aromatic and fresh. A good day to taste, especially whites and aromatic styles.",
	blad: "Wine may be closed or slightly grassy. Less ideal for serious assessment.",
	wortel:
		"Wine tastes flat, tannic or closed. Avoid serious assessments on root days (recommendation: Cees van Casteren MW).",
};

const DAG_AANBEVELING_EN: Record<BiodynamischDagType, string> = {
	fruit: "Excellent time for a tasting session",
	bloem: "Good day for a tasting session",
	blad: "Moderate day for tasting",
	wortel: "Avoid serious tasting sessions today",
};

export function BiodynamischView({ lang = "nl" }: BiodynamischViewProps) {
	const locale = lang === "en" ? enUS : nlLocale;
	const vandaag = useMemo(() => new Date(), []);
	const bioVandaag = useMemo(() => getBiodynamischInfo(vandaag), [vandaag]);
	const maanFase = useMemo(() => getMaanFaseInfo(vandaag), [vandaag]);
	const thema = DAGTYPE_THEMA[bioVandaag.dagType];
	const uitleg = UITLEG[bioVandaag.dagType][lang];

	// 14-dagenkalender: gisteren + vandaag + 12 komende dagen
	const kalenderDagen = useMemo(() => {
		return Array.from({ length: 14 }, (_, i) => {
			const d = addDays(vandaag, i - 1);
			const bio = getBiodynamischInfo(d);
			return { datum: d, bio, isVandaag: i === 1 };
		});
	}, [vandaag]);

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

	const dagtypeLabel = (dt: BiodynamischDagType) =>
		lang === "en"
			? DAGTYPE_LABEL_EN[dt]
			: `${getBiodynamischInfo(new Date()).dagType === dt ? bioVandaag.label : { fruit: "Fruit dag", bloem: "Bloem dag", blad: "Blad dag", wortel: "Wortel dag" }[dt]}`;

	return (
		<div
			style={{
				maxWidth: "800px",
				margin: "0 auto",
				padding: "2rem var(--gap)",
			}}
		>
			<button onClick={() => navigate("/")} style={backBtnStyle}>
				← {lang === "en" ? "Dashboard" : "Dashboard"}
			</button>

			<h2
				style={{
					fontFamily: "var(--font-headline)",
					fontSize: "1.5rem",
					fontWeight: 900,
					textTransform: "uppercase",
					marginBottom: "0.25rem",
				}}
			>
				{lang === "en" ? "Biodynamic Calendar" : "Biodynamische Kalender"}
			</h2>
			<p
				style={{
					fontFamily: "var(--font-body)",
					fontSize: "0.82rem",
					color: "var(--color-gray)",
					marginBottom: "2rem",
				}}
			>
				{format(vandaag, "EEEE d MMMM yyyy", { locale })}
			</p>

			{/* === VANDAAG — groot kaart === */}
			<div
				style={{
					border: `4px solid ${thema.rand}`,
					background: thema.achtergrond,
					padding: "1.5rem",
					marginBottom: "1.5rem",
					boxShadow: "4px 4px 0 #000",
				}}
			>
				<div
					style={{
						display: "flex",
						gap: "1rem",
						alignItems: "flex-start",
						marginBottom: "1rem",
					}}
				>
					<span style={{ fontSize: "3rem", lineHeight: 1, flexShrink: 0 }}>
						{bioVandaag.emoji}
					</span>
					<div>
						<div
							style={{
								fontFamily: "var(--font-headline)",
								fontWeight: 900,
								fontSize: "1.1rem",
								textTransform: "uppercase",
								color: thema.tekst,
								marginBottom: "0.2rem",
							}}
						>
							{lang === "en"
								? DAGTYPE_LABEL_EN[bioVandaag.dagType]
								: bioVandaag.label}
						</div>
						<div
							style={{
								fontFamily: "var(--font-body)",
								fontSize: "0.78rem",
								fontWeight: 600,
								color: thema.textMuted,
								letterSpacing: "0.06em",
							}}
						>
							{lang === "en" ? "Moon in" : "Maan in"}{" "}
							{lang === "en"
								? (STERRENBEELD_EN[bioVandaag.sterrenbeeld] ??
									bioVandaag.sterrenbeeld)
								: bioVandaag.sterrenbeeld}{" "}
							·{" "}
							{lang === "en"
								? (ELEMENT_EN[bioVandaag.element] ?? bioVandaag.element)
								: bioVandaag.element}
						</div>
					</div>
				</div>
				<p
					style={{
						fontFamily: "var(--font-body)",
						fontSize: "0.875rem",
						color: thema.tekst,
						margin: "0 0 0.75rem",
						lineHeight: 1.6,
					}}
				>
					{lang === "en"
						? DAG_BESCHRIJVING_EN[bioVandaag.dagType]
						: bioVandaag.beschrijving}
				</p>
				<div
					style={{
						display: "inline-block",
						background: thema.rand,
						color: thema.tekst,
						fontFamily: "var(--font-body)",
						fontSize: "0.72rem",
						fontWeight: 700,
						letterSpacing: "0.08em",
						padding: "0.3rem 0.75rem",
					}}
				>
					{lang === "en"
						? DAG_AANBEVELING_EN[bioVandaag.dagType]
						: bioVandaag.aanbeveling}
				</div>
			</div>

			{/* === MAANFASE === */}
			<Card style={{ marginBottom: "1.5rem" }}>
				<CardContent style={{ paddingTop: "1.25rem" }}>
					<div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
						<span style={{ fontSize: "2.5rem", lineHeight: 1, flexShrink: 0 }}>
							{maanFase.emoji}
						</span>
						<div style={{ flex: 1 }}>
							<div
								style={{
									fontFamily: "var(--font-body)",
									fontWeight: 700,
									fontSize: "0.78rem",
									letterSpacing: "0.1em",
									textTransform: "uppercase",
									color: "var(--color-on-surface)",
									marginBottom: "0.2rem",
								}}
							>
								{lang === "en"
									? (MAANFASE_EN[maanFase.fase as MaanFase]?.label ??
										maanFase.label)
									: maanFase.label}
							</div>
							<div
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "0.82rem",
									color: "var(--color-gray)",
									lineHeight: 1.5,
									marginBottom: "0.5rem",
								}}
							>
								{lang === "en"
									? (MAANFASE_EN[maanFase.fase as MaanFase]?.beschrijving ??
										maanFase.beschrijving)
									: maanFase.beschrijving}
							</div>
							<div
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "0.78rem",
									color: "var(--color-on-surface)",
									lineHeight: 1.5,
								}}
							>
								{lang === "en"
									? (MAANFASE_EN[maanFase.fase as MaanFase]?.invloedOpWijn ??
										maanFase.invloedOpWijn)
									: maanFase.invloedOpWijn}
							</div>
						</div>
						<div style={{ textAlign: "right", flexShrink: 0 }}>
							<div
								style={{
									fontFamily: "var(--font-headline)",
									fontWeight: 900,
									fontSize: "1.5rem",
									color: "var(--color-primary)",
								}}
							>
								{maanFase.illuminatie}%
							</div>
							<div
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "0.65rem",
									fontWeight: 700,
									letterSpacing: "0.1em",
									textTransform: "uppercase",
									color: "var(--color-gray)",
								}}
							>
								{lang === "en" ? "illuminated" : "verlicht"}
							</div>
							<div
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "0.68rem",
									color: "var(--color-gray)",
									marginTop: "0.25rem",
								}}
							>
								{lang === "en" ? "day" : "dag"} {Math.round(maanFase.leeftijd)}
								/29
							</div>
						</div>
					</div>

					{/* Maanfase voortgangsbalk */}
					<div
						style={{
							marginTop: "1rem",
							height: "8px",
							background: "var(--color-surface)",
							border: "2px solid var(--color-border)",
							position: "relative",
						}}
					>
						<div
							style={{
								position: "absolute",
								left: 0,
								top: 0,
								bottom: 0,
								width: `${maanFase.illuminatie}%`,
								background: "var(--color-primary)",
								transition: "width 0.3s",
							}}
						/>
					</div>
				</CardContent>
			</Card>

			{/* === 14-DAGENKALENDER === */}
			<Card style={{ marginBottom: "1.5rem" }}>
				<CardContent style={{ paddingTop: "1.25rem" }}>
					<div
						style={{
							fontFamily: "var(--font-headline)",
							fontWeight: 900,
							fontSize: "0.75rem",
							letterSpacing: "0.12em",
							textTransform: "uppercase",
							color: "var(--color-on-surface)",
							marginBottom: "0.75rem",
						}}
					>
						{lang === "en" ? "14-Day Overview" : "14-Dagenoverzicht"}
					</div>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(7, 1fr)",
							gap: "2px",
						}}
					>
						{kalenderDagen.map(({ datum, bio, isVandaag }) => {
							const th = DAGTYPE_THEMA[bio.dagType];
							const dagNr = datum.getDay();
							return (
								<div
									key={datum.toISOString()}
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										gap: "2px",
										padding: "0.5rem 0.25rem",
										border: isVandaag
											? "3px solid var(--color-primary)"
											: `2px solid ${th.rand}`,
										background: isVandaag
											? "var(--color-primary)"
											: th.achtergrond,
										position: "relative",
									}}
								>
									<div
										style={{
											fontFamily: "var(--font-body)",
											fontSize: "0.58rem",
											fontWeight: 700,
											letterSpacing: "0.08em",
											textTransform: "uppercase",
											color: isVandaag
												? "rgba(255,255,255,0.75)"
												: th.textMuted,
										}}
									>
										{dagNamen[lang][dagNr]}
									</div>
									<div
										style={{
											fontFamily: "var(--font-headline)",
											fontWeight: 900,
											fontSize: "0.9rem",
											color: isVandaag ? "#fff" : th.tekst,
										}}
									>
										{format(datum, "d")}
									</div>
									<div style={{ fontSize: "0.85rem", lineHeight: 1 }}>
										{bio.emoji}
									</div>
									{isVandaag && (
										<div
											style={{
												position: "absolute",
												top: "-6px",
												left: "50%",
												transform: "translateX(-50%)",
												background: "var(--color-primary)",
												color: "#fff",
												fontFamily: "var(--font-body)",
												fontSize: "0.5rem",
												fontWeight: 900,
												letterSpacing: "0.08em",
												padding: "0 3px",
												whiteSpace: "nowrap",
											}}
										>
											{lang === "en" ? "TODAY" : "VANDAAG"}
										</div>
									)}
								</div>
							);
						})}
					</div>

					{/* Legenda */}
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							gap: "0.5rem",
							marginTop: "0.75rem",
						}}
					>
						{(
							["fruit", "bloem", "blad", "wortel"] as BiodynamischDagType[]
						).map((dt) => {
							const info = getBiodynamischInfo(
								kalenderDagen.find((d) => d.bio.dagType === dt)?.datum ??
									vandaag,
							);
							const th = DAGTYPE_THEMA[dt];
							return (
								<div
									key={dt}
									style={{
										display: "flex",
										alignItems: "center",
										gap: "0.3rem",
									}}
								>
									<div
										style={{
											width: "12px",
											height: "12px",
											background: th.achtergrond,
											border: `2px solid ${th.rand}`,
										}}
									/>
									<span
										style={{
											fontFamily: "var(--font-body)",
											fontSize: "0.68rem",
											color: "var(--color-gray)",
										}}
									>
										{info.emoji}{" "}
										{lang === "en"
											? DAGTYPE_LABEL_EN[dt]
											: {
													fruit: "Fruit",
													bloem: "Bloem",
													blad: "Blad",
													wortel: "Wortel",
												}[dt]}
									</span>
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>

			{/* === VANDAAG — uitgebreide uitleg === */}
			<Card style={{ marginBottom: "1.5rem" }}>
				<CardContent
					style={{
						paddingTop: "1.25rem",
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
					}}
				>
					<div
						style={{
							fontFamily: "var(--font-headline)",
							fontWeight: 900,
							fontSize: "0.75rem",
							letterSpacing: "0.12em",
							textTransform: "uppercase",
							color: "var(--color-on-surface)",
						}}
					>
						{uitleg.titel}
					</div>
					<p
						style={{
							fontFamily: "var(--font-body)",
							fontSize: "0.875rem",
							color: "var(--color-gray)",
							margin: 0,
							lineHeight: 1.6,
						}}
					>
						{uitleg.theorie}
					</p>
					<ul
						style={{
							margin: 0,
							paddingLeft: "1.25rem",
							display: "flex",
							flexDirection: "column",
							gap: "0.35rem",
						}}
					>
						{uitleg.praktijk.map((punt, i) => (
							<li
								key={i}
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "0.82rem",
									color: "var(--color-on-surface)",
									lineHeight: 1.5,
								}}
							>
								{punt}
							</li>
						))}
					</ul>
				</CardContent>
			</Card>

			{/* === UITLEG ALLE DAGTYPES === */}
			<Card style={{ marginBottom: "1.5rem" }}>
				<CardContent
					style={{
						paddingTop: "1.25rem",
						display: "flex",
						flexDirection: "column",
						gap: "1.25rem",
					}}
				>
					<div
						style={{
							fontFamily: "var(--font-headline)",
							fontWeight: 900,
							fontSize: "0.75rem",
							letterSpacing: "0.12em",
							textTransform: "uppercase",
							color: "var(--color-on-surface)",
						}}
					>
						{lang === "en" ? "All Day Types" : "Alle Dagtypes"}
					</div>
					{(["fruit", "bloem", "blad", "wortel"] as BiodynamischDagType[]).map(
						(dt) => {
							const th = DAGTYPE_THEMA[dt];
							const u = UITLEG[dt][lang];
							const isActive = dt === bioVandaag.dagType;
							return (
								<div
									key={dt}
									style={{
										border: `2px solid ${isActive ? "var(--color-primary)" : th.rand}`,
										background: isActive
											? "var(--color-primary)"
											: th.achtergrond,
										padding: "0.875rem 1rem",
									}}
								>
									<div
										style={{
											fontFamily: "var(--font-body)",
											fontWeight: 700,
											fontSize: "0.78rem",
											letterSpacing: "0.08em",
											textTransform: "uppercase",
											color: isActive ? "#fff" : th.tekst,
											marginBottom: "0.35rem",
										}}
									>
										{u.titel}
									</div>
									<p
										style={{
											fontFamily: "var(--font-body)",
											fontSize: "0.78rem",
											margin: 0,
											lineHeight: 1.55,
											color: isActive ? "rgba(255,255,255,0.85)" : th.textMuted,
										}}
									>
										{u.theorie}
									</p>
								</div>
							);
						},
					)}
				</CardContent>
			</Card>

			{/* === OVER DEZE METHODE === */}
			<Card>
				<CardContent style={{ paddingTop: "1.25rem" }}>
					<div
						style={{
							fontFamily: "var(--font-headline)",
							fontWeight: 900,
							fontSize: "0.75rem",
							letterSpacing: "0.12em",
							textTransform: "uppercase",
							color: "var(--color-on-surface)",
							marginBottom: "0.75rem",
						}}
					>
						{lang === "en" ? "About This Method" : "Over Deze Methode"}
					</div>
					{lang === "nl" ? (
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "0.75rem",
							}}
						>
							<p
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "0.82rem",
									color: "var(--color-gray)",
									margin: 0,
									lineHeight: 1.6,
								}}
							>
								De biodynamische kalender is gebaseerd op het werk van{" "}
								<strong>Maria Thun</strong> (1922–2012), die door jarenlange
								veldproeven vaststelde dat de positie van de maan in het
								siderische dierenriemteken invloed heeft op gewassen. Haar
								methode wordt inmiddels door wijnmakers en sommeliers wereldwijd
								gebruikt.
							</p>
							<p
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "0.82rem",
									color: "var(--color-gray)",
									margin: 0,
									lineHeight: 1.6,
								}}
							>
								<strong>Cees van Casteren MW</strong> (Master of Wine, BBC wine
								presenter) past de kalender consequent toe bij alle serieuze
								proeverijen. Hij adviseert expliciet om geen wijnen te
								beoordelen op <em>worteldagen</em>.
							</p>
							<p
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "0.82rem",
									color: "var(--color-gray)",
									margin: 0,
									lineHeight: 1.6,
								}}
							>
								<strong>Berekening:</strong> Dit algoritme berekent de
								siderische maanpositie via het Jean Meeus methode (Astronomical
								Algorithms, hst. 47) en corrigeert voor de ayanamsa (verschil
								tropisch↔siderisch). Nauwkeurigheid: ±1–2°. De maan staat 2–3
								dagen per teken, dus de dagtype-overgang klopt binnen één dag.
							</p>
							<p
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "0.75rem",
									color: "var(--color-gray)",
									margin: 0,
									borderLeft: "4px solid var(--color-border)",
									paddingLeft: "0.75rem",
								}}
							>
								Let op: de biodynamische kalender is een hulpmiddel, geen
								absolute waarheid. Wetenschappelijk bewijs is beperkt, maar veel
								wijnprofessionals ervaren consistente resultaten.
							</p>
						</div>
					) : (
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "0.75rem",
							}}
						>
							<p
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "0.82rem",
									color: "var(--color-gray)",
									margin: 0,
									lineHeight: 1.6,
								}}
							>
								The biodynamic calendar is based on the work of{" "}
								<strong>Maria Thun</strong> (1922–2012), who through years of
								field trials established that the moon's position in the
								sidereal zodiac affects crops. Her method is now used by
								winemakers and sommeliers worldwide.
							</p>
							<p
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "0.82rem",
									color: "var(--color-gray)",
									margin: 0,
									lineHeight: 1.6,
								}}
							>
								<strong>Cees van Casteren MW</strong> (Master of Wine, BBC wine
								presenter) consistently applies the calendar in all serious
								tastings and explicitly advises against assessing wines on{" "}
								<em>root days</em>.
							</p>
							<p
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "0.82rem",
									color: "var(--color-gray)",
									margin: 0,
									lineHeight: 1.6,
								}}
							>
								<strong>Calculation:</strong> This algorithm computes the
								sidereal moon position using the Jean Meeus method (Astronomical
								Algorithms, ch. 47) with ayanamsa correction
								(tropical↔sidereal). Accuracy: ±1–2°. The moon stays in each
								sign for 2–3 days, so the day-type transition is accurate within
								one day.
							</p>
							<p
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "0.75rem",
									color: "var(--color-gray)",
									margin: 0,
									borderLeft: "4px solid var(--color-border)",
									paddingLeft: "0.75rem",
								}}
							>
								Note: the biodynamic calendar is a tool, not an absolute truth.
								Scientific evidence is limited, but many wine professionals
								experience consistent results.
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
