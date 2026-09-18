'use client';

import React, { useState } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths, isToday } from 'date-fns';

const ACCENT = '#d70a53';
const ACCENT_SOFT = 'rgba(215, 10, 83, 0.18)';

const sampleEvents = [
  { id: '1', title: 'Team Meeting', date: new Date(), time: '10:00 AM', color: '#0071E3', duration: '1 hour', location: 'Amritsar · Zoom' },
  { id: '2', title: 'Lunch with Sarah', date: new Date(), time: '12:30 PM', color: '#30D158', duration: '1.5 hours', location: 'Cafe Blue, Lawrence Road' },
  { id: '3', title: 'Product Demo', date: addDays(new Date(), 2), time: '2:00 PM', color: '#FF9F0A', duration: '2 hours', location: 'Conference Room A, Amritsar' },
  { id: '4', title: 'Gym Session', date: addDays(new Date(), 1), time: '6:00 AM', color: '#FF3B30', duration: '1 hour', location: 'Akal Fitness, Mohali' },
  { id: '5', title: 'Akal OS Review', date: addDays(new Date(), 3), time: '3:00 PM', color: '#5E5CE6', duration: '2 hours', location: 'HQ, Chandigarh' },
  { id: '6', title: 'Birthday Party 🎂', date: addDays(new Date(), 5), time: '7:00 PM', color: '#FF2D55', duration: '3 hours', location: 'Home, Jalandhar' },
];

type ViewMode = 'month' | 'week' | 'day';

