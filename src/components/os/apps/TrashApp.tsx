'use client';

import React, { useState } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

const TrashApp: React.FC = () => {
  const { darkMode } = useOSStore();
  void darkMode;
  const t = useT();
  const [items, setItems] = useState(t.trash.items);

  const textColor = '#ffffff';
  const subText = 'rgba(255,255,255,0.55)';

  return (
    <div className="glass-surface flex flex-col h-full" style={{ color: textColor, borderRadius: 0 }}>
      {/* Header */}
      <div className="glass-topbar flex items-center justify-between px-4 py-3 flex-shrink-0">
        <h2 className="font-semibold">{t.trash.title}</h2>
        <button
          onClick={() => setItems([])}
          className="glass-btn !rounded-lg !text-xs"
          style={{ background: '#FF3B30', borderColor: '#FF3B30', color: 'white' }}
        >
          {t.trash.emptyTrash}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="glass-card flex flex-col items-center justify-center h-full text-center p-8">
            <span className="text-8xl mb-4">🗑️</span>
            <p className="text-lg font-medium" style={{ color: subText }}>{t.trash.empty}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item, i) => (
              <div key={i} className="glass-card flex items-center gap-3 p-3 !rounded-xl">
                <span className="text-2xl">{item.name.endsWith('.png') ? '🖼️' : item.name.endsWith('.zip') ? '🗜️' : item.name.endsWith('.docx') ? '📄' : '📁'}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium" style={{ color: textColor }}>{item.name}</div>
                  <div className="text-xs" style={{ color: subText }}>{item.size} · {item.date}</div>
                </div>
                <button
                  onClick={() => setItems((prev) => prev.filter((_, j) => j !== i))}
                  className="glass-btn !p-1.5 !rounded-lg text-sm"
                  style={{ background: 'transparent', borderColor: 'transparent', color: subText }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrashApp;
