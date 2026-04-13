// Gecombineerde types voor proefnotitie app
// Geport van vinovonk/vinovonk Next.js app

// ================================================================
// WSET WINE (Level 3 SAT)
// ================================================================

export type WijnType = 'wit' | 'rosé' | 'rood' | 'mousserend' | 'versterkt';
export type Herkomst = 'gekocht' | 'pr_sample' | 'cadeau' | 'event' | 'podcast';
export type MousseIntensiteit = 'delicaat' | 'romig' | 'agressief';
export type PublicatieStatus = 'concept' | 'klaar_voor_publicatie' | 'gepubliceerd';
export type OpnieuwKopen = 'ja' | 'misschien' | 'nee';
export type AanbevolenVoor = 'beginners' | 'gevorderden' | 'feest' | 'diner' | 'cadeautip';

export type Helderheid = 'helder' | 'troebel';
export type IntensiteitDrie = 'bleek' | 'medium' | 'diep';
export type IntensiteitVijf = 'licht' | 'medium-' | 'medium' | 'medium+' | 'uitgesproken';
export type SchaalVijf = 'laag' | 'medium-' | 'medium' | 'medium+' | 'hoog';
export type Conditie = 'schoon' | 'onzuiver';
export type Ontwikkeling = 'jeugdig' | 'in_ontwikkeling' | 'volledig_ontwikkeld' | 'voorbij_hoogtepunt';

export type KleurWit = 'citroengeel-groen' | 'citroengeel' | 'goud' | 'amber' | 'bruin';
export type KleurRosé = 'roze' | 'zalm' | 'oranje';
export type KleurRood = 'paars' | 'robijn' | 'granaat' | 'tawny' | 'bruin';
export type WijnKleur = KleurWit | KleurRosé | KleurRood;

export type Zoetheid = 'droog' | 'off-dry' | 'medium-droog' | 'medium-zoet' | 'zoet' | 'luscious';
export type Body = 'licht' | 'medium-' | 'medium' | 'medium+' | 'vol';
export type AfdronkLengte = 'kort' | 'medium-' | 'medium' | 'medium+' | 'lang';
export type Complexiteit = 'eenvoudig' | 'enige_complexiteit' | 'zeer_complex';
export type Kwaliteit = 'gebrekkig' | 'slecht' | 'acceptabel' | 'goed' | 'zeer_goed' | 'uitmuntend';
export type Drinkbaarheid = 'nu_niet_geschikt' | 'nu_met_potentieel' | 'te_jong' | 'te_oud';
export type Rijpingspotentieel = 'geen' | 'geschikt_voor_rijping' | 'verdere_rijping';

export interface AromaKenmerken {
  primair: string[];
  secundair: string[];
  tertiair: string[];
}

export interface WijnDetails {
  herkomst: Herkomst | null;
  betaaldeSamenwerking: boolean;
  waarTeKoop?: string;
  proefdatum?: string;
  gerechtCombinatie?: string;
  geproefMetPersonen?: string;
  serveerTemperatuur?: string;
  sparksPodcast: boolean;
  podcastAflevering?: string;
  publicatieStatus: PublicatieStatus | null;
  opnieuwKopen: OpnieuwKopen | null;
  aanbevolenVoor: AanbevolenVoor[];
}

export interface WsetWineTasting {
  wijnNaam: string;
  producent?: string;
  regio?: string;
  land?: string;
  druivenras?: string[];
  jaargang?: number;
  prijs?: number;
  wijnType: WijnType;
  uiterlijk: {
    helderheid: Helderheid | null;
    intensiteit: IntensiteitDrie | null;
    kleur: WijnKleur | null;
    overig?: string;
  };
  neus: {
    vibe?: string;
    conditie: Conditie | null;
    intensiteit: IntensiteitVijf | null;
    aromaKenmerken: AromaKenmerken;
    ontwikkeling: Ontwikkeling | null;
  };
  gehemelte: {
    zoetheid: Zoetheid | null;
    zuurgraad: SchaalVijf | null;
    tannine: SchaalVijf | null;
    mousseIntensiteit: MousseIntensiteit | null;
    alcohol: SchaalVijf | null;
    body: Body | null;
    smaakIntensiteit: IntensiteitVijf | null;
    smaakKenmerken: AromaKenmerken;
    afdronk: {
      lengte: AfdronkLengte | null;
      complexiteit: Complexiteit | null;
    };
  };
  conclusie: {
    kwaliteit: Kwaliteit | null;
    drinkbaarheid: Drinkbaarheid | null;
    rijpingspotentieel: Rijpingspotentieel | null;
  };
  details?: WijnDetails;
}

