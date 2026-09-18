'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wifi, Bluetooth, Radio, Moon, Target, Sunrise, MonitorPlay,
  BatteryMedium, Globe, Volume2, SunMedium, type LucideIcon,
} from 'lucide-react';
import { useOSStore } from '@/lib/os-store';
import { useT, useLanguage } from '@/lib/use-i18n';
import { shellTokens, type ShellTokens } from '@/lib/ui-tokens';
import type { Language } from '@/lib/i18n';

interface ToggleTileProps {
  active: boolean;
  label: string;
  sub: string;
  icon: LucideIcon;
  onClick: () => void;
  color?: string;
  tokens: ShellTokens;
}

const ToggleTile: React.FC<ToggleTileProps> = ({ active, label, sub, icon: Icon, onClick, color, tokens }) => {
  const chip = color || tokens.accent;
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start gap-1.5 p-2.5 rounded-2xl w-full text-left transition-all"
      style={{
        background: tokens.surfaceMuted,
        border: `1px solid ${active ? chip : tokens.border}`,
        boxShadow: active ? `0 4px 14px ${color ? 'rgba(0,0,0,0.25)' : tokens.accentGlow}` : 'none',
      }}
      aria-pressed={active}
    >
      <span
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background: active ? chip : tokens.dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.09)',
          color: active ? '#fff' : tokens.text,
          transition: 'background 150ms ease',
        }}
      >
        <Icon size={14} strokeWidth={2.2} />
      </span>
      <span className="leading-tight" style={{ fontSize: 12, fontWeight: 600, color: tokens.text }}>{label}</span>
      <span className="leading-tight" style={{ fontSize: 10, color: tokens.subText }}>{sub}</span>
    </button>
  );
};

interface SliderRowProps {
  icon: LucideIcon;
  label: string;
  value: number;
  onChange: (v: number) => void;
  tokens: ShellTokens;
}

const SliderRow: React.FC<SliderRowProps> = ({ icon: Icon, label, value, onChange, tokens }) => {
  const rest = tokens.dark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.14)';
  return (
    <div
      className="flex items-center gap-3 p-2.5 rounded-2xl"
      style={{ background: tokens.surfaceMuted, border: `1px solid ${tokens.border}` }}
    >
      <span
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: tokens.dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.09)', color: tokens.text }}
      >
        <Icon size={14} strokeWidth={2.2} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="mb-1.5" style={{ fontSize: 11, fontWeight: 600, color: tokens.text }}>{label}</div>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full"
          style={{
            background: `linear-gradient(to right, ${tokens.accent} 0%, ${tokens.accent} ${value}%, ${rest} ${value}%, ${rest} 100%)`,
          }}
          aria-label={label}
        />
      </div>
      <span className="flex-shrink-0" style={{ fontSize: 11, fontWeight: 500, color: tokens.subText }}>{value}%</span>
    </div>
  );
};

interface PillProps {
  active: boolean;
  label: string;
  onClick: () => void;
  tokens: ShellTokens;
}

const Pill: React.FC<PillProps> = ({ active, label, onClick, tokens }) => (
  <button
    onClick={onClick}
    className="py-1.5 rounded-full transition-all"
    style={{
      fontSize: 11.5,
      fontWeight: 600,
      background: active ? tokens.accent : tokens.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)',
      color: active ? tokens.accentContrast : tokens.text,
      border: `1px solid ${active ? tokens.accent : 'transparent'}`,
      boxShadow: active ? `0 2px 8px ${tokens.accentGlow}` : 'none',
    }}
    aria-pressed={active}
  >
    {label}
  </button>
);

