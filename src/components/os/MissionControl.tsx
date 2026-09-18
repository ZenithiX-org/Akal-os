'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/lib/os-store';
import { shellTokens } from '@/lib/ui-tokens';
import { AppIcons } from './AppIcons';

const MissionControl: React.FC = () => {
  const { missionControl, toggleMissionControl, windows, focusWindow, wallpaper, darkMode, accentColor } = useOSStore();
  const tokens = shellTokens(darkMode, accentColor);

  const visibleWindows = windows.filter((w) => !w.isMinimized);
  const isGradient = wallpaper.startsWith('linear-gradient') || wallpaper.startsWith('radial-gradient');

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
            backgroundImage: isGradient ? wallpaper : `url(${wallpaper})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          onClick={toggleMissionControl}
        >
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)' }} />

          {/* Spaces bar */}
          <div className="relative z-10 flex items-center justify-center gap-3 pt-7 pb-4">
            <div className="text-white/55" style={{ fontSize: 12 }}>Spaces</div>
            {[1, 2, 3].map((space) => (
              <button
                key={space}
                className="px-5 py-1.5 rounded-xl text-white transition-all"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  background: space === 1 ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)',
                  border: space === 1 ? '1px solid rgba(255,255,255,0.28)' : '1px solid rgba(255,255,255,0.12)',
                  boxShadow: space === 1 ? 'inset 0 1px 0 rgba(255,255,255,0.2)' : 'none',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                Desktop {space}
              </button>
            ))}
            <button
              className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors"
              style={{ fontSize: 16 }}
              onClick={(e) => e.stopPropagation()}
              aria-label="Add desktop"
            >
              +
            </button>
          </div>

          {/* Windows */}
          <div className="relative z-10 flex-1 flex flex-wrap items-center justify-center gap-6 px-12 pb-10 overflow-y-auto no-scrollbar">
            {visibleWindows.length === 0 ? (
              <div className="text-white/55" style={{ fontSize: 15 }}>No open windows</div>
            ) : (
              visibleWindows.map((win, i) => {
                const width = Math.min(300, Math.max(200, win.width * 0.28));
                const height = Math.min(210, Math.max(140, win.height * 0.28));
                const IconComp = AppIcons[win.appId];
                return (
                  <motion.button
                    key={win.id}
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: i * 0.05, type: 'spring', stiffness: 320, damping: 30 }}
                    className="group text-left"
                    onClick={(e) => { e.stopPropagation(); focusWindow(win.id); toggleMissionControl(); }}
                    style={{ width, height }}
                    aria-label={win.title}
                  >
                    <div
                      className="w-full h-full rounded-xl overflow-hidden mission-card"
                      style={{
                        background: darkMode ? 'rgba(40,40,48,0.6)' : 'rgba(245,245,250,0.65)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        border: `1px solid ${tokens.border}`,
                        boxShadow: `inset 0 1px 1px rgba(255,255,255,0.12), 0 12px 30px rgba(0,0,0,0.35)`,
                      }}
                    >
                      <div
                        className="h-5 flex items-center gap-1 px-2"
                        style={{ background: darkMode ? 'rgba(58,58,66,0.6)' : 'rgba(226,226,232,0.7)' }}
                      >
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="ml-1 truncate" style={{ fontSize: 8.5, color: tokens.text }}>{win.title}</span>
                      </div>
                      <div className="flex items-center justify-center" style={{ height: 'calc(100% - 20px)' }}>
                        {IconComp ? <IconComp size={52} /> : <span style={{ fontSize: 26 }}>📱</span>}
                      </div>
                    </div>
                    <div
                      className="text-center mt-1.5 truncate transition-colors"
                      style={{ fontSize: 11.5, fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}
                    >
                      {win.title}
                    </div>
                  </motion.button>
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
