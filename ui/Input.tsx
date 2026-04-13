import { type InputHTMLAttributes, forwardRef, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, style, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    const inputStyle = {
      width: '100%',
      padding: '0.65rem 0.875rem',
      fontFamily: 'var(--font-body)',
      fontSize: '0.95rem',
      color: 'var(--color-on-surface)',
      background: 'var(--color-white)',
      border: `4px solid ${focused ? 'var(--color-primary)' : error ? '#b91c1c' : 'var(--color-border)'}`,
      borderRadius: 0,
      outline: 'none',
      boxShadow: focused ? 'inset 0 0 0 1px var(--color-primary)' : 'none',
      transition: 'border-color 150ms ease',
      ...style,
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        {label && (
          <label
            htmlFor={id}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-on-surface)',
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          style={inputStyle}
          onFocus={(e) => { setFocused(true); onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); onBlur?.(e); }}
          {...props}
        />
        {error && (
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#b91c1c' }}>
            {error}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
