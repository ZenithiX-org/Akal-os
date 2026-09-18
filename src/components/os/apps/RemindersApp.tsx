'use client';

import React, { useState } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

const ACCENT = '#d70a53';
const ACCENT_SOFT = 'rgba(215, 10, 83, 0.18)';

const RemindersApp: React.FC = () => {
  const { darkMode } = useOSStore();
  void darkMode;
  const t = useT();
  const subText = 'rgba(255,255,255,0.5)';

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
  const listIcons = ['📋', '☀️', '📅', '👤', '💼'];

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
    <div className="flex h-full glass-surface" style={{ color: '#fff', borderRadius: 0 }}>
      <div className="glass-sidebar w-48 flex-shrink-0 py-3">
        {lists.map((list, i) => {
          const isActive = selectedList === list;
          return (
            <button
              key={list}
              onClick={() => setSelectedList(list)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg mx-1 transition-colors"
              style={{
                background: isActive ? ACCENT_SOFT : 'transparent',
                color: isActive ? ACCENT : '#fff',
                borderLeft: isActive ? `3px solid ${ACCENT}` : '3px solid transparent',
                width: 'calc(100% - 8px)',
              }}
            >
              <span>{listIcons[i]}</span>
              {list}
            </button>
          );
        })}
      </div>
      <div className="glass-surface flex-1 flex flex-col overflow-hidden" style={{ borderRadius: 0 }}>
        <div className="glass-topbar p-4">
          <h2 className="text-xl font-bold mb-3" style={{ color: ACCENT }}>{selectedList}</h2>
          <form onSubmit={addReminder} className="flex gap-2">
            <input type="text" placeholder={t.reminders.addReminder} value={newText} onChange={(e) => setNewText(e.target.value)} className="glass-input flex-1" style={{ color: '#fff' }} />
            <button type="submit" className="glass-btn text-white" style={{ background: ACCENT, borderColor: ACCENT }}>+</button>
          </form>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.map((reminder) => (
            <div key={reminder.id} className="glass-card flex items-center gap-3 p-3 !rounded-xl">
              <button onClick={() => toggleDone(reminder.id)} className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all" style={{ borderColor: priorityColors[reminder.priority], background: reminder.done ? priorityColors[reminder.priority] : 'transparent' }}>
                {reminder.done && <span className="text-white text-xs">✓</span>}
              </button>
              <div className="flex-1 min-w-0">
                <div className="text-sm" style={{ color: '#fff', textDecoration: reminder.done ? 'line-through' : 'none', opacity: reminder.done ? 0.5 : 1 }}>{reminder.text}</div>
                <div className="text-xs" style={{ color: subText }}>{reminder.date} · {reminder.list}</div>
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
