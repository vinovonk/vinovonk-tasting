// Spirits SAT options

export const spiritTypeOpties = [
  { waarde: 'whisky', label: 'Whisky' },
  { waarde: 'gin', label: 'Gin' },
  { waarde: 'rum', label: 'Rum' },
  { waarde: 'cognac', label: 'Cognac/Brandy' },
  { waarde: 'vodka', label: 'Vodka' },
  { waarde: 'tequila', label: 'Tequila/Mezcal' },
  { waarde: 'brandy', label: 'Brandy' },
  { waarde: 'likeur', label: 'Likeur' },
  { waarde: 'anders', label: 'Anders' },
] as const;

export const spiritsHelderheidOpties = [
  { waarde: 'helder', label: 'Clear' },
  { waarde: 'troebel', label: 'Hazy' },
] as const;

export const spiritsKleurIntensiteitOpties = [
  { waarde: 'waterhelder', label: 'Water-white' },
  { waarde: 'bleek', label: 'Pale' },
  { waarde: 'medium', label: 'Medium' },
  { waarde: 'diep', label: 'Deep' },
  { waarde: 'opaak', label: 'Opaque' },
] as const;

export const spiritsKleurOpties = [
  { waarde: 'kleurloos', label: 'Colourless' },
  { waarde: 'lemon', label: 'Lemon' },
  { waarde: 'goud', label: 'Gold' },
  { waarde: 'amber', label: 'Amber' },
  { waarde: 'bruin', label: 'Brown' },
] as const;

export const spiritsConditieOpties = [
  { waarde: 'schoon', label: 'Clean' },
  { waarde: 'onzuiver', label: 'Unclean' },
] as const;

export const spiritsIntensiteitOpties = [
  { waarde: 'neutraal', label: 'Neutral' },
  { waarde: 'licht', label: 'Light' },
  { waarde: 'medium-', label: 'Medium-' },
  { waarde: 'medium', label: 'Medium' },
  { waarde: 'medium+', label: 'Medium+' },
  { waarde: 'uitgesproken', label: 'Pronounced' },
] as const;

export const spiritsZoetheidOpties = [
  { waarde: 'droog', label: 'Dry' },
  { waarde: 'off-dry', label: 'Off-dry' },
  { waarde: 'medium', label: 'Medium' },
  { waarde: 'zoet', label: 'Sweet' },
] as const;

export const spiritsTextuurOpties = [
  { waarde: 'ruw', label: 'Rough' },
  { waarde: 'glad', label: 'Smooth' },
  { waarde: 'waterig', label: 'Watery' },
  { waarde: 'mondvullend', label: 'Mouthfilling' },
  { waarde: 'verwarmend', label: 'Warming' },
] as const;

export const spiritsAfdronkLengteOpties = [
  { waarde: 'kort', label: 'Short' },
  { waarde: 'medium-', label: 'Medium-' },
  { waarde: 'medium', label: 'Medium' },
  { waarde: 'medium+', label: 'Medium+' },
  { waarde: 'lang', label: 'Long' },
] as const;

export const spiritsComplexiteitOpties = [
  { waarde: 'neutraal', label: 'Neutral' },
  { waarde: 'eenvoudig', label: 'Simple' },
  { waarde: 'enige_complexiteit', label: 'Some complexity' },
  { waarde: 'zeer_complex', label: 'Very complex' },
] as const;

export const spiritsKwaliteitOpties = [
  { waarde: 'gebrekkig', label: 'Faulty' },
  { waarde: 'slecht', label: 'Poor' },
  { waarde: 'acceptabel', label: 'Acceptable' },
  { waarde: 'goed', label: 'Good' },
  { waarde: 'zeer_goed', label: 'Very good' },
  { waarde: 'uitmuntend', label: 'Outstanding' },
] as const;

export const spiritsAromaCategorieen = {
  grondstof: {
    label: 'Raw materials',
    aromas: [
      'graan', 'mout', 'brood', 'koekje', 'haver',
      'suikerriet', 'melasse', 'honing',
      'druif', 'appel', 'peer', 'pruim',
      'agave', 'peper', 'rokerig',
      'jeneverbes', 'koriander', 'angelica',
      'aardappel', 'mais', 'rogge', 'tarwe',
    ],
  },
  verwerking: {
    label: 'Processing',
    aromas: [
      'gist', 'brood', 'biscuit',
      'bloemen', 'fruit', 'citrus',
      'tropisch fruit', 'banaan', 'ananas',
      'ester', 'solvent',
    ],
  },
  rijping: {
    label: 'Oak & maturation',
    aromas: [
      'vanille', 'karamel', 'toffee', 'butterscotch',
      'chocolade', 'koffie', 'cacao',
      'kaneel', 'kruidnagel', 'nootmuskaat',
      'cederhout', 'eikenhout', 'sandelhout',
      'rook', 'turf', 'as',
      'leer', 'tabak',
      'noten', 'amandel', 'hazelnoot',
      'gedroogd fruit', 'rozijnen', 'dadels',
    ],
  },
  overig: {
    label: 'Other',
    aromas: [
      'mineraal', 'zeezout', 'jodium',
      'kruiden', 'munt', 'eucalyptus',
      'hars', 'was', 'honingraat',
    ],
  },
} as const;