const CalendarApp: React.FC = () => {
  const { darkMode } = useOSStore();
  void darkMode;
  const t = useT();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [events, setEvents] = useState(sampleEvents);
  const [view, setView] = useState<ViewMode>('month');

  const subText = 'rgba(255,255,255,0.5)';

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
    setEvents([...events, { id: Date.now().toString(), title: newEventTitle, date: selectedDate, time: '12:00 PM', color: ACCENT, duration: '1 hour', location: 'Amritsar' }]);
    setNewEventTitle('');
    setShowNewEvent(false);
  };

  return (
    <div className="flex h-full glass-surface" style={{ color: '#fff', borderRadius: 0 }}>
      {/* Sidebar */}
      <div className="glass-sidebar w-56 flex-shrink-0 overflow-y-auto p-3 space-y-4">
        <button onClick={() => setShowNewEvent(!showNewEvent)} className="glass-btn w-full flex items-center justify-center gap-2 text-white" style={{ background: ACCENT, borderColor: ACCENT }}>
          <span>+</span> {t.calendar.newEvent}
        </button>

        {showNewEvent && (
          <div className="space-y-2">
            <input type="text" placeholder={t.calendar.eventName} value={newEventTitle} onChange={(e) => setNewEventTitle(e.target.value)} className="glass-input w-full !text-xs" style={{ color: '#fff' }} />
            <button onClick={addEvent} className="glass-btn w-full !text-xs text-white" style={{ background: ACCENT, borderColor: ACCENT }}>{t.calendar.addTo} {format(selectedDate, 'MMM d')}</button>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-white">{format(currentDate, 'MMMM yyyy')}</span>
            <div className="flex gap-1">
              <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="glass-btn !w-5 !h-5 !p-0 !text-xs flex items-center justify-center" style={{ color: subText }}>‹</button>
              <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="glass-btn !w-5 !h-5 !p-0 !text-xs flex items-center justify-center" style={{ color: subText }}>›</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-0.5 text-center">
            {weekDays.map((d, i) => <div key={i} className="text-[10px] font-medium py-0.5" style={{ color: subText }}>{d[0]}</div>)}
            {calDays.map((d, i) => {
              const isTodayCell = isToday(d);
              const isSelected = isSameDay(d, selectedDate);
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(d)}
                  className="aspect-square text-[11px] rounded-full flex items-center justify-center transition-colors"
                  style={{
                    color: !isSameMonth(d, currentDate) ? subText : isTodayCell ? 'white' : isSelected ? '#fff' : '#fff',
                    background: isTodayCell ? ACCENT : isSelected && !isTodayCell ? ACCENT_SOFT : 'transparent',
                    fontWeight: isTodayCell || isSelected ? '600' : '400',
                    border: isSelected && !isTodayCell ? `1px solid ${ACCENT}` : '1px solid transparent',
                  }}
                >
                  {format(d, 'd')}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold mb-2" style={{ color: subText }}>{t.calendar.myCalendars}</div>
          {[{ name: 'Akal', color: ACCENT }, { name: 'Work', color: '#30D158' }, { name: 'Personal', color: '#FF9F0A' }, { name: 'Birthdays', color: '#FF2D55' }, { name: 'Holidays', color: '#5E5CE6' }].map((cal) => (
            <div key={cal.name} className="flex items-center gap-2 py-1">
              <div className="w-3 h-3 rounded-sm" style={{ background: cal.color }} />
              <span className="text-xs text-white">{cal.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main area */}
      <div className="glass-surface flex-1 flex flex-col overflow-hidden" style={{ borderRadius: 0 }}>
        <div className="glass-topbar flex items-center gap-3 px-4 py-2">
          <button onClick={() => setCurrentDate(new Date())} className="glass-btn !text-xs">{t.calendar.today}</button>
          <div className="flex gap-1">
            <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="glass-btn !p-1 !rounded-md">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="glass-btn !p-1 !rounded-md">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <h2 className="text-lg font-semibold flex-1 text-white">{format(currentDate, 'MMMM yyyy')}</h2>
          <div className="flex gap-1">
            {(['month', 'week', 'day'] as ViewMode[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`glass-pill !text-[11px] capitalize ${view === v ? 'active' : ''}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-7" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {weekDays.map((d, i) => (
              <div key={i} className="py-2 text-center text-xs font-semibold" style={{ color: subText }}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7" style={{ gridAutoRows: 'minmax(80px, 1fr)' }}>
            {calDays.map((d, i) => {
              const dayEvents = getEventsForDate(d);
              const isSelected = isSameDay(d, selectedDate);
              const isTodayCell = isToday(d);
              return (
                <div
                  key={i}
                  onClick={() => setSelectedDate(d)}
                  className="glass-card relative p-1 cursor-pointer !rounded-none transition-colors overflow-hidden"
                  style={{
                    background: isSelected ? ACCENT_SOFT : 'transparent',
                    borderColor: isSelected ? ACCENT : 'rgba(255,255,255,0.06)',
                    borderLeft: isSelected ? `3px solid ${ACCENT}` : undefined,
                    borderRadius: 0,
                  }}
                >
                  <div className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium mb-1" style={{ background: isTodayCell ? ACCENT : 'transparent', color: !isSameMonth(d, currentDate) ? subText : isTodayCell ? 'white' : '#fff' }}>
                    {format(d, 'd')}
                  </div>
                  {dayEvents.slice(0, 2).map((event) => (
                    <div key={event.id} className="text-[10px] px-1.5 py-0.5 rounded-md mb-0.5 truncate font-medium text-white" style={{ background: event.color }}>
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && <div className="text-[10px] px-1 opacity-60 text-white">+{dayEvents.length - 2} more</div>}
                </div>
              );
            })}
          </div>
        </div>

        {selectedDateEvents.length > 0 && (
          <div className="glass-topbar p-3 flex gap-2 overflow-x-auto">
            <div className="text-xs font-semibold flex-shrink-0 pt-1" style={{ color: subText }}>{format(selectedDate, 'MMM d')}</div>
            {selectedDateEvents.map((event) => (
              <div key={event.id} className="glass-card flex-shrink-0 px-3 py-2 text-white text-xs !rounded-xl" style={{ background: event.color, borderColor: 'transparent' }}>
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
