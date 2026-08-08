'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

const launchpadApps = [
  { id: 'finder', icon: '🗂️', color: '#1B6AE1' },
  { id: 'safari', icon: '🧭', color: '#006EFC' },
  { id: 'mail', icon: '✉️', color: '#3478F6' },
  { id: 'messages', icon: '💬', color: '#3DDB76' },
  { id: 'facetime', icon: '📹', color: '#3DD68C' },
  { id: 'maps', icon: '🗺️', color: '#3DD68C' },
  { id: 'photos', icon: '🖼️', color: '#FF6B6B' },
  { id: 'music', icon: '🎵', color: '#FC3C44' },
  { id: 'calendar', icon: '📅', color: '#FF3B30' },
  { id: 'notes', icon: '📝', color: '#FFD60A' },
  { id: 'reminders', icon: '✅', color: '#FF9F0A' },
  { id: 'calculator', icon: '🔢', color: '#FF9500' },
  { id: 'terminal', icon: '⌨️', color: '#1D1D1F' },
  { id: 'weather', icon: '🌤️', color: '#32ADE6' },
  { id: 'settings', icon: '⚙️', color: '#636366' },
  { id: 'appstore', icon: '🏪', color: '#0071E3' },
  { id: 'stocks', icon: '📈', color: '#30D158' },
  { id: 'books', icon: '📚', color: '#FF6B00' },
  { id: 'news', icon: '📰', color: '#FF2D55' },
  { id: 'podcasts', icon: '🎙️', color: '#B45BFF' },
  { id: 'tv', icon: '📺', color: '#1D1D1F' },
  { id: 'contacts', icon: '👤', color: '#636366' },
  { id: 'chess', icon: '♟️', color: '#1C1C1E' },
  { id: 'dictionary', icon: '📖', color: '#5E5CE6' },
];

const windowSizes: Record<string, [number, number]> = {
  finder: [900, 580], safari: [1100, 700], mail: [950, 620], messages: [820, 580],
  facetime: [750, 550], maps: [900, 620], photos: [1000, 680], music: [950, 640],
  calendar: [900, 640], notes: [750, 580], reminders: [700, 520], calculator: [320, 520],
  terminal: [750, 480], settings: [820, 600], appstore: [960, 660], weather: [800, 560],
  trash: [750, 480],
};

const Launchpad: React.FC = () => {
  const { launchpadOpen, toggleLaunchpad, openWindow } = useOSStore();
  const t = useT();
  const [search, setSearch] = useState('');

  const appName = (id: string): string => {
    const map = t.appName as Record<string, string>;
    return map[id] || id.charAt(0).toUpperCase() + id.slice(1);
  };

  const apps = launchpadApps.map((a) => ({ ...a, name: appName(a.id) }));

  const filtered = search
    ? apps.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
    : apps;

  const handleAppClick = (appId: string) => {
    const [w, h] = windowSizes[appId] || [800, 550];
    openWindow(appId, appName(appId), w, h);
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
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)' }}
          onClick={toggleLaunchpad}
        >
          {/* Search */}
          <div className="mb-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl w-64" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', border: '1px solid rgba(255,255,255,0.25)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15)' }}>
              <svg className="w-4 h-4 text-white opacity-70" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input
                type="text"
                placeholder={t.common.search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-white text-sm placeholder-white/50 w-full"
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          </div>

          {/* Apps Grid */}
          <div className="grid gap-x-8 gap-y-6 px-8 flex-1 overflow-y-auto" style={{ gridTemplateColumns: 'repeat(7, minmax(80px, 1fr))' }} onClick={(e) => e.stopPropagation()}>
            {filtered.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min(i * 0.02, 0.3), type: 'spring', stiffness: 400, damping: 25 }}
                className="flex flex-col items-center gap-2 cursor-pointer group"
                onClick={() => handleAppClick(app.id)}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-transform group-hover:scale-110 group-active:scale-90" style={{ background: `linear-gradient(145deg, ${app.color}ee, ${app.color}88)`, boxShadow: `0 8px 24px ${app.color}66, inset 0 1px 1px rgba(255,255,255,0.3)` }}>
                  {app.icon}
                </div>
                <span className="text-white text-xs font-medium text-center leading-tight max-w-[80px] drop-shadow">{app.name}</span>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-7 text-center text-white/50 py-20">{t.common.noResults}</div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Launchpad;
