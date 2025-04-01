import React from 'react';
import {
  Home,
  LineChart,
  Settings,
  Sparkles,
  BriefcaseBusiness,
  Store,
  TabletSmartphone,
  ShieldCheck,
  CalendarClock,
  MessageSquare,
  Archive,
  StickyNote,
  Trash2,
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

const SidebarMenu = ({ variant = "default" }) => {
  // Determine which menu items to display based on variant
  let menuItems;
  
  if (variant === "notes") {
    menuItems = [
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
  } else {
    // Default menu items for freelancer dashboard
    menuItems = [
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
        icon: <Home className="h-5 w-5" />,
        label: 'Dashboard',
      },
      {
        href: '/freelancer/market',
        icon: <Store className="h-5 w-5" />,
        label: 'Market',
      },
      {
        href: '/freelancer/project/current',
        icon: <BriefcaseBusiness className="h-5 w-5" />,
        label: 'Projects',
      },
      {
        href: '#',
        icon: <LineChart className="h-5 w-5" />,
        label: 'Analytics',
        disabled: true
      },
      {
        href: '/freelancer/interview/profile',
        icon: <TabletSmartphone className="h-5 w-5" />,
        label: 'Interviews',
      },
      {
        href: '#',
        icon: <CalendarClock className="h-5 w-5" />,
        label: 'Schedule Interviews',
        disabled: true
      },
      {
        href: '/freelancer/oracleDashboard/businessVerification',
        icon: <ShieldCheck className="h-5 w-5" />,
        label: 'Oracle',
      },
      {
        href: '/freelancer/talent',
        icon: <Sparkles className="h-5 w-5" />,
        label: 'Talent',
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
  }
  
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
      
      {variant !== "notes" && (
        <div className="py-4 border-t border-gray-200 dark:border-gray-700">
          <MenuItem
            href="/freelancer/settings/personal-info"
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
          />
        </div>
      )}
    </nav>
  );
};

export default SidebarMenu;