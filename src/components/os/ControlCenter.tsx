'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/lib/os-store';
import { useT, useLanguage } from '@/lib/use-i18n';
import type { Language } from '@/lib/i18n';

interface ToggleButtonProps {
  active: boolean;
  label: string;
  icon: string;
  onClick: () => void;
  color?: string;
  darkMode: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ active, label, icon, onClick, color = '#0071E3', darkMode }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-start p-3 rounded-xl transition-all duration-200 w-full"
    style={{
      background: active ? color : darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      color: active ? 'white' : darkMode ? 'white' : 'black',
      border: active ? `1px solid ${color}` : darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.04)',
      backdropFilter: 'blur(20px)',
    }}
  >
    <span className="text-lg mb-1">{icon}</span>
    <span className="text-xs font-semibold leading-tight">{label}</span>
    <span className="text-xs opacity-70">{active ? 'On' : 'Off'}</span>
  </button>
);

interface SliderControlProps {
  icon: string;
  value: number;
  onChange: (v: number) => void;
  label: string;
  darkMode: boolean;
}

const SliderControl: React.FC<SliderControlProps> = ({ icon, value, onChange, label, darkMode }) => (
  <div className="relative flex items-center gap-3 p-3 rounded-xl overflow-hidden" style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.04)' }}>
    <div className="absolute inset-y-0 left-0 rounded-xl opacity-25" style={{ width: `${value}%`, background: 'white' }} />
    <span className="relative text-base z-10">{icon}</span>
    <div className="relative flex-1 z-10">
      <div className="text-xs font-medium mb-1.5" style={{ color: darkMode ? 'white' : 'black' }}>{label}</div>
      <input type="range" min="0" max="100" value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" style={{ accentColor: '#0071E3' }} />
    </div>
    <span className="relative text-xs font-medium z-10" style={{ color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }}>{value}%</span>
  </div>
);

interface LangButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
  darkMode: boolean;
}

const LangButton: React.FC<LangButtonProps> = ({ active, label, onClick, darkMode }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-2.5 rounded-xl transition-all duration-200 w-full"
    style={{
      background: active ? '#0071E3' : darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
      color: active ? 'white' : darkMode ? 'white' : 'black',
      border: active ? '1px solid #0071E3' : darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.04)',
    }}
  >
    <span className="text-sm font-semibold leading-tight">{label}</span>
  </button>
);

const ControlCenter: React.FC = () => {
  const {
    controlCenterOpen,
    toggleControlCenter,
    darkMode,
    toggleDarkMode,
    wifi,
    toggleWifi,
    bluetooth,
    toggleBluetooth,
    volume,
    setVolume,
    brightness,
    setBrightness,
    doNotDisturb,
    toggleDoNotDisturb,
    focusMode,
    toggleFocusMode,
    airplayEnabled,
    toggleAirplay,
    battery,
  } = useOSStore();

  const t = useT();
  const [language, setLanguage] = useLanguage();

  return (
    <AnimatePresence>
      {controlCenterOpen && (
        <>
          <div className="fixed inset-0 z-[9000]" onClick={toggleControlCenter} />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-8 right-2 z-[9001] w-80 rounded-2xl p-3 space-y-2 glass-surface"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-2 gap-2">
              {/* Connectivity card */}
              <div className="rounded-xl p-3 space-y-2" style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.04)' }}>
                <button onClick={toggleWifi} className="flex items-center gap-2 w-full">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: wifi ? '#0071E3' : darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)', color: wifi ? 'white' : darkMode ? 'white' : 'black', boxShadow: wifi ? '0 2px 8px rgba(0,113,227,0.4)' : 'none' }}>📶</div>
                  <div className="text-left">
                    <div className="text-xs font-semibold" style={{ color: darkMode ? 'white' : 'black' }}>{t.control.wifi}</div>
                    <div className="text-xs opacity-60" style={{ color: darkMode ? 'white' : 'black' }}>{wifi ? t.control.wifiNetwork : t.control.off}</div>
                  </div>
                </button>
                <button onClick={toggleBluetooth} className="flex items-center gap-2 w-full">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: bluetooth ? '#0071E3' : darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)', color: bluetooth ? 'white' : darkMode ? 'white' : 'black', boxShadow: bluetooth ? '0 2px 8px rgba(0,113,227,0.4)' : 'none' }}>🔵</div>
                  <div className="text-left">
                    <div className="text-xs font-semibold" style={{ color: darkMode ? 'white' : 'black' }}>{t.control.bluetooth}</div>
                    <div className="text-xs opacity-60" style={{ color: darkMode ? 'white' : 'black' }}>{bluetooth ? t.control.on : t.control.off}</div>
                  </div>
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: '#0071E3', color: 'white', boxShadow: '0 2px 8px rgba(0,113,227,0.4)' }}>📡</div>
                  <div>
                    <div className="text-xs font-semibold" style={{ color: darkMode ? 'white' : 'black' }}>{t.control.airdrop}</div>
                    <div className="text-xs opacity-60" style={{ color: darkMode ? 'white' : 'black' }}>{t.control.contactsOnly}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <ToggleButton active={doNotDisturb} label={t.control.doNotDisturb} icon="🌙" onClick={toggleDoNotDisturb} color="#5E5CE6" darkMode={darkMode} />
                <ToggleButton active={focusMode} label={t.control.focus} icon="🎯" onClick={toggleFocusMode} color="#32ADE6" darkMode={darkMode} />
              </div>
            </div>

            <SliderControl icon="☀️" value={brightness} onChange={setBrightness} label={t.control.display} darkMode={darkMode} />
            <SliderControl icon="🔊" value={volume} onChange={setVolume} label={t.control.sound} darkMode={darkMode} />

            <div className="grid grid-cols-3 gap-2">
              <ToggleButton active={darkMode} label={t.control.darkMode} icon="🌑" onClick={toggleDarkMode} darkMode={darkMode} />
              <ToggleButton active={true} label={t.control.nightShift} icon="🌅" onClick={() => {}} color="#FF9F0A" darkMode={darkMode} />
              <ToggleButton active={airplayEnabled} label={t.control.airplay} icon="📺" onClick={toggleAirplay} color="#32ADE6" darkMode={darkMode} />
            </div>

            {/* Language selector */}
            <div className="rounded-xl p-3" style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.04)' }}>
              <div className="text-xs font-semibold mb-2 flex items-center gap-2" style={{ color: darkMode ? 'white' : 'black' }}>
                <span>🌐</span>
                <span>{t.control.language}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <LangButton active={language === 'en'} label={t.control.english} onClick={() => setLanguage('en' as Language)} darkMode={darkMode} />
                <LangButton active={language === 'pa'} label={t.control.punjabi} onClick={() => setLanguage('pa' as Language)} darkMode={darkMode} />
              </div>
            </div>

            {/* Battery */}
            <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-2">
                <span className="text-base">🔋</span>
                <span className="text-sm font-medium" style={{ color: darkMode ? 'white' : 'black' }}>{t.control.battery}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2.5 rounded-full overflow-hidden" style={{ background: darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)' }}>
                  <div className="h-full rounded-full" style={{ width: `${battery}%`, background: battery > 20 ? '#30D158' : '#FF3B30', boxShadow: '0 0 8px rgba(48,209,88,0.4)' }} />
                </div>
                <span className="text-xs font-medium" style={{ color: darkMode ? 'white' : 'black' }}>{battery}%</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ControlCenter;
