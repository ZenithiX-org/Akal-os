'use client';

import React, { useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/lib/os-store';
import { shellTokens } from '@/lib/ui-tokens';
import type { AppWindow as AppWindowType } from '@/lib/os-types';

interface WindowProps {
  window: AppWindowType;
  children: React.ReactNode;
}

const MIN_W = 280;
const MIN_H = 200;
const MENU_BAR_H = 28;
const DOCK_H = 0;

type DragMode = 'move' | 'resize-se' | 'resize-s' | 'resize-e' | 'resize-sw' | 'resize-w' | 'resize-ne' | 'resize-nw' | null;

const Window: React.FC<WindowProps> = ({ window: win, children }) => {
  const { darkMode, accentColor, focusWindow, closeWindow, minimizeWindow, toggleMaximize, moveWindow, resizeWindow } = useOSStore();
  const tokens = shellTokens(darkMode, accentColor);
  const dragMode = useRef<DragMode>(null);
  const dragStart = useRef<{ x: number; y: number; w: number; h: number; wx: number; wy: number }>({ x: 0, y: 0, w: 0, h: 0, wx: 0, wy: 0 });
  const rafRef = useRef<number | null>(null);

  const startDrag = useCallback(
    (e: React.MouseEvent, mode: DragMode) => {
      if (win.isMaximized && mode !== 'move') return;
      e.preventDefault();
      e.stopPropagation();
      focusWindow(win.id);
      dragMode.current = mode;
      dragStart.current = { x: e.clientX, y: e.clientY, w: win.width, h: win.height, wx: win.x, wy: win.y };
    },
    [win.id, win.isMaximized, win.width, win.height, win.x, win.y, focusWindow]
  );

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!dragMode.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const mode = dragMode.current;
        if (!mode) return;
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        const { wx, wy, w, h } = dragStart.current;

        if (mode === 'move') {
          if (win.isMaximized) {
            toggleMaximize(win.id);
            const newX = Math.max(0, Math.min(e.clientX - w / 2, window.innerWidth - 100));
            const newY = Math.max(MENU_BAR_H, e.clientY - 15);
            moveWindow(win.id, newX, newY);
            dragStart.current = { x: e.clientX, y: e.clientY, w, h, wx: newX, wy: newY };
          } else {
            const newX = Math.max(-w + 80, Math.min(wx + dx, window.innerWidth - 80));
            const newY = Math.max(MENU_BAR_H, Math.min(wy + dy, window.innerHeight - 40));
            moveWindow(win.id, newX, newY);
          }
          return;
        }

        let newW = w;
        let newH = h;
        let newX = wx;
        let newY = wy;

        if (mode.includes('e')) newW = Math.max(MIN_W, w + dx);
        if (mode.includes('s')) newH = Math.max(MIN_H, h + dy);
        if (mode.includes('w')) {
          newW = Math.max(MIN_W, w - dx);
          newX = wx + (w - newW);
        }
        if (mode.includes('n')) {
          newH = Math.max(MIN_H, h - dy);
          newY = Math.max(MENU_BAR_H, wy + (h - newH));
        }

        const maxX = window.innerWidth - 80;
        const maxY = window.innerHeight - DOCK_H;
        if (newX + newW > maxX) newW = maxX - newX;
        if (newY + newH > maxY) newH = maxY - newY;

        resizeWindow(win.id, newW, newH, newX, newY);
      });
    };
    const handleUp = () => {
      dragMode.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [win.id, win.isMaximized, moveWindow, resizeWindow, toggleMaximize]);

  const style: React.CSSProperties = win.isMaximized
    ? { left: 0, top: MENU_BAR_H, width: '100vw', height: `calc(100vh - ${MENU_BAR_H}px)`, zIndex: win.zIndex }
    : { left: win.x, top: win.y, width: win.width, height: win.height, zIndex: win.zIndex };

  // Window chrome tokens — appearance aware, accent aware.
  const chrome = darkMode
    ? {
        bg: '#14141c',
        bgTitle: 'rgba(32,32,42,0.92)',
        border: '1px solid rgba(255,255,255,0.08)',
        titleColor: 'rgba(255,255,255,0.9)',
        titleColorInactive: 'rgba(255,255,255,0.45)',
        surfaceFocused: `0 30px 70px rgba(0,0,0,0.62), 0 2px 12px rgba(0,0,0,0.4), 0 0 0 1px ${tokens.accentSoft}, inset 0 1px 0 rgba(255,255,255,0.08)`,
        surfaceUnfocused: '0 18px 46px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)',
      }
    : {
        bg: '#111117',
        bgTitle: 'rgba(252,252,255,0.94)',
        border: '1px solid rgba(255,255,255,0.7)',
        titleColor: 'rgba(18,18,22,0.9)',
        titleColorInactive: 'rgba(18,18,22,0.45)',
        surfaceFocused: `0 30px 70px rgba(0,0,0,0.3), 0 2px 12px rgba(0,0,0,0.16), 0 0 0 1px ${tokens.accentSoft}, inset 0 1px 0 rgba(255,255,255,0.9)`,
        surfaceUnfocused: '0 18px 46px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7)',
      };

  const lights = [
    { key: 'close', gradient: 'linear-gradient(145deg, #ff6b5e, #e0443e)', glyph: '✕', title: 'Close', onClick: () => closeWindow(win.id) },
    { key: 'minimize', gradient: 'linear-gradient(145deg, #ffce4a, #e0a424)', glyph: '−', title: 'Minimize', onClick: () => minimizeWindow(win.id) },
    { key: 'zoom', gradient: 'linear-gradient(145deg, #4ade80, #1aab29)', glyph: '+', title: 'Maximize', onClick: () => toggleMaximize(win.id) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7, y: 260, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }}
      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
      className="absolute flex flex-col overflow-hidden"
      style={{
        ...style,
        borderRadius: win.isMaximized ? 0 : 14,
        background: chrome.bg,
        border: chrome.border,
        boxShadow: win.isFocused ? chrome.surfaceFocused : chrome.surfaceUnfocused,
      }}
      onMouseDown={() => focusWindow(win.id)}
    >
      {/* Title bar — traffic lights, centered title, drag surface */}
      <div
        className="flex items-center px-3.5 flex-shrink-0 select-none relative"
        style={{
          height: 34,
          background: chrome.bgTitle,
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          borderBottom: `1px solid ${darkMode ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.08)'}`,
          cursor: 'default',
        }}
        onMouseDown={(e) => startDrag(e, 'move')}
        onDoubleClick={() => toggleMaximize(win.id)}
      >
        {/* Traffic lights — dimmed when the window is inactive, glyphs on hover */}
        <div
          className="group flex items-center gap-2"
          onMouseDown={(e) => e.stopPropagation()}
          onDoubleClick={(e) => e.stopPropagation()}
        >
          {lights.map((light) => (
            <button
              key={light.key}
              onClick={light.onClick}
              className="relative w-3 h-3 rounded-full transition-transform hover:scale-110 flex items-center justify-center"
              style={{
                background: light.gradient,
                opacity: win.isFocused ? 1 : 0.6,
                boxShadow: '0.5px 0.5px 2px rgba(0,0,0,0.4), inset 0 0.5px 0 rgba(255,255,255,0.25)',
              }}
              aria-label={light.title}
              title={light.title}
            >
              <span
                className="opacity-0 group-hover:opacity-70 transition-opacity leading-none"
                style={{ fontSize: 8, fontWeight: 700, color: 'rgba(0,0,0,0.65)', marginTop: -0.5 }}
              >
                {light.glyph}
              </span>
            </button>
          ))}
        </div>

        {/* Centered title */}
        <div className="absolute left-0 right-0 flex justify-center items-center pointer-events-none px-20">
          <span
            className="truncate"
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.01em',
              color: win.isFocused ? chrome.titleColor : chrome.titleColorInactive,
              transition: 'color 150ms ease',
            }}
          >
            {win.title}
          </span>
        </div>
      </div>

      {/* Content — app internals are dark-glass by design, so this base stays dark */}
      <div className="flex-1 overflow-hidden relative" style={{ background: chrome.bg }}>
        {children}
      </div>

      {/* Resize handles */}
      {!win.isMaximized && (
        <>
          <div className="absolute top-0 left-2 right-2 h-1 cursor-ns-resize" onMouseDown={(e) => startDrag(e, 'resize-n')} />
          <div className="absolute bottom-0 left-2 right-2 h-1 cursor-ns-resize" onMouseDown={(e) => startDrag(e, 'resize-s')} />
          <div className="absolute left-0 top-2 bottom-2 w-1 cursor-ew-resize" onMouseDown={(e) => startDrag(e, 'resize-w')} />
          <div className="absolute right-0 top-2 bottom-2 w-1 cursor-ew-resize" onMouseDown={(e) => startDrag(e, 'resize-e')} />
          <div className="absolute top-0 left-0 w-2 h-2 cursor-nwse-resize" onMouseDown={(e) => startDrag(e, 'resize-nw')} />
          <div className="absolute top-0 right-0 w-2 h-2 cursor-nesw-resize" onMouseDown={(e) => startDrag(e, 'resize-ne')} />
          <div className="absolute bottom-0 left-0 w-2 h-2 cursor-nesw-resize" onMouseDown={(e) => startDrag(e, 'resize-sw')} />
          <div className="absolute bottom-0 right-0 w-2 h-2 cursor-nwse-resize" onMouseDown={(e) => startDrag(e, 'resize-se')} />
        </>
      )}
    </motion.div>
  );
};

export default Window;
