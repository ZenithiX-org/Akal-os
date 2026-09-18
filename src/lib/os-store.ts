'use client';

import { create } from 'zustand';
import type { AppWindow, OSNotification, ContextMenuState } from './os-types';
import type { Language } from './i18n';

// Default wallpapers are CSS gradients — dark, muted tones that harmonize
// with the neomorphic dark UI surfaces and the colorful app icons.
export const WALLPAPERS: { id: string; name: string; value: string }[] = [
  {
    id: 'midnight-bloom',
    name: 'Midnight Bloom',
    value: 'radial-gradient(ellipse at 30% 20%, #2a1830 0%, #1a1024 35%, #0d0814 75%, #060409 100%)',
  },
  {
    id: 'deep-aurora',
    name: 'Deep Aurora',
    value: 'linear-gradient(160deg, #1a1530 0%, #15122a 40%, #0c0a18 75%, #06050d 100%)',
  },
  {
    id: 'obsidian-glow',
    name: 'Obsidian Glow',
    value: 'radial-gradient(ellipse at 70% 80%, #1f1a2e 0%, #14111e 50%, #0a0810 100%)',
  },
  {
    id: 'crimson-dusk',
    name: 'Crimson Dusk',
    value: 'linear-gradient(135deg, #1a0a14 0%, #160810 40%, #0d0508 80%, #050203 100%)',
  },
  {
    id: 'indigo-depth',
    name: 'Indigo Depth',
    value: 'radial-gradient(ellipse at 50% 30%, #181a2e 0%, #101225 45%, #080916 80%, #040509 100%)',
  },
  {
    id: 'forest-night',
    name: 'Forest Night',
    value: 'linear-gradient(160deg, #0d1810 0%, #0a1410 40%, #060c08 75%, #030604 100%)',
  },
  {
    id: 'graphite',
    name: 'Graphite',
    value: 'linear-gradient(135deg, #1c1c20 0%, #161618 50%, #0e0e10 100%)',
  },
  {
    id: 'amethyst-shadow',
    name: 'Amethyst Shadow',
    value: 'radial-gradient(ellipse at 40% 60%, #1f1830 0%, #14101e 50%, #0a0814 100%)',
  },
  {
    id: 'punjab-night',
    name: 'Punjab Night',
    value: 'linear-gradient(135deg, #1a0a18 0%, #2a0d1e 35%, #1a0510 70%, #0d0308 100%)',
  },
  {
    id: 'carbon',
    name: 'Carbon',
    value: 'linear-gradient(180deg, #161618 0%, #121214 50%, #0a0a0c 100%)',
  },
];

interface OSState {
  // Boot / lock
  isBooting: boolean;
  isLockScreen: boolean;
  // Windows
  windows: AppWindow[];
  activeWindowId: string | null;
  topZIndex: number;
  // Theme / appearance
  darkMode: boolean;
  wallpaper: string;
  accentColor: string;
  // Overlays
  missionControl: boolean;
  launchpadOpen: boolean;
  controlCenterOpen: boolean;
  notificationCenterOpen: boolean;
  spotlightOpen: boolean;
  // System settings
  wifi: boolean;
  bluetooth: boolean;
  volume: number;
  brightness: number;
  doNotDisturb: boolean;
  focusMode: boolean;
  airplayEnabled: boolean;
  battery: number;
  language: Language;
  // Notifications
  notifications: OSNotification[];
  // Context menu
  contextMenu: ContextMenuState | null;

  // Actions - boot / lock
  finishBoot: () => void;
  setLockScreen: (v: boolean) => void;
  // Actions - windows
  openWindow: (appId: string, title: string, width: number, height: number) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, width: number, height: number, x?: number, y?: number) => void;
  // Actions - theme
  toggleDarkMode: () => void;
  setWallpaper: (w: string) => void;
  setAccentColor: (c: string) => void;
  // Actions - overlays
  toggleMissionControl: () => void;
  toggleLaunchpad: () => void;
  toggleControlCenter: () => void;
  toggleNotificationCenter: () => void;
  toggleSpotlight: () => void;
  closeAllOverlays: () => void;
  // Actions - system
  toggleWifi: () => void;
  toggleBluetooth: () => void;
  setVolume: (v: number) => void;
  setBrightness: (v: number) => void;
  toggleDoNotDisturb: () => void;
  toggleFocusMode: () => void;
  toggleAirplay: () => void;
  setLanguage: (l: Language) => void;
  // Actions - notifications
  addNotification: (n: Omit<OSNotification, 'id' | 'time' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  // Actions - context menu
  setContextMenu: (c: ContextMenuState | null) => void;
}

