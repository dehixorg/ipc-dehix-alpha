'use client';

import {
  Archive,
  BookMarked,
  CheckCircle2,
  Home,
  MessageSquare,
  Settings,
  ShoppingCart,
  StickyNote,
  Trash2,
  Users2,
  XCircle,
} from 'lucide-react';
import Image from 'next/image';
import { MenuItem } from '../../../components/menu/sidebarMenu';

const MenuConfigurations = () => {
  const menuItemsTop = [
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
      icon: <Home className="h-5 w-5" />,
      label: 'Dashboard',
    },
    {
      href: '/business/market',
      icon: <ShoppingCart className="h-5 w-5" />,
      label: 'Market',
    },
    {
      href: '/business/talent',
      icon: <Users2 className="h-5 w-5" />,
      label: 'Dehix Talent',
      subItems: [
        {
          label: 'Overview',
          href: '/business/talent',
          icon: <Users2 className="h-4 w-4" />,
        },
        {
          label: 'Invites',
          href: '/business/market/invited',
          icon: <BookMarked className="h-4 w-4" />,
        },
        {
          label: 'Accepted',
          href: '/business/market/accepted',
          icon: <CheckCircle2 className="h-4 w-4" />,
        },
        {
          label: 'Rejected',
          href: '/business/market/rejected',
          icon: <XCircle className="h-4 w-4" />,
        },
      ],
    },
    {
      href: '/chat',
      icon: <MessageSquare className="h-5 w-5" />,
      label: 'Chats',
    },
    {
      href: '/notes',
      icon: <StickyNote className="h-5 w-5" />,
      label: 'Notes',
    },
  ];

  const menuItemsBottom = [
    {
      href: '/business/settings/business-info',
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings',
    },
  ];

  const notesMenu = [
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
      icon: <Home className="h-5 w-5" />,
      label: 'Home',
    },
    {
      href: '/notes',
      icon: <StickyNote className="h-5 w-5" />,
      label: 'Notes',
    },
    {
      href: '/notes/archive',
      icon: <Archive className="h-5 w-5" />,
      label: 'Archive',
    },
    {
      href: '/notes/trash',
      icon: <Trash2 className="h-5 w-5" />,
      label: 'Trash',
    },
  ];

  return null; // This component doesn't render anything
};

export { MenuConfigurations };

// Export the menu configurations directly as well
export const menuItemsTop = MenuConfigurations().menuItemsTop;
export const menuItemsBottom = MenuConfigurations().menuItemsBottom;
export const notesMenu = MenuConfigurations().notesMenu;