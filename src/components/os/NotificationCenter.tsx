'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellOff, Wifi, WifiOff, Bluetooth, BatteryMedium } from 'lucide-react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';
import { shellTokens } from '@/lib/ui-tokens';
import { formatDistanceToNow } from 'date-fns';

const NotificationCenter: React.FC = () => {
  const {
    notificationCenterOpen,
    toggleNotificationCenter,
    darkMode,
    accentColor,
    notifications,
    clearNotifications,
    markNotificationRead,
    wifi,
    bluetooth,
    battery,
    doNotDisturb,
  } = useOSStore();
  const t = useT();
  const tokens = shellTokens(darkMode, accentColor);

  const now = new Date();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <AnimatePresence>
      {notificationCenterOpen && (
        <>
          <div className="fixed inset-0 z-[9000]" onClick={toggleNotificationCenter} />
          <motion.div
            initial={{ x: 380, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 380, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 36 }}
            className="fixed top-8 right-0 bottom-0 w-[340px] z-[9001] p-3 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Widgets */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {/* Clock widget */}
              <div className={`rounded-2xl p-4 col-span-2 ${tokens.glassCardClass}`} style={{ color: tokens.text }}>
                <div className="flex items-start justify-between">
                  <div className="font-thin leading-none" style={{ fontSize: 46 }}>
                    {now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                  </div>
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: tokens.accentSoft, color: tokens.accent }}
                  >
                    <Bell size={15} strokeWidth={2.2} />
                  </span>
                </div>
                <div className="mt-1.5" style={{ fontSize: 12, color: tokens.subText }}>
                  {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
              </div>

              {/* Weather widget — Amritsar */}
              <div
                className="rounded-2xl p-3.5"
                style={{
                  background: 'linear-gradient(135deg, rgba(74,144,217,0.7), rgba(53,122,189,0.62))',
                  backdropFilter: 'blur(30px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white/85" style={{ fontSize: 11 }}>ਅੰਮ੍ਰਿਸਰ</div>
                    <div className="text-white font-light leading-tight" style={{ fontSize: 26 }}>26°</div>
                  </div>
                  <span style={{ fontSize: 26 }}>☀️</span>
                </div>
                <div className="text-white/85 mt-1" style={{ fontSize: 11 }}>Sunny</div>
              </div>

              {/* Battery widget */}
              <div className={`rounded-2xl p-3.5 ${tokens.glassCardClass}`} style={{ color: tokens.text }}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <BatteryMedium size={14} strokeWidth={2.2} style={{ color: battery > 20 ? '#30D158' : '#FF3B30' }} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{battery}%</span>
                </div>
                <div className="flex items-center gap-1.5" style={{ fontSize: 11, color: tokens.subText }}>
                  {wifi ? <Wifi size={11} strokeWidth={2.4} /> : <WifiOff size={11} strokeWidth={2.4} />}
                  <span>{wifi ? t.notif.connected : t.notif.offline}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5" style={{ fontSize: 11, color: tokens.subText }}>
                  <Bluetooth size={11} strokeWidth={2.4} />
                  <span>{bluetooth ? `${t.control.bluetooth} ${t.common.on}` : `${t.control.bluetooth} ${t.common.off}`}</span>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="flex items-center gap-1.5" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: tokens.subText }}>
                {doNotDisturb ? <BellOff size={12} strokeWidth={2.4} /> : <Bell size={12} strokeWidth={2.4} />}
                {doNotDisturb ? t.notif.silenced : t.notif.notifications}
                {!doNotDisturb && unread > 0 && (
                  <span
                    className="px-1.5 rounded-full"
                    style={{ background: tokens.accent, color: tokens.accentContrast, fontSize: 9.5, fontWeight: 700, lineHeight: '14px' }}
                  >
                    {unread}
                  </span>
                )}
              </span>
              {notifications.length > 0 && (
                <button
                  onClick={clearNotifications}
                  className="transition-colors"
                  style={{ fontSize: 11, fontWeight: 500, color: tokens.accent }}
                >
                  {t.common.clearAll}
                </button>
              )}
            </div>

            <div className="space-y-2">
              {notifications.length === 0 ? (
                <div className={`text-center py-12 rounded-2xl ${tokens.glassCardClass}`} style={{ color: tokens.subText }}>
                  <Bell size={30} strokeWidth={1.4} className="mx-auto mb-2.5 opacity-50" />
                  <div style={{ fontSize: 12 }}>{t.notif.noNotifications}</div>
                </div>
              ) : (
                notifications.map((n) => (
                  <motion.button
                    key={n.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => markNotificationRead(n.id)}
                    className={`w-full text-left rounded-2xl p-3 transition-all ${tokens.glassCardClass}`}
                    style={{ opacity: n.read ? 0.62 : 1, color: tokens.text }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: n.read ? tokens.surfaceMuted : tokens.accentSoft, fontSize: 15 }}
                      >
                        {n.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate" style={{ fontSize: 12, fontWeight: 600 }}>{n.title}</span>
                          <span className="flex-shrink-0" style={{ fontSize: 10, color: tokens.faintText }}>
                            {formatDistanceToNow(n.time, { addSuffix: true })}
                          </span>
                        </div>
                        <p className="mt-0.5 leading-snug" style={{ fontSize: 11.5, color: tokens.subText }}>{n.message}</p>
                      </div>
                      {!n.read && (
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                          style={{ background: tokens.accent, boxShadow: `0 0 5px ${tokens.accentGlow}` }}
                        />
                      )}
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationCenter;
