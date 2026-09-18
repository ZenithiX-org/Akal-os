'use client';

import React, { useState } from 'react';
import { useOSStore, WALLPAPERS } from '@/lib/os-store';
import { useT, useLanguage } from '@/lib/use-i18n';
import type { Language } from '@/lib/i18n';
import Logo from '../Logo';

const ACCENT = '#d70a53';
const ACCENT_SOFT = 'rgba(215, 10, 83, 0.18)';

interface CardProps {
  title?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => (
  <div className="glass-card mb-4 overflow-hidden">
    {title && (
      <div
        className="px-4 py-2 text-xs font-semibold uppercase tracking-wide"
        style={{ color: 'rgba(255,255,255,0.55)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {title}
      </div>
    )}
    {children}
  </div>
);

interface RowProps {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}

const Row: React.FC<RowProps> = ({ label, children, last }) => (
  <div
    className="flex items-center justify-between px-4 py-3"
    style={{ borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.06)' }}
  >
    <span className="text-sm text-white">{label}</span>
    {children}
  </div>
);

interface ToggleProps {
  on: boolean;
  onClick: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ on, onClick }) => (
  <button
    onClick={onClick}
    className="relative w-10 h-6 rounded-full transition-colors"
    style={{
      background: on ? ACCENT : 'rgba(255,255,255,0.2)',
      boxShadow: on ? '0 0 12px rgba(215,10,83,0.4)' : 'none',
    }}
  >
    <div
      className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform"
      style={{ transform: on ? 'translateX(18px)' : 'translateX(2px)' }}
    />
  </button>
);

interface LangPillProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

const LangPill: React.FC<LangPillProps> = ({ active, label, onClick }) => (
  <button onClick={onClick} className={`glass-pill ${active ? 'active' : ''}`}>
    {label}
  </button>
);

const SettingsApp: React.FC = () => {
  const {
    darkMode, toggleDarkMode, wallpaper, setWallpaper,
    wifi, toggleWifi, bluetooth, toggleBluetooth,
    volume, setVolume, brightness, setBrightness,
    doNotDisturb, toggleDoNotDisturb, focusMode, toggleFocusMode,
    battery, accentColor, setAccentColor,
  } = useOSStore();
  void darkMode;

  const t = useT();
  const [language, setLanguage] = useLanguage();
  const [activeSection, setActiveSection] = useState('general');

  const subText = 'rgba(255,255,255,0.5)';

  const sections = [
    { id: 'general', name: t.settings.general, icon: '⚙️', color: '#636366' },
    { id: 'appearance', name: t.settings.appearance, icon: '🎨', color: ACCENT },
    { id: 'wallpaper', name: t.settings.wallpaper, icon: '🖼️', color: '#32ADE6' },
    { id: 'language', name: t.settings.language, icon: '🌐', color: '#5E5CE6' },
    { id: 'network', name: t.settings.network, icon: '📶', color: ACCENT },
    { id: 'sound', name: t.settings.sound, icon: '🔊', color: '#FC3C44' },
    { id: 'display', name: t.settings.display, icon: '🖥️', color: ACCENT },
    { id: 'battery', name: t.settings.battery, icon: '🔋', color: '#30D158' },
    { id: 'about', name: t.settings.about, icon: 'ℹ️', color: '#636366' },
  ];

  return (
    <div className="glass-surface flex h-full" style={{ color: '#fff', borderRadius: 0 }}>
      <div className="glass-sidebar w-56 flex-shrink-0 overflow-y-auto p-2">
        <div className="flex items-center gap-2 px-2 py-3 mb-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{ background: `linear-gradient(135deg, ${ACCENT}, #9141ac)` }}
          >
            👤
          </div>
          <div>
            <div className="text-sm font-semibold text-white">{t.lock.user}</div>
            <div className="text-xs" style={{ color: subText }}>{t.settings.appleAccount}</div>
          </div>
        </div>
        {sections.map((s) => {
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors mb-0.5 relative"
              style={{
                background: isActive ? ACCENT_SOFT : 'transparent',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.85)',
                borderLeft: isActive ? `3px solid ${ACCENT}` : '3px solid transparent',
              }}
            >
              <span
                className="w-6 h-6 rounded-md flex items-center justify-center text-sm"
                style={{ background: isActive ? 'rgba(255,255,255,0.2)' : s.color + '22' }}
              >
                {s.icon}
              </span>
              {s.name}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeSection === 'general' && (
          <>
            <h1 className="text-xl font-bold mb-4 text-white">{t.settings.general}</h1>
            <Card title={t.settings.aboutTitle}>
              <Row label={t.settings.name}><span style={{ color: subText }}>{t.settings.name}</span></Row>
              <Row label={t.settings.osVersion}><span style={{ color: subText }}>{t.settings.osVersion}</span></Row>
              <Row label={t.settings.chip}><span style={{ color: subText }}>{t.settings.chip}</span></Row>
              <Row label={t.settings.memory}><span style={{ color: subText }}>{t.settings.memory}</span></Row>
              <Row label={t.settings.startupDisk}><span style={{ color: subText }}>{t.settings.startupDisk}</span></Row>
              <Row label={t.settings.serialNumber} last><span style={{ color: subText }}>{t.settings.serialNumber}</span></Row>
            </Card>
            <Card title={t.settings.softwareUpdate}>
              <Row label="Akal OS"><span style={{ color: '#33d17a' }}>{t.settings.upToDate}</span></Row>
              <Row label={t.settings.automaticUpdates} last><Toggle on={true} onClick={() => {}} /></Row>
            </Card>
          </>
        )}

        {activeSection === 'appearance' && (
          <>
            <h1 className="text-xl font-bold mb-4 text-white">{t.settings.appearance}</h1>
            <Card title={t.settings.appearance}>
              <Row label={t.settings.darkMode}><Toggle on={darkMode} onClick={toggleDarkMode} /></Row>
              <Row label={t.settings.accentColor} last>
                <div className="flex gap-2">
                  {['#d70a53', '#FF3B30', '#FF9500', '#FFD60A', '#33d17a', '#BF5AF2', '#5E5CE6'].map((c) => {
                    const isSelected = c.toLowerCase() === accentColor.toLowerCase();
                    return (
                      <button
                        key={c}
                        onClick={() => setAccentColor(c)}
                        aria-label={`${t.settings.accentColor} ${c}`}
                        aria-pressed={isSelected}
                        className="w-5 h-5 rounded-full transition-transform hover:scale-110"
                        style={{
                          background: c,
                          border: isSelected ? '2px solid #fff' : '2px solid transparent',
                          boxShadow: isSelected ? `0 0 10px ${c}` : 'none',
                        }}
                      />
                    );
                  })}
                </div>
              </Row>
            </Card>
          </>
        )}

        {activeSection === 'wallpaper' && (
          <>
            <h1 className="text-xl font-bold mb-4 text-white">{t.settings.wallpaper}</h1>
            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
              {WALLPAPERS.map((w) => {
                const isSelected = wallpaper === w.value;
                return (
                  <button
                    key={w.id}
                    onClick={() => setWallpaper(w.value)}
                    className="rounded-xl overflow-hidden h-24 relative transition-transform hover:scale-105"
                    style={{
                      background: w.value,
                      border: isSelected ? `3px solid ${ACCENT}` : '2px solid transparent',
                      boxShadow: isSelected ? `0 8px 24px rgba(215,10,83,0.4)` : 'none',
                    }}
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 px-2 py-1 text-xs text-white font-medium"
                      style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.6))' }}
                    >
                      {w.name}
                    </div>
                    {isSelected && (
                      <div
                        className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                        style={{ background: ACCENT }}
                      >
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {activeSection === 'language' && (
          <>
            <h1 className="text-xl font-bold mb-4 text-white">{t.settings.language}</h1>
            <Card title={t.settings.language}>
              <Row label={t.settings.languageDesc} last>
                <div className="flex gap-2">
                  <LangPill active={language === 'en'} label={t.control.english} onClick={() => setLanguage('en' as Language)} />
                  <LangPill active={language === 'pa'} label={t.control.punjabi} onClick={() => setLanguage('pa' as Language)} />
                </div>
              </Row>
            </Card>
            <div className="text-xs px-2" style={{ color: subText }}>
              {language === 'pa' ? 'ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ। ਬਦਲਾਅ ਤੁਰੰਤ ਲਾਗੂ ਹੋ ਜਾਣਗੇ।' : 'Choose your preferred language. Changes apply instantly.'}
            </div>
          </>
        )}

        {activeSection === 'network' && (
          <>
            <h1 className="text-xl font-bold mb-4 text-white">{t.settings.network}</h1>
            <Card title={t.control.wifi}>
              <Row label={t.control.wifi}><Toggle on={wifi} onClick={toggleWifi} /></Row>
              {wifi && <Row label={t.settings.networkName} last><span style={{ color: subText }}>{t.settings.networkName}</span></Row>}
            </Card>
            <Card title={t.control.bluetooth}>
              <Row label={t.control.bluetooth}><Toggle on={bluetooth} onClick={toggleBluetooth} /></Row>
              {bluetooth && <Row label={t.settings.devices} last><span style={{ color: subText }}>{t.settings.devices}</span></Row>}
            </Card>
          </>
        )}

        {activeSection === 'sound' && (
          <>
            <h1 className="text-xl font-bold mb-4 text-white">{t.settings.sound}</h1>
            <Card title={t.settings.outputDevice}>
              <Row label={t.control.sound}>
                <div className="flex items-center gap-2 w-40">
                  <span className="text-sm">🔈</span>
                  <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="flex-1" style={{ accentColor: ACCENT }} />
                  <span className="text-xs w-8" style={{ color: subText }}>{volume}%</span>
                </div>
              </Row>
              <Row label={t.settings.outputDevice} last><span style={{ color: subText }}>{t.settings.builtInSpeakers}</span></Row>
            </Card>
            <Card title={t.settings.focus}>
              <Row label={t.control.doNotDisturb}><Toggle on={doNotDisturb} onClick={toggleDoNotDisturb} /></Row>
              <Row label={t.settings.focusMode} last><Toggle on={focusMode} onClick={toggleFocusMode} /></Row>
            </Card>
          </>
        )}

        {activeSection === 'display' && (
          <>
            <h1 className="text-xl font-bold mb-4 text-white">{t.settings.display}</h1>
            <Card title={t.settings.brightness}>
              <Row label={t.settings.brightness}>
                <div className="flex items-center gap-2 w-40">
                  <span className="text-sm">☀️</span>
                  <input type="range" min="0" max="100" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="flex-1" style={{ accentColor: ACCENT }} />
                  <span className="text-xs w-8" style={{ color: subText }}>{brightness}%</span>
                </div>
              </Row>
              <Row label={t.settings.trueTone} last><Toggle on={true} onClick={() => {}} /></Row>
            </Card>
            <Card title={t.settings.resolution}>
              <Row label={t.settings.default}><span style={{ color: subText }}>2560 × 1600 (Retina)</span></Row>
              <Row label={t.settings.refreshRate} last><span style={{ color: subText }}>60 Hz</span></Row>
            </Card>
          </>
        )}

        {activeSection === 'battery' && (
          <>
            <h1 className="text-xl font-bold mb-4 text-white">{t.settings.battery}</h1>
            <Card title="Battery Health">
              <Row label={t.settings.chargeLevel}><span style={{ color: '#33d17a' }}>{battery}%</span></Row>
              <Row label={t.settings.condition}><span style={{ color: '#33d17a' }}>{t.settings.normal}</span></Row>
              <Row label={t.settings.cycleCount} last><span style={{ color: subText }}>42</span></Row>
            </Card>
            <Card title="Power Mode">
              <Row label={t.settings.lowPowerMode}><Toggle on={false} onClick={() => {}} /></Row>
              <Row label={t.settings.optimizedCharging} last><Toggle on={true} onClick={() => {}} /></Row>
            </Card>
          </>
        )}

        {activeSection === 'about' && (
          <>
            <h1 className="text-xl font-bold mb-4 text-white">{t.settings.about}</h1>
            <div className="flex flex-col items-center text-center py-8">
              <div className="mb-4 select-none" style={{ filter: `drop-shadow(0 0 20px ${ACCENT}66)` }}>
                <Logo size={72} color={ACCENT} />
              </div>
              <h2 className="text-2xl font-bold mb-1 text-white">Akal OS</h2>
              <p className="text-sm mb-6" style={{ color: subText }}>{t.settings.version}</p>
              <p className="text-sm max-w-md leading-relaxed mb-6" style={{ color: subText }}>{t.settings.aboutText}</p>
              <div className="flex gap-3">
                <div className="glass-card px-4 py-2 text-sm text-white">{t.settings.rights}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsApp;
