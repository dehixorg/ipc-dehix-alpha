'use client';
import SkillDomainForm from '@/components/freelancer/talent/skilldomainForm';
import Header from '@/components/header/header';
import SidebarMenu from '@/components/menu/sidebarMenu';
import {
    menuItemsBottom,
    menuItemsTop,
} from '@/config/menuItems/freelancer/dashboardMenuItems';
import React from 'react';

const Talent = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SidebarMenu
        menuItemsTop={menuItemsTop}
        menuItemsBottom={menuItemsBottom}
        active="Talent"
      />
      <div className="flex flex-col sm:gap-0 sm:py-0 mb-8 sm:pl-14">
        <Header
          menuItemsTop={menuItemsTop}
          menuItemsBottom={menuItemsBottom}
          activeMenu="Projects"
          breadcrumbItems={[
            { label: 'Freelancer', link: '/dashboard/freelancer' },
            { label: 'Dehix Talent', link: '#' },
          ]}
        />
        <main className="ml-5">
          <SkillDomainForm />
        </main>
      </div>
    </div>
  );
};

export default Talent;