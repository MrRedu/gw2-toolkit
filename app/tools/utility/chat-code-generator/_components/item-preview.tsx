import { ItemIcon } from '@/components/atoms/item-icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { fetchItems } from '@/services/gw2api';
import { useQuery } from '@tanstack/react-query';
import {
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  Loader2Icon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { type Item } from '@gw2api/types/data/item';

function UpgradeSlot({ id }: { id?: string }) {
  const isNumeric = Boolean(id && /^\d+$/.test(id));

  const { data: upgrade, isLoading } = useQuery({
    queryKey: ['upgrade-item', id],
    queryFn: async () => {
      if (!isNumeric) return null;
      const res = await fetchItems([parseInt(id!)]);
      return res?.[0] ?? null;
    },
    enabled: isNumeric,
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
            Searching for upgrade...
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

export const ItemPreview = ({
  item,
  quantity,
  finalCode,
  copied,
  onCopy,
  upgrade1Id,
  upgrade2Id,
}: {
  item: Item;
  quantity: number;
  finalCode: string;
  copied: boolean;
  onCopy: () => void;
  upgrade1Id?: string;
  upgrade2Id?: string;
}) => {
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
    <div className="relative w-full max-w-sm bg-[#1e1e1e] h-fit shadow-2xl py-8 px-4 md:px-6 lg:px-8 bg-[url('/images/unnamed2.jpg')] bg-cover bg-no-repeat ">
      {/* Header "Customize" */}
      <h3 className="text-center text-xl text-white/90 font-medium font-serif mb-6 drop-shadow-md tracking-wider">
        Customize
      </h3>

      <Image
        src="/images/corner-border.png"
        alt=""
        width={128}
        height={128}
        className="absolute right-2 top-2 rotate-270 pointer-events-none"
      />
      <Image
        src="/images/left-border.png"
        alt=""
        width={256}
        height={64}
        className="absolute left-2 bottom-2 pointer-events-none"
      />
      <Image
        src="/images/right-border.png"
        alt=""
        width={256}
        height={64}
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
                      {item.details?.min_power} - {item.details?.max_power}
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
};
