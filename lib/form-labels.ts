// Bilingual form label translations
// UI strings only — option button labels from wine-options.ts are already in English

export type Lang = "nl" | "en";

export const FL = {
	nl: {
		// Buttons
		opslaan: "Opslaan",
		volgende: "Volgende",
		vorige: "Vorige",

		// Tab names
		uiterlijk: "Uiterlijk",
		neus: "Neus",
		gehemelte: "Gehemelte",
		mondgevoel: "Mondgevoel",
		conclusies: "Conclusies",
		details: "Details",

		// Section / field labels
		helderheid: "Helderheid",
		intensiteit: "Intensiteit",
		kleur: "Kleur",
		kleurintensiteit: "Kleurintensiteit",
		conditie: "Conditie",
		ontwikkeling: "Ontwikkeling",
		aromakenmerken: "Aromakenmerken",
		smaakkenmerken: "Smaakkenmerken",
		zoetheid: "Zoetheid",
		zuurgraad: "Zuurgraad",
		tannine: "Tannine",
		mousse: "Mousse",
		alcohol: "Alcohol",
		body: "Body",
		smaakintensiteit: "Smaakintensiteit",
		afdronkLengte: "Afdronk — Lengte",
		afdronkKarakter: "Afdronk — Karakter",
		textuur: "Textuur",
		kwaliteitsniveau: "Kwaliteitsniveau",
		kwaliteitBlic:
			"Kwaliteitsniveau — BLIC (Balans, Lengte, Intensiteit, Complexiteit)",
		drinkbaarheid: "Drinkrijpheid / rijpingspotentieel",
		overigeObservaties: "Overige observaties",
		persoonlijkeNotitie: "Persoonlijke notitie",
		persoonlijkeNotities: "Persoonlijke notities",
		score: "Score (optioneel, 1–10)",
		eigenAromaPlaceholder: "Eigen aroma toevoegen...",
		vibe: "Vibe — waar doet het je aan denken?",
		vibeDesc: "Jouw persoonlijke eerste indruk, in eigen woorden",
		zoekPlaceholder: (label: string) => `Zoek ${label.toLowerCase()}...`,

		// WijnForm info fields
		wijnNaam: "Wijnnaam",
		typeWijn: "Type wijn",
		producent: "Producent",
		regio: "Regio / AVA",
		land: "Land",
		druivenras: "Druivenras",
		jaargang: "Jaargang",
		prijs: "Prijs (€)",
		janrgang_placeholder: "bijv. 2018",
		prijs_placeholder: "bijv. 18.95",
		producent_placeholder: "Bijv. Domaine du Vieux Télégraphe",
		wijnNaam_placeholder: "Bijv. Châteauneuf-du-Pape",
		uiterlijkOverig_placeholder: "Tranen, pétillance, depot...",

		// WijnForm details tab
		hoeVerkregen: "Hoe verkregen",
		waarTeKoop: "Waar te koop",
		waarTeKoop_placeholder: "Bijv. Gall & Gall, Albert Heijn, of directe link",
		proefDatum: "Proef datum",
		serveerTemperatuur: "Serveer temperatuur",
		serveerTemperatuur_placeholder: "Bijv. 16-18°C",
		gerechtCombinatie: "Geproefd met (gerecht)",
		gerechtCombinatie_placeholder:
			"Bijv. Ossobuco, gegrilde entrecote, of puur",
		opnieuwKopen: "Zou opnieuw kopen",
		betaaldeSamenwerking: "Betaalde samenwerking",
		sparksPodcast: "Sparks podcast",
		publicatieStatus: "Publicatiestatus",
		aanbevolenVoor: "Aanbevolen voor",

		// Champagne info fields
		naamCuvee: "Naam cuvée",
		naamCuvee_placeholder:
			"bijv. Blanc de Blancs, Brut Réserve, La Grande Dame...",
		producent_champagne: "Producent / Maison",
		producent_champagne_placeholder:
			"bijv. Moët & Chandon, Krug, Billecart-Salmon...",
		villageRegio: "Village / Regio",
		villageRegio_placeholder: "bijv. Épernay, Aÿ, Le Mesnil-sur-Oger, Reims...",
		cuveeType: "Cuvée type",
		jaargang_champagne: "Jaargang",
		jaargang_champagne_placeholder: "bijv. 2015",
		stijl: "Stijl",
		dosage: "Dosage",
		dosageGl: "Dosage g/L",
		druivenrassen: "Druivenrassen",
		producerType: "Producertype",
		classificatie: "Classificatie",
		dégorgementdatum: "Dégorgementdatum (optioneel)",
		anderRas: "Ander ras...",

		// Champagne proeven labels
		belgrootte: "Belgrootte",
		belpersistentie: "Belpersistentie",
		moussekwaliteit: "Moussekwaliteit",
		autolytischKarakter: "Autolytisch karakter",
		oxidatiefKarakter: "Oxidatief karakter",
		aanvalIntrede: "Aanval / Intrede",
		afdronkComplexiteit: "Afdronk — Complexiteit",
		overigeMondgevoelnoten: "Overige mondgevoelnoten",
		overigeNeusnoten: "Overige neusnoten",
		rijpingspotentieel: "Rijpingspotentieel",
		rijpingspotentieel_placeholder: "Notities over rijpingspotentieel...",
		spijscombinatie: "Spijscombinatie",
		spijscombinatie_placeholder: "Aanbevolen spijscombinaties...",
		drinkrijpheid: "Drinkrijpheid",
		eersteIndruk_placeholder: "Eerste indruk, emoties, associaties...",
		eigenAroChamplabel: "Eigen aroma toevoegen...",

		// Spirits info fields
		naam: "Naam",
		merk: "Merk",
		spiritLand: "Land",
		leeftijd: "Leeftijd",
		alcoholPercentage: "Alcohol %",
		spiritPrijs: "Prijs (€)",
		typeSpirit: "Type spirit",

		// Spirits palate
		aanvullendePalate_placeholder: "Aanvullende observaties...",

		// AlcoholVrij
		typeAlcoholvrij: "Type alcoholvrij",
		specificeerType: "Specificeer type",
		specificeerType_placeholder: "Bijv. Kombucha, Shrub, Mocktail...",
		vergelijking: "Vergelijking met alcoholische variant",
		vergelijking_placeholder:
			"Hoe verhoudt dit zich tot de alcoholische versie? Wat mist er, wat is beter?",

		// Generic
		typeDrank: "Type drank",
		kleur_placeholder: "Bijv. goud, amber, donkerbruin...",
		schuimkraag: "Schuimkraag",
		schuimkraag_placeholder: "Bijv. dik, wit, aanhoudend...",
		bitterheid: "Bitterheid",
		koolzuur: "Koolzuur",
		afdronk: "Afdronk",

		// Validation
		missingFields: (n: number) =>
			`Nog ${n} veld${n > 1 ? "en" : ""} in te vullen`,
		goTo: (tab: string) => `Ga naar ${tab}`,
		missingFieldsSimple: (n: number, labels: string) =>
			`Vul nog ${n} verplicht${n > 1 ? "e velden" : " veld"} in: ${labels}`,

		// Scores
		jePersoonlijkeObservaties: "Jouw observaties...",
		jePersoonlijkeOpmerkingen:
			"Jouw persoonlijke opmerkingen, context, aankoopreden...",

		// WijnForm extra
		landPlaceholder: "Bijv. Frankrijk, Italië, Spanje...",
		regioShort: "Regio",
		regioPlaceholderMetLand: (land: string) => `Bijv. regio in ${land}...`,
		regioPlaceholderLeeg: "Kies eerst een land",
		naamLabel: "Naam",
		wijnNaamJaargangPlaceholder: "Bijv. Châteauneuf-du-Pape 2019",
		jaargangMetNv: " (of NV)",
		jaargangNvPlaceholder: "2019 of NV",
		jaargangNormaalPlaceholder: "2019",
		prijsSimpelePlaceholder: "25.00",
		afdronkLengteShort: "Afdronklengte",
		scoreKort: "Score (optioneel)",

		// AromaPicker
		aromaFlavour: "Aroma & flavour characteristics",
		zoekAromaPlaceholder: "Zoek aroma...",
		voegEigenAroma: "Voeg eigen aroma toe...",
		aromaToevoegenAria: "Aroma toevoegen",
		geenAromasGevonden: "Geen aromas gevonden",
		aromaVerwijderenAria: (label: string) => `${label} verwijderen`,

		// Tabs (korte vorm voor validatie-dictionary)
		tabUiterlijk: "Uiterlijk",
		tabNeus: "Neus",
		tabGehemelte: "Gehemelte",
		tabConclusies: "Conclusies",
	},
	en: {
		// Buttons
		opslaan: "Save",
		volgende: "Next",
		vorige: "Previous",

		// Tab names
		uiterlijk: "Appearance",
		neus: "Nose",
		gehemelte: "Palate",
		mondgevoel: "Palate",
		conclusies: "Conclusions",
		details: "Details",

		// Section / field labels
		helderheid: "Clarity",
		intensiteit: "Intensity",
		kleur: "Colour",
		kleurintensiteit: "Colour intensity",
		conditie: "Condition",
		ontwikkeling: "Development",
		aromakenmerken: "Aroma characteristics",
		smaakkenmerken: "Flavour characteristics",
		zoetheid: "Sweetness",
		zuurgraad: "Acidity",
		tannine: "Tannin",
		mousse: "Mousse",
		alcohol: "Alcohol",
		body: "Body",
		smaakintensiteit: "Flavour intensity",
		afdronkLengte: "Finish — Length",
		afdronkKarakter: "Finish — Character",
		textuur: "Texture",
		kwaliteitsniveau: "Quality level",
		kwaliteitBlic:
			"Quality level — BLIC (Balance, Length, Intensity, Complexity)",
		drinkbaarheid: "Readiness for drinking / ageing potential",
		overigeObservaties: "Other observations",
		persoonlijkeNotitie: "Personal note",
		persoonlijkeNotities: "Personal notes",
		score: "Score (optional, 1–10)",
		eigenAromaPlaceholder: "Add custom aroma...",
		vibe: "Vibe — what does it remind you of?",
		vibeDesc: "Your personal first impression, in any language",
		zoekPlaceholder: (label: string) => `Search ${label.toLowerCase()}...`,

		// WijnForm info fields
		wijnNaam: "Wine name",
		typeWijn: "Wine type",
		producent: "Producer",
		regio: "Region / AVA",
		land: "Country",
		druivenras: "Grape variety",
		jaargang: "Vintage",
		prijs: "Price (€)",
		janrgang_placeholder: "e.g. 2018",
		prijs_placeholder: "e.g. 18.95",
		producent_placeholder: "E.g. Domaine du Vieux Télégraphe",
		wijnNaam_placeholder: "E.g. Châteauneuf-du-Pape",
		uiterlijkOverig_placeholder: "Legs/tears, pétillance, deposit...",

		// WijnForm details tab
		hoeVerkregen: "How obtained",
		waarTeKoop: "Where to buy",
		waarTeKoop_placeholder: "E.g. local wine shop, or direct link",
		proefDatum: "Tasting date",
		serveerTemperatuur: "Serving temperature",
		serveerTemperatuur_placeholder: "E.g. 16–18°C",
		gerechtCombinatie: "Paired with (dish)",
		gerechtCombinatie_placeholder: "E.g. braised lamb, grilled steak, or solo",
		opnieuwKopen: "Would buy again",
		betaaldeSamenwerking: "Paid collaboration",
		sparksPodcast: "Sparks podcast",
		publicatieStatus: "Publication status",
		aanbevolenVoor: "Recommended for",

		// Champagne info fields
		naamCuvee: "Cuvée name",
		naamCuvee_placeholder:
			"e.g. Blanc de Blancs, Brut Réserve, La Grande Dame...",
		producent_champagne: "Producer / Maison",
		producent_champagne_placeholder:
			"e.g. Moët & Chandon, Krug, Billecart-Salmon...",
		villageRegio: "Village / Region",
		villageRegio_placeholder: "e.g. Épernay, Aÿ, Le Mesnil-sur-Oger, Reims...",
		cuveeType: "Cuvée type",
		jaargang_champagne: "Vintage year",
		jaargang_champagne_placeholder: "e.g. 2015",
		stijl: "Style",
		dosage: "Dosage",
		dosageGl: "Dosage g/L",
		druivenrassen: "Grape varieties",
		producerType: "Producer type",
		classificatie: "Classification",
		dégorgementdatum: "Disgorgement date (optional)",
		anderRas: "Other variety...",

		// Champagne proeven labels
		belgrootte: "Bubble size",
		belpersistentie: "Bubble persistence",
		moussekwaliteit: "Mousse quality",
		autolytischKarakter: "Autolytic character",
		oxidatiefKarakter: "Oxidative character",
		aanvalIntrede: "Attack / Entry",
		afdronkComplexiteit: "Finish — Complexity",
		overigeMondgevoelnoten: "Other palate notes",
		overigeNeusnoten: "Other nose notes",
		rijpingspotentieel: "Ageing potential",
		rijpingspotentieel_placeholder: "Notes on ageing potential...",
		spijscombinatie: "Food pairing",
		spijscombinatie_placeholder: "Suggested food pairings...",
		drinkrijpheid: "Readiness for drinking",
		eersteIndruk_placeholder: "First impression, emotions, associations...",
		eigenAroChamplabel: "Add custom aroma...",

		// Spirits info fields
		naam: "Name",
		merk: "Brand",
		spiritLand: "Country",
		leeftijd: "Age",
		alcoholPercentage: "Alcohol %",
		spiritPrijs: "Price (€)",
		typeSpirit: "Spirit type",

		// Spirits palate
		aanvullendePalate_placeholder: "Additional observations...",

		// AlcoholVrij
		typeAlcoholvrij: "Non-alcoholic type",
		specificeerType: "Specify type",
		specificeerType_placeholder: "E.g. Kombucha, Shrub, Mocktail...",
		vergelijking: "Comparison with alcoholic variant",
		vergelijking_placeholder:
			"How does this compare to the alcoholic version? What is missing, what is better?",

		// Generic
		typeDrank: "Drink type",
		kleur_placeholder: "E.g. gold, amber, dark brown...",
		schuimkraag: "Head / foam",
		schuimkraag_placeholder: "E.g. thick, white, persistent...",
		bitterheid: "Bitterness",
		koolzuur: "Carbonation",
		afdronk: "Finish",

		// Validation
		missingFields: (n: number) =>
			`${n} required field${n > 1 ? "s" : ""} missing`,
		goTo: (tab: string) => `Go to ${tab}`,
		missingFieldsSimple: (n: number, labels: string) =>
			`Please fill in ${n} required field${n > 1 ? "s" : ""}: ${labels}`,

		// Scores
		jePersoonlijkeObservaties: "Your observations...",
		jePersoonlijkeOpmerkingen:
			"Your personal notes, context, reason for purchase...",

		// WijnForm extra
		landPlaceholder: "E.g. France, Italy, Spain...",
		regioShort: "Region",
		regioPlaceholderMetLand: (land: string) => `E.g. region in ${land}...`,
		regioPlaceholderLeeg: "Choose a country first",
		naamLabel: "Name",
		wijnNaamJaargangPlaceholder: "E.g. Châteauneuf-du-Pape 2019",
		jaargangMetNv: " (or NV)",
		jaargangNvPlaceholder: "2019 or NV",
		jaargangNormaalPlaceholder: "2019",
		prijsSimpelePlaceholder: "25.00",
		afdronkLengteShort: "Finish length",
		scoreKort: "Score (optional)",

		// AromaPicker
		aromaFlavour: "Aroma & flavour characteristics",
		zoekAromaPlaceholder: "Search aroma...",
		voegEigenAroma: "Add custom aroma...",
		aromaToevoegenAria: "Add aroma",
		geenAromasGevonden: "No aromas found",
		aromaVerwijderenAria: (label: string) => `Remove ${label}`,

		// Tabs (short form for validation dictionary)
		tabUiterlijk: "Appearance",
		tabNeus: "Nose",
		tabGehemelte: "Palate",
		tabConclusies: "Conclusions",
	},
} as const satisfies Record<
	Lang,
	Record<
		string,
		| string
		| ((s: string) => string)
		| ((n: number) => string)
		| ((n: number, s: string) => string)
	>
