// CIVC Champagne Specialist — Tasting options

export const cuveeTypeOpties = [
	{
		waarde: "nv",
		label: "Non-vintage (NV)",
		beschrijving: "Blend of multiple years",
	},
	{
		waarde: "millesime",
		label: "Millésimé",
		beschrijving: "Single harvest year",
	},
	{
		waarde: "prestige",
		label: "Prestige cuvée",
		beschrijving: "Top-tier single cuvée",
	},
] as const;

export const stijlOpties = [
	{
		waarde: "blanc_de_blancs",
		label: "Blanc de Blancs",
		beschrijving: "100% Chardonnay",
	},
	{
		waarde: "blanc_de_noirs",
		label: "Blanc de Noirs",
		beschrijving: "Pinot Noir and/or Meunier",
	},
	{
		waarde: "assemblage",
		label: "Assemblage",
		beschrijving: "Blend of Chardonnay, Pinot Noir, Meunier",
	},
	{
		waarde: "rose_assemblage",
		label: "Rosé (assemblage)",
		beschrijving: "Blended with still red wine",
	},
	{
		waarde: "rose_saignee",
		label: "Rosé (saignée)",
		beschrijving: "Maceration method",
	},
] as const;

export const dosageOpties = [
	{ waarde: "brut_nature", label: "Brut Nature", beschrijving: "0–3 g/L" },
	{ waarde: "extra_brut", label: "Extra Brut", beschrijving: "0–6 g/L" },
	{ waarde: "brut", label: "Brut", beschrijving: "<12 g/L" },
	{ waarde: "extra_sec", label: "Extra Sec", beschrijving: "12–17 g/L" },
	{ waarde: "sec", label: "Sec", beschrijving: "17–32 g/L" },
	{ waarde: "demi_sec", label: "Demi-sec", beschrijving: "32–50 g/L" },
	{ waarde: "doux", label: "Doux", beschrijving: ">50 g/L" },
] as const;

export const producerTypeOpties = [
	{ waarde: "nm", label: "NM", beschrijving: "Négociant-Manipulant (Maison)" },
	{ waarde: "rm", label: "RM", beschrijving: "Récoltant-Manipulant (Grower)" },
	{ waarde: "cm", label: "CM", beschrijving: "Coopérative de Manipulation" },
	{ waarde: "rc", label: "RC", beschrijving: "Récoltant-Coopérateur" },
	{ waarde: "sr", label: "SR", beschrijving: "Société de Récoltants" },
	{ waarde: "nd", label: "ND", beschrijving: "Négociant-Distributeur" },
	{
		waarde: "ma",
		label: "MA",
		beschrijving: "Marque d'Acheteur (Buyer's Own Brand)",
	},
] as const;

export const classificatieOpties = [
	{ waarde: "grand_cru", label: "Grand Cru (100%)" },
	{ waarde: "premier_cru", label: "Premier Cru (90–99%)" },
	{ waarde: "village", label: "Village (80–89%)" },
] as const;

export const champagneDruivenRassen: string[] = [
	"Chardonnay",
	"Pinot Noir",
	"Meunier",
	"Chardonnay Rosé",
	"Pinot Blanc",
	"Pinot Gris",
	"Arbane",
	"Petit Meslier",
];

const CHAMPAGNE_PRODUCENTEN = [
	"Moët & Chandon",
	"Veuve Clicquot",
	"Krug",
	"Dom Pérignon",
	"Bollinger",
	"Taittinger",
	"Pol Roger",
	"Louis Roederer",
	"Laurent-Perrier",
	"Perrier-Jouët",
	"Nicolas Feuillatte",
	"Mumm",
	"Piper-Heidsieck",
	"Charles Heidsieck",
	"Salon",
	"Billecart-Salmon",
	"Deutz",
	"Gosset",
	"Henriot",
	"Jacquesson",
	"Ayala",
	"Ruinart",
	"Lanson",
	"Pommery",
	"Canard-Duchêne",
	"De Castellane",
	"Duval-Leroy",
	"Drappier",
	"AR Lenoble",
	"Palmer & Co",
	"Egly-Ouriet",
	"Ulysse Collin",
	"Jérôme Prévost",
	"Jacques Selosse",
	"Cédric Bouchard",
	"Pierre Péters",
	"Agrapart & Fils",
	"Chartogne-Taillet",
	"Marie-Courtin",
	"Bérêche et Fils",
	"R. Pouillon",
	"Mouzon-Leroux",
	"Benoît Lahaye",
	"Vincent Charlot",
	"Marguet",
	"Laherte Frères",
	"Gatinois",
	"Gaston Chiquet",
	"André Clouet",
	"Tarlant",
];

