'use client';

import React, { useState } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

type CategoryKey = 'discover' | 'create' | 'work' | 'play' | 'develop' | 'categories' | 'updates';

// Visual metadata for each app (kept static; name/category/description come from translations, matched by index).
const appVisuals = [
  { id: '1', rating: 4.2, reviews: '12.4K', size: '11.8 GB', price: 'Free', icon: '🔨', color: '#1D7AE5' },
  { id: '2', rating: 4.6, reviews: '8.2K', size: '2.8 GB', price: '₹30,700', icon: '🎬', color: '#1D1D1F' },
  { id: '3', rating: 4.8, reviews: '15K', size: '1.1 GB', price: '₹20,900', icon: '🎵', color: '#373737' },
  { id: '4', rating: 4.3, reviews: '5.6K', size: '74 MB', price: '₹7,900', icon: '✏️', color: '#F7B731' },
  { id: '5', rating: 4.5, reviews: '22K', size: '128 MB', price: 'Free', icon: '📝', color: '#1D1D1F' },
  { id: '6', rating: 4.7, reviews: '18K', size: '256 MB', price: 'Free', icon: '🎨', color: '#F24E1E' },
  { id: '7', rating: 4.9, reviews: '45K', size: '80 MB', price: 'Free', icon: '💻', color: '#0078D4' },
  { id: '8', rating: 4.1, reviews: '32K', size: '145 MB', price: 'Free', icon: '💬', color: '#4A154B' },
];

const categoryKeys: CategoryKey[] = ['discover', 'create', 'work', 'play', 'develop', 'categories', 'updates'];

const categoryLabel = (key: CategoryKey, t: ReturnType<typeof useT>): string => {
  switch (key) {
    case 'discover': return t.appstore.discover;
    case 'create': return t.appstore.create;
    case 'work': return t.appstore.work;
    case 'play': return t.appstore.play;
    case 'develop': return t.appstore.develop;
    case 'categories': return t.appstore.categories;
    case 'updates': return t.appstore.updates;
  }
};

const AppStoreApp: React.FC = () => {
  const { darkMode } = useOSStore();
  const t = useT();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [installedApps, setInstalledApps] = useState<Set<string>>(new Set(['5', '7', '8']));
  const [installing, setInstalling] = useState<string | null>(null);

  const bg = darkMode ? 'rgba(28,28,32,0.55)' : 'rgba(245,245,247,0.6)';
  const textColor = darkMode ? '#ffffff' : '#1d1d1f';
  const subText = darkMode ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)';
  const cardBg = darkMode ? 'rgba(44,44,46,0.5)' : 'rgba(255,255,255,0.6)';
  const headerBg = darkMode ? 'rgba(44,44,46,0.5)' : 'rgba(232,232,237,0.55)';
  const backdrop = 'blur(30px) saturate(200%)';
  const glassBorder = darkMode ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.6)';
  const glassShadow = 'inset 0 1px 1px rgba(255,255,255,0.1)';

  // Merge translation-driven app data with visual metadata.
  const featuredApps = t.appstore.apps.map((app, i) => ({
    id: appVisuals[i]?.id || String(i + 1),
    name: app.name,
    category: app.category,
    description: app.description,
    rating: appVisuals[i]?.rating || 4.0,
    reviews: appVisuals[i]?.reviews || '0',
    size: appVisuals[i]?.size || '—',
    price: appVisuals[i]?.price || 'Free',
    icon: appVisuals[i]?.icon || '📦',
    color: appVisuals[i]?.color || '#0071E3',
  }));

  const filteredApps = searchQuery
    ? featuredApps.filter((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : featuredApps;

  const handleInstall = (id: string) => {
    if (installedApps.has(id)) return;
    setInstalling(id);
    setTimeout(() => {
      setInstalledApps((prev) => new Set([...prev, id]));
      setInstalling(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: bg, backdropFilter: backdrop, WebkitBackdropFilter: backdrop, color: textColor, border: glassBorder, boxShadow: glassShadow }}>
      <div
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{ background: headerBg, backdropFilter: backdrop, WebkitBackdropFilter: backdrop, borderBottom: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)' }}
      >
        <div className="flex items-center gap-2 flex-1 px-3 py-1.5 rounded-xl" style={{ background: darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)' }}>
          <svg className="w-4 h-4 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
          <input type="text" placeholder={t.appstore.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent outline-none text-sm flex-1" style={{ color: textColor }} />
        </div>
      </div>

      <div className="flex gap-0 flex-shrink-0 overflow-x-auto" style={{ borderBottom: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)' }}>
        {categoryKeys.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="px-4 py-2.5 text-sm font-medium transition-colors relative whitespace-nowrap"
            style={{ color: selectedCategory === cat ? '#0071E3' : subText }}
          >
            {categoryLabel(cat, t)}
            {selectedCategory === cat && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {!searchQuery && (
          <div className="rounded-2xl overflow-hidden mb-6 relative" style={{ height: '200px', background: 'linear-gradient(135deg, #0071E3, #0055b3, #003d82)', border: glassBorder, boxShadow: glassShadow }}>
            <div className="absolute inset-0 flex items-center p-8 gap-6">
              <div className="text-7xl">🏪</div>
              <div className="text-white">
                <div className="text-xs uppercase tracking-wider opacity-70 mb-1">{t.appstore.appOfDay}</div>
                <div className="text-3xl font-bold mb-1">{t.appName.appstore}</div>
                <div className="text-base opacity-80">{t.appstore.tagline}</div>
                <button className="mt-3 px-4 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}>
                  {t.appstore.learnMore}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-lg" style={{ color: textColor }}>{searchQuery ? t.appstore.searchResults : t.appstore.topFreeApps}</h2>
        </div>

        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="rounded-2xl p-4 flex items-center gap-3 transition-all hover:shadow-lg"
              style={{ background: cardBg, backdropFilter: backdrop, WebkitBackdropFilter: backdrop, border: glassBorder, boxShadow: glassShadow }}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 shadow-md" style={{ background: app.color + '22', border: `2px solid ${app.color}33` }}>
                {app.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate" style={{ color: textColor }}>{app.name}</div>
                <div className="text-xs mb-1" style={{ color: subText }}>{app.category}</div>
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="text-[10px]" style={{ color: s <= Math.round(app.rating) ? '#FF9F0A' : 'rgba(128,128,128,0.3)' }}>★</span>
                    ))}
                  </div>
                  <span className="text-[10px]" style={{ color: subText }}>{app.reviews}</span>
                </div>
              </div>
              <button
                onClick={() => handleInstall(app.id)}
                className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: installedApps.has(app.id) ? (darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)') : 'rgba(0,113,227,0.15)',
                  color: installedApps.has(app.id) ? subText : '#0071E3',
                }}
              >
                {installing === app.id ? t.common.installing : installedApps.has(app.id) ? t.common.open : app.price === 'Free' ? t.common.get : app.price}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h2 className="font-bold text-lg mb-4" style={{ color: textColor }}>{t.appstore.editorsChoice}</h2>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {featuredApps.slice(0, 3).map((app) => (
              <div key={app.id} className="rounded-2xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${app.color}cc, ${app.color}44)`, border: glassBorder, boxShadow: glassShadow, height: '120px' }}>
                <div className="p-4 h-full flex flex-col justify-between">
                  <span className="text-3xl">{app.icon}</span>
                  <div>
                    <div className="text-white font-bold text-sm">{app.name}</div>
                    <div className="text-white/70 text-xs">{app.description.slice(0, 30)}...</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppStoreApp;
