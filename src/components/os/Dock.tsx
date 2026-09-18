'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/lib/os-store';
import { AppIcons, LaunchpadIcon } from './AppIcons';

interface DockApp {
  id: string;
  name: string;
}

const dockApps: DockApp[] = [
  { id: 'finder', name: 'Finder' },
  { id: 'safari', name: 'Safari' },
  { id: 'mail', name: 'Mail' },
  { id: 'messages', name: 'Messages' },
  { id: 'facetime', name: 'FaceTime' },
  { id: 'maps', name: 'Maps' },
  { id: 'photos', name: 'Photos' },
  { id: 'music', name: 'Music' },
  { id: 'calendar', name: 'Calendar' },
  { id: 'notes', name: 'Notes' },
  { id: 'reminders', name: 'Reminders' },
  { id: 'calculator', name: 'Calculator' },
  { id: 'terminal', name: 'Terminal' },
  { id: 'weather', name: 'Weather' },
  { id: 'settings', name: 'System Settings' },
  { id: 'appstore', name: 'App Store' },
];

const windowSizes: Record<string, [number, number]> = {
  finder: [900, 580], safari: [1100, 700], mail: [950, 620], messages: [820, 580],
  facetime: [750, 550], maps: [900, 620], photos: [1000, 680], music: [950, 640],
  calendar: [900, 640], notes: [750, 580], reminders: [700, 520], calculator: [320, 520],
  terminal: [750, 480], settings: [820, 600], appstore: [960, 660], weather: [800, 560],
  trash: [750, 480],
};

const windowTitles: Record<string, string> = {
  finder: 'Finder', safari: 'Safari', mail: 'Mail', messages: 'Messages',
  facetime: 'FaceTime', maps: 'Maps', photos: 'Photos', music: 'Music',
  calendar: 'Calendar', notes: 'Notes', reminders: 'Reminders', calculator: 'Calculator',
  terminal: 'Terminal', settings: 'System Settings', appstore: 'App Store',
  trash: 'Trash', weather: 'Weather',
};

const DockIcon: React.FC<{ app: DockApp; darkMode: boolean }> = ({ app, darkMode }) => {
  const { openWindow, windows, focusWindow } = useOSStore();
  const [hovered, setHovered] = useState(false);

  const isOpen = windows.some((w) => w.appId === app.id && !w.isMinimized);
  const isOpenAny = windows.some((w) => w.appId === app.id);

  const IconComp = AppIcons[app.id];

  const handleClick = () => {
    const existing = windows.find((w) => w.appId === app.id);
    if (existing) {
      focusWindow(existing.id);
    } else {
      const [w, h] = windowSizes[app.id] || [800, 550];
      openWindow(app.id, windowTitles[app.id] || app.name, w, h);
    }
  };

  // Neomorphic tile tokens
  const tile = darkMode
    ? {
        bg: 'linear-gradient(145deg, #242432, #181820)',
        shadowHover: '4px 4px 10px rgba(0,0,0,0.5), -3px -3px 8px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)',
        shadow: '3px 3px 8px rgba(0,0,0,0.4), -2px -2px 6px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.06)',
        tooltipBg: '#1e1e28',
        tooltipShadow: '4px 4px 10px rgba(0,0,0,0.5), -2px -2px 6px rgba(255,255,255,0.02), inset 0 1px 0 rgba(255,255,255,0.06)',
        tooltipColor: '#fff',
        indicatorOff: 'rgba(255,255,255,0.35)',
      }
    : {
        bg: 'linear-gradient(145deg, #f5f5fa, #d8d8e0)',
        shadowHover: '4px 4px 10px rgba(0,0,0,0.15), -3px -3px 8px rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,0.6)',
        shadow: '3px 3px 8px rgba(0,0,0,0.12), -2px -2px 6px rgba(255,255,255,0.8), inset 0 1px 0 rgba(255,255,255,0.5)',
        tooltipBg: '#ebebf2',
        tooltipShadow: '4px 4px 10px rgba(0,0,0,0.15), -2px -2px 6px rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,0.5)',
        tooltipColor: '#1d1d1f',
        indicatorOff: 'rgba(0,0,0,0.3)',
      };

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.1 }}
            className="absolute -top-9 whitespace-nowrap px-3 py-1 rounded-lg text-xs font-medium z-50 pointer-events-none"
            style={{
              background: tile.tooltipBg,
              color: tile.tooltipColor,
              boxShadow: tile.tooltipShadow,
              fontSize: 11,
            }}
          >
            {app.name}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Neomorphic icon tile — refined hover (less dramatic, smoother) */}
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.92 }}
        whileHover={{ y: -6, scale: 1.18 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        className="relative w-11 h-11 flex items-center justify-center overflow-hidden"
        style={{
          borderRadius: 13,
          background: tile.bg,
          boxShadow: hovered ? tile.shadowHover : tile.shadow,
        }}
      >
        {IconComp ? <IconComp size={38} /> : <span className="text-2xl">{app.name[0]}</span>}
      </motion.button>

      {/* Running indicator — quieter */}
      {isOpenAny && (
        <div
          className="absolute -bottom-1 w-1 h-1 rounded-full"
          style={{
            background: isOpen ? '#F57C00' : tile.indicatorOff,
            boxShadow: isOpen ? '0 0 4px #F57C00' : 'none',
          }}
        />
      )}
    </div>
  );
};

