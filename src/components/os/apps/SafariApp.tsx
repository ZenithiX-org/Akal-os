'use client';

import React, { useState } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

const ACCENT = '#d70a53';

// Favorites bar — kept lightweight (just navigation tiles).
const favoriteTiles = [
  { name: 'Akal OS', url: 'akal.os', icon: '🪟', color: '#d70a53' },
  { name: 'Favorites', url: 'favorites.com', icon: '⭐', color: '#FF9F0A' },
  { name: 'GitHub', url: 'github.com', icon: '🐙', color: '#6e5494' },
  { name: 'YouTube', url: 'youtube.com', icon: '▶️', color: '#FF0000' },
  { name: 'Wikipedia', url: 'wikipedia.org', icon: '📚', color: '#5a5a5a' },
  { name: 'Reddit', url: 'reddit.com', icon: '🤖', color: '#FF4500' },
  { name: 'News', url: 'news.com', icon: '📰', color: '#FF2D55' },
  { name: 'Weather', url: 'weather.com', icon: '🌤️', color: '#32ADE6' },
];

const SafariApp: React.FC = () => {
  const { darkMode } = useOSStore();
  void darkMode;
  const t = useT();
  const [url, setUrl] = useState('');
  const [currentSite, setCurrentSite] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const textColor = '#ffffff';
  const subText = 'rgba(255,255,255,0.55)';

  const navigate = (site: string) => {
    setLoading(true);
    setCurrentSite(site);
    const newHistory = [...history.slice(0, historyIndex + 1), site];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setUrl(site);
    setTimeout(() => setLoading(false), 600);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const i = historyIndex - 1;
      setHistoryIndex(i);
      setCurrentSite(history[i]);
      setUrl(history[i]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const i = historyIndex + 1;
      setHistoryIndex(i);
      setCurrentSite(history[i]);
      setUrl(history[i]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      let cleanUrl = url.trim();
      if (!cleanUrl.includes('.')) {
        cleanUrl = `${cleanUrl}.com`;
      }
      if (!cleanUrl.startsWith('http')) {
        cleanUrl = `https://${cleanUrl}`;
      }
      navigate(cleanUrl.replace('https://', ''));
    }
  };

  const siteData = t.safari.bookmarks.find((s) => currentSite?.includes(s.name.toLowerCase().replace(/\s+/g, '').replace('akalos', 'akal.os')));

  return (
    <div className="glass-surface flex flex-col h-full" style={{ color: textColor, borderRadius: 0 }}>
      {/* Toolbar */}
      <div className="glass-topbar flex items-center gap-2 px-3 py-2 flex-shrink-0">
        <button onClick={goBack} disabled={historyIndex <= 0} className="glass-btn !p-1.5 !rounded-md disabled:opacity-30" aria-label="Back">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={goForward} disabled={historyIndex >= history.length - 1} className="glass-btn !p-1.5 !rounded-md disabled:opacity-30" aria-label="Forward">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* URL bar */}
        <form onSubmit={handleSubmit} className="glass-input flex-1 flex items-center gap-2 !rounded-lg" style={{ padding: '6px 12px' }}>
          {loading ? (
            <svg className="w-3.5 h-3.5 animate-spin" fill="none" stroke={ACCENT} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 12a8 8 0 018-8" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 opacity-60" fill="currentColor" viewBox="0 0 20 20" style={{ color: textColor }}>
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          )}
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t.safari.searchOrEnter}
            className="flex-1 bg-transparent outline-none text-sm text-center"
            style={{ color: textColor }}
          />
        </form>

        <button className="glass-btn !p-1.5 !rounded-md" aria-label="Reload">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </button>
        <button className="glass-btn !p-1.5 !rounded-md" aria-label="Share">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0v.01M5 8H4v0m0 7h1m0 0v.01M12 3a9 9 0 100 18 9 9 0 000-18z" /></svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {!currentSite ? (
          /* Start page */
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-1" style={{ color: textColor }}>{t.safari.favorites}</h2>
            <p className="text-sm mb-6" style={{ color: subText }}>{t.safari.popular}</p>
            <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}>
              {favoriteTiles.map((b) => (
                <button key={b.name} onClick={() => navigate(b.url)} className="glass-card flex flex-col items-center gap-2 p-3 !rounded-xl" style={{ background: 'transparent', borderColor: 'transparent' }}>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: `linear-gradient(145deg, ${b.color}ee, ${b.color}99)`, border: '1px solid rgba(255,255,255,0.18)', boxShadow: '0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12)' }}
                  >
                    {b.icon}
                  </div>
                  <span className="text-xs font-medium" style={{ color: textColor }}>{b.name}</span>
                </button>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-1" style={{ color: textColor }}>{t.safari.explore}</h2>
            <p className="text-sm mb-6" style={{ color: subText }}>{t.safari.popular}</p>
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
              {t.safari.bookmarks.map((site) => {
                const slug = site.name.toLowerCase().replace(/\s+/g, '');
                const targetUrl = slug === 'akalos' ? 'akal.os' : `${slug}.com`;
                return (
                  <button
                    key={site.name}
                    onClick={() => navigate(targetUrl)}
                    className="glass-card flex items-center gap-3 p-4 text-left"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      {site.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm truncate" style={{ color: textColor }}>{site.name}</div>
                      <div className="text-xs truncate" style={{ color: subText }}>{site.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <div className="w-10 h-10 border-[3px] rounded-full animate-spin" style={{ borderColor: `${ACCENT}33`, borderTopColor: ACCENT }} />
            <p className="text-sm" style={{ color: subText }}>{t.safari.loading} {currentSite}...</p>
          </div>
        ) : (
          /* Simulated website */
          <div className="min-h-full" style={{ background: 'rgba(13,13,15,0.6)' }}>
            {/* Fake browser header */}
            <div className="px-8 py-12 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}22, transparent)` }}>
              <div className="text-6xl mb-4">{siteData?.icon || '🌐'}</div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: textColor }}>{siteData?.name || currentSite}</h1>
              <p className="text-sm" style={{ color: subText }}>{siteData?.desc || `${t.safari.welcomeTo} ${currentSite}`}</p>
            </div>
            <div className="max-w-3xl mx-auto p-8 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass-card p-5">
                  <div className="h-4 w-1/3 rounded mb-3" style={{ background: 'rgba(255,255,255,0.22)' }} />
                  <div className="h-2 w-full rounded mb-1.5" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  <div className="h-2 w-5/6 rounded mb-1.5" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  <div className="h-2 w-2/3 rounded" style={{ background: 'rgba(255,255,255,0.1)' }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SafariApp;
