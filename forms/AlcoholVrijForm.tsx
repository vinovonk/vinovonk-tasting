import { useState, forwardRef, useImperativeHandle } from 'react';
import { X, Plus } from 'lucide-react';
import { ButtonGroup } from '../ui/ButtonGroup';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import type { AlcoholVrijTasting, AlcoholVrijSubType } from '../types';
import { createEmptyAlcoholVrijTasting } from '../types';

export interface AlcoholVrijFormHandle {
  getData: () => AlcoholVrijTasting;
  mergeAIData: (data: Partial<AlcoholVrijTasting>) => void;
}

interface Props {
  initialData?: AlcoholVrijTasting;
  persoonlijkeNotitie?: string;
  score?: number;
  onSave: (data: AlcoholVrijTasting, notitie?: string, score?: number) => void;
}

const subTypeOpties = [
  { waarde: 'proxy-wijn', label: 'Proxy-wijn' },
  { waarde: 'spirit-0', label: 'Spirit 0%' },
  { waarde: 'thee', label: 'Thee' },
  { waarde: 'anders', label: 'Anders' },
];

const helderheidOpties = [{ waarde: 'helder', label: 'Helder' }, { waarde: 'troebel', label: 'Troebel' }];
const intensiteitOpties = [{ waarde: 'licht', label: 'Licht' }, { waarde: 'medium', label: 'Medium' }, { waarde: 'uitgesproken', label: 'Uitgesproken' }];
const zoetheidOpties = [{ waarde: 'droog', label: 'Droog' }, { waarde: 'halfdroog', label: 'Halfdroog' }, { waarde: 'medium', label: 'Medium' }, { waarde: 'zoet', label: 'Zoet' }];
const drieSchaalOpties = [{ waarde: 'laag', label: 'Laag' }, { waarde: 'medium', label: 'Medium' }, { waarde: 'hoog', label: 'Hoog' }];
const bodyOpties = [{ waarde: 'licht', label: 'Licht' }, { waarde: 'medium', label: 'Medium' }, { waarde: 'vol', label: 'Vol' }];
const afdronkOpties = [{ waarde: 'kort', label: 'Kort' }, { waarde: 'medium', label: 'Medium' }, { waarde: 'lang', label: 'Lang' }];
const kwaliteitOpties = [{ waarde: 'slecht', label: 'Slecht' }, { waarde: 'acceptabel', label: 'Acceptabel' }, { waarde: 'goed', label: 'Goed' }, { waarde: 'zeer_goed', label: 'Zeer goed' }, { waarde: 'uitmuntend', label: 'Uitstekend' }];

const proxyWijnAromas = ['rood fruit','kers','pruim','braam','aardbei','citrus','appel','peer','tropisch fruit','bloemen','roos','violetje','kruiden','specerijen','vanille','eik','toast','karamel','mineraal','aarde','leer'];
const spirit0Aromas = ['jeneverbes','citrus','citroen','sinaasappel','grapefruit','bloemen','lavendel','elderflower','kruiden','rozemarijn','tijm','komkommer','specerijen','peper','kardemom','kaneel','vanille','karamel','honing','gember','munt','basilicum'];
const theeAromas = ['floraal','jasmijn','roos','kamille','groen','gras','vegetaal','zeewier','fruit','citrus','appel','peer','perzik','honingachtig','karamel','malty','rokerig','aards','houtachtig','kruidig','munt','gember','kaneel','noten','amandel','umami','mineraal'];
const defaultAVAromas = ['fruit','citrus','bloemen','kruiden','specerijen','honing','karamel','noten','mineraal','aarde','vanille','gember','munt'];

function getAromas(s: AlcoholVrijSubType): string[] {
  if (s === 'proxy-wijn') return proxyWijnAromas;
  if (s === 'spirit-0') return spirit0Aromas;
  if (s === 'thee') return theeAromas;
  return defaultAVAromas;
}

const TABS = ['appearance', 'nose', 'palate', 'conclusions'];

const pillStyle = (sel: boolean) => ({
  fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
  padding: '0.3rem 0.6rem', cursor: 'pointer',
  background: sel ? 'var(--color-primary)' : 'var(--color-white)',
  color: sel ? '#fff' : 'var(--color-on-surface)',
  border: `2px solid ${sel ? 'var(--color-primary)' : 'var(--color-border)'}`,
});