export function createEmptyWineTasting(): WsetWineTasting {
  return {
    wijnNaam: '',
    wijnType: 'rood',
    uiterlijk: { helderheid: null, intensiteit: null, kleur: null, overig: '' },
    neus: {
      vibe: '',
      conditie: null,
      intensiteit: null,
      aromaKenmerken: { primair: [], secundair: [], tertiair: [] },
      ontwikkeling: null,
    },
    gehemelte: {
      zoetheid: null,
      zuurgraad: null,
      tannine: null,
      mousseIntensiteit: null,
      alcohol: null,
      body: null,
      smaakIntensiteit: null,
      smaakKenmerken: { primair: [], secundair: [], tertiair: [] },
      afdronk: { lengte: null, complexiteit: null },
    },
    conclusie: { kwaliteit: null, drinkbaarheid: null, rijpingspotentieel: null },
    details: {
      herkomst: null,
      betaaldeSamenwerking: false,
      waarTeKoop: '',
      proefdatum: new Date().toISOString().split('T')[0],
      gerechtCombinatie: '',
      geproefMetPersonen: '',
      serveerTemperatuur: '',
      sparksPodcast: false,
      podcastAflevering: '',
      publicatieStatus: null,
      opnieuwKopen: null,
      aanbevolenVoor: [],
    },
  };
}

// ================================================================
// CHAMPAGNE (CIVC)
// ================================================================

export type ChampagneCuveeType = 'nv' | 'millesime' | 'prestige';
export type ChampagneStijl = 'blanc_de_blancs' | 'blanc_de_noirs' | 'assemblage' | 'rose_assemblage' | 'rose_saignee';
export type ChampagneDosage = 'brut_nature' | 'extra_brut' | 'brut' | 'extra_sec' | 'sec' | 'demi_sec' | 'doux';
export type ChampagneProducerType = 'nm' | 'rm' | 'cm' | 'rc' | 'sr' | 'nd' | 'ma';
export type ChampagneClassificatie = 'grand_cru' | 'premier_cru' | 'village';
export type ChampagneKleur = 'lemon' | 'gold' | 'deep_gold' | 'amber' | 'copper' | 'salmon' | 'pink' | 'deep_pink';
export type BelGrootte = 'fine' | 'medium' | 'coarse';
export type BelPersistentie = 'persistent' | 'moderate' | 'weak';
export type MousseKwaliteit = 'fine_creamy' | 'pleasant' | 'coarse';
export type ChampagneHelderheid = 'clear' | 'hazy' | 'cloudy';
export type ChampagneIntensiteit = 'low' | 'medium-' | 'medium' | 'medium+' | 'pronounced';
export type AutolytischKarakter = 'none' | 'light' | 'pronounced';
export type OxidatiefKarakter = 'none' | 'light' | 'pronounced';
export type ChampagneAanval = 'fresh' | 'ripe' | 'soft';
export type ChampagneZoetheid = 'bone_dry' | 'dry' | 'off_dry' | 'medium_dry' | 'medium_sweet' | 'sweet';
export type ChampagneZuurgraad = 'low' | 'medium-' | 'medium' | 'medium+' | 'high';
export type ChampagneBody = 'light' | 'medium' | 'full';
export type ChampagneAfdronk = 'short' | 'medium' | 'long';
export type ChampagneComplexiteit = 'simple' | 'medium' | 'complex';
export type ChampagneKwaliteit = 'acceptable' | 'good' | 'very_good' | 'outstanding';
export type ChampagneDrinkbaarheid = 'drink_now' | 'can_age' | 'needs_age' | 'past_peak';

export interface ChampagneTasting {
  cuveeNaam: string;
  producent?: string;
  regio?: string;
  land?: string;
  cuveeType: ChampagneCuveeType | null;
  stijl: ChampagneStijl | null;
  dosage: ChampagneDosage | null;
  dosageGl?: number;
  jaargang?: number;
  disgorgeerdatum?: string;
  druivenrassen: string[];
  producerType: ChampagneProducerType | null;
  classificatie: ChampagneClassificatie | null;
  visueel: {
    kleur: ChampagneKleur | null;
    belGrootte: BelGrootte | null;
    belPersistentie: BelPersistentie | null;
    mousse: MousseKwaliteit | null;
    helderheid: ChampagneHelderheid | null;
    overig?: string;
  };
  neus: {
    vibe?: string;
    intensiteit: ChampagneIntensiteit | null;
    autolytischKarakter: AutolytischKarakter | null;
    oxidatiefKarakter: OxidatiefKarakter | null;
    aromas: string[];
    overig?: string;
  };
  mondgevoel: {
    mousse: MousseKwaliteit | null;
    aanval: ChampagneAanval | null;
    zoetheid: ChampagneZoetheid | null;
    zuurgraad: ChampagneZuurgraad | null;
    body: ChampagneBody | null;
    smaakIntensiteit: ChampagneIntensiteit | null;
    smaakAromas: string[];
    afdronkLengte: ChampagneAfdronk | null;
    complexiteit: ChampagneComplexiteit | null;
    overig?: string;
  };
  conclusie: {
    kwaliteit: ChampagneKwaliteit | null;
    drinkbaarheid: ChampagneDrinkbaarheid | null;
    rijpingspotentieel?: string;
    voedselparing?: string;
  };
  details?: WijnDetails;
}

