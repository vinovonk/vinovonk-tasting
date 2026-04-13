import { type SelectHTMLAttributes, forwardRef, useState } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, placeholder, options, style, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

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
        <select
          ref={ref}
          id={id}
          style={{
            width: '100%',
            padding: '0.65rem 0.875rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            color: 'var(--color-on-surface)',
            background: 'var(--color-white)',
            border: `4px solid ${focused ? 'var(--color-primary)' : error ? '#b91c1c' : 'var(--color-border)'}`,
            borderRadius: 0,
            outline: 'none',
            cursor: 'pointer',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23000' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.875rem center',
            paddingRight: '2.5rem',
            transition: 'border-color 150ms ease',
            ...style,
          }}
          onFocus={(e) => { setFocused(true); onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); onBlur?.(e); }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#b91c1c' }}>
            {error}
          </span>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';
