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
          setTimeout(() => finishBoot(), 700);
          return 100;
        }
        return p + Math.random() * 7 + 2;
      });
    }, 280);
    return () => clearInterval(interval);
  }, [isBooting, finishBoot]);

  if (!isBooting) return null;

  const pct = Math.min(Math.round(progress), 100);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[100000] flex flex-col items-center justify-center"
      style={{ background: '#0a0a0f' }}
    >
      {/* Single subtle warm glow behind the logo — the one decorative element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.2 }}
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(245,124,0,0.08) 0%, transparent 65%)',
        }}
      />

      {/* The hero: logo materializes with a single orchestrated motion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        className="relative flex flex-col items-center"
      >
        <Logo size={56} color="#F57C00" />

        {/* Wordmark — ultra-light, sentence case, generous tracking */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-white font-extralight mt-7"
          style={{ fontSize: 22, letterSpacing: '0.18em' }}
        >
          Akal OS
        </motion.h1>

        {/* Quiet subtitle — no ALL CAPS, no monospace */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-white mt-1.5 font-light"
          style={{ fontSize: 12 }}
        >
          {t.boot.version}
        </motion.p>
      </motion.div>

      {/* Progress — a single thin line that draws across. No bar track, no shimmer. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="relative mt-12"
        style={{ width: 200, height: 2 }}
      >
        {/* Faint track */}
        <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
        {/* Fill — solid warm accent, draws left to right */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 rounded-full"
          style={{ background: '#F57C00' }}
          animate={{ width: `${pct}%` }}
          transition={{ ease: 'linear' }}
        />
      </motion.div>

      {/* Status — single quiet line, sentence case */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-white mt-5 font-light"
        style={{ fontSize: 11 }}
      >
        {pct < 100 ? 'Starting up' : 'Ready'}
      </motion.div>

      {/* Minimal footer */}
      <div className="absolute bottom-8 text-white" style={{ fontSize: 10, opacity: 0.3, fontWeight: 300 }}>
        Akal OS
      </div>
    </motion.div>
  );
};

export default BootScreen;