export const AlcoholVrijForm = forwardRef<AlcoholVrijFormHandle, Props>(
  function AlcoholVrijForm({ initialData, persoonlijkeNotitie: initNotitie, score: initScore, onSave }, ref) {
    const [data, setData] = useState<AlcoholVrijTasting>(initialData || createEmptyAlcoholVrijTasting());
    const [notitie, setNotitie] = useState(initNotitie || '');
    const [score, setScore] = useState<number | undefined>(initScore);
    const [tab, setTab] = useState('appearance');
    const [customAroma, setCustomAroma] = useState('');

    useImperativeHandle(ref, () => ({
      getData: () => data,
      mergeAIData: (ai) => setData(cur => ({ ...cur, ...ai })),
    }), [data]);

    const toggle = (list: string[], a: string) =>
      list.includes(a) ? list.filter(x => x !== a) : [...list, a];

    const aromas = getAromas(data.subType);
    const isProxyWijn = data.subType === 'proxy-wijn';

    const prevTab = () => setTab(TABS[TABS.indexOf(tab) - 1]);
    const nextTab = () => setTab(TABS[TABS.indexOf(tab) + 1]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Meta */}
        <Card>
          <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input
                label="Naam"
                placeholder={data.subType === 'proxy-wijn' ? 'Bijv. Oddbird Sparkling Rosé' : data.subType === 'spirit-0' ? 'Bijv. Seedlip Garden 108' : data.subType === 'thee' ? 'Bijv. Gyokuro First Flush' : 'Naam...'}
                value={data.naam} onChange={e => setData({ ...data, naam: e.target.value })}
              />
              <Input label="Merk / Producent" placeholder="Producent..." value={data.merk || ''} onChange={e => setData({ ...data, merk: e.target.value })} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              <Input
                label="Stijl"
                placeholder={data.subType === 'proxy-wijn' ? 'Rood, wit, rosé...' : data.subType === 'spirit-0' ? 'Gin-style, Rum-style...' : data.subType === 'thee' ? 'Groene thee, Oolong...' : 'Stijl...'}
                value={data.stijl || ''} onChange={e => setData({ ...data, stijl: e.target.value })}
              />
              <Input label="Land" placeholder="Land..." value={data.land || ''} onChange={e => setData({ ...data, land: e.target.value })} />
              <Input label="Prijs (€)" type="number" step="0.01" placeholder="12.50" value={data.prijs ?? ''} onChange={e => setData({ ...data, prijs: parseFloat(e.target.value) || undefined })} />
            </div>
            <ButtonGroup label="Type alcoholvrij" opties={subTypeOpties} waarde={data.subType} onChange={v => setData({ ...data, subType: v as AlcoholVrijSubType })} size="sm" />
            {data.subType === 'anders' && (
              <Input label="Specificeer type" placeholder="Bijv. Kombucha, Shrub, Mocktail..." value={data.customSubType || ''} onChange={e => setData({ ...data, customSubType: e.target.value })} />
            )}
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="appearance">Uiterlijk</TabsTrigger>
            <TabsTrigger value="nose">Neus</TabsTrigger>
            <TabsTrigger value="palate">Gehemelte</TabsTrigger>
            <TabsTrigger value="conclusions">Conclusies</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance">
            <Card>
              <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <ButtonGroup label="Helderheid" opties={helderheidOpties} waarde={data.uiterlijk.helderheid} onChange={v => setData({ ...data, uiterlijk: { ...data.uiterlijk, helderheid: v as typeof data.uiterlijk.helderheid } })} />
                <Input label="Kleur" placeholder="Bijv. lichtgoud, robijnrood, helder..." value={data.uiterlijk.kleur || ''} onChange={e => setData({ ...data, uiterlijk: { ...data.uiterlijk, kleur: e.target.value } })} />
                <Input label="Overige observaties" placeholder="Overige observaties..." value={data.uiterlijk.overig || ''} onChange={e => setData({ ...data, uiterlijk: { ...data.uiterlijk, overig: e.target.value } })} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nose">
            <Card>
              <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <ButtonGroup label="Intensiteit" opties={intensiteitOpties} waarde={data.neus.intensiteit} onChange={v => setData({ ...data, neus: { ...data.neus, intensiteit: v as typeof data.neus.intensiteit } })} />
                <div>
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-on-surface)' }}>Aromakenmerken</span>
                  {data.neus.aromas.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                      {data.neus.aromas.map(a => (
                        <span key={a} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', padding: '0.2rem 0.4rem', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, background: 'var(--color-primary)', color: '#fff', border: '2px solid var(--color-primary)' }}>
                          {a}
                          <button type="button" onClick={() => setData({ ...data, neus: { ...data.neus, aromas: toggle(data.neus.aromas, a) } })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', display: 'flex' }}>
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', maxHeight: '160px', overflowY: 'auto', marginTop: '0.5rem' }}>
                    {aromas.map(a => (
                      <button key={a} type="button" onClick={() => setData({ ...data, neus: { ...data.neus, aromas: toggle(data.neus.aromas, a) } })} style={pillStyle(data.neus.aromas.includes(a))}>
                        {a}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '4px', marginTop: '0.5rem' }}>
                    <input
                      placeholder="Eigen aroma toevoegen..."
                      value={customAroma}
                      onChange={e => setCustomAroma(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && customAroma.trim()) { e.preventDefault(); setData({ ...data, neus: { ...data.neus, aromas: [...data.neus.aromas, customAroma.trim()] } }); setCustomAroma(''); } }}
                      style={{ flex: 1, padding: '0.4rem 0.6rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', border: '4px solid var(--color-border)', background: 'var(--color-white)', color: 'var(--color-on-surface)', outline: 'none' }}
                    />
                    <button type="button" onClick={() => { if (customAroma.trim()) { setData({ ...data, neus: { ...data.neus, aromas: [...data.neus.aromas, customAroma.trim()] } }); setCustomAroma(''); } }} style={{ padding: '0.4rem 0.75rem', background: 'var(--color-primary)', color: '#fff', border: '4px solid var(--color-border)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="palate">
            <Card>
              <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <ButtonGroup label="Zoetheid" opties={zoetheidOpties} waarde={data.gehemelte.zoetheid} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, zoetheid: v as typeof data.gehemelte.zoetheid } })} />
                <ButtonGroup label="Zuurgraad" opties={drieSchaalOpties} waarde={data.gehemelte.zuurgraad} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, zuurgraad: v as typeof data.gehemelte.zuurgraad } })} />
                {isProxyWijn && <ButtonGroup label="Tannine" opties={drieSchaalOpties} waarde={data.gehemelte.tannine || null} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, tannine: v as typeof data.gehemelte.tannine } })} />}
                <ButtonGroup label="Body" opties={bodyOpties} waarde={data.gehemelte.body} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, body: v as typeof data.gehemelte.body } })} />
                <ButtonGroup label="Bitterness" opties={drieSchaalOpties} waarde={data.gehemelte.bitterheid || null} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, bitterheid: v as typeof data.gehemelte.bitterheid } })} />
                <ButtonGroup label="Carbonation" opties={drieSchaalOpties} waarde={data.gehemelte.koolzuur || null} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, koolzuur: v as typeof data.gehemelte.koolzuur } })} />
                <div>
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-on-surface)' }}>Smaakkenmerken</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', maxHeight: '160px', overflowY: 'auto', marginTop: '0.5rem' }}>
                    {aromas.map(a => (
                      <button key={a} type="button" onClick={() => setData({ ...data, gehemelte: { ...data.gehemelte, smaken: toggle(data.gehemelte.smaken, a) } })} style={pillStyle(data.gehemelte.smaken.includes(a))}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
                <ButtonGroup label="Finish" opties={afdronkOpties} waarde={data.gehemelte.afdronk} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, afdronk: v as typeof data.gehemelte.afdronk } })} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conclusions">
            <Card>
              <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <ButtonGroup label="Kwaliteitsniveau" opties={kwaliteitOpties} waarde={data.conclusie.kwaliteit} onChange={v => setData({ ...data, conclusie: { ...data.conclusie, kwaliteit: v as typeof data.conclusie.kwaliteit } })} />
                <Textarea label="Vergelijking met alcoholische variant" placeholder="Hoe verhoudt dit zich tot de alcoholische versie? Wat mist er, wat is beter?" value={data.conclusie.vergelijkingMetAlcohol || ''} onChange={e => setData({ ...data, conclusie: { ...data.conclusie, vergelijkingMetAlcohol: e.target.value } })} rows={3} />
                <Textarea label="Persoonlijke notities" placeholder="Jouw observaties..." value={notitie} onChange={e => setNotitie(e.target.value)} rows={4} />
                <Input label="Score (optioneel, 1–10)" type="number" min={1} max={10} placeholder="7" value={score ?? ''} onChange={e => setScore(e.target.value ? parseInt(e.target.value) : undefined)} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {tab !== 'appearance' && <Button variant="outline" onClick={prevTab} style={{ flex: 1 }}>Vorige</Button>}
          {tab !== 'conclusions'
            ? <Button onClick={nextTab} style={{ flex: 1 }}>Volgende</Button>
            : <Button onClick={() => onSave(data, notitie, score)} style={{ flex: 1 }}>Opslaan</Button>
          }
        </div>
      </div>
    );
  }
);
