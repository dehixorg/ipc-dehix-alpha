import React from 'react';
import {
  BookOpen,
  Briefcase,
  HomeIcon,
  ImagePlus,
  Package,
  User,
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

const SettingsSidebarMenu = () => {
  const menuItems = [
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
      href: '/freelancer/settings/personal-info',
      icon: <User className="h-5 w-5" />,
      label: 'Personal Info',
    },
    {
      href: '/freelancer/settings/professional-info',
      icon: <Briefcase className="h-5 w-5" />,
      label: 'Professional Info',
    },
    {
      href: '/freelancer/settings/projects',
      icon: <Package className="h-5 w-5" />,
      label: 'Projects',
    },
    {
      href: '/freelancer/settings/education-info',
      icon: <BookOpen className="h-5 w-5" />,
      label: 'Education',
    },
    {
      href: '/freelancer/settings/resume',
      icon: <ImagePlus className="h-5 w-5" />,
      label: 'Portfolio',
    },
  ];
  
  return (
    <nav className="flex flex-col h-full">
      <div className="flex-1 space-y-1 py-4">
        {menuItems.map((item, index) => (
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

export default SettingsSidebarMenu;