>;

// Language-aware option arrays for forms that define their own (not from wine-options.ts)
export function getKwaliteitOpties(lang: Lang) {
	return lang === "en"
		? [
				{ waarde: "slecht", label: "Poor" },
				{ waarde: "acceptabel", label: "Acceptable" },
				{ waarde: "goed", label: "Good" },
				{ waarde: "zeer_goed", label: "Very good" },
				{ waarde: "uitmuntend", label: "Outstanding" },
			]
		: [
				{ waarde: "slecht", label: "Slecht" },
				{ waarde: "acceptabel", label: "Acceptabel" },
				{ waarde: "goed", label: "Goed" },
				{ waarde: "zeer_goed", label: "Zeer goed" },
				{ waarde: "uitmuntend", label: "Uitstekend" },
			];
}

export function getHelderheidOpties(lang: Lang) {
	return lang === "en"
		? [
				{ waarde: "helder", label: "Clear" },
				{ waarde: "troebel", label: "Hazy" },
			]
		: [
				{ waarde: "helder", label: "Helder" },
				{ waarde: "troebel", label: "Troebel" },
			];
}

export function getIntensiteitOpties(lang: Lang) {
	return lang === "en"
		? [
				{ waarde: "licht", label: "Light" },
				{ waarde: "medium", label: "Medium" },
				{ waarde: "uitgesproken", label: "Pronounced" },
			]
		: [
				{ waarde: "licht", label: "Licht" },
				{ waarde: "medium", label: "Medium" },
				{ waarde: "uitgesproken", label: "Uitgesproken" },
			];
}

