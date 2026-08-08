'use client';

import React, { useState } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths, isToday } from 'date-fns';

const sampleEvents = [
  { id: '1', title: 'Team Meeting', date: new Date(), time: '10:00 AM', color: '#0071E3', duration: '1 hour', location: 'Amritsar · Zoom' },
  { id: '2', title: 'Lunch with Sarah', date: new Date(), time: '12:30 PM', color: '#30D158', duration: '1.5 hours', location: 'Cafe Blue, Lawrence Road' },
  { id: '3', title: 'Product Demo', date: addDays(new Date(), 2), time: '2:00 PM', color: '#FF9F0A', duration: '2 hours', location: 'Conference Room A, Amritsar' },
  { id: '4', title: 'Gym Session', date: addDays(new Date(), 1), time: '6:00 AM', color: '#FF3B30', duration: '1 hour', location: 'Akal Fitness, Mohali' },
  { id: '5', title: 'Akal OS Review', date: addDays(new Date(), 3), time: '3:00 PM', color: '#5E5CE6', duration: '2 hours', location: 'HQ, Chandigarh' },
  { id: '6', title: 'Birthday Party 🎂', date: addDays(new Date(), 5), time: '7:00 PM', color: '#FF2D55', duration: '3 hours', location: 'Home, Jalandhar' },
];

