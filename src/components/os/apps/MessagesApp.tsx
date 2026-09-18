'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';
import { format } from 'date-fns';

const ACCENT = '#d70a53';
const ACCENT_SOFT = 'rgba(215, 10, 83, 0.18)';

const contactMeta = [
  { id: '1', avatar: '👨', color: '#0071E3', online: true, unread: 2 },
  { id: '2', avatar: '👩', color: '#FF2D55', online: false, unread: 0 },
  { id: '3', avatar: '👥', color: '#30D158', online: true, unread: 5 },
  { id: '4', avatar: '🧑', color: '#FF9F0A', online: true, unread: 0 },
  { id: '5', avatar: '👧', color: '#BF5AF2', online: false, unread: 0 },
  { id: '6', avatar: '💻', color: '#32ADE6', online: true, unread: 1 },
];

const initialMessages: Record<string, { id: string; from: string; text: string; time: Date; reactions?: string[] }[]> = {
  '1': [
    { id: '1', from: 'them', text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?', time: new Date(Date.now() - 3600000) },
    { id: '2', from: 'me', text: 'ਮੈਂ ਠੀਕ ਹਾਂ! ਅਕਾਲ OS ਸੈੱਟ ਅੱਪ ਕਰ ਲਿਆ 🎉', time: new Date(Date.now() - 3500000) },
    { id: '3', from: 'them', text: 'ਵਾਹ! ਕਿਵੇਂ ਲੱਗਦਾ ਹੈ?', time: new Date(Date.now() - 3400000) },
    { id: '4', from: 'me', text: 'macOS ਵਰਗਾ ਹੈ 😍', time: new Date(Date.now() - 3300000) },
    { id: '5', from: 'them', text: 'ਸੱਚਮੁੱਚ? ਮੈਂ ਵੀ ਅਜ਼ਮਾ ਸਕਦਾ ਹਾਂ?', time: new Date(Date.now() - 3200000), reactions: ['👍', '😍'] },
    { id: '6', from: 'me', text: 'ਬਿਲਕੁਲ! ਮੈਂ ਲਿੰਕ ਭੇਜਦਾ ਹਾਂ', time: new Date(Date.now() - 3100000) },
    { id: '7', from: 'them', text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?', time: new Date(Date.now() - 600000) },
  ],
  '2': [
    { id: '1', from: 'them', text: 'ਬੇਟਾ, ਖਾਣਾ ਖਾਧਾ?', time: new Date(Date.now() - 7200000) },
    { id: '2', from: 'me', text: 'ਹਾਂ ਮਾਂ! ਹੁਣੇ ਖਾਵਾਂਗਾ', time: new Date(Date.now() - 7100000) },
    { id: '3', from: 'them', text: 'ਘਰ ਆ ਕੇ ਫ਼ੋਨ ਕਰੀਂ', time: new Date(Date.now() - 3600000) },
  ],
  '3': [
    { id: '1', from: 'them', text: 'ਸਵੇਰ ਦੀ ਆਇਆਂ ਟੀਮ! 👋', time: new Date(Date.now() - 86400000) },
    { id: '2', from: 'me', text: 'ਸਭ ਨੂੰ ਸਵੇਰ ਦੀਆਂ ਆਇਆਂ!', time: new Date(Date.now() - 86300000) },
    { id: '3', from: 'them', text: 'ਦੁਪਹਿਰ 3 ਵਜੇ ਮੀਟਿੰਗ ਤਸਦੀਕ ✅', time: new Date(Date.now() - 3600000) },
  ],
};

const MessagesApp: React.FC = () => {
  const { darkMode } = useOSStore();
  void darkMode;
  const t = useT();
  const [selectedId, setSelectedId] = useState('1');
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const subText = 'rgba(255,255,255,0.5)';

  const contacts = contactMeta.map((c, i) => ({
    ...c,
    name: t.messages.contacts[i]?.name || c.id,
    lastMsg: t.messages.contacts[i]?.lastMsg || '',
    time: t.messages.contacts[i]?.time || '',
  }));

  const selectedContact = contacts.find((c) => c.id === selectedId) || contacts[0];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedId, typing]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const msg = { id: Date.now().toString(), from: 'me' as const, text: newMessage.trim(), time: new Date() };
    setMessages((prev) => ({ ...prev, [selectedId]: [...(prev[selectedId] || []), msg] }));
    setNewMessage('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply = t.messages.replies[Math.floor(Math.random() * t.messages.replies.length)];
      const replyMsg = { id: (Date.now() + 1).toString(), from: 'them' as const, text: reply, time: new Date() };
      setMessages((prev) => ({ ...prev, [selectedId]: [...(prev[selectedId] || []), replyMsg] }));
    }, 1500 + Math.random() * 1000);
  };

  const filteredContacts = contacts.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const currentMsgs = messages[selectedId] || [];

  return (
    <div className="flex h-full glass-surface" style={{ color: '#fff', borderRadius: 0 }}>
      <div className="glass-sidebar w-64 flex-shrink-0 flex flex-col">
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg text-white">{t.messages.title}</h2>
            <button className="glass-btn !w-7 !h-7 !p-0 !rounded-full flex items-center justify-center text-sm font-bold" style={{ background: ACCENT, borderColor: ACCENT }}>✏</button>
          </div>
          <div className="flex items-center gap-2 px-2 py-1">
            <svg className="w-3.5 h-3.5 opacity-50" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#fff' }}><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            <input type="text" placeholder={t.messages.search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="glass-input !bg-transparent !border-0 !py-1 !px-1 !text-xs w-full" style={{ color: '#fff' }} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => {
            const isActive = selectedId === contact.id;
            return (
              <button
                key={contact.id}
                onClick={() => setSelectedId(contact.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors"
                style={{
                  background: isActive ? ACCENT_SOFT : 'transparent',
                  borderLeft: isActive ? `3px solid ${ACCENT}` : '3px solid transparent',
                }}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: contact.color + '33' }}>
                    {contact.avatar}
                  </div>
                  {contact.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2" style={{ background: '#30D158', borderColor: 'rgba(20,20,30,0.4)' }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold truncate text-white">{contact.name}</span>
                    <span className="text-[10px] flex-shrink-0 ml-1" style={{ color: subText }}>{contact.time}</span>
                  </div>
                  <div className="text-xs truncate" style={{ color: subText }}>{contact.lastMsg}</div>
                </div>
                {contact.unread > 0 && (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-bold flex-shrink-0" style={{ background: ACCENT }}>{contact.unread}</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="glass-surface flex-1 flex flex-col" style={{ borderRadius: 0 }}>
        <div className="glass-topbar flex items-center gap-3 px-4 py-3 flex-shrink-0">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg" style={{ background: selectedContact.color + '33' }}>
            {selectedContact.avatar}
          </div>
          <div>
            <div className="font-semibold text-sm text-white">{selectedContact.name}</div>
            <div className="text-xs" style={{ color: selectedContact.online ? '#30D158' : subText }}>{selectedContact.online ? t.messages.activeNow : t.messages.offline}</div>
          </div>
          <div className="flex-1" />
          <button className="glass-btn !p-1.5 !rounded-full text-sm">📹</button>
          <button className="glass-btn !p-1.5 !rounded-full text-sm">📞</button>
          <button className="glass-btn !p-1.5 !rounded-full text-sm">ℹ</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="text-center text-xs py-2" style={{ color: subText }}>{t.messages.today}</div>
          {currentMsgs.map((msg) => {
            const isMe = msg.from === 'me';
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                {!isMe && (
                  <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-sm" style={{ background: selectedContact.color + '33' }}>
                    {selectedContact.avatar}
                  </div>
                )}
                <div className="max-w-xs">
                  <div
                    className="glass-card px-3 py-2 text-sm leading-relaxed"
                    style={{
                      background: isMe ? ACCENT : undefined,
                      borderColor: isMe ? ACCENT : undefined,
                      color: isMe ? '#fff' : '#fff',
                      borderBottomRightRadius: isMe ? '4px' : '18px',
                      borderBottomLeftRadius: isMe ? '18px' : '4px',
                    }}
                  >
                    {msg.text}
                  </div>
                  {msg.reactions && (
                    <div className={`flex gap-1 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                      {msg.reactions.map((r, ri) => (<span key={ri} className="text-sm">{r}</span>))}
                    </div>
                  )}
                  <div className={`text-[10px] mt-0.5 ${isMe ? 'text-right' : 'text-left'}`} style={{ color: subText }}>
                    {format(msg.time, 'h:mm a')}
                  </div>
                </div>
              </div>
            );
          })}

          {typing && (
            <div className="flex items-end gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm" style={{ background: selectedContact.color + '33' }}>{selectedContact.avatar}</div>
              <div className="glass-card px-3 py-2">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-gray-400 typing-dot" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={sendMessage} className="flex items-center gap-3 p-3 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button type="button" className="text-xl">😊</button>
          <button type="button" className="text-xl">📎</button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t.messages.iMessage}
            className="glass-input flex-1 !rounded-2xl"
            style={{ color: '#fff', caretColor: ACCENT }}
          />
          <button type="button" className="text-base">🎙️</button>
          {newMessage ? (
            <button type="submit" className="glass-btn !w-8 !h-8 !p-0 !rounded-full flex items-center justify-center text-white font-bold" style={{ background: ACCENT, borderColor: ACCENT }}>↑</button>
          ) : (
            <button type="button" className="text-xl">❤️</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default MessagesApp;
