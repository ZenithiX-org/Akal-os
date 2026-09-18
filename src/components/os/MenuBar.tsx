'use client';

import React, { useState, useEffect } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';
import { format } from 'date-fns';
import Logo from './Logo';

const MenuBar: React.FC = () => {
  const {
    darkMode,
    toggleControlCenter,
    toggleNotificationCenter,
    toggleSpotlight,
    controlCenterOpen,
    notificationCenterOpen,
    windows,
    activeWindowId,
    setLockScreen,
    closeWindow,
    toggleDarkMode,
    openWindow,
  } = useOSStore();

  const t = useT();

  const [time, setTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [battery] = useState(87);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
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
    { label: darkMode ? t.menu.lightMode : t.menu.darkMode, action: toggleDarkMode },
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
    { label: 'app', title: activeWindow?.title || t.appName.finder, items: [], isBold: true, isLogo: false },
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
      className="fixed top-0 left-0 right-0 z-[9999] flex items-center px-3 h-7 select-none"
      style={{
        background: darkMode ? '#14141c' : '#e0e0e8',
        boxShadow: darkMode
          ? 'inset 0 -1px 3px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)'
          : 'inset 0 -1px 2px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)',
      }}
      onClick={() => setActiveMenu(null)}
    >
      <div className="flex items-center gap-1 flex-1">
        {menus.map((menu) => (
          <div key={menu.label} className="relative">
            <button
              className={`px-2.5 py-0.5 text-[13px] rounded-md transition-all ${
                activeMenu === menu.label
                  ? darkMode ? 'text-white' : 'text-black'
                  : darkMode
                  ? 'text-white/85 hover:bg-white/5'
                  : 'text-black/75 hover:bg-black/5'
              } ${menu.isBold ? 'font-semibold' : 'font-normal'}`}
              style={activeMenu === menu.label ? (darkMode ? {
                background: 'linear-gradient(145deg, #2a2a38, #1e1e28)',
                boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.4), inset -1px -1px 2px rgba(255,255,255,0.04)',
              } : {
                background: 'linear-gradient(145deg, #f0f0f5, #d8d8e0)',
                boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.1), inset -1px -1px 2px rgba(255,255,255,0.8)',
              }) : {}}
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
                className="absolute top-7 left-0 rounded-xl py-1 min-w-[220px] z-[10000]"
                style={{
                  background: darkMode ? '#1e1e28' : '#ebebf2',
                  boxShadow: darkMode
                    ? '12px 12px 30px rgba(0,0,0,0.6), -4px -4px 14px rgba(255,255,255,0.02), inset 0 1px 0 rgba(255,255,255,0.06)'
                    : '10px 10px 28px rgba(0,0,0,0.15), -4px -4px 14px rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,0.5)',
                  border: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {menu.items.map((item: any, i: number) =>
                  item.separator ? (
                    <div key={i} className="my-1 mx-2 h-px" style={{ background: darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)' }} />
                  ) : (
                    <button
                      key={i}
                      onClick={() => {
                        item.action?.();
                        setActiveMenu(null);
                      }}
                      className="w-full flex items-center justify-between px-4 py-1 text-[13px] rounded-lg mx-0.5 transition-colors hover:bg-[#d70a53] hover:text-white"
                      style={{ color: darkMode ? 'white' : '#1d1d1f', width: 'calc(100% - 4px)' }}
                    >
                      <span>{item.label}</span>
                      {item.shortcut && <span className="text-xs opacity-60 ml-6">{item.shortcut}</span>}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right side - Status icons */}
      <div className="flex items-center gap-1">
        {/* Battery */}
        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md ${darkMode ? 'text-white/80' : 'text-black/80'}`}>
          <span className="text-[11px] font-medium">{battery}%</span>
          <div className="relative w-6 h-3 rounded-sm border" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
            <div className="absolute inset-0.5 rounded-[1px]" style={{ width: `${battery * 0.7}%`, background: battery > 20 ? '#30D158' : '#FF3B30' }} />
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-1.5 rounded-r" style={{ background: darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }} />
          </div>
        </div>

        {/* WiFi */}
        <svg className={`w-3.5 h-3.5 ${darkMode ? 'text-white/80' : 'text-black/80'}`} fill="currentColor" viewBox="0 0 640 512">
          <path d="M318.4 446.6c-18.2 0-36.5-6.9-50.4-20.7-13.9-13.9-20.7-32.1-20.7-50.4 0-18.2 6.9-36.5 20.7-50.4 13.9-13.9 32.1-20.7 50.4-20.7 18.2 0 36.5 6.9 50.4 20.7 13.9 13.9 20.7 32.1 20.7 50.4 0 18.2-6.9 36.5-20.7 50.4-13.9 13.8-32.2 20.7-50.4 20.7zm245.6-119.3c-13.9-13.9-32.1-20.7-50.4-20.7-18.2 0-36.5 6.9-50.4 20.7L318.4 371.9 73.5 127c-13.9-13.9-32.1-20.7-50.4-20.7-18.2 0-36.5 6.9-50.4 20.7-13.9 13.9-20.7 32.1-20.7 50.4 0 18.2 6.9 36.5 20.7 50.4l269.7 269.7c13.9 13.9 32.1 20.7 50.4 20.7 18.2 0 36.5-6.9 50.4-20.7l220.8-220.8c13.9-13.9 20.7-32.1 20.7-50.4 0-18.2-6.9-36.5-20.7-50.4z"/>
        </svg>

        {/* Spotlight */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleSpotlight(); }}
          className={`p-1 rounded-md transition-colors ${darkMode ? 'text-white/80 hover:bg-white/10' : 'text-black/80 hover:bg-black/10'}`}
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Control Center */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleControlCenter(); }}
          className={`p-1 rounded-md transition-colors ${controlCenterOpen ? (darkMode ? 'bg-white/20' : 'bg-black/20') : ''} ${darkMode ? 'text-white/80 hover:bg-white/10' : 'text-black/80 hover:bg-black/10'}`}
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 6h4v4H4V6zm6 0h4v4h-4V6zm6 0h4v4h-4V6zM4 14h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
          </svg>
        </button>

        {/* Date + Clock */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleNotificationCenter(); }}
          className={`px-2 py-0.5 text-xs rounded-md transition-colors ${notificationCenterOpen ? (darkMode ? 'bg-white/20' : 'bg-black/20') : ''} ${darkMode ? 'text-white/90 hover:bg-white/10' : 'text-black/90 hover:bg-black/10'} font-medium`}
        >
          {format(time, 'EEE MMM d  h:mm aa')}
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
