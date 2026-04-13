import { useState, forwardRef, useImperativeHandle } from 'react';
import { X, Plus } from 'lucide-react';
import { ButtonGroup } from '../ui/ButtonGroup';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import type { GenericTasting, AnderDrankType } from '../types';
import { createEmptyGenericTasting } from '../types';

export interface GenericFormHandle {
  getData: () => GenericTasting;
  mergeAIData: (data: Partial<GenericTasting>) => void;
}

interface Props {
  initialData?: GenericTasting;
  drankType: AnderDrankType;
  persoonlijkeNotitie?: string;
  score?: number;
  onSave: (data: GenericTasting, notitie?: string, score?: number) => void;
}

const drankTypeOpties = [
  { waarde: 'bier', label: 'Bier' },
  { waarde: 'sake', label: 'Sake' },
  { waarde: 'cider', label: 'Cider' },
  { waarde: 'mede', label: 'Mede' },
  { waarde: 'anders', label: 'Anders' },
] as const;

const helderheidOpties = [{ waarde: 'helder', label: 'Helder' }, { waarde: 'troebel', label: 'Troebel' }];
const intensiteitOpties = [{ waarde: 'licht', label: 'Licht' }, { waarde: 'medium', label: 'Medium' }, { waarde: 'uitgesproken', label: 'Uitgesproken' }];
const zoetheidOpties = [{ waarde: 'droog', label: 'Droog' }, { waarde: 'halfdroog', label: 'Halfdroog' }, { waarde: 'medium', label: 'Medium' }, { waarde: 'zoet', label: 'Zoet' }];
const drieSchaalOpties = [{ waarde: 'laag', label: 'Laag' }, { waarde: 'medium', label: 'Medium' }, { waarde: 'hoog', label: 'Hoog' }];
const bodyOpties = [{ waarde: 'licht', label: 'Licht' }, { waarde: 'medium', label: 'Medium' }, { waarde: 'vol', label: 'Vol' }];
const afdronkOpties = [{ waarde: 'kort', label: 'Kort' }, { waarde: 'medium', label: 'Medium' }, { waarde: 'lang', label: 'Lang' }];
const kwaliteitOpties = [{ waarde: 'slecht', label: 'Slecht' }, { waarde: 'acceptabel', label: 'Acceptabel' }, { waarde: 'goed', label: 'Goed' }, { waarde: 'zeer_goed', label: 'Zeer goed' }, { waarde: 'uitmuntend', label: 'Uitstekend' }];

const bierAromas = ['hop','citrus','tropisch fruit','floraal','kruidig','mout','karamel','toffee','chocolade','koffie','brood','koekje','toast','rokerig','gist','banaan','kruidnagel','peper','gras','hooi','hars','noten','honing','biscuit'];
const sakeAromas = ['rijst','meloen','peer','appel','banaan','bloemen','jasmijn','anijs','umami','mineraal','zeewier','noten','amandel','sesam','room','boter','kaas','champignon','aarde','kruiden'];
const ciderAromas = ['appel','peer','citrus','tropisch fruit','bloemen','honing','kruiden','gist','brood','cider azijn','eik','vanille','karamel','mineraal','aarde'];
const defaultAromas = ['fruit','bloemen','kruiden','specerijen','noten','honing','karamel','chocolade','gist','brood','mineraal','aarde'];

function getAromas(type: AnderDrankType): string[] {
  if (type === 'bier') return bierAromas;
  if (type === 'sake') return sakeAromas;
  if (type === 'cider') return ciderAromas;
  return defaultAromas;
}

const TABS = ['appearance', 'nose', 'palate', 'conclusions'];

const pillStyle = (sel: boolean) => ({
  fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
  padding: '0.3rem 0.6rem', cursor: 'pointer',
  background: sel ? 'var(--color-primary)' : 'var(--color-white)',
  color: sel ? '#fff' : 'var(--color-on-surface)',
  border: `2px solid ${sel ? 'var(--color-primary)' : 'var(--color-border)'}`,
});

