'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';
import { shellTokens } from '@/lib/ui-tokens';
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
  const { launchpadOpen, toggleLaunchpad, openWindow, windows, focusWindow, darkMode, accentColor } = useOSStore();
  const t = useT();
  const tokens = shellTokens(darkMode, accentColor);
  const [search, setSearch] = useState('');

  // Escape closes the Launchpad, matching every other shell overlay.
  useEffect(() => {
    if (!launchpadOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggleLaunchpad();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [launchpadOpen, toggleLaunchpad]);

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
          className="fixed inset-0 z-[9500] flex flex-col items-center pt-14 pb-16"
          style={{ background: darkMode ? 'rgba(0,0,0,0.45)' : 'rgba(20,20,30,0.4)', backdropFilter: 'blur(48px) saturate(180%)', WebkitBackdropFilter: 'blur(48px) saturate(180%)' }}
          onClick={toggleLaunchpad}
        >
          {/* Search */}
          <div className="mb-9" onClick={(e) => e.stopPropagation()}>
            <div
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full w-[300px]"
              style={{
                background: darkMode ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
            >
              <Search size={15} strokeWidth={2.2} className="text-white/60" />
              <input
                type="text"
                placeholder={t.common.search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-white placeholder-white/40 w-full"
                style={{ fontSize: 13.5, caretColor: tokens.accent }}
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          </div>

          {/* Apps grid — responsive columns, hidden scrollbar */}
          <div
            className="grid gap-x-6 gap-y-7 px-10 pb-4 flex-1 overflow-y-auto no-scrollbar w-full"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(102px, 1fr))', maxWidth: 1100 }}
            onClick={(e) => e.stopPropagation()}
          >
            {filtered.map((app, i) => {
              const IconComp = AppIcons[app.id];
              const isOpen = windows.some((w) => w.appId === app.id);
              return (
                <motion.button
                  key={app.id}
                  initial={{ opacity: 0, scale: 0.7, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.018, 0.32), type: 'spring', stiffness: 420, damping: 26 }}
                  whileHover={{ scale: 1.08, y: -6 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleAppClick(app.id)}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <div className="neo-tile w-16 h-16 flex items-center justify-center relative overflow-hidden">
                    {IconComp ? <IconComp size={56} /> : <span className="text-3xl">{app.name[0]}</span>}
                  </div>
                  <span className="text-white text-center leading-tight max-w-[96px] truncate" style={{ fontSize: 11.5, fontWeight: 500, textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                    {app.name}
                  </span>
                  <span
                    className="rounded-full"
                    style={{
                      width: 4,
                      height: 4,
                      background: isOpen ? tokens.accent : 'transparent',
                      boxShadow: isOpen ? `0 0 6px ${tokens.accentGlow}` : 'none',
                    }}
                  />
                </motion.button>
              );
            })}
            {filtered.length === 0 && (
              <div className="col-span-full text-center text-white/45 py-20" style={{ fontSize: 13 }}>
                {t.common.noResults}
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="mt-2 text-white/35 pointer-events-none" style={{ fontSize: 11 }}>
            {filtered.length} apps · Esc to close
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Launchpad;
