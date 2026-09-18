'use client';

import React, { useState } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

const ACCENT = '#d70a53';

const FaceTimeApp: React.FC = () => {
  const { darkMode } = useOSStore();
  void darkMode;
  const t = useT();
  const [calling, setCalling] = useState(false);
  const textColor = '#ffffff';
  const subText = 'rgba(255,255,255,0.55)';

  const contacts = t.facetime.contacts.map((c, i) => ({
    name: c.name,
    icon: ['👩', '🧑', '👧', '👥'][i] || '👤',
    color: ['#FF2D55', '#FF9F0A', '#BF5AF2', '#30D158'][i] || '#636366',
  }));

  return (
    <div className="flex h-full glass-surface" style={{ borderRadius: 0 }}>
      {/* Contacts sidebar */}
      <div className="glass-sidebar w-56 flex-shrink-0 p-3 space-y-3 overflow-y-auto">
        <div className="glass-input flex items-center gap-2 !rounded-xl" style={{ padding: '4px 10px' }}>
          <svg className="w-3.5 h-3.5 opacity-60" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
          <input placeholder={t.common.search} className="bg-transparent outline-none text-xs flex-1" style={{ color: textColor }} />
        </div>
        <div className="text-xs font-semibold" style={{ color: subText }}>{t.facetime.recent}</div>
        {contacts.map((contact) => (
          <button key={contact.name} onClick={() => setCalling(true)} className="glass-card w-full flex items-center gap-2 p-2 !rounded-xl" style={{ background: 'transparent', borderColor: 'transparent' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: contact.color + '33' }}>{contact.icon}</div>
            <div className="text-left">
              <div className="text-sm font-medium" style={{ color: textColor }}>{contact.name}</div>
              <div className="text-xs" style={{ color: '#30D158' }}>{t.facetime.videoYesterday}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Call view */}
      <div className="glass-surface flex-1 flex flex-col items-center justify-center" style={{ background: 'rgba(0,0,0,0.65)', borderRadius: 0 }}>
        {!calling ? (
          <div className="text-center text-white">
            <div className="text-6xl mb-4">📹</div>
            <div className="text-xl font-semibold mb-2">{t.facetime.title}</div>
            <div className="text-sm mb-6" style={{ color: subText }}>{t.facetime.selectContact}</div>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setCalling(true)} className="glass-btn flex items-center gap-2 !rounded-full" style={{ background: '#30D158', borderColor: '#30D158', color: 'white' }}>
                {t.facetime.newFaceTime}
              </button>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-32 h-32 rounded-full flex items-center justify-center text-6xl mb-4 mx-auto" style={{ background: ACCENT }}>👩</div>
              <div className="text-xl font-semibold">{contacts[0]?.name}</div>
              <div className="text-sm animate-pulse" style={{ color: 'rgba(255,255,255,0.7)' }}>{t.facetime.calling}</div>
            </div>
            <div className="absolute bottom-8 flex gap-4 justify-center w-full">
              {[
                { icon: '🎤', label: t.facetime.mute },
                { icon: '📷', label: t.facetime.camera },
                { icon: '🔊', label: t.facetime.speaker },
              ].map((btn) => (
                <button key={btn.label} className="flex flex-col items-center gap-1">
                  <div className="glass-btn w-12 h-12 !rounded-full !p-0 flex items-center justify-center text-xl">{btn.icon}</div>
                  <span className="text-xs text-white" style={{ color: 'rgba(255,255,255,0.7)' }}>{btn.label}</span>
                </button>
              ))}
              <button onClick={() => setCalling(false)} className="flex flex-col items-center gap-1">
                <div className="glass-btn w-12 h-12 !rounded-full !p-0 flex items-center justify-center" style={{ background: '#FF3B30', borderColor: '#FF3B30' }}>
                  <span className="text-white font-bold text-lg">✕</span>
                </div>
                <span className="text-xs text-white" style={{ color: 'rgba(255,255,255,0.7)' }}>{t.facetime.end}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceTimeApp;
