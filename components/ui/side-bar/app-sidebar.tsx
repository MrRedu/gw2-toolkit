'use client';
import { Sidebar } from '@/components/ui/sidebar';
import { HeaderSidebar } from './header-sidebar';
import { BodySidebar } from './body-sidebar';

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      {/* Header */}
      <HeaderSidebar />
      <BodySidebar />
      {/* <SidebarFooter>Footer</SidebarFooter> */}
    </Sidebar>
  );
}
