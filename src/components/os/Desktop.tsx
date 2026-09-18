'use client';

import React, { useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOSStore } from '@/lib/os-store';

// Shell components
import MenuBar from './MenuBar';
import Logo from './Logo';
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
import { shellTokens, withAlpha } from '@/lib/ui-tokens';

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
    contextMenu, setContextMenu,
    isBooting, finishBoot, brightness,
    accentColor, toggleDarkMode, toggleLaunchpad, openWindow,
  } = useOSStore();
  const t = useT();
  const tokens = shellTokens(darkMode, accentColor);

  const isGradient = wallpaper.startsWith('linear-gradient') || wallpaper.startsWith('radial-gradient');

  // Expose the runtime accent as CSS variables so pure-CSS utilities
  // (.glass-pill.active, sliders, focus rings, Mission Control rings) follow it.
  const accentVars = {
    '--accent': accentColor,
    '--accent-soft': withAlpha(accentColor, 0.18),
    '--accent-glow': withAlpha(accentColor, 0.45),
    '--accent-contrast': '#ffffff',
  } as React.CSSProperties;

  const handleDesktopRightClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { label: t.menu.newFolder, action: () => {} },
        { label: t.menu.getInfo, action: () => {} },
        { separator: true },
        { label: t.appName.launchpad, action: toggleLaunchpad },
        { label: t.settings.wallpaper + '…', action: () => openWindow('settings', t.appName.settings, 820, 600) },
        { label: t.menu.darkMode, action: toggleDarkMode },
        { separator: true },
        { label: t.spotlight.placeholder, action: toggleSpotlight },
        { label: t.menu.lockScreen, action: () => setLockScreen(true) },
      ],
    });
  }, [setContextMenu, t, toggleLaunchpad, openWindow, toggleDarkMode, toggleSpotlight, setLockScreen]);

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
        ...accentVars,
        backgroundImage: isGradient ? wallpaper : `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
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

      {/* Context Menu — raised glass surface that follows the appearance + accent */}
      {contextMenu && (
        <div
          className="fixed z-[9999] rounded-xl py-1 min-w-[210px] shell-panel-in"
          style={{
            left: Math.min(contextMenu.x, (typeof window !== 'undefined' ? window.innerWidth : 9999) - 230),
            top: Math.min(contextMenu.y, (typeof window !== 'undefined' ? window.innerHeight : 9999) - 250),
            background: tokens.menu,
            boxShadow: tokens.shadow,
            border: `1px solid ${tokens.border}`,
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenu.items.map((item: any, i: number) =>
            item.separator ? (
              <div key={i} className="my-1 mx-2 h-px" style={{ background: tokens.divider }} />
            ) : (
              <button
                key={i}
                className="flex items-center w-full px-3 py-1 rounded-lg transition-colors"
                style={{ fontSize: 12.5, color: tokens.text, width: 'calc(100% - 8px)', margin: '0 4px' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = tokens.accent;
                  e.currentTarget.style.color = tokens.accentContrast;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = tokens.text;
                }}
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

      {/* Welcome hint — only when no windows are open. Quiet, directional. */}
      {windows.length === 0 && !isBooting && !isLockScreen && !launchpadOpen && !missionControl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10"
        >
          <div className="flex justify-center mb-4 opacity-80">
            <Logo size={34} color="#F57C00" />
          </div>
          <div className="text-white/90 font-light mb-1.5" style={{ fontSize: 21, letterSpacing: '0.01em', textShadow: '0 2px 16px rgba(0,0,0,0.6)' }}>
            {t.common.welcome}
          </div>
          <div className="text-white/50 font-light" style={{ fontSize: 12.5, textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
            {t.common.welcomeSub}
          </div>
          <div className="flex items-center justify-center gap-3 mt-6" style={{ fontSize: 11 }}>
            {['⌘ Space — ' + t.spotlight.placeholder, '⌘ M — Mission Control'].map((hint) => (
              <span
                key={hint}
                className="px-2.5 py-1 rounded-full"
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                {hint}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Desktop;
