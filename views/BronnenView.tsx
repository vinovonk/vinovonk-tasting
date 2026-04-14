import { navigate } from '../router';

interface Props {
  lang?: 'nl' | 'en';
}

const sectionStyle: React.CSSProperties = {
  borderTop: '4px solid var(--color-border)',
  paddingTop: '2rem',
  marginTop: '2rem',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontWeight: 700,
  fontSize: '0.68rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--color-primary)',
  display: 'block',
  marginBottom: '0.5rem',
};

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--font-headline)',
  fontWeight: 900,
  fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
  textTransform: 'uppercase',
  letterSpacing: '-0.02em',
  margin: '0 0 0.75rem',
};

const pStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.875rem',
  lineHeight: 1.7,
  color: 'var(--color-on-surface)',
  margin: '0 0 0.75rem',
};

const mutedStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.78rem',
  lineHeight: 1.6,
  color: 'var(--color-gray)',
  margin: '0 0 0.5rem',
};

const creditCard = (color: string): React.CSSProperties => ({
  border: `4px solid ${color}`,
  borderLeft: `8px solid ${color}`,
  padding: '1rem 1.25rem',
  marginBottom: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.35rem',
});

const CONTENT = {
  nl: {
    back: '← Terug',
    backDashboard: '← Terug naar dashboard',
    label: 'Bronnen & Methode',
    title: 'Bronvermeldingen',
    subtitle: 'Deze app is gebouwd op gevestigde proefmethodieken en wetenschappelijke berekeningen. Hieronder vind je de bronnen en inspiratie.',

    methodiekLabel: 'Proefsystemen',
    methodiekTitle: 'Proefmethodieken',

    wsetName: 'WSET Systematic Approach to Tasting® (SAT)',
    wsetDesc: 'Basis voor het wijnformulier. De SAT-methode — Uiterlijk, Neus, Gehemelte, Conclusies — is de meest gebruikte gestructureerde proefmethode ter wereld.',
    wsetOrg: 'Wine & Spirit Education Trust (WSET) — wsetglobal.com',
    wsetNote: 'Gebruik van de SAT-structuur voor educatieve doeleinden. Geen officiële WSET-toets of certificering. WSET® is een geregistreerd handelsmerk van Wine & Spirit Education Trust.',

    civcName: 'CIVC Champagne Proefmethodiek',
    civcDesc: 'Basis voor het champagneformulier. Parameters als belgrootte, belpersistentie, moussekwaliteit, autolytisch karakter en dosage zijn gebaseerd op de proefterminologie van het Comité Champagne.',
    civcOrg: 'Comité Interprofessionnel du vin de Champagne (CIVC) — champagne.fr',

    bioLabel: 'Biodynamische Kalender',
    bioTitle: 'Biodynamische referenties',

    thunName: 'Maria Thun — Biodynamische Kalender',
    thunDesc: 'Basis voor de dagtype-berekening (fruit/bloem/blad/wortel). Maria Thun (1922–2012) deed jarenlang veldproeven naar de invloed van de maanpositie op gewassen. Haar methode wordt inmiddels door wijnmakers en sommeliers wereldwijd gebruikt.',
    thunOrg: 'Jaarlijkse publicatie: "Werken met de Kosmische Ritmen" / "Aussaattage" — mariathun.com',

    meeusName: 'Jean Meeus — Astronomical Algorithms',
    meeusDesc: 'Basis voor de siderische maanpositie-berekening in de biodynamische kalender. Het algoritme in biodynamisch.ts volgt Meeus\' vereenvoudigde methode (hoofdstuk 47) met ayanamsa-correctie voor het tropisch↔siderisch verschil.',
    meeusOrg: 'Jean Meeus, "Astronomical Algorithms", Willmann-Bell, 1991/1998. ISBN 978-0943396613.',

    cvcName: 'Cees van Casteren MW',
    cvdDesc: 'Master of Wine en BBC wine presenter. Van Casteren populariseerde het gebruik van de biodynamische kalender bij serieuze wijnproeverijen in de Nederlandse en internationale wijnwereld. Zijn aanbeveling om geen wijnen te beoordelen op worteldagen is in de app expliciet verwerkt.',
    cvdOrg: 'Inspiratie en toepassing in wijnprofessie.',

    openSourceLabel: 'Open Source',
    openSourceTitle: 'Gebruikte bibliotheken',
    openSourceDesc: 'Deze app is gebouwd met de volgende open-source software:',
    libraries: [
      { name: 'React 19', license: 'MIT', desc: 'UI-library' },
      { name: 'Zod', license: 'MIT', desc: 'Schema-validatie' },
      { name: 'Sonner', license: 'MIT', desc: 'Toast-notificaties' },
      { name: 'Radix UI', license: 'MIT', desc: 'Toegankelijke UI-primitieven' },
      { name: 'date-fns', license: 'MIT', desc: 'Datumbehandeling' },
      { name: 'lucide-react', license: 'ISC', desc: 'Iconen' },
      { name: 'uuid', license: 'MIT', desc: 'Unieke ID-generatie' },
      { name: 'clsx', license: 'MIT', desc: 'CSS-klasse-utilities' },
    ],

    disclaimerLabel: 'Disclaimer',
    disclaimerText: 'Deze app is een onafhankelijk, niet-commercieel project. Alle handelsnamen en methodes zijn eigendom van hun respectievelijke rechthebbenden. Geen van de genoemde organisaties heeft deze app onderschreven of goedgekeurd.',
  },
  en: {
    back: '← Back',
    backDashboard: '← Back to dashboard',
    label: 'Sources & Method',
    title: 'Attributions',
    subtitle: 'This app is built on established tasting methodologies and scientific calculations. Below you will find the sources and inspiration.',

    methodiekLabel: 'Tasting Systems',
    methodiekTitle: 'Tasting Methodologies',

    wsetName: 'WSET Systematic Approach to Tasting® (SAT)',
    wsetDesc: 'Foundation for the wine form. The SAT method — Appearance, Nose, Palate, Conclusions — is the most widely used structured tasting method in the world.',
    wsetOrg: 'Wine & Spirit Education Trust (WSET) — wsetglobal.com',
    wsetNote: 'The SAT structure is used here for educational purposes. This is not an official WSET examination or certification. WSET® is a registered trademark of Wine & Spirit Education Trust.',

    civcName: 'CIVC Champagne Tasting Methodology',
    civcDesc: 'Foundation for the champagne form. Parameters such as bubble size, bubble persistence, mousse quality, autolytic character and dosage are based on the tasting terminology of the Comité Champagne.',
    civcOrg: 'Comité Interprofessionnel du vin de Champagne (CIVC) — champagne.fr',

    bioLabel: 'Biodynamic Calendar',
    bioTitle: 'Biodynamic References',

    thunName: 'Maria Thun — Biodynamic Calendar',
    thunDesc: 'Foundation for the day-type calculation (fruit/flower/leaf/root). Maria Thun (1922–2012) conducted years of field trials on the influence of the moon\'s position on crops. Her method is now used by winemakers and sommeliers worldwide.',
    thunOrg: 'Annual publication: "Aussaattage" / "Working with the Stars" — mariathun.com',

    meeusName: 'Jean Meeus — Astronomical Algorithms',
    meeusDesc: 'Foundation for the sidereal moon position calculation in the biodynamic calendar. The algorithm in biodynamisch.ts follows Meeus\' simplified method (chapter 47) with ayanamsa correction for the tropical↔sidereal difference.',
    meeusOrg: 'Jean Meeus, "Astronomical Algorithms", Willmann-Bell, 1991/1998. ISBN 978-0943396613.',

    cvcName: 'Cees van Casteren MW',
    cvdDesc: 'Master of Wine and BBC wine presenter. Van Casteren has popularised the use of the biodynamic calendar in serious wine tasting in the Dutch and international wine world. His recommendation to avoid assessing wines on root days is explicitly incorporated in the app.',
    cvdOrg: 'Inspiration and application in wine profession.',

    openSourceLabel: 'Open Source',
    openSourceTitle: 'Libraries used',
    openSourceDesc: 'This app is built with the following open-source software:',
    libraries: [
      { name: 'React 19', license: 'MIT', desc: 'UI library' },
      { name: 'Zod', license: 'MIT', desc: 'Schema validation' },
      { name: 'Sonner', license: 'MIT', desc: 'Toast notifications' },
      { name: 'Radix UI', license: 'MIT', desc: 'Accessible UI primitives' },
      { name: 'date-fns', license: 'MIT', desc: 'Date handling' },
      { name: 'lucide-react', license: 'ISC', desc: 'Icons' },
      { name: 'uuid', license: 'MIT', desc: 'Unique ID generation' },
      { name: 'clsx', license: 'MIT', desc: 'CSS class utilities' },
    ],

    disclaimerLabel: 'Disclaimer',
    disclaimerText: 'This app is an independent, non-commercial project. All trade names and methods are the property of their respective owners. None of the organisations mentioned have endorsed or approved this app.',
  },
};

