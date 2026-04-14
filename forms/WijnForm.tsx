// Wine tasting form — Systematic Approach to Tasting (SAT) structure.
import { useState, forwardRef, useImperativeHandle } from 'react';
import { Eye, Flower2, UtensilsCrossed, Award, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { ButtonGroup } from '../ui/ButtonGroup';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { AromaPicker } from '../features/AromaPicker';
import { DruivenInput } from '../features/DruivenInput';
import { AutocompleteInput } from '../features/AutocompleteInput';
import {
  wijnTypeOpties, helderheidOpties, intensiteitDrieOpties,
  kleurWitOpties, kleurRoséOpties, kleurRoodOpties,
  conditieOpties, intensiteitVijfOpties, ontwikkelingOpties,
  mousseOpties, zoetheidOpties, schaalVijfOpties, bodyOpties,
  afdronkLengteOpties, kwaliteitOpties, drinkbaarheidOpties,
} from '../data/wine-options';
import { zoekLanden, zoekRegios } from '../data/wijn-regio-database';
import type { WijnProef, WijnType, AromaKenmerken } from '../types';
import { createEmptyWineTasting } from '../types';
import { FL, type Lang, getHerkomstOpties, getOpnieuwKopenOpties, getAanbevolenVoorOpties, getWijnTypeOpties } from '../lib/form-labels';

export interface WijnFormHandle {
  getData: () => WijnProef;
  mergeAIData: (data: Partial<WijnProef>) => void;
}

interface Props {
  initialData?: WijnProef;
  persoonlijkeNotitie?: string;
  score?: number;
  onSave: (data: WijnProef, notitie?: string, score?: number) => void;
  fase?: 'info' | 'proeven';
  lang?: Lang;
}

function mergeAromas(a: AromaKenmerken, b: AromaKenmerken): AromaKenmerken {
  const unique = (x: string[], y: string[]) => [...new Set([...x, ...y])];
  return { primair: unique(a.primair, b.primair), secundair: unique(a.secundair, b.secundair), tertiair: unique(a.tertiair, b.tertiair) };
}

function deepMerge(cur: WijnProef, ai: Partial<WijnProef>): WijnProef {
  const m = { ...cur };
  if (ai.wijnNaam && !cur.wijnNaam) m.wijnNaam = ai.wijnNaam;
  if (ai.producent && !cur.producent) m.producent = ai.producent;
  if (ai.regio && !cur.regio) m.regio = ai.regio;
  if (ai.land && !cur.land) m.land = ai.land;
  if (ai.jaargang && !cur.jaargang) m.jaargang = ai.jaargang;
  if (ai.prijs && !cur.prijs) m.prijs = ai.prijs;
  if (ai.druivenras && (!cur.druivenras || !cur.druivenras.length)) m.druivenras = ai.druivenras;
  if (ai.wijnType) m.wijnType = ai.wijnType;
  if (ai.uiterlijk) m.uiterlijk = { helderheid: cur.uiterlijk.helderheid || ai.uiterlijk.helderheid || null, intensiteit: cur.uiterlijk.intensiteit || ai.uiterlijk.intensiteit || null, kleur: cur.uiterlijk.kleur || ai.uiterlijk.kleur || null, overig: cur.uiterlijk.overig || ai.uiterlijk.overig };
  if (ai.neus) m.neus = { vibe: cur.neus.vibe || ai.neus.vibe || '', conditie: cur.neus.conditie || ai.neus.conditie || null, intensiteit: cur.neus.intensiteit || ai.neus.intensiteit || null, aromaKenmerken: ai.neus.aromaKenmerken ? mergeAromas(cur.neus.aromaKenmerken, ai.neus.aromaKenmerken) : cur.neus.aromaKenmerken, ontwikkeling: cur.neus.ontwikkeling || ai.neus.ontwikkeling || null };
  if (ai.gehemelte) m.gehemelte = { zoetheid: cur.gehemelte.zoetheid || ai.gehemelte.zoetheid || null, zuurgraad: cur.gehemelte.zuurgraad || ai.gehemelte.zuurgraad || null, tannine: cur.gehemelte.tannine || ai.gehemelte.tannine || null, mousseIntensiteit: cur.gehemelte.mousseIntensiteit || ai.gehemelte.mousseIntensiteit || null, alcohol: cur.gehemelte.alcohol || ai.gehemelte.alcohol || null, body: cur.gehemelte.body || ai.gehemelte.body || null, smaakIntensiteit: cur.gehemelte.smaakIntensiteit || ai.gehemelte.smaakIntensiteit || null, smaakKenmerken: ai.gehemelte.smaakKenmerken ? mergeAromas(cur.gehemelte.smaakKenmerken, ai.gehemelte.smaakKenmerken) : cur.gehemelte.smaakKenmerken, afdronk: { lengte: cur.gehemelte.afdronk.lengte || ai.gehemelte.afdronk?.lengte || null, complexiteit: cur.gehemelte.afdronk.complexiteit || ai.gehemelte.afdronk?.complexiteit || null } };
  if (ai.conclusie) m.conclusie = { kwaliteit: cur.conclusie.kwaliteit || ai.conclusie.kwaliteit || null, drinkbaarheid: cur.conclusie.drinkbaarheid || ai.conclusie.drinkbaarheid || null, rijpingspotentieel: cur.conclusie.rijpingspotentieel || ai.conclusie.rijpingspotentieel || null };
  return m;
}

const TABS = ['appearance', 'nose', 'palate', 'conclusions', 'details'];

const labelStyle = { fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--color-on-surface)' };


export const WijnForm = forwardRef<WijnFormHandle, Props>(
  function WijnForm({ initialData, persoonlijkeNotitie: initNotitie, score: initScore, onSave, fase, lang = 'nl' }, ref) {
    const [data, setData] = useState<WijnProef>(initialData || createEmptyWineTasting());
    const [notitie, setNotitie] = useState(initNotitie || '');
    const [score, setScore] = useState<number | undefined>(initScore);
    const [tab, setTab] = useState('appearance');
    const L = FL[lang];

    useImperativeHandle(ref, () => ({
      getData: () => data,
      mergeAIData: (ai) => setData(cur => deepMerge(cur, ai)),
    }), [data]);

    const toonInfo = !fase || fase === 'info';
    const toonProeven = !fase || fase === 'proeven';

    const handleSave = () => {
      const missing: { label: string; tab: string }[] = [];
      if (!data.uiterlijk.helderheid) missing.push({ label: L.helderheid, tab: 'appearance' });
      if (!data.uiterlijk.intensiteit) missing.push({ label: L.intensiteit, tab: 'appearance' });
      if (!data.uiterlijk.kleur) missing.push({ label: L.kleur, tab: 'appearance' });
      if (!data.neus.conditie) missing.push({ label: L.conditie, tab: 'nose' });
      if (!data.neus.intensiteit) missing.push({ label: L.intensiteit, tab: 'nose' });
      if (!data.neus.ontwikkeling) missing.push({ label: L.ontwikkeling, tab: 'nose' });
      if (!data.gehemelte.zoetheid) missing.push({ label: L.zoetheid, tab: 'palate' });
      if (!data.gehemelte.zuurgraad) missing.push({ label: L.zuurgraad, tab: 'palate' });
      if (!data.gehemelte.alcohol) missing.push({ label: L.alcohol, tab: 'palate' });
      if (!data.gehemelte.body) missing.push({ label: 'Body', tab: 'palate' });
      if (!data.gehemelte.smaakIntensiteit) missing.push({ label: L.smaakintensiteit, tab: 'palate' });
      if (!data.gehemelte.afdronk.lengte) missing.push({ label: L.afdronkLengteShort, tab: 'palate' });
      if (!data.conclusie.kwaliteit) missing.push({ label: L.kwaliteitsniveau, tab: 'conclusions' });
      if (!data.conclusie.drinkbaarheid) missing.push({ label: L.drinkbaarheid, tab: 'conclusions' });
      if (missing.length > 0) {
        const tabNames: Record<string, string> = { appearance: L.tabUiterlijk, nose: L.tabNeus, palate: L.tabGehemelte, conclusions: L.tabConclusies };
        const perTab = missing.reduce<Record<string, string[]>>((acc, m) => { (acc[m.tab] = acc[m.tab] || []).push(m.label); return acc; }, {});
        toast.error(L.missingFields(missing.length), {
          description: Object.entries(perTab).map(([t, ls]) => `${tabNames[t]}: ${ls.join(', ')}`).join(' · '),
          duration: 8000,
          action: { label: L.goTo(tabNames[missing[0].tab]), onClick: () => setTab(missing[0].tab) },
        });
        setTab(missing[0].tab);
        return;
      }
      onSave(data, notitie, score);
    };

    const kleurOpties = data.wijnType === 'wit' || data.wijnType === 'mousserend' || data.wijnType === 'versterkt'
      ? kleurWitOpties : data.wijnType === 'rosé' ? kleurRoséOpties : kleurRoodOpties;

    const toonTannine = data.wijnType === 'rood' || data.wijnType === 'versterkt';
    const toonMousse = data.wijnType === 'mousserend';

    // Count filled fields per tab (for badge)
    const cA = [data.uiterlijk.helderheid, data.uiterlijk.intensiteit, data.uiterlijk.kleur].filter(Boolean).length;
    const cN = [data.neus.conditie, data.neus.intensiteit, data.neus.ontwikkeling].filter(Boolean).length + (data.neus.aromaKenmerken.primair.length > 0 ? 1 : 0);
    const cP = [data.gehemelte.zoetheid, data.gehemelte.zuurgraad, data.gehemelte.alcohol, data.gehemelte.body, data.gehemelte.smaakIntensiteit, data.gehemelte.afdronk.lengte].filter(Boolean).length;
    const cC = [data.conclusie.kwaliteit, data.conclusie.drinkbaarheid].filter(Boolean).length;

    const badgeStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', background: 'var(--color-primary)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 700 };

    const prevTab = () => { const i = TABS.indexOf(tab); if (i > 0) setTab(TABS[i - 1]); };
    const nextTab = () => { const i = TABS.indexOf(tab); if (i < TABS.length - 1) setTab(TABS[i + 1]); };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Info fase */}
        {toonInfo && (
          <Card>
            <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <ButtonGroup label={L.typeWijn} opties={getWijnTypeOpties(lang) as unknown as { waarde: string; label: string }[]} waarde={data.wijnType} onChange={v => setData({ ...data, wijnType: v as WijnType, uiterlijk: { ...data.uiterlijk, kleur: null } })} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <span style={labelStyle}>{L.land}</span>
                  <AutocompleteInput placeholder={L.landPlaceholder} value={data.land || ''} onChange={v => setData({ ...data, land: v })} suggesties={zoekLanden(data.land || '')} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <span style={labelStyle}>{L.regioShort}</span>
                  <AutocompleteInput placeholder={data.land ? L.regioPlaceholderMetLand(data.land) : L.regioPlaceholderLeeg} value={data.regio || ''} onChange={v => setData({ ...data, regio: v })} suggesties={zoekRegios(data.land, data.regio || '')} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Input label={L.naamLabel} placeholder={L.wijnNaamJaargangPlaceholder} value={data.wijnNaam} onChange={e => setData({ ...data, wijnNaam: e.target.value })} />
                <Input label={L.producent} placeholder={L.producent_placeholder} value={data.producent || ''} onChange={e => setData({ ...data, producent: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Input
                  label={`${L.jaargang}${data.wijnType === 'mousserend' ? L.jaargangMetNv : ''}`}
                  type="text"
                  placeholder={data.wijnType === 'mousserend' ? L.jaargangNvPlaceholder : L.jaargangNormaalPlaceholder}
                  value={data.jaargang === 0 ? 'NV' : data.jaargang || ''}
                  onChange={e => {
                    const v = e.target.value.toUpperCase();
                    if (v === 'NV' || v === 'N') setData({ ...data, jaargang: 0 });
                    else setData({ ...data, jaargang: parseInt(v) || undefined });
                  }}
                />
                <Input label={L.prijs} type="number" step="0.01" placeholder={L.prijsSimpelePlaceholder} value={data.prijs ?? ''} onChange={e => setData({ ...data, prijs: parseFloat(e.target.value) || undefined })} />
              </div>
              <DruivenInput druiven={data.druivenras || []} onChange={druiven => setData({ ...data, druivenras: druiven })} wijnType={data.wijnType} land={data.land} regio={data.regio} lang={lang} />
            </CardContent>
          </Card>
        )}

        {/* Proeven fase */}
        {toonProeven && (
          <>
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="appearance">
                  <Eye size={14} style={{ marginRight: '0.25rem' }} />
                  <span>{L.uiterlijk}</span>
                  {cA > 0 && <span style={{ ...badgeStyle, marginLeft: '0.25rem' }}>{cA}</span>}
                </TabsTrigger>
                <TabsTrigger value="nose">
                  <Flower2 size={14} style={{ marginRight: '0.25rem' }} />
                  <span>{L.neus}</span>
                  {cN > 0 && <span style={{ ...badgeStyle, marginLeft: '0.25rem' }}>{cN}</span>}
                </TabsTrigger>
                <TabsTrigger value="palate">
                  <UtensilsCrossed size={14} style={{ marginRight: '0.25rem' }} />
                  <span>{L.gehemelte}</span>
                  {cP > 0 && <span style={{ ...badgeStyle, marginLeft: '0.25rem' }}>{cP}</span>}
                </TabsTrigger>
                <TabsTrigger value="conclusions">
                  <Award size={14} style={{ marginRight: '0.25rem' }} />
                  <span>{L.conclusies}</span>
                  {cC > 0 && <span style={{ ...badgeStyle, marginLeft: '0.25rem' }}>{cC}</span>}
                </TabsTrigger>
                <TabsTrigger value="details">
                  <FileText size={14} style={{ marginRight: '0.25rem' }} />
                  <span>{L.details}</span>
                </TabsTrigger>
              </TabsList>

              {/* APPEARANCE */}
              <TabsContent value="appearance">
                <Card>
                  <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <ButtonGroup label={L.helderheid} opties={helderheidOpties as unknown as { waarde: string; label: string }[]} waarde={data.uiterlijk.helderheid} onChange={v => setData({ ...data, uiterlijk: { ...data.uiterlijk, helderheid: v as typeof data.uiterlijk.helderheid } })} />
                    <ButtonGroup label={L.intensiteit} opties={intensiteitDrieOpties as unknown as { waarde: string; label: string }[]} waarde={data.uiterlijk.intensiteit} onChange={v => setData({ ...data, uiterlijk: { ...data.uiterlijk, intensiteit: v as typeof data.uiterlijk.intensiteit } })} />
                    <ButtonGroup label={L.kleur} opties={kleurOpties as unknown as { waarde: string; label: string; hex?: string }[]} waarde={data.uiterlijk.kleur} onChange={v => setData({ ...data, uiterlijk: { ...data.uiterlijk, kleur: v as typeof data.uiterlijk.kleur } })} showColor />
                    <Textarea label={L.overigeObservaties} placeholder={L.uiterlijkOverig_placeholder} value={data.uiterlijk.overig || ''} onChange={e => setData({ ...data, uiterlijk: { ...data.uiterlijk, overig: e.target.value } })} rows={2} />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* NOSE */}
              <TabsContent value="nose">
                <Card>
                  <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ border: '4px solid var(--color-border)', padding: '1rem', background: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <span style={{ ...labelStyle, fontStyle: 'italic' }}>{L.vibe}</span>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-gray)', margin: 0 }}>{L.vibeDesc}</p>
                      <Textarea placeholder="warm apple pie with whipped cream, grandmother's garden, fresh brioche..." value={data.neus.vibe || ''} onChange={e => setData({ ...data, neus: { ...data.neus, vibe: e.target.value } })} rows={2} />
                    </div>
                    <ButtonGroup label={L.conditie} opties={conditieOpties as unknown as { waarde: string; label: string }[]} waarde={data.neus.conditie} onChange={v => setData({ ...data, neus: { ...data.neus, conditie: v as typeof data.neus.conditie } })} />
                    <ButtonGroup label={L.intensiteit} opties={intensiteitVijfOpties as unknown as { waarde: string; label: string }[]} waarde={data.neus.intensiteit} onChange={v => setData({ ...data, neus: { ...data.neus, intensiteit: v as typeof data.neus.intensiteit } })} />
                    <AromaPicker
                      primair={data.neus.aromaKenmerken.primair}
                      secundair={data.neus.aromaKenmerken.secundair}
                      tertiair={data.neus.aromaKenmerken.tertiair}
                      onPrimairChange={a => setData({ ...data, neus: { ...data.neus, aromaKenmerken: { ...data.neus.aromaKenmerken, primair: a } } })}
                      onSecundairChange={a => setData({ ...data, neus: { ...data.neus, aromaKenmerken: { ...data.neus.aromaKenmerken, secundair: a } } })}
                      onTertiairChange={a => setData({ ...data, neus: { ...data.neus, aromaKenmerken: { ...data.neus.aromaKenmerken, tertiair: a } } })}
                      lang={lang}
                    />
                    <ButtonGroup label={L.ontwikkeling} opties={ontwikkelingOpties as unknown as { waarde: string; label: string }[]} waarde={data.neus.ontwikkeling} onChange={v => setData({ ...data, neus: { ...data.neus, ontwikkeling: v as typeof data.neus.ontwikkeling } })} />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* PALATE */}
              <TabsContent value="palate">
                <Card>
                  <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <ButtonGroup label={L.zoetheid} opties={zoetheidOpties as unknown as { waarde: string; label: string }[]} waarde={data.gehemelte.zoetheid} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, zoetheid: v as typeof data.gehemelte.zoetheid } })} size="sm" />
                    <ButtonGroup label={L.zuurgraad} opties={schaalVijfOpties as unknown as { waarde: string; label: string }[]} waarde={data.gehemelte.zuurgraad} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, zuurgraad: v as typeof data.gehemelte.zuurgraad } })} />
                    {toonTannine && <ButtonGroup label={L.tannine} opties={schaalVijfOpties as unknown as { waarde: string; label: string }[]} waarde={data.gehemelte.tannine} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, tannine: v as typeof data.gehemelte.tannine } })} />}
                    {toonMousse && <ButtonGroup label={L.mousse} opties={mousseOpties as unknown as { waarde: string; label: string }[]} waarde={data.gehemelte.mousseIntensiteit} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, mousseIntensiteit: v as typeof data.gehemelte.mousseIntensiteit } })} />}
                    <ButtonGroup label={L.alcohol} opties={schaalVijfOpties as unknown as { waarde: string; label: string }[]} waarde={data.gehemelte.alcohol} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, alcohol: v as typeof data.gehemelte.alcohol } })} />
                    <ButtonGroup label="Body" opties={bodyOpties as unknown as { waarde: string; label: string }[]} waarde={data.gehemelte.body} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, body: v as typeof data.gehemelte.body } })} />
                    <ButtonGroup label={L.smaakintensiteit} opties={intensiteitVijfOpties as unknown as { waarde: string; label: string }[]} waarde={data.gehemelte.smaakIntensiteit} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, smaakIntensiteit: v as typeof data.gehemelte.smaakIntensiteit } })} />
                    <div style={{ borderTop: '4px solid var(--color-border)', paddingTop: '1rem' }}>
                      <span style={{ ...labelStyle, display: 'block', marginBottom: '1rem' }}>{L.smaakkenmerken}</span>
                      <AromaPicker
                        primair={data.gehemelte.smaakKenmerken.primair}
                        secundair={data.gehemelte.smaakKenmerken.secundair}
                        tertiair={data.gehemelte.smaakKenmerken.tertiair}
                        onPrimairChange={a => setData({ ...data, gehemelte: { ...data.gehemelte, smaakKenmerken: { ...data.gehemelte.smaakKenmerken, primair: a } } })}
                        onSecundairChange={a => setData({ ...data, gehemelte: { ...data.gehemelte, smaakKenmerken: { ...data.gehemelte.smaakKenmerken, secundair: a } } })}
                        onTertiairChange={a => setData({ ...data, gehemelte: { ...data.gehemelte, smaakKenmerken: { ...data.gehemelte.smaakKenmerken, tertiair: a } } })}
                        lang={lang}
                      />
                    </div>
                    <div style={{ borderTop: '4px solid var(--color-border)', paddingTop: '1rem' }}>
                      <ButtonGroup label={L.afdronkLengte} opties={afdronkLengteOpties as unknown as { waarde: string; label: string }[]} waarde={data.gehemelte.afdronk.lengte} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, afdronk: { ...data.gehemelte.afdronk, lengte: v as typeof data.gehemelte.afdronk.lengte } } })} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* CONCLUSIONS */}
              <TabsContent value="conclusions">
                <Card>
                  <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <span style={{ ...labelStyle, display: 'block', marginBottom: '0.75rem' }}>{L.kwaliteitBlic}</span>
                      <div role="radiogroup" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {kwaliteitOpties.map(opt => {
                          const sel = data.conclusie.kwaliteit === opt.waarde;
                          return (
                            <button key={opt.waarde} type="button" role="radio" aria-checked={sel}
                              onClick={() => setData({ ...data, conclusie: { ...data.conclusie, kwaliteit: opt.waarde } })}
                              style={{ display: 'flex', flexDirection: 'column', padding: '0.6rem 0.875rem', background: sel ? 'var(--color-on-surface)' : 'var(--color-white)', color: sel ? 'var(--color-background)' : 'var(--color-on-surface)', border: `2px solid ${sel ? 'var(--color-on-surface)' : 'var(--color-border)'}`, cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left' }}>
                              <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{opt.label}</span>
                              <span style={{ fontSize: '0.65rem', opacity: 0.7, marginTop: '0.1rem' }}>{opt.beschrijving}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <ButtonGroup label={L.drinkbaarheid} opties={drinkbaarheidOpties as unknown as { waarde: string; label: string }[]} waarde={data.conclusie.drinkbaarheid} onChange={v => setData({ ...data, conclusie: { ...data.conclusie, drinkbaarheid: v as typeof data.conclusie.drinkbaarheid } })} size="sm" />
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

              {/* DETAILS */}
              <TabsContent value="details">
                <Card>
                  <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <ButtonGroup label={L.hoeVerkregen} opties={getHerkomstOpties(lang)} waarde={data.details?.herkomst ?? null} onChange={v => setData({ ...data, details: { ...(data.details || { herkomst: null, betaaldeSamenwerking: false, sparksPodcast: false, publicatieStatus: null, opnieuwKopen: null, aanbevolenVoor: [] }), herkomst: v as NonNullable<WijnProef['details']>['herkomst'] } })} />
                    <Input label={L.waarTeKoop} placeholder={L.waarTeKoop_placeholder} value={data.details?.waarTeKoop || ''} onChange={e => setData({ ...data, details: { ...(data.details || { herkomst: null, betaaldeSamenwerking: false, sparksPodcast: false, publicatieStatus: null, opnieuwKopen: null, aanbevolenVoor: [] }), waarTeKoop: e.target.value } })} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <Input label={L.proefDatum} type="date" value={data.details?.proefdatum || ''} onChange={e => setData({ ...data, details: { ...(data.details || { herkomst: null, betaaldeSamenwerking: false, sparksPodcast: false, publicatieStatus: null, opnieuwKopen: null, aanbevolenVoor: [] }), proefdatum: e.target.value } })} />
                      <Input label={L.serveerTemperatuur} placeholder={L.serveerTemperatuur_placeholder} value={data.details?.serveerTemperatuur || ''} onChange={e => setData({ ...data, details: { ...(data.details || { herkomst: null, betaaldeSamenwerking: false, sparksPodcast: false, publicatieStatus: null, opnieuwKopen: null, aanbevolenVoor: [] }), serveerTemperatuur: e.target.value } })} />
                    </div>
                    <Input label={L.gerechtCombinatie} placeholder={L.gerechtCombinatie_placeholder} value={data.details?.gerechtCombinatie || ''} onChange={e => setData({ ...data, details: { ...(data.details || { herkomst: null, betaaldeSamenwerking: false, sparksPodcast: false, publicatieStatus: null, opnieuwKopen: null, aanbevolenVoor: [] }), gerechtCombinatie: e.target.value } })} />
                    <ButtonGroup label={L.opnieuwKopen} opties={getOpnieuwKopenOpties(lang)} waarde={data.details?.opnieuwKopen ?? null} onChange={v => setData({ ...data, details: { ...(data.details || { herkomst: null, betaaldeSamenwerking: false, sparksPodcast: false, publicatieStatus: null, opnieuwKopen: null, aanbevolenVoor: [] }), opnieuwKopen: v as NonNullable<WijnProef['details']>['opnieuwKopen'] } })} />
                    <div>
                      <span style={{ ...labelStyle, display: 'block', marginBottom: '0.5rem' }}>{L.aanbevolenVoor}</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                        {getAanbevolenVoorOpties(lang).map(opt => {
                          const sel = (data.details?.aanbevolenVoor || []).includes(opt.waarde as NonNullable<WijnProef['details']>['aanbevolenVoor'][number]);
                          const current = data.details?.aanbevolenVoor || [];
                          return (
                            <button key={opt.waarde} type="button"
                              onClick={() => {
                                const newList = sel ? current.filter(v => v !== opt.waarde) : [...current, opt.waarde as NonNullable<WijnProef['details']>['aanbevolenVoor'][number]];
                                setData({ ...data, details: { ...(data.details || { herkomst: null, betaaldeSamenwerking: false, sparksPodcast: false, publicatieStatus: null, opnieuwKopen: null, aanbevolenVoor: [] }), aanbevolenVoor: newList } });
                              }}
                              style={{ padding: '0.55rem 0.875rem', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700, background: sel ? 'var(--color-on-surface)' : 'var(--color-white)', color: sel ? 'var(--color-background)' : 'var(--color-on-surface)', border: `2px solid ${sel ? 'var(--color-on-surface)' : 'var(--color-border)'}`, cursor: 'pointer' }}>
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Navigation */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {tab !== 'appearance' && <Button variant="outline" onClick={prevTab} style={{ flex: 1 }}>{L.vorige}</Button>}
              {tab !== 'details'
                ? <Button onClick={nextTab} style={{ flex: 1 }}>{L.volgende}</Button>
                : <Button onClick={handleSave} style={{ flex: 1 }}>{L.opslaan}</Button>
              }
            </div>
          </>
        )}
      </div>
    );
  }
);
