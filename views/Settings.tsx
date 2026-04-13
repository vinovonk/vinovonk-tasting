import { useRef } from 'react';
import { navigate } from '../router';
import { exportAllData, importData, clearAllData } from '../lib/storage';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { toast } from 'sonner';
import { Database, Trash2, Download, Upload } from 'lucide-react';

interface SettingsProps {
  lang?: 'nl' | 'en';
}

const T = {
  nl: {
    back: 'Terug',
    titel: 'Instellingen',
    dataSectie: 'Data beheer',
    dataUitleg: 'Al je proefnotities zijn opgeslagen in je browser (localStorage). Exporteer regelmatig als backup.',
    exporteer: 'Exporteer alles als JSON',
    importeer: 'Importeer JSON',
    importeerUitleg: 'Selecteer een eerder geëxporteerd JSON-bestand. Bestaande sessies worden niet overschreven.',
    importeerGelukkt: 'geïmporteerd',
    importeerFout: 'Import mislukt',
    importeerSessies: 'sessies',
    wis: 'Verwijder alle data',
    wisBevestig: 'Weet je zeker dat je ALLE proefnotities wilt verwijderen? Dit kan niet ongedaan worden gemaakt.',
    wisGelukkt: 'Alle data verwijderd',
  },
  en: {
    back: 'Back',
    titel: 'Settings',
    dataSectie: 'Data management',
    dataUitleg: 'All your tasting notes are stored in your browser (localStorage). Export regularly as backup.',
    exporteer: 'Export all as JSON',
    importeer: 'Import JSON',
    importeerUitleg: 'Select a previously exported JSON file. Existing sessions will not be overwritten.',
    importeerGelukkt: 'imported',
    importeerFout: 'Import failed',
    importeerSessies: 'sessions',
    wis: 'Delete all data',
    wisBevestig: 'Are you sure you want to delete ALL tasting notes? This cannot be undone.',
    wisGelukkt: 'All data deleted',
  },
};

function downloadJson(filename: string, data: string) {
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const sectionHeaderStyle: React.CSSProperties = {
  fontFamily: 'var(--font-headline)', fontSize: '0.85rem', fontWeight: 900,
  textTransform: 'uppercase', letterSpacing: '0.12em',
  color: 'var(--color-on-surface)', marginBottom: '0.75rem',
  display: 'flex', alignItems: 'center', gap: '0.5rem',
};

const backBtnStyle: React.CSSProperties = {
  background: 'none', border: 'none', cursor: 'pointer',
  fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700,
  letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gray)',
  marginBottom: '1.5rem', padding: 0,
};

export function Settings({ lang = 'nl' }: SettingsProps) {
  const t = T[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = exportAllData();
    const datum = new Date().toISOString().split('T')[0];
    downloadJson(`vinovonk-export-${datum}.json`, data);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const json = ev.target?.result as string;
      try {
        const { imported, errors } = importData(json);
        if (errors.length > 0) {
          toast.error(`${t.importeerFout}: ${errors[0]}`);
        } else {
          toast.success(`${imported} ${t.importeerSessies} ${t.importeerGelukkt}`);
        }
      } catch (err) {
        toast.error(`${t.importeerFout}: ${err instanceof Error ? err.message : String(err)}`);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleWis = () => {
    if (!window.confirm(t.wisBevestig)) return;
    clearAllData();
    toast.success(t.wisGelukkt);
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem var(--gap)' }}>
      <button onClick={() => navigate('/')} style={backBtnStyle}>← {t.back}</button>

      <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '2rem' }}>
        {t.titel}
      </h2>

      <Card>
        <CardContent style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={sectionHeaderStyle}>
            <Database size={15} />
            {t.dataSectie}
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-gray)', margin: 0 }}>
            {t.dataUitleg}
          </p>

          <Button variant="outline" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
            <Download size={14} />
            {t.exporteer}
          </Button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-on-surface)' }}>
              {t.importeer}
            </span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-gray)', margin: 0 }}>{t.importeerUitleg}</p>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
              <Upload size={14} />
              {t.importeer}
            </Button>
            <input ref={fileInputRef} type="file" accept=".json,application/json" onChange={handleImport} style={{ display: 'none' }} />
          </div>

          <div style={{ borderTop: '4px solid var(--color-border)', paddingTop: '1.25rem' }}>
            <Button
              onClick={handleWis}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', background: '#dc2626', borderColor: '#dc2626' }}
            >
              <Trash2 size={14} />
              {t.wis}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
