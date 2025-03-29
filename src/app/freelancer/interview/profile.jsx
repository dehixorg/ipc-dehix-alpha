import React from 'react';
import { useSelector } from 'react-redux';
import Header from './components/header/header';
import SidebarMenu from './components/menu/sidebarMenu';
import {
  menuItemsBottom,
  menuItemsTop,
} from './config/menuItems/freelancer/interviewMenuItems';
import InterviewProfile from './components/freelancer/interviewProfile/interviewProfile';

export default function ProfilePage() {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex min-h-screen w-full">
      <SidebarMenu
        menuItemsTop={menuItemsTop}
        menuItemsBottom={menuItemsBottom}
        active="Profile"
      />
      <div className="flex flex-col sm:py-2 sm:pl-14 mb-8 w-full">
        <Header
          menuItemsTop={menuItemsTop}
          menuItemsBottom={menuItemsBottom}
          activeMenu="Dashboard"
          breadcrumbItems={[
            { label: 'Freelancer', link: '/dashboard/freelancer' },
            { label: 'Interview', link: '#' },
          ]}
        />
        <InterviewProfile freelancerId={user?.uid} />
      </div>
    </div>
  );
}