const ControlCenter: React.FC = () => {
  const {
    controlCenterOpen,
    toggleControlCenter,
    darkMode,
    toggleDarkMode,
    accentColor,
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
  const tokens = shellTokens(darkMode, accentColor);
  const [language, setLanguage] = useLanguage();
  // Night Shift is cosmetic in Akal OS — keep it locally stateful so it feels alive.
  const [nightShift, setNightShift] = useState(true);

  return (
    <AnimatePresence>
      {controlCenterOpen && (
        <>
          <div className="fixed inset-0 z-[9000]" onClick={toggleControlCenter} />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -8 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className={`fixed top-8 right-2 z-[9001] w-[320px] rounded-3xl p-3 space-y-2.5 ${tokens.glassClass}`}
            style={{ color: tokens.text }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-2 gap-2">
              {/* Connectivity card */}
              <div
                className="rounded-2xl p-2.5 space-y-2"
                style={{ background: tokens.surfaceMuted, border: `1px solid ${tokens.border}` }}
              >
                <button onClick={toggleWifi} className="flex items-center gap-2 w-full text-left">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: wifi ? tokens.accent : tokens.dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.09)',
                      color: wifi ? '#fff' : tokens.text,
                    }}
                  >
                    <Wifi size={14} strokeWidth={2.2} />
                  </span>
                  <span className="min-w-0">
                    <span className="block" style={{ fontSize: 11, fontWeight: 600, color: tokens.text }}>{t.control.wifi}</span>
                    <span className="block truncate" style={{ fontSize: 10, color: tokens.subText }}>
                      {wifi ? t.control.wifiNetwork : t.control.off}
                    </span>
                  </span>
                </button>
                <button onClick={toggleBluetooth} className="flex items-center gap-2 w-full text-left">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: bluetooth ? tokens.accent : tokens.dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.09)',
                      color: bluetooth ? '#fff' : tokens.text,
                    }}
                  >
                    <Bluetooth size={14} strokeWidth={2.2} />
                  </span>
                  <span className="min-w-0">
                    <span className="block" style={{ fontSize: 11, fontWeight: 600, color: tokens.text }}>{t.control.bluetooth}</span>
                    <span className="block truncate" style={{ fontSize: 10, color: tokens.subText }}>
                      {bluetooth ? t.control.on : t.control.off}
                    </span>
                  </span>
                </button>
                <div className="flex items-center gap-2">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: tokens.accent, color: '#fff' }}
                  >
                    <Radio size={14} strokeWidth={2.2} />
                  </span>
                  <span className="min-w-0">
                    <span className="block" style={{ fontSize: 11, fontWeight: 600, color: tokens.text }}>{t.control.airdrop}</span>
                    <span className="block truncate" style={{ fontSize: 10, color: tokens.subText }}>{t.control.contactsOnly}</span>
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <ToggleTile
                  active={doNotDisturb}
                  label={t.control.doNotDisturb}
                  sub={doNotDisturb ? t.control.on : t.control.off}
                  icon={Moon}
                  onClick={toggleDoNotDisturb}
                  color="#5E5CE6"
                  tokens={tokens}
                />
                <ToggleTile
                  active={focusMode}
                  label={t.control.focus}
                  sub={focusMode ? t.control.on : t.control.off}
                  icon={Target}
                  onClick={toggleFocusMode}
                  color="#32ADE6"
                  tokens={tokens}
                />
              </div>
            </div>

            <SliderRow icon={SunMedium} label={t.control.display} value={brightness} onChange={setBrightness} tokens={tokens} />
            <SliderRow icon={Volume2} label={t.control.sound} value={volume} onChange={setVolume} tokens={tokens} />

            <div className="grid grid-cols-3 gap-2">
              <ToggleTile
                active={darkMode}
                label={t.control.darkMode}
                sub={darkMode ? t.control.on : t.control.off}
                icon={Moon}
                onClick={toggleDarkMode}
                tokens={tokens}
              />
              <ToggleTile
                active={nightShift}
                label={t.control.nightShift}
                sub={nightShift ? t.control.on : t.control.off}
                icon={Sunrise}
                onClick={() => setNightShift((v) => !v)}
                color="#FF9F0A"
                tokens={tokens}
              />
              <ToggleTile
                active={airplayEnabled}
                label={t.control.airplay}
                sub={airplayEnabled ? t.control.on : t.control.off}
                icon={MonitorPlay}
                onClick={toggleAirplay}
                color="#32ADE6"
                tokens={tokens}
              />
            </div>

            {/* Language selector */}
            <div
              className="rounded-2xl p-2.5"
              style={{ background: tokens.surfaceMuted, border: `1px solid ${tokens.border}` }}
            >
              <div className="flex items-center gap-2 mb-2" style={{ fontSize: 11, fontWeight: 600, color: tokens.text }}>
                <Globe size={13} strokeWidth={2.2} />
                <span>{t.control.language}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Pill active={language === 'en'} label={t.control.english} onClick={() => setLanguage('en' as Language)} tokens={tokens} />
                <Pill active={language === 'pa'} label={t.control.punjabi} onClick={() => setLanguage('pa' as Language)} tokens={tokens} />
              </div>
            </div>

            {/* Battery */}
            <div
              className="flex items-center justify-between p-2.5 rounded-2xl"
              style={{ background: tokens.surfaceMuted, border: `1px solid ${tokens.border}` }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background: battery > 20 ? 'rgba(48,209,88,0.18)' : 'rgba(255,59,48,0.18)',
                    color: battery > 20 ? '#30D158' : '#FF3B30',
                  }}
                >
                  <BatteryMedium size={14} strokeWidth={2.2} />
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: tokens.text }}>{t.control.battery}</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-20 h-2 rounded-full overflow-hidden"
                  style={{ background: tokens.dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)' }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${battery}%`,
                      background: battery > 20 ? '#30D158' : '#FF3B30',
                      boxShadow: `0 0 8px ${battery > 20 ? 'rgba(48,209,88,0.45)' : 'rgba(255,59,48,0.45)'}`,
                    }}
                  />
                </div>
                <span style={{ fontSize: 11, fontWeight: 500, color: tokens.text }}>{battery}%</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ControlCenter;
