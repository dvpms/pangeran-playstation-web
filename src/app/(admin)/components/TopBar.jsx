'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MdSearch, MdNotificationsActive, MdApps, MdMenu } from 'react-icons/md';
import { useMenu } from '../context/MenuContext';

export default function TopBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { toggleMobileDrawer } = useMenu();

  return (
    <header className="fixed top-0 left-0 md:right-0 md:left-auto w-full md:w-[calc(100%-18rem)] h-16 md:h-20 z-40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-lg flex items-center justify-between px-4 md:px-10 shadow-none bg-sky-50 dark:bg-sky-900/10 font-['Plus_Jakarta_Sans'] text-sm font-semibold">
      {/* Left: Search Bar - Hidden on Mobile */}
      <div className="flex items-center flex-1 hidden md:flex">
        <div className="relative w-full max-w-md focus-within:ring-2 focus-within:ring-sky-200 dark:focus-within:ring-sky-800 rounded-full transition-all">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <MdSearch size={20} />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-full bg-surface-container-low border-none focus:ring-0 text-on-surface placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Mobile: Empty spacer */}
      <div className="flex-1 md:hidden" />

      {/* Right: Icons & Profile */}
      <div className="flex items-center gap-3 md:gap-6 md:ml-4">
        {/* Notifications - Hidden on Mobile */}
        <button className="hidden md:flex text-slate-400 dark:text-slate-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors relative">
          <MdNotificationsActive size={24} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-secondary-container rounded-full"></span>
        </button>

        {/* Apps - Hidden on Mobile */}
        <button className="hidden md:flex text-slate-400 dark:text-slate-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors relative">
          <MdApps size={24} />
        </button>

        {/* Divider - Hidden on Mobile */}
        <div className="hidden md:block h-8 w-px bg-outline-variant/30 mx-2"></div>

        {/* Profile - Smaller on Mobile */}
        <button className="flex items-center gap-3">
          <Image
            alt="Administrator"
            className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover ring-2 ring-surface-container"
            src="/images/logo.png"
            width={100}
            height={100}
          />
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileDrawer}
          className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle menu"
        >
          <MdMenu size={20} />
        </button>
      </div>
    </header>
  );
}
