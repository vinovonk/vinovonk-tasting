import { goBack } from "../router";

interface Props {
	lang?: "nl" | "en";
}

const sectionStyle: React.CSSProperties = {
	borderTop: "4px solid var(--color-border)",
	paddingTop: "2rem",
	marginTop: "2rem",
};

const labelStyle: React.CSSProperties = {
	fontFamily: "var(--font-body)",
	fontWeight: 700,
	fontSize: "0.68rem",
	letterSpacing: "0.18em",
	textTransform: "uppercase",
	color: "var(--color-primary)",
	display: "block",
	marginBottom: "0.5rem",
};

const h2Style: React.CSSProperties = {
	fontFamily: "var(--font-headline)",
	fontWeight: 900,
	fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
	textTransform: "uppercase",
	letterSpacing: "-0.02em",
	margin: "0 0 1rem",
};

const h3Style: React.CSSProperties = {
	fontFamily: "var(--font-headline)",
	fontWeight: 900,
	fontSize: "1rem",
	textTransform: "uppercase",
	letterSpacing: "-0.01em",
	margin: "1.5rem 0 0.5rem",
};

const pStyle: React.CSSProperties = {
	fontFamily: "var(--font-body)",
	fontSize: "0.9rem",
	lineHeight: 1.7,
	color: "var(--color-on-surface)",
	margin: "0 0 0.75rem",
};

const liStyle: React.CSSProperties = {
	fontFamily: "var(--font-body)",
	fontSize: "0.9rem",
	lineHeight: 1.7,
	color: "var(--color-on-surface)",
	marginBottom: "0.375rem",
};

const calloutStyle: React.CSSProperties = {
	border: "4px solid var(--color-border)",
	background: "var(--color-surface)",
	padding: "1rem 1.25rem",
	fontFamily: "var(--font-body)",
	fontSize: "0.85rem",
	lineHeight: 1.6,
	color: "var(--color-on-surface)",
	marginTop: "1rem",
};

const badgeStyle = (color: string): React.CSSProperties => ({
	display: "inline-block",
	padding: "0.2rem 0.5rem",
	fontFamily: "var(--font-body)",
	fontSize: "0.72rem",
	fontWeight: 700,
	letterSpacing: "0.06em",
	textTransform: "uppercase",
	background: color,
	color: "#fff",
	marginRight: "0.5rem",
});

