'use client';

import React, { useState } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

const TrashApp: React.FC = () => {
  const { darkMode } = useOSStore();
  const t = useT();
  const [items, setItems] = useState(t.trash.items);

  const bg = darkMode ? 'rgba(28,28,32,0.5)' : 'rgba(245,245,247,0.6)';
  const textColor = darkMode ? '#ffffff' : '#1d1d1f';
  const sidebarBg = darkMode ? 'rgba(44,44,46,0.45)' : 'rgba(232,232,237,0.5)';

  return (
    <div className="flex flex-col h-full" style={{ background: bg, backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)', color: textColor }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ background: sidebarBg, backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)', borderBottom: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)' }}>
        <h2 className="font-semibold">{t.trash.title}</h2>
        <button onClick={() => setItems([])} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: '#FF3B30', color: 'white' }}>{t.trash.emptyTrash}</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <span className="text-8xl mb-4">🗑️</span>
            <p className="text-lg font-medium opacity-50" style={{ color: textColor }}>{t.trash.empty}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)', border: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.03)' }}>
                <span className="text-2xl">{item.name.endsWith('.png') ? '🖼️' : item.name.endsWith('.zip') ? '🗜️' : item.name.endsWith('.docx') ? '📄' : '📁'}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium" style={{ color: textColor }}>{item.name}</div>
                  <div className="text-xs opacity-50" style={{ color: textColor }}>{item.size} · {item.date}</div>
                </div>
                <button onClick={() => setItems((prev) => prev.filter((_, j) => j !== i))} className="text-sm opacity-50 hover:opacity-100 hover:text-red-400 transition-colors">✕</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrashApp;