export function createEmptyChampagneTasting(): ChampagneTasting {
  return {
    cuveeNaam: '',
    druivenrassen: [],
    cuveeType: null,
    stijl: null,
    dosage: null,
    producerType: null,
    classificatie: null,
    visueel: { kleur: null, belGrootte: null, belPersistentie: null, mousse: null, helderheid: null, overig: '' },
    neus: { vibe: '', intensiteit: null, autolytischKarakter: null, oxidatiefKarakter: null, aromas: [], overig: '' },
    mondgevoel: {
      mousse: null, aanval: null, zoetheid: null, zuurgraad: null, body: null,
      smaakIntensiteit: null, smaakAromas: [], afdronkLengte: null, complexiteit: null, overig: '',
    },
    conclusie: { kwaliteit: null, drinkbaarheid: null, rijpingspotentieel: '', voedselparing: '' },
    details: {
      herkomst: null, betaaldeSamenwerking: false, waarTeKoop: '',
      proefdatum: new Date().toISOString().split('T')[0],
      gerechtCombinatie: '', geproefMetPersonen: '', serveerTemperatuur: '',
      sparksPodcast: false, podcastAflevering: '', publicatieStatus: null,
      opnieuwKopen: null, aanbevolenVoor: [],
    },
  };
}

// ================================================================
// SPIRITS (WSET)
// ================================================================

export type SpiritType = 'whisky' | 'gin' | 'rum' | 'cognac' | 'vodka' | 'tequila' | 'brandy' | 'likeur' | 'anders';

export interface WsetSpiritsTasting {
  naam: string;
  merk?: string;
  type: SpiritType;
  land?: string;
  leeftijd?: string;
  alcoholPercentage?: number;
  prijs?: number;
  uiterlijk: {
    helderheid: 'helder' | 'troebel' | null;
    intensiteit: IntensiteitDrie | null;
    kleur: string | null;
  };
  neus: {
    conditie: 'schoon' | 'onzuiver' | null;
    intensiteit: IntensiteitVijf | null;
    aromaKenmerken: {
      grondstof: string[];
      verwerking: string[];
      rijping: string[];
      overig: string[];
    };
  };
  gehemelte: {
    zoetheid: 'droog' | 'halfdroog' | 'medium' | 'zoet' | null;
    smaakIntensiteit: IntensiteitVijf | null;
    textuur: string[];
    smaakKenmerken: {
      grondstof: string[];
      verwerking: string[];
      rijping: string[];
      overig: string[];
    };
    afdronk: {
      lengte: 'kort' | 'medium-' | 'medium' | 'medium+' | 'lang' | null;
      complexiteit: 'neutraal' | 'eenvoudig' | 'enige_complexiteit' | 'zeer_complex' | null;
    };
  };
  conclusie: {
    kwaliteit: 'gebrekkig' | 'slecht' | 'acceptabel' | 'goed' | 'zeer_goed' | 'uitmuntend' | null;
  };
}

export function createEmptySpiritsTasting(): WsetSpiritsTasting {
  return {
    naam: '',
    type: 'whisky',
    uiterlijk: { helderheid: null, intensiteit: null, kleur: null },
    neus: { conditie: null, intensiteit: null, aromaKenmerken: { grondstof: [], verwerking: [], rijping: [], overig: [] } },
    gehemelte: {
      zoetheid: null, smaakIntensiteit: null, textuur: [],
      smaakKenmerken: { grondstof: [], verwerking: [], rijping: [], overig: [] },
      afdronk: { lengte: null, complexiteit: null },
    },
    conclusie: { kwaliteit: null },
  };
}

// ================================================================
// GENERIC (bier, sake, anders)
// ================================================================

export type AnderDrankType = 'bier' | 'sake' | 'cider' | 'mede' | 'anders';