const CONTENT = {
	nl: {
		back: "← Terug",
		backDashboard: "← Terug naar dashboard",
		handleiding: "Handleiding",
		title: "Hoe gebruik je dit?",
		subtitle:
			"Een kort overzicht van de proefmethodiek, de formulieren en de biodynamische kalender.",

		stap1Label: "Stap 1",
		stap1Title: "Een proef\u00adsessie starten",
		stap1P: (
			<>
				Elke proef begint met een <strong>sessie</strong> — een moment waarop je
				één of meerdere flessen naast elkaar beoordeelt. Denk aan een wijnklas,
				een blind tasting met vrienden, of een avond dat je gewoon bijhoudt wat
				je drinkt.
			</>
		),
		stap1Steps: [
			<>
				<strong>Nieuwe sessie</strong> — geef de sessie een naam (bijv.
				"Bordeaux blind, april 2026") en kies een datum.
			</>,
			<>
				<strong>Fles toevoegen</strong> — voeg per fles een notitie toe. Kies
				het dranktype: wijn, champagne, spirits of alcoholvrij.
			</>,
			<>
				<strong>Formulier invullen</strong> — doorloop het twee-fase formulier:
				eerst info, dan proeven.
			</>,
			<>
				<strong>Opslaan</strong> — alles blijft bewaard in je browser
				(localStorage). Geen account, geen server.
			</>,
		],
		stap1Callout: (
			<>
				<strong>Tip:</strong> Je kunt een sessie ook tussentijds opslaan en
				later verder gaan. Alle data staat lokaal in je browser — exporteer
				regelmatig via Instellingen → JSON exporteren.
			</>
		),

		stap2Label: "Stap 2",
		stap2Title: "Welk formulier voor welke situatie?",

		wijnTitle: "Proefmethodiek",
		wijnP1: (
			<>
				Het wijnformulier volgt de{" "}
				<strong>Systematic Approach to Tasting (SAT)</strong> — een
				gestructureerde proefmethode op basis van uiterlijk, neus, gehemelte en
				conclusies. Ideaal als je gestructureerd wil leren proeven of notities
				wil vastleggen die je later kunt vergelijken.
			</>
		),
		wijnP2: (
			<>
				Het formulier loopt via vier tabbladen:{" "}
				<em>Uiterlijk → Neus → Gehemelte → Conclusies</em>. Je sluit af met een
				kwaliteitsoordeel op de BLIC-schaal (Balans, Lengte, Intensiteit,
				Complexiteit) en een drinkadvies.
			</>
		),
		wijnItems: [
			<>
				<strong>Info-fase:</strong> wijnnaam, producent, druivenras, regio,
				jaargang, prijs.
			</>,
			<>
				<strong>Proeven-fase:</strong> visueel, neus (incl. aromapicker),
				gehemelte, conclusies + details voor publicatie.
			</>,
		],

		champagneTitle: "Mousse & autolytisch karakter",
		champagneP: (
			<>
				Het champagneformulier voegt specifieke parameters toe aan het
				wijnformulier: belgrootte, belpersistentie, moussekwaliteit, autolytisch
				karakter (brioche, gist, toast) en oxidatief karakter. Geschikt voor
				alle mousserende wijnen (cava, crémant, prosecco).
			</>
		),

		spiritsTitle: "Destillaat-specifiek",
		spiritsP: (
			<>
				Het spiritsformulier heeft velden voor type spirit (whisky, cognac, gin,
				rum etc.), leeftijd, distilleerderij en een aangepaste aromapicker met
				destillaat-aromas. Tannine en mousse zijn niet relevant — in plaats
				daarvan: warmte en mondgevoel.
			</>
		),

		alcoholvrijTitle: "Alcoholvrij",
		alcoholvrijH: "Vergelijking met alcoholische variant",
		alcoholvrijP: (
			<>
				Voor alcoholvrije wijnen, spirits, bier, kombucha, thee en mocktails.
				Uniek veld: <em>vergelijking met alcoholische variant</em> — wat mist
				er, wat is beter?
			</>
		),

		generiekTitle: "Generiek formulier",
		generiekP: (
			<>
				Voor bier, sake, cider of alles wat niet in de andere categorieën past.
				Eenvoudiger opzet met de kernparameters: uiterlijk, neus, mondgevoel,
				kwaliteit.
			</>
		),

		aromaLabel: "Feature",
		aromaTitle: "De aromapicker",
		aromaP1: (
			<>
				In het wijn- en champagneformulier kun je aromas selecteren via de
				picker. Aromas zijn gegroepeerd in categorieën (primair fruit, secundair
				fermentatie, tertiair oxidatief/rijping). Je kunt ook eigen aromas typen
				en toevoegen.
			</>
		),
		aromaP2: (
			<>
				Bij het gehemelte worden de neusaromas alvast voorgeselecteerd — je kunt
				ze bevestigen of wijzigen. Aromas die je op de neus noemde maar niet op
				het gehemelte, vallen automatisch weg.
			</>
		),

		bioLabel: "Feature",
		bioTitle: "De biodynamische kalender",
		bioP: (
			<>
				De biodynamische wijnkalender is gebaseerd op de agrarische kalender van{" "}
				<strong>Maria Thun</strong>
				(later uitgewerkt door o.a. Cees van Casteren MW). Het idee: de positie
				van de maan langs de dierenriem beïnvloedt hoe wijn smaakt.
			</>
		),
		bioDagTypesTitle: "De vier dagtypes",
		bioDays: [
			{
				kleur: "#166534",
				bg: "#f0fdf4",
				border: "#86efac",
				naam: "Fruitdag",
				emoji: "🍇",
				tekst: "Optimaal voor proeven. Wijn is open, aromatisch en expressief.",
			},
			{
				kleur: "#6b21a8",
				bg: "#faf5ff",
				border: "#d8b4fe",
				naam: "Bloem\u00addag",
				emoji: "🌸",
				tekst: "Aangenaam voor frisse, bloemige wijnen. Aromas goed.",
			},
			{
				kleur: "#115e59",
				bg: "#f0fdfa",
				border: "#5eead4",
				naam: "Blad\u00addag",
				emoji: "🌿",
				tekst: "Wijn kan groenig, zuur of vlak smaken. Minder ideaal.",
			},
			{
				kleur: "#92400e",
				bg: "#fffbeb",
				border: "#fcd34d",
				naam: "Wortel\u00addag",
				emoji: "🌱",
				tekst: "Moeilijkste proefsdag. Wijn vaak gesloten en tannineus.",
			},
		],
		bioBadgeP: (
			<>
				De badge op het dashboard toont het dagtype van vandaag. Klik erop voor
				de uitgebreide kalenderweergave met een 14-dagenkalender,
				maanfase-indicator en uitleg per dagtype.
			</>
		),
		bioCallout: (
			<>
				<strong>Let op:</strong> De biodynamische kalender is een hulpmiddel,
				geen wet. Wetenschappelijk bewijs is beperkt en omstreden. Gebruik het
				als een extra dimensie bij je proefnotities, niet als verklaring voor
				kwaliteit.
			</>
		),

		archiefLabel: "Feature",
		archiefTitle: "Archief & export",
		archiefP1: (
			<>
				Via <strong>Archief</strong> zie je al je proefnotities op één plek,
				doorzoekbaar op naam en filterbaar op dranktype en score. Klik op een
				notitie om hem te bewerken.
			</>
		),
		archiefP2: (
			<>
				Via <strong>Instellingen</strong> kun je:
			</>
		),
		archiefItems: [
			<>
				<strong>Exporteren als JSON</strong> — handig als backup of om over te
				zetten naar een ander apparaat.
			</>,
			<>
				<strong>Importeren vanuit JSON</strong> — laad een eerder geëxporteerd
				bestand terug.
			</>,
			<>
				<strong>Alles wissen</strong> — verwijdert alle sessies definitief uit
				je browser.
			</>,
		],
		archiefCallout: (
			<>
				<strong>Privacy:</strong> Alle data staat uitsluitend in jouw browser.
				Er wordt niets naar een server gestuurd. Als je de browsercache wist,
				gaan de notities verloren. Exporteer daarom regelmatig.
			</>
		),
	},
	en: {
		back: "← Back",
		backDashboard: "← Back to dashboard",
		handleiding: "User Guide",
		title: "How do you use this?",
		subtitle:
			"A brief overview of the tasting methodology, forms and the biodynamic calendar.",

		stap1Label: "Step 1",
		stap1Title: "Starting a tasting session",
		stap1P: (
			<>
				Every tasting begins with a <strong>session</strong> — a moment where
				you assess one or more bottles side by side. Think of a wine class, a
				blind tasting with friends, or an evening where you simply log what you
				drink.
			</>
		),
		stap1Steps: [
			<>
				<strong>New session</strong> — give the session a name (e.g. "Bordeaux
				blind, April 2026") and choose a date.
			</>,
			<>
				<strong>Add bottle</strong> — add a note per bottle. Choose the drink
				type: wine, champagne, spirits or non-alcoholic.
			</>,
			<>
				<strong>Fill in the form</strong> — work through the two-phase form:
				first info, then tasting.
			</>,
			<>
				<strong>Save</strong> — everything is stored in your browser
				(localStorage). No account, no server.
			</>,
		],
		stap1Callout: (
			<>
				<strong>Tip:</strong> You can save a session mid-way and continue later.
				All data is stored locally in your browser — export regularly via
				Settings → Export JSON.
			</>
		),

		stap2Label: "Step 2",
		stap2Title: "Which form for which situation?",

		wijnTitle: "Tasting methodology",
		wijnP1: (
			<>
				The wine form follows the{" "}
				<strong>Systematic Approach to Tasting (SAT)</strong> — a structured
				tasting method based on appearance, nose, palate and conclusions. Ideal
				for structured learning or recording notes you can compare later.
			</>
		),
		wijnP2: (
			<>
				The form runs across four tabs:{" "}
				<em>Appearance → Nose → Palate → Conclusions</em>. It closes with a
				quality assessment on the BLIC scale (Balance, Length, Intensity,
				Complexity) and a drinking recommendation.
			</>
		),
		wijnItems: [
			<>
				<strong>Info phase:</strong> wine name, producer, grape variety, region,
				vintage, price.
			</>,
			<>
				<strong>Tasting phase:</strong> visual, nose (incl. aroma picker),
				palate, conclusions + details for publication.
			</>,
		],

		champagneTitle: "Mousse & autolytic character",
		champagneP: (
			<>
				The champagne form adds specific parameters to the wine form: bubble
				size, bubble persistence, mousse quality, autolytic character (brioche,
				yeast, toast) and oxidative character. Suitable for all sparkling wines
				(cava, crémant, prosecco).
			</>
		),

		spiritsTitle: "Distillate-specific",
		spiritsP: (
			<>
				The spirits form has fields for spirit type (whisky, cognac, gin, rum
				etc.), age, distillery and a custom aroma picker with distillate aromas.
				Tannin and mousse are not relevant — instead: warmth and mouthfeel.
			</>
		),

		alcoholvrijTitle: "Non-alcoholic",
		alcoholvrijH: "Comparison with alcoholic variant",
		alcoholvrijP: (
			<>
				For non-alcoholic wines, spirits, beer, kombucha, tea and mocktails.
				Unique field: <em>comparison with alcoholic variant</em> — what is
				missing, what is better?
			</>
		),

		generiekTitle: "Generic form",
		generiekP: (
			<>
				For beer, sake, cider or anything that does not fit the other
				categories. Simpler layout with the core parameters: appearance, nose,
				palate, quality.
			</>
		),

		aromaLabel: "Feature",
		aromaTitle: "The aroma picker",
		aromaP1: (
			<>
				In the wine and champagne forms you can select aromas via the picker.
				Aromas are grouped in categories (primary fruit, secondary fermentation,
				tertiary oxidative/maturation). You can also type and add custom aromas.
			</>
		),
		aromaP2: (
			<>
				On the palate tab, nose aromas are pre-selected — you can confirm or
				adjust them. Aromas you noted on the nose but not on the palate are
				automatically dropped.
			</>
		),

		bioLabel: "Feature",
		bioTitle: "The biodynamic calendar",
		bioP: (
			<>
				The biodynamic wine calendar is based on the agricultural calendar of{" "}
				<strong>Maria Thun</strong>
				(later applied in wine by, among others, Cees van Casteren MW). The
				idea: the position of the moon along the zodiac influences how wine
				tastes.
			</>
		),
		bioDagTypesTitle: "The four day types",
		bioDays: [
			{
				kleur: "#166534",
				bg: "#f0fdf4",
				border: "#86efac",
				naam: "Fruit day",
				emoji: "🍇",
				tekst: "Optimal for tasting. Wine is open, aromatic and expressive.",
			},
			{
				kleur: "#6b21a8",
				bg: "#faf5ff",
				border: "#d8b4fe",
				naam: "Flower day",
				emoji: "🌸",
				tekst: "Pleasant for fresh, floral wines. Aromas are clear.",
			},
			{
				kleur: "#115e59",
				bg: "#f0fdfa",
				border: "#5eead4",
				naam: "Leaf day",
				emoji: "🌿",
				tekst: "Wine may taste green, sharp or flat. Less ideal.",
			},
			{
				kleur: "#92400e",
				bg: "#fffbeb",
				border: "#fcd34d",
				naam: "Root day",
				emoji: "🌱",
				tekst: "Hardest tasting day. Wine often closed and tannic.",
			},
		],
		bioBadgeP: (
			<>
				The badge on the dashboard shows today's day type. Click it for the full
				calendar view with a 14-day overview, moon phase indicator and
				explanation per day type.
			</>
		),
		bioCallout: (
			<>
				<strong>Note:</strong> The biodynamic calendar is a tool, not a law.
				Scientific evidence is limited and contested. Use it as an extra
				dimension in your tasting notes, not as an explanation for quality.
			</>
		),

		archiefLabel: "Feature",
		archiefTitle: "Archive & export",
		archiefP1: (
			<>
				Via <strong>Archive</strong> you can see all your tasting notes in one
				place, searchable by name and filterable by drink type and score. Click
				a note to edit it.
			</>
		),
		archiefP2: (
			<>
				Via <strong>Settings</strong> you can:
			</>
		),
		archiefItems: [
			<>
				<strong>Export as JSON</strong> — useful as a backup or to transfer to
				another device.
			</>,
			<>
				<strong>Import from JSON</strong> — reload a previously exported file.
			</>,
			<>
				<strong>Delete everything</strong> — permanently removes all sessions
				from your browser.
			</>,
		],
		archiefCallout: (
			<>
				<strong>Privacy:</strong> All data is stored exclusively in your
				browser. Nothing is sent to a server. If you clear the browser cache,
				notes will be lost. Export regularly.
			</>
		),
	},
};

export function HoeGebruikView({ lang = "nl" }: Props) {
	const C = CONTENT[lang];
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
				<button
					onClick={goBack}
					style={{
						background: "none",
						border: "none",
						cursor: "pointer",
						fontFamily: "var(--font-body)",
						fontSize: "0.78rem",
						fontWeight: 700,
						letterSpacing: "0.08em",
						textTransform: "uppercase",
						color: "var(--color-gray)",
						padding: 0,
						marginBottom: "1rem",
						display: "block",
					}}
				>
					{C.back}
				</button>
				<span style={labelStyle}>{C.handleiding}</span>
				<h1
					style={{
						fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
						margin: "0 0 0.75rem",
					}}
				>
					{C.title}
				</h1>
				<p
					style={{
						...pStyle,
						fontSize: "1rem",
						color: "var(--color-gray)",
						margin: 0,
					}}
				>
					{C.subtitle}
				</p>
			</div>

			{/* 1. De sessie-workflow */}
			<section>
				<span style={labelStyle}>{C.stap1Label}</span>
				<h2 style={h2Style}>{C.stap1Title}</h2>
				<p style={pStyle}>{C.stap1P}</p>
				<ol style={{ paddingLeft: "1.25rem", margin: 0 }}>
					{C.stap1Steps.map((s, i) => (
						<li key={i} style={liStyle}>
							{s}
						</li>
					))}
				</ol>
				<div style={calloutStyle}>{C.stap1Callout}</div>
			</section>

			{/* 2. Welk formulier? */}
			<section style={sectionStyle}>
				<span style={labelStyle}>{C.stap2Label}</span>
				<h2 style={h2Style}>{C.stap2Title}</h2>

				<h3 style={h3Style}>
					<span style={badgeStyle("#8b0018")}>Wine</span>
					{C.wijnTitle}
				</h3>
				<p style={pStyle}>{C.wijnP1}</p>
				<p style={pStyle}>{C.wijnP2}</p>
				<ul style={{ paddingLeft: "1.25rem", margin: "0 0 0.75rem" }}>
					{C.wijnItems.map((s, i) => (
						<li key={i} style={liStyle}>
							{s}
						</li>
					))}
				</ul>

				<h3 style={h3Style}>
					<span style={badgeStyle("#6b21a8")}>Champagne</span>
					{C.champagneTitle}
				</h3>
				<p style={pStyle}>{C.champagneP}</p>

				<h3 style={h3Style}>
					<span style={badgeStyle("#92400e")}>Spirits</span>
					{C.spiritsTitle}
				</h3>
				<p style={pStyle}>{C.spiritsP}</p>

				<h3 style={h3Style}>
					<span style={badgeStyle("#115e59")}>{C.alcoholvrijTitle}</span>
					{C.alcoholvrijH}
				</h3>
				<p style={pStyle}>{C.alcoholvrijP}</p>

				<h3 style={h3Style}>{C.generiekTitle}</h3>
				<p style={pStyle}>{C.generiekP}</p>
			</section>

			{/* 3. De aromapicker */}
			<section style={sectionStyle}>
				<span style={labelStyle}>{C.aromaLabel}</span>
				<h2 style={h2Style}>{C.aromaTitle}</h2>
				<p style={pStyle}>{C.aromaP1}</p>
				<p style={pStyle}>{C.aromaP2}</p>
			</section>

			{/* 4. Biodynamische kalender */}
			<section style={sectionStyle}>
				<span style={labelStyle}>{C.bioLabel}</span>
				<h2 style={h2Style}>{C.bioTitle}</h2>
				<p style={pStyle}>{C.bioP}</p>

				<h3 style={h3Style}>{C.bioDagTypesTitle}</h3>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(2, 1fr)",
						gap: "1rem",
						marginBottom: "1rem",
					}}
				>
					{C.bioDays.map((d) => (
						<div
							key={d.naam}
							style={{
								border: `4px solid ${d.border}`,
								background: d.bg,
								padding: "0.75rem",
								display: "flex",
								flexDirection: "column",
								gap: "0.25rem",
							}}
						>
							<span style={{ fontSize: "1.2rem" }}>{d.emoji}</span>
							<span
								style={{
									fontFamily: "var(--font-body)",
									fontWeight: 700,
									fontSize: "0.78rem",
									color: d.kleur,
									textTransform: "uppercase",
									letterSpacing: "0.06em",
								}}
							>
								{d.naam}
							</span>
							<span
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "0.78rem",
									color: d.kleur,
									lineHeight: 1.5,
								}}
							>
								{d.tekst}
							</span>
						</div>
					))}
				</div>

				<p style={pStyle}>{C.bioBadgeP}</p>
				<div style={calloutStyle}>{C.bioCallout}</div>
			</section>

			{/* 5. Archief & export */}
			<section style={sectionStyle}>
				<span style={labelStyle}>{C.archiefLabel}</span>
				<h2 style={h2Style}>{C.archiefTitle}</h2>
				<p style={pStyle}>{C.archiefP1}</p>
				<p style={pStyle}>{C.archiefP2}</p>
				<ul style={{ paddingLeft: "1.25rem", margin: "0 0 0.75rem" }}>
					{C.archiefItems.map((s, i) => (
						<li key={i} style={liStyle}>
							{s}
						</li>
					))}
				</ul>
				<div style={calloutStyle}>{C.archiefCallout}</div>
			</section>

			{/* Footer nav */}
			<div
				style={{
					marginTop: "2rem",
					paddingTop: "1.5rem",
					borderTop: "4px solid var(--color-border)",
				}}
			>
				<button
					onClick={goBack}
					style={{
						background: "none",
						border: "2px solid var(--color-border)",
						cursor: "pointer",
						fontFamily: "var(--font-body)",
						fontSize: "0.72rem",
						fontWeight: 700,
						letterSpacing: "0.1em",
						textTransform: "uppercase",
						color: "var(--color-gray)",
						padding: "0.5rem 1rem",
					}}
				>
					{C.backDashboard}
				</button>
			</div>
		</div>
	);
}
