import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TastingApp } from '../../TastingApp';
import './index.css';

// Detect language from URL path prefix (/en/...) or browser preference
function detectLang(): 'nl' | 'en' {
  if (window.location.pathname.startsWith('/en')) return 'en';
  const nav = navigator.language || 'nl';
  return nav.startsWith('en') ? 'en' : 'nl';
}

const lang = detectLang();

// Set HTML lang attribute
document.documentElement.lang = lang;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TastingApp lang={lang} />
  </StrictMode>,
);
