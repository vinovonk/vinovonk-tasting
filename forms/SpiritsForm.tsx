import { useState, forwardRef, useImperativeHandle } from 'react';
import { X } from 'lucide-react';
import { ButtonGroup } from '../ui/ButtonGroup';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { toast } from 'sonner';
import {
  spiritTypeOpties, spiritsHelderheidOpties, spiritsKleurIntensiteitOpties,
  spiritsKleurOpties, spiritsConditieOpties, spiritsIntensiteitOpties,
  spiritsZoetheidOpties, spiritsTextuurOpties, spiritsAfdronkLengteOpties,
  spiritsComplexiteitOpties, spiritsKwaliteitOpties, spiritsAromaCategorieen,
} from '../data/spirits-options';
import type { SpiritsProef, SpiritType } from '../types';
import { createEmptySpiritsTasting } from '../types';
import { FL, type Lang } from '../lib/form-labels';

export interface SpiritsFormHandle {
  getData: () => SpiritsProef;
  mergeAIData: (data: Partial<SpiritsProef>) => void;
}

interface Props {
  initialData?: SpiritsProef;
  persoonlijkeNotitie?: string;
  score?: number;
  onSave: (data: SpiritsProef, notitie?: string, score?: number) => void;
  lang?: Lang;
}

const TABS = ['appearance', 'nose', 'palate', 'conclusions'];

const pillStyle = (sel: boolean) => ({
  fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
  padding: '0.3rem 0.6rem', cursor: 'pointer',
  background: sel ? 'var(--color-primary)' : 'var(--color-white)',
  color: sel ? '#fff' : 'var(--color-on-surface)',
  border: `2px solid ${sel ? 'var(--color-primary)' : 'var(--color-border)'}`,
});

