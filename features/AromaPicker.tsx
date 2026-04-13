import { useState } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { primaireAromas, secundaireAromas, tertiaireAromas, type AromaCategorie } from '../data/aroma-lexicon';

interface AromaPickerProps {
  primair: string[];
  secundair: string[];
  tertiair: string[];
  onPrimairChange: (aromas: string[]) => void;
  onSecundairChange: (aromas: string[]) => void;
  onTertiairChange: (aromas: string[]) => void;
}

const SECTION_LABEL = {
  primair: 'Primary',
  secundair: 'Secondary',
  tertiair: 'Tertiary',
};

const BADGE_COLORS = {
  primair: { bg: 'var(--color-primary)', color: '#fff', border: 'var(--color-primary)' },
  secundair: { bg: 'var(--color-surface-high)', color: 'var(--color-on-surface)', border: 'var(--color-border)' },
  tertiair: { bg: 'transparent', color: 'var(--color-on-surface)', border: 'var(--color-border)' },
};

export function AromaPicker({
  primair, secundair, tertiair,
  onPrimairChange, onSecundairChange, onTertiairChange,
}: AromaPickerProps) {
  const [zoekterm, setZoekterm] = useState('');
  const [customAroma, setCustomAroma] = useState('');

  const alle = [...primair, ...secundair, ...tertiair];

  const labelStyle = {
    fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.68rem',
    letterSpacing: '0.12em', textTransform: 'uppercase' as const,
    color: 'var(--color-on-surface)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <span style={labelStyle}>Aroma & flavour characteristics</span>

      {/* Geselecteerde aroma's */}
      {alle.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxHeight: '120px', overflowY: 'auto', padding: '0.5rem', border: '2px solid var(--color-border)', background: 'var(--color-surface)' }}>
          {(['primair', 'secundair', 'tertiair'] as const).map((type) => {
            const lijst = type === 'primair' ? primair : type === 'secundair' ? secundair : tertiair;
            const onChange = type === 'primair' ? onPrimairChange : type === 'secundair' ? onSecundairChange : onTertiairChange;
            const c = BADGE_COLORS[type];
            return lijst.map((a) => (
              <span key={`${type}-${a}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                padding: '0.2rem 0.4rem', fontFamily: 'var(--font-body)', fontSize: '0.72rem',
                fontWeight: 600, background: c.bg, color: c.color, border: `2px solid ${c.border}`,
              }}>
                {a}
                <button type="button" onClick={() => onChange(lijst.filter((x) => x !== a))}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: 'inherit', opacity: 0.7 }}
                  aria-label={`${a} verwijderen`}
                >
                  <X size={11} />
                </button>
              </span>
            ));
          })}
        </div>
      )}

      {/* Zoekbalk */}
      <div style={{ position: 'relative' }}>
        <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gray)' }} />
        <input
          placeholder="Zoek aroma..."
          value={zoekterm}
          onChange={(e) => setZoekterm(e.target.value)}
          style={{
            width: '100%', padding: '0.6rem 0.75rem 0.6rem 2.25rem',
            fontFamily: 'var(--font-body)', fontSize: '0.9rem',
            border: '4px solid var(--color-border)', background: 'var(--color-white)',
            color: 'var(--color-on-surface)', outline: 'none', boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Primary / Secondary / Tertiary */}
      {(['primair', 'secundair', 'tertiair'] as const).map((type) => {
        const categorieen = type === 'primair' ? primaireAromas : type === 'secundair' ? secundaireAromas : tertiaireAromas;
        const geselecteerd = type === 'primair' ? primair : type === 'secundair' ? secundair : tertiair;
        const onChange = type === 'primair' ? onPrimairChange : type === 'secundair' ? onSecundairChange : onTertiairChange;

        return (
          <div key={type}>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gray)', marginBottom: '0.5rem' }}>
              {SECTION_LABEL[type]}
            </p>
            <AromaLijst
              categorieen={categorieen}
              geselecteerd={geselecteerd}
              onChange={onChange}
              zoekterm={zoekterm}
            />
          </div>
        );
      })}

      {/* Custom aroma */}
      <div style={{ display: 'flex', gap: '4px' }}>
        <input
          placeholder="Voeg eigen aroma toe..."
          value={customAroma}
          onChange={(e) => setCustomAroma(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && customAroma.trim()) {
              e.preventDefault();
              onPrimairChange([...primair, customAroma.trim()]);
              setCustomAroma('');
            }
          }}
          style={{
            flex: 1, padding: '0.6rem 0.75rem', fontFamily: 'var(--font-body)', fontSize: '0.9rem',
            border: '4px solid var(--color-border)', background: 'var(--color-white)',
            color: 'var(--color-on-surface)', outline: 'none',
          }}
        />
        <button
          type="button"
          onClick={() => {
            if (customAroma.trim()) {
              onPrimairChange([...primair, customAroma.trim()]);
              setCustomAroma('');
            }
          }}
          style={{
            padding: '0.6rem 0.875rem', background: 'var(--color-primary)', color: '#fff',
            border: '4px solid var(--color-border)', cursor: 'pointer', display: 'flex', alignItems: 'center',
          }}
          aria-label="Aroma toevoegen"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

function AromaLijst({
  categorieen, geselecteerd, onChange, zoekterm,
}: {
  categorieen: AromaCategorie[];
  geselecteerd: string[];
  onChange: (aromas: string[]) => void;
  zoekterm: string;
}) {
  const toggle = (aroma: string) =>
    geselecteerd.includes(aroma)
      ? onChange(geselecteerd.filter((a) => a !== aroma))
      : onChange([...geselecteerd, aroma]);

  const term = zoekterm.toLowerCase();

  const gefilterd = categorieen.map((cat) => ({
    ...cat,
    subcategorieen: cat.subcategorieen.map((sub) => ({
      ...sub,
      aromas: sub.aromas.filter((a) => !term || a.toLowerCase().includes(term)),
    })).filter((sub) => sub.aromas.length > 0),
  })).filter((cat) => cat.subcategorieen.length > 0);

  if (gefilterd.length === 0) return <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-gray)' }}>Geen aromas gevonden</p>;

  return (
    <div style={{ border: '4px solid var(--color-border)', padding: '0.75rem', background: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {gefilterd.map((cat) => (
        <div key={cat.categorie}>
          <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gray)', marginBottom: '0.5rem' }}>
            {cat.categorie}
          </h4>
          {cat.subcategorieen.map((sub) => (
            <div key={sub.naam} style={{ marginBottom: '0.5rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-gray)', marginBottom: '0.375rem' }}>{sub.naam}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                {sub.aromas.map((aroma) => {
                  const sel = geselecteerd.includes(aroma);
                  return (
                    <button
                      key={aroma}
                      type="button"
                      onClick={() => toggle(aroma)}
                      style={{
                        fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
                        padding: '0.3rem 0.6rem', cursor: 'pointer',
                        background: sel ? 'var(--color-primary)' : 'var(--color-white)',
                        color: sel ? '#fff' : 'var(--color-on-surface)',
                        border: `2px solid ${sel ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        transition: 'background 100ms, color 100ms',
                      }}
                    >
                      {aroma}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
