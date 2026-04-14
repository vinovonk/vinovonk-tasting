// Champagne tasting methodology reference:
// CIVC — Comité Interprofessionnel du vin de Champagne. champagne.fr
// Parameters: mousse, bubble size/persistence, autolytic character, dosage classification.
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { X, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { ButtonGroup } from '../ui/ButtonGroup';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { AutocompleteInput } from '../features/AutocompleteInput';
import {
  cuveeTypeOpties, stijlOpties, dosageOpties, producerTypeOpties, classificatieOpties,
  champagneDruivenRassen, zoekChampagneProducenten, zoekChampagneVillages,
  champagneKleurOpties, belGrootteOpties, belPersistentieOpties, mousseKwaliteitOpties,
  champagneHelderheidOpties, champagneIntensiteitOpties,
  autolytischKarakterOpties, oxidatiefKarakterOpties, champagneAromaCategorieen,
  champagneAanvalOpties, champagneZoetheidOpties, champagneZuurgraadOpties,
  champagneBodyOpties, champagneAfdronkOpties, champagneComplexiteitOpties,
  champagneKwaliteitOpties, champagneDrinkbaarheidOpties,
} from '../data/champagne-options';
import type { ChampagneTasting } from '../types';
import { createEmptyChampagneTasting } from '../types';
import { FL, type Lang } from '../lib/form-labels';

export interface ChampagneFormHandle {
  getData: () => ChampagneTasting;
  mergeAIData: (data: Partial<ChampagneTasting>) => void;
}

interface Props {
  initialData?: ChampagneTasting;
  persoonlijkeNotitie?: string;
  score?: number;
  onSave: (data: ChampagneTasting, notitie?: string, score?: number) => void;
  fase?: 'info' | 'proeven';
  lang?: Lang;
}

const labelStyle = { fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--color-on-surface)' };

const pillStyle = (sel: boolean) => ({
  fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
  padding: '0.3rem 0.6rem', cursor: 'pointer',
  background: sel ? 'var(--color-primary)' : 'var(--color-white)',
  color: sel ? '#fff' : 'var(--color-on-surface)',
  border: `2px solid ${sel ? 'var(--color-primary)' : 'var(--color-border)'}`,
});

function ChampagneAromaPicker({ geselecteerd, onChange, neusAromas }: {
  geselecteerd: string[]; onChange: (v: string[]) => void; neusAromas?: string[];
}) {
  const [customInput, setCustomInput] = useState('');
  const toggle = (a: string) => geselecteerd.includes(a) ? onChange(geselecteerd.filter(x => x !== a)) : onChange([...geselecteerd, a]);
  const addCustom = () => {
    const t = customInput.trim();
    if (t && !geselecteerd.includes(t)) onChange([...geselecteerd, t]);
    setCustomInput('');
  };

  const neusSet = new Set(neusAromas ?? []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {neusAromas && neusAromas.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingBottom: '0.75rem', borderBottom: '2px dashed var(--color-border)' }}>
          <span style={{ ...labelStyle, fontSize: '0.6rem' }}>Van neus</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {neusAromas.map(a => (
              <button key={a} type="button" onClick={() => toggle(a)}
                style={{ ...pillStyle(geselecteerd.includes(a)), opacity: geselecteerd.includes(a) ? 1 : 0.4 }}>
                {a}
              </button>
            ))}
          </div>
        </div>
      )}
      {champagneAromaCategorieen.map(cat => (
        <div key={cat.categorie} style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <span style={{ ...labelStyle, fontSize: '0.6rem', color: 'var(--color-gray)' }}>{cat.categorie}</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
            {cat.aromas.map(a => (
              <button key={a} type="button" onClick={() => toggle(a)} style={pillStyle(geselecteerd.includes(a))}>{a}</button>
            ))}
          </div>
        </div>
      ))}
      {geselecteerd.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', paddingTop: '0.5rem', borderTop: '2px solid var(--color-border)' }}>
          {geselecteerd.map(a => (
            <span key={a} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', padding: '0.2rem 0.4rem', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, background: neusSet.has(a) ? 'var(--color-surface-high)' : 'var(--color-primary)', color: neusSet.has(a) ? 'var(--color-on-surface)' : '#fff', border: `2px solid ${neusSet.has(a) ? 'var(--color-border)' : 'var(--color-primary)'}` }}>
              {a}
              <button type="button" onClick={() => toggle(a)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', display: 'flex' }}><X size={10} /></button>
            </span>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: '4px' }}>
        <input placeholder="Eigen aroma toevoegen..." value={customInput} onChange={e => setCustomInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustom(); } }}
          style={{ flex: 1, padding: '0.4rem 0.6rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', border: '4px solid var(--color-border)', background: 'var(--color-white)', color: 'var(--color-on-surface)', outline: 'none' }} />
        <button type="button" onClick={addCustom} style={{ padding: '0.4rem 0.75rem', background: 'var(--color-primary)', color: '#fff', border: '4px solid var(--color-border)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Plus size={14} /></button>
      </div>
    </div>
  );
}

function DruivenRassenInput({ druiven, onChange }: { druiven: string[]; onChange: (v: string[]) => void }) {
  const [custom, setCustom] = useState('');
  const toggle = (r: string) => druiven.includes(r) ? onChange(druiven.filter(d => d !== r)) : onChange([...druiven, r]);
  const addCustom = () => { const t = custom.trim(); if (t && !druiven.includes(t)) onChange([...druiven, t]); setCustom(''); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
        {champagneDruivenRassen.map(r => (
          <button key={r} type="button" onClick={() => toggle(r)} style={pillStyle(druiven.includes(r))}>{r}</button>
        ))}
      </div>
      {druiven.filter(d => !champagneDruivenRassen.includes(d)).length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {druiven.filter(d => !champagneDruivenRassen.includes(d)).map(r => (
            <span key={r} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', padding: '0.2rem 0.4rem', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, background: 'var(--color-surface-high)', color: 'var(--color-on-surface)', border: '2px solid var(--color-border)' }}>
              {r}<button type="button" onClick={() => toggle(r)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', display: 'flex' }}><X size={10} /></button>
            </span>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: '4px' }}>
        <input placeholder="Ander ras..." value={custom} onChange={e => setCustom(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustom(); } }}
          style={{ flex: 1, padding: '0.4rem 0.6rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', border: '4px solid var(--color-border)', background: 'var(--color-white)', color: 'var(--color-on-surface)', outline: 'none' }} />
        <button type="button" onClick={addCustom} style={{ padding: '0.4rem 0.75rem', background: 'var(--color-surface-high)', color: 'var(--color-on-surface)', border: '4px solid var(--color-border)', cursor: 'pointer' }}>+</button>
      </div>
    </div>
  );
}

const TABS_PROEVEN = ['visueel', 'neus', 'mondgevoel', 'conclusie'];

export const ChampagneForm = forwardRef<ChampagneFormHandle, Props>(
  function ChampagneForm({ initialData, persoonlijkeNotitie: initNotitie, score: initScore, onSave, fase = 'info', lang = 'nl' }, ref) {
    const [data, setData] = useState<ChampagneTasting>(initialData ?? createEmptyChampagneTasting());
    const [notitie, setNotitie] = useState(initNotitie ?? '');
    const [score, setScore] = useState<number | undefined>(initScore);
    const [tab, setTab] = useState('visueel');
    const L = FL[lang];

    useImperativeHandle(ref, () => ({
      getData: () => data,
      mergeAIData: (ai) => setData(prev => ({ ...prev, ...ai, visueel: { ...prev.visueel, ...(ai.visueel ?? {}) }, neus: { ...prev.neus, ...(ai.neus ?? {}) }, mondgevoel: { ...prev.mondgevoel, ...(ai.mondgevoel ?? {}) }, conclusie: { ...prev.conclusie, ...(ai.conclusie ?? {}) } })),
    }), [data]);

    // Auto-sync neus aromas → palate on first open
    useEffect(() => {
      if (tab === 'mondgevoel' && data.neus.aromas.length > 0 && data.mondgevoel.smaakAromas.length === 0) {
        setData(prev => ({ ...prev, mondgevoel: { ...prev.mondgevoel, smaakAromas: [...prev.neus.aromas] } }));
      }
    }, [tab]);

    const handleSave = () => {
      if (fase === 'proeven') {
        const missing: { label: string; tab: string }[] = [];
        if (!data.visueel.kleur) missing.push({ label: L.kleur, tab: 'visueel' });
        if (!data.visueel.belGrootte) missing.push({ label: L.belgrootte, tab: 'visueel' });
        if (!data.visueel.mousse) missing.push({ label: L.mousse, tab: 'visueel' });
        if (!data.neus.intensiteit) missing.push({ label: L.intensiteit, tab: 'neus' });
        if (!data.neus.autolytischKarakter) missing.push({ label: L.autolytischKarakter, tab: 'neus' });
        if (!data.mondgevoel.zoetheid) missing.push({ label: L.zoetheid, tab: 'mondgevoel' });
        if (!data.mondgevoel.zuurgraad) missing.push({ label: L.zuurgraad, tab: 'mondgevoel' });
        if (!data.mondgevoel.afdronkLengte) missing.push({ label: L.afdronkLengteShort, tab: 'mondgevoel' });
        if (!data.conclusie.kwaliteit) missing.push({ label: L.kwaliteitsniveau, tab: 'conclusie' });
        if (missing.length > 0) {
          const tabNames: Record<string, string> = { visueel: L.tabUiterlijk, neus: L.tabNeus, mondgevoel: L.mondgevoel, conclusie: L.tabConclusies };
          const perTab = missing.reduce<Record<string, string[]>>((acc, m) => { (acc[m.tab] = acc[m.tab] || []).push(m.label); return acc; }, {});
          toast.error(L.missingFields(missing.length), {
            description: Object.entries(perTab).map(([t, ls]) => `${tabNames[t]}: ${ls.join(', ')}`).join(' · '),
            duration: 8000,
            action: { label: L.goTo(tabNames[missing[0].tab]), onClick: () => setTab(missing[0].tab) },
          });
          setTab(missing[0].tab);
          return;
        }
      }
      onSave(data, notitie || undefined, score);
    };

    const prevTab = () => { const i = TABS_PROEVEN.indexOf(tab); if (i > 0) setTab(TABS_PROEVEN[i - 1]); };
    const nextTab = () => { const i = TABS_PROEVEN.indexOf(tab); if (i < TABS_PROEVEN.length - 1) setTab(TABS_PROEVEN[i + 1]); };

    // === INFO FASE ===
    if (fase === 'info') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <span style={labelStyle}>{L.naamCuvee} *</span>
            <AutocompleteInput placeholder={L.naamCuvee_placeholder} value={data.cuveeNaam} onChange={v => setData({ ...data, cuveeNaam: v })} suggesties={[]} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <span style={labelStyle}>{L.producent_champagne}</span>
            <AutocompleteInput placeholder={L.producent_champagne_placeholder} value={data.producent ?? ''} onChange={v => setData({ ...data, producent: v })} suggesties={zoekChampagneProducenten(data.producent ?? '')} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <span style={labelStyle}>{L.villageRegio}</span>
            <AutocompleteInput placeholder={L.villageRegio_placeholder} value={data.regio ?? ''} onChange={v => setData({ ...data, regio: v })} suggesties={zoekChampagneVillages(data.regio ?? '')} />
          </div>
          <ButtonGroup label={L.cuveeType} opties={cuveeTypeOpties as unknown as { waarde: string; label: string; beschrijving?: string }[]} waarde={data.cuveeType} onChange={v => setData({ ...data, cuveeType: v as typeof data.cuveeType })} size="sm" />
          {(data.cuveeType === 'millesime' || data.cuveeType === 'prestige') && (
            <Input label={L.jaargang_champagne} type="number" placeholder={L.jaargang_champagne_placeholder} value={data.jaargang ?? ''} onChange={e => setData({ ...data, jaargang: e.target.value ? Number(e.target.value) : undefined })} />
          )}
          <ButtonGroup label={L.stijl} opties={stijlOpties as unknown as { waarde: string; label: string }[]} waarde={data.stijl} onChange={v => setData({ ...data, stijl: v as typeof data.stijl })} size="sm" />
          <ButtonGroup label={L.dosage} opties={dosageOpties as unknown as { waarde: string; label: string }[]} waarde={data.dosage} onChange={v => setData({ ...data, dosage: v as typeof data.dosage })} size="sm" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <span style={labelStyle}>{L.dosageGl} <span style={{ fontWeight: 400, textTransform: 'none', fontSize: '0.75rem', color: 'var(--color-gray)' }}>{lang === 'en' ? '(optional)' : '(optioneel)'}</span></span>
            <Input type="number" min={0} max={200} step={0.5} placeholder="bijv. 6" value={data.dosageGl ?? ''} onChange={e => setData({ ...data, dosageGl: e.target.value ? Number(e.target.value) : undefined })} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <span style={labelStyle}>{L.druivenrassen}</span>
            <DruivenRassenInput druiven={data.druivenrassen} onChange={druiven => setData({ ...data, druivenrassen: druiven })} />
          </div>
          <ButtonGroup label={L.producerType} opties={producerTypeOpties as unknown as { waarde: string; label: string }[]} waarde={data.producerType} onChange={v => setData({ ...data, producerType: v as typeof data.producerType })} size="sm" />
          <ButtonGroup label={L.classificatie} opties={classificatieOpties as unknown as { waarde: string; label: string }[]} waarde={data.classificatie} onChange={v => setData({ ...data, classificatie: v as typeof data.classificatie })} size="sm" />
          <Input label={L.dégorgementdatum} type="date" value={data.disgorgeerdatum ?? ''} onChange={e => setData({ ...data, disgorgeerdatum: e.target.value })} />
        </div>
      );
    }

    // === PROEVEN FASE ===
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="visueel">{L.uiterlijk}</TabsTrigger>
            <TabsTrigger value="neus">{L.neus}</TabsTrigger>
            <TabsTrigger value="mondgevoel">{L.mondgevoel}</TabsTrigger>
            <TabsTrigger value="conclusie">{L.conclusies}</TabsTrigger>
          </TabsList>

          {/* APPEARANCE */}
          <TabsContent value="visueel">
            <Card>
              <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <ButtonGroup label={L.helderheid} opties={champagneHelderheidOpties as unknown as { waarde: string; label: string }[]} waarde={data.visueel.helderheid} onChange={v => setData({ ...data, visueel: { ...data.visueel, helderheid: v as typeof data.visueel.helderheid } })} />
                <ButtonGroup label={L.kleur} opties={champagneKleurOpties as unknown as { waarde: string; label: string; hex?: string }[]} waarde={data.visueel.kleur} onChange={v => setData({ ...data, visueel: { ...data.visueel, kleur: v as typeof data.visueel.kleur } })} showColor />
                <ButtonGroup label={L.belgrootte} opties={belGrootteOpties as unknown as { waarde: string; label: string }[]} waarde={data.visueel.belGrootte} onChange={v => setData({ ...data, visueel: { ...data.visueel, belGrootte: v as typeof data.visueel.belGrootte } })} />
                <ButtonGroup label={L.belpersistentie} opties={belPersistentieOpties as unknown as { waarde: string; label: string }[]} waarde={data.visueel.belPersistentie} onChange={v => setData({ ...data, visueel: { ...data.visueel, belPersistentie: v as typeof data.visueel.belPersistentie } })} />
                <ButtonGroup label={L.moussekwaliteit} opties={mousseKwaliteitOpties as unknown as { waarde: string; label: string }[]} waarde={data.visueel.mousse} onChange={v => setData({ ...data, visueel: { ...data.visueel, mousse: v as typeof data.visueel.mousse } })} />
                <Textarea label={L.overigeObservaties} placeholder={lang === 'en' ? 'Other visual notes...' : 'Andere visuele notities...'} value={data.visueel.overig || ''} onChange={e => setData({ ...data, visueel: { ...data.visueel, overig: e.target.value } })} rows={2} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* NOSE */}
          <TabsContent value="neus">
            <Card>
              <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ border: '4px solid var(--color-border)', padding: '1rem', background: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ ...labelStyle, fontStyle: 'italic' }}>{lang === 'en' ? 'Vibe — first impression' : 'Vibe — eerste indruk'}</span>
                  <Textarea placeholder={L.eersteIndruk_placeholder} value={data.neus.vibe || ''} onChange={e => setData({ ...data, neus: { ...data.neus, vibe: e.target.value } })} rows={2} />
                </div>
                <ButtonGroup label={L.intensiteit} opties={champagneIntensiteitOpties as unknown as { waarde: string; label: string }[]} waarde={data.neus.intensiteit} onChange={v => setData({ ...data, neus: { ...data.neus, intensiteit: v as typeof data.neus.intensiteit } })} />
                <div>
                  <span style={{ ...labelStyle, display: 'block', marginBottom: '0.5rem' }}>{L.autolytischKarakter}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {autolytischKarakterOpties.map(opt => {
                      const sel = data.neus.autolytischKarakter === opt.waarde;
                      return (
                        <button key={opt.waarde} type="button" onClick={() => setData({ ...data, neus: { ...data.neus, autolytischKarakter: opt.waarde } })}
                          style={{ display: 'flex', flexDirection: 'column', padding: '0.6rem 0.875rem', textAlign: 'left', background: sel ? 'var(--color-on-surface)' : 'var(--color-white)', color: sel ? 'var(--color-background)' : 'var(--color-on-surface)', border: `2px solid ${sel ? 'var(--color-on-surface)' : 'var(--color-border)'}`, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{opt.label}</span>
                          <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>{opt.beschrijving}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <span style={{ ...labelStyle, display: 'block', marginBottom: '0.5rem' }}>{L.oxidatiefKarakter}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {oxidatiefKarakterOpties.map(opt => {
                      const sel = data.neus.oxidatiefKarakter === opt.waarde;
                      return (
                        <button key={opt.waarde} type="button" onClick={() => setData({ ...data, neus: { ...data.neus, oxidatiefKarakter: opt.waarde } })}
                          style={{ display: 'flex', flexDirection: 'column', padding: '0.6rem 0.875rem', textAlign: 'left', background: sel ? 'var(--color-on-surface)' : 'var(--color-white)', color: sel ? 'var(--color-background)' : 'var(--color-on-surface)', border: `2px solid ${sel ? 'var(--color-on-surface)' : 'var(--color-border)'}`, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{opt.label}</span>
                          <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>{opt.beschrijving}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <span style={{ ...labelStyle, display: 'block', marginBottom: '0.75rem' }}>{L.aromakenmerken}</span>
                  <ChampagneAromaPicker geselecteerd={data.neus.aromas} onChange={a => setData({ ...data, neus: { ...data.neus, aromas: a } })} />
                </div>
                <Textarea label={L.overigeNeusnoten} placeholder={L.aanvullendePalate_placeholder} value={data.neus.overig || ''} onChange={e => setData({ ...data, neus: { ...data.neus, overig: e.target.value } })} rows={2} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* PALATE */}
          <TabsContent value="mondgevoel">
            <Card>
              <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <ButtonGroup label={L.aanvalIntrede} opties={champagneAanvalOpties as unknown as { waarde: string; label: string }[]} waarde={data.mondgevoel.aanval} onChange={v => setData({ ...data, mondgevoel: { ...data.mondgevoel, aanval: v as typeof data.mondgevoel.aanval } })} />
                <ButtonGroup label={L.zoetheid} opties={champagneZoetheidOpties as unknown as { waarde: string; label: string }[]} waarde={data.mondgevoel.zoetheid} onChange={v => setData({ ...data, mondgevoel: { ...data.mondgevoel, zoetheid: v as typeof data.mondgevoel.zoetheid } })} size="sm" />
                <ButtonGroup label={L.zuurgraad} opties={champagneZuurgraadOpties as unknown as { waarde: string; label: string }[]} waarde={data.mondgevoel.zuurgraad} onChange={v => setData({ ...data, mondgevoel: { ...data.mondgevoel, zuurgraad: v as typeof data.mondgevoel.zuurgraad } })} />
                <ButtonGroup label="Body" opties={champagneBodyOpties as unknown as { waarde: string; label: string }[]} waarde={data.mondgevoel.body} onChange={v => setData({ ...data, mondgevoel: { ...data.mondgevoel, body: v as typeof data.mondgevoel.body } })} />
                <ButtonGroup label={L.smaakintensiteit} opties={champagneIntensiteitOpties as unknown as { waarde: string; label: string }[]} waarde={data.mondgevoel.smaakIntensiteit} onChange={v => setData({ ...data, mondgevoel: { ...data.mondgevoel, smaakIntensiteit: v as typeof data.mondgevoel.smaakIntensiteit } })} />
                <div>
                  <span style={{ ...labelStyle, display: 'block', marginBottom: '0.75rem' }}>{L.smaakkenmerken}</span>
                  <ChampagneAromaPicker geselecteerd={data.mondgevoel.smaakAromas} onChange={a => setData({ ...data, mondgevoel: { ...data.mondgevoel, smaakAromas: a } })} neusAromas={data.neus.aromas} />
                </div>
                <ButtonGroup label={L.afdronkLengte} opties={champagneAfdronkOpties as unknown as { waarde: string; label: string }[]} waarde={data.mondgevoel.afdronkLengte} onChange={v => setData({ ...data, mondgevoel: { ...data.mondgevoel, afdronkLengte: v as typeof data.mondgevoel.afdronkLengte } })} />
                <ButtonGroup label={L.afdronkComplexiteit} opties={champagneComplexiteitOpties as unknown as { waarde: string; label: string }[]} waarde={data.mondgevoel.complexiteit} onChange={v => setData({ ...data, mondgevoel: { ...data.mondgevoel, complexiteit: v as typeof data.mondgevoel.complexiteit } })} />
                <Textarea label={L.overigeMondgevoelnoten} placeholder={L.aanvullendePalate_placeholder} value={data.mondgevoel.overig || ''} onChange={e => setData({ ...data, mondgevoel: { ...data.mondgevoel, overig: e.target.value } })} rows={2} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* CONCLUSIONS */}
          <TabsContent value="conclusie">
            <Card>
              <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <span style={{ ...labelStyle, display: 'block', marginBottom: '0.75rem' }}>{L.kwaliteitsniveau}</span>
                  <div role="radiogroup" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {champagneKwaliteitOpties.map(opt => {
                      const sel = data.conclusie.kwaliteit === opt.waarde;
                      return (
                        <button key={opt.waarde} type="button" role="radio" aria-checked={sel}
                          onClick={() => setData({ ...data, conclusie: { ...data.conclusie, kwaliteit: opt.waarde } })}
                          style={{ display: 'flex', flexDirection: 'column', padding: '0.6rem 0.875rem', textAlign: 'left', background: sel ? 'var(--color-on-surface)' : 'var(--color-white)', color: sel ? 'var(--color-background)' : 'var(--color-on-surface)', border: `2px solid ${sel ? 'var(--color-on-surface)' : 'var(--color-border)'}`, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{opt.label}</span>
                          <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>{opt.beschrijving}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <ButtonGroup label={L.drinkrijpheid} opties={champagneDrinkbaarheidOpties as unknown as { waarde: string; label: string }[]} waarde={data.conclusie.drinkbaarheid} onChange={v => setData({ ...data, conclusie: { ...data.conclusie, drinkbaarheid: v as typeof data.conclusie.drinkbaarheid } })} size="sm" />
                <Textarea label={L.rijpingspotentieel} placeholder={L.rijpingspotentieel_placeholder} value={data.conclusie.rijpingspotentieel || ''} onChange={e => setData({ ...data, conclusie: { ...data.conclusie, rijpingspotentieel: e.target.value } })} rows={2} />
                <Textarea label={L.spijscombinatie} placeholder={L.spijscombinatie_placeholder} value={data.conclusie.voedselparing || ''} onChange={e => setData({ ...data, conclusie: { ...data.conclusie, voedselparing: e.target.value } })} rows={2} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={labelStyle}>{L.scoreKort}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-gray)' }}>{score !== undefined ? `${score}/10` : '—'}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <button key={n} type="button" onClick={() => setScore(score === n ? undefined : n)}
                        style={{ padding: '0.4rem 0.6rem', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700, background: score === n ? 'var(--color-on-surface)' : 'var(--color-white)', color: score === n ? 'var(--color-background)' : 'var(--color-on-surface)', border: `2px solid ${score === n ? 'var(--color-on-surface)' : 'var(--color-border)'}`, cursor: 'pointer', minWidth: '2.2rem' }}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <Textarea label={L.persoonlijkeNotitie} placeholder={L.jePersoonlijkeOpmerkingen} value={notitie} onChange={e => setNotitie(e.target.value)} rows={4} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {tab !== 'visueel' && <Button variant="outline" onClick={prevTab} style={{ flex: 1 }}>{L.vorige}</Button>}
          {tab !== 'conclusie'
            ? <Button onClick={nextTab} style={{ flex: 1 }}>{L.volgende}</Button>
            : <Button onClick={handleSave} style={{ flex: 1 }}>{L.opslaan}</Button>
          }
        </div>
      </div>
    );
  }
);
