import {
  AnvilIcon,
  HammerIcon,
  HomeIcon,
  SwordsIcon,
  type LucideIcon,
} from 'lucide-react';

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
  // {
  //   label: 'Tools',
  //   items: [
  //     {
  //       label: 'Tools',
  //       href: '/tools',
  //       tooltip: 'Tools',
  //       icon: HammerIcon,
  //     },
  //   ],
  // },
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
