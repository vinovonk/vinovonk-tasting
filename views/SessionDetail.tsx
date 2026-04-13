import { useEffect, useState } from 'react';
import { navigate } from '../router';
import { getSession, addFles, deleteFles, deleteSession } from '../lib/storage';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card, CardContent } from '../ui/Card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from '../ui/Dialog';
import { BiodynamischBadge } from '../features/BiodynamischBadge';
import type { TastingSession } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { PlusCircle, Wine, Trash2, ChevronRight, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { nl, enUS } from 'date-fns/locale';

interface SessionDetailProps {
  id: string;
  lang?: 'nl' | 'en';
}

const T = {
  nl: {
    back: 'Dashboard',
    flessen: 'flessen',
    fles: 'fles',
    toevoegen: 'Fles toevoegen',
    verwijder: 'Sessie verwijderen',
    verwijderTitel: 'Sessie verwijderen?',
    verwijderOmschrijving: 'Dit verwijdert de sessie en alle proefnotities permanent. Dit kan niet ongedaan worden gemaakt.',
    annuleer: 'Annuleer',
    bevestig: 'Ja, verwijder',
    leeg: 'Nog geen flessen in deze sessie.',
    leegSub: 'Voeg je eerste fles toe om te beginnen!',
    nietGevonden: 'Sessie niet gevonden',
    nieuweFles: 'Nieuwe fles',
    flessen_label: 'Flessen',
  },
  en: {
    back: 'Dashboard',
    flessen: 'bottles',
    fles: 'bottle',
    toevoegen: 'Add bottle',
    verwijder: 'Delete session',
    verwijderTitel: 'Delete session?',
    verwijderOmschrijving: 'This permanently deletes the session and all tasting notes. This cannot be undone.',
    annuleer: 'Cancel',
    bevestig: 'Yes, delete',
    leeg: 'No bottles in this session yet.',
    leegSub: 'Add your first bottle to get started!',
    nietGevonden: 'Session not found',
    nieuweFles: 'New bottle',
    flessen_label: 'Bottles',
  },
};

function getFlesNaam(td: unknown): string {
  if (!td || typeof td !== 'object') return '';
  const d = td as Record<string, unknown>;
  return (d.wijnNaam || d.cuveeNaam || d.naam || '') as string;
}

export function SessionDetail({ id, lang = 'nl' }: SessionDetailProps) {
  const t = T[lang];
  const locale = lang === 'en' ? enUS : nl;
  const [sessie, setSessie] = useState<TastingSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSessie(getSession(id));
    setLoading(false);
  }, [id]);

  const handleAddFles = () => {
    const flesId = uuidv4();
    const now = new Date().toISOString();
    const newFles = {
      id: flesId,
      drankType: 'wijn' as const,
      tastingData: { wijnNaam: '', wijnType: 'rood' } as never,
      createdAt: now,
      updatedAt: now,
    };
    const updated = addFles(id, newFles);
    if (updated) {
      setSessie(updated);
      navigate(`/sessie/${id}/fles/${flesId}`);
    }
  };

  const handleDeleteFles = (flesId: string) => {
    if (!sessie) return;
    const verwijderdeFles = sessie.flessen.find((f) => f.id === flesId);
    if (!verwijderdeFles) return;
    const flesNaam = getFlesNaam(verwijderdeFles.tastingData) || t.nieuweFles;

    // Optimistisch uit UI
    setSessie({ ...sessie, flessen: sessie.flessen.filter((f) => f.id !== flesId) });

    let dismissed = false;
    toast.success(`"${flesNaam}" verwijderd`, {
      duration: 5000,
      action: {
        label: 'Ongedaan maken',
        onClick: () => {
          dismissed = true;
          setSessie((prev) =>
            prev ? { ...prev, flessen: [...prev.flessen, verwijderdeFles] } : prev
          );
          toast.success(`"${flesNaam}" hersteld`);
        },
      },
      onDismiss: () => {
        if (!dismissed) deleteFles(id, flesId);
      },
    });
  };

  const handleDeleteSessie = () => {
    if (!sessie) return;
    const naam = sessie.naam;
    navigate('/');
    let dismissed = false;
    toast.success(`Sessie "${naam}" verwijderd`, {
      duration: 5000,
      action: {
        label: 'Ongedaan maken',
        onClick: () => {
          dismissed = true;
          navigate(`/sessie/${id}`);
          toast.success(`Sessie "${naam}" hersteld`);
        },
      },
      onDismiss: () => {
        if (!dismissed) deleteSession(id);
      },
    });
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem var(--gap)', fontFamily: 'var(--font-body)', color: 'var(--color-gray)' }}>
        Laden...
      </div>
    );
  }

  if (!sessie) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem var(--gap)', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-gray)' }}>{t.nietGevonden}</p>
        <Button variant="outline" size="sm" style={{ marginTop: '1rem' }} onClick={() => navigate('/')}>
          ← {t.back}
        </Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem var(--gap)' }}>
      {/* Back nav */}
      <button
        onClick={() => navigate('/')}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.375rem',
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--color-gray)', marginBottom: '1.5rem', padding: 0,
        }}
      >
        <ArrowLeft size={14} /> {t.back}
      </button>

      {/* Header */}
      <div style={{ marginBottom: '1.5rem', borderBottom: '4px solid var(--color-border)', paddingBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', margin: '0 0 0.5rem' }}>{sessie.naam}</h1>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-gray)', fontSize: '0.82rem', letterSpacing: '0.04em', margin: '0 0 0.75rem' }}>
          {format(new Date(sessie.datum), 'EEEE d MMMM yyyy', { locale })}
          {' · '}
          {sessie.flessen.length} {sessie.flessen.length === 1 ? t.fles : t.flessen}
        </p>
        <BiodynamischBadge datum={sessie.datum} variant="compact" />
        {sessie.beschrijving && (
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-gray)', fontSize: '0.9rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
            {sessie.beschrijving}
          </p>
        )}
      </div>

      {/* Acties */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <Button onClick={handleAddFles} variant="primary" size="md" style={{ flex: 1, minWidth: '160px', justifyContent: 'center' }}>
          <PlusCircle size={16} /> {t.toevoegen}
        </Button>

        {/* Verwijder sessie — met bevestigingsdialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" size="md" style={{ justifyContent: 'center' }}>
              <Trash2 size={16} /> {t.verwijder}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.verwijderTitel}</DialogTitle>
              <DialogDescription>{t.verwijderOmschrijving}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" size="sm">{t.annuleer}</Button>
              </DialogClose>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteSessie}
              >
                {t.bevestig}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Flessenlijst */}
      {sessie.flessen.length === 0 ? (
        <div style={{
          border: '4px dashed var(--color-border)',
          padding: '3rem 2rem',
          textAlign: 'center',
        }}>
          <Wine size={48} style={{ margin: '0 auto 1rem', opacity: 0.2, display: 'block' }} />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-on-surface)' }}>
            {t.leeg}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-gray)' }}>
            {t.leegSub}
          </p>
        </div>
      ) : (
        <div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '0.75rem',
          }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.68rem',
              letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-gray)',
              paddingLeft: '0.75rem', borderLeft: '8px solid var(--color-primary)',
            }}>
              {t.flessen_label}
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-gray)' }}>
              {sessie.flessen.length}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {sessie.flessen.map((fles, index) => {
              const naam = getFlesNaam(fles.tastingData) || t.nieuweFles;
              return (
                <div
                  key={fles.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    background: 'var(--color-white)',
                    border: '4px solid var(--color-border)',
                    padding: '1rem 1.25rem',
                  }}
                >
                  {/* Nummer */}
                  <span style={{
                    fontFamily: 'var(--font-headline)', fontWeight: 900, fontSize: '1.1rem',
                    color: 'var(--color-gray-light)', width: '2rem', textAlign: 'center',
                    flexShrink: 0, userSelect: 'none',
                  }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Naam + type */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'var(--font-headline)', fontWeight: 900, fontSize: '0.95rem',
                      textTransform: 'uppercase', letterSpacing: '-0.02em',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {naam}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                      <Badge variant="outline">{fles.drankType}</Badge>
                      {fles.score !== undefined && (
                        <Badge variant="primary">{fles.score}/10</Badge>
                      )}
                    </div>
                  </div>

                  {/* Acties */}
                  <div style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}>
                    <button
                      onClick={() => handleDeleteFles(fles.id)}
                      title={`Fles "${naam}" verwijderen`}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        padding: '0.5rem', color: 'var(--color-gray)',
                        display: 'flex', alignItems: 'center',
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => navigate(`/sessie/${id}/fles/${fles.id}`)}
                      title={`Open fles "${naam}"`}
                      style={{
                        background: 'var(--color-primary)', border: 'none', cursor: 'pointer',
                        padding: '0.5rem 0.75rem', color: '#fff',
                        display: 'flex', alignItems: 'center',
                      }}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
