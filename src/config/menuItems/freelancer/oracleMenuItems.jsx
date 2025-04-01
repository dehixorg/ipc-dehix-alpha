import React from 'react';
import {
  BookOpen,
  Briefcase,
  HomeIcon,
  Package,
  User,
  Settings,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Define MenuItem type
const MenuItem = ({ href, icon, label, disabled = false }) => {
  const linkClasses = "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:text-gray-900 dark:text-gray-300 dark:hover:text-white group";
  const disabledClasses = "opacity-50 cursor-not-allowed";
  
  if (disabled) {
    return (
      <div className={`${linkClasses} ${disabledClasses}`}>
        {icon}
        <span>{label}</span>
      </div>
    );
  }
  
  return (
    <Link href={href} className={linkClasses}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const OracleSidebarMenu = () => {
  const topMenuItems = [
    {
      href: '#',
      icon: (
        <Image
          src="/dehix.png"
          alt="Icon"
          width={16}
          height={16}
          className="transition-all group-hover:scale-110 invert dark:invert-0"
        />
      ),
      label: 'Dehix',
    },
    {
      href: '/dashboard/freelancer',
      icon: <HomeIcon className="h-5 w-5" />,
      label: 'Home',
    },
    {
      href: '/freelancer/oracleDashboard/businessVerification',
      icon: <Briefcase className="h-5 w-5" />,
      label: 'Business Verification',
    },
    {
      href: '/freelancer/oracleDashboard/workExpVerification',
      icon: <User className="h-5 w-5" />,
      label: 'Experience Verification',
    },
    {
      href: '/freelancer/oracleDashboard/projectVerification',
      icon: <Package className="h-5 w-5" />,
      label: 'Project Verification',
    },
    {
      href: '/freelancer/oracleDashboard/educationVerification',
      icon: <BookOpen className="h-5 w-5" />,
      label: 'Education Verification',
    },
  ];
  
  const bottomMenuItems = [
    {
      href: '/freelancer/settings/personal-info',
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings',
    },
  ];
  
  return (
    <nav className="flex flex-col h-full">
      <div className="flex-1 space-y-1 py-4">
        {topMenuItems.map((item, index) => (
          <MenuItem
            key={index}
            href={item.href}
            icon={item.icon}
            label={item.label}
            disabled={item.disabled}
          />
        ))}
      </div>
      
      <div className="py-4 border-t border-gray-200 dark:border-gray-700">
        {bottomMenuItems.map((item, index) => (
          <MenuItem
            key={index}
            href={item.href}
            icon={item.icon}
            label={item.label}
            disabled={item.disabled}
          />
        ))}
      </div>
    </nav>
  );
};

export default OracleSidebarMenu;