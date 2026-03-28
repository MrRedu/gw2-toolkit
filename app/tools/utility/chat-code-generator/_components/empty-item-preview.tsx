import { cn } from '@/lib/utils';
import Image from 'next/image';

export const EmptyItemPreview = () => {
  return (
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
  );
};
