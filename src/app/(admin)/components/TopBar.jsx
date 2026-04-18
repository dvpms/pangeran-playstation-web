'use client';

import { useState } from 'react';
import { MdSearch, MdNotificationsActive, MdApps } from 'react-icons/md';

export default function TopBar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-18rem)] h-20 z-40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-lg flex items-center justify-between px-10 shadow-none bg-sky-50 dark:bg-sky-900/10 font-['Plus_Jakarta_Sans'] text-sm font-semibold hidden md:flex">
      {/* Left: Search Bar */}
      <div className="flex items-center flex-1">
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

      {/* Right: Icons & Profile */}
      <div className="flex items-center gap-6 ml-4">
        {/* Notifications */}
        <button className="text-slate-400 dark:text-slate-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors relative">
          <MdNotificationsActive size={24} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-secondary-container rounded-full"></span>
        </button>

        {/* Apps */}
        <button className="text-slate-400 dark:text-slate-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors relative">
          <MdApps size={24} />
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-outline-variant/30 mx-2"></div>

        {/* Profile */}
        <button className="flex items-center gap-3">
          <img
            alt="Administrator"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-surface-container"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzfjg46EPIw9SPqa5xPa8LByWTbWdNmMwi-658ASGwn7QwJBuNC-0pHRCrYcnGb2BAUkKYbVQC5Rxu5BUAia9r4oc4TvF8xMrMM8djT5XBYH6hqP-vRaUUPWJNydl7ceYnHauiCSdWSfVNO4yuYoAaY7IYgACMDai2zabcNtyXjRjBVCel2gIhJHpdKt1sn1RECaxjLdECWoT3AYlVhlNYk7ZNsDvBgV4MJErRfM1yNw3cvm2OyPhNsFFmpuz_lJ282kSj1YOnhlfq"
          />
        </button>
      </div>
    </header>
  );
}