export function getZoetheidOpties(lang: Lang) {
	return lang === "en"
		? [
				{ waarde: "droog", label: "Dry" },
				{ waarde: "halfdroog", label: "Off-dry" },
				{ waarde: "medium", label: "Medium" },
				{ waarde: "zoet", label: "Sweet" },
			]
		: [
				{ waarde: "droog", label: "Droog" },
				{ waarde: "halfdroog", label: "Halfdroog" },
				{ waarde: "medium", label: "Medium" },
				{ waarde: "zoet", label: "Zoet" },
			];
}

export function getDrieSchaalOpties(lang: Lang) {
	return lang === "en"
		? [
				{ waarde: "laag", label: "Low" },
				{ waarde: "medium", label: "Medium" },
				{ waarde: "hoog", label: "High" },
			]
		: [
				{ waarde: "laag", label: "Laag" },
				{ waarde: "medium", label: "Medium" },
				{ waarde: "hoog", label: "Hoog" },
			];
}

export function getBodyOpties(lang: Lang) {
	return lang === "en"
		? [
				{ waarde: "licht", label: "Light" },
				{ waarde: "medium", label: "Medium" },
				{ waarde: "vol", label: "Full" },
			]
		: [
				{ waarde: "licht", label: "Licht" },
				{ waarde: "medium", label: "Medium" },
				{ waarde: "vol", label: "Vol" },
			];
}

