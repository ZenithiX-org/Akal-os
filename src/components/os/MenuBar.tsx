'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Bluetooth, Search, LayoutGrid, Moon, Sun } from 'lucide-react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';
import { shellTokens } from '@/lib/ui-tokens';
import { format } from 'date-fns';
import Logo from './Logo';

const MenuBar: React.FC = () => {
  const {
    darkMode,
    toggleDarkMode,
    accentColor,
    toggleControlCenter,
    toggleNotificationCenter,
    toggleSpotlight,
    controlCenterOpen,
    notificationCenterOpen,
    windows,
    activeWindowId,
    setLockScreen,
    closeWindow,
    openWindow,
    wifi,
    bluetooth,
    battery,
    notifications,
  } = useOSStore();

  const t = useT();
  const tokens = shellTokens(darkMode, accentColor);

  const [time, setTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Escape dismisses an open menu, matching the rest of the shell overlays.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveMenu(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const activeWindow = windows.find((w) => w.id === activeWindowId);

  const appleMenu = [
    { label: t.menu.aboutOS },
    { separator: true },
    { label: t.menu.systemSettings, action: () => openWindow('settings', t.appName.settings, 820, 600) },
    { label: t.menu.appStore, action: () => openWindow('appstore', t.appName.appstore, 960, 660) },
    { separator: true },
    { label: t.menu.recentItems },
    { separator: true },
    { label: t.menu.forceQuit, shortcut: '⌥⌘⎋', action: () => { if (activeWindowId) closeWindow(activeWindowId); } },
    { separator: true },
    { label: t.menu.sleep, action: () => { setLockScreen(true); fetch('/api/power?action=suspend', { method: 'POST' }).catch(() => {}); } },
    { label: t.menu.restart, action: () => { setLockScreen(true); fetch('/api/power?action=reboot', { method: 'POST' }).catch(() => {}); } },
    { label: t.menu.shutDown, action: () => { setLockScreen(true); fetch('/api/power?action=shutdown', { method: 'POST' }).catch(() => {}); } },
    { separator: true },
    { label: t.menu.lockScreen, shortcut: '⌃⌘Q', action: () => setLockScreen(true) },
    { label: t.menu.logOut, shortcut: '⇧⌘Q' },
  ];

  const appMenu = [
    { label: `${t.menu.aboutApp} ${activeWindow?.title || t.appName.finder}` },
    { separator: true },
    { label: t.menu.close, shortcut: '⌘W', action: () => { if (activeWindowId) closeWindow(activeWindowId); } },
    { separator: true },
    { label: t.menu.forceQuit, shortcut: '⌥⌘⎋', action: () => { if (activeWindowId) closeWindow(activeWindowId); } },
  ];

  const fileMenu = [
    { label: t.menu.newWindow, shortcut: '⌘N' },
    { label: t.menu.open, shortcut: '⌘O' },
    { separator: true },
    { label: t.menu.close, shortcut: '⌘W', action: () => { if (activeWindowId) closeWindow(activeWindowId); } },
    { label: t.menu.save, shortcut: '⌘S' },
  ];

  const editMenu = [
    { label: t.menu.undo, shortcut: '⌘Z' },
    { label: t.menu.redo, shortcut: '⇧⌘Z' },
    { separator: true },
    { label: t.menu.cut, shortcut: '⌘X' },
    { label: t.menu.copy, shortcut: '⌘C' },
    { label: t.menu.paste, shortcut: '⌘V' },
    { label: t.menu.selectAll, shortcut: '⌘A' },
  ];

  const viewMenu = [
    { label: t.menu.darkMode, checked: darkMode, action: toggleDarkMode },
    { separator: true },
    { label: t.menu.enterFullScreen, shortcut: '⌃⌘F' },
  ];

  const goMenu = [
    { label: t.menu.back, shortcut: '⌘[' },
    { label: t.menu.forward, shortcut: '⌘]' },
    { separator: true },
    { label: t.menu.home, shortcut: '⇧⌘H' },
    { label: t.menu.desktop, shortcut: '⇧⌘D' },
    { label: t.menu.downloads, shortcut: '⌥⌘L' },
    { label: t.menu.applications, shortcut: '⇧⌘A' },
  ];

  const windowMenu = [
    { label: t.menu.minimize, shortcut: '⌘M' },
    { label: t.menu.zoom },
    { separator: true },
    { label: t.menu.bringAllToFront },
  ];

  const helpMenu = [
    { label: t.menu.osHelp, shortcut: '⌘?' },
    { label: t.menu.sendFeedback },
  ];

  const menus = [
    { label: 'apple', title: '', items: appleMenu, isBold: false, isLogo: true },
    { label: 'app', title: activeWindow?.title || t.appName.finder, items: appMenu, isBold: true, isLogo: false },
    { label: 'file', title: t.menu.file, items: fileMenu, isBold: false, isLogo: false },
    { label: 'edit', title: t.menu.edit, items: editMenu, isBold: false, isLogo: false },
    { label: 'view', title: t.menu.view, items: viewMenu, isBold: false, isLogo: false },
    { label: 'go', title: t.menu.go, items: goMenu, isBold: false, isLogo: false },
    { label: 'window', title: t.menu.window, items: windowMenu, isBold: false, isLogo: false },
    { label: 'help', title: t.menu.help, items: helpMenu, isBold: false, isLogo: false },
  ];

  const handleMenuClick = (label: string) => {
    setActiveMenu((prev) => (prev === label ? null : label));
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[9999] flex items-center px-3 h-7 select-none ${tokens.glassTopbarClass}`}
      style={{ color: tokens.text }}
      onClick={() => setActiveMenu(null)}
    >
      <div className="flex items-center gap-0.5 flex-1">
        {menus.map((menu) => (
          <div key={menu.label} className="relative">
            <button
              className={`px-2.5 py-0.5 rounded-md transition-all ${menu.isBold ? 'font-semibold' : 'font-normal'}`}
              style={{
                fontSize: 12.5,
                letterSpacing: '0.005em',
                color: activeMenu === menu.label ? tokens.accentContrast : tokens.text,
                background: activeMenu === menu.label ? tokens.accent : 'transparent',
                boxShadow: activeMenu === menu.label ? `0 1px 6px ${tokens.accentGlow}` : 'none',
              }}
              onMouseEnter={(e) => {
                if (activeMenu && activeMenu !== (menu.isLogo ? 'apple' : menu.label)) {
                  setActiveMenu(menu.isLogo ? 'apple' : menu.label);
                }
                if (activeMenu !== (menu.isLogo ? 'apple' : menu.label)) {
                  e.currentTarget.style.background = tokens.hover;
                }
              }}
              onMouseLeave={(e) => {
                if (activeMenu !== (menu.isLogo ? 'apple' : menu.label)) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (menu.isLogo) handleMenuClick('apple');
                else handleMenuClick(menu.label);
              }}
            >
              {menu.isLogo ? (
                <Logo size={16} style={{ display: 'block' }} color="#F57C00" />
              ) : (
                menu.title
              )}
            </button>
            {activeMenu === (menu.isLogo ? 'apple' : menu.label) && menu.items.length > 0 && (
              <div
                className="absolute top-[26px] left-0 rounded-xl py-1 min-w-[230px] z-[10000] shell-panel-in"
                style={{
                  background: tokens.menu,
                  boxShadow: tokens.shadow,
                  border: `1px solid ${tokens.border}`,
                  backdropFilter: 'blur(30px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {menu.items.map((item: any, i: number) =>
                  item.separator ? (
                    <div key={i} className="my-1 mx-2 h-px" style={{ background: tokens.divider }} />
                  ) : (
                    <button
                      key={i}
                      onClick={() => {
                        item.action?.();
                        setActiveMenu(null);
                      }}
                      className="group w-full flex items-center justify-between px-3 py-1 rounded-lg transition-colors"
                      style={{ fontSize: 12.5, color: tokens.text, width: 'calc(100% - 8px)', margin: '0 4px' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = tokens.accent;
                        e.currentTarget.style.color = tokens.accentContrast;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = tokens.text;
                      }}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 inline-block" style={{ color: tokens.accent }}>
                          {item.checked ? '✓' : ''}
                        </span>
                        {item.label}
                      </span>
                      {item.shortcut && <span className="opacity-55 ml-6">{item.shortcut}</span>}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right side — status icons */}
      <div className="flex items-center gap-0.5">
        {/* Battery */}
        <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-md" style={{ color: tokens.icon }}>
          <span style={{ fontSize: 11, fontWeight: 500 }}>{battery}%</span>
          <div
            className="relative w-6 h-3 rounded-[3px]"
            style={{ border: `1px solid ${tokens.icon}`, opacity: 0.95 }}
          >
            <div
              className="absolute rounded-[1px]"
              style={{
                inset: '1.5px',
                width: `calc(${Math.min(battery, 100) * 0.72}% - 3px)`,
                background: battery > 20 ? '#30D158' : '#FF3B30',
              }}
            />
            <div
              className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-1.5 rounded-r"
              style={{ background: tokens.icon, opacity: 0.6 }}
            />
          </div>
        </div>

        {/* Wi-Fi */}
        <span className="px-1" style={{ color: tokens.icon, opacity: wifi ? 0.95 : 0.45 }} title={wifi ? 'Wi-Fi' : 'Wi-Fi off'}>
          {wifi ? <Wifi size={13.5} strokeWidth={2.1} /> : <WifiOff size={13.5} strokeWidth={2.1} />}
        </span>

        {/* Bluetooth (only when enabled, like macOS) */}
        {bluetooth && (
          <span className="px-1" style={{ color: tokens.icon }} title="Bluetooth">
            <Bluetooth size={13} strokeWidth={2.1} />
          </span>
        )}

        {/* Appearance quick toggle */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleDarkMode(); }}
          className="p-1 rounded-md transition-colors"
          style={{ color: tokens.icon }}
          title={darkMode ? t.menu.lightMode : t.menu.darkMode}
        >
          {darkMode ? <Sun size={13.5} strokeWidth={2.1} /> : <Moon size={13.5} strokeWidth={2.1} />}
        </button>

        {/* Spotlight */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleSpotlight(); }}
          className="p-1 rounded-md transition-colors"
          style={{ color: tokens.icon, background: 'transparent' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = tokens.hover; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          title={t.spotlight.placeholder}
        >
          <Search size={13.5} strokeWidth={2.1} />
        </button>

        {/* Control Center */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleControlCenter(); }}
          className="p-1 rounded-md transition-colors"
          style={{ color: tokens.icon, background: controlCenterOpen ? tokens.hover : 'transparent' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = tokens.hover; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = controlCenterOpen ? tokens.hover : 'transparent'; }}
          title={t.notif.notifications}
        >
          <LayoutGrid size={13.5} strokeWidth={2.1} />
        </button>

        {/* Date + clock + notification badge */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleNotificationCenter(); }}
          className="relative px-2 py-0.5 rounded-md transition-colors"
          style={{
            fontSize: 12.5,
            fontWeight: 500,
            color: tokens.text,
            background: notificationCenterOpen ? tokens.hover : 'transparent',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = tokens.hover; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = notificationCenterOpen ? tokens.hover : 'transparent'; }}
          title={t.notif.notifications}
        >
          {format(time, 'EEE MMM d  h:mm aa')}
          {unreadCount > 0 && (
            <span
              className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 rounded-full"
              style={{ background: tokens.accent, boxShadow: `0 0 5px ${tokens.accentGlow}` }}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
