'use client';

import React, { useState } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

const WeatherApp: React.FC = () => {
  const { darkMode } = useOSStore();
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
    <div className="h-full overflow-y-auto" style={{ background: darkMode ? 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)' : 'linear-gradient(180deg, #4A90D9 0%, #357ABD 100%)', color: 'white' }}>
      {/* Current weather */}
      <div className="flex flex-col items-center pt-8 pb-6 px-6">
        <h1 className="text-2xl font-medium mb-1">{current.name}</h1>
        <div className="text-7xl font-thin">{current.temp}°</div>
        <div className="text-lg opacity-80">{current.condition}</div>
        <div className="text-sm opacity-70 mt-1">H:{current.high}° L:{current.low}°</div>
        <div className="text-5xl mt-2">{current.icon}</div>
      </div>

      {/* Hourly forecast */}
      <div className="mx-4 mb-4 rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15)' }}>
        <div className="text-xs opacity-70 mb-2 uppercase font-semibold">{t.weather.hourlyForecast}</div>
        <div className="flex gap-4 overflow-x-auto">
          {hourly.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0">
              <span className="text-xs opacity-80">{h.time}</span>
              <span className="text-2xl">{h.icon}</span>
              <span className="text-sm font-medium">{h.temp}°</span>
            </div>
          ))}
        </div>
      </div>

      {/* Daily forecast */}
      <div className="mx-4 mb-4 rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15)' }}>
        <div className="text-xs opacity-70 mb-2 uppercase font-semibold">{t.weather.dailyForecast}</div>
        {daily.map((d, i) => (
          <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: i < daily.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
            <span className="text-sm font-medium w-16">{d.day}</span>
            <span className="text-xl">{d.icon}</span>
            <span className="text-xs opacity-70 flex-1 text-center">{d.condition}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm opacity-60">{d.low}°</span>
              <div className="w-16 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <div className="h-full rounded-full" style={{ marginLeft: `${Math.max(0, d.low - 18)}%`, width: `${Math.max(10, d.high - d.low)}%`, background: 'linear-gradient(90deg, #64D2FF, #FFD60A, #FF9500)' }} />
              </div>
              <span className="text-sm font-medium">{d.high}°</span>
            </div>
          </div>
        ))}
      </div>

      {/* Details */}
      <div className="mx-4 mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15)' }}>
          <div className="text-xs opacity-70 mb-1 uppercase font-semibold">{t.weather.humidity}</div>
          <div className="text-2xl font-light">{current.humidity}%</div>
        </div>
        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15)' }}>
          <div className="text-xs opacity-70 mb-1 uppercase font-semibold">{t.weather.wind}</div>
          <div className="text-2xl font-light">{current.wind} km/h</div>
        </div>
      </div>

      {/* Other cities */}
      <div className="mx-4 mb-6">
        <div className="text-xs opacity-70 mb-2 uppercase font-semibold">{t.weather.otherCities}</div>
        <div className="space-y-2">
          {cities.map((city, i) => (
            i !== selectedCity && (
              <button
                key={i}
                onClick={() => setSelectedCity(i)}
                className="w-full flex items-center justify-between p-3 rounded-2xl transition-colors hover:bg-white/10"
                style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{city.icon}</span>
                  <div>
                    <div className="text-sm font-medium">{city.name}</div>
                    <div className="text-xs opacity-70">{city.condition}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-light">{city.temp}°</div>
                  <div className="text-xs opacity-70">H:{city.high}° L:{city.low}°</div>
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
