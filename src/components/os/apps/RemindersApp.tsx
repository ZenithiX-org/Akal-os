'use client';

import React, { useState } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

const RemindersApp: React.FC = () => {
  const { darkMode } = useOSStore();
  const t = useT();
  const textColor = darkMode ? '#ffffff' : '#1d1d1f';
  const bg = darkMode ? 'rgba(28,28,32,0.5)' : 'rgba(245,245,247,0.6)';
  const sidebarBg = darkMode ? 'rgba(44,44,46,0.45)' : 'rgba(232,232,237,0.5)';

  const [reminders, setReminders] = useState(
    t.reminders.items.map((item, i) => ({
      id: String(i + 1),
      text: item.text,
      done: i === 3 || i === 5,
      priority: i % 3 === 0 ? 'high' : i % 3 === 1 ? 'medium' : 'low',
      list: item.list,
      date: item.date,
    }))
  );
  const [newText, setNewText] = useState('');
  const [selectedList, setSelectedList] = useState('All');

  const lists = [t.reminders.all, t.reminders.today, t.reminders.scheduled, t.reminders.personal, t.reminders.work];
  const priorityColors: Record<string, string> = { high: '#FF3B30', medium: '#FF9F0A', low: '#30D158' };

  const toggleDone = (id: string) => setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r)));
  const addReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    setReminders((prev) => [...prev, { id: Date.now().toString(), text: newText.trim(), done: false, priority: 'medium', list: t.reminders.personal, date: t.common.today }]);
    setNewText('');
  };

  const filtered = selectedList === t.reminders.all ? reminders
    : selectedList === t.reminders.today ? reminders.filter((r) => r.date === t.common.today)
    : reminders.filter((r) => r.list === selectedList);

  return (
    <div className="flex h-full" style={{ background: bg, backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)', color: textColor }}>
      <div className="w-48 flex-shrink-0 py-3" style={{ background: sidebarBg, backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)' }}>
        {lists.map((list, i) => (
          <button key={list} onClick={() => setSelectedList(list)} className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg mx-1 transition-colors" style={{ background: selectedList === list ? '#FF9F0A' : 'transparent', color: selectedList === list ? 'white' : textColor, width: 'calc(100% - 8px)' }}>
            <span>{['📋', '☀️', '📅', '👤', '💼'][i]}</span>
            {list}
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b" style={{ borderBottom: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)' }}>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#FF9F0A' }}>{selectedList}</h2>
          <form onSubmit={addReminder} className="flex gap-2">
            <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-xl" style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)' }}>
              <span style={{ color: textColor }}>+</span>
              <input type="text" placeholder={t.reminders.addReminder} value={newText} onChange={(e) => setNewText(e.target.value)} className="flex-1 bg-transparent outline-none text-sm" style={{ color: textColor }} />
            </div>
          </form>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.map((reminder) => (
            <div key={reminder.id} className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5" style={{ background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)', border: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.03)' }}>
              <button onClick={() => toggleDone(reminder.id)} className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all" style={{ borderColor: priorityColors[reminder.priority], background: reminder.done ? priorityColors[reminder.priority] : 'transparent' }}>
                {reminder.done && <span className="text-white text-xs">✓</span>}
              </button>
              <div className="flex-1 min-w-0">
                <div className="text-sm" style={{ color: textColor, textDecoration: reminder.done ? 'line-through' : 'none', opacity: reminder.done ? 0.5 : 1 }}>{reminder.text}</div>
                <div className="text-xs opacity-50" style={{ color: textColor }}>{reminder.date} · {reminder.list}</div>
              </div>
              <div className="w-2 h-2 rounded-full" style={{ background: priorityColors[reminder.priority] }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RemindersApp;
