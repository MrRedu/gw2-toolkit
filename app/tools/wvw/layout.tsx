import { Section } from '@/components/atoms/section';
import { ReactNode } from 'react';

export default function WvWLayout({ children }: { children: ReactNode }) {
  return <Section variant="red">{children}</Section>;
}
