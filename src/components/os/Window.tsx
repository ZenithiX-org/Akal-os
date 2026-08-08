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
const DOCK_H = 80;

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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 10 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="absolute flex flex-col rounded-xl overflow-hidden"
      style={{
        ...style,
        background: darkMode ? 'rgba(28,28,32,0.7)' : 'rgba(245,245,247,0.72)',
        backdropFilter: 'blur(40px) saturate(200%)',
        WebkitBackdropFilter: 'blur(40px) saturate(200%)',
        border: darkMode ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.6)',
        boxShadow: win.isFocused
          ? darkMode
            ? '0 35px 80px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.1), inset 0 1px 1px rgba(255,255,255,0.12)'
            : '0 35px 80px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.9)'
          : darkMode
            ? '0 20px 50px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.06), inset 0 1px 1px rgba(255,255,255,0.08)'
            : '0 20px 50px rgba(0,0,0,0.2), 0 0 0 0.5px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.7)',
      }}
      onMouseDown={() => focusWindow(win.id)}
    >
      {/* Title bar */}
      <div
        className="flex items-center px-3 h-9 flex-shrink-0 select-none relative"
        style={{
          background: darkMode ? 'rgba(40,40,44,0.5)' : 'rgba(230,230,235,0.5)',
          borderBottom: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)',
          cursor: 'default',
        }}
        onMouseDown={(e) => startDrag(e, 'move')}
        onDoubleClick={() => toggleMaximize(win.id)}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-2 group" onMouseDown={(e) => e.stopPropagation()}>
          <button
            onClick={() => closeWindow(win.id)}
            className="w-3 h-3 rounded-full flex items-center justify-center transition-all"
            style={{ background: '#FF5F57', border: '0.5px solid #E0443E' }}
            title="Close"
          >
            <svg className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 10 10">
              <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="#4d0000" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={() => minimizeWindow(win.id)}
            className="w-3 h-3 rounded-full flex items-center justify-center transition-all"
            style={{ background: '#FEBC2E', border: '0.5px solid #D89E24' }}
            title="Minimize"
          >
            <svg className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 10 10">
              <path d="M2 5H8" stroke="#5d4500" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={() => toggleMaximize(win.id)}
            className="w-3 h-3 rounded-full flex items-center justify-center transition-all"
            style={{ background: '#28C840', border: '0.5px solid #1AAB29' }}
            title="Maximize"
          >
            <svg className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 10 10">
              <path d="M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5" stroke="#003d00" strokeWidth="0.8" strokeLinecap="round" fill="none" />
            </svg>
          </button>
        </div>

        {/* Title */}
        <div
          className="absolute left-0 right-0 text-center text-xs font-semibold pointer-events-none truncate px-20"
          style={{ color: darkMode ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)' }}
        >
          {win.title}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative" style={{ background: darkMode ? '#1c1c1e' : '#ffffff' }}>
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
