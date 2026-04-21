"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdCalendarMonth,
  MdSportsEsports,
  MdGroup,
  MdPayments,
  MdSettings,
  MdHelp,
  MdAddCircle,
} from "react-icons/md";

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
  { href: "/dashboard", label: "Overview", icon: "dashboard" },
  { href: "/bookings", label: "Bookings", icon: "calendar_month" },
  { href: "/inventory", label: "Inventory", icon: "sports_esports" },
  { href: "/customers", label: "Customers", icon: "group", comingSoon: true },
  { href: "/finance", label: "Finance", icon: "payments", comingSoon: true },
];

const footerItems = [
  { href: "/settings", label: "Settings", icon: "settings" },
  { href: "/support", label: "Support", icon: "help" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="h-screen w-72 fixed left-0 top-0 z-50 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-xl flex flex-col p-6 gap-y-4 shadow-ambient-blue hidden md:flex">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Image
          src="/images/logo.png"
          alt="Admin Profile Avatar"
          className="w-12 h-12 rounded-full object-cover outline-2 outline-primary-container outline-offset-2"
          width={100}
          height={100}
        />
        <div>
          <h2 className="text-lg font-extrabold tracking-tighter text-sky-700 dark:text-sky-300 italic font-['Plus_Jakarta_Sans']">
            Pangeran Playstation
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Management Console
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const active = isActive(item.href);
          const IconComponent = iconMap[item.icon];
          const isDisabled = item.comingSoon;

          const baseStyles = `flex items-center gap-3 px-4 py-3 rounded-xl font-['Plus_Jakarta_Sans'] font-medium tracking-tight transition-all duration-200`;
          const activeStyles = `bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-300 font-bold shadow-sm`;
          const inactiveStyles = `text-slate-500 dark:text-slate-400 hover:text-sky-500 hover:bg-white/50 dark:hover:bg-slate-800/50`;
          const disabledStyles = `text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-60`;

          const content = (
            <>
              {IconComponent && <IconComponent size={24} />}
              <span className="flex-1">{item.label}</span>
              {isDisabled && (
                <span className="text-xs bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                  Coming Soon
                </span>
              )}
            </>
          );

          if (isDisabled) {
            return (
              <div
                key={item.href}
                className={`${baseStyles} ${disabledStyles} active:scale-[1]`}
                title="Feature coming soon"
              >
                {content}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${baseStyles} active:scale-[0.97] ${
                active ? activeStyles : inactiveStyles
              }`}
            >
              {content}
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
                  ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-300 font-bold shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-sky-500 hover:bg-white/50 dark:hover:bg-slate-800/50"
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
