'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';
import Logo from './Logo';

const BootScreen: React.FC = () => {
  const { finishBoot, isBooting } = useOSStore();
  const t = useT();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isBooting) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => finishBoot(), 400);
          return 100;
        }
        return p + Math.random() * 12 + 4;
      });
    }, 180);
    return () => clearInterval(interval);
  }, [isBooting, finishBoot]);

  if (!isBooting) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100000] flex flex-col items-center justify-center"
      style={{ background: '#000' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        <div className="mb-6 select-none" style={{ filter: 'drop-shadow(0 0 30px rgba(0,113,227,0.4))' }}>
          <Logo size={88} color="#fff" />
        </div>
        <h1 className="text-white text-3xl font-light tracking-wide mb-1">Akal OS</h1>
        <p className="text-white/40 text-xs font-light mb-12">{t.boot.version}</p>

        {/* Progress bar */}
        <div className="w-56 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #0071E3, #64D2FF)' }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BootScreen;
