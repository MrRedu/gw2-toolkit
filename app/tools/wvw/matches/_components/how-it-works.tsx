import { ResponsiveHoverCard } from '@/components/molecules/responsive-hover-card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ExternalLinkIcon } from 'lucide-react';
import Image from 'next/image';

export const HowItWorks = () => {
  return (
    <Alert variant="gw2">
      <Image
        src="/icons/mentoring_badge.png"
        alt="Mentoring Badge"
        width={36}
        height={36}
      />

      <AlertTitle>How it works</AlertTitle>
      <AlertDescription className="text-sm leading-relaxed">
        {/* This tool helps you generate custom chat codes for items, allowing you
        to specify quantities, skins, and upgrades like runes or sigils. To get
        started, you need to find the specific{' '}
        <ResponsiveHoverCard
          openDelay={200}
          className="w-80"
          trigger={
            <span className="font-bold underline decoration-dotted underline-offset-4 cursor-help text-blue-600 dark:text-blue-400">
              Item ID
            </span>
          }
        >
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium">Where to find the ID:</p>
            <div className="overflow-hidden rounded-md border border-dashed  grid place-items-center">
              <Image
                src="/images/id-location.webp"
                alt="ID Location"
                width={300}
                height={300}
              />
            </div>
            <p className="text-[10px] text-neutral-500 italic">
              The ID is usually found in the info box on the right side of any
              wiki page.
            </p>
          </div>
        </ResponsiveHoverCard>{' '}
        on the{' '}
        <a
          href="https://wiki.guildwars2.com/wiki/Main_Page"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
        >
          official wiki
          <ExternalLinkIcon className="size-3" />
        </a>
        . Simply paste the ID into the form below to generate your unique code. */}
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo
        expedita ex dignissimos? Assumenda adipisci saepe autem tenetur libero
        deserunt eius, voluptas fugit omnis quibusdam, rem laboriosam odio
        maxime accusantium repellendus.
      </AlertDescription>
    </Alert>
  );
};
