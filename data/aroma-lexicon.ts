// WSET Aroma Lexicon — Nederlands
// Gestructureerd per categorie voor de aroma-picker component

export interface AromaCategorie {
  categorie: string;
  subcategorieen: {
    naam: string;
    aromas: string[];
  }[];
}

// === PRIMAIRE AROMA'S (van druif & gisting) ===
export const primaireAromas: AromaCategorie[] = [
  {
    categorie: 'Fruit',
    subcategorieen: [
      {
        naam: 'Citrusfruit',
        aromas: ['citroen', 'limoen', 'grapefruit', 'sinaasappelschil', 'bergamot'],
      },
      {
        naam: 'Groen fruit',
        aromas: ['appel', 'peer', 'kruisbes', 'druif'],
      },
      {
        naam: 'Steenfruit',
        aromas: ['perzik', 'abrikoos', 'nectarine', 'pruim'],
      },
      {
        naam: 'Tropisch fruit',
        aromas: ['ananas', 'mango', 'passievrucht', 'lychee', 'meloen', 'banaan', 'guave'],
      },
      {
        naam: 'Rood fruit',
        aromas: ['aardbei', 'framboos', 'rode kers', 'cranberry', 'rode bes', 'granaatappel'],
      },
      {
        naam: 'Zwart fruit',
        aromas: ['zwarte bes', 'braambes', 'zwarte kers', 'pruim', 'bosbes', 'moerbes'],
      },
      {
        naam: 'Gedroogd fruit',
        aromas: ['vijg', 'pruimedant', 'rozijn', 'dadel', 'gedroogde abrikoos'],
      },
    ],
  },
  {
    categorie: 'Bloemen',
    subcategorieen: [
      {
        naam: 'Bloemen',
        aromas: ['bloesem', 'roos', 'viooltje', 'lavendel', 'jasmijn', 'oranjebloesem', 'acacia', 'kamille'],
      },
    ],
  },
  {
    categorie: 'Kruiden & Groenten',
    subcategorieen: [
      {
        naam: 'Kruidachtig',
        aromas: ['groene paprika', 'gras', 'tomatenblad', 'asperge', 'erwt'],
      },
      {
        naam: 'Kruiden',
        aromas: ['munt', 'eucalyptus', 'tijm', 'rozemarijn', 'basilicum', 'oregano', 'venkel', 'dille'],
      },
    ],
  },
  {
    categorie: 'Specerijen',
    subcategorieen: [
      {
        naam: 'Specerijen',
        aromas: ['witte peper', 'zwarte peper', 'zoethout', 'kaneel', 'kruidnagel', 'nootmuskaat', 'gember', 'anijs'],
      },
    ],
  },
  {
    categorie: 'Overig primair',
    subcategorieen: [
      {
        naam: 'Mineraal',
        aromas: ['vuursteen', 'natte steen', 'krijt', 'leisteen', 'mineraal'],
      },
    ],
  },
];

// === SECUNDAIRE AROMA'S (van bereiding) ===
export const secundaireAromas: AromaCategorie[] = [
  {
    categorie: 'Gistrijping',
    subcategorieen: [
      {
        naam: 'Autolyse / Gist',
        aromas: ['brood', 'brioche', 'beschuit', 'gist', 'deeg', 'toast'],
      },
    ],
  },
  {
    categorie: 'Malolactische gisting',
    subcategorieen: [
      {
        naam: 'MLF',
        aromas: ['boter', 'room', 'kaas', 'yoghurt'],
      },
    ],
  },
  {
    categorie: 'Eikveroudering',
    subcategorieen: [
      {
        naam: 'Eik',
        aromas: ['vanille', 'kokosnoot', 'toast', 'rook', 'cederhout', 'koffie', 'chocolade', 'karamel', 'toffee'],
      },
      {
        naam: 'Eik specerijen',
        aromas: ['kruidnagel', 'nootmuskaat', 'kaneel', 'dille (Amerikaans eik)'],
      },
    ],
  },
];

