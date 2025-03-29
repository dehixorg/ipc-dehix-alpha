'use client';

import SkillDomainForm from '@/components/freelancer/talent/skilldomainForm';
import Header from '@/components/header/header';
import SidebarMenu from '@/components/menu/sidebarMenu';
import {
    menuItemsBottom,
    menuItemsTop,
} from '@/config/menuItems/freelancer/dashboardMenuItems';
import React from 'react';

export default function Talent() {
  return React.createElement(
    'div',
    { className: 'flex min-h-screen w-full flex-col bg-muted/40' },
    React.createElement(SidebarMenu, {
      menuItemsTop: menuItemsTop,
      menuItemsBottom: menuItemsBottom,
      active: 'Talent'
    }),
    React.createElement(
      'div',
      { className: 'flex flex-col sm:gap-4 sm:py-4 sm:pl-14 mb-8' },
      React.createElement(Header, {
        menuItemsTop: menuItemsTop,
        menuItemsBottom: menuItemsBottom,
        activeMenu: 'Projects',
        breadcrumbItems: [
          { label: 'Freelancer', link: '/dashboard/freelancer' },
          { label: 'Dehix Talent', link: '#' }
        ]
      }),
      React.createElement(
        'main',
        { className: 'ml-5' },
        React.createElement(SkillDomainForm)
      )
    )
  );
} 