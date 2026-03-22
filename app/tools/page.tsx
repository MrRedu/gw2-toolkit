import { NAV_GROUPS } from '@/components/ui/side-bar/body-sidebar';
import Link from 'next/link';

const filteredGroups = NAV_GROUPS.filter(
  (group) =>
    !group.items.some((item) => item.href === '/' || item.href === '/tools'),
);

export default function ToolsPage() {
  return (
    <section className="py-32 w-full">
      <div className="max-w-7xl mx-auto w-full space-y-20 px-4 md:px-6 lg:px-8">
        <h1 className="text-5xl font-semibold tracking-tight lg:text-7xl text-foreground">
          Tools
        </h1>

        <div className="space-y-16">
          {filteredGroups.map((group, index) => (
            <div key={group.label || index} className="space-y-8">
              {group.label && (
                <h2 className="text-3xl font-bold border-b pb-2 text-foreground/80 uppercase tracking-widest">
                  {group.label}
                </h2>
              )}
              <ul className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group relative flex flex-row items-center gap-6 rounded-2xl border border-transparent bg-muted/30 p-4 transition-all hover:border-primary/20 hover:bg-muted/50 hover:shadow-lg"
                    >
                      <div className="flex size-16 items-center justify-center rounded-xl bg-background shadow-sm transition-transform group-hover:scale-110">
                        <item.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                          {item.label}
                        </h3>
                        <p className="text-sm text-foreground/60">
                          {item.tooltip}
                        </p>
                      </div>
                      <div className="opacity-0 transition-opacity group-hover:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-primary"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