export function BronnenView({ lang = 'nl' }: Props) {
  const C = CONTENT[lang];
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem var(--gap)' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem', borderBottom: '4px solid var(--color-border)', paddingBottom: '1.5rem' }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-gray)', padding: 0, marginBottom: '1rem', display: 'block' }}
        >
          {C.back}
        </button>
        <span style={labelStyle}>{C.label}</span>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', margin: '0 0 0.75rem', fontFamily: 'var(--font-headline)', fontWeight: 900, textTransform: 'uppercase' }}>
          {C.title}
        </h1>
        <p style={{ ...pStyle, fontSize: '1rem', color: 'var(--color-gray)', margin: 0 }}>
          {C.subtitle}
        </p>
      </div>

      {/* Proefmethodieken */}
      <section>
        <span style={labelStyle}>{C.methodiekLabel}</span>
        <h2 style={h2Style}>{C.methodiekTitle}</h2>

        <div style={creditCard('#8b0018')}>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem' }}>{C.wsetName}</span>
          <p style={pStyle}>{C.wsetDesc}</p>
          <p style={mutedStyle}><strong>{C.wsetOrg}</strong></p>
          <p style={{ ...mutedStyle, borderLeft: '4px solid var(--color-border)', paddingLeft: '0.75rem', margin: 0 }}>{C.wsetNote}</p>
        </div>

        <div style={creditCard('#6b21a8')}>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem' }}>{C.civcName}</span>
          <p style={pStyle}>{C.civcDesc}</p>
          <p style={mutedStyle}><strong>{C.civcOrg}</strong></p>
        </div>
      </section>

      {/* Biodynamisch */}
      <section style={sectionStyle}>
        <span style={labelStyle}>{C.bioLabel}</span>
        <h2 style={h2Style}>{C.bioTitle}</h2>

        <div style={creditCard('#166534')}>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem' }}>{C.thunName}</span>
          <p style={pStyle}>{C.thunDesc}</p>
          <p style={mutedStyle}><strong>{C.thunOrg}</strong></p>
        </div>

        <div style={creditCard('#1e40af')}>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem' }}>{C.meeusName}</span>
          <p style={pStyle}>{C.meeusDesc}</p>
          <p style={mutedStyle}><strong>{C.meeusOrg}</strong></p>
        </div>

        <div style={creditCard('#92400e')}>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem' }}>{C.cvcName}</span>
          <p style={pStyle}>{C.cvdDesc}</p>
          <p style={mutedStyle}>{C.cvdOrg}</p>
        </div>
      </section>

      {/* Open source */}
      <section style={sectionStyle}>
        <span style={labelStyle}>{C.openSourceLabel}</span>
        <h2 style={h2Style}>{C.openSourceTitle}</h2>
        <p style={pStyle}>{C.openSourceDesc}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '4px' }}>
          {C.libraries.map(lib => (
            <div key={lib.name} style={{ border: '2px solid var(--color-border)', padding: '0.6rem 0.75rem' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.82rem' }}>{lib.name}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-gray)' }}>{lib.desc} — {lib.license}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section style={sectionStyle}>
        <span style={labelStyle}>{C.disclaimerLabel}</span>
        <p style={{ ...mutedStyle, borderLeft: '4px solid var(--color-border)', paddingLeft: '0.75rem' }}>{C.disclaimerText}</p>
      </section>

      {/* Footer nav */}
      <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '4px solid var(--color-border)' }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: 'none', border: '2px solid var(--color-border)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gray)', padding: '0.5rem 1rem' }}
        >
          {C.backDashboard}
        </button>
      </div>
    </div>
  );
}