const CHAMPAGNE_VILLAGES = [
	"Aÿ",
	"Ambonnay",
	"Avize",
	"Beaumont-sur-Vesle",
	"Bouzy",
	"Chouilly",
	"Cramant",
	"Le Mesnil-sur-Oger",
	"Louvois",
	"Mailly-Champagne",
	"Oger",
	"Oiry",
	"Puisieulx",
	"Sillery",
	"Tours-sur-Marne",
	"Verzenay",
	"Verzy",
	"Épernay",
	"Reims",
	"Châlons-en-Champagne",
	"Troyes",
	"Montagne de Reims",
	"Côte des Blancs",
	"Vallée de la Marne",
	"Côte des Bar",
	"Côte de Sézanne",
	"Hautvillers",
	"Tauxières",
	"Mutigny",
	"Mareuil-sur-Aÿ",
	"Dizy",
	"Cumières",
	"Damery",
	"Fleury-la-Rivière",
	"Vinay",
	"Moussy",
	"Vertus",
	"Villers-Marmery",
	"Trépail",
	"Rilly-la-Montagne",
	"Ludes",
	"Chigny-les-Roses",
	"Montbré",
	"Sermiers",
	"Villedommange",
	"Ecueil",
	"Pargny-lès-Reims",
	"Sacy",
	"Jouy-lès-Reims",
	"Bar-sur-Aube",
	"Bar-sur-Seine",
	"Les Riceys",
];

export function zoekChampagneProducenten(query: string): string[] {
	if (!query || query.length < 1) return [];
	const q = query.toLowerCase();
	return CHAMPAGNE_PRODUCENTEN.filter((p) => p.toLowerCase().includes(q)).slice(
		0,
		8,
	);
}

export function zoekChampagneVillages(query: string): string[] {
	if (!query || query.length < 1) return [];
	const q = query.toLowerCase();
	return CHAMPAGNE_VILLAGES.filter((v) => v.toLowerCase().includes(q)).slice(
		0,
		8,
	);
}

export const champagneKleurOpties = [
	{ waarde: "lemon", label: "Lemon", hex: "#f5f0a0" },
	{ waarde: "gold", label: "Gold", hex: "#e8c84a" },
	{ waarde: "deep_gold", label: "Deep gold", hex: "#c8a820" },
	{ waarde: "amber", label: "Amber", hex: "#cf8f2e" },
	{ waarde: "copper", label: "Copper", hex: "#b87333" },
	{ waarde: "salmon", label: "Salmon (rosé)", hex: "#fa8072" },
	{ waarde: "pink", label: "Pink (rosé)", hex: "#ffb6c1" },
	{ waarde: "deep_pink", label: "Deep pink (rosé)", hex: "#e75480" },
] as const;

export const belGrootteOpties = [
	{ waarde: "fine", label: "Fine" },
	{ waarde: "medium", label: "Medium" },
	{ waarde: "coarse", label: "Coarse" },
] as const;

export const belPersistentieOpties = [
	{ waarde: "persistent", label: "Persistent" },
	{ waarde: "moderate", label: "Moderate" },
	{ waarde: "weak", label: "Weak" },
] as const;

export const mousseKwaliteitOpties = [
	{ waarde: "fine_creamy", label: "Fine & creamy" },
	{ waarde: "pleasant", label: "Pleasant" },
	{ waarde: "coarse", label: "Coarse" },
] as const;

export const champagneHelderheidOpties = [
	{ waarde: "clear", label: "Clear" },
	{ waarde: "hazy", label: "Hazy" },
	{ waarde: "cloudy", label: "Cloudy" },
] as const;

export const champagneIntensiteitOpties = [
	{ waarde: "low", label: "Low" },
	{ waarde: "medium-", label: "Medium-" },
	{ waarde: "medium", label: "Medium" },
	{ waarde: "medium+", label: "Medium+" },
	{ waarde: "pronounced", label: "Pronounced" },
] as const;

export const autolytischKarakterOpties = [
	{ waarde: "none", label: "None", beschrijving: "No autolytic character" },
	{ waarde: "light", label: "Light", beschrijving: "Subtle bread/yeast notes" },
	{
		waarde: "pronounced",
		label: "Pronounced",
		beschrijving: "Dominant brioche, toast, pastry",
	},
] as const;

export const oxidatiefKarakterOpties = [
	{ waarde: "none", label: "None", beschrijving: "Fresh, reductive style" },
	{
		waarde: "light",
		label: "Light",
		beschrijving: "Subtle honey, dried fruit notes",
	},
	{
		waarde: "pronounced",
		label: "Pronounced",
		beschrijving: "Prominent nuts, caramel, dried fruit",
	},
] as const;