export const useOSStore = create<OSState>((set, get) => ({
  isBooting: true,
  isLockScreen: false,

  windows: [],
  activeWindowId: null,
  topZIndex: 100,

  darkMode: true,
  wallpaper: WALLPAPERS[0].value,
  accentColor: '#0071E3',

  missionControl: false,
  launchpadOpen: false,
  controlCenterOpen: false,
  notificationCenterOpen: false,
  spotlightOpen: false,

  wifi: true,
  bluetooth: true,
  volume: 75,
  brightness: 90,
  doNotDisturb: false,
  focusMode: false,
  airplayEnabled: false,
  battery: 87,
  language: 'en',

  notifications: [
    {
      id: 'n1',
      title: 'Akal OS',
      message: 'Welcome to Akal OS 1.0! Explore the dock and launchpad.',
      app: 'System',
      icon: '🚀',
      time: new Date(),
      read: false,
    },
    {
      id: 'n2',
      title: 'Messages',
      message: 'Harpreet Singh: ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?',
      app: 'Messages',
      icon: '💬',
      time: new Date(Date.now() - 3600000),
      read: false,
    },
    {
      id: 'n3',
      title: 'Calendar',
      message: 'Team Meeting in 15 minutes',
      app: 'Calendar',
      icon: '📅',
      time: new Date(Date.now() - 7200000),
      read: true,
    },
    {
      id: 'n4',
      title: 'Weather',
      message: 'Amritsar: 26°C, Sunny ☀️',
      app: 'Weather',
      icon: '🌤️',
      time: new Date(Date.now() - 10800000),
      read: true,
    },
  ],

  contextMenu: null,

  finishBoot: () => set({ isBooting: false }),
  setLockScreen: (v) => set({ isLockScreen: v }),

  openWindow: (appId, title, width, height) => {
    const state = get();
    // If a window for this app already exists, just focus/unminimize it
    const existing = state.windows.find((w) => w.appId === appId);
    if (existing) {
      const newZ = state.topZIndex + 1;
      set({
        activeWindowId: existing.id,
        topZIndex: newZ,
        windows: state.windows.map((w) =>
          w.id === existing.id
            ? { ...w, isMinimized: false, isFocused: true, zIndex: newZ }
            : { ...w, isFocused: false }
        ),
      });
      return;
    }
    const id = `${appId}-${Date.now()}`;
    const newZ = state.topZIndex + 1;
    const offset = state.windows.length * 28;
    const maxX = Math.max(50, window.innerWidth - width - 40);
    const maxY = Math.max(40, window.innerHeight - height - 80);
    const x = Math.min(80 + offset, maxX);
    const y = Math.min(50 + offset, maxY);
    const win: AppWindow = {
      id,
      appId,
      title,
      x,
      y,
      width,
      height,
      isMinimized: false,
      isMaximized: false,
      isFocused: true,
      zIndex: newZ,
    };
    set({
      windows: [...state.windows.map((w) => ({ ...w, isFocused: false })), win],
      activeWindowId: id,
      topZIndex: newZ,
    });
  },

  closeWindow: (id) =>
    set((s) => ({
      windows: s.windows.filter((w) => w.id !== id),
      activeWindowId: s.activeWindowId === id ? null : s.activeWindowId,
    })),

  minimizeWindow: (id) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true, isFocused: false } : w
      ),
      activeWindowId: s.activeWindowId === id ? null : s.activeWindowId,
    })),

  toggleMaximize: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => {
        if (w.id !== id) return w;
        if (w.isMaximized) {
          const p = w.prevSize;
          return p
            ? { ...w, isMaximized: false, x: p.x, y: p.y, width: p.width, height: p.height }
            : { ...w, isMaximized: false };
        }
        return {
          ...w,
          isMaximized: true,
          prevSize: { x: w.x, y: w.y, width: w.width, height: w.height },
        };
      }),
    })),

  focusWindow: (id) => {
    const state = get();
    const newZ = state.topZIndex + 1;
    set({
      activeWindowId: id,
      topZIndex: newZ,
      windows: state.windows.map((w) =>
        w.id === id
          ? { ...w, isFocused: true, isMinimized: false, zIndex: newZ }
          : { ...w, isFocused: false }
      ),
    });
  },

  moveWindow: (id, x, y) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
    })),

  resizeWindow: (id, width, height, x, y) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id
          ? { ...w, width, height, ...(x !== undefined ? { x } : {}), ...(y !== undefined ? { y } : {}) }
          : w
      ),
    })),

  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
  setWallpaper: (w) => set({ wallpaper: w }),
  setAccentColor: (c) => set({ accentColor: c }),

  toggleMissionControl: () =>
    set((s) => ({ missionControl: !s.missionControl, launchpadOpen: false, spotlightOpen: false, controlCenterOpen: false, notificationCenterOpen: false })),
  toggleLaunchpad: () =>
    set((s) => ({ launchpadOpen: !s.launchpadOpen, missionControl: false, spotlightOpen: false })),
  toggleControlCenter: () =>
    set((s) => ({ controlCenterOpen: !s.controlCenterOpen, notificationCenterOpen: false })),
  toggleNotificationCenter: () =>
    set((s) => ({ notificationCenterOpen: !s.notificationCenterOpen, controlCenterOpen: false })),
  toggleSpotlight: () =>
    set((s) => ({ spotlightOpen: !s.spotlightOpen, launchpadOpen: false, missionControl: false })),
  closeAllOverlays: () =>
    set({ missionControl: false, launchpadOpen: false, controlCenterOpen: false, notificationCenterOpen: false, spotlightOpen: false }),

  toggleWifi: () => set((s) => ({ wifi: !s.wifi })),
  toggleBluetooth: () => set((s) => ({ bluetooth: !s.bluetooth })),
  setVolume: (v) => set({ volume: Math.max(0, Math.min(100, v)) }),
  setBrightness: (v) => set({ brightness: Math.max(0, Math.min(100, v)) }),
  toggleDoNotDisturb: () => set((s) => ({ doNotDisturb: !s.doNotDisturb })),
  toggleFocusMode: () => set((s) => ({ focusMode: !s.focusMode })),
  toggleAirplay: () => set((s) => ({ airplayEnabled: !s.airplayEnabled })),
  setLanguage: (l) => set({ language: l }),

  addNotification: (n) =>
    set((s) => ({
      notifications: [
        { ...n, id: `n-${Date.now()}`, time: new Date(), read: false },
        ...s.notifications,
      ],
    })),
  markNotificationRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  clearNotifications: () => set({ notifications: [] }),

  setContextMenu: (c) => set({ contextMenu: c }),
}));