export const GenericForm = forwardRef<GenericFormHandle, Props>(
  function GenericForm({ initialData, drankType, persoonlijkeNotitie: initNotitie, score: initScore, onSave }, ref) {
    const [data, setData] = useState<GenericTasting>(
      initialData || { ...createEmptyGenericTasting(), type: drankType }
    );
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

    const aromas = getAromas(data.type as AnderDrankType);
    const isBier = data.type === 'bier';

    const prevTab = () => setTab(TABS[TABS.indexOf(tab) - 1]);
    const nextTab = () => setTab(TABS[TABS.indexOf(tab) + 1]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Meta */}
        <Card>
          <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input label="Naam" placeholder={isBier ? 'Bijv. Westmalle Tripel' : 'Naam...'} value={data.naam} onChange={e => setData({ ...data, naam: e.target.value })} />
              <Input label="Producent" placeholder="Producent..." value={data.producent || ''} onChange={e => setData({ ...data, producent: e.target.value })} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.75rem' }}>
              <Input label="Stijl" placeholder={isBier ? 'IPA' : data.type === 'sake' ? 'Junmai' : 'Stijl...'} value={data.stijl || ''} onChange={e => setData({ ...data, stijl: e.target.value })} />
              <Input label="Land" placeholder="Land..." value={data.land || ''} onChange={e => setData({ ...data, land: e.target.value })} />
              <Input label="Alcohol %" type="number" step="0.1" placeholder="5.5" value={data.alcoholPercentage ?? ''} onChange={e => setData({ ...data, alcoholPercentage: parseFloat(e.target.value) || undefined })} />
              <Input label="Prijs (€)" type="number" step="0.01" placeholder="4.50" value={data.prijs ?? ''} onChange={e => setData({ ...data, prijs: parseFloat(e.target.value) || undefined })} />
            </div>
            <ButtonGroup
              label="Type drank"
              opties={drankTypeOpties as unknown as { waarde: string; label: string }[]}
              waarde={data.type}
              onChange={v => setData({ ...data, type: v as AnderDrankType })}
              size="sm"
            />
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
                <Input label="Kleur" placeholder="Bijv. goud, amber, donkerbruin..." value={data.uiterlijk.kleur || ''} onChange={e => setData({ ...data, uiterlijk: { ...data.uiterlijk, kleur: e.target.value } })} />
                {isBier && <Input label="Schuimkraag" placeholder="Bijv. dik, wit, aanhoudend..." value={data.uiterlijk.schuim || ''} onChange={e => setData({ ...data, uiterlijk: { ...data.uiterlijk, schuim: e.target.value } })} />}
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
                {isBier && <ButtonGroup label="Bitterheid" opties={drieSchaalOpties} waarde={data.gehemelte.bitterheid || null} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, bitterheid: v as typeof data.gehemelte.bitterheid } })} />}
                <ButtonGroup label="Body" opties={bodyOpties} waarde={data.gehemelte.body} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, body: v as typeof data.gehemelte.body } })} />
                <ButtonGroup label="Koolzuur" opties={drieSchaalOpties} waarde={data.gehemelte.koolzuur || null} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, koolzuur: v as typeof data.gehemelte.koolzuur } })} />
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
                <ButtonGroup label="Afdronk" opties={afdronkOpties} waarde={data.gehemelte.afdronk} onChange={v => setData({ ...data, gehemelte: { ...data.gehemelte, afdronk: v as typeof data.gehemelte.afdronk } })} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conclusions">
            <Card>
              <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <ButtonGroup label="Kwaliteitsniveau" opties={kwaliteitOpties} waarde={data.conclusie.kwaliteit} onChange={v => setData({ ...data, conclusie: { kwaliteit: v as typeof data.conclusie.kwaliteit } })} />
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