function AromaCategoryPicker({ label, aromas, selected, onChange }: {
  label: string; aromas: readonly string[];
  selected: string[]; onChange: (v: string[]) => void;
}) {
  const [zoek, setZoek] = useState('');
  const filtered = zoek ? aromas.filter(a => a.toLowerCase().includes(zoek.toLowerCase())) : aromas;
  const toggle = (a: string) => selected.includes(a) ? onChange(selected.filter(x => x !== a)) : onChange([...selected, a]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gray)' }}>{label}</span>
      {selected.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {selected.map(a => (
            <span key={a} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', padding: '0.2rem 0.4rem', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, background: 'var(--color-surface-high)', color: 'var(--color-on-surface)', border: '2px solid var(--color-border)' }}>
              {a}
              <button type="button" onClick={() => toggle(a)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', display: 'flex' }}><X size={10} /></button>
            </span>
          ))}
        </div>
      )}
      <input
        placeholder={`Zoek ${label.toLowerCase()}...`}
        value={zoek}
        onChange={e => setZoek(e.target.value)}
        style={{ width: '100%', padding: '0.5rem 0.75rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', border: '4px solid var(--color-border)', background: 'var(--color-white)', color: 'var(--color-on-surface)', outline: 'none', boxSizing: 'border-box' }}
      />
      <div style={{ border: '4px solid var(--color-border)', padding: '0.5rem', background: 'var(--color-surface)', display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
        {filtered.map(a => (
          <button key={a} type="button" onClick={() => toggle(a)} style={pillStyle(selected.includes(a))}>{a}</button>
        ))}
      </div>
    </div>
  );
}

export const SpiritsForm = forwardRef<SpiritsFormHandle, Props>(
  function SpiritsForm({ initialData, persoonlijkeNotitie: initNotitie, score: initScore, onSave, lang = 'nl' }, ref) {
    const [data, setData] = useState<SpiritsProef>(initialData || createEmptySpiritsTasting());
    const [notitie, setNotitie] = useState(initNotitie || '');
    const [score, setScore] = useState<number | undefined>(initScore);
    const [tab, setTab] = useState('appearance');
    const L = FL[lang];

    useImperativeHandle(ref, () => ({
      getData: () => data,
      mergeAIData: (ai) => setData(cur => ({ ...cur, ...ai })),
    }), [data]);

    const handleSave = () => {
      const missing: string[] = [];
      if (!data.uiterlijk.helderheid) missing.push(`${L.tabUiterlijk} → ${L.helderheid}`);
      if (!data.uiterlijk.intensiteit) missing.push(`${L.tabUiterlijk} → ${L.kleurintensiteit}`);
      if (!data.uiterlijk.kleur) missing.push(`${L.tabUiterlijk} → ${L.kleur}`);
      if (!data.neus.conditie) missing.push(`${L.tabNeus} → ${L.conditie}`);
      if (!data.neus.intensiteit) missing.push(`${L.tabNeus} → ${L.intensiteit}`);
      if (!data.gehemelte.zoetheid) missing.push(`${L.tabGehemelte} → ${L.zoetheid}`);
      if (!data.gehemelte.smaakIntensiteit) missing.push(`${L.tabGehemelte} → ${L.smaakintensiteit}`);
      if (!data.gehemelte.afdronk.lengte) missing.push(`${L.tabGehemelte} → ${L.afdronk}`);
      if (!data.conclusie.kwaliteit) missing.push(`${L.tabConclusies} → ${L.kwaliteitsniveau}`);
      if (missing.length > 0) {
        toast.error(L.missingFieldsSimple(missing.length, missing.slice(0, 3).join(', ') + (missing.length > 3 ? ` +${missing.length - 3}` : '')), { duration: 6000 });
        return;
      }
      onSave(data, notitie, score);
    };

    const prevTab = () => setTab(TABS[TABS.indexOf(tab) - 1]);
    const nextTab = () => setTab(TABS[TABS.indexOf(tab) + 1]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Card>
          <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input label={L.naam} placeholder={lang === 'en' ? 'E.g. Glenfiddich 18' : 'Bijv. Glenfiddich 18'} value={data.naam} onChange={e => setData({ ...data, naam: e.target.value })} />
              <Input label={L.merk} placeholder={lang === 'en' ? 'E.g. Glenfiddich' : 'Bijv. Glenfiddich'} value={data.merk || ''} onChange={e => setData({ ...data, merk: e.target.value })} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.75rem' }}>
              <Input label={L.spiritLand} placeholder={lang === 'en' ? 'Scotland' : 'Schotland'} value={data.land || ''} onChange={e => setData({ ...data, land: e.target.value })} />
              <Input label={L.leeftijd} placeholder={lang === 'en' ? '12 years' : '12 jaar'} value={data.leeftijd || ''} onChange={e => setData({ ...data, leeftijd: e.target.value })} />
              <Input label={L.alcoholPercentage} type="number" step="0.1" placeholder="40" value={data.alcoholPercentage ?? ''} onChange={e => setData({ ...data, alcoholPercentage: parseFloat(e.target.value) || undefined })} />
              <Input label={L.spiritPrijs} type="number" step="0.01" placeholder="55.00" value={data.prijs ?? ''} onChange={e => setData({ ...data, prijs: parseFloat(e.target.value) || undefined })} />
            </div>
            <ButtonGroup label={L.typeSpirit} opties={spiritTypeOpties as unknown as { waarde: string; label: string }[]} waarde={data.type} onChange={v => setData({ ...data, type: v as SpiritType })} size="sm" />
          </CardContent>
        </Card>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="appearance">{L.uiterlijk}</TabsTrigger>
            <TabsTrigger value="nose">{L.neus}</TabsTrigger>
            <TabsTrigger value="palate">{L.gehemelte}</TabsTrigger>
            <TabsTrigger value="conclusions">{L.conclusies}</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance">
            <Card>
              <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <ButtonGroup label={L.helderheid} opties={spiritsHelderheidOpties as unknown as { waarde: string; label: string }[]} waarde={data.uiterlijk.helderheid} onChange={v => setData({ ...data, uiterlijk: { ...data.uiterlijk, helderheid: v as typeof data.uiterlijk.helderheid } })} />
                <ButtonGroup label={L.kleurintensiteit} opties={spiritsKleurIntensiteitOpties as unknown as { waarde: string; label: string }[]} waarde={data.uiterlijk.intensiteit} onChange={v => setData({ ...data, uiterlijk: { ...data.uiterlijk, intensiteit: v as typeof data.uiterlijk.intensiteit } })} />
                <ButtonGroup label={L.kleur} opties={spiritsKleurOpties as unknown as { waarde: string; label: string }[]} waarde={data.uiterlijk.kleur} onChange={v => setData({ ...data, uiterlijk: { ...data.uiterlijk, kleur: v } })} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nose">
            <Card>
              <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <ButtonGroup label={L.conditie} opties={spiritsConditieOpties as unknown as { waarde: string; label: string }[]} waarde={data.neus.conditie} onChange={v => setData({ ...data, neus: { ...data.neus, conditie: v as typeof data.neus.conditie } })} />
                <ButtonGroup label={L.intensiteit} opties={spiritsIntensiteitOpties as unknown as { waarde: string; label: string }[]} waarde={data.neus.intensiteit} onChange={v => setData({ ...data, neus: { ...data.neus, intensiteit: v as typeof data.neus.intensiteit } })} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-on-surface)' }}>{L.aromakenmerken}</span>
                  {Object.entries(spiritsAromaCategorieen).map(([key, cat]) => (
                    <AromaCategoryPicker
                      key={key}
                      label={cat.label}
                      aromas={cat.aromas}
                      selected={(data.neus.aromaKenmerken as Record<string, string[]>)[key] || []}
                      onChange={v => setData({ ...data, neus: { ...data.neus, aromaKenmerken: { ...data.neus.aromaKenmerken, [key]: v } } })}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="palate">
            <Card>
              <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <ButtonGroup label={L.zoetheid} opties={spiritsZoetheidOpties as unknown as { waarde: string; label: string }[]} waarde={data.gehemelte.zoetheid} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, zoetheid: v as typeof data.gehemelte.zoetheid } })} />
                <ButtonGroup label={L.smaakintensiteit} opties={spiritsIntensiteitOpties as unknown as { waarde: string; label: string }[]} waarde={data.gehemelte.smaakIntensiteit} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, smaakIntensiteit: v as typeof data.gehemelte.smaakIntensiteit } })} />
                <div>
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-on-surface)' }}>{L.textuur}</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', marginTop: '0.5rem' }}>
                    {spiritsTextuurOpties.map(opt => {
                      const sel = data.gehemelte.textuur.includes(opt.waarde);
                      return (
                        <button key={opt.waarde} type="button" style={pillStyle(sel)}
                          onClick={() => setData({ ...data, gehemelte: { ...data.gehemelte, textuur: sel ? data.gehemelte.textuur.filter(t => t !== opt.waarde) : [...data.gehemelte.textuur, opt.waarde] } })}>
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-on-surface)' }}>{L.smaakkenmerken}</span>
                  {Object.entries(spiritsAromaCategorieen).map(([key, cat]) => (
                    <AromaCategoryPicker
                      key={key}
                      label={cat.label}
                      aromas={cat.aromas}
                      selected={(data.gehemelte.smaakKenmerken as Record<string, string[]>)[key] || []}
                      onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, smaakKenmerken: { ...data.gehemelte.smaakKenmerken, [key]: v } } })}
                    />
                  ))}
                </div>
                <ButtonGroup label={L.afdronkLengte} opties={spiritsAfdronkLengteOpties as unknown as { waarde: string; label: string }[]} waarde={data.gehemelte.afdronk.lengte} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, afdronk: { ...data.gehemelte.afdronk, lengte: v as typeof data.gehemelte.afdronk.lengte } } })} />
                <ButtonGroup label={L.afdronkKarakter} opties={spiritsComplexiteitOpties as unknown as { waarde: string; label: string }[]} waarde={data.gehemelte.afdronk.complexiteit} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, afdronk: { ...data.gehemelte.afdronk, complexiteit: v as typeof data.gehemelte.afdronk.complexiteit } } })} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conclusions">
            <Card>
              <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <ButtonGroup label={L.kwaliteitsniveau} opties={spiritsKwaliteitOpties as unknown as { waarde: string; label: string }[]} waarde={data.conclusie.kwaliteit} onChange={v => setData({ ...data, conclusie: { kwaliteit: v as typeof data.conclusie.kwaliteit } })} />
                <Textarea label={L.persoonlijkeNotities} placeholder={L.jePersoonlijkeObservaties} value={notitie} onChange={e => setNotitie(e.target.value)} rows={4} />
                <Input label={L.score} type="number" min={1} max={10} placeholder="8" value={score ?? ''} onChange={e => setScore(e.target.value ? parseInt(e.target.value) : undefined)} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {tab !== 'appearance' && <Button variant="outline" onClick={prevTab} style={{ flex: 1 }}>{L.vorige}</Button>}
          {tab !== 'conclusions'
            ? <Button onClick={nextTab} style={{ flex: 1 }}>{L.volgende}</Button>
            : <Button onClick={handleSave} style={{ flex: 1 }}>{L.opslaan}</Button>
          }
        </div>
      </div>
    );
  }
);