// === TERTIAIRE AROMA'S (van flesrijping) ===
export const tertiaireAromas: AromaCategorie[] = [
  {
    categorie: 'Rijpingsaromas',
    subcategorieen: [
      {
        naam: 'Gestoofde/Gedroogde fruit',
        aromas: ['gestoofde pruim', 'gedroogde vijg', 'marmelade', 'kandijfruit', 'compote'],
      },
      {
        naam: 'Aards & Dierlijk',
        aromas: ['leer', 'tabak', 'aarde', 'paddenstoel', 'bosgrond', 'truffel', 'wild', 'mest'],
      },
      {
        naam: 'Oxidatief',
        aromas: ['amandel', 'hazelnoot', 'walnoot', 'honing', 'karamel', 'toffee'],
      },
      {
        naam: 'Overig tertiair',
        aromas: ['gedroogde kruiden', 'koffie', 'chocolade', 'teer', 'petroleum', 'medicinaal', 'jodium'],
      },
    ],
  },
];

// === EN VERTALINGEN (NL string = ID, EN string = weergave) ===
// Opslag in localStorage altijd in NL — AromaPicker toont EN label wanneer lang==='en'

export const EN_AROMA_LABELS: Record<string, string> = {
  // Citrusfruit
  'citroen': 'lemon',
  'limoen': 'lime',
  'grapefruit': 'grapefruit',
  'sinaasappelschil': 'orange peel',
  'bergamot': 'bergamot',
  // Groen fruit
  'appel': 'apple',
  'peer': 'pear',
  'kruisbes': 'gooseberry',
  'druif': 'grape',
  // Steenfruit
  'perzik': 'peach',
  'abrikoos': 'apricot',
  'nectarine': 'nectarine',
  'pruim': 'plum',
  // Tropisch fruit
  'ananas': 'pineapple',
  'mango': 'mango',
  'passievrucht': 'passionfruit',
  'lychee': 'lychee',
  'meloen': 'melon',
  'banaan': 'banana',
  'guave': 'guava',
  // Rood fruit
  'aardbei': 'strawberry',
  'framboos': 'raspberry',
  'rode kers': 'red cherry',
  'cranberry': 'cranberry',
  'rode bes': 'red currant',
  'granaatappel': 'pomegranate',
  // Zwart fruit
  'zwarte bes': 'blackcurrant',
  'braambes': 'blackberry',
  'zwarte kers': 'black cherry',
  'bosbes': 'blueberry',
  'moerbes': 'mulberry',
  // Gedroogd fruit
  'vijg': 'fig',
  'pruimedant': 'prune',
  'rozijn': 'raisin',
  'dadel': 'date',
  'gedroogde abrikoos': 'dried apricot',
  // Bloemen
  'bloesem': 'blossom',
  'roos': 'rose',
  'viooltje': 'violet',
  'lavendel': 'lavender',
  'jasmijn': 'jasmine',
  'oranjebloesem': 'orange blossom',
  'acacia': 'acacia',
  'kamille': 'chamomile',
  // Kruidachtig
  'groene paprika': 'green pepper',
  'gras': 'grass',
  'tomatenblad': 'tomato leaf',
  'asperge': 'asparagus',
  'erwt': 'pea',
  // Kruiden
  'munt': 'mint',
  'eucalyptus': 'eucalyptus',
  'tijm': 'thyme',
  'rozemarijn': 'rosemary',
  'basilicum': 'basil',
  'oregano': 'oregano',
  'venkel': 'fennel',
  'dille': 'dill',
  // Specerijen
  'witte peper': 'white pepper',
  'zwarte peper': 'black pepper',
  'zoethout': 'liquorice',
  'kaneel': 'cinnamon',
  'kruidnagel': 'clove',
  'nootmuskaat': 'nutmeg',
  'gember': 'ginger',
  'anijs': 'anise',
  // Mineraal
  'vuursteen': 'flint',
  'natte steen': 'wet stone',
  'krijt': 'chalk',
  'leisteen': 'slate',
  'mineraal': 'mineral',
  // Autolyse / Gist
  'brood': 'bread',
  'brioche': 'brioche',
  'beschuit': 'cracker',
  'gist': 'yeast',
  'deeg': 'dough',
  'toast': 'toast',
  // MLF
  'boter': 'butter',
  'room': 'cream',
  'kaas': 'cheese',
  'yoghurt': 'yoghurt',
  // Eik
  'vanille': 'vanilla',
  'kokosnoot': 'coconut',
  'rook': 'smoke',
  'cederhout': 'cedar',
  'koffie': 'coffee',
  'chocolade': 'chocolate',
  'karamel': 'caramel',
  'toffee': 'toffee',
  // Eik specerijen
  'dille (Amerikaans eik)': 'dill (American oak)',
  // Gestoofde/Gedroogde fruit
  'gestoofde pruim': 'stewed plum',
  'gedroogde vijg': 'dried fig',
  'marmelade': 'marmalade',
  'kandijfruit': 'candied fruit',
  'compote': 'compote',
  // Aards & Dierlijk
  'leer': 'leather',
  'tabak': 'tobacco',
  'aarde': 'earth',
  'paddenstoel': 'mushroom',
  'bosgrond': 'forest floor',
  'truffel': 'truffle',
  'wild': 'game',
  'mest': 'manure',
  // Oxidatief
  'amandel': 'almond',
  'hazelnoot': 'hazelnut',
  'walnoot': 'walnut',
  'honing': 'honey',
  // Overig tertiair
  'gedroogde kruiden': 'dried herbs',
  'teer': 'tar',
  'petroleum': 'petrol',
  'medicinaal': 'medicinal',
  'jodium': 'iodine',
};

