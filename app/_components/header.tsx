import { CommandMenu } from '@/components/command-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 mx-auto w-full">
        <SidebarTrigger />
        <CommandMenu className="ml-auto md:max-w-sm" />
      </div>
    </header>
  );
};
