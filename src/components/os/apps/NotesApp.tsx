'use client';

import React, { useState } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  pinned?: boolean;
}

const NotesApp: React.FC = () => {
  const { darkMode } = useOSStore();
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

  const textColor = darkMode ? '#ffffff' : '#1d1d1f';
  const bg = darkMode ? 'rgba(28,28,32,0.5)' : 'rgba(255,255,255,0.6)';
  const subText = darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const sidebarBg = darkMode ? 'rgba(44,44,46,0.45)' : 'rgba(232,232,237,0.5)';
  const editorBg = darkMode ? 'rgba(28,28,32,0.4)' : 'rgba(255,255,255,0.55)';

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
    <div className="flex h-full" style={{ background: bg, backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)', color: textColor }}>
      <div className="w-64 flex-shrink-0 flex flex-col" style={{ background: sidebarBg, backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)', borderRight: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)' }}>
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg" style={{ color: textColor }}>{t.notes.title}</h2>
            <button onClick={createNote} className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: '#FFD60A', color: '#1d1d1f' }}>+</button>
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl" style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}>
            <svg className="w-3.5 h-3.5 opacity-50" fill="currentColor" viewBox="0 0 20 20" style={{ color: textColor }}>
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input type="text" placeholder={t.notes.search} value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent outline-none text-xs w-full" style={{ color: textColor }} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {sorted.map((note) => (
            <button
              key={note.id}
              onClick={() => setSelectedId(note.id)}
              className="w-full flex flex-col items-start gap-1 px-3 py-2.5 text-left transition-colors border-b"
              style={{ background: selectedId === note.id ? (darkMode ? 'rgba(255,213,10,0.18)' : 'rgba(255,213,10,0.15)') : 'transparent', borderColor: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)' }}
            >
              <div className="flex items-center gap-2 w-full">
                {note.pinned && <span className="text-xs">📌</span>}
                <span className="text-sm font-semibold truncate flex-1" style={{ color: textColor }}>{note.title || t.notes.newNote}</span>
                <span className="text-[10px] flex-shrink-0" style={{ color: subText }}>{note.date}</span>
              </div>
              <span className="text-xs truncate w-full" style={{ color: subText }}>{note.content.split('\n')[1] || note.content.slice(0, 50) || ''}</span>
            </button>
          ))}
        </div>
      </div>

      {selected ? (
        <div className="flex-1 flex flex-col" style={{ background: editorBg, backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)' }}>
          <div className="flex items-center justify-between px-4 py-2 flex-shrink-0" style={{ borderBottom: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)' }}>
            <span className="text-xs" style={{ color: subText }}>{selected.date}</span>
            <div className="flex items-center gap-2">
              <button onClick={() => togglePin(selected.id)} className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-sm" style={{ color: textColor }} title={t.notes.pin}>
                📌
              </button>
              <button onClick={() => deleteNote(selected.id)} className="p-1.5 rounded-md hover:bg-red-500/20 hover:text-red-400 transition-colors text-sm" style={{ color: textColor }} title={t.notes.delete}>
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
              className="w-full bg-transparent outline-none text-2xl font-bold mb-4"
              style={{ color: textColor }}
            />
            <textarea
              value={selected.content}
              onChange={(e) => updateNote(selected.id, { content: e.target.value })}
              placeholder={t.notes.contentPlaceholder}
              className="w-full bg-transparent outline-none text-sm leading-relaxed resize-none"
              style={{ color: textColor, minHeight: 'calc(100% - 60px)' }}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2" style={{ background: editorBg }}>
          <span className="text-6xl mb-2">📝</span>
          <p className="text-lg font-medium opacity-50" style={{ color: textColor }}>{t.notes.noNoteSelected}</p>
          <button onClick={createNote} className="mt-2 px-4 py-2 rounded-lg text-sm font-medium" style={{ background: '#FFD60A', color: '#1d1d1f' }}>{t.notes.createNote}</button>
        </div>
      )}
    </div>
  );
};

export default NotesApp;
