import { useState } from 'react';

interface AutocompleteInputProps {
  id?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  suggesties: string[];
}

export function AutocompleteInput({ id, placeholder, value, onChange, suggesties }: AutocompleteInputProps) {
  const [show, setShow] = useState(false);
  const [idx, setIdx] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && show && suggesties.length > 0) {
      e.preventDefault();
      onChange(suggesties[idx]);
      setShow(false);
    } else if (e.key === 'ArrowDown' && show) {
      e.preventDefault();
      setIdx(p => (p < suggesties.length - 1 ? p + 1 : 0));
    } else if (e.key === 'ArrowUp' && show) {
      e.preventDefault();
      setIdx(p => (p > 0 ? p - 1 : suggesties.length - 1));
    } else if (e.key === 'Escape') {
      setShow(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => { onChange(e.target.value); setShow(true); setIdx(0); }}
        onKeyDown={handleKeyDown}
        onFocus={() => setShow(true)}
        onBlur={() => setTimeout(() => setShow(false), 200)}
        role="combobox"
        aria-expanded={show && suggesties.length > 0}
        aria-autocomplete="list"
        style={{
          width: '100%', padding: '0.65rem 0.875rem', fontFamily: 'var(--font-body)',
          fontSize: '0.95rem', border: '4px solid var(--color-border)',
          background: 'var(--color-white)', color: 'var(--color-on-surface)',
          outline: 'none', boxSizing: 'border-box',
        }}
      />
      {show && suggesties.length > 0 && (
        <div role="listbox" style={{
          position: 'absolute', zIndex: 50, width: '100%', marginTop: '2px',
          background: 'var(--color-background)', border: '4px solid var(--color-border)',
          boxShadow: 'var(--shadow-card)', maxHeight: '200px', overflowY: 'auto',
        }}>
          {suggesties.map((s, i) => (
            <button
              key={s}
              type="button"
              role="option"
              aria-selected={i === idx}
              onMouseDown={(e) => { e.preventDefault(); onChange(s); setShow(false); }}
              style={{
                width: '100%', textAlign: 'left', padding: '0.6rem 0.875rem',
                background: i === idx ? 'var(--color-surface)' : 'transparent',
                border: 'none', borderBottom: '1px solid var(--color-gray-light)',
                cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.9rem',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
