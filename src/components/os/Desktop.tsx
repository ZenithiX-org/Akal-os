'use client';

import React, { useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/lib/os-store';

// Shell components
import MenuBar from './MenuBar';
import Dock from './Dock';
import Window from './Window';
import ControlCenter from './ControlCenter';
import NotificationCenter from './NotificationCenter';
import Spotlight from './Spotlight';
import Launchpad from './Launchpad';
import LockScreen from './LockScreen';
import MissionControl from './MissionControl';
import BootScreen from './BootScreen';
import { useT } from '@/lib/use-i18n';

// Apps
import FinderApp from './apps/FinderApp';
import SafariApp from './apps/SafariApp';
import NotesApp from './apps/NotesApp';
import CalculatorApp from './apps/CalculatorApp';
import TerminalApp from './apps/TerminalApp';
import SettingsApp from './apps/SettingsApp';
import CalendarApp from './apps/CalendarApp';
import MusicApp from './apps/MusicApp';
import MessagesApp from './apps/MessagesApp';
import PhotosApp from './apps/PhotosApp';
import AppStoreApp from './apps/AppStoreApp';
import MailApp from './apps/MailApp';
import RemindersApp from './apps/RemindersApp';
import MapsApp from './apps/MapsApp';
import FaceTimeApp from './apps/FaceTimeApp';
import TrashApp from './apps/TrashApp';
import WeatherApp from './apps/WeatherApp';

const AppRenderer: React.FC<{ appId: string }> = ({ appId }) => {
  switch (appId) {
    case 'finder': return <FinderApp />;
    case 'safari': return <SafariApp />;
    case 'notes': return <NotesApp />;
    case 'calculator': return <CalculatorApp />;
    case 'terminal': return <TerminalApp />;
    case 'settings': return <SettingsApp />;
    case 'calendar': return <CalendarApp />;
    case 'music': return <MusicApp />;
    case 'messages': return <MessagesApp />;
    case 'photos': return <PhotosApp />;
    case 'appstore': return <AppStoreApp />;
    case 'mail': return <MailApp />;
    case 'reminders': return <RemindersApp />;
    case 'maps': return <MapsApp />;
    case 'facetime': return <FaceTimeApp />;
    case 'trash': return <TrashApp />;
    case 'weather': return <WeatherApp />;
    default:
      return (
        <div className="flex flex-col items-center justify-center h-full gap-4" style={{ background: '#1c1c1e' }}>
          <span className="text-6xl">📱</span>
          <p className="text-lg font-semibold text-white">{appId.charAt(0).toUpperCase() + appId.slice(1)}</p>
          <p className="text-sm opacity-50 text-white">App coming soon</p>
        </div>
      );
  }
};

const Desktop: React.FC = () => {
  const {
    windows, wallpaper, darkMode,
    isLockScreen, missionControl, launchpadOpen,
    setLockScreen, toggleMissionControl, toggleSpotlight,
    controlCenterOpen, toggleControlCenter,
    notificationCenterOpen, toggleNotificationCenter,
    contextMenu, setContextMenu, setWallpaper,
    isBooting, finishBoot, brightness,
  } = useOSStore();
  const t = useT();

  const isGradient = wallpaper.startsWith('linear-gradient');

  const handleDesktopRightClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { label: t.menu.newFolder, action: () => {} },
        { label: t.menu.getInfo, action: () => {} },
        { separator: true },
        { label: t.settings.wallpaper + '...', action: () => setWallpaper('linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)') },
        { label: 'Use Stacks', action: () => {} },
        { separator: true },
        { label: 'Show View Options', action: () => {} },
      ],
    });
  }, [setContextMenu, setWallpaper, t]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setContextMenu(null);
        if (controlCenterOpen) toggleControlCenter();
        if (notificationCenterOpen) toggleNotificationCenter();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === ' ') { e.preventDefault(); toggleSpotlight(); }
      if ((e.metaKey || e.ctrlKey) && e.key === 'm') { e.preventDefault(); toggleMissionControl(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [controlCenterOpen, notificationCenterOpen, toggleControlCenter, toggleNotificationCenter, toggleSpotlight, toggleMissionControl, setContextMenu]);

  // Auto-finish boot after a delay if not already done
  useEffect(() => {
    if (isBooting) {
      const timer = setTimeout(() => finishBoot(), 3500);
      return () => clearTimeout(timer);
    }
  }, [isBooting, finishBoot]);

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        background: isGradient ? wallpaper : `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: `brightness(${0.5 + (brightness / 100) * 0.5})`,
      }}
      onContextMenu={handleDesktopRightClick}
      onClick={() => {
        setContextMenu(null);
        if (controlCenterOpen) toggleControlCenter();
        if (notificationCenterOpen) toggleNotificationCenter();
      }}
    >
      {/* Wallpaper overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)' }} />

      <MenuBar />

      {/* Windows */}
      <AnimatePresence>
        {windows.map((win) =>
          !win.isMinimized && (
            <Window key={win.id} window={win}>
              <AppRenderer appId={win.appId} />
            </Window>
          )
        )}
      </AnimatePresence>

      <Dock />

      {/* Overlays */}
      <ControlCenter />
      <NotificationCenter />
      <Spotlight />
      <Launchpad />
      <MissionControl />

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed z-[9999] rounded-xl py-1 min-w-[200px] shadow-2xl"
          style={{
            left: Math.min(contextMenu.x, (typeof window !== 'undefined' ? window.innerWidth : 9999) - 220),
            top: Math.min(contextMenu.y, (typeof window !== 'undefined' ? window.innerHeight : 9999) - 200),
            background: darkMode ? 'rgba(35,35,40,0.6)' : 'rgba(240,240,245,0.65)',
            backdropFilter: 'blur(40px) saturate(200%)',
            WebkitBackdropFilter: 'blur(40px) saturate(200%)',
            border: darkMode ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.6)',
            boxShadow: darkMode ? '0 25px 60px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.12)' : '0 25px 60px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.8)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenu.items.map((item: any, i: number) =>
            item.separator ? (
              <div key={i} className="my-1 mx-2 h-px" style={{ background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
            ) : (
              <button
                key={i}
                className="w-full flex items-center px-4 py-1.5 text-sm rounded-lg mx-0.5 transition-colors hover:bg-blue-500 hover:text-white"
                style={{ color: darkMode ? 'white' : '#1d1d1f', width: 'calc(100% - 4px)' }}
                onClick={() => { item.action?.(); setContextMenu(null); }}
              >
                {item.label}
              </button>
            )
          )}
        </div>
      )}

      {/* Lock screen overlay */}
      <AnimatePresence>
        {isLockScreen && <LockScreen />}
      </AnimatePresence>

      {/* Boot screen */}
      <AnimatePresence>
        {isBooting && <BootScreen />}
      </AnimatePresence>

      {/* Mission Control hint badge - only show when no windows open */}
      {windows.length === 0 && !isBooting && !isLockScreen && !launchpadOpen && !missionControl && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10">
          <div className="text-white/90 text-2xl font-light mb-2 drop-shadow-lg">{t.common.welcome}</div>
          <div className="text-white/60 text-sm drop-shadow-lg">{t.common.welcomeSub}</div>
        </div>
      )}
    </div>
  );
};

export default Desktop;
