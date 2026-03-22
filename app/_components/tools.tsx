import { Button } from '@/components/ui/button';
import { NAV_GROUPS } from '@/constants/navigation';
import Link from 'next/link';

export const Tools = () => {
  const allTools = NAV_GROUPS.flatMap((group) => group.items);

  return (
    <section className="w-full py-16 md:py-32" id="tools">
      <div className="container px-4 md:px-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground mb-16">
          Featured
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {allTools.map((tool) => (
            <div
              key={tool.label}
              className="flex flex-col items-start justify-between space-y-5"
            >
              <p className="leading-snug text-muted-foreground max-w-xs">
                <span className="font-bold text-foreground">{tool.label}.</span>{' '}
                {tool.description || tool.tooltip}
              </p>
              <Button variant="outline" asChild>
                <Link href={tool.href}>{tool.ctaLabel || 'Launch'}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
