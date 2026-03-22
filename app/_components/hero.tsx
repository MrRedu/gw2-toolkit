import { Button } from '@/components/ui/button';
import {
  AnvilIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  ZapIcon,
} from 'lucide-react';
import Link from 'next/link';

const ITEMS = [
  {
    icon: TrendingUpIcon,
    title: 'Profitability Analysis',
    description:
      'Maximize your earnings with real-time updates on Mystic Forge promotions and material crafting.',
  },
  {
    icon: ZapIcon,
    title: 'Live Market Data',
    description:
      'Direct integration with the Guild Wars 2 API ensures you always have the latest Trading Post prices.',
  },
  {
    icon: AnvilIcon,
    title: 'PvE & WvW Utilities',
    description:
      'A growing collection of specialized tools to optimize your daily gameplay and endgame progression.',
  },
];

export const Hero = () => {
  return (
    <section className="relative flex h-dvh items-center justify-center overflow-hidden bg-background py-32 w-full">
      {/* Background blur blobs */}
      <div aria-hidden="true">
        <div className="absolute -right-0 -bottom-[30rem] size-[35rem] rounded-full bg-rose-400 opacity-40 blur-[5rem] md:-right-[2rem] md:-bottom-[50rem] md:size-[55rem] dark:opacity-20" />
        <div className="absolute -right-[20rem] -bottom-[20rem] size-[35rem] rounded-full bg-sky-500 opacity-40 blur-[5rem] md:-right-[32rem] md:-bottom-[36rem] md:size-[55rem] dark:opacity-20" />
      </div>
      <div className="relative container flex h-full flex-col justify-between">
        <div className="flex flex-1 items-center justify-center">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground md:text-5xl lg:text-6xl">
              GW2 Toolkit
            </h1>
            <p className="mt-8 max-w-xl text-pretty text-muted-foreground md:text-lg">
              {`A collection of tools for Guild Wars 2 players.`}
            </p>
            <Button size="lg" className="mt-10" asChild>
              <Link href="/tools">
                Explore tools
                <ArrowRightIcon />
              </Link>
            </Button>
          </div>
        </div>
        <div className="pt-16">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-0">
            {ITEMS.map((item) => (
              <div
                key={item.title}
                className="flex flex-col border-l border-primary px-6 md:px-8"
              >
                <item.icon className="mb-4 size-6" />
                <h2 className="font-semibold text-foreground">{item.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
