'use client';

import React, { useState } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

const MailApp: React.FC = () => {
  const { darkMode } = useOSStore();
  const t = useT();
  const [selectedEmail, setSelectedEmail] = useState(0);

  const textColor = darkMode ? '#ffffff' : '#1d1d1f';
  const bg = darkMode ? 'rgba(28,28,32,0.5)' : 'rgba(245,245,247,0.6)';
  const sidebarBg = darkMode ? 'rgba(44,44,46,0.45)' : 'rgba(232,232,237,0.5)';
  const contentBg = darkMode ? 'rgba(44,44,46,0.45)' : 'rgba(255,255,255,0.6)';
  const subText = darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

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
    <div className="flex h-full" style={{ background: bg, backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)', color: textColor }}>
      <div className="w-36 flex-shrink-0 py-3" style={{ background: sidebarBg, backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)' }}>
        {folders.map((f) => (
          <div key={f.label} className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg mx-1 cursor-pointer hover:bg-white/10" style={{ color: textColor, width: 'calc(100% - 8px)' }}>
            <span>{f.icon}</span>
            <span className="flex-1">{f.label}</span>
            {f.count > 0 && <span className="text-xs font-bold text-blue-400">{f.count}</span>}
          </div>
        ))}
      </div>

      <div className="w-64 flex-shrink-0" style={{ background: darkMode ? 'rgba(36,36,38,0.4)' : 'rgba(240,240,245,0.45)', borderRight: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.04)' }}>
        <div className="p-2 border-b" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-2 px-2 py-1 rounded-lg" style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}>
            <svg className="w-3 h-3 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            <input type="text" placeholder={t.common.search} className="bg-transparent outline-none text-xs flex-1" style={{ color: textColor }} />
          </div>
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100% - 50px)' }}>
          {emails.map((email, i) => (
            <div key={i} onClick={() => setSelectedEmail(i)} className="px-3 py-3 cursor-pointer border-b transition-colors" style={{ background: selectedEmail === i ? (darkMode ? 'rgba(0,113,227,0.25)' : 'rgba(0,113,227,0.1)') : 'transparent', borderColor: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)' }}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-sm font-semibold truncate max-w-[130px]" style={{ color: textColor, fontWeight: i === 0 || i === 1 ? '700' : '500' }}>{email.from}</span>
                <span className="text-[10px]" style={{ color: subText }}>{email.time}</span>
              </div>
              <div className="text-xs font-medium truncate" style={{ color: textColor }}>{email.subject}</div>
              <div className="text-xs truncate" style={{ color: subText }}>{email.preview}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden" style={{ background: contentBg, backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)' }}>
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}>
          <div>
            <h2 className="font-bold" style={{ color: textColor }}>{emails[selectedEmail].subject}</h2>
            <p className="text-sm" style={{ color: subText }}>{emails[selectedEmail].from} · {emails[selectedEmail].time}</p>
          </div>
          <div className="flex gap-2">
            {[`${t.mail.reply}`, `${t.mail.forward}`, `${t.mail.delete}`].map((btn) => (
              <button key={btn} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)', color: textColor }}>{btn}</button>
            ))}
          </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          <p className="text-sm leading-relaxed" style={{ color: textColor }}>
            {emails[selectedEmail].preview} <br /><br />
            ਲੋਰਮ ਇਪਸਮ ਡੋਲਰ ਸਿਟ ਅਮੇਤ, ਕੰਸੇਕਟੇਚਰ ਐਡਿਪਿਸਿਕਿੰਗ ਐਲੀਟ। ਸੇਡ ਡੋ ਇਉਸਮੋਦ ਟੈਂਪੋਰ ਇੰਸਿਡਿਡੁੰਟ ਉਟ ਲੈਬੋਰ ਏਟ ਡੋਲੋਰ ਮੈਗਨਾ ਐਲੀਕੁਆ।
            <br /><br />
            ਦੁਇਸ ਔਟੇ ਇਰੁਰ ਡੋਲੋਰ ਇਨ ਰੇਪ੍ਰਹੈਂਡੇਰਿਟ ਇਨ ਵੋਲੁਪਟੇਟ ਵੇਲਿਟ ਐਸੇ ਸਿਲੁਮ ਡੋਲੋਰ ਇਉ ਫੁਗਿਆਟ ਨੁੱਲਾ ਪੈਰੀਆਟੁਰ।
            <br /><br />
            ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ,<br />
            {emails[selectedEmail].from}
          </p>
        </div>
        <div className="p-4 border-t" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}>
          <div className="rounded-xl p-3" style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)' }}>
            <textarea placeholder={t.mail.replyPlaceholder} rows={2} className="w-full bg-transparent outline-none text-sm resize-none" style={{ color: textColor }} />
            <div className="flex justify-end mt-2">
              <button className="px-4 py-1.5 rounded-lg text-sm text-white font-medium" style={{ background: '#0071E3' }}>{t.common.send}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailApp;