const CalendarApp: React.FC = () => {
  const { darkMode } = useOSStore();
  const t = useT();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [events, setEvents] = useState(sampleEvents);

  const bg = darkMode ? 'rgba(28,28,32,0.55)' : 'rgba(245,245,247,0.6)';
  const textColor = darkMode ? '#ffffff' : '#1d1d1f';
  const subText = darkMode ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)';
  const sidebarBg = darkMode ? 'rgba(44,44,46,0.5)' : 'rgba(232,232,237,0.55)';
  const toolbarBg = darkMode ? 'rgba(44,44,46,0.5)' : 'rgba(232,232,237,0.55)';
  const contentBg = darkMode ? 'rgba(28,28,32,0.35)' : 'rgba(255,255,255,0.55)';
  const backdrop = 'blur(30px) saturate(200%)';
  const glassBorder = darkMode ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.6)';
  const glassShadow = 'inset 0 1px 1px rgba(255,255,255,0.1)';

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);

  const calDays: Date[] = [];
  let day = calStart;
  while (day <= calEnd) {
    calDays.push(day);
    day = addDays(day, 1);
  }

  const getEventsForDate = (date: Date) => events.filter((e) => isSameDay(e.date, date));
  const selectedDateEvents = getEventsForDate(selectedDate);
  const weekDays = [t.calendar.sun, t.calendar.mon, t.calendar.tue, t.calendar.wed, t.calendar.thu, t.calendar.fri, t.calendar.sat];

  const addEvent = () => {
    if (!newEventTitle.trim()) return;
    setEvents([...events, { id: Date.now().toString(), title: newEventTitle, date: selectedDate, time: '12:00 PM', color: '#0071E3', duration: '1 hour', location: 'Amritsar' }]);
    setNewEventTitle('');
    setShowNewEvent(false);
  };

  return (
    <div className="flex h-full" style={{ background: bg, backdropFilter: backdrop, WebkitBackdropFilter: backdrop, color: textColor, border: glassBorder, boxShadow: glassShadow }}>
      {/* Sidebar */}
      <div
        className="w-56 flex-shrink-0 overflow-y-auto p-3 space-y-4"
        style={{ background: sidebarBg, backdropFilter: backdrop, WebkitBackdropFilter: backdrop, borderRight: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)' }}
      >
        <button onClick={() => setShowNewEvent(!showNewEvent)} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-white text-sm font-medium transition-all hover:brightness-110" style={{ background: 'linear-gradient(135deg, #0071E3, #0055b3)' }}>
          <span>+</span> {t.calendar.newEvent}
        </button>

        {showNewEvent && (
          <div className="space-y-2">
            <input type="text" placeholder={t.calendar.eventName} value={newEventTitle} onChange={(e) => setNewEventTitle(e.target.value)} className="w-full px-2 py-1.5 rounded-lg text-xs outline-none" style={{ background: darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)', color: textColor }} />
            <button onClick={addEvent} className="w-full py-1.5 rounded-lg text-xs text-white" style={{ background: '#0071E3' }}>{t.calendar.addTo} {format(selectedDate, 'MMM d')}</button>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold" style={{ color: textColor }}>{format(currentDate, 'MMMM yyyy')}</span>
            <div className="flex gap-1">
              <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 text-xs" style={{ color: subText }}>‹</button>
              <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 text-xs" style={{ color: subText }}>›</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-0.5 text-center">
            {weekDays.map((d, i) => <div key={i} className="text-[10px] font-medium py-0.5" style={{ color: subText }}>{d[0]}</div>)}
            {calDays.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelectedDate(d)}
                className="aspect-square text-[11px] rounded-full flex items-center justify-center transition-colors"
                style={{
                  color: !isSameMonth(d, currentDate) ? subText : isToday(d) ? 'white' : isSameDay(d, selectedDate) ? '#0071E3' : textColor,
                  background: isToday(d) ? '#FF3B30' : isSameDay(d, selectedDate) && !isToday(d) ? (darkMode ? 'rgba(0,113,227,0.2)' : 'rgba(0,113,227,0.1)') : 'transparent',
                  fontWeight: isToday(d) || isSameDay(d, selectedDate) ? '600' : '400',
                }}
              >
                {format(d, 'd')}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold mb-2 opacity-50">{t.calendar.myCalendars}</div>
          {[{ name: 'Akal', color: '#0071E3' }, { name: 'Work', color: '#30D158' }, { name: 'Personal', color: '#FF9F0A' }, { name: 'Birthdays', color: '#FF2D55' }, { name: 'Holidays', color: '#5E5CE6' }].map((cal) => (
            <div key={cal.name} className="flex items-center gap-2 py-1">
              <div className="w-3 h-3 rounded-sm" style={{ background: cal.color }} />
              <span className="text-xs" style={{ color: textColor }}>{cal.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div
          className="flex items-center gap-3 px-4 py-2"
          style={{ borderBottom: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)', background: toolbarBg, backdropFilter: backdrop, WebkitBackdropFilter: backdrop }}
        >
          <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1 rounded-lg text-xs font-medium transition-colors" style={{ background: darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)', color: textColor }}>
            {t.calendar.today}
          </button>
          <div className="flex gap-1">
            <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-1 rounded hover:bg-white/10" style={{ color: textColor }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-1 rounded hover:bg-white/10" style={{ color: textColor }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <h2 className="text-lg font-semibold flex-1" style={{ color: textColor }}>{format(currentDate, 'MMMM yyyy')}</h2>
        </div>

        <div className="flex-1 overflow-y-auto" style={{ background: contentBg, backdropFilter: backdrop, WebkitBackdropFilter: backdrop }}>
          <div className="grid grid-cols-7 border-b" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)' }}>
            {weekDays.map((d, i) => (
              <div key={i} className="py-2 text-center text-xs font-semibold" style={{ color: subText }}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7" style={{ gridAutoRows: 'minmax(80px, 1fr)' }}>
            {calDays.map((d, i) => {
              const dayEvents = getEventsForDate(d);
              return (
                <div
                  key={i}
                  onClick={() => setSelectedDate(d)}
                  className="relative p-1 cursor-pointer transition-colors overflow-hidden"
                  style={{
                    background: isSameDay(d, selectedDate) ? (darkMode ? 'rgba(0,113,227,0.12)' : 'rgba(0,113,227,0.06)') : 'transparent',
                    border: `0.5px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
                  }}
                >
                  <div className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium mb-1" style={{ background: isToday(d) ? '#FF3B30' : 'transparent', color: !isSameMonth(d, currentDate) ? subText : isToday(d) ? 'white' : textColor }}>
                    {format(d, 'd')}
                  </div>
                  {dayEvents.slice(0, 2).map((event) => (
                    <div key={event.id} className="text-[10px] px-1.5 py-0.5 rounded-md mb-0.5 truncate font-medium text-white" style={{ background: event.color }}>
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && <div className="text-[10px] px-1 opacity-60" style={{ color: textColor }}>+{dayEvents.length - 2} more</div>}
                </div>
              );
            })}
          </div>
        </div>

        {selectedDateEvents.length > 0 && (
          <div className="p-3 flex gap-2 overflow-x-auto" style={{ borderTop: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)', background: sidebarBg, backdropFilter: backdrop, WebkitBackdropFilter: backdrop }}>
            <div className="text-xs font-semibold flex-shrink-0 pt-1" style={{ color: subText }}>{format(selectedDate, 'MMM d')}</div>
            {selectedDateEvents.map((event) => (
              <div key={event.id} className="flex-shrink-0 px-3 py-2 rounded-xl text-white text-xs" style={{ background: event.color }}>
                <div className="font-semibold">{event.title}</div>
                <div className="opacity-80">{event.time} · {event.duration}</div>
                {event.location && <div className="opacity-70">📍 {event.location}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarApp;
