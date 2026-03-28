import { CodeIcon } from 'lucide-react';

// interface HeaderSectionProps {}

export const HeaderSection = () => {
  // props: HeaderSectionProps
  return (
    <header className="mb-10">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-linear-to-br from-red-500/20 to-red-600/10 border border-red-700/30">
              <CodeIcon className="size-5 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight">
              WvW Matches
            </h1>
          </div>
          <p className="text-sm text-black/80 dark:text-white/80 max-w-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            accusantium animi, nisi.
          </p>
        </div>
      </div>
    </header>
  );
};
