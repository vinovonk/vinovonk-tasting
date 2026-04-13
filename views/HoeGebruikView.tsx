import { goBack } from '../router';

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
  fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
  textTransform: 'uppercase',
  letterSpacing: '-0.02em',
  margin: '0 0 1rem',
};

const h3Style: React.CSSProperties = {
  fontFamily: 'var(--font-headline)',
  fontWeight: 900,
  fontSize: '1rem',
  textTransform: 'uppercase',
  letterSpacing: '-0.01em',
  margin: '1.5rem 0 0.5rem',
};

const pStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  lineHeight: 1.7,
  color: 'var(--color-on-surface)',
  margin: '0 0 0.75rem',
};

const liStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  lineHeight: 1.7,
  color: 'var(--color-on-surface)',
  marginBottom: '0.375rem',
};

const calloutStyle: React.CSSProperties = {
  border: '4px solid var(--color-border)',
  background: 'var(--color-surface)',
  padding: '1rem 1.25rem',
  fontFamily: 'var(--font-body)',
  fontSize: '0.85rem',
  lineHeight: 1.6,
  color: 'var(--color-on-surface)',
  marginTop: '1rem',
};

const badgeStyle = (color: string): React.CSSProperties => ({
  display: 'inline-block',
  padding: '0.2rem 0.5rem',
  fontFamily: 'var(--font-body)',
  fontSize: '0.72rem',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  background: color,
  color: '#fff',
  marginRight: '0.5rem',
});

