'use client';

import { useEffect, useState } from 'react';
import { useHashRoute } from './router';
import { Toaster } from 'sonner';

// Views (geleidelijk invullen per fase)
import { Dashboard } from './views/Dashboard';
import { NewSession } from './views/NewSession';
import { SessionDetail } from './views/SessionDetail';
import { BottleTasting } from './views/BottleTasting';
import { Archive } from './views/Archive';
import { Settings } from './views/Settings';
import { BiodynamischView } from './views/BiodynamischView';
import { HoeGebruikView } from './views/HoeGebruikView';
import { BronnenView } from './views/BronnenView';

interface TastingAppProps {
  lang?: 'nl' | 'en';
}

export function TastingApp({ lang = 'nl' }: TastingAppProps) {
  const route = useHashRoute();
  const [mounted, setMounted] = useState(false);

  // Wacht op client-side mount (localStorage niet beschikbaar tijdens SSR)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
        <p>{lang === 'en' ? 'Loading...' : 'Laden...'}</p>
      </div>
    );
  }

  function renderView() {
    const { path, params } = route;

    switch (path) {
      case '/':
        return <Dashboard lang={lang} />;
      case '/sessie/nieuw':
        return <NewSession lang={lang} />;
      case '/sessie/:id':
        return <SessionDetail id={params.id} lang={lang} />;
      case '/sessie/:id/fles/nieuw':
        return <BottleTasting sessionId={params.id} flesId="nieuw" lang={lang} />;
      case '/sessie/:id/fles/:flesId':
        return <BottleTasting sessionId={params.id} flesId={params.flesId} lang={lang} />;
      case '/archief':
        return <Archive lang={lang} />;
      case '/instellingen':
        return <Settings lang={lang} />;
      case '/biodynamisch':
        return <BiodynamischView lang={lang} />;
      case '/hoe-gebruik-je-dit':
        return <HoeGebruikView lang={lang} />;
      case '/bronnen':
        return <BronnenView lang={lang} />;
      default:
        return <Dashboard lang={lang} />;
    }
  }

  return (
    <div
      style={{
        minHeight: '60vh',
        fontFamily: 'var(--font-body)',
        color: 'var(--color-on-surface)',
      }}
    >
      {renderView()}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            border: '4px solid var(--color-border)',
            borderRadius: '0',
            boxShadow: '4px 4px 0px 0px #000',
            fontFamily: 'var(--font-body)',
          },
        }}
      />
    </div>
  );
}
