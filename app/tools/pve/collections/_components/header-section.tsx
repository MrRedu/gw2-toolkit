import { CodeIcon } from 'lucide-react';

// interface HeaderSectionProps {}

export const HeaderSection = () =>
  // props: HeaderSectionProps
  {
    return (
      <header className="mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-linear-to-br from-emerald-500/20 to-green-600/10 border border-emerald-700/30">
                <CodeIcon className="size-5 text-emerald-500" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight">
                Collections
              </h1>
            </div>
            <p className="text-sm text-black/80 dark:text-white/80 max-w-md">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
              optio harum aliquam repellendus voluptatem odit.
            </p>
          </div>
        </div>
      </header>
    );
  };
