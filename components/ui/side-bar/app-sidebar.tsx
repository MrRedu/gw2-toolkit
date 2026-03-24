'use client';
import { Sidebar } from '@/components/ui/sidebar';
import { HeaderSidebar } from './header-sidebar';
import { BodySidebar } from './body-sidebar';
import { FooterSidebar } from './footer-sidebar';

export function AppSidebar() {
  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      // className="bg-[url('/images/bg-sidebar.webp')]! bg-cover! bg-center! bg-no-repeat! **:data-[slot=sidebar-inner]:bg-transparent!"
    >
      {/* Header */}
      <div className="absolute inset-0 bg-[url('/images/bg-sidebar.webp')] bg-cover bg-no-repeat h-full w-full" />
      <HeaderSidebar />
      <BodySidebar />
      <FooterSidebar />
    </Sidebar>
  );
}