const Dock: React.FC = () => {
  const { toggleLaunchpad, darkMode } = useOSStore();
  const dockRef = useRef<HTMLDivElement>(null);

  const container = darkMode
    ? {
        bg: '#1a1a22',
        shadow: '10px 10px 30px rgba(0,0,0,0.6), -6px -6px 20px rgba(255,255,255,0.02), inset 0 1px 0 rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.03)',
        divider: 'rgba(255,255,255,0.06)',
      }
    : {
        bg: '#dcdce4',
        shadow: '10px 10px 30px rgba(0,0,0,0.15), -6px -6px 20px rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,0.6)',
        border: '1px solid rgba(0,0,0,0.04)',
        divider: 'rgba(0,0,0,0.08)',
      };

  const tileBg = darkMode
    ? 'linear-gradient(145deg, #242432, #181820)'
    : 'linear-gradient(145deg, #f5f5fa, #d8d8e0)';
  const tileShadow = darkMode
    ? '3px 3px 8px rgba(0,0,0,0.4), -2px -2px 6px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.06)'
    : '3px 3px 8px rgba(0,0,0,0.12), -2px -2px 6px rgba(255,255,255,0.8), inset 0 1px 0 rgba(255,255,255,0.5)';

  return (
    <div className="fixed bottom-2 left-0 right-0 flex justify-center z-[900] pointer-events-none">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.3 }}
        className="flex items-end gap-1.5 px-3.5 py-2.5 rounded-3xl pointer-events-auto relative"
        style={{
          borderRadius: 22,
          background: container.bg,
          boxShadow: container.shadow,
          border: container.border,
        }}
        ref={dockRef}
      >
        {/* Launchpad button */}
        <div className="relative flex flex-col items-center">
          <motion.button
            onClick={toggleLaunchpad}
            whileTap={{ scale: 0.92 }}
            whileHover={{ y: -6, scale: 1.18 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="relative w-11 h-11 flex items-center justify-center overflow-hidden"
            style={{ borderRadius: 13, background: tileBg, boxShadow: tileShadow }}
          >
            <LaunchpadIcon size={38} />
          </motion.button>
        </div>

        <div className="w-px h-9 mx-0.5 rounded-full" style={{ background: container.divider }} />

        {dockApps.map((app) => (
          <DockIcon key={app.id} app={app} darkMode={darkMode} />
        ))}

        <div className="w-px h-9 mx-0.5 rounded-full" style={{ background: container.divider }} />

        {/* Trash */}
        <DockIcon app={{ id: 'trash', name: 'Trash' }} darkMode={darkMode} />
      </motion.div>
    </div>
  );
};

export default Dock;
