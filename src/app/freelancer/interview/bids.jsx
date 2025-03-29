import React from 'react';
import { useSelector } from 'react-redux';
import SidebarMenu from './components/menu/sidebarMenu';
import { menuItemsBottom, menuItemsTop } from './config/menuItems/freelancer/interviewMenuItems';
import Header from './components/header/header';
import Bids from './components/freelancer/bids/Bids';

export default function ProfilePage() {
  const user = useSelector((state) => state.user);
  
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <SidebarMenu
        menuItemsTop={menuItemsTop}
        menuItemsBottom={menuItemsBottom}
        active="Bids"
      />
      <div className="flex mb-8 flex-col sm:pl-14 w-full mb-5">
        <Header
          menuItemsTop={menuItemsTop}
          menuItemsBottom={menuItemsBottom}
          activeMenu="Dashboard"
          breadcrumbItems={[
            { label: 'Freelancer', link: '/dashboard/freelancer' },
            { label: 'Interview', link: '/freelancer/interview/profile' },
            { label: 'Bids', link: '#' },
          ]}
        />
        <div className="ml-10 mt-6 mb-10">
          <h1 className="text-3xl font-bold">Interview Bid's</h1>
          <p className="text-gray-400 mt-2">
            Select your bids strategically and secure your interview
          </p>
        </div>
        <Bids userId={user.uid} />
      </div>
    </div>
  );
}