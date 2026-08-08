'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/lib/os-store';

interface DockApp {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const dockApps: DockApp[] = [
  { id: 'finder', name: 'Finder', icon: '🗂️', color: '#1B6AE1' },
  { id: 'safari', name: 'Safari', icon: '🧭', color: '#006EFC' },
  { id: 'mail', name: 'Mail', icon: '✉️', color: '#3478F6' },
  { id: 'messages', name: 'Messages', icon: '💬', color: '#3DDB76' },
  { id: 'facetime', name: 'FaceTime', icon: '📹', color: '#3DD68C' },
  { id: 'maps', name: 'Maps', icon: '🗺️', color: '#3DD68C' },
  { id: 'photos', name: 'Photos', icon: '🖼️', color: '#FF6B6B' },
  { id: 'music', name: 'Music', icon: '🎵', color: '#FC3C44' },
  { id: 'calendar', name: 'Calendar', icon: '📅', color: '#FF3B30' },
  { id: 'notes', name: 'Notes', icon: '📝', color: '#FFD60A' },
  { id: 'reminders', name: 'Reminders', icon: '✅', color: '#FF9F0A' },
  { id: 'calculator', name: 'Calculator', icon: '🔢', color: '#FF9500' },
  { id: 'terminal', name: 'Terminal', icon: '⌨️', color: '#1D1D1F' },
  { id: 'weather', name: 'Weather', icon: '🌤️', color: '#32ADE6' },
  { id: 'settings', name: 'System Settings', icon: '⚙️', color: '#636366' },
  { id: 'appstore', name: 'App Store', icon: '🏪', color: '#0071E3' },
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

const DockIcon: React.FC<{ app: DockApp; mouseX: number | null; dockRef: React.RefObject<HTMLDivElement | null> }> = ({ app, mouseX, dockRef }) => {
  const { openWindow, windows, focusWindow } = useOSStore();
  const [hovered, setHovered] = useState(false);

  const isOpen = windows.some((w) => w.appId === app.id && !w.isMinimized);
  const isMinimized = windows.some((w) => w.appId === app.id && w.isMinimized);
  const isOpenAny = windows.some((w) => w.appId === app.id);

  const handleClick = () => {
    const existing = windows.find((w) => w.appId === app.id);
    if (existing) {
      focusWindow(existing.id);
    } else {
      const [w, h] = windowSizes[app.id] || [800, 550];
      openWindow(app.id, windowTitles[app.id] || app.name, w, h);
    }
  };

  // Magnification effect based on mouse distance
  let scale = 1;
  if (hovered) scale = 1.35;
  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.1 }}
            className="absolute -top-9 whitespace-nowrap px-3 py-1 rounded-lg text-xs font-medium text-white z-50 pointer-events-none"
            style={{ background: 'rgba(30,30,35,0.6)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', border: '1px solid rgba(255,255,255,0.18)', boxShadow: '0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}
          >
            {app.name}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.85 }}
        className="dock-icon relative w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg"
        style={{
          transform: `scale(${scale})`,
          background: `linear-gradient(145deg, ${app.color}ee, ${app.color}99)`,
          boxShadow: `0 4px 15px ${app.color}55`,
        }}
      >
        <span className="select-none">{app.icon}</span>
      </motion.button>

      {isOpenAny && (
        <div
          className="absolute -bottom-1 w-1.5 h-1.5 rounded-full"
          style={{ background: isOpen ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)' }}
        />
      )}
    </div>
  );
};

const Dock: React.FC = () => {
  const { darkMode, toggleLaunchpad, windows, openWindow } = useOSStore();
  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseX(e.clientX);
  };

  return (
    <div className="fixed bottom-2 left-0 right-0 flex justify-center z-[900] pointer-events-none">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.3 }}
        className="flex items-end gap-2 px-3 py-2 rounded-2xl pointer-events-auto relative"
        style={{
          background: darkMode ? 'rgba(30,30,35,0.5)' : 'rgba(210,210,220,0.45)',
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          border: darkMode ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.5)',
          boxShadow: darkMode
            ? '0 25px 70px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.18), inset 0 -1px 1px rgba(0,0,0,0.2)'
            : '0 25px 70px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.9), inset 0 -1px 1px rgba(0,0,0,0.05)',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMouseX(null)}
        ref={dockRef}
      >
        {/* Launchpad button */}
        <div className="relative flex flex-col items-center">
          <motion.button
            onClick={toggleLaunchpad}
            whileTap={{ scale: 0.85 }}
            className="dock-icon relative w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg"
            style={{ background: 'linear-gradient(145deg, #636370ee, #48484aaa)', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}
          >
            <span className="select-none">🚀</span>
          </motion.button>
        </div>

        <div className="w-px h-10 mx-1 rounded-full" style={{ background: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' }} />

        {dockApps.map((app) => (
          <DockIcon key={app.id} app={app} mouseX={mouseX} dockRef={dockRef} />
        ))}

        <div className="w-px h-10 mx-1 rounded-full" style={{ background: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' }} />

        {/* Trash */}
        <DockIcon app={{ id: 'trash', name: 'Trash', icon: '🗑️', color: '#636366' }} mouseX={mouseX} dockRef={dockRef} />
      </motion.div>
    </div>
  );
};

export default Dock;
