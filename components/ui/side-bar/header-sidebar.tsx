import { DrakeIcon } from '@/components/atoms/icons/drake.icon';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

export const HeaderSidebar = () => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className="@container/header">
          <Link href="/" className="flex items-center gap-2" aria-label="Home">
            <div className="grid place-items-center p-1 bg-red-500 rounded-md">
              <DrakeIcon className="size-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight hidden @[180px]:block">
              GW2 Toolkit
            </h1>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};