export const EN_CATEGORIE_LABELS: Record<string, string> = {
  'Fruit': 'Fruit',
  'Bloemen': 'Flowers',
  'Kruiden & Groenten': 'Herbs & Vegetables',
  'Specerijen': 'Spices',
  'Overig primair': 'Other primary',
  'Gistrijping': 'Yeast ageing',
  'Malolactische gisting': 'Malolactic fermentation',
  'Eikveroudering': 'Oak ageing',
  'Rijpingsaromas': 'Maturation aromas',
};

export const EN_SUBCATEGORIE_LABELS: Record<string, string> = {
  'Citrusfruit': 'Citrus fruit',
  'Groen fruit': 'Green fruit',
  'Steenfruit': 'Stone fruit',
  'Tropisch fruit': 'Tropical fruit',
  'Rood fruit': 'Red fruit',
  'Zwart fruit': 'Black fruit',
  'Gedroogd fruit': 'Dried fruit',
  'Bloemen': 'Flowers',
  'Kruidachtig': 'Herbaceous',
  'Kruiden': 'Herbs',
  'Specerijen': 'Spices',
  'Mineraal': 'Mineral',
  'Autolyse / Gist': 'Autolysis / Yeast',
  'MLF': 'MLF',
  'Eik': 'Oak',
  'Eik specerijen': 'Oak spices',
  'Gestoofde/Gedroogde fruit': 'Stewed/Dried fruit',
  'Aards & Dierlijk': 'Earthy & Animal',
  'Oxidatief': 'Oxidative',
  'Overig tertiair': 'Other tertiary',
};

// === Alle aroma's plat ===
export function getAllAromas(type: 'primair' | 'secundair' | 'tertiair'): string[] {
  const bron = type === 'primair' ? primaireAromas :
               type === 'secundair' ? secundaireAromas :
               tertiaireAromas;

  return bron.flatMap(cat =>
    cat.subcategorieen.flatMap(sub => sub.aromas)
  );
}

// Zoek aroma's
export function zoekAromas(zoekterm: string, type?: 'primair' | 'secundair' | 'tertiair'): string[] {
  const term = zoekterm.toLowerCase();
  const bronnen = type
    ? [type === 'primair' ? primaireAromas : type === 'secundair' ? secundaireAromas : tertiaireAromas]
    : [primaireAromas, secundaireAromas, tertiaireAromas];

  return bronnen.flatMap(bron =>
    bron.flatMap(cat =>
      cat.subcategorieen.flatMap(sub =>
        sub.aromas.filter(a => a.toLowerCase().includes(term))
      )
    )
  );
}