export function HoeGebruikView({ lang = 'nl' }: Props) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem var(--gap)' }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem', borderBottom: '4px solid var(--color-border)', paddingBottom: '1.5rem' }}>
        <button
          onClick={goBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-gray)', padding: 0, marginBottom: '1rem', display: 'block' }}
        >
          ← Terug
        </button>
        <span style={labelStyle}>Handleiding</span>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', margin: '0 0 0.75rem' }}>
          Hoe gebruik je dit?
        </h1>
        <p style={{ ...pStyle, fontSize: '1rem', color: 'var(--color-gray)', margin: 0 }}>
          Een kort overzicht van de proefmethodiek, de formulieren en de biodynamische kalender.
        </p>
      </div>

      {/* 1. De sessie-workflow */}
      <section>
        <span style={labelStyle}>Stap 1</span>
        <h2 style={h2Style}>Een proef­sessie starten</h2>
        <p style={pStyle}>
          Elke proef begint met een <strong>sessie</strong> — een moment waarop je één of meerdere flessen naast elkaar
          beoordeelt. Denk aan een wijnklas, een blind tasting met vrienden, of een avond dat je gewoon bijhoudt wat je drinkt.
        </p>
        <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
          <li style={liStyle}><strong>Nieuwe sessie</strong> — geef de sessie een naam (bijv. "Bordeaux blind, april 2026") en kies een datum.</li>
          <li style={liStyle}><strong>Fles toevoegen</strong> — voeg per fles een notitie toe. Kies het dranktype: wijn, champagne, spirits of alcoholvrij.</li>
          <li style={liStyle}><strong>Formulier invullen</strong> — doorloop het twee-fase formulier: eerst info, dan proeven.</li>
          <li style={liStyle}><strong>Opslaan</strong> — alles blijft bewaard in je browser (localStorage). Geen account, geen server.</li>
        </ol>
        <div style={calloutStyle}>
          <strong>Tip:</strong> Je kunt een sessie ook tussentijds opslaan en later verder gaan.
          Alle data staat lokaal in je browser — exporteer regelmatig via Instellingen → JSON exporteren.
        </div>
      </section>

      {/* 2. Welk formulier? */}
      <section style={sectionStyle}>
        <span style={labelStyle}>Stap 2</span>
        <h2 style={h2Style}>Welk formulier voor welke situatie?</h2>

        <h3 style={h3Style}>
          <span style={badgeStyle('#8b0018')}>Wijn</span>
          WSET-methodiek
        </h3>
        <p style={pStyle}>
          Het wijnformulier volgt de <strong>WSET Systematic Approach to Tasting® (SAT)</strong> — de meest gebruikte
          proefmethode ter wereld, ontwikkeld door het Wine & Spirit Education Trust.
          Ideaal als je gestructureerd wil leren proeven of notities wil vastleggen die je later kunt vergelijken.
        </p>
        <p style={pStyle}>
          Het formulier loopt via vier tabbladen: <em>Uiterlijk → Neus → Gehemelte → Conclusies</em>.
          Je sluit af met een kwaliteitsoordeel op de BLIC-schaal (Balans, Lengte, Intensiteit, Complexiteit)
          en een drinkadvies.
        </p>
        <ul style={{ paddingLeft: '1.25rem', margin: '0 0 0.75rem' }}>
          <li style={liStyle}><strong>Info-fase:</strong> wijnnaam, producent, druivenras, regio, jaargang, prijs.</li>
          <li style={liStyle}><strong>Proeven-fase:</strong> visueel, neus (incl. aromapicker), gehemelte, conclusies + details voor publicatie.</li>
        </ul>

        <h3 style={h3Style}>
          <span style={badgeStyle('#6b21a8')}>Champagne</span>
          Mousse &amp; autolytisch karakter
        </h3>
        <p style={pStyle}>
          Het champagneformulier voegt specifieke parameters toe aan de WSET-basis:
          belgrootte, belpersistentie, moussekwaliteit, autolytisch karakter (brioche, gist, toast)
          en oxidatief karakter. Geschikt voor alle mousserende wijnen (cava, crémant, prosecco).
        </p>

        <h3 style={h3Style}>
          <span style={badgeStyle('#92400e')}>Spirits</span>
          Destillaat-specifiek
        </h3>
        <p style={pStyle}>
          Het spiritsformulier heeft velden voor type spirit (whisky, cognac, gin, rum etc.),
          leeftijd, distilleerderij en een aangepaste aromapicker met destillaat-aromas.
          Tannine en mousse zijn niet relevant — in plaats daarvan: warmte en mondgevoel.
        </p>

        <h3 style={h3Style}>
          <span style={badgeStyle('#115e59')}>Alcoholvrij</span>
          Vergelijking met alcoholische variant
        </h3>
        <p style={pStyle}>
          Voor alcoholvrije wijnen, spirits, bier, kombucha, thee en mocktails.
          Uniek veld: <em>vergelijking met alcoholische variant</em> — wat mist er, wat is beter?
        </p>

        <h3 style={h3Style}>
          Generiek formulier
        </h3>
        <p style={pStyle}>
          Voor bier, sake, cider of alles wat niet in de andere categorieën past.
          Eenvoudiger opzet met de kernparameters: uiterlijk, neus, mondgevoel, kwaliteit.
        </p>
      </section>

      {/* 3. De aromapicker */}
      <section style={sectionStyle}>
        <span style={labelStyle}>Feature</span>
        <h2 style={h2Style}>De aromapicker</h2>
        <p style={pStyle}>
          In het wijn- en champagneformulier kun je aromas selecteren via de picker.
          Aromas zijn gegroepeerd in categorieën (primair fruit, secundair fermentatie, tertiair oxidatief/rijping).
          Je kunt ook eigen aromas typen en toevoegen.
        </p>
        <p style={pStyle}>
          Bij het gehemelte worden de neusaromas alvast voorgeselecteerd — je kunt ze bevestigen of wijzigen.
          Aromas die je op de neus noemde maar niet op het gehemelte, vallen automatisch weg.
        </p>
      </section>

      {/* 4. Biodynamische kalender */}
      <section style={sectionStyle}>
        <span style={labelStyle}>Feature</span>
        <h2 style={h2Style}>De biodynamische kalender</h2>
        <p style={pStyle}>
          De biodynamische wijnkalender is gebaseerd op de agrarische kalender van <strong>Maria Thun</strong>
          (later uitgewerkt door o.a. Cees van Casteren MW). Het idee: de positie van de maan langs de dierenriem
          beïnvloedt hoe wijn smaakt.
        </p>

        <h3 style={h3Style}>De vier dagtypes</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
          {[
            { kleur: '#166534', bg: '#f0fdf4', border: '#86efac', naam: 'Fruitdag', emoji: '🍇', tekst: 'Optimaal voor proeven. Wijn is open, aromatisch en expressief.' },
            { kleur: '#6b21a8', bg: '#faf5ff', border: '#d8b4fe', naam: 'Bloem­dag', emoji: '🌸', tekst: 'Aangenaam voor fris­se, bloemige wijnen. Aromas goed.' },
            { kleur: '#115e59', bg: '#f0fdfa', border: '#5eead4', naam: 'Blad­dag', emoji: '🌿', tekst: 'Wijn kan groenig, zuur of vlak smaken. Minder ideaal.' },
            { kleur: '#92400e', bg: '#fffbeb', border: '#fcd34d', naam: 'Wortel­dag', emoji: '🌱', tekst: 'Moeilijkste proefsdag. Wijn vaak gesloten en tannineus.' },
          ].map(d => (
            <div key={d.naam} style={{ border: `4px solid ${d.border}`, background: d.bg, padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span style={{ fontSize: '1.2rem' }}>{d.emoji}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.78rem', color: d.kleur, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{d.naam}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: d.kleur, lineHeight: 1.5 }}>{d.tekst}</span>
            </div>
          ))}
        </div>

        <p style={pStyle}>
          De badge op het dashboard toont het dagtype van vandaag. Klik erop voor de uitgebreide kalenderweergave
          met een 14-dagenkalender, maanfase-indicator en uitleg per dagtype.
        </p>
        <div style={calloutStyle}>
          <strong>Let op:</strong> De biodynamische kalender is een hulpmiddel, geen wet.
          Wetenschappelijk bewijs is beperkt en omstreden. Gebruik het als een extra dimensie bij je proefnotities,
          niet als verklaring voor kwaliteit.
        </div>
      </section>

      {/* 5. Archief & export */}
      <section style={sectionStyle}>
        <span style={labelStyle}>Feature</span>
        <h2 style={h2Style}>Archief &amp; export</h2>
        <p style={pStyle}>
          Via <strong>Archief</strong> zie je al je proefnotities op één plek, doorzoekbaar op naam en filterbaar
          op dranktype en score. Klik op een notitie om hem te bewerken.
        </p>
        <p style={pStyle}>
          Via <strong>Instellingen</strong> kun je:
        </p>
        <ul style={{ paddingLeft: '1.25rem', margin: '0 0 0.75rem' }}>
          <li style={liStyle}><strong>Exporteren als JSON</strong> — handig als backup of om over te zetten naar een ander apparaat.</li>
          <li style={liStyle}><strong>Importeren vanuit JSON</strong> — laad een eerder geëxporteerd bestand terug.</li>
          <li style={liStyle}><strong>Alles wissen</strong> — verwijdert alle sessies definitief uit je browser.</li>
        </ul>
        <div style={calloutStyle}>
          <strong>Privacy:</strong> Alle data staat uitsluitend in jouw browser.
          Er wordt niets naar een server gestuurd. Als je de browsercache wist, gaan de notities verloren.
          Exporteer daarom regelmatig.
        </div>
      </section>

      {/* Footer nav */}
      <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '4px solid var(--color-border)' }}>
        <button
          onClick={goBack}
          style={{ background: 'none', border: '2px solid var(--color-border)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gray)', padding: '0.5rem 1rem' }}
        >
          ← Terug naar dashboard
        </button>
      </div>
    </div>
  );
}