export const champagneAromaCategorieen = [
	{
		categorie: "Floral",
		aromas: [
			"White flowers",
			"Acacia",
			"Rose",
			"Honeysuckle",
			"Jasmine",
			"Elder flower",
		],
	},
	{
		categorie: "Citrus",
		aromas: [
			"Lemon",
			"Lime",
			"Grapefruit",
			"Orange zest",
			"Yuzu",
			"Lemon curd",
		],
	},
	{
		categorie: "Green / White fruit",
		aromas: [
			"Green apple",
			"Golden apple",
			"Pear",
			"Quince",
			"White peach",
			"Nectarine",
		],
	},
	{
		categorie: "Stone fruit",
		aromas: ["Peach", "Apricot", "Plum", "Mirabelle"],
	},
	{
		categorie: "Tropical fruit",
		aromas: ["Pineapple", "Mango", "Passion fruit", "Lychee"],
	},
	{
		categorie: "Red fruit",
		aromas: [
			"Red cherry",
			"Strawberry",
			"Raspberry",
			"Redcurrant",
			"Pomegranate",
		],
	},
	{
		categorie: "Dried / Candied fruit",
		aromas: [
			"Dried apricot",
			"Candied lemon",
			"Fig",
			"Raisins",
			"Prune",
			"Marmalade",
		],
	},
	{
		categorie: "Autolytic",
		aromas: [
			"Brioche",
			"Biscuit",
			"Toast",
			"Pastry",
			"Cream",
			"Butter",
			"Almond",
			"Hazelnut",
			"Walnut",
			"Yeast",
			"Dough",
		],
	},
	{
		categorie: "Mineral",
		aromas: ["Chalk", "Flint", "Wet stone", "Oyster shell", "Iodine", "Smoke"],
	},
	{
		categorie: "Spice",
		aromas: ["Ginger", "White pepper", "Cinnamon", "Anise", "Liquorice"],
	},
	{
		categorie: "Oxidative / Aged",
		aromas: [
			"Honey",
			"Beeswax",
			"Dried flowers",
			"Toffee",
			"Caramel",
			"Dried nuts",
			"Coffee",
			"Chocolate",
			"Tobacco",
			"Mushroom",
		],
	},
	{ categorie: "Oak", aromas: ["Vanilla", "Cedar", "Coconut", "Clove"] },
];

export const champagneAanvalOpties = [
	{
		waarde: "fresh",
		label: "Fresh",
		beschrijving: "Lively, high acidity on entry",
	},
	{
		waarde: "ripe",
		label: "Ripe",
		beschrijving: "Generous, fruit-forward entry",
	},
	{ waarde: "soft", label: "Soft", beschrijving: "Gentle, low-acid entry" },
] as const;

export const champagneZoetheidOpties = [
	{
		waarde: "bone_dry",
		label: "Bone dry",
		beschrijving: "Brut Nature / Extra Brut",
	},
	{ waarde: "dry", label: "Dry", beschrijving: "Brut" },
	{ waarde: "off_dry", label: "Off-dry", beschrijving: "Extra Sec" },
	{ waarde: "medium_dry", label: "Medium dry", beschrijving: "Sec" },
	{ waarde: "medium_sweet", label: "Medium sweet", beschrijving: "Demi-sec" },
	{ waarde: "sweet", label: "Sweet", beschrijving: "Doux" },
] as const;

export const champagneZuurgraadOpties = [
	{ waarde: "low", label: "Low" },
	{ waarde: "medium-", label: "Medium-" },
	{ waarde: "medium", label: "Medium" },
	{ waarde: "medium+", label: "Medium+" },
	{ waarde: "high", label: "High" },
] as const;

export const champagneBodyOpties = [
	{ waarde: "light", label: "Light" },
	{ waarde: "medium", label: "Medium" },
	{ waarde: "full", label: "Full" },
] as const;

export const champagneAfdronkOpties = [
	{ waarde: "short", label: "Short" },
	{ waarde: "medium", label: "Medium" },
	{ waarde: "long", label: "Long" },
] as const;

export const champagneComplexiteitOpties = [
	{ waarde: "simple", label: "Simple" },
	{ waarde: "medium", label: "Some complexity" },
	{ waarde: "complex", label: "Complex" },
] as const;

export const champagneKwaliteitOpties = [
	{
		waarde: "acceptable",
		label: "Acceptable",
		beschrijving: "One quality dimension present",
	},
	{
		waarde: "good",
		label: "Good",
		beschrijving: "Two quality dimensions present",
	},
	{
		waarde: "very_good",
		label: "Very good",
		beschrijving: "Three quality dimensions present",
	},
	{
		waarde: "outstanding",
		label: "Outstanding",
		beschrijving:
			"All quality dimensions: balance, length, intensity, complexity",
	},
] as const;

export const champagneDrinkbaarheidOpties = [
	{ waarde: "drink_now", label: "Drink now" },
	{ waarde: "can_age", label: "Can age (has potential)" },
	{ waarde: "needs_age", label: "Needs more time" },
	{ waarde: "past_peak", label: "Past its peak" },
] as const;
