'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { type ComponentProps } from 'react';

export function Tabs(props: ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root {...props} />;
}

export function TabsList({ style, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      style={{
        display: 'flex',
        borderBottom: '4px solid var(--color-border)',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        ...style,
      }}
      {...props}
    />
  );
}

export function TabsTrigger({ style, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: '0.72rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        padding: '0.75rem 1.25rem',
        background: 'transparent',
        border: 'none',
        borderBottom: '4px solid transparent',
        marginBottom: '-4px',
        cursor: 'pointer',
        color: 'var(--color-gray)',
        whiteSpace: 'nowrap',
        transition: 'color 150ms, border-color 150ms',
        // Active staat via data-attribute — inline style werkt niet voor data-state
        // Gebruik CSS in global.css of een class
        ...style,
      }}
      className="proeven-tab-trigger"
      {...props}
    />
  );
}

export function TabsContent(props: ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content {...props} />;
}
