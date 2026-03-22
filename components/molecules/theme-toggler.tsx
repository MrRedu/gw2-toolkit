'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toggle } from '@/components/ui/toggle';

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Toggle
      aria-label="Toggle bookmark"
      size="lg"
      variant="outline"
      className="fixed right-8 bottom-8"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <SunIcon className="group-data-[state=on]/toggle:fill-foreground" />
      ) : (
        <MoonIcon className="group-data-[state=on]/toggle:fill-foreground" />
      )}
    </Toggle>
  );
};
