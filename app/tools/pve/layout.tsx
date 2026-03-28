import { Section } from '@/components/atoms/section';
import { type ReactNode } from 'react';

export default function PvELayout({ children }: { children: ReactNode }) {
  return <Section variant="green">{children}</Section>;
}
