'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';
import { formatDistanceToNow } from 'date-fns';

const NotificationCenter: React.FC = () => {
  const {
    notificationCenterOpen,
    toggleNotificationCenter,
    darkMode,
    notifications,
    clearNotifications,
    markNotificationRead,
    wifi,
    bluetooth,
    battery,
    doNotDisturb,
  } = useOSStore();
  const t = useT();

  const now = new Date();

  return (
    <AnimatePresence>
      {notificationCenterOpen && (
        <>
          <div className="fixed inset-0 z-[9000]" onClick={toggleNotificationCenter} />
          <motion.div
            initial={{ x: 360, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 360, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="fixed top-8 right-0 bottom-0 w-80 z-[9001] p-3 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Widgets */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {/* Clock widget */}
              <div className="rounded-2xl p-4 col-span-2 glass-card">
                <div className="text-5xl font-thin" style={{ color: darkMode ? 'white' : 'black' }}>{now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</div>
                <div className="text-sm opacity-60 mt-1" style={{ color: darkMode ? 'white' : 'black' }}>{now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
              </div>
              {/* Weather widget - Punjab */}
              <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, rgba(74,144,217,0.6), rgba(53,122,189,0.6))', backdropFilter: 'blur(30px) saturate(200%)', WebkitBackdropFilter: 'blur(30px) saturate(200%)', border: '1px solid rgba(255,255,255,0.25)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white text-xs opacity-80">ਅੰਮ੍ਰਿਤਸਰ</div>
                    <div className="text-white text-2xl font-light">26°</div>
                  </div>
                  <div className="text-3xl">☀️</div>
                </div>
                <div className="text-white text-xs opacity-80 mt-1">Sunny</div>
              </div>
              {/* Battery widget */}
              <div className="rounded-2xl p-4 glass-card">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">🔋</span>
                  <span className="text-xs font-medium" style={{ color: darkMode ? 'white' : 'black' }}>{battery}%</span>
                </div>
                <div className="text-xs opacity-60" style={{ color: darkMode ? 'white' : 'black' }}>{wifi ? 'Connected' : 'Offline'}</div>
                <div className="text-xs opacity-60" style={{ color: darkMode ? 'white' : 'black' }}>{bluetooth ? 'BT On' : 'BT Off'}</div>
              </div>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-semibold uppercase opacity-60" style={{ color: darkMode ? 'white' : 'black' }}>
                {doNotDisturb ? t.notif.silenced : t.notif.notifications}
              </span>
              {notifications.length > 0 && (
                <button onClick={clearNotifications} className="text-xs text-blue-500 hover:text-blue-400">{t.common.clearAll}</button>
              )}
            </div>

            <div className="space-y-2">
              {notifications.length === 0 ? (
                <div className="text-center py-12 opacity-40" style={{ color: darkMode ? 'white' : 'black' }}>
                  <div className="text-4xl mb-2">🔔</div>
                  <div className="text-sm">{t.notif.noNotifications}</div>
                </div>
              ) : (
                notifications.map((n) => (
                  <motion.div
                    key={n.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => markNotificationRead(n.id)}
                    className="rounded-2xl p-3 cursor-pointer glass-card"
                    style={{
                      opacity: n.read ? 0.6 : 1,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: 'rgba(0,113,227,0.2)' }}>
                        {n.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold truncate" style={{ color: darkMode ? 'white' : 'black' }}>{n.title}</span>
                          <span className="text-[10px] opacity-50 flex-shrink-0 ml-2" style={{ color: darkMode ? 'white' : 'black' }}>
                            {formatDistanceToNow(n.time, { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-xs mt-0.5 leading-snug" style={{ color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }}>{n.message}</p>
                      </div>
                    </div>
                  </motion.div>
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
