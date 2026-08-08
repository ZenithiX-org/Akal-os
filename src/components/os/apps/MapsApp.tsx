'use client';

import React from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

const MapsApp: React.FC = () => {
  const { darkMode } = useOSStore();
  const t = useT();
  return (
    <div className="relative h-full" style={{ background: darkMode ? '#1c1c1e' : '#e8e8ed' }}>
      {/* Grid background simulating map */}
      <div className="absolute inset-0 grid" style={{ gridTemplateColumns: 'repeat(8, 1fr)', gridTemplateRows: 'repeat(6, 1fr)' }}>
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="border" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', background: i % 7 === 0 ? (darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)') : 'transparent' }} />
        ))}
      </div>

      {/* Map elements - roads */}
      <div className="absolute inset-0">
        <div className="absolute" style={{ top: '40%', left: '30%', width: '40%', height: '8px', background: darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)', borderRadius: '4px', transform: 'rotate(-5deg)' }} />
        <div className="absolute" style={{ top: '30%', left: '20%', width: '60%', height: '6px', background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', borderRadius: '3px', transform: 'rotate(15deg)' }} />
        <div className="absolute" style={{ top: '60%', left: '40%', width: '30%', height: '5px', background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', borderRadius: '3px' }} />
        {/* Water - representing a sarovar (holy pool) near Golden Temple */}
        <div className="absolute" style={{ bottom: '15%', right: '15%', width: '22%', height: '20%', background: darkMode ? 'rgba(100,150,255,0.2)' : 'rgba(100,150,255,0.25)', borderRadius: '50% 50% 45% 55%', border: '1px solid rgba(100,150,255,0.3)' }} />
        {/* Parks / green areas */}
        <div className="absolute" style={{ top: '15%', left: '10%', width: '15%', height: '15%', background: darkMode ? 'rgba(48,209,88,0.15)' : 'rgba(48,209,88,0.2)', borderRadius: '20%' }} />
        <div className="absolute" style={{ top: '65%', left: '8%', width: '12%', height: '12%', background: darkMode ? 'rgba(48,209,88,0.15)' : 'rgba(48,209,88,0.2)', borderRadius: '20%' }} />
        {/* Golden Temple location pin */}
        <div className="absolute flex flex-col items-center" style={{ top: '32%', left: '50%', transform: 'translate(-50%, -100%)' }}>
          <div className="px-2 py-1 rounded-lg text-white text-[10px] font-semibold mb-1 shadow-xl" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}>🛕 ਹਰਿਮੰਦਰ ਸਾਹਿਬ</div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-xl animate-bounce" style={{ background: 'linear-gradient(135deg, #FFD700, #FF9500)', boxShadow: '0 8px 20px rgba(255,215,0,0.5)' }}>🛕</div>
          <div className="w-2 h-3 rounded-b-full" style={{ background: '#FF9500' }} />
        </div>
      </div>

      {/* Search bar */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl" style={{ background: darkMode ? 'rgba(44,44,46,0.6)' : 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', border: darkMode ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.6)', boxShadow: darkMode ? '0 12px 40px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)' : '0 12px 40px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.8)' }}>
          <svg className="w-4 h-4 opacity-50" fill="currentColor" style={{ color: darkMode ? 'white' : 'black' }} viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
          <input placeholder={t.maps.searchMaps} className="flex-1 bg-transparent outline-none text-sm" style={{ color: darkMode ? 'white' : 'black' }} />
        </div>
      </div>

      {/* Map controls */}
      <div className="absolute bottom-6 right-4 flex flex-col gap-2">
        {['📍', '+', '−', '🧭'].map((btn, i) => (
          <button key={i} className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg text-sm" style={{ background: darkMode ? 'rgba(44,44,46,0.6)' : 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', color: darkMode ? 'white' : 'black', border: darkMode ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.6)' }}>{btn}</button>
        ))}
      </div>

      {/* Info card */}
      <div className="absolute bottom-6 left-4 w-64 rounded-2xl p-4 shadow-xl" style={{ background: darkMode ? 'rgba(44,44,46,0.6)' : 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', border: darkMode ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.6)' }}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, #FFD700, #FF9500)' }}>🛕</div>
          <div className="flex-1">
            <div className="font-semibold text-sm" style={{ color: darkMode ? 'white' : 'black' }}>{t.maps.currentLocation}</div>
            <div className="text-xs opacity-60" style={{ color: darkMode ? 'white' : 'black' }}>Sri Harmandir Sahib, {t.maps.state}</div>
            <div className="text-xs opacity-60 mt-1" style={{ color: darkMode ? 'white' : 'black' }}>{t.maps.coords}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsApp;
