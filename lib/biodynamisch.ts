// Biodynamische kalender utility
// Berekent dagtype op basis van maanpositie in het siderische dierenriemteken.
//
// Bronnen / Credits:
//   - Maria Thun (1922–2012): "Aussaattage" / "Working with the Stars"
//     Biodynamische agrarische kalender, basis voor fruit/bloem/blad/wortel-dagtypes.
//     mariathun.com
//   - Jean Meeus: "Astronomical Algorithms", Willmann-Bell, 1991/1998 (ISBN 978-0943396613)
//     Siderische maanpositie-berekening (hoofdstuk 47), ayanamsa-correctie.
//   - Cees van Casteren MW (Master of Wine, BBC wine presenter)
//     Populariseerde toepassing van de biodynamische kalender bij serieuze wijnproeverijen.
//     Aanbeveling: geen wijnen beoordelen op worteldagen.
//
// Nauwkeurigheid: ±1-2° — voldoende, want de maan staat 2-3 dagen per teken.

export type BiodynamischDagType = "fruit" | "bloem" | "blad" | "wortel";

export interface BiodynamischInfo {
	dagType: BiodynamischDagType;
	label: string;
	sterrenbeeld: string;
	element: string;
	beschrijving: string;
	aanbeveling: string;
	kleur: string;
	emoji: string;
}

const STERRENBEELDEN: Array<{
	naam: string;
	element: string;
	dagType: BiodynamischDagType;
}> = [
	{ naam: "Ram", element: "Vuur", dagType: "fruit" },
	{ naam: "Stier", element: "Aarde", dagType: "wortel" },
	{ naam: "Tweelingen", element: "Lucht", dagType: "bloem" },
	{ naam: "Kreeft", element: "Water", dagType: "blad" },
	{ naam: "Leeuw", element: "Vuur", dagType: "fruit" },
	{ naam: "Maagd", element: "Aarde", dagType: "wortel" },
	{ naam: "Weegschaal", element: "Lucht", dagType: "bloem" },
	{ naam: "Schorpioen", element: "Water", dagType: "blad" },
	{ naam: "Boogschutter", element: "Vuur", dagType: "fruit" },
	{ naam: "Steenbok", element: "Aarde", dagType: "wortel" },
	{ naam: "Waterman", element: "Lucht", dagType: "bloem" },
	{ naam: "Vissen", element: "Water", dagType: "blad" },
];

// Brutalist kleuren (geen Tailwind color utilities — gebruik CSS vars)
const DAG_INFO: Record<
	BiodynamischDagType,
	Pick<
		BiodynamischInfo,
		"label" | "beschrijving" | "aanbeveling" | "kleur" | "emoji"
	>
> = {
	fruit: {
		label: "Fruit dag",
		beschrijving:
			"Wijn is open, fruitig en expressief. De beste omstandigheden om te proeven en te beoordelen.",
		aanbeveling: "Uitstekend moment voor een proefsessie",
		kleur: "fruit",
		emoji: "🍇",
	},
	bloem: {
		label: "Bloem dag",
		beschrijving:
			"Wijn is aromatisch en fris. Een goede dag om te proeven, vooral voor witte en aromatische wijnen.",
		aanbeveling: "Goede dag voor een proefsessie",
		kleur: "bloem",
		emoji: "🌸",
	},
	blad: {
		label: "Blad dag",
		beschrijving:
			"Wijn kan gesloten of licht grassig zijn. Minder ideaal voor serieuze beoordeling.",
		aanbeveling: "Matige dag voor proeven",
		kleur: "blad",
		emoji: "🌿",
	},
	wortel: {
		label: "Wortel dag",
		beschrijving:
			"Wijn smaakt plat, tannineus of gesloten. Vermijd serieuze beoordelingen op wortel dagen (aanbeveling Cees van Casteren MW).",
		aanbeveling: "Vermijd serieuze proefsessies vandaag",
		kleur: "wortel",
		emoji: "🌱",
	},
};

function toRad(graden: number): number {
	return (graden * Math.PI) / 180;
}

function getMaanSiderischeLongitude(datum: Date): number {
	const JD = datum.getTime() / 86400000 + 2440587.5;
	const T = (JD - 2451545.0) / 36525;
	const L = 218.3164477 + 481267.88123421 * T;
	const M = toRad(134.9633964 + 477198.8675055 * T);
	const Ms = toRad(357.5291092 + 35999.0502909 * T);
	const D = toRad(297.8501921 + 445267.1114034 * T);
	const F = toRad(93.272095 + 483202.0175233 * T);

	const dL =
		6.28875 * Math.sin(M) +
		1.274018 * Math.sin(2 * D - M) +
		0.658309 * Math.sin(2 * D) +
		0.213616 * Math.sin(2 * M) -
		0.185596 * Math.sin(Ms) -
		0.114336 * Math.sin(2 * F) +
		0.058793 * Math.sin(2 * D - 2 * M) +
		0.057212 * Math.sin(2 * D - Ms - M) +
		0.05332 * Math.sin(2 * D + M);

	const lambdaTropisch = L + dL;
	const ayanamsa = 23.85 + (T * 100 * 50.29) / 3600;
	return (((lambdaTropisch - ayanamsa) % 360) + 360) % 360;
}

