// Wine SAT options (types inlined, no external imports needed)

export const wijnTypeOpties = [
	{ waarde: "wit", label: "Wit" },
	{ waarde: "rosé", label: "Rosé" },
	{ waarde: "rood", label: "Rood" },
	{ waarde: "mousserend", label: "Mousserend" },
	{ waarde: "versterkt", label: "Versterkt" },
] as const;

export const helderheidOpties = [
	{ waarde: "helder", label: "Clear" },
	{ waarde: "troebel", label: "Hazy" },
] as const;

export const intensiteitDrieOpties = [
	{ waarde: "bleek", label: "Pale" },
	{ waarde: "medium", label: "Medium" },
	{ waarde: "diep", label: "Deep" },
] as const;

export const kleurWitOpties = [
	{ waarde: "citroengeel-groen", label: "Lemon-green", hex: "#e8e5a0" },
	{ waarde: "citroengeel", label: "Lemon", hex: "#f0e68c" },
	{ waarde: "goud", label: "Gold", hex: "#daa520" },
	{ waarde: "amber", label: "Amber", hex: "#cf8f2e" },
	{ waarde: "bruin", label: "Brown", hex: "#8b6914" },
] as const;

export const kleurRoséOpties = [
	{ waarde: "roze", label: "Pink", hex: "#ffb6c1" },
	{ waarde: "zalm", label: "Salmon", hex: "#fa8072" },
	{ waarde: "oranje", label: "Orange", hex: "#e8915a" },
] as const;

export const kleurRoodOpties = [
	{ waarde: "paars", label: "Purple", hex: "#722f6b" },
	{ waarde: "robijn", label: "Ruby", hex: "#9b111e" },
	{ waarde: "granaat", label: "Garnet", hex: "#7b3f3f" },
	{ waarde: "tawny", label: "Tawny", hex: "#a0522d" },
	{ waarde: "bruin", label: "Brown", hex: "#6b3a2e" },
] as const;

export const conditieOpties = [
	{ waarde: "schoon", label: "Clean" },
	{ waarde: "onzuiver", label: "Unclean" },
] as const;

export const intensiteitVijfOpties = [
	{ waarde: "licht", label: "Light" },
	{ waarde: "medium-", label: "Medium-" },
	{ waarde: "medium", label: "Medium" },
	{ waarde: "medium+", label: "Medium+" },
	{ waarde: "uitgesproken", label: "Pronounced" },
] as const;

export const ontwikkelingOpties = [
	{ waarde: "jeugdig", label: "Youthful" },
	{ waarde: "in_ontwikkeling", label: "Developing" },
	{ waarde: "volledig_ontwikkeld", label: "Fully developed" },
	{ waarde: "voorbij_hoogtepunt", label: "Tired / past its best" },
] as const;

export const mousseOpties = [
	{ waarde: "delicaat", label: "Delicate" },
	{ waarde: "romig", label: "Creamy" },
	{ waarde: "agressief", label: "Aggressive" },
] as const;

export const zoetheidOpties = [
	{ waarde: "droog", label: "Dry" },
	{ waarde: "off-dry", label: "Off-dry" },
	{ waarde: "medium-droog", label: "Medium-dry" },
	{ waarde: "medium-zoet", label: "Medium-sweet" },
	{ waarde: "zoet", label: "Sweet" },
	{ waarde: "luscious", label: "Luscious" },
] as const;

export const schaalVijfOpties = [
	{ waarde: "laag", label: "Low" },
	{ waarde: "medium-", label: "Medium-" },
	{ waarde: "medium", label: "Medium" },
	{ waarde: "medium+", label: "Medium+" },
	{ waarde: "hoog", label: "High" },
] as const;

export const bodyOpties = [
	{ waarde: "licht", label: "Light" },
	{ waarde: "medium-", label: "Medium-" },
	{ waarde: "medium", label: "Medium" },
	{ waarde: "medium+", label: "Medium+" },
	{ waarde: "vol", label: "Full" },
] as const;

export const afdronkLengteOpties = [
	{ waarde: "kort", label: "Short" },
	{ waarde: "medium-", label: "Medium-" },
	{ waarde: "medium", label: "Medium" },
	{ waarde: "medium+", label: "Medium+" },
	{ waarde: "lang", label: "Long" },
] as const;

export const kwaliteitOpties = [
	{
		waarde: "gebrekkig",
		label: "Faulty",
		beschrijving: "Wijn met een duidelijk gebrek",
	},
	{
		waarde: "slecht",
		label: "Poor",
		beschrijving: "Geen BLIC-elementen aanwezig",
	},
	{
		waarde: "acceptabel",
		label: "Acceptable",
		beschrijving: "1 BLIC-element aanwezig",
	},
	{ waarde: "goed", label: "Good", beschrijving: "2 BLIC-elementen aanwezig" },
	{
		waarde: "zeer_goed",
		label: "Very good",
		beschrijving: "3 BLIC-elementen aanwezig",
	},
	{
		waarde: "uitmuntend",
		label: "Outstanding",
		beschrijving: "Alle 4 BLIC-elementen",
	},
] as const;

export const drinkbaarheidOpties = [
	{ waarde: "nu_niet_geschikt", label: "Drink now, not suitable for ageing" },
	{ waarde: "nu_met_potentieel", label: "Can drink now, potential for ageing" },
	{ waarde: "te_jong", label: "Too young to drink" },
	{ waarde: "te_oud", label: "Too old" },
] as const;
