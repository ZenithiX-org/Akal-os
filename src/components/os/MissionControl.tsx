'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/lib/os-store';

const MissionControl: React.FC = () => {
  const { missionControl, toggleMissionControl, windows, focusWindow, wallpaper, darkMode } = useOSStore();

  const visibleWindows = windows.filter((w) => !w.isMinimized);
  const isGradient = wallpaper.startsWith('linear-gradient');

  const appIcons: Record<string, string> = {
    finder: '🗂️', safari: '🧭', mail: '✉️', messages: '💬', music: '🎵',
    notes: '📝', calculator: '🔢', terminal: '⌨️', settings: '⚙️', calendar: '📅',
    photos: '🖼️', appstore: '🏪', reminders: '✅', maps: '🗺️', facetime: '📹',
    trash: '🗑️', weather: '🌤️',
  };

  return (
    <AnimatePresence>
      {missionControl && (
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9800] flex flex-col"
          style={{
            backgroundImage: isGradient ? undefined : `url(${wallpaper})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            background: isGradient ? wallpaper : undefined,
          }}
          onClick={toggleMissionControl}
        >
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)' }} />

          {/* Spaces bar */}
          <div className="relative z-10 flex items-center justify-center gap-4 pt-8 pb-4">
            <div className="text-white/60 text-sm">Spaces</div>
            {[1, 2, 3].map((space) => (
              <div
                key={space}
                className="px-6 py-1.5 rounded-lg text-white text-sm font-medium cursor-pointer transition-all hover:bg-white/20"
                style={{ background: space === 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                onClick={(e) => e.stopPropagation()}
              >
                Desktop {space}
              </div>
            ))}
            <button className="w-7 h-7 rounded-full flex items-center justify-center text-white text-lg hover:bg-white/20 transition-colors" onClick={(e) => e.stopPropagation()}>
              +
            </button>
          </div>

          {/* Windows */}
          <div className="relative z-10 flex-1 flex flex-wrap items-center justify-center gap-6 px-12 pb-8">
            {visibleWindows.length === 0 ? (
              <div className="text-white/60 text-xl">No open windows</div>
            ) : (
              visibleWindows.map((win, i) => {
                const width = Math.min(300, Math.max(200, win.width * 0.28));
                const height = Math.min(210, Math.max(140, win.height * 0.28));
                return (
                  <motion.div
                    key={win.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="cursor-pointer group"
                    onClick={(e) => { e.stopPropagation(); focusWindow(win.id); toggleMissionControl(); }}
                    style={{ width, height }}
                  >
                    <div className="w-full h-full rounded-xl overflow-hidden transition-all group-hover:ring-4 group-hover:ring-blue-400 shadow-2xl" style={{ background: darkMode ? 'rgba(40,40,45,0.55)' : 'rgba(240,240,245,0.6)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', border: darkMode ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.6)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1)' }}>
                      <div className="h-5 flex items-center gap-1 px-2" style={{ background: darkMode ? 'rgba(60,60,65,0.5)' : 'rgba(220,220,225,0.55)' }}>
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-[8px] ml-1 opacity-70 truncate" style={{ color: darkMode ? 'white' : 'black' }}>{win.title}</span>
                      </div>
                      <div className="p-2 flex items-center justify-center h-[calc(100%-20px)]">
                        <span className="text-3xl opacity-50">{appIcons[win.appId] || '📱'}</span>
                      </div>
                    </div>
                    <div className="text-center text-white text-xs mt-1 opacity-80 font-medium truncate">{win.title}</div>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MissionControl;
