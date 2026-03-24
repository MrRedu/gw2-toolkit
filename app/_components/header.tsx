import { CommandMenu } from '@/components/command-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full ">
      <div className="flex h-14 items-center gap-4 px-4 mx-auto w-full max-w-7xl bg-[url('/images/bg-header-inactive.webp')] hover:bg-[url('/images/bg-header-active.webp')] bg-size-[100%_78px] bg-center bg-no-repeat">
        <SidebarTrigger />
        <CommandMenu className="ml-auto md:max-w-sm" />
      </div>
    </header>
  );
};
