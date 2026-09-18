'use client';

import React, { useState } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

const ACCENT = '#d70a53';
const ACCENT_SOFT = 'rgba(215, 10, 83, 0.18)';

const MailApp: React.FC = () => {
  const { darkMode } = useOSStore();
  void darkMode;
  const t = useT();
  const [selectedEmail, setSelectedEmail] = useState(0);

  const subText = 'rgba(255,255,255,0.5)';

  const folders = [
    { label: t.mail.inbox, icon: '📥', count: 2 },
    { label: t.mail.drafts, icon: '📝', count: 1 },
    { label: t.mail.sent, icon: '📤', count: 0 },
    { label: t.mail.trash, icon: '🗑️', count: 0 },
    { label: t.mail.junk, icon: '🚫', count: 3 },
    { label: t.mail.archive, icon: '📦', count: 0 },
  ];

  const emails = t.mail.emails;

  return (
    <div className="flex h-full glass-surface" style={{ color: '#fff', borderRadius: 0 }}>
      <div className="glass-sidebar w-36 flex-shrink-0 py-3">
        {folders.map((f) => (
          <div key={f.label} className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg mx-1 cursor-pointer hover:bg-white/10" style={{ color: '#fff', width: 'calc(100% - 8px)' }}>
            <span>{f.icon}</span>
            <span className="flex-1">{f.label}</span>
            {f.count > 0 && <span className="text-xs font-bold" style={{ color: ACCENT }}>{f.count}</span>}
          </div>
        ))}
      </div>

      <div className="w-64 flex-shrink-0 glass-sidebar" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="p-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2 px-2 py-1">
            <svg className="w-3 h-3 opacity-50" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#fff' }}><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            <input type="text" placeholder={t.common.search} className="glass-input !bg-transparent !border-0 !py-0.5 !px-1 !text-xs flex-1" style={{ color: '#fff' }} />
          </div>
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100% - 50px)' }}>
          {emails.map((email, i) => {
            const isActive = selectedEmail === i;
            return (
              <div
                key={i}
                onClick={() => setSelectedEmail(i)}
                className="glass-card mx-1 my-1 px-3 py-3 cursor-pointer !rounded-lg"
                style={{
                  background: isActive ? ACCENT_SOFT : undefined,
                  borderColor: isActive ? ACCENT : undefined,
                  borderLeft: isActive ? `3px solid ${ACCENT}` : undefined,
                }}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-semibold truncate max-w-[130px] text-white" style={{ fontWeight: i === 0 || i === 1 ? '700' : '500' }}>{email.from}</span>
                  <span className="text-[10px]" style={{ color: subText }}>{email.time}</span>
                </div>
                <div className="text-xs font-medium truncate text-white">{email.subject}</div>
                <div className="text-xs truncate" style={{ color: subText }}>{email.preview}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass-surface flex-1 flex flex-col overflow-hidden" style={{ borderRadius: 0 }}>
        <div className="glass-topbar flex items-center justify-between p-4">
          <div>
            <h2 className="font-bold text-white">{emails[selectedEmail].subject}</h2>
            <p className="text-sm" style={{ color: subText }}>{emails[selectedEmail].from} · {emails[selectedEmail].time}</p>
          </div>
          <div className="flex gap-2">
            {[`${t.mail.reply}`, `${t.mail.forward}`, `${t.mail.delete}`].map((btn) => (
              <button key={btn} className="glass-btn !text-xs">{btn}</button>
            ))}
          </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          <p className="text-sm leading-relaxed text-white">
            {emails[selectedEmail].preview} <br /><br />
            ਲੋਰਮ ਇਪਸਮ ਡੋਲਰ ਸਿਟ ਅਮੇਤ, ਕੰਸੇਕਟੇਚਰ ਐਡਿਪਿਸਿਕਿੰਗ ਐਲੀਟ। ਸੇਡ ਡੋ ਇਉਸਮੋਦ ਟੈਂਪੋਰ ਇੰਸਿਡਿਡੁੰਟ ਉਟ ਲੈਬੋਰ ਏਟ ਡੋਲੋਰ ਮੈਗਨਾ ਐਲੀਕੁਆ।
            <br /><br />
            ਦੁਇਸ ਔਟੇ ਇਰੁਰ ਡੋਲੋਰ ਇਨ ਰੇਪ੍ਰਹੈਂਡੇਰਿਟ ਇਨ ਵੋਲੁਪਟੇਟ ਵੇਲਿਟ ਐਸੇ ਸਿਲੁਮ ਡੋਲੋਰ ਇਉ ਫੁਗਿਆਟ ਨੁੱਲਾ ਪੈਰੀਆਟੁਰ।
            <br /><br />
            ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ,<br />
            {emails[selectedEmail].from}
          </p>
        </div>
        <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="glass-card p-3">
            <textarea placeholder={t.mail.replyPlaceholder} rows={2} className="glass-input w-full !bg-transparent !border-0 !text-sm resize-none !rounded-none !p-0" style={{ color: '#fff' }} />
            <div className="flex justify-end mt-2">
              <button className="glass-btn text-white" style={{ background: ACCENT, borderColor: ACCENT }}>{t.common.send}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailApp;