export interface GenericTasting {
  naam: string;
  type: AnderDrankType;
  stijl?: string;
  producent?: string;
  land?: string;
  alcoholPercentage?: number;
  prijs?: number;
  uiterlijk: {
    helderheid: 'helder' | 'troebel' | null;
    kleur: string | null;
    schuim?: string;
    overig?: string;
  };
  neus: {
    intensiteit: 'licht' | 'medium' | 'uitgesproken' | null;
    aromas: string[];
  };
  gehemelte: {
    zoetheid: 'droog' | 'halfdroog' | 'medium' | 'zoet' | null;
    zuurgraad: 'laag' | 'medium' | 'hoog' | null;
    bitterheid?: 'laag' | 'medium' | 'hoog' | null;
    body: 'licht' | 'medium' | 'vol' | null;
    koolzuur?: 'laag' | 'medium' | 'hoog' | null;
    smaken: string[];
    afdronk: 'kort' | 'medium' | 'lang' | null;
  };
  conclusie: {
    kwaliteit: 'slecht' | 'acceptabel' | 'goed' | 'zeer_goed' | 'uitmuntend' | null;
  };
}

export function createEmptyGenericTasting(): GenericTasting {
  return {
    naam: '',
    type: 'bier',
    uiterlijk: { helderheid: null, kleur: null },
    neus: { intensiteit: null, aromas: [] },
    gehemelte: { zoetheid: null, zuurgraad: null, body: null, smaken: [], afdronk: null },
    conclusie: { kwaliteit: null },
  };
}

// ================================================================
// ALCOHOLVRIJ
// ================================================================

export type AlcoholVrijSubType = 'proxy-wijn' | 'spirit-0' | 'thee' | 'anders';

export interface AlcoholVrijTasting {
  naam: string;
  subType: AlcoholVrijSubType;
  customSubType?: string;
  merk?: string;
  stijl?: string;
  producent?: string;
  land?: string;
  prijs?: number;
  uiterlijk: {
    helderheid: 'helder' | 'troebel' | null;
    kleur: string | null;
    overig?: string;
  };
  neus: {
    intensiteit: 'licht' | 'medium' | 'uitgesproken' | null;
    aromas: string[];
  };
  gehemelte: {
    zoetheid: 'droog' | 'halfdroog' | 'medium' | 'zoet' | null;
    zuurgraad: 'laag' | 'medium' | 'hoog' | null;
    body: 'licht' | 'medium' | 'vol' | null;
    bitterheid?: 'laag' | 'medium' | 'hoog' | null;
    tannine?: 'laag' | 'medium' | 'hoog' | null;
    koolzuur?: 'laag' | 'medium' | 'hoog' | null;
    smaken: string[];
    afdronk: 'kort' | 'medium' | 'lang' | null;
  };
  conclusie: {
    kwaliteit: 'slecht' | 'acceptabel' | 'goed' | 'zeer_goed' | 'uitmuntend' | null;
    vergelijkingMetAlcohol?: string;
  };
}

export function createEmptyAlcoholVrijTasting(): AlcoholVrijTasting {
  return {
    naam: '',
    subType: 'proxy-wijn',
    uiterlijk: { helderheid: null, kleur: null },
    neus: { intensiteit: null, aromas: [] },
    gehemelte: { zoetheid: null, zuurgraad: null, body: null, smaken: [], afdronk: null },
    conclusie: { kwaliteit: null },
  };
}

// ================================================================
// TASTING SESSION (gecombineerd)
// ================================================================

export type DrankType = 'wijn' | 'spirit' | 'bier' | 'sake' | 'alcoholvrij' | 'anders' | 'champagne';

export type TastingData =
  | WsetWineTasting
  | WsetSpiritsTasting
  | GenericTasting
  | AlcoholVrijTasting
  | ChampagneTasting;

export interface TastingNote {
  id: string;
  drankType: DrankType;
  fotoPath?: string;
  audioPath?: string;
  transcript?: string;
  tastingData: TastingData;
  persoonlijkeNotitie?: string;
  score?: number; // 1-10
  createdAt: string;
  updatedAt: string;
}

export interface TastingSession {
  id: string;
  naam: string;
  datum: string;
  beschrijving?: string;
  flessen: TastingNote[];
  createdAt: string;
  updatedAt: string;
  isArchived?: boolean;
  biodynamischDagType?: 'fruit' | 'bloem' | 'blad' | 'wortel';
}

export interface SessionSummary {
  id: string;
  naam: string;
  datum: string;
  aantalFlessen: number;
  createdAt: string;
}
