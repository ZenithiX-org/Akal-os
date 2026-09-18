'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, Volume2, BatteryMedium } from 'lucide-react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';
import { withAlpha } from '@/lib/ui-tokens';
import { format } from 'date-fns';
import Logo from './Logo';

const LockScreen: React.FC = () => {
  const { setLockScreen, wallpaper, accentColor, battery, wifi, volume } = useOSStore();
  const t = useT();
  const [time, setTime] = useState(new Date());
  const [password, setPassword] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Keyboard-first unlock: any key (or Enter) reveals the password field.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || (e.key.length === 1 && !showInput)) {
        setShowInput(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showInput]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setLockScreen(false);
  };

  const isGradient = wallpaper.startsWith('linear-gradient') || wallpaper.startsWith('radial-gradient');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{
        backgroundImage: isGradient ? wallpaper : `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0" style={{ backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)', background: 'rgba(0,0,0,0.25)' }} />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-center text-white">
          <div className="text-8xl font-thin tracking-tighter mb-2" style={{ textShadow: '0 2px 30px rgba(0,0,0,0.5)' }}>
            {format(time, 'h:mm')}
          </div>
          <div className="text-xl font-light opacity-90">{format(time, 'EEEE, MMMM d')}</div>
        </motion.div>

        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, type: 'spring' }} onClick={() => setShowInput(true)} className="cursor-pointer">
          <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/30" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.15)' }}>
            <Logo size={48} color="#F57C00" />
          </div>
          <div className="text-center text-white font-semibold mt-2 text-lg">{t.lock.user}</div>
        </motion.div>

        <AnimatePresence>
          {showInput && (
            <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} onSubmit={handleUnlock} className="flex flex-col items-center gap-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.lock.enterPassword}
                autoFocus
                className="px-4 py-2.5 rounded-xl text-white text-center outline-none text-sm w-52 placeholder-white/50"
                style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', border: '1px solid rgba(255,255,255,0.3)', caretColor: 'white', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1)' }}
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-xl text-white text-sm font-medium transition-all hover:brightness-110"
                style={{
                  background: withAlpha(accentColor, 0.95),
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  boxShadow: `0 8px 24px ${withAlpha(accentColor, 0.5)}, inset 0 1px 1px rgba(255,255,255,0.25)`,
                }}
              >
                {t.lock.unlock}
              </button>
              <button type="button" onClick={() => setLockScreen(false)} className="text-xs text-white/60 hover:text-white/90 transition-colors">
                {t.lock.pressEnter}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {!showInput && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setShowInput(true)} className="text-white/70 text-sm hover:text-white transition-colors">
            {t.lock.clickToUnlock}
          </motion.button>
        )}
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 text-white/60 text-sm">
        <div>🔋 87%</div>
        <div>📶 Akal Network</div>
        <div>🔊 75%</div>
      </div>
    </motion.div>
  );
};

export default LockScreen;
