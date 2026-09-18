'use client';

import React, { useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/lib/os-store';
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
  const { darkMode, focusWindow, closeWindow, minimizeWindow, toggleMaximize, moveWindow, resizeWindow } = useOSStore();
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

  void minimizeWindow;

  // Neomorphic color tokens that respond to darkMode
  const neo = darkMode
    ? {
        bg: '#1e1e28',
        bgTitle: '#1a1a24',
        shadow: 'inset 0 -1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)',
        surface: '12px 12px 30px rgba(0,0,0,0.6), -6px -6px 20px rgba(255,255,255,0.025), inset 0 1px 0 rgba(255,255,255,0.06)',
        surfaceFocused: '12px 12px 30px rgba(0,0,0,0.6), -6px -6px 20px rgba(255,255,255,0.025), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(215,10,83,0.12)',
        surfaceUnfocused: '10px 10px 28px rgba(0,0,0,0.5), -5px -5px 18px rgba(255,255,255,0.02), inset 0 1px 0 rgba(255,255,255,0.04)',
        titleColor: 'rgba(255,255,255,0.88)',
      }
    : {
        bg: '#e8e8ee',
        bgTitle: '#dcdce4',
        shadow: 'inset 0 -1px 2px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
        surface: '10px 10px 28px rgba(0,0,0,0.12), -6px -6px 20px rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,0.5)',
        surfaceFocused: '10px 10px 28px rgba(0,0,0,0.12), -6px -6px 20px rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,0.5), 0 0 0 1px rgba(215,10,83,0.15)',
        surfaceUnfocused: '8px 8px 24px rgba(0,0,0,0.1), -5px -5px 18px rgba(255,255,255,0.8), inset 0 1px 0 rgba(255,255,255,0.4)',
        titleColor: 'rgba(0,0,0,0.78)',
      };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 6 }}
      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
      className="absolute flex flex-col rounded-2xl overflow-hidden"
      style={{
        ...style,
        background: neo.bg,
        boxShadow: win.isFocused ? neo.surfaceFocused : neo.surfaceUnfocused,
      }}
      onMouseDown={() => focusWindow(win.id)}
    >
      {/* Title bar — refined, quieter. Traffic lights + centered title. */}
      <div
        className="flex items-center px-3.5 h-9 flex-shrink-0 select-none relative"
        style={{
          background: neo.bgTitle,
          boxShadow: neo.shadow,
          cursor: 'default',
        }}
        onMouseDown={(e) => startDrag(e, 'move')}
        onDoubleClick={() => toggleMaximize(win.id)}
      >
        {/* Traffic lights — slightly smaller, more refined */}
        <div className="flex items-center gap-2" onMouseDown={(e) => e.stopPropagation()}>
          <button
            onClick={() => closeWindow(win.id)}
            className="w-3 h-3 rounded-full transition-transform hover:scale-110"
            style={{
              background: 'linear-gradient(145deg, #ff6b5e, #e0443e)',
              boxShadow: '0.5px 0.5px 2px rgba(0,0,0,0.4), inset 0 0.5px 0 rgba(255,255,255,0.25)',
            }}
            title="Close"
          />
          <button
            onClick={() => minimizeWindow(win.id)}
            className="w-3 h-3 rounded-full transition-transform hover:scale-110"
            style={{
              background: 'linear-gradient(145deg, #ffce4a, #e0a424)',
              boxShadow: '0.5px 0.5px 2px rgba(0,0,0,0.4), inset 0 0.5px 0 rgba(255,255,255,0.25)',
            }}
            title="Minimize"
          />
          <button
            onClick={() => toggleMaximize(win.id)}
            className="w-3 h-3 rounded-full transition-transform hover:scale-110"
            style={{
              background: 'linear-gradient(145deg, #4ade80, #1aab29)',
              boxShadow: '0.5px 0.5px 2px rgba(0,0,0,0.4), inset 0 0.5px 0 rgba(255,255,255,0.25)',
            }}
            title="Maximize"
          />
        </div>

        {/* Centered title — lighter weight, slightly smaller, more refined */}
        <div className="absolute left-0 right-0 flex justify-center items-center pointer-events-none px-20">
          <span className="text-[12px] font-medium truncate" style={{ color: neo.titleColor, letterSpacing: '0.01em' }}>
            {win.title}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative" style={{ background: neo.bg }}>
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
