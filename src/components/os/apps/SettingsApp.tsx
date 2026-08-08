'use client';

import React, { useState } from 'react';
import { useOSStore, WALLPAPERS } from '@/lib/os-store';
import { useT, useLanguage } from '@/lib/use-i18n';
import type { Language } from '@/lib/i18n';
import Logo from '../Logo';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  cardBg: string;
  darkMode: boolean;
  textColor: string;
}

const Card: React.FC<CardProps> = ({ title, children, cardBg, darkMode, textColor }) => (
  <div className="rounded-xl overflow-hidden mb-4" style={{ background: cardBg, border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}>
    {title && <div className="px-4 py-2 text-xs font-semibold uppercase opacity-60" style={{ color: textColor, borderBottom: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.05)' }}>{title}</div>}
    {children}
  </div>
);

interface RowProps {
  label: string;
  children: React.ReactNode;
  last?: boolean;
  darkMode: boolean;
  textColor: string;
}

const Row: React.FC<RowProps> = ({ label, children, last, darkMode, textColor }) => (
  <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: last ? 'none' : darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.04)' }}>
    <span className="text-sm" style={{ color: textColor }}>{label}</span>
    {children}
  </div>
);

interface ToggleProps {
  on: boolean;
  onClick: () => void;
  darkMode: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ on, onClick, darkMode }) => (
  <button onClick={onClick} className="relative w-10 h-6 rounded-full transition-colors" style={{ background: on ? '#30D158' : (darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)') }}>
    <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform" style={{ transform: on ? 'translateX(18px)' : 'translateX(2px)' }} />
  </button>
);

interface LangPillProps {
  active: boolean;
  label: string;
  onClick: () => void;
  darkMode: boolean;
}

const LangPill: React.FC<LangPillProps> = ({ active, label, onClick, darkMode }) => (
  <button
    onClick={onClick}
    className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
    style={{
      background: active ? '#0071E3' : (darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'),
      color: active ? 'white' : (darkMode ? 'white' : 'black'),
      border: active ? '1px solid #0071E3' : (darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)'),
    }}
  >
    {label}
  </button>
);

const SettingsApp: React.FC = () => {
  const {
    darkMode, toggleDarkMode, wallpaper, setWallpaper,
    wifi, toggleWifi, bluetooth, toggleBluetooth,
    volume, setVolume, brightness, setBrightness,
    doNotDisturb, toggleDoNotDisturb, focusMode, toggleFocusMode,
    battery,
  } = useOSStore();

  const t = useT();
  const [language, setLanguage] = useLanguage();
  const [activeSection, setActiveSection] = useState('general');

  const textColor = darkMode ? '#ffffff' : '#1d1d1f';
  const bg = darkMode ? 'rgba(28,28,32,0.5)' : 'rgba(245,245,247,0.6)';
  const sidebarBg = darkMode ? 'rgba(44,44,46,0.45)' : 'rgba(232,232,237,0.5)';
  const subText = darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const cardBg = darkMode ? 'rgba(44,44,46,0.4)' : 'rgba(255,255,255,0.55)';

  const sections = [
    { id: 'general', name: t.settings.general, icon: '⚙️', color: '#636366' },
    { id: 'appearance', name: t.settings.appearance, icon: '🎨', color: '#0071E3' },
    { id: 'wallpaper', name: t.settings.wallpaper, icon: '🖼️', color: '#32ADE6' },
    { id: 'language', name: t.settings.language, icon: '🌐', color: '#5E5CE6' },
    { id: 'network', name: t.settings.network, icon: '📶', color: '#0071E3' },
    { id: 'sound', name: t.settings.sound, icon: '🔊', color: '#FC3C44' },
    { id: 'display', name: t.settings.display, icon: '🖥️', color: '#0071E3' },
    { id: 'battery', name: t.settings.battery, icon: '🔋', color: '#30D158' },
    { id: 'about', name: t.settings.about, icon: 'ℹ️', color: '#636366' },
  ];

  const cardProps = { cardBg, darkMode, textColor };
  const rowProps = { darkMode, textColor };

  return (
    <div className="flex h-full" style={{ background: bg, backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)', color: textColor }}>
      <div className="w-56 flex-shrink-0 p-2 overflow-y-auto" style={{ background: sidebarBg, backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)', borderRight: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)' }}>
        <div className="flex items-center gap-2 px-2 py-3 mb-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, #0071E3, #0055b3)' }}>👤</div>
          <div>
            <div className="text-sm font-semibold" style={{ color: textColor }}>{t.lock.user}</div>
            <div className="text-xs" style={{ color: subText }}>{t.settings.appleAccount}</div>
          </div>
        </div>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors mb-0.5"
            style={{ background: activeSection === s.id ? '#0071E3' : 'transparent', color: activeSection === s.id ? 'white' : textColor }}
          >
            <span className="w-6 h-6 rounded-md flex items-center justify-center text-sm" style={{ background: activeSection === s.id ? 'rgba(255,255,255,0.2)' : s.color + '22' }}>{s.icon}</span>
            {s.name}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeSection === 'general' && (
          <>
            <h1 className="text-xl font-bold mb-4" style={{ color: textColor }}>{t.settings.general}</h1>
            <Card title={t.settings.aboutTitle} {...cardProps}>
              <Row label={t.settings.name} {...rowProps}><span style={{ color: subText }}>{t.settings.name}</span></Row>
              <Row label={t.settings.osVersion} {...rowProps}><span style={{ color: subText }}>{t.settings.osVersion}</span></Row>
              <Row label={t.settings.chip} {...rowProps}><span style={{ color: subText }}>{t.settings.chip}</span></Row>
              <Row label={t.settings.memory} {...rowProps}><span style={{ color: subText }}>{t.settings.memory}</span></Row>
              <Row label={t.settings.startupDisk} {...rowProps}><span style={{ color: subText }}>{t.settings.startupDisk}</span></Row>
              <Row label={t.settings.serialNumber} last {...rowProps}><span style={{ color: subText }}>{t.settings.serialNumber}</span></Row>
            </Card>
            <Card title={t.settings.softwareUpdate} {...cardProps}>
              <Row label="Akal OS" {...rowProps}><span style={{ color: '#30D158' }}>{t.settings.upToDate}</span></Row>
              <Row label={t.settings.automaticUpdates} last {...rowProps}><Toggle on={true} onClick={() => {}} darkMode={darkMode} /></Row>
            </Card>
          </>
        )}

        {activeSection === 'appearance' && (
          <>
            <h1 className="text-xl font-bold mb-4" style={{ color: textColor }}>{t.settings.appearance}</h1>
            <Card title={t.settings.appearance} {...cardProps}>
              <Row label={t.settings.darkMode} {...rowProps}><Toggle on={darkMode} onClick={toggleDarkMode} darkMode={darkMode} /></Row>
              <Row label={t.settings.accentColor} last {...rowProps}>
                <div className="flex gap-2">
                  {['#0071E3', '#FF3B30', '#FF9500', '#FFD60A', '#30D158', '#BF5AF2', '#FF2D55'].map((c) => (
                    <button key={c} className="w-5 h-5 rounded-full border-2" style={{ background: c, borderColor: '#0071E3' === c ? 'white' : 'transparent' }} />
                  ))}
                </div>
              </Row>
            </Card>
          </>
        )}

        {activeSection === 'wallpaper' && (
          <>
            <h1 className="text-xl font-bold mb-4" style={{ color: textColor }}>{t.settings.wallpaper}</h1>
            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
              {WALLPAPERS.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setWallpaper(w.value)}
                  className="rounded-xl overflow-hidden h-24 relative transition-transform hover:scale-105"
                  style={{ background: w.value, border: wallpaper === w.value ? '3px solid #0071E3' : '2px solid transparent' }}
                >
                  <div className="absolute bottom-0 left-0 right-0 px-2 py-1 text-xs text-white font-medium" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.6))' }}>{w.name}</div>
                  {wallpaper === w.value && <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">✓</div>}
                </button>
              ))}
            </div>
          </>
        )}

        {activeSection === 'language' && (
          <>
            <h1 className="text-xl font-bold mb-4" style={{ color: textColor }}>{t.settings.language}</h1>
            <Card title={t.settings.language} {...cardProps}>
              <Row label={t.settings.languageDesc} last {...rowProps}>
                <div className="flex gap-2">
                  <LangPill active={language === 'en'} label={t.control.english} onClick={() => setLanguage('en' as Language)} darkMode={darkMode} />
                  <LangPill active={language === 'pa'} label={t.control.punjabi} onClick={() => setLanguage('pa' as Language)} darkMode={darkMode} />
                </div>
              </Row>
            </Card>
            <div className="text-xs opacity-50 px-2" style={{ color: subText }}>
              {language === 'pa' ? 'ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ। ਬਦਲਾਅ ਤੁਰੰਤ ਲਾਗੂ ਹੋ ਜਾਣਗੇ।' : 'Choose your preferred language. Changes apply instantly.'}
            </div>
          </>
        )}

        {activeSection === 'network' && (
          <>
            <h1 className="text-xl font-bold mb-4" style={{ color: textColor }}>{t.settings.network}</h1>
            <Card title={t.control.wifi} {...cardProps}>
              <Row label={t.control.wifi} {...rowProps}><Toggle on={wifi} onClick={toggleWifi} darkMode={darkMode} /></Row>
              {wifi && <Row label={t.settings.networkName} last {...rowProps}><span style={{ color: subText }}>{t.settings.networkName}</span></Row>}
            </Card>
            <Card title={t.control.bluetooth} {...cardProps}>
              <Row label={t.control.bluetooth} {...rowProps}><Toggle on={bluetooth} onClick={toggleBluetooth} darkMode={darkMode} /></Row>
              {bluetooth && <Row label={t.settings.devices} last {...rowProps}><span style={{ color: subText }}>{t.settings.devices}</span></Row>}
            </Card>
          </>
        )}

        {activeSection === 'sound' && (
          <>
            <h1 className="text-xl font-bold mb-4" style={{ color: textColor }}>{t.settings.sound}</h1>
            <Card title={t.settings.outputDevice} {...cardProps}>
              <Row label={t.control.sound} {...rowProps}>
                <div className="flex items-center gap-2 w-40">
                  <span className="text-sm">🔈</span>
                  <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="flex-1" style={{ accentColor: '#0071E3' }} />
                  <span className="text-xs w-8" style={{ color: subText }}>{volume}%</span>
                </div>
              </Row>
              <Row label={t.settings.outputDevice} last {...rowProps}><span style={{ color: subText }}>{t.settings.builtInSpeakers}</span></Row>
            </Card>
            <Card title={t.settings.focus} {...cardProps}>
              <Row label={t.control.doNotDisturb} {...rowProps}><Toggle on={doNotDisturb} onClick={toggleDoNotDisturb} darkMode={darkMode} /></Row>
              <Row label={t.settings.focusMode} last {...rowProps}><Toggle on={focusMode} onClick={toggleFocusMode} darkMode={darkMode} /></Row>
            </Card>
          </>
        )}

        {activeSection === 'display' && (
          <>
            <h1 className="text-xl font-bold mb-4" style={{ color: textColor }}>{t.settings.display}</h1>
            <Card title={t.settings.brightness} {...cardProps}>
              <Row label={t.settings.brightness} {...rowProps}>
                <div className="flex items-center gap-2 w-40">
                  <span className="text-sm">☀️</span>
                  <input type="range" min="0" max="100" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="flex-1" style={{ accentColor: '#0071E3' }} />
                  <span className="text-xs w-8" style={{ color: subText }}>{brightness}%</span>
                </div>
              </Row>
              <Row label={t.settings.trueTone} last {...rowProps}><Toggle on={true} onClick={() => {}} darkMode={darkMode} /></Row>
            </Card>
            <Card title={t.settings.resolution} {...cardProps}>
              <Row label={t.settings.default} {...rowProps}><span style={{ color: subText }}>2560 × 1600 (Retina)</span></Row>
              <Row label={t.settings.refreshRate} last {...rowProps}><span style={{ color: subText }}>60 Hz</span></Row>
            </Card>
          </>
        )}

        {activeSection === 'battery' && (
          <>
            <h1 className="text-xl font-bold mb-4" style={{ color: textColor }}>{t.settings.battery}</h1>
            <Card title="Battery Health" {...cardProps}>
              <Row label={t.settings.chargeLevel} {...rowProps}><span style={{ color: '#30D158' }}>{battery}%</span></Row>
              <Row label={t.settings.condition} {...rowProps}><span style={{ color: '#30D158' }}>{t.settings.normal}</span></Row>
              <Row label={t.settings.cycleCount} last {...rowProps}><span style={{ color: subText }}>42</span></Row>
            </Card>
            <Card title="Power Mode" {...cardProps}>
              <Row label={t.settings.lowPowerMode} {...rowProps}><Toggle on={false} onClick={() => {}} darkMode={darkMode} /></Row>
              <Row label={t.settings.optimizedCharging} last {...rowProps}><Toggle on={true} onClick={() => {}} darkMode={darkMode} /></Row>
            </Card>
          </>
        )}

        {activeSection === 'about' && (
          <>
            <h1 className="text-xl font-bold mb-4" style={{ color: textColor }}>{t.settings.about}</h1>
            <div className="flex flex-col items-center text-center py-8">
              <div className="mb-4 select-none" style={{ filter: 'drop-shadow(0 0 20px rgba(0,113,227,0.3))' }}>
                <Logo size={72} color={darkMode ? '#fff' : '#000'} />
              </div>
              <h2 className="text-2xl font-bold mb-1" style={{ color: textColor }}>Akal OS</h2>
              <p className="text-sm mb-6" style={{ color: subText }}>{t.settings.version}</p>
              <p className="text-sm max-w-md leading-relaxed mb-6" style={{ color: subText }}>{t.settings.aboutText}</p>
              <div className="flex gap-3">
                <div className="px-4 py-2 rounded-lg text-sm" style={{ background: cardBg, color: textColor }}>{t.settings.rights}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsApp;
