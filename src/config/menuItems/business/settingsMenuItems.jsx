'use client';

import { HomeIcon, User } from 'lucide-react';
import Image from 'next/image';
import { MenuItem } from '../../../components/menu/sidebarMenu';

export const menuItemsTop = [
  {
    href: '#',
    icon: (
      <Image
        src="/dehix.png"
        alt="Dehix Logo"
        width={16}
        height={16}
        className="transition-all group-hover:scale-110 invert dark:invert-0"
      />
    ),
    label: 'Dehix',
  },
  {
    href: '/dashboard/business',
    icon: <HomeIcon className="h-5 w-5" />,
    label: 'Home',
  },
  {
    href: '/business/settings/business-info',
    icon: <User className="h-5 w-5" />,
    label: 'Business Info',
  },
];

export const menuItemsBottom = [];