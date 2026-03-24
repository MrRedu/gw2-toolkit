import { type LucideIcon } from 'lucide-react';

export type NavItem = {
  label: string;
  href: string;
  tooltip: string;
  description?: string;
  ctaLabel?: string;
  icon?: LucideIcon;
  image?: string;
};

export type NavGroup = {
  label?: string;
  items: NavItem[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'PvE',
    items: [
      {
        label: 'Material Promotion',
        href: '/tools/material-promotion',
        tooltip: 'PvE: Material promotion',
        description: 'Description',
        ctaLabel: 'Calculate Now',
        image: '/icons/mystic_forge.png',
      },
      // {
      //   label: 'Meta Event Timer',
      //   href: '#',
      //   tooltip: 'Meta Event Timer',
      //   description:
      //     'Find the next meta event you want to play within a few seconds.',
      //   ctaLabel: 'Find Meta Event',
      // },
      // {
      //   label: 'Collections',
      //   href: '#',
      //   tooltip: 'Collections',
      //   description:
      //     'Easily get an overview of various collections and their current Trading Post buy and sell values.',
      //   ctaLabel: 'Browse Collections',
      // },
    ],
  },
  {
    label: 'WvW',
    items: [
      {
        label: 'Live Map',
        href: '#',
        tooltip: 'WvW: Live Map',
        description: 'Track the status of your favorite World vs. World map.',
        ctaLabel: 'Track Your Map',
        image: '/icons/wvw.png',
      },
      // {
      //   label: 'World vs. World Scoreboard',
      //   href: '#',
      //   tooltip: 'World vs. World Scoreboard',
      //   description:
      //     'Get a quick overview of every ongoing match in your World vs. World region.',
      //   ctaLabel: 'Discover Stats',
      // },
    ],
  },
  {
    label: 'Utility',
    items: [
      {
        label: 'Chat Code Generator',
        href: '/tools/chat-code-generator',
        tooltip: 'Utility: Chat Code Generator',
        description: 'Description',
        ctaLabel: 'Create Chat Code',
        image: '/icons/under_construction.png',
      },
      // {
      //   label: 'Trading Post Calculator',
      //   href: '#',
      //   tooltip: 'Trading Post Calculator',
      //   description:
      //     'Calculate the profit you can get after in-game taxes when flipping an item on the Trading Post.',
      //   ctaLabel: 'Calculate Now',
      // },
    ],
  },
];
