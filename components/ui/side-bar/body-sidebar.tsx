import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { type LucideIcon, AnvilIcon, HomeIcon, SwordsIcon } from 'lucide-react';
import Link from 'next/link';

export type NavItem = {
  label: string;
  href: string;
  tooltip: string;
  icon: LucideIcon;
};

export type NavGroup = {
  label?: string;
  items: NavItem[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    // label: 'Home',
    items: [
      {
        label: 'Home',
        href: '/',
        tooltip: 'Home',
        icon: HomeIcon,
      },
    ],
  },
  {
    label: 'PvE',
    items: [
      {
        label: 'Material promotion',
        href: '/tools/material-promotion',
        tooltip: 'Material promotion',
        icon: AnvilIcon,
      },
    ],
  },
  {
    label: 'WvW',
    items: [
      {
        label: 'Test',
        href: '#',
        tooltip: 'Test',
        icon: SwordsIcon,
      },
    ],
  },
];

export const BodySidebar = () => {
  return (
    <SidebarContent>
      {NAV_GROUPS.map((group, index) => (
        <SidebarGroup key={group.label || index}>
          {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
          <SidebarGroupContent>
            {group.items.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton tooltip={item.tooltip} asChild>
                  <Link href={item.href} className="text-nowrap">
                    <item.icon />
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
};
