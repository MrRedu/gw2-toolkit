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
    );
  };
