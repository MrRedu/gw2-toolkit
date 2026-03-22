'use client';

import * as React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ItemIcon } from '@/components/atoms/item-icon';
import { CurrencyDisplay } from '@/components/atoms/currency-display';
import { Button } from '@/components/ui/button';
import { ExternalLink, Copy, Check } from 'lucide-react';
import Link from 'next/link';

interface ItemTooltipProps {
  itemId?: number;
  name: string;
  icon: string;
  chatLink?: string;
  qty?: number;
  priceObj?: { buy: number; sell: number };
  unitPrice?: number;
  children: React.ReactNode;
}

export function ItemTooltip({
  itemId,
  name,
  icon,
  chatLink,
  qty,
  priceObj,
  unitPrice,
  children,
}: ItemTooltipProps) {
  const isMobile = useIsMobile();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (chatLink) {
      navigator.clipboard.writeText(chatLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const wikiUrl = `https://wiki.guildwars2.com/wiki/Special:Search?search=${encodeURIComponent(itemId?.toString() || name)}`;

  const content = (
    <div className="flex flex-col gap-3">
      <div className="font-bold text-sm text-primary border-b pb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ItemIcon src={icon} alt={name} size={20} />
          {name}
        </div>
      </div>

      {priceObj ? (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
            <span className="text-muted-foreground">Unit Buy (Instant):</span>
            <div className="text-right">
              <CurrencyDisplay copper={priceObj.sell} />
            </div>
            <span className="text-muted-foreground">Unit Buy (Order):</span>
            <div className="text-right">
              <CurrencyDisplay copper={priceObj.buy} />
            </div>
          </div>

          {qty && qty > 1 && (
            <div className="pt-2 border-t mt-1">
              <div className="flex items-center justify-between text-[11px] font-medium gap-2">
                <span className="text-muted-foreground whitespace-nowrap">
                  {Number.isInteger(qty) ? qty : qty.toFixed(2)}x Total:
                </span>
                <div className="shrink-0">
                  <CurrencyDisplay
                    copper={Math.round((unitPrice || 0) * qty)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-[11px] text-zinc-500 italic">
          Account Bound / No price data
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 pt-2 border-t mt-1">
        <Button variant="outline" size="xs" asChild>
          <Link href={wikiUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="size-3.5" />
            Wiki
          </Link>
        </Button>
        <Button
          variant="outline"
          size="xs"
          onClick={handleCopy}
          disabled={!chatLink}
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              Chat Code
            </>
          )}
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="w-64 bg-card border p-3 shadow-2xl">
          {content}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-64 bg-card border p-3 shadow-2xl">
        {content}
      </HoverCardContent>
    </HoverCard>
  );
}