export function getBiodynamischDagType(datum: Date): BiodynamischDagType {
	const longitude = getMaanSiderischeLongitude(datum);
	const idx = Math.floor(longitude / 30);
	return STERRENBEELDEN[idx].dagType;
}

// ================================================================
// MAANFASE
// ================================================================

export type MaanFase =
	| "nieuw"
	| "wassend_sikkel"
	| "wassend_kwart"
	| "wassend_bol"
	| "vol"
	| "afnemend_bol"
	| "afnemend_kwart"
	| "afnemend_sikkel";

export interface MaanFaseInfo {
	fase: MaanFase;
	label: string;
	emoji: string;
	illuminatie: number; // 0–100%
	leeftijd: number; // dagen in cyclus
	beschrijving: string;
	invloedOpWijn: string;
}

const MAANFASE_DATA: Record<
	MaanFase,
	Omit<MaanFaseInfo, "fase" | "illuminatie" | "leeftijd">
> = {
	nieuw: {
		label: "Nieuwe maan",
		emoji: "🌑",
		beschrijving:
			"Maan staat tussen aarde en zon in — niet zichtbaar. Begin van nieuwe cyclus.",
		invloedOpWijn:
			"Wijn kan gesloten zijn. Minder geschikt voor serieuze beoordeling.",
	},
	wassend_sikkel: {
		label: "Wassende sikkel",
		emoji: "🌒",
		beschrijving: "Kleine lichtende sikkel rechts. Energie begint te stijgen.",
		invloedOpWijn:
			"Wijn wordt expressiever. Beginnend goed moment voor proeven.",
	},
	wassend_kwart: {
		label: "Eerste kwartier",
		emoji: "🌓",
		beschrijving: "Rechterhelft verlicht. Groeiende energie.",
		invloedOpWijn: "Wijn opent langzaam op. Goed moment om te proeven.",
	},
	wassend_bol: {
		label: "Wassende bol",
		emoji: "🌔",
		beschrijving: "Meer dan de helft verlicht. Volle energie in aantocht.",
		invloedOpWijn: "Wijn zeer expressief. Uitstekend moment voor proefsessie.",
	},
	vol: {
		label: "Volle maan",
		emoji: "🌕",
		beschrijving: "Maan volledig verlicht. Piek van de cyclus.",
		invloedOpWijn:
			"Maximale energie. Wijn op volle expressie — ideaal voor beoordeling. Gecombineerd met fruit dag = perfecte omstandigheden.",
	},
	afnemend_bol: {
		label: "Afnemende bol",
		emoji: "🌖",
		beschrijving: "Net voorbij vol. Energie daalt langzaam.",
		invloedOpWijn: "Wijn nog steeds open en expressief.",
	},
	afnemend_kwart: {
		label: "Laatste kwartier",
		emoji: "🌗",
		beschrijving: "Linkerhelft verlicht. Energie neemt merkbaar af.",
		invloedOpWijn:
			"Wijn begint te sluiten. Minder ideaal voor serieuze beoordeling.",
	},
	afnemend_sikkel: {
		label: "Afnemende sikkel",
		emoji: "🌘",
		beschrijving: "Kleine sikkel links. Einde van cyclus nadert.",
		invloedOpWijn:
			"Wijn gesloten of ingetogen. Vermijd belangrijke beoordelingen.",
	},
};

export function getMaanFaseInfo(datum: Date): MaanFaseInfo {
	// Bekende nieuwe maan: 6 jan 2000 18:14 UTC → JD 2451550.258
	const JD = datum.getTime() / 86400000 + 2440587.5;
	const synodicPeriod = 29.530588853;
	const knownNewMoon = 2451550.258;
	const raw = (JD - knownNewMoon) % synodicPeriod;
	const leeftijd = raw >= 0 ? raw : raw + synodicPeriod;

	// Illuminatie (0–100%)
	const illuminatie = Math.round(
		((1 - Math.cos((2 * Math.PI * leeftijd) / synodicPeriod)) / 2) * 100,
	);

	let fase: MaanFase;
	if (leeftijd < 1.85 || leeftijd >= 27.68) fase = "nieuw";
	else if (leeftijd < 7.38) fase = "wassend_sikkel";
	else if (leeftijd < 9.22) fase = "wassend_kwart";
	else if (leeftijd < 14.77) fase = "wassend_bol";
	else if (leeftijd < 16.61) fase = "vol";
	else if (leeftijd < 22.15) fase = "afnemend_bol";
	else if (leeftijd < 24.0) fase = "afnemend_kwart";
	else fase = "afnemend_sikkel";

	return {
		fase,
		illuminatie,
		leeftijd: Math.round(leeftijd * 10) / 10,
		...MAANFASE_DATA[fase],
	};
}

export function getBiodynamischInfo(datum: Date): BiodynamischInfo {
	const longitude = getMaanSiderischeLongitude(datum);
	const idx = Math.floor(longitude / 30);
	const sterrenbeeld = STERRENBEELDEN[idx];
	const dagInfo = DAG_INFO[sterrenbeeld.dagType];
	return {
		dagType: sterrenbeeld.dagType,
		sterrenbeeld: sterrenbeeld.naam,
		element: sterrenbeeld.element,
		...dagInfo,
	};
}
