import { Section } from '@/components/atoms/section';
import { type ReactNode } from 'react';

export default function UtilityLayout({ children }: { children: ReactNode }) {
  return <Section variant="blue">{children}</Section>;
}
