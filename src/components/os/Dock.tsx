'use client';

import React, { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';
import { shellTokens, type ShellTokens } from '@/lib/ui-tokens';
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

/** Magnification geometry: peak growth, cursor influence radius, icon size. */
const MAX_GROWTH = 1.55;
const INFLUENCE = 118;
const ICON_SIZE = 46;

/** macOS-style magnification — growth falls off smoothly with cursor distance. */
function magnifyFor(center: number, mouseX: number | null) {
  if (mouseX === null || center < 0) return { scale: 1, lift: 0 };
  const d = Math.abs(mouseX - center);
  const falloff = Math.exp(-(d * d) / (2 * INFLUENCE * INFLUENCE));
  const scale = 1 + (MAX_GROWTH - 1) * falloff;
  return { scale, lift: -(scale - 1) * 20 };
}

/** Neomorphic tile surface for a dock icon, themed to the current appearance. */
function tileTokens(tokens: ShellTokens, hovered: boolean) {
  const background = tokens.dark
    ? 'linear-gradient(145deg, #262634, #17171f)'
    : 'linear-gradient(145deg, #fbfbfe, #dcdce6)';
  const boxShadow = tokens.dark
    ? hovered
      ? '5px 5px 12px rgba(0,0,0,0.55), -3px -3px 8px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)'
      : '3px 3px 8px rgba(0,0,0,0.42), -2px -2px 6px rgba(255,255,255,0.035), inset 0 1px 0 rgba(255,255,255,0.06)'
    : hovered
      ? '5px 5px 12px rgba(0,0,0,0.16), -3px -3px 8px rgba(255,255,255,0.95), inset 0 1px 0 rgba(255,255,255,0.9)'
      : '3px 3px 8px rgba(0,0,0,0.12), -2px -2px 6px rgba(255,255,255,0.85), inset 0 1px 0 rgba(255,255,255,0.8)';
  return { background, boxShadow };
}

/** Shared dock tooltip bubble. */
const DockTooltip: React.FC<{ label: string; tokens: ShellTokens; offset: number }> = ({ label, tokens, offset }) => (
  <motion.div
    initial={{ opacity: 0, y: 6, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 4, scale: 0.96 }}
    transition={{ duration: 0.12 }}
    className="absolute whitespace-nowrap px-2.5 py-1 rounded-lg font-medium pointer-events-none"
    style={{
      bottom: `calc(100% + ${offset}px)`,
      background: tokens.menu,
      color: tokens.text,
      border: `1px solid ${tokens.border}`,
      boxShadow: tokens.shadowSoft,
      fontSize: 11,
      letterSpacing: '0.01em',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
    }}
  >
    {label}
  </motion.div>
);

interface DockIconProps {
  app: DockApp;
  tokens: ShellTokens;
  scale: number;
  lift: number;
  /** Called with the cursor-offset delta so the container can keep the tooltip clear of a magnified icon. */
  onHoverChange?: (hovered: boolean) => void;
}

const DockIcon: React.FC<DockIconProps> = ({ app, tokens, scale, lift, onHoverChange }) => {
  const { openWindow, windows, focusWindow } = useOSStore();
  const t = useT();
  const [hovered, setHovered] = useState(false);

  const isFrontmost = windows.some((w) => w.appId === app.id && !w.isMinimized);
  const isRunning = windows.some((w) => w.appId === app.id);

  const IconComp = AppIcons[app.id];
  const label = (t.appName as Record<string, string>)[app.id] || app.name;

  const handleClick = () => {
    const existing = windows.find((w) => w.appId === app.id);
    if (existing) {
      focusWindow(existing.id);
    } else {
      const [w, h] = windowSizes[app.id] || [800, 550];
      openWindow(app.id, windowTitles[app.id] || app.name, w, h);
    }
  };

  const tile = tileTokens(tokens, hovered);

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ zIndex: hovered ? 40 : 1 }}
      onMouseEnter={() => { setHovered(true); onHoverChange?.(true); }}
      onMouseLeave={() => { setHovered(false); onHoverChange?.(false); }}
    >
      <AnimatePresence>
        {hovered && <DockTooltip label={label} tokens={tokens} offset={16 + (scale - 1) * 26} />}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        whileTap={{ scale: scale * 0.94 }}
        animate={{ scale, y: lift }}
        transition={{ type: 'spring', stiffness: 520, damping: 30, mass: 0.5 }}
        className="relative flex items-center justify-center"
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          borderRadius: 13,
          background: tile.background,
          boxShadow: tile.boxShadow,
          transformOrigin: 'bottom center',
        }}
        aria-label={label}
        title={label}
      >
        {IconComp ? <IconComp size={38} /> : <span className="text-2xl">{app.name[0]}</span>}
      </motion.button>

      {/* Running indicator: accent dot when the app has a visible window */}
      {isRunning && (
        <div
          className="absolute -bottom-1 w-1 h-1 rounded-full"
          style={{
            background: isFrontmost ? tokens.accent : tokens.faintText,
            boxShadow: isFrontmost ? `0 0 6px ${tokens.accentGlow}` : 'none',
          }}
        />
      )}
    </div>
  );
};

