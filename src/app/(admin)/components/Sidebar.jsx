'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdDashboard, MdCalendarMonth, MdSportsEsports, MdGroup, MdPayments, MdSettings, MdHelp, MdAddCircle } from 'react-icons/md';

const iconMap = {
  dashboard: MdDashboard,
  calendar_month: MdCalendarMonth,
  sports_esports: MdSportsEsports,
  group: MdGroup,
  payments: MdPayments,
  settings: MdSettings,
  help: MdHelp,
  add_circle: MdAddCircle,
};

const menuItems = [
  { href: '/dashboard', label: 'Overview', icon: 'dashboard' },
  { href: '/bookings', label: 'Bookings', icon: 'calendar_month' },
  { href: '/inventory', label: 'Inventory', icon: 'sports_esports' },
  { href: '/customers', label: 'Customers', icon: 'group' },
  { href: '/finance', label: 'Finance', icon: 'payments' },
];

const footerItems = [
  { href: '/settings', label: 'Settings', icon: 'settings' },
  { href: '/support', label: 'Support', icon: 'help' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  return (
    <aside className="h-screen w-72 fixed left-0 top-0 z-50 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-xl flex flex-col p-6 gap-y-4 shadow-[0_24px_48px_-12px_rgba(0,102,138,0.08)] hidden md:flex">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <img
          alt="Admin Profile Avatar"
          className="w-12 h-12 rounded-full object-cover outline outline-2 outline-primary-container outline-offset-2"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_P-vqQK1FZ2Y2F2TsGNPYt5RKznDrQmvJmtNpIQtrbE0QKd6EPGK5f-DMJNdErpNHMNPMXkLAG7KUObsS2aavsfc5yy7RB3Lz0O338gN-QUgZ_mh6QrvBuGx30n7VoUSlHmWiRoTd545irU7LAKS8mkDJ4rfHY0amZhum347gmOUPxzfFl9Hafc7dm0-zazVvKULtB_QX8eZbS9z-lX285Ogij8dFZMfndV-Fk2cLzF90W4-okJCWijwTOOgDA_i1UAXIZrRxcURy"
        />
        <div>
          <h2 className="text-2xl font-extrabold tracking-tighter text-sky-700 dark:text-sky-300 italic font-['Plus_Jakarta_Sans']">
            Royal Azure
          </h2>
          <p className="text-xs text-slate-500 font-medium">Management Console</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const active = isActive(item.href);
          const IconComponent = iconMap[item.icon];
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-['Plus_Jakarta_Sans'] font-medium tracking-tight transition-all duration-200 active:scale-[0.97] ${
                active
                  ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-300 font-bold shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-sky-500 hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              {IconComponent && <IconComponent size={24} />}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

    

      {/* Footer Menu */}
      <div className="mt-auto space-y-2 pt-6">
        {footerItems.map((item) => {
          const active = isActive(item.href);
          const IconComponent = iconMap[item.icon];
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl font-['Plus_Jakarta_Sans'] font-medium tracking-tight transition-all duration-200 active:scale-[0.97] ${
                active
                  ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-300 font-bold shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-sky-500 hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              {IconComponent && <IconComponent size={24} />}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
