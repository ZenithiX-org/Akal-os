'use client';

import React, { useState } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

const ACCENT = '#d70a53';
const ACCENT_SOFT = 'rgba(215, 10, 83, 0.18)';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  pinned?: boolean;
}

const NotesApp: React.FC = () => {
  const { darkMode } = useOSStore();
  void darkMode;
  const t = useT();
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: `${t.common.welcome}`, content: `${t.common.welcome}\n\n${t.notes.title}\n\n• ${t.common.new}\n• ${t.notes.pin}\n• ${t.common.search}\n\n+ ${t.common.add}`, date: t.common.today, pinned: true },
    { id: '2', title: 'Grocery List', content: 'Grocery List\n\n• Milk\n• Eggs\n• Bread\n• Apples\n• Coffee beans\n• Olive oil\n• Pasta', date: t.common.today },
    { id: '3', title: 'Project Ideas', content: 'Project Ideas\n\n1. Weather app\n2. Task manager\n3. Music visualizer\n4. Recipe engine\n5. Habit tracker', date: t.common.yesterday },
    { id: '4', title: 'Meeting Notes', content: 'Meeting Notes\n\nAttendees: Harpreet, Gurpreet, Simran\n\nKey Points:\n- Revenue target: 2x growth\n- New product launch\n- Hire 3 engineers\n\nAction Items:\n- Finalize roadmap\n- Start recruitment', date: '2 days ago' },
    { id: '5', title: 'Book Recommendations', content: 'Books\n\n1. Atomic Habits - James Clear\n2. Thinking, Fast and Slow - Kahneman\n3. Sapiens - Harari', date: 'Last week' },
    { id: '6', title: 'Workout Plan', content: 'Workout Plan\n\nMonday: Chest & Triceps\nWednesday: Back & Biceps\nFriday: Legs & Shoulders', date: 'Last week' },
  ]);
  const [selectedId, setSelectedId] = useState<string>('1');
  const [search, setSearch] = useState('');

  const subText = 'rgba(255,255,255,0.5)';

  const filtered = search
    ? notes.filter((n) => n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase()))
    : notes;
  const sorted = [...filtered].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  const selected = notes.find((n) => n.id === selectedId);

  const createNote = () => {
    const newNote: Note = { id: Date.now().toString(), title: t.notes.newNote, content: '', date: t.common.today, pinned: false };
    setNotes([newNote, ...notes]);
    setSelectedId(newNote.id);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, ...updates } : n)));
  };

  const deleteNote = (id: string) => {
    const remaining = notes.filter((n) => n.id !== id);
    setNotes(remaining);
    if (selectedId === id && remaining.length > 0) setSelectedId(remaining[0].id);
  };

  const togglePin = (id: string) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  };

  return (
    <div className="glass-surface flex h-full" style={{ color: '#fff', borderRadius: 0 }}>
      <div className="glass-sidebar w-64 flex-shrink-0 flex flex-col">
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg text-white">{t.notes.title}</h2>
            <button onClick={createNote} className="glass-btn !w-7 !h-7 !p-0 !rounded-full flex items-center justify-center text-sm font-bold" style={{ background: ACCENT, borderColor: ACCENT }}>
              +
            </button>
          </div>
          <div className="flex items-center gap-2 px-2 py-1">
            <svg className="w-3.5 h-3.5 opacity-50" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#fff' }}>
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              placeholder={t.notes.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="glass-input !bg-transparent !border-0 !py-1 !px-1 !text-xs w-full"
              style={{ color: '#fff' }}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1.5">
          {sorted.map((note) => {
            const isActive = selectedId === note.id;
            return (
              <button
                key={note.id}
                onClick={() => setSelectedId(note.id)}
                className="glass-card w-full flex flex-col items-start gap-1 px-3 py-2.5 text-left !rounded-xl"
                style={{
                  background: isActive ? ACCENT_SOFT : undefined,
                  borderColor: isActive ? ACCENT : undefined,
                  borderLeft: isActive ? `3px solid ${ACCENT}` : undefined,
                }}
              >
                <div className="flex items-center gap-2 w-full">
                  {note.pinned && <span className="text-xs">📌</span>}
                  <span className="text-sm font-semibold truncate flex-1 text-white">{note.title || t.notes.newNote}</span>
                  <span className="text-[10px] flex-shrink-0" style={{ color: subText }}>{note.date}</span>
                </div>
                <span className="text-xs truncate w-full" style={{ color: subText }}>
                  {note.content.split('\n')[1] || note.content.slice(0, 50) || ''}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selected ? (
        <div className="glass-surface flex-1 flex flex-col" style={{ borderRadius: 0 }}>
          <div
            className="flex items-center justify-between px-4 py-2 flex-shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span className="text-xs" style={{ color: subText }}>{selected.date}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => togglePin(selected.id)}
                className="glass-btn !p-1.5 text-sm"
                style={selected.pinned ? { background: ACCENT_SOFT, borderColor: ACCENT, color: '#fff' } : undefined}
                title={t.notes.pin}
              >
                📌
              </button>
              <button
                onClick={() => deleteNote(selected.id)}
                className="glass-btn !p-1.5 text-sm"
                style={{ background: 'rgba(224,27,36,0.2)', borderColor: 'rgba(224,27,36,0.5)', color: '#ff6b78' }}
                title={t.notes.delete}
              >
                🗑️
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <input
              type="text"
              value={selected.title}
              onChange={(e) => updateNote(selected.id, { title: e.target.value })}
              placeholder={t.notes.titlePlaceholder}
              className="glass-input w-full !bg-transparent !border-0 !px-0 !text-2xl !font-bold mb-4 !rounded-none"
              style={{ color: '#fff' }}
            />
            <textarea
              value={selected.content}
              onChange={(e) => updateNote(selected.id, { content: e.target.value })}
              placeholder={t.notes.contentPlaceholder}
              className="glass-input w-full !bg-transparent !border-0 !px-0 text-sm leading-relaxed resize-none !rounded-none"
              style={{ color: '#fff', minHeight: 'calc(100% - 60px)' }}
            />
          </div>
        </div>
      ) : (
        <div className="glass-surface flex-1 flex flex-col items-center justify-center gap-2" style={{ borderRadius: 0 }}>
          <span className="text-6xl mb-2">📝</span>
          <p className="text-lg font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>{t.notes.noNoteSelected}</p>
          <button onClick={createNote} className="glass-btn mt-2" style={{ background: ACCENT, borderColor: ACCENT }}>
            {t.notes.createNote}
          </button>
        </div>
      )}
    </div>
  );
};

export default NotesApp;