const Dock: React.FC = () => {
  const { toggleLaunchpad, darkMode, accentColor } = useOSStore();
  const t = useT();
  const tokens = shellTokens(darkMode, accentColor);
  const dockRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [centers, setCenters] = useState<number[]>([]);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [launchpadHovered, setLaunchpadHovered] = useState(false);

  const measure = useCallback(() => {
    setCenters(itemRefs.current.map((el) => (el ? el.offsetLeft + el.offsetWidth / 2 : -1)));
  }, []);

  // Icon centers drive the cursor-distance magnification, so measure after layout.
  useLayoutEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    const settle = window.setTimeout(measure, 350);
    return () => {
      window.removeEventListener('resize', measure);
      window.clearTimeout(settle);
    };
  }, [measure]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = dockRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouseX(e.clientX - rect.left);
  };

  const containerBackground = tokens.dark ? 'rgba(20,20,27,0.58)' : 'rgba(252,252,255,0.55)';
  const tile = tileTokens(tokens, false);
  const launchpadMagnify = magnifyFor(centers[0] ?? -1, mouseX);
  const trashMagnify = magnifyFor(centers[dockApps.length + 1] ?? -1, mouseX);

  return (
    <div className="fixed bottom-2 left-0 right-0 flex justify-center z-[900] pointer-events-none">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.3 }}
        className="flex items-end gap-1.5 px-3 pt-2 pb-1.5 pointer-events-auto relative dock-glass"
        style={{
          borderRadius: 22,
          background: containerBackground,
          boxShadow: tokens.dark
            ? '0 18px 46px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)'
            : '0 18px 46px rgba(0,0,0,0.22), 0 2px 10px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.85)',
          border: `1px solid ${tokens.border}`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMouseX(null)}
        ref={dockRef}
      >
        {/* Launchpad */}
        <div
          className="relative flex flex-col items-center"
          style={{ zIndex: launchpadHovered ? 40 : 1 }}
          ref={(el) => { itemRefs.current[0] = el; }}
          onMouseEnter={() => setLaunchpadHovered(true)}
          onMouseLeave={() => setLaunchpadHovered(false)}
        >
          <AnimatePresence>
            {launchpadHovered && (
              <DockTooltip
                label={t.appName.launchpad}
                tokens={tokens}
                offset={16 + (launchpadMagnify.scale - 1) * 26}
              />
            )}
          </AnimatePresence>
          <motion.button
            onClick={toggleLaunchpad}
            whileTap={{ scale: launchpadMagnify.scale * 0.94 }}
            animate={{ scale: launchpadMagnify.scale, y: launchpadMagnify.lift }}
            transition={{ type: 'spring', stiffness: 520, damping: 30, mass: 0.5 }}
            className="flex items-center justify-center"
            style={{
              width: ICON_SIZE,
              height: ICON_SIZE,
              borderRadius: 13,
              background: tile.background,
              boxShadow: tile.boxShadow,
              transformOrigin: 'bottom center',
            }}
            aria-label={t.appName.launchpad}
            title={t.appName.launchpad}
          >
            <LaunchpadIcon size={38} />
          </motion.button>
        </div>

        <div className="w-px h-9 mx-0.5 rounded-full" style={{ background: tokens.divider }} />

        {dockApps.map((app, i) => {
          const { scale, lift } = magnifyFor(centers[i + 1] ?? -1, mouseX);
          return (
            <div key={app.id} className="relative" ref={(el) => { itemRefs.current[i + 1] = el; }}>
              <DockIcon app={app} tokens={tokens} scale={scale} lift={lift} />
            </div>
          );
        })}

        <div className="w-px h-9 mx-0.5 rounded-full" style={{ background: tokens.divider }} />

        {/* Trash */}
        <DockIcon
          app={{ id: 'trash', name: 'Trash' }}
          tokens={tokens}
          scale={trashMagnify.scale}
          lift={trashMagnify.lift}
        />
      </motion.div>
    </div>
  );
};

export default Dock;