export function getAfdronkOpties(lang: Lang) {
	return lang === "en"
		? [
				{ waarde: "kort", label: "Short" },
				{ waarde: "medium", label: "Medium" },
				{ waarde: "lang", label: "Long" },
			]
		: [
				{ waarde: "kort", label: "Kort" },
				{ waarde: "medium", label: "Medium" },
				{ waarde: "lang", label: "Lang" },
			];
}

export function getWijnTypeOpties(lang: Lang) {
	return lang === "en"
		? [
				{ waarde: "wit", label: "White" },
				{ waarde: "rosé", label: "Rosé" },
				{ waarde: "rood", label: "Red" },
				{ waarde: "mousserend", label: "Sparkling" },
				{ waarde: "versterkt", label: "Fortified" },
			]
		: [
				{ waarde: "wit", label: "Wit" },
				{ waarde: "rosé", label: "Rosé" },
				{ waarde: "rood", label: "Rood" },
				{ waarde: "mousserend", label: "Mousserend" },
				{ waarde: "versterkt", label: "Versterkt" },
			];
}

export function getHerkomstOpties(lang: Lang) {
	return lang === "en"
		? [
				{ waarde: "gekocht", label: "Purchased" },
				{ waarde: "pr_sample", label: "PR Sample" },
				{ waarde: "cadeau", label: "Gift" },
				{ waarde: "event", label: "Event" },
				{ waarde: "podcast", label: "Podcast" },
			]
		: [
				{ waarde: "gekocht", label: "Gekocht" },
				{ waarde: "pr_sample", label: "PR Sample" },
				{ waarde: "cadeau", label: "Cadeau" },
				{ waarde: "event", label: "Event" },
				{ waarde: "podcast", label: "Podcast" },
			];
}

export function getOpnieuwKopenOpties(lang: Lang) {
	return lang === "en"
		? [
				{ waarde: "ja", label: "Yes" },
				{ waarde: "misschien", label: "Maybe" },
				{ waarde: "nee", label: "No" },
			]
		: [
				{ waarde: "ja", label: "Ja" },
				{ waarde: "misschien", label: "Misschien" },
				{ waarde: "nee", label: "Nee" },
			];
}

export function getAanbevolenVoorOpties(lang: Lang) {
	return lang === "en"
		? [
				{ waarde: "beginners", label: "Beginners" },
				{ waarde: "gevorderden", label: "Enthusiasts" },
				{ waarde: "feest", label: "Party" },
				{ waarde: "diner", label: "Dinner" },
				{ waarde: "cadeautip", label: "Gift idea" },
			]
		: [
				{ waarde: "beginners", label: "Beginners" },
				{ waarde: "gevorderden", label: "Gevorderden" },
				{ waarde: "feest", label: "Feest" },
				{ waarde: "diner", label: "Diner" },
				{ waarde: "cadeautip", label: "Cadeautip" },
			];
}
