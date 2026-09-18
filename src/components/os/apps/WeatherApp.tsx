'use client';

import React, { useState } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

const ACCENT = '#d70a53';

const WeatherApp: React.FC = () => {
  const { darkMode } = useOSStore();
  void darkMode;
  const t = useT();
  const [selectedCity, setSelectedCity] = useState(0);

  const cities = t.weather.cities;
  const current = cities[selectedCity];

  const hourly = [
    { time: t.weather.now, temp: current.temp, icon: current.icon },
    { time: '1PM', temp: current.temp + 1, icon: '☀️' },
    { time: '2PM', temp: current.temp + 2, icon: '☀️' },
    { time: '3PM', temp: current.temp + 1, icon: '⛅' },
    { time: '4PM', temp: current.temp, icon: '⛅' },
    { time: '5PM', temp: current.temp - 1, icon: '☁️' },
    { time: '6PM', temp: current.temp - 2, icon: '☁️' },
    { time: '7PM', temp: current.temp - 3, icon: '🌧️' },
  ];

  const daily = [
    { day: t.common.today, icon: current.icon, high: current.high, low: current.low, condition: current.condition },
    { day: t.calendar.mon, icon: '☀️', high: current.high + 2, low: current.low + 1, condition: 'Sunny' },
    { day: t.calendar.tue, icon: '🌧️', high: current.high - 2, low: current.low - 1, condition: 'Rain' },
    { day: t.calendar.wed, icon: '⛈️', high: current.high - 4, low: current.low - 3, condition: 'Thunderstorm' },
    { day: t.calendar.thu, icon: '⛅', high: current.high - 1, low: current.low, condition: 'Partly Cloudy' },
    { day: t.calendar.fri, icon: '☀️', high: current.high + 1, low: current.low + 1, condition: 'Sunny' },
    { day: t.calendar.sat, icon: '☀️', high: current.high + 3, low: current.low + 2, condition: 'Sunny' },
  ];

  return (
    <div className="glass-surface h-full overflow-y-auto" style={{ color: '#fff', borderRadius: 0 }}>
      {/* Current weather hero */}
      <div
        className="glass-card mx-4 mt-4 mb-4 p-6 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${ACCENT}55 0%, rgba(28,28,38,0.55) 60%)` }}
      >
        <div className="flex flex-col items-center text-center relative z-10">
          <h1 className="text-2xl font-medium mb-1 text-white">{current.name}</h1>
          <div className="text-7xl font-thin text-white">{current.temp}°</div>
          <div className="text-lg" style={{ color: 'rgba(255,255,255,0.85)' }}>{current.condition}</div>
          <div className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>H:{current.high}° L:{current.low}°</div>
          <div className="text-5xl mt-2">{current.icon}</div>
        </div>
      </div>

      {/* Hourly forecast */}
      <div className="glass-card mx-4 mb-4 p-4">
        <div className="text-xs mb-2 uppercase font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>{t.weather.hourlyForecast}</div>
        <div className="flex gap-4 overflow-x-auto">
          {hourly.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0">
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>{h.time}</span>
              <span className="text-2xl">{h.icon}</span>
              <span className="text-sm font-medium text-white">{h.temp}°</span>
            </div>
          ))}
        </div>
      </div>

      {/* Daily forecast */}
      <div className="glass-card mx-4 mb-4 p-4">
        <div className="text-xs mb-2 uppercase font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>{t.weather.dailyForecast}</div>
        {daily.map((d, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-2"
            style={{ borderBottom: i < daily.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}
          >
            <span className="text-sm font-medium w-16 text-white">{d.day}</span>
            <span className="text-xl">{d.icon}</span>
            <span className="text-xs flex-1 text-center" style={{ color: 'rgba(255,255,255,0.7)' }}>{d.condition}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{d.low}°</span>
              <div className="w-16 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    marginLeft: `${Math.max(0, d.low - 18)}%`,
                    width: `${Math.max(10, d.high - d.low)}%`,
                    background: 'linear-gradient(90deg, #64D2FF, #FFD60A, #FF9500)',
                  }}
                />
              </div>
              <span className="text-sm font-medium text-white">{d.high}°</span>
            </div>
          </div>
        ))}
      </div>

      {/* Details: humidity + wind */}
      <div className="mx-4 mb-4 grid grid-cols-2 gap-3">
        <div className="glass-card p-4">
          <div className="text-xs mb-1 uppercase font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>{t.weather.humidity}</div>
          <div className="text-2xl font-light text-white">{current.humidity}%</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-xs mb-1 uppercase font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>{t.weather.wind}</div>
          <div className="text-2xl font-light text-white">{current.wind} km/h</div>
        </div>
      </div>

      {/* Other cities */}
      <div className="mx-4 mb-6">
        <div className="text-xs mb-2 uppercase font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>{t.weather.otherCities}</div>
        <div className="space-y-2">
          {cities.map((city, i) => (
            i !== selectedCity && (
              <button
                key={i}
                onClick={() => setSelectedCity(i)}
                className="glass-card w-full flex items-center justify-between p-3 !rounded-xl text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{city.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-white">{city.name}</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>{city.condition}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-light text-white">{city.temp}°</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>H:{city.high}° L:{city.low}°</div>
                </div>
              </button>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
