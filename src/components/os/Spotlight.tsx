'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';
import { shellTokens } from '@/lib/ui-tokens';
import { AppIcons } from './AppIcons';

interface SearchItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  action: () => void;
}

const Spotlight: React.FC = () => {
  const { spotlightOpen, toggleSpotlight, darkMode, accentColor, openWindow, toggleDarkMode, setLockScreen } = useOSStore();
  const t = useT();
  const tokens = shellTokens(darkMode, accentColor);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const prevOpen = useRef(false);
  useEffect(() => {
    if (spotlightOpen && !prevOpen.current) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      prevOpen.current = true;
      return () => clearTimeout(t);
    }
    if (!spotlightOpen && prevOpen.current) {
      prevOpen.current = false;
    }
  }, [spotlightOpen]);

  const closeSpotlight = () => {
    setQuery('');
    setSelectedIndex(0);
    toggleSpotlight();
  };

  const windowSizes: Record<string, [number, number]> = {
    finder: [900, 580], safari: [1100, 700], mail: [950, 620], messages: [820, 580],
    facetime: [750, 550], maps: [900, 620], photos: [1000, 680], music: [950, 640],
    calendar: [900, 640], notes: [750, 580], reminders: [700, 520], calculator: [320, 520],
    terminal: [750, 480], settings: [820, 600], appstore: [960, 660], trash: [750, 480], weather: [800, 560],
  };

  const allItems: SearchItem[] = [
    { id: 'finder', name: t.appName.finder, icon: '🗂️', category: t.spotlight.application, action: () => openWindow('finder', t.appName.finder, 900, 580) },
    { id: 'safari', name: t.appName.safari, icon: '🧭', category: t.spotlight.application, action: () => openWindow('safari', t.appName.safari, 1100, 700) },
    { id: 'mail', name: t.appName.mail, icon: '✉️', category: t.spotlight.application, action: () => openWindow('mail', t.appName.mail, 950, 620) },
    { id: 'messages', name: t.appName.messages, icon: '💬', category: t.spotlight.application, action: () => openWindow('messages', t.appName.messages, 820, 580) },
    { id: 'calculator', name: t.appName.calculator, icon: '🔢', category: t.spotlight.application, action: () => openWindow('calculator', t.appName.calculator, 320, 520) },
    { id: 'notes', name: t.appName.notes, icon: '📝', category: t.spotlight.application, action: () => openWindow('notes', t.appName.notes, 750, 580) },
    { id: 'terminal', name: t.appName.terminal, icon: '⌨️', category: t.spotlight.application, action: () => openWindow('terminal', t.appName.terminal, 750, 480) },
    { id: 'settings', name: t.appName.settings, icon: '⚙️', category: t.spotlight.application, action: () => openWindow('settings', t.appName.settings, 820, 600) },
    { id: 'calendar', name: t.appName.calendar, icon: '📅', category: t.spotlight.application, action: () => openWindow('calendar', t.appName.calendar, 900, 640) },
    { id: 'music', name: t.appName.music, icon: '🎵', category: t.spotlight.application, action: () => openWindow('music', t.appName.music, 950, 640) },
    { id: 'photos', name: t.appName.photos, icon: '🖼️', category: t.spotlight.application, action: () => openWindow('photos', t.appName.photos, 1000, 680) },
    { id: 'appstore', name: t.appName.appstore, icon: '🏪', category: t.spotlight.application, action: () => openWindow('appstore', t.appName.appstore, 960, 660) },
    { id: 'weather', name: t.appName.weather, icon: '🌤️', category: t.spotlight.application, action: () => openWindow('weather', t.appName.weather, 800, 560) },
    { id: 'maps', name: t.appName.maps, icon: '🗺️', category: t.spotlight.application, action: () => openWindow('maps', t.appName.maps, 900, 620) },
    { id: 'reminders', name: t.appName.reminders, icon: '✅', category: t.spotlight.application, action: () => openWindow('reminders', t.appName.reminders, 700, 520) },
    { id: 'facetime', name: t.appName.facetime, icon: '📹', category: t.spotlight.application, action: () => openWindow('facetime', t.appName.facetime, 750, 550) },
    { id: 'trash', name: t.appName.trash, icon: '🗑️', category: t.spotlight.application, action: () => openWindow('trash', t.appName.trash, 750, 480) },
    { id: 'darkmode', name: darkMode ? t.menu.lightMode : t.menu.darkMode, icon: darkMode ? '☀️' : '🌑', category: t.spotlight.command, action: toggleDarkMode },
    { id: 'lock', name: t.menu.lockScreen, icon: '🔒', category: t.spotlight.command, action: () => setLockScreen(true) },
  ];

  const filtered = query
    ? allItems.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase()))
    : allItems.slice(0, 8);

  // Calculator for numeric queries
  const calcResult = (() => {
    if (!query) return null;
    try {
      const cleaned = query.replace(/[^-+*/().\d\s]/g, '');
      if (cleaned && /[-+*/]/.test(cleaned)) {
        const result = Function(`"use strict"; return (${cleaned})`)();
        if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
          return result;
        }
      }
    } catch {
      // ignore
    }
    return null;
  })();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
        closeSpotlight();
      }
    } else if (e.key === 'Escape') {
      closeSpotlight();
    }
  };

  return (
    <AnimatePresence>
      {spotlightOpen && (
        <>
          <div className="fixed inset-0 z-[9700]" onClick={closeSpotlight} style={{ background: 'rgba(0,0,0,0.35)' }} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={`fixed top-1/4 left-1/2 -translate-x-1/2 z-[9701] w-[620px] max-w-[92vw] rounded-2xl overflow-hidden ${tokens.glassClass}`}
            style={{ color: tokens.text }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3.5">
              <Search size={18} strokeWidth={2.2} style={{ color: tokens.subText }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                onKeyDown={handleKeyDown}
                placeholder={t.spotlight.placeholder}
                className="flex-1 bg-transparent outline-none"
                style={{ fontSize: 17, color: tokens.text, caretColor: tokens.accent }}
              />
            </div>

            {/* Calculator result */}
            {calcResult !== null && (
              <div
                className="px-4 pb-3 flex items-baseline justify-between"
                style={{ borderTop: `1px solid ${tokens.divider}`, paddingTop: 12 }}
              >
                <span style={{ fontSize: 13, color: tokens.subText }}>{query} =</span>
                <span className="font-light" style={{ fontSize: 24, color: tokens.accent }}>{calcResult}</span>
              </div>
            )}

            {/* Results */}
            {filtered.length > 0 && (
              <div
                className="max-h-80 overflow-y-auto"
                style={{ borderTop: `1px solid ${tokens.divider}` }}
              >
                {filtered.map((item, i) => {
                  const IconComp = AppIcons[item.id];
                  const active = i === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { item.action(); closeSpotlight(); }}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                      style={{
                        background: active ? tokens.accent : 'transparent',
                        color: active ? tokens.accentContrast : tokens.text,
                      }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {IconComp ? <IconComp size={30} /> : <span style={{ fontSize: 16 }}>{item.icon}</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="truncate" style={{ fontSize: 13, fontWeight: 500 }}>{item.name}</div>
                        <div className="truncate" style={{ fontSize: 11, color: active ? 'rgba(255,255,255,0.75)' : tokens.subText }}>
                          {item.category}
                        </div>
                      </div>
                      {active && (
                        <span className="flex-shrink-0" style={{ fontSize: 11, opacity: 0.8 }}>↵</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {filtered.length === 0 && calcResult === null && (
              <div
                className="px-4 py-8 text-center"
                style={{ borderTop: `1px solid ${tokens.divider}`, color: tokens.subText, fontSize: 13 }}
              >
                {t.spotlight.noResults} &quot;{query}&quot;
              </div>
            )}

            {/* Keyboard hints — the quiet footer that makes Spotlight feel finished */}
            <div
              className="flex items-center justify-center gap-4 py-2"
              style={{ borderTop: `1px solid ${tokens.divider}`, fontSize: 10.5, color: tokens.faintText }}
            >
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span>esc Close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Spotlight;
