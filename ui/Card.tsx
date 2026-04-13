import { type HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  shadow?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ shadow = true, style, children, ...props }, ref) => (
    <div
      ref={ref}
      style={{
        background: 'var(--color-white)',
        border: '4px solid var(--color-border)',
        boxShadow: shadow ? 'var(--shadow-card)' : 'none',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = 'Card';

export function CardHeader({ style, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '4px solid var(--color-border)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ style, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div style={{ padding: '1.25rem 1.5rem', ...style }} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ style, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{
        padding: '1rem 1.5rem',
        borderTop: '4px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
