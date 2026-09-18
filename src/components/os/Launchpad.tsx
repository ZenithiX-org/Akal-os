'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';
import { AppIcons } from './AppIcons';

const launchpadAppIds = [
  'finder', 'safari', 'mail', 'messages', 'facetime', 'maps',
  'photos', 'music', 'calendar', 'notes', 'reminders', 'calculator',
  'terminal', 'weather', 'settings', 'appstore',
  'stocks', 'books', 'news', 'podcasts', 'tv', 'contacts', 'chess', 'dictionary',
];

const windowSizes: Record<string, [number, number]> = {
  finder: [900, 580], safari: [1100, 700], mail: [950, 620], messages: [820, 580],
  facetime: [750, 550], maps: [900, 620], photos: [1000, 680], music: [950, 640],
  calendar: [900, 640], notes: [750, 580], reminders: [700, 520], calculator: [320, 520],
  terminal: [750, 480], settings: [820, 600], appstore: [960, 660], weather: [800, 560],
  trash: [750, 480],
};

const Launchpad: React.FC = () => {
  const { launchpadOpen, toggleLaunchpad, openWindow, windows, focusWindow } = useOSStore();
  const t = useT();
  const [search, setSearch] = useState('');

  const appName = (id: string): string => {
    const map = t.appName as Record<string, string>;
    return map[id] || id.charAt(0).toUpperCase() + id.slice(1);
  };

  const apps = launchpadAppIds.map((id) => ({ id, name: appName(id) }));

  const filtered = search
    ? apps.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
    : apps;

  const handleAppClick = (appId: string) => {
    const existing = windows.find((w) => w.appId === appId);
    if (existing) {
      focusWindow(existing.id);
    } else {
      const [w, h] = windowSizes[appId] || [800, 550];
      openWindow(appId, appName(appId), w, h);
    }
    toggleLaunchpad();
  };

  return (
    <AnimatePresence>
      {launchpadOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9500] flex flex-col items-center pt-16 pb-20"
          style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)' }}
          onClick={toggleLaunchpad}
        >
          {/* Search */}
          <div className="mb-8" onClick={(e) => e.stopPropagation()}>
            <div className="neo-inset flex items-center gap-2 px-4 py-2.5 rounded-full w-72" style={{ background: 'rgba(0,0,0,0.4)' }}>
              <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input
                type="text"
                placeholder={t.common.search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-white text-sm placeholder-white/40 w-full"
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          </div>

          {/* Apps Grid — neomorphic tiles */}
          <div
            className="grid gap-x-8 gap-y-6 px-8 flex-1 overflow-y-auto"
            style={{ gridTemplateColumns: 'repeat(7, minmax(80px, 1fr))' }}
            onClick={(e) => e.stopPropagation()}
          >
            {filtered.map((app, i) => {
              const IconComp = AppIcons[app.id];
              const isOpen = windows.some((w) => w.appId === app.id);
              return (
                <motion.button
                  key={app.id}
                  initial={{ opacity: 0, scale: 0.5, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.02, 0.3), type: 'spring', stiffness: 400, damping: 25 }}
                  whileHover={{ scale: 1.12, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAppClick(app.id)}
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                  <div className="neo-tile w-16 h-16 flex items-center justify-center relative overflow-hidden">
                    {IconComp ? <IconComp size={56} /> : <span className="text-3xl">{app.name[0]}</span>}
                  </div>
                  <span className="text-white text-xs font-medium text-center leading-tight max-w-[80px] drop-shadow">{app.name}</span>
                  {isOpen && <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#d70a53', boxShadow: '0 0 6px #d70a53' }} />}
                </motion.button>
              );
            })}
            {filtered.length === 0 && (
              <div className="col-span-7 text-center text-white/40 py-20">{t.common.noResults}</div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Launchpad;
