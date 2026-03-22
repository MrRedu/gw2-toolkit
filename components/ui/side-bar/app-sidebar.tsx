'use client';
import { Sidebar } from '@/components/ui/sidebar';
import { HeaderSidebar } from './header-sidebar';
import { BodySidebar } from './body-sidebar';
import { FooterSidebar } from './footer-sidebar';

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      {/* Header */}
      <HeaderSidebar />
      <BodySidebar />
      <FooterSidebar />
    </Sidebar>
  );
}
