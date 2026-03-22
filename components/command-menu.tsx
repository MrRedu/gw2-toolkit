'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { NAV_GROUPS } from '@/constants/navigation';
import { SearchIcon } from 'lucide-react';
import { Kbd } from '@/components/ui/kbd';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function CommandMenu({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className={cn(
          'relative inline-flex flex-1 items-center justify-start text-muted-foreground',
          className,
        )}
      >
        <span className="inline-flex items-center gap-2">
          <SearchIcon className="h-4 w-4" />
          <span>Search...</span>
        </span>
        <Kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden select-none items-center gap-1 opacity-100 sm:flex">
          <span className="text-xs">Ctrl</span>K
        </Kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {NAV_GROUPS.map((group) => (
              <React.Fragment key={group.label || 'Other'}>
                <CommandGroup heading={group.label}>
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.href}
                      onSelect={() => {
                        runCommand(() => router.push(item.href));
                      }}
                    >
                      {item.icon && <item.icon className="size-6!" />}
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.label}
                          width={24}
                          height={24}
                          className="size-6 rounded-xs"
                        />
                      )}
                      <span>{item.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </React.Fragment>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
