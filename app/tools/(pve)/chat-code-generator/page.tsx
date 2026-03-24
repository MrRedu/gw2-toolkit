'use client';

import { Section } from '@/components/atoms/section';
import {
  CheckIcon,
  CircleQuestionMarkIcon,
  CodeIcon,
  CopyIcon,
  ExternalLinkIcon,
  HouseIcon,
  Loader2Icon,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchItems } from '@/services/gw2api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ItemIcon } from '@/components/atoms/item-icon';
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
} from '@/components/ui/field';
import { useChatCodeGenerator } from '@/hooks/use-chat-code-generator';
import { type GW2Item } from '@/types/gw2';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';

export default function ChatCodeGeneratorPage() {
  const {
    form,
    searchResults,
    isSearching,
    selectedItem,
    finalCode,
    copied,
    handleSelectItem,
    copyToClipboard,
  } = useChatCodeGenerator();

  return (
    <Section variant="blue">
      <header className="mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-linear-to-br from-blue-500/20 to-indigo-600/10 border border-blue-700/30">
                <CodeIcon className="size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight">
                Chat Code Generator
              </h1>
            </div>
            <p className="text-sm text-black/80 dark:text-white/80 max-w-md">
              Generate funny, unusual and unique chat codes for items, skills,
              and more.
            </p>
          </div>
        </div>
      </header>

      <Alert variant="gw2">
        <Image
          src="/icons/mentoring_badge.png"
          alt="Mentoring Badge"
          width={36}
          height={36}
        />

        <AlertTitle>How it works</AlertTitle>
        <AlertDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit qui
          accusantium, laudantium commodi unde, corrupti architecto id,
          accusamus ea delectus optio iusto quam maiores in provident repellat
          cumque cupiditate! Voluptatem, hic soluta? Lorem ipsum dolor sit amet
          consectetur.
        </AlertDescription>
      </Alert>

      <div className="max-w-6xl mx-auto py-8 md:py-12 lg:py-16 flex flex-col lg:flex-row gap-10">
        {/* Form Group using Shadcn FieldGroup */}
        <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 h-fit">
          <Field
            className="md:col-span-2 relative group"
            data-invalid={!!form.formState.errors.itemId}
          >
            <FieldLabel htmlFor="itemId">Item ID</FieldLabel>
            <div className="relative">
              <Input
                id="itemId"
                placeholder="Enter the ID (e.g., 19976, 30689...)"
                {...form.register('itemId')}
                aria-invalid={!!form.formState.errors.itemId}
                variant="image"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2Icon className="size-5 animate-spin text-neutral-400" />
                </div>
              )}

              {/* Results Dropdown */}
              {form.watch('itemId').length >= 1 && !selectedItem && (
                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-2 duration-200 top-full">
                  {searchResults && searchResults.length > 0
                    ? searchResults.map((item: GW2Item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectItem(item)}
                          className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <ItemIcon src={item.icon} alt={item.name} size={40} />
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold truncate">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-neutral-500 font-mono">
                              ID: {item.id}
                            </span>
                          </div>
                        </button>
                      ))
                    : !isSearching && (
                        <div className="px-4 py-6 text-center">
                          <p className="text-sm font-medium text-neutral-500 mb-1">
                            No item found
                          </p>
                          <p className="text-[10px] text-neutral-400 uppercase tracking-tight">
                            Make sure the ID is correct
                          </p>
                        </div>
                      )}
                </div>
              )}
            </div>
            {form.formState.errors.itemId ? (
              <FieldError>{form.formState.errors.itemId.message}</FieldError>
            ) : (
              <FieldDescription>
                Enter the official numeric identifier of the item.
              </FieldDescription>
            )}
          </Field>

          <Field data-invalid={!!form.formState.errors.quantity}>
            <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
            <Input
              id="quantity"
              type="number"
              {...form.register('quantity', { valueAsNumber: true })}
              aria-invalid={!!form.formState.errors.quantity}
              className="text-center font-mono"
              variant="image"
            />
            {form.formState.errors.quantity ? (
              <FieldError>{form.formState.errors.quantity.message}</FieldError>
            ) : (
              <FieldDescription>Maximum 255.</FieldDescription>
            )}
          </Field>

          {/* New Fields: Skin and Upgrades */}
          <Field data-invalid={!!form.formState.errors.skinId}>
            <FieldLabel htmlFor="skinId">Skin ID (Optional)</FieldLabel>
            <Input
              id="skinId"
              placeholder="e.g., 4667"
              {...form.register('skinId')}
              aria-invalid={!!form.formState.errors.skinId}
              variant="image"
            />
            {form.formState.errors.skinId ? (
              <FieldError>{form.formState.errors.skinId.message}</FieldError>
            ) : (
              <FieldDescription>Visual appearance ID.</FieldDescription>
            )}
          </Field>

          <Field data-invalid={!!form.formState.errors.upgrade1Id}>
            <FieldLabel htmlFor="upgrade1Id">Upgrade 1 (Optional)</FieldLabel>
            <Input
              id="upgrade1Id"
              placeholder="e.g., 24554"
              {...form.register('upgrade1Id')}
              aria-invalid={!!form.formState.errors.upgrade1Id}
              variant="image"
            />
            {form.formState.errors.upgrade1Id ? (
              <FieldError>
                {form.formState.errors.upgrade1Id.message}
              </FieldError>
            ) : (
              <FieldDescription>Rune, Sigil, or Infusion ID.</FieldDescription>
            )}
          </Field>

          <Field data-invalid={!!form.formState.errors.upgrade2Id}>
            <FieldLabel htmlFor="upgrade2Id">Upgrade 2 (Optional)</FieldLabel>
            <Input
              id="upgrade2Id"
              placeholder="e.g., 24615"
              {...form.register('upgrade2Id')}
              aria-invalid={!!form.formState.errors.upgrade2Id}
              variant="image"
            />
            {form.formState.errors.upgrade2Id ? (
              <FieldError>
                {form.formState.errors.upgrade2Id.message}
              </FieldError>
            ) : (
              <FieldDescription>Second upgrade slot.</FieldDescription>
            )}
          </Field>
        </FieldGroup>

        {/* Selected Preview */}
        {/* Selected Preview - GW2 Style */}
        <div className="w-full flex justify-center">
          {selectedItem ? (
            <GW2ItemPreview
              item={selectedItem}
              quantity={form.watch('quantity') || 1}
              finalCode={finalCode}
              copied={copied}
              onCopy={copyToClipboard}
              upgrade1Id={form.watch('upgrade1Id')}
              upgrade2Id={form.watch('upgrade2Id')}
            />
          ) : (
            <div
              className={cn(
                'flex flex-col gap-2 items-center justify-center p-12 w-full rounded-3xl border transition-all duration-300',
                'bg-neutral-100/50 dark:bg-neutral-900/30 border-dashed border-neutral-300 dark:border-neutral-800',
              )}
            >
              <Image
                src="/icons/level-80_boost.png"
                alt="Item"
                width={64}
                height={64}
                className="rounded-full size-16 opacity-75"
              />
              <p className="text-muted-foreground font-medium">
                Search for an item to start
              </p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

/**
 * GW2-styled Item Preview component
 * Mimics the 'Customize' in-game UI
 */
function GW2ItemPreview({
  item,
  quantity,
  finalCode,
  copied,
  onCopy,
  upgrade1Id,
  upgrade2Id,
}: {
  item: GW2Item;
  quantity: number;
  finalCode: string;
  copied: boolean;
  onCopy: () => void;
  upgrade1Id?: string;
  upgrade2Id?: string;
}) {
  // Determine rarity color
  const getRarityColor = (rarity: string) => {
    switch (rarity?.toLowerCase()) {
      case 'legendary':
        return 'text-[#6f25d6]';
      case 'ascended':
        return 'text-[#fb3e8d]';
      case 'exotic':
        return 'text-[#ffa405]';
      case 'rare':
        return 'text-[#fcd00b]';
      case 'masterwork':
        return 'text-[#1a9306]';
      case 'fine':
        return 'text-[#62A4DA]';
      case 'basic':
        return 'text-white';
      case 'junk':
        return 'text-[#AAAAAA]';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="relative w-full max-w-sm bg-[#1e1e1e] shadow-2xl py-8 px-4 md:px-6 lg:px-8 bg-[url('/images/unnamed2.jpg')] bg-cover ">
      {/* Header "Customize" */}
      <h3 className="text-center text-xl text-white/90 font-medium font-serif mb-6 drop-shadow-md tracking-wider">
        Customize
      </h3>

      <img
        src="/images/corner-border.png"
        alt=""
        className="absolute right-2 top-2 rotate-270 pointer-events-none"
      />
      <img
        src="/images/left-border.png"
        alt=""
        className="absolute left-2 bottom-2 pointer-events-none"
      />
      <img
        src="/images/right-border.png"
        alt=""
        className="absolute right-2 bottom-2 pointer-events-none"
      />

      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        {/* Left Column: Equipment Details */}
        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <h4 className="text-sm py-1 mb-3 text-white font-semibold tracking-widest px-1 bg-[url('/images/header-standard.png')] bg-no-repeat bg-cover">
              Equipment
            </h4>

            {/* Item Icon and Name */}
            <div className="flex gap-3 items-start p-1 mb-2">
              <ItemIcon src={item.icon} alt={item.name} size={40} />
              <div className="flex flex-col min-w-0">
                <span
                  className={cn(
                    'font-bold truncate text-[15px] drop-shadow-sm',
                    getRarityColor(item.rarity),
                  )}
                >
                  {item.name}
                </span>
                {item.type === 'Weapon' && (
                  <span className="text-[12px] text-white/80">
                    Weapon Strength:{' '}
                    <span className="text-[#33ff33]">
                      {item.details.min_power} - {item.details.max_power}
                    </span>{' '}
                  </span>
                )}
              </div>
            </div>

            {/* Stats Slot */}
            <div className="relative group mb-2 cursor-pointer">
              <div className="bg-black/60 border border-neutral-700/50 p-2 text-sm hover:border-neutral-500 transition-colors h-9 flex items-center shadow-inner">
                <span className="text-white ml-2">Select Stats</span>
              </div>
            </div>

            {/* Upgrade 1 Slot */}
            <UpgradeSlot id={upgrade1Id} />

            {/* Upgrade 2 Slot - only for some items */}
            {upgrade2Id && <UpgradeSlot id={upgrade2Id} />}

            {/* Infusion Slot - Simple for now as normally items have infusion slots listed separately */}
            {/* <div className="bg-black/60 border border-neutral-700/50 p-2 flex items-center gap-2 cursor-pointer hover:border-neutral-500 transition-colors mb-2 shadow-inner group/infusion">
              <div className="size-6 shrink-0 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/30 overflow-hidden group-hover/infusion:border-blue-500/60 transition-colors">
                <div className="size-3 bg-blue-500/40 rounded-full blur-[2px]" />
              </div>
              <span className="text-[12px] text-white/60">
                Unused Infusion Slot
              </span>
            </div> */}
          </div>
        </div>

        {/* Right Column: Search Space Simulation */}
        <div className="space-y-4">
          <div className="bg-black/30 p-3 rounded-sm border border-white/5 shadow-inner">
            <div className="flex justify-between items-center mb-1">
              <p className="text-[11px] text-white/40 uppercase font-black tracking-wider">
                In-Game Code
              </p>
              <span className="text-[10px] text-white/30 font-bold">
                x{quantity}
              </span>
            </div>
            <code className="text-[12px] font-mono text-blue-400 break-all bg-black/50 p-2 block border border-blue-900/30 line-clamp-2 min-h-12 leading-tight">
              {finalCode}
            </code>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              size="xs"
              onClick={onCopy}
              variant="gw2"
              className="max-w-3/4 ml-auto w-full"
            >
              {/* {copied ? 'Copied' : 'Copy'} */}
              {copied ? (
                <>
                  <CheckIcon className="size-3.5 text-emerald-500" />
                  Copied!
                </>
              ) : (
                <>
                  <CopyIcon className="size-3.5" />
                  Chat Code
                </>
              )}
            </Button>
            <Button
              variant="gw2"
              size="xs"
              asChild
              className="max-w-3/4 mr-auto w-full"
            >
              <Link
                href={`https://wiki.guildwars2.com/wiki/${encodeURIComponent(item.name)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon className="size-3.5" />
                Wiki
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Dynamic Upgrade Slot component
 * Fetches and displays information for a GW2 Item by ID
 */
function UpgradeSlot({ id }: { id?: string }) {
  const isNumeric = id && /^\d+$/.test(id);

  const { data: upgrade, isLoading } = useQuery({
    queryKey: ['upgrade-item', id],
    queryFn: async () => {
      if (!id || !isNumeric) return null;
      const res = await fetchItems([parseInt(id)]);
      return res?.[0] ?? null;
    },
    enabled: !!id && isNumeric,
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });

  return (
    <div className="bg-black/60 border border-neutral-700/50 p-2 flex items-center gap-2 cursor-pointer hover:border-neutral-500 transition-colors mb-2 shadow-inner group/upgrade">
      {upgrade ? (
        <>
          <div className="size-6 shrink-0 relative border border-white/20 bg-black/40 overflow-hidden group-hover/upgrade:border-white/40 transition-colors shadow-inner">
            <ItemIcon src={upgrade.icon} alt={upgrade.name} size={24} />
          </div>
          <span className="text-[12px] text-white/80 font-medium truncate drop-shadow-sm selection:bg-blue-500/30">
            {upgrade.name}
          </span>
        </>
      ) : isLoading ? (
        <div className="flex items-center gap-2 py-0.5">
          <Loader2Icon className="size-3 animate-spin text-white/20" />
          <span className="text-[12px] text-white/20 italic">
            Buscando mejora...
          </span>
        </div>
      ) : (
        <>
          <div className="size-4 shrink-0 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/30 group-hover/upgrade:border-yellow-500/50 transition-colors">
            <div className="size-1.5 bg-yellow-500/40 rounded-full blur-[1px]" />
          </div>
          <span className="text-[12px] text-white/40  truncate selection:bg-transparent">
            Unused Upgrade Slot
          </span>
        </>
      )}
    </div>
  );
